# 🚀 Guía de Configuración: Amazon Aurora PostgreSQL

## 📋 Tabla de Contenidos
1. [Requisitos Previos](#requisitos-previos)
2. [Configuración de AWS](#configuración-de-aws)
3. [Instalación de Dependencias](#instalación-de-dependencias)
4. [Configuración de Prisma](#configuración-de-prisma)
5. [Variables de Entorno](#variables-de-entorno)
6. [Migraciones de Base de Datos](#migraciones-de-base-de-datos)
7. [Testing de Conexión](#testing-de-conexión)
8. [Despliegue](#despliegue)
9. [Troubleshooting](#troubleshooting)

---

## 1️⃣ Requisitos Previos

### Software Necesario
- ✅ Node.js 18+ o Bun
- ✅ Cuenta de AWS activa
- ✅ AWS CLI configurado (opcional pero recomendado)
- ✅ Git

### Conocimientos Necesarios
- Básico de PostgreSQL
- Básico de AWS RDS
- Básico de Prisma ORM

---

## 2️⃣ Configuración de AWS

### Paso 1: Crear un Cluster de Aurora PostgreSQL

1. **Accede a AWS Console:**
   - Ir a: https://console.aws.amazon.com/rds/
   - Selecciona tu región preferida (ej: us-east-1)

2. **Crear Database:**
   ```
   - Click en "Create database"
   - Selecciona "Standard create"
   - Engine: Amazon Aurora
   - Edition: Amazon Aurora PostgreSQL-Compatible Edition
   - Version: PostgreSQL 15.x compatible (recomendado)
   ```

3. **Configuración del Cluster:**
   ```
   Templates: Production (o Dev/Test para desarrollo)
   DB cluster identifier: red-flag-db-cluster
   Master username: postgres (o tu preferencia)
   Master password: [Contraseña segura - guárdala!]
   ```

4. **Configuración de Instancia:**
   ```
   DB instance class:
   - Producción: db.r6g.large o superior
   - Desarrollo: db.t4g.medium (más económico)
   
   Multi-AZ deployment: Sí (para producción)
   ```

5. **Conectividad:**
   ```
   Virtual Private Cloud (VPC): Default o crear uno nuevo
   Public access: Yes (para desarrollo) / No (para producción con VPN)
   VPC security group: Create new
   - Nombre: red-flag-db-sg
   - Inbound rules: PostgreSQL (5432) desde tu IP
   ```

6. **Configuración Adicional:**
   ```
   Initial database name: redflag_db
   DB cluster parameter group: default
   Backup retention: 7 días (mínimo)
   Encryption: Enable (recomendado)
   ```

### Paso 2: Configurar Security Group

1. **Ir a EC2 > Security Groups**
2. **Encontrar el security group creado**
3. **Editar Inbound Rules:**
   ```
   Type: PostgreSQL
   Protocol: TCP
   Port: 5432
   Source: 
     - Development: Tu IP pública (0.0.0.0/0 solo para testing)
     - Production: IP de tu servidor/VPC
   ```

### Paso 3: Obtener el Endpoint de Conexión

1. **Ir a RDS > Databases**
2. **Click en tu cluster**
3. **Copiar el "Writer endpoint":**
   ```
   Ejemplo: red-flag-db-cluster.cluster-xxxxx.us-east-1.rds.amazonaws.com
   ```

---

## 3️⃣ Instalación de Dependencias

### Instalar Prisma y PostgreSQL Driver

```bash
# Con npm
npm install @prisma/client
npm install -D prisma

# O con bun (recomendado)
bun add @prisma/client
bun add -D prisma
```

### Instalar dependencias adicionales (opcional)

```bash
# Para validación de datos
bun add zod

# Para manejo de fechas
bun add date-fns
```

---

## 4️⃣ Configuración de Prisma

### Inicializar Prisma (ya está configurado en el proyecto)

El archivo `prisma/schema.prisma` ya está creado. Revísalo y ajusta según necesites.

### Comandos Prisma Importantes

```bash
# Generar Prisma Client
bunx prisma generate

# Crear migración
bunx prisma migrate dev --name init

# Aplicar migraciones en producción
bunx prisma migrate deploy

# Abrir Prisma Studio (GUI para ver datos)
bunx prisma studio

# Resetear base de datos (¡CUIDADO en producción!)
bunx prisma migrate reset
```

---

## 5️⃣ Variables de Entorno

### Crear archivo `.env.local`

```bash
# Copia el ejemplo
cp .env.example .env.local
```

### Configurar DATABASE_URL

**Formato de conexión:**
```
DATABASE_URL="postgresql://USERNAME:PASSWORD@ENDPOINT:5432/DATABASE?schema=public"
```

**Ejemplo completo:**
```env
DATABASE_URL="postgresql://postgres:TuPasswordSegura123!@red-flag-db-cluster.cluster-xxxxx.us-east-1.rds.amazonaws.com:5432/redflag_db?schema=public&connect_timeout=10&pool_timeout=10"

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Parámetros opcionales importantes:**
- `connect_timeout=10` - Timeout de conexión en segundos
- `pool_timeout=10` - Timeout del pool de conexiones
- `connection_limit=5` - Límite de conexiones simultáneas
- `sslmode=require` - Forzar SSL (recomendado en producción)

### Para Producción con SSL:

```env
DATABASE_URL="postgresql://postgres:password@endpoint:5432/db?schema=public&sslmode=require&sslcert=/path/to/cert.pem"
```

---

## 6️⃣ Migraciones de Base de Datos

### Primera Migración (Desarrollo)

```bash
# 1. Generar Prisma Client
bunx prisma generate

# 2. Crear y aplicar migración inicial
bunx prisma migrate dev --name initial_schema

# 3. Verificar que se creó correctamente
bunx prisma studio
```

### Aplicar en Producción

```bash
# NO usar migrate dev en producción
# Usar migrate deploy:
bunx prisma migrate deploy
```

### Seed de Datos (Opcional)

Crear `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Crear datos de ejemplo
  const reportes = await prisma.reporte.createMany({
    data: [
      {
        nombre: 'Juan',
        apellido: 'Pérez',
        edad: 28,
        ciudad: 'Lima',
        genero: 'hombre',
        descripcion: 'Descripción del comportamiento reportado',
        denuncias: 1,
      },
      // Más datos...
    ],
  })

  console.log(`✅ Creados ${reportes.count} reportes de ejemplo`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

Ejecutar seed:
```bash
bunx prisma db seed
```

---

## 7️⃣ Testing de Conexión

### Test Simple de Conexión

Crear `src/scripts/test-db.ts`:

```typescript
import { prisma } from '../lib/db'

async function testConnection() {
  try {
    console.log('🔄 Probando conexión a Aurora PostgreSQL...')
    
    await prisma.$connect()
    console.log('✅ Conexión exitosa!')

    const count = await prisma.reporte.count()
    console.log(`📊 Reportes en la base de datos: ${count}`)

    await prisma.$disconnect()
    console.log('👋 Desconectado')
  } catch (error) {
    console.error('❌ Error de conexión:', error)
    process.exit(1)
  }
}

testConnection()
```

Ejecutar:
```bash
bun src/scripts/test-db.ts
```

### Verificar en Prisma Studio

```bash
bunx prisma studio
# Abre en http://localhost:5555
```

---

## 8️⃣ Despliegue

### Vercel (Recomendado)

1. **Configurar Variables de Entorno en Vercel:**
   ```
   Settings > Environment Variables
   Agregar: DATABASE_URL
   ```

2. **Build Settings:**
   ```json
   {
     "buildCommand": "prisma generate && next build",
     "outputDirectory": ".next"
   }
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

### Railway / Render

Similar a Vercel, agregar `DATABASE_URL` en las variables de entorno.

### Docker (Opcional)

```dockerfile
FROM oven/bun:1 as base
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .
RUN bunx prisma generate
RUN bun run build

EXPOSE 3000
CMD ["bun", "start"]
```

---

## 9️⃣ Troubleshooting

### Error: "Can't reach database server"

**Causas comunes:**
1. ❌ Security Group no permite tu IP
2. ❌ VPC/Subnet mal configurado
3. ❌ Endpoint incorrecto en DATABASE_URL

**Solución:**
```bash
# Verificar conectividad
ping your-endpoint.rds.amazonaws.com

# Probar conexión con psql
psql -h your-endpoint.rds.amazonaws.com -U postgres -d redflag_db
```

### Error: "SSL connection required"

**Solución:**
```env
DATABASE_URL="postgresql://...?sslmode=require"
```

### Error: "Too many connections"

**Solución:**
1. Reducir `connection_limit` en DATABASE_URL
2. Implementar connection pooling
3. Usar PgBouncer

```env
DATABASE_URL="postgresql://...?connection_limit=5&pool_timeout=10"
```

### Prisma Client no genera

**Solución:**
```bash
# Limpiar y regenerar
rm -rf node_modules/.prisma
bunx prisma generate --force
```

### Migraciones no se aplican

**Solución:**
```bash
# Ver estado de migraciones
bunx prisma migrate status

# Resolver conflictos
bunx prisma migrate resolve --applied [migration_name]
```

---

## 📊 Monitoreo y Performance

### CloudWatch Metrics (AWS)

- CPU Utilization
- Database Connections
- Read/Write IOPS
- Latency

### Query Optimization

```typescript
// Usar índices definidos en schema.prisma
// Evitar N+1 queries con include/select

const reportes = await prisma.reporte.findMany({
  select: {
    id: true,
    nombre: true,
    apellido: true,
    // Solo campos necesarios
  },
  where: {
    ciudad: 'Lima', // Usa índice
  },
})
```

### Connection Pooling con PgBouncer (Avanzado)

Para aplicaciones de alto tráfico, considera usar PgBouncer entre tu app y Aurora.

---

## 💰 Costos Estimados

### Desarrollo:
- **db.t4g.medium**: ~$50-70/mes
- **Single-AZ**: ~$30-50/mes

### Producción:
- **db.r6g.large**: ~$200-300/mes
- **Multi-AZ**: ~$400-600/mes

**Tip:** Usa Aurora Serverless v2 para auto-scaling y potencialmente reducir costos.

---

## 📚 Recursos Adicionales

- [Prisma Docs](https://www.prisma.io/docs)
- [Aurora PostgreSQL Docs](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/)
- [Next.js Database Guide](https://nextjs.org/docs/app/building-your-application/data-fetching)

---

## ✅ Checklist de Implementación

- [ ] Cluster de Aurora creado
- [ ] Security Groups configurados
- [ ] Variables de entorno configuradas
- [ ] Dependencias instaladas
- [ ] Prisma Client generado
- [ ] Migraciones aplicadas
- [ ] Conexión testeada
- [ ] APIs funcionando
- [ ] Datos de prueba creados
- [ ] Deploy exitoso

---

¡Listo! Tu aplicación ahora está conectada a Amazon Aurora PostgreSQL. 🎉
