# 🚩 The Red Flag Repository

Plataforma web para reportar y consultar comportamientos inapropiados en relaciones personales, ayudando a la comunidad a tomar decisiones informadas.

---

## 🌟 Características

- 🔍 **Búsqueda de reportes** por nombre, ciudad y género
- 📝 **Sistema de denuncias** anónimas
- 📊 **Estadísticas** por ciudad y género
- 🗺️ **Mapa interactivo** del Perú con datos por región
- 📱 **Diseño responsive** para todos los dispositivos
- 🚀 **Performance optimizado** con Next.js 16
- 🗄️ **Base de datos** Amazon Aurora PostgreSQL

---

## 🛠️ Stack Tecnológico

- **Frontend:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS 4
- **Animaciones:** Framer Motion
- **Base de Datos:** Amazon RDS PostgreSQL
- **Driver:** node-postgres (pg)
- **Runtime:** Bun
- **Iconos:** Lucide React

---

## 🚀 Inicio Rápido

### Desarrollo Local (Sin Base de Datos)

```bash
# Instalar dependencias
bun install

# Iniciar servidor de desarrollo
bun run dev
```

Abre [http://localhost:3000](http://localhost:3000)

### Con Base de Datos Amazon RDS PostgreSQL

👉 **Ver guía completa:** [RDS_SETUP.md](./RDS_SETUP.md)

**Pasos rápidos:**

```bash
# 1. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales de RDS

# 2. Instalar dependencias
bun install

# 3. Inicializar base de datos
bun run db:init

# 4. [Opcional] Agregar datos de ejemplo
bun run db:seed

# 5. Iniciar aplicación
bun run dev
```

---

## 📚 Documentación

- 📖 [**RDS_SETUP.md**](./RDS_SETUP.md) - Guía completa de configuración de Amazon RDS PostgreSQL

---

## 🗂️ Estructura del Proyecto

```
the-red-flag-repository/
├── src/
│   ├── app/                  # Rutas de Next.js
│   │   ├── api/             # Endpoints REST
│   │   │   ├── reportes/    # CRUD de reportes
│   │   │   ├── buscar/      # Búsqueda
│   │   │   └── estadisticas/
│   │   ├── buscar/          # Página de búsqueda
│   │   ├── denunciar/       # Formulario de denuncia
│   │   ├── mapa/            # Mapa interactivo
│   │   └── ...
│   ├── components/          # Componentes React
│   │   ├── pages/           # Componentes de página
│   │   └── ui/              # Componentes UI
│   ├── lib/                 # Utilidades
│   │   ├── db.ts           # Pool de conexiones PostgreSQL
│   │   └── queries.ts      # Funciones de BD
│   ├── types/              # Tipos TypeScript
│   └── scripts/            # Scripts de utilidad
├── src/db/
│   ├── init.ts             # Inicializar tablas
│   └── seed.ts             # Datos de ejemplo
├── public/                 # Archivos estáticos
└── ...
```

---

## 🔌 API Endpoints

### Reportes
- `GET /api/reportes` - Listar todos (paginado)
- `POST /api/reportes` - Crear nuevo
- `GET /api/reportes/[id]` - Obtener por ID
- `PATCH /api/reportes/[id]` - Actualizar
- `DELETE /api/reportes/[id]` - Eliminar

### Búsqueda
- `GET /api/buscar?q=nombre&ciudad=Lima&genero=hombre`

### Estadísticas
- `GET /api/estadisticas`

**Ejemplo de uso:**

```bash
# Crear reporte
curl -X POST http://localhost:3000/api/reportes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "edad": 28,
    "ciudad": "Lima",
    "genero": "hombre",
    "descripcion": "Descripción..."
  }'

# Buscar
curl "http://localhost:3000/api/buscar?q=Juan&ciudad=Lima"
```

---

## 🎨 Scripts Disponibles

```bash
# Desarrollo
bun run dev          # Servidor de desarrollo

# Producción
bun run build        # Build optimizado
bun run start        # Servidor de producción

# Base de Datos
bun run db:init      # Inicializar tablas e índices
bun run db:seed      # Poblar con datos de ejemplo

# Testing
bun src/scripts/test-db.ts  # Probar conexión BD

# Linting
bun run lint         # Ejecutar ESLint
```

---

## 🌐 Páginas Principales

- `/` - Página principal
- `/buscar` - Búsqueda de reportes
- `/denunciar` - Formulario de denuncia
- `/hombres` - Reportes de hombres
- `/mujeres` - Reportes de mujeres
- `/mapa` - Mapa interactivo del Perú
- `/conducta` - Guía de conductas inapropiadas
- `/reporte/[id]` - Detalle de reporte
- `/privacidad` - Política de privacidad
- `/terminos` - Términos de uso

---

## 🔐 Variables de Entorno

Crea un archivo `.env.local`:

```env
# Base de datos (Amazon RDS PostgreSQL)
DATABASE_URL="postgresql://username:password@endpoint.rds.amazonaws.com:5432/database"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🚢 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push

```bash
vercel --prod
```

### Otras plataformas

Compatible con:
- Railway
- Render
- AWS Amplify
- Netlify
- Docker

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo licencia MIT.

---

## 🆘 Soporte

¿Problemas? Revisa:
- [DATABASE_README.md](./DATABASE_README.md) - Setup de base de datos
- [AURORA_SETUP.md](./AURORA_SETUP.md) - Troubleshooting detallado
- Issues de GitHub

---

## 🙏 Agradecimientos

- Next.js Team
- Prisma Team
- Comunidad de Open Source

---

## 📞 Contacto

- GitHub: [@Enmvnuel](https://github.com/Enmvnuel)
- Repository: [the-red-flag-repository](https://github.com/Enmvnuel/the-red-flag-repository)

---

*Construido con ❤️ usando Next.js y Amazon Aurora PostgreSQL*

