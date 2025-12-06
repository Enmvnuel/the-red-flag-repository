# Configuración de Base de Datos PostgreSQL

## Requisitos Previos

- PostgreSQL instalado (versión 12 o superior)
- Bun o Node.js instalado
- Extensión de PostgreSQL para VS Code (ya instalada)

## Paso 1: Configurar PostgreSQL

### Usando la extensión de VS Code:

1. Abre VS Code y ve a la extensión de PostgreSQL
2. Crea una nueva conexión con:
   - Host: `localhost`
   - Puerto: `5432`
   - Usuario: `postgres`
   - Contraseña: (tu contraseña de PostgreSQL)
   - Base de datos: `postgres` (por ahora)

### O usando la terminal:

```powershell
# Iniciar sesión en PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE exponme_db;

# Conectarse a la nueva base de datos
\c exponme_db
```

## Paso 2: Configurar Variables de Entorno

El archivo `.env.local` ya fue creado con la configuración por defecto:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/exponme_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=exponme_db
DB_USER=postgres
DB_PASSWORD=postgres
```

**IMPORTANTE**: Si tu configuración de PostgreSQL es diferente, edita el archivo `.env.local` con tus credenciales.

## Paso 3: Inicializar la Base de Datos

Ejecuta el script de inicialización para crear las tablas:

```powershell
bun run db:init
```

Este comando crea:
- Tabla `reportes` (denuncias de infieles)
- Tabla `busquedas` (analytics de búsquedas)
- Tabla `estadisticas_ciudad` (estadísticas por ciudad)
- Índices para mejorar el rendimiento

## Paso 4: Sembrar Datos de Ejemplo (Opcional)

Para poblar la base de datos con datos de ejemplo:

```powershell
bun run db:seed
```

Esto insertará 10 reportes de ejemplo para probar la aplicación.

## Paso 5: Iniciar la Aplicación

```powershell
bun run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Verificar la Conexión

Para verificar que la aplicación se conectó correctamente a la base de datos:

1. Abre `http://localhost:3000/mapa`
2. Si ves "Cargando mapa..." seguido del mapa con datos, ¡funciona!
3. Si ves un error, revisa:
   - Que PostgreSQL esté corriendo
   - Que las credenciales en `.env.local` sean correctas
   - Que la base de datos `exponme_db` exista

## Solución de Problemas

### Error: "password authentication failed"
- Verifica que la contraseña en `.env.local` sea correcta
- Intenta: `psql -U postgres` para confirmar la contraseña

### Error: "database does not exist"
- Crea la base de datos: `CREATE DATABASE exponme_db;`

### Error: "connection refused"
- Verifica que PostgreSQL esté corriendo
- Windows: Abre "Servicios" y busca "PostgreSQL"
- Inicia el servicio si está detenido

### Ver logs de errores
- Abre la consola del navegador (F12) para ver errores del cliente
- Mira la terminal donde corre `bun dev` para errores del servidor

## Comandos Útiles

```powershell
# Reiniciar base de datos (BORRA TODOS LOS DATOS)
psql -U postgres -d exponme_db -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
bun run db:init
bun run db:seed

# Ver todas las tablas
psql -U postgres -d exponme_db -c "\dt"

# Ver reportes en la base de datos
psql -U postgres -d exponme_db -c "SELECT * FROM reportes;"

# Contar reportes
psql -U postgres -d exponme_db -c "SELECT COUNT(*) FROM reportes;"
```

## Estructura de la Base de Datos

### Tabla `reportes`
```sql
- id (UUID, PRIMARY KEY)
- nombre (VARCHAR)
- apellido (VARCHAR)
- edad (INTEGER)
- ciudad (VARCHAR)
- genero (ENUM: 'hombre', 'mujer')
- fecha (TIMESTAMP)
- descripcion (TEXT)
- denuncias (INTEGER)
- red_social (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Tabla `busquedas`
```sql
- id (UUID, PRIMARY KEY)
- termino (VARCHAR)
- ciudad (VARCHAR)
- genero (ENUM)
- fecha (TIMESTAMP)
```

### Tabla `estadisticas_ciudad`
```sql
- id (UUID, PRIMARY KEY)
- ciudad (VARCHAR)
- total_reportes (INTEGER)
- ultima_actualizacion (TIMESTAMP)
```

## Próximos Pasos

Ahora que la base de datos está configurada:

1. ✅ Los datos mock han sido reemplazados por datos reales de PostgreSQL
2. ✅ El mapa carga datos desde la base de datos
3. ✅ La búsqueda funciona con datos reales
4. ✅ Puedes crear nuevos reportes desde `/denunciar`
5. ✅ Las estadísticas se calculan en tiempo real

**La aplicación ahora es totalmente funcional con una base de datos real.**
