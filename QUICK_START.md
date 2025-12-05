# 🚀 Quick Start - Amazon Aurora PostgreSQL

## Instalación Rápida (5 minutos)

### 1. Instalar Dependencias
```bash
bun install
```

### 2. Configurar Variables de Entorno
```bash
# Copiar el archivo de ejemplo
cp .env.example .env.local

# Editar .env.local con tu información de Aurora
# DATABASE_URL="postgresql://username:password@your-endpoint:5432/database"
```

### 3. Generar Prisma Client
```bash
bun run db:generate
```

### 4. Crear Base de Datos y Tablas
```bash
bun run db:migrate
```

### 5. Poblar con Datos de Ejemplo (Opcional)
```bash
bun run db:seed
```

### 6. Iniciar el Servidor
```bash
bun run dev
```

¡Listo! Tu app está corriendo en http://localhost:3000

---

## 🔧 Comandos Útiles

```bash
# Ver base de datos en GUI
bun run db:studio

# Crear nueva migración
bun run db:migrate

# Deploy a producción
bun run db:deploy

# Resetear BD (¡CUIDADO!)
bun run db:reset
```

---

## 📡 Endpoints API Disponibles

### Reportes
- `GET /api/reportes` - Listar todos
- `GET /api/reportes?page=1&limit=20` - Con paginación
- `POST /api/reportes` - Crear nuevo
- `GET /api/reportes/[id]` - Obtener uno
- `PATCH /api/reportes/[id]` - Actualizar
- `DELETE /api/reportes/[id]` - Eliminar

### Búsqueda
- `GET /api/buscar?q=nombre&ciudad=Lima&genero=hombre`

### Estadísticas
- `GET /api/estadisticas`

---

## ❓ Problemas Comunes

### "Can't connect to database"
✅ Verifica que tu IP esté en el Security Group de AWS
✅ Revisa que el endpoint en .env.local sea correcto

### "Prisma Client not generated"
```bash
bun run db:generate
```

### "Migration failed"
```bash
bunx prisma migrate reset
bun run db:migrate
```

---

Para guía completa, ver: [AURORA_SETUP.md](./AURORA_SETUP.md)
