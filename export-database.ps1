# Script para exportar la base de datos completa de Exponme
# Este script genera un archivo SQL con toda la estructura y datos

Write-Host "🗄️  Exportando base de datos de Exponme..." -ForegroundColor Cyan

# Configuración (edita según tu configuración)
$DB_USER = "postgres"
$DB_NAME = "exponme_db"
$DB_HOST = "localhost"
$DB_PORT = "5432"
$OUTPUT_FILE = "exponme_database_export_$(Get-Date -Format 'yyyy-MM-dd_HHmmss').sql"

# Solicitar contraseña
$securePass = Read-Host "Contraseña de PostgreSQL" -AsSecureString
$DB_PASS = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePass))

Write-Host "`n📊 Exportando estructura y datos..." -ForegroundColor Yellow

# Configurar variable de entorno para la contraseña
$env:PGPASSWORD = $DB_PASS

# Exportar toda la base de datos
pg_dump -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -F p -f $OUTPUT_FILE

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Base de datos exportada exitosamente a: $OUTPUT_FILE" -ForegroundColor Green
    
    # Obtener estadísticas
    $fileSize = (Get-Item $OUTPUT_FILE).Length / 1KB
    Write-Host "📦 Tamaño del archivo: $([math]::Round($fileSize, 2)) KB" -ForegroundColor Cyan
    
    # Contar registros
    Write-Host "`n📈 Obteniendo estadísticas..." -ForegroundColor Yellow
    
    $totalReportes = psql -U $DB_USER -h $DB_HOST -d $DB_NAME -t -c "SELECT COUNT(*) FROM reportes;" 2>$null
    $totalHombres = psql -U $DB_USER -h $DB_HOST -d $DB_NAME -t -c "SELECT COUNT(*) FROM reportes WHERE genero = 'hombre';" 2>$null
    $totalMujeres = psql -U $DB_USER -h $DB_HOST -d $DB_NAME -t -c "SELECT COUNT(*) FROM reportes WHERE genero = 'mujer';" 2>$null
    $totalInfieles = psql -U $DB_USER -h $DB_HOST -d $DB_NAME -t -c "SELECT COUNT(*) FROM reportes WHERE tipo_reporte = 'infiel';" 2>$null
    $totalCachudos = psql -U $DB_USER -h $DB_HOST -d $DB_NAME -t -c "SELECT COUNT(*) FROM reportes WHERE tipo_reporte = 'cachudo';" 2>$null
    $ciudades = psql -U $DB_USER -h $DB_HOST -d $DB_NAME -t -c "SELECT COUNT(DISTINCT ciudad) FROM reportes;" 2>$null
    
    Write-Host "`n════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "📊 RESUMEN DE LA BASE DE DATOS" -ForegroundColor Green -BackgroundColor Black
    Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "Total de reportes: $($totalReportes.Trim())" -ForegroundColor White
    Write-Host "  👨 Hombres: $($totalHombres.Trim())" -ForegroundColor Blue
    Write-Host "  👩 Mujeres: $($totalMujeres.Trim())" -ForegroundColor Magenta
    Write-Host "  🔴 Infieles: $($totalInfieles.Trim())" -ForegroundColor Red
    Write-Host "  🟡 Cachudos: $($totalCachudos.Trim())" -ForegroundColor Yellow
    Write-Host "  📍 Ciudades: $($ciudades.Trim())" -ForegroundColor Cyan
    Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
    
    # Crear archivo README para el amigo
    $readmeContent = @"
# Base de Datos Exponme - Exportación $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')

## 📊 Contenido de la Exportación

Este archivo SQL contiene la base de datos completa de **Exponme**, una plataforma de reportes de infidelidad.

### Estadísticas:
- **Total de reportes**: $($totalReportes.Trim())
  - Hombres: $($totalHombres.Trim())
  - Mujeres: $($totalMujeres.Trim())
  - Infieles: $($totalInfieles.Trim())
  - Cachudos: $($totalCachudos.Trim())
- **Ciudades**: $($ciudades.Trim()) departamentos de Perú

## 🗄️ Estructura de la Base de Datos

### Tabla: ``reportes``
Contiene todos los reportes de infieles y cachudos.

**Columnas:**
- ``id`` (UUID) - Identificador único
- ``nombre`` (VARCHAR) - Nombre del reportado
- ``apellido`` (VARCHAR) - Apellido del reportado
- ``edad`` (INTEGER) - Edad del reportado
- ``ciudad`` (VARCHAR) - Ciudad/departamento
- ``genero`` (ENUM) - 'hombre' o 'mujer'
- ``tipo_reporte`` (ENUM) - 'infiel' o 'cachudo'
- ``fecha`` (TIMESTAMP) - Fecha del reporte
- ``descripcion`` (TEXT) - Descripción del caso
- ``denuncias`` (INTEGER) - Número de denuncias
- ``red_social`` (VARCHAR) - Perfil de red social (opcional)
- ``created_at`` (TIMESTAMP) - Fecha de creación
- ``updated_at`` (TIMESTAMP) - Última actualización

### Tabla: ``busquedas``
Analytics de búsquedas realizadas en la plataforma.

**Columnas:**
- ``id`` (UUID) - Identificador único
- ``termino`` (VARCHAR) - Término buscado
- ``ciudad`` (VARCHAR) - Filtro de ciudad
- ``genero`` (ENUM) - Filtro de género
- ``fecha`` (TIMESTAMP) - Fecha de la búsqueda

## 📥 Cómo Restaurar la Base de Datos

### Requisitos:
- PostgreSQL 12 o superior instalado
- Acceso a una base de datos PostgreSQL

### Pasos:

1. **Crear una nueva base de datos:**
``````bash
createdb -U postgres exponme_db
``````

2. **Restaurar el backup:**
``````bash
psql -U postgres -d exponme_db -f $OUTPUT_FILE
``````

O en Windows PowerShell:
``````powershell
`$env:PGPASSWORD = "tu_contraseña"
psql -U postgres -d exponme_db -f "$OUTPUT_FILE"
``````

3. **Verificar la importación:**
``````bash
psql -U postgres -d exponme_db -c "SELECT COUNT(*) FROM reportes;"
``````

## 🔧 Configuración para la Aplicación

Después de restaurar la base de datos, configura las variables de entorno en ``.env.local``:

``````env
# PostgreSQL Database Configuration
DATABASE_URL=postgresql://postgres:tu_contraseña@localhost:5432/exponme_db

# Database Connection Pool
DB_HOST=localhost
DB_PORT=5432
DB_NAME=exponme_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_MAX_CONNECTIONS=20
``````

## 🚀 Iniciar la Aplicación

1. Instala las dependencias:
``````bash
bun install
``````

2. Inicia el servidor de desarrollo:
``````bash
bun dev
``````

3. Abre en el navegador:
``````
http://localhost:3000
``````

## 📚 Documentación Adicional

- ``DATABASE_SETUP.md`` - Guía completa de configuración
- ``README.md`` - Información general del proyecto
- ``RDS_SETUP.md`` - Configuración de AWS RDS (producción)

## ⚠️ Notas Importantes

- Esta base de datos contiene información sensible de reportes
- Usa solo para propósitos de desarrollo y pruebas
- Respeta la privacidad de los datos
- NO publiques este archivo en repositorios públicos

## 🔐 Seguridad

- Cambia las contraseñas por defecto
- Usa SSL/TLS para conexiones en producción
- Implementa rate limiting en la API
- Valida y sanitiza todas las entradas

## 📞 Soporte

Para preguntas o problemas:
- GitHub: https://github.com/Enmvnuel/the-red-flag-repository
- Email: [tu correo aquí]

---

**Generado el:** $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
**Versión de PostgreSQL:** $(psql --version 2>$null)
"@

    # Guardar README
    $readmeFile = "INSTRUCCIONES_IMPORTACION.md"
    $readmeContent | Out-File -FilePath $readmeFile -Encoding UTF8
    
    Write-Host "`n📝 Archivo de instrucciones creado: $readmeFile" -ForegroundColor Green
    
    # Crear carpeta de exportación
    $exportFolder = "exponme_export_$(Get-Date -Format 'yyyy-MM-dd_HHmmss')"
    New-Item -ItemType Directory -Path $exportFolder -Force | Out-Null
    
    # Mover archivos a la carpeta
    Move-Item $OUTPUT_FILE $exportFolder -Force
    Move-Item $readmeFile $exportFolder -Force
    
    # Copiar archivos importantes del proyecto
    Write-Host "`n📋 Copiando archivos del proyecto..." -ForegroundColor Yellow
    Copy-Item "README.md" "$exportFolder/" -ErrorAction SilentlyContinue
    Copy-Item "DATABASE_SETUP.md" "$exportFolder/" -ErrorAction SilentlyContinue
    Copy-Item "package.json" "$exportFolder/" -ErrorAction SilentlyContinue
    Copy-Item ".env.local.example" "$exportFolder/" -ErrorAction SilentlyContinue
    
    # Si no existe .env.local.example, crear uno
    if (-not (Test-Path "$exportFolder/.env.local.example")) {
        @"
# PostgreSQL Database Configuration
DATABASE_URL=postgresql://postgres:tu_contraseña@localhost:5432/exponme_db

# Database Connection Pool
DB_HOST=localhost
DB_PORT=5432
DB_NAME=exponme_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_MAX_CONNECTIONS=20
"@ | Out-File -FilePath "$exportFolder/.env.local.example" -Encoding UTF8
    }
    
    # Crear archivo ZIP
    Write-Host "`n📦 Creando archivo comprimido..." -ForegroundColor Yellow
    $zipFile = "$exportFolder.zip"
    Compress-Archive -Path $exportFolder -DestinationPath $zipFile -Force
    
    Write-Host "`n✅ ¡Exportación completada!" -ForegroundColor Green
    Write-Host "`n════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "📦 ARCHIVOS GENERADOS:" -ForegroundColor Green -BackgroundColor Black
    Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "📁 Carpeta: $exportFolder" -ForegroundColor White
    Write-Host "📦 ZIP: $zipFile" -ForegroundColor White
    Write-Host "`nContenido:" -ForegroundColor Yellow
    Write-Host "  - Base de datos SQL" -ForegroundColor White
    Write-Host "  - Instrucciones de importación" -ForegroundColor White
    Write-Host "  - Documentación del proyecto" -ForegroundColor White
    Write-Host "  - Archivo .env de ejemplo" -ForegroundColor White
    Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "`n💡 Envía el archivo $zipFile a tu amigo" -ForegroundColor Yellow
    Write-Host "   Tamaño: $([math]::Round((Get-Item $zipFile).Length / 1MB, 2)) MB" -ForegroundColor Cyan
    
    # Abrir la carpeta en el explorador
    Write-Host "`n🔍 Abriendo carpeta de exportación..." -ForegroundColor Yellow
    Start-Process explorer.exe -ArgumentList (Resolve-Path $exportFolder)
    
} else {
    Write-Host "`n❌ Error al exportar la base de datos" -ForegroundColor Red
    Write-Host "   Verifica que PostgreSQL esté corriendo y las credenciales sean correctas" -ForegroundColor Yellow
}

# Limpiar contraseña
$env:PGPASSWORD = ""
Remove-Variable DB_PASS -ErrorAction SilentlyContinue

Write-Host ""
