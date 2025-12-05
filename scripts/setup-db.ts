#!/usr/bin/env bun

/**
 * Script de setup completo para Amazon Aurora PostgreSQL
 * Ejecuta todos los pasos necesarios para configurar la base de datos
 */

import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { copyFileSync } from 'fs'

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
}

function log(message: string, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`)
}

function step(number: number, message: string) {
  log(`\n${number}. ${message}`, colors.blue)
}

function success(message: string) {
  log(`✅ ${message}`, colors.green)
}

function error(message: string) {
  log(`❌ ${message}`, colors.red)
}

function warning(message: string) {
  log(`⚠️  ${message}`, colors.yellow)
}

function execute(command: string, description: string) {
  try {
    log(`   Ejecutando: ${command}`, colors.reset)
    execSync(command, { stdio: 'inherit' })
    success(description)
  } catch (err) {
    error(`Falló: ${description}`)
    throw err
  }
}

async function main() {
  log('\n🚀 Setup de Amazon Aurora PostgreSQL\n', colors.blue)
  
  // Paso 1: Verificar .env.local
  step(1, 'Verificando archivo de variables de entorno')
  if (!existsSync('.env.local')) {
    if (existsSync('.env.example')) {
      copyFileSync('.env.example', '.env.local')
      warning('Archivo .env.local creado desde .env.example')
      warning('⚠️  IMPORTANTE: Edita .env.local con tus credenciales de Aurora')
      log('\nPresiona Enter cuando hayas configurado .env.local...')
      await new Promise(resolve => process.stdin.once('data', resolve))
    } else {
      error('No existe .env.example ni .env.local')
      error('Crea un archivo .env.local con tu DATABASE_URL')
      process.exit(1)
    }
  } else {
    success('Archivo .env.local encontrado')
  }
  
  // Paso 2: Instalar dependencias
  step(2, 'Instalando dependencias')
  execute('bun install', 'Dependencias instaladas')
  
  // Paso 3: Generar Prisma Client
  step(3, 'Generando Prisma Client')
  execute('bunx prisma generate', 'Prisma Client generado')
  
  // Paso 4: Crear migraciones
  step(4, 'Aplicando migraciones a la base de datos')
  try {
    execute('bunx prisma migrate deploy', 'Migraciones aplicadas')
  } catch {
    warning('Las migraciones fallaron, intentando con migrate dev...')
    execute('bunx prisma migrate dev --name init', 'Migraciones creadas y aplicadas')
  }
  
  // Paso 5: Seed (opcional)
  step(5, 'Poblando base de datos con datos de ejemplo')
  log('¿Deseas agregar datos de ejemplo? (s/n): ')
  
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  readline.question('', (answer: string) => {
    readline.close()
    
    if (answer.toLowerCase() === 's' || answer.toLowerCase() === 'y') {
      execute('bun run db:seed', 'Datos de ejemplo agregados')
    } else {
      log('   Saltando seed de datos')
    }
    
    // Paso 6: Test de conexión
    step(6, 'Probando conexión a Aurora')
    execute('bun src/scripts/test-db.ts', 'Conexión verificada')
    
    // Finalización
    log('\n' + '='.repeat(60), colors.green)
    success('¡Setup completado exitosamente!')
    log('='.repeat(60) + '\n', colors.green)
    
    log('Próximos pasos:', colors.blue)
    log('  1. Ejecuta: bun run dev')
    log('  2. Abre: http://localhost:3000')
    log('  3. Prueba los endpoints en /api/reportes\n')
    
    log('Comandos útiles:', colors.blue)
    log('  bun run db:studio  - Ver base de datos en GUI')
    log('  bun run db:migrate - Crear nueva migración')
    log('  bun run db:seed    - Agregar datos de ejemplo\n')
  })
}

main().catch((err) => {
  error('\n❌ Error durante el setup:')
  console.error(err)
  process.exit(1)
})
