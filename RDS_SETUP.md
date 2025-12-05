# Amazon RDS PostgreSQL - Guía de Configuración

Esta guía te ayudará a configurar Amazon RDS PostgreSQL para tu aplicación.

## 📋 Tabla de Contenidos

1. [Crear Instancia RDS](#crear-instancia-rds)
2. [Configuración Local](#configuración-local)
3. [Inicializar Base de Datos](#inicializar-base-de-datos)
4. [API Endpoints](#api-endpoints)
5. [Deployment](#deployment)

## 🚀 Crear Instancia RDS

### Paso 1: Acceder a AWS Console

1. Ve a [AWS Console](https://console.aws.amazon.com/)
2. Busca y selecciona **RDS**
3. Click en **Create database**

### Paso 2: Configuración de la Base de Datos

**Motor de Base de Datos:**
- Selecciona: **PostgreSQL**
- Versión: PostgreSQL 15.x o superior

**Templates:**
- Desarrollo/Testing: **Free tier** (si aplica)
- Producción: **Production**

**Settings:**
- DB instance identifier: `red-flag-db`
- Master username: `postgres` (o tu preferencia)
- Master password: **[Tu contraseña segura]**

**Instance Configuration:**
- Development: `db.t3.micro` o `db.t4g.micro`
- Production: `db.t3.small` o superior

**Storage:**
- Allocated storage: 20 GB (mínimo)
- Storage type: General Purpose SSD (gp3)
- Enable storage autoscaling: ✅

**Connectivity:**
- VPC: Default VPC
- Public access: **Yes** (para desarrollo)
- VPC security group: Create new
  - Nombre: `red-flag-db-sg`
  - Inbound rules: PostgreSQL (5432) desde tu IP

**Database Authentication:**
- Password authentication

### Paso 3: Crear la Base de Datos

1. Click en **Create database**
2. Espera 5-10 minutos para que la instancia esté disponible
3. Anota el **Endpoint** y **Puerto** (generalmente 5432)

## ⚙️ Configuración Local

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Amazon RDS PostgreSQL Connection
DATABASE_URL="postgresql://postgres:TU_PASSWORD@tu-endpoint.region.rds.amazonaws.com:5432/postgres"

# Ejemplo:
# DATABASE_URL="postgresql://postgres:MiPassword123!@red-flag-db.abc123.us-east-1.rds.amazonaws.com:5432/postgres"
```

### 2. Instalar Dependencias

```bash
bun install
```

Esto instalará:
- `pg`: Driver nativo de PostgreSQL
- `@types/pg`: Tipos de TypeScript para pg

## 🗄️ Inicializar Base de Datos

### 1. Crear Tablas e Índices

```bash
bun run db:init
```

Este comando creará:
- Tabla `reportes` con todos sus campos e índices
- Tabla `busquedas` para analytics
- Tabla `estadisticas_ciudad` para métricas
- Tipo ENUM `genero` (hombre/mujer)

### 2. Sembrar Datos de Ejemplo (Opcional)

```bash
bun run db:seed
```

Esto insertará:
- 10 reportes de ejemplo
- 3 búsquedas de ejemplo
- Estadísticas iniciales por ciudad

## 📡 API Endpoints

### GET /api/reportes
Obtener lista de reportes con paginación

**Query Parameters:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Reportes por página (default: 20)

**Ejemplo:**
```bash
GET /api/reportes?page=1&limit=10
```

**Respuesta:**
```json
{
  "reportes": [...],
  "total": 50,
  "page": 1,
  "totalPages": 5
}
```

### POST /api/reportes
Crear un nuevo reporte

**Body:**
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "edad": 28,
  "ciudad": "Lima",
  "genero": "hombre",
  "descripcion": "Comportamiento manipulador...",
  "denuncias": 1,
  "redSocial": "@usuario",
  "evidencias": ["url1", "url2"]
}
```

### GET /api/reportes/[id]
Obtener un reporte específico

### PATCH /api/reportes/[id]
Actualizar un reporte

### DELETE /api/reportes/[id]
Eliminar un reporte

### GET /api/buscar
Buscar reportes

**Query Parameters:**
- `q`: Término de búsqueda (requerido)
- `ciudad` (opcional): Filtrar por ciudad
- `genero` (opcional): Filtrar por género
- `edadMin` (opcional): Edad mínima
- `edadMax` (opcional): Edad máxima

**Ejemplo:**
```bash
GET /api/buscar?q=juan&ciudad=Lima&genero=hombre
```

### GET /api/estadisticas
Obtener estadísticas generales

**Respuesta:**
```json
{
  "totalReportes": 150,
  "reportesPorGenero": [
    { "genero": "hombre", "_count": 90 },
    { "genero": "mujer", "_count": 60 }
  ],
  "ciudadesTop": [
    { "ciudad": "Lima", "_count": 45 },
    { "ciudad": "Arequipa", "_count": 30 }
  ]
}
```

## 🌐 Deployment

### Vercel

1. **Variables de Entorno en Vercel:**
   - Ve a tu proyecto en Vercel
   - Settings → Environment Variables
   - Agrega: `DATABASE_URL` con tu connection string de RDS

2. **Deploy:**
   ```bash
   vercel deploy
   ```

### Railway

1. **Variables de Entorno:**
   - En tu proyecto Railway
   - Variables → Add Variable
   - `DATABASE_URL`: Tu connection string

2. **Deploy:**
   ```bash
   railway up
   ```

## 🔒 Seguridad

### Security Group (Producción)

Para producción, restringe el acceso:

1. Ve a EC2 → Security Groups
2. Encuentra `red-flag-db-sg`
3. Edit inbound rules:
   - Elimina "Anywhere" (0.0.0.0/0)
   - Agrega la IP de tu servidor de aplicación
   - O agrega el Security Group de tu aplicación

### Connection Pooling

El código ya incluye connection pooling configurado:
- Max connections: 20
- Idle timeout: 30 segundos
- Connection timeout: 2 segundos

## 🧪 Testing

### Test de Conexión

Crea `src/db/test.ts`:

```typescript
import { pool, connectDB } from '@/lib/db'

async function test() {
  try {
    await connectDB()
    const result = await pool.query('SELECT NOW()')
    console.log('✅ Conexión exitosa:', result.rows[0])
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await pool.end()
  }
}

test()
```

Ejecuta:
```bash
bun src/db/test.ts
```

## 💰 Costos Estimados

### Free Tier (12 meses)
- db.t3.micro o db.t4g.micro
- 20 GB de almacenamiento
- **Gratis** por 12 meses

### Después del Free Tier
- db.t3.micro: ~$15-20/mes
- db.t3.small: ~$30-40/mes
- Storage (20GB): ~$2-3/mes
- **Total estimado:** $17-43/mes

## 🆘 Troubleshooting

### Error: Connection refused
- Verifica que Public Access esté en "Yes"
- Revisa Security Group (puerto 5432 abierto)
- Confirma que la instancia RDS esté "Available"

### Error: Authentication failed
- Verifica usuario y contraseña en DATABASE_URL
- Asegúrate de no tener caracteres especiales sin codificar

### Error: Timeout
- Aumenta `connectionTimeoutMillis` en `src/lib/db.ts`
- Verifica conectividad de red
- Revisa VPC y subnet configuration

### Error: Too many connections
- Reduce `max` en pool configuration
- Implementa connection pooling en la aplicación
- Considera aumentar `max_connections` en RDS

## 📚 Recursos

- [AWS RDS Documentation](https://docs.aws.amazon.com/rds/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [node-postgres (pg) Documentation](https://node-postgres.com/)

## 🔄 Migraciones

Para cambios en el schema:

1. Modifica `src/db/init.ts` con los nuevos campos/tablas
2. Ejecuta manualmente las migraciones en producción
3. Usa `ALTER TABLE` para modificaciones sin pérdida de datos

**Ejemplo de migración:**
```sql
ALTER TABLE reportes ADD COLUMN nueva_columna VARCHAR(255);
```

## ✅ Checklist

- [ ] Crear instancia RDS en AWS
- [ ] Configurar Security Group
- [ ] Copiar endpoint y credenciales
- [ ] Crear `.env.local` con DATABASE_URL
- [ ] Instalar dependencias (`bun install`)
- [ ] Inicializar base de datos (`bun run db:init`)
- [ ] (Opcional) Sembrar datos (`bun run db:seed`)
- [ ] Probar conexión local
- [ ] Configurar variables en Vercel/Railway
- [ ] Deploy y verificar

---

¿Necesitas ayuda? Revisa la sección de [Troubleshooting](#troubleshooting) o consulta los [Recursos](#recursos).
