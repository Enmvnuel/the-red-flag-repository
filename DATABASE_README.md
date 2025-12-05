# 🚩 The Red Flag Repository - Database Setup

## ✅ ¡Proyecto Preparado para Amazon Aurora PostgreSQL!

Tu proyecto ahora está completamente configurado para usar Amazon Aurora PostgreSQL como base de datos.

---

## 📦 Lo que se ha añadido:

### 🗄️ Base de Datos
- ✅ **Prisma ORM** - Cliente de base de datos moderno y type-safe
- ✅ **Schema completo** - Modelos de Reporte, Búsqueda y Estadísticas
- ✅ **Migraciones** - Sistema de versionado de base de datos
- ✅ **Seed data** - Script para poblar con datos de ejemplo

### 🔌 APIs REST
- ✅ `GET /api/reportes` - Listar reportes (con paginación)
- ✅ `POST /api/reportes` - Crear nuevo reporte
- ✅ `GET /api/reportes/[id]` - Obtener reporte específico
- ✅ `PATCH /api/reportes/[id]` - Actualizar reporte
- ✅ `DELETE /api/reportes/[id]` - Eliminar reporte
- ✅ `GET /api/buscar` - Buscar reportes con filtros
- ✅ `GET /api/estadisticas` - Estadísticas generales

### 📚 Funciones de Base de Datos
- ✅ `getReportes()` - Listar con paginación
- ✅ `buscarReportes()` - Búsqueda avanzada
- ✅ `crearReporte()` - Crear nuevo
- ✅ `getReportePorId()` - Obtener por ID
- ✅ `incrementarDenuncias()` - Incrementar contador
- ✅ `getEstadisticas()` - Stats generales
- ✅ `getReportesPorCiudad()` - Filtrar por ciudad
- ✅ `getReportesPorGenero()` - Filtrar por género

### 📄 Documentación
- ✅ `AURORA_SETUP.md` - Guía completa (50+ páginas)
- ✅ `QUICK_START.md` - Inicio rápido (5 minutos)
- ✅ Scripts de prueba y setup automatizado

---

## 🚀 Próximos Pasos

### 1️⃣ Configurar Amazon Aurora (15-30 min)

Lee la guía completa: **[AURORA_SETUP.md](./AURORA_SETUP.md)**

**Resumen rápido:**
1. Ir a AWS Console > RDS
2. Crear nuevo cluster Aurora PostgreSQL
3. Configurar Security Group para permitir tu IP
4. Copiar el endpoint de conexión

### 2️⃣ Configurar Variables de Entorno (2 min)

```bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# Editar con tus credenciales de Aurora
# DATABASE_URL="postgresql://user:password@endpoint:5432/database"
```

### 3️⃣ Instalar y Configurar (5 min)

```bash
# Instalar dependencias
bun install

# Generar Prisma Client
bun run db:generate

# Crear tablas en Aurora
bun run db:migrate

# [OPCIONAL] Agregar datos de ejemplo
bun run db:seed
```

### 4️⃣ Probar Conexión (1 min)

```bash
# Verificar que todo funciona
bun src/scripts/test-db.ts

# Ver base de datos en GUI
bun run db:studio
```

### 5️⃣ Iniciar Aplicación

```bash
bun run dev
# Abre http://localhost:3000
```

---

## 📖 Guías Disponibles

### Para Principiantes
👉 **[QUICK_START.md](./QUICK_START.md)** - Inicio rápido en 5 minutos

### Para Configuración Completa
👉 **[AURORA_SETUP.md](./AURORA_SETUP.md)** - Guía detallada con:
- Paso a paso de AWS
- Configuración de seguridad
- Optimización de performance
- Troubleshooting
- Costos estimados
- Best practices

---

## 💡 Comandos Útiles

```bash
# Base de datos
bun run db:generate  # Generar Prisma Client
bun run db:migrate   # Crear migración
bun run db:deploy    # Deploy a producción
bun run db:studio    # Abrir GUI de base de datos
bun run db:seed      # Poblar con datos
bun run db:reset     # Resetear BD (¡CUIDADO!)

# Desarrollo
bun run dev          # Iniciar servidor dev
bun run build        # Build para producción
bun run start        # Iniciar en producción

# Testing
bun src/scripts/test-db.ts  # Probar conexión
```

---

## 🌐 Endpoints API Ejemplos

### Crear Reporte
```bash
curl -X POST http://localhost:3000/api/reportes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "Pérez",
    "edad": 28,
    "ciudad": "Lima",
    "genero": "hombre",
    "descripcion": "Comportamiento inapropiado..."
  }'
```

### Buscar Reportes
```bash
curl "http://localhost:3000/api/buscar?q=Juan&ciudad=Lima&genero=hombre"
```

### Obtener Estadísticas
```bash
curl http://localhost:3000/api/estadisticas
```

---

## 🏗️ Estructura de Archivos Nuevos

```
proyecto/
├── prisma/
│   ├── schema.prisma          # Schema de base de datos
│   └── seed.ts                # Datos de ejemplo
├── src/
│   ├── lib/
│   │   ├── db.ts             # Cliente Prisma
│   │   └── queries.ts        # Funciones de BD
│   ├── app/api/
│   │   ├── reportes/
│   │   │   ├── route.ts      # GET, POST /api/reportes
│   │   │   └── [id]/route.ts # GET, PATCH, DELETE
│   │   ├── buscar/route.ts   # Búsqueda
│   │   └── estadisticas/route.ts
│   └── scripts/
│       └── test-db.ts        # Test de conexión
├── .env.local.example        # Ejemplo de variables
├── AURORA_SETUP.md           # Guía completa
└── QUICK_START.md            # Inicio rápido
```

---

## 🔐 Seguridad

### ⚠️ IMPORTANTE - NO subir a Git:
- ❌ `.env.local` (contiene credenciales)
- ❌ `bun.lockb` (puede contener info sensible)
- ✅ Ya están en `.gitignore`

### ✅ Buenas Prácticas:
- Usar contraseñas fuertes para Aurora
- Habilitar SSL en producción
- Configurar Security Groups restrictivos
- Usar IAM authentication cuando sea posible
- Rotar credenciales regularmente

---

## 💰 Costos Estimados de AWS

### Desarrollo (Single-AZ, db.t4g.medium):
- **~$50-70/mes**

### Producción (Multi-AZ, db.r6g.large):
- **~$400-600/mes**

💡 **Tip:** Usa Aurora Serverless v2 para auto-scaling y reducir costos.

---

## 🆘 ¿Problemas?

### No puedo conectar a Aurora
1. ✅ Verifica que tu IP esté en el Security Group
2. ✅ Confirma que el endpoint es correcto
3. ✅ Revisa que las credenciales sean correctas

### Prisma no genera el client
```bash
bun run db:generate --force
```

### Las migraciones fallan
```bash
bunx prisma migrate reset
bun run db:migrate
```

### Para más ayuda:
👉 Ver sección **Troubleshooting** en [AURORA_SETUP.md](./AURORA_SETUP.md)

---

## 📞 Recursos Adicionales

- [Prisma Docs](https://www.prisma.io/docs)
- [Aurora PostgreSQL Docs](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

## ✅ Checklist de Implementación

Marca lo que has completado:

- [ ] Cluster de Aurora creado en AWS
- [ ] Security Group configurado
- [ ] Endpoint copiado
- [ ] `.env.local` configurado con DATABASE_URL
- [ ] Dependencias instaladas (`bun install`)
- [ ] Prisma Client generado (`bun run db:generate`)
- [ ] Migraciones aplicadas (`bun run db:migrate`)
- [ ] Conexión probada (`bun src/scripts/test-db.ts`)
- [ ] Datos de ejemplo agregados (opcional, `bun run db:seed`)
- [ ] Servidor iniciado (`bun run dev`)
- [ ] APIs probadas (http://localhost:3000/api/reportes)

---

## 🎉 ¡Felicitaciones!

Tu aplicación **The Red Flag Repository** ahora está lista para usar Amazon Aurora PostgreSQL como base de datos profesional y escalable.

**¿Listo para comenzar?** 👉 Sigue el **[QUICK_START.md](./QUICK_START.md)**

---

*Última actualización: Diciembre 2025*
