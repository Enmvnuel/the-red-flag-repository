import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...')

  // Limpiar datos existentes (opcional, comentar si no quieres borrar)
  // await prisma.reporte.deleteMany()
  // console.log('🗑️  Datos anteriores eliminados')

  // Crear reportes de ejemplo
  const reportes = await prisma.reporte.createMany({
    data: [
      {
        nombre: 'Carlos',
        apellido: 'Ramírez',
        edad: 32,
        ciudad: 'Lima',
        genero: 'hombre',
        descripcion: 'Comportamiento agresivo y controlador. Revisa constantemente el celular de su pareja y no permite que salga con amistades.',
        denuncias: 3,
        redSocial: '@carlos_ramirez',
        evidencias: [],
      },
      {
        nombre: 'Miguel',
        apellido: 'Torres',
        edad: 28,
        ciudad: 'Arequipa',
        genero: 'hombre',
        descripcion: 'Historial de acoso a múltiples mujeres en redes sociales. Envía mensajes inapropiados constantemente.',
        denuncias: 5,
        redSocial: '@miguel_t',
        evidencias: [],
      },
      {
        nombre: 'Ana',
        apellido: 'Flores',
        edad: 26,
        ciudad: 'Cusco',
        genero: 'mujer',
        descripcion: 'Manipulación emocional constante. Amenaza con hacerse daño si su pareja intenta terminar la relación.',
        denuncias: 2,
        redSocial: '',
        evidencias: [],
      },
      {
        nombre: 'Roberto',
        apellido: 'Silva',
        edad: 35,
        ciudad: 'Trujillo',
        genero: 'hombre',
        descripcion: 'Violencia verbal y amenazas. Tiene antecedentes de agresión física en relaciones anteriores.',
        denuncias: 7,
        redSocial: '@roberto_silva',
        evidencias: [],
      },
      {
        nombre: 'Laura',
        apellido: 'Mendoza',
        edad: 29,
        ciudad: 'Lima',
        genero: 'mujer',
        descripcion: 'Comportamiento obsesivo y persecución. Aparece sin avisar en lugares donde está su ex pareja.',
        denuncias: 4,
        redSocial: '@laura_m',
        evidencias: [],
      },
      {
        nombre: 'Diego',
        apellido: 'Vargas',
        edad: 31,
        ciudad: 'Piura',
        genero: 'hombre',
        descripcion: 'Infidelidad serial y mentiras patológicas. Mantiene múltiples relaciones simultáneas sin el conocimiento de sus parejas.',
        denuncias: 6,
        redSocial: '',
        evidencias: [],
      },
      {
        nombre: 'Patricia',
        apellido: 'Ruiz',
        edad: 27,
        ciudad: 'Chiclayo',
        genero: 'mujer',
        descripcion: 'Manipulación financiera. Pide dinero constantemente y desaparece después de recibirlo.',
        denuncias: 3,
        redSocial: '@paty_ruiz',
        evidencias: [],
      },
      {
        nombre: 'Fernando',
        apellido: 'Castro',
        edad: 30,
        ciudad: 'Lima',
        genero: 'hombre',
        descripcion: 'Gaslighting y manipulación psicológica. Hace que su pareja dude de su propia percepción de la realidad.',
        denuncias: 4,
        redSocial: '@fer_castro',
        evidencias: [],
      },
      {
        nombre: 'Sofía',
        apellido: 'Paredes',
        edad: 25,
        ciudad: 'Ica',
        genero: 'mujer',
        descripcion: 'Celos enfermizos y control excesivo. Exige contraseñas de todas las redes sociales y correos.',
        denuncias: 2,
        redSocial: '',
        evidencias: [],
      },
      {
        nombre: 'Javier',
        apellido: 'Morales',
        edad: 33,
        ciudad: 'Huancayo',
        genero: 'hombre',
        descripcion: 'Adicción a sustancias y comportamiento errático. Cambios de humor extremos y violencia esporádica.',
        denuncias: 8,
        redSocial: '@javi_morales',
        evidencias: [],
      },
    ],
  })

  console.log(`✅ Creados ${reportes.count} reportes de ejemplo`)

  // Crear algunas búsquedas de ejemplo
  await prisma.busqueda.createMany({
    data: [
      { termino: 'Carlos', ciudad: 'Lima', genero: 'hombre' },
      { termino: 'Miguel', ciudad: 'Arequipa' },
      { termino: 'Ana', genero: 'mujer' },
    ],
  })

  console.log('✅ Creadas búsquedas de ejemplo')

  // Crear estadísticas iniciales por ciudad
  await prisma.estadisticaCiudad.createMany({
    data: [
      { ciudad: 'Lima', totalReportes: 3 },
      { ciudad: 'Arequipa', totalReportes: 1 },
      { ciudad: 'Cusco', totalReportes: 1 },
      { ciudad: 'Trujillo', totalReportes: 1 },
      { ciudad: 'Piura', totalReportes: 1 },
      { ciudad: 'Chiclayo', totalReportes: 1 },
      { ciudad: 'Ica', totalReportes: 1 },
      { ciudad: 'Huancayo', totalReportes: 1 },
    ],
  })

  console.log('✅ Creadas estadísticas por ciudad')

  console.log('🎉 Seed completado exitosamente!')
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
