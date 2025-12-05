# Migración de Prisma a PostgreSQL Nativo - Resumen

## 🔄 Cambios Realizados

### 1. **Dependencias**
- ❌ Eliminado: `@prisma/client`, `prisma`
- ✅ Agregado: `pg` (node-postgres), `@types/pg`

### 2. **Archivos Eliminados**
- `prisma/` directorio completo (schema.prisma, seed.ts, migrations)
- `AURORA_SETUP.md`
- `DATABASE_README.md`
- `QUICK_START.md`
- `RESUMEN_EJECUTIVO.md`
- `scripts/setup-db.ts`

### 3. **Archivos Creados**
- `src/db/init.ts` - Script para inicializar tablas, índices y tipos ENUM
- `src/db/seed.ts` - Script para sembrar datos de ejemplo
- `RDS_SETUP.md` - Guía completa de configuración de Amazon RDS PostgreSQL

### 4. **Archivos Modificados**

#### `package.json`
```json
{
  "scripts": {
    "db:init": "bun src/db/init.ts",
    "db:seed": "bun src/db/seed.ts"
  },
  "dependencies": {
    "pg": "^8.16.3"
  },
  "devDependencies": {
    "@types/pg": "^8.15.6"
  }
}
```

#### `src/lib/db.ts`
- Reemplazado `PrismaClient` por `Pool` de pg
- Implementado connection pooling con configuración optimizada
- Funciones helpers: `getClient()`, `query()`, `connectDB()`, `disconnectDB()`

#### `src/lib/queries.ts`
- Todas las queries convertidas de Prisma ORM a SQL nativo
- Implementación de queries parametrizadas para prevenir SQL injection
- Manejo manual de tipos y conversiones

#### `src/app/api/reportes/[id]/route.ts`
- Actualizado para manejar parámetros async de Next.js 15+
- Cambios de `{ params: { id: string } }` a `{ params: Promise<{ id: string }> }`

#### `src/scripts/test-db.ts`
- Actualizado para usar `pool.query()` en lugar de métodos de Prisma

#### `.env.example` y `.env.local.example`
- Actualizados con formato de connection string para RDS PostgreSQL

#### `.gitignore`
- Eliminadas referencias a Prisma

## 📊 Estructura de Base de Datos

### Tablas Creadas

#### `reportes`
```sql
CREATE TABLE reportes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  apellido VARCHAR(255),
  edad INTEGER NOT NULL,
  ciudad VARCHAR(255) NOT NULL,
  genero genero NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT NOW(),
  descripcion TEXT NOT NULL,
  denuncias INTEGER DEFAULT 1,
  red_social VARCHAR(255),
  evidencias TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)
```

#### `busquedas`
```sql
CREATE TABLE busquedas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  termino VARCHAR(255) NOT NULL,
  ciudad VARCHAR(255),
  genero genero,
  fecha TIMESTAMP DEFAULT NOW()
)
```

#### `estadisticas_ciudad`
```sql
CREATE TABLE estadisticas_ciudad (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ciudad VARCHAR(255) UNIQUE NOT NULL,
  total_reportes INTEGER DEFAULT 0,
  ultima_actualizacion TIMESTAMP DEFAULT NOW()
)
```

### Índices
- `idx_reportes_nombre_apellido` - Búsqueda por nombre
- `idx_reportes_ciudad` - Filtrado por ciudad
- `idx_reportes_genero` - Filtrado por género
- `idx_reportes_fecha` - Ordenamiento por fecha
- `idx_busquedas_termino` - Analytics de búsquedas
- `idx_busquedas_fecha` - Analytics temporales

### Tipo ENUM
```sql
CREATE TYPE genero AS ENUM ('hombre', 'mujer');
```

## 🚀 Comandos Actualizados

### Antes (Prisma)
```bash
bun run db:generate    # Generar Prisma Client
bun run db:migrate     # Aplicar migraciones
bun run db:studio      # GUI de Prisma
bun run db:reset       # Reset database
```

### Ahora (PostgreSQL Nativo)
```bash
bun run db:init        # Inicializar tablas e índices
bun run db:seed        # Sembrar datos de ejemplo
bun src/scripts/test-db.ts  # Test de conexión
```

## 🔌 Connection Pooling

Configuración del Pool:
```typescript
new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  max: 20,                      // Máximo de conexiones
  idleTimeoutMillis: 30000,     // 30 segundos
  connectionTimeoutMillis: 2000  // 2 segundos
})
```

## 📝 Diferencias Clave

### Queries
**Antes (Prisma):**
```typescript
await prisma.reporte.findMany({
  where: { ciudad: 'Lima' },
  orderBy: { fecha: 'desc' }
})
```

**Ahora (SQL):**
```typescript
await query(
  'SELECT * FROM reportes WHERE ciudad = $1 ORDER BY fecha DESC',
  ['Lima']
)
```

### Creación de Registros
**Antes:**
```typescript
await prisma.reporte.create({
  data: { nombre, edad, ... }
})
```

**Ahora:**
```typescript
await query(
  'INSERT INTO reportes (nombre, edad, ...) VALUES ($1, $2, ...) RETURNING *',
  [nombre, edad, ...]
)
```

## ✅ Ventajas de PostgreSQL Nativo

1. **Sin ORM overhead** - Queries directas más rápidas
2. **Control total** - SQL completo disponible
3. **Menor bundle size** - No dependencias de Prisma
4. **Más flexible** - Queries complejas sin limitaciones
5. **Compatible con cualquier PostgreSQL** - No solo Aurora

## ⚠️ Consideraciones

1. **Manejo manual de tipos** - Sin TypeScript types automáticos
2. **SQL injection** - Usar siempre queries parametrizadas
3. **Migraciones manuales** - No hay sistema automático de migraciones
4. **Sin GUI** - No hay Prisma Studio (usar pgAdmin o DBeaver)

## 🔧 Setup Requerido

1. Crear instancia RDS PostgreSQL en AWS
2. Configurar Security Group (puerto 5432)
3. Copiar `.env.example` a `.env.local`
4. Actualizar `DATABASE_URL` con credenciales RDS
5. Ejecutar `bun install`
6. Ejecutar `bun run db:init`
7. (Opcional) `bun run db:seed`
8. Ejecutar `bun run dev`

## 📚 Documentación

Ver [RDS_SETUP.md](./RDS_SETUP.md) para guía completa de configuración.

---

**Fecha de migración:** Diciembre 2025
**De:** Prisma ORM + Amazon Aurora PostgreSQL
**A:** node-postgres (pg) + Amazon RDS PostgreSQL
