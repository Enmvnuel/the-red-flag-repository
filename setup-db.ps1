# Script de configuración de base de datos para Exponme
Write-Host "🚀 Configurando base de datos PostgreSQL para Exponme..." -ForegroundColor Cyan

# Verificar si PostgreSQL está instalado
Write-Host "`n📦 Verificando PostgreSQL..." -ForegroundColor Yellow
$pgVersion = & pg_config --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ PostgreSQL encontrado: $pgVersion" -ForegroundColor Green
} else {
    Write-Host "❌ PostgreSQL no encontrado. Por favor instala PostgreSQL primero." -ForegroundColor Red
    Write-Host "   Descarga: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
    exit 1
}

# Solicitar credenciales
Write-Host "`n🔐 Configuración de credenciales" -ForegroundColor Yellow
$dbUser = Read-Host "Usuario de PostgreSQL (default: postgres)"
if ([string]::IsNullOrWhiteSpace($dbUser)) { $dbUser = "postgres" }

$securePass = Read-Host "Contraseña de PostgreSQL" -AsSecureString
$dbPass = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePass))

$dbName = Read-Host "Nombre de la base de datos (default: exponme_db)"
if ([string]::IsNullOrWhiteSpace($dbName)) { $dbName = "exponme_db" }

# Crear archivo .env.local
Write-Host "`n📝 Creando archivo .env.local..." -ForegroundColor Yellow
$envContent = @"
# PostgreSQL Database Configuration
DATABASE_URL=postgresql://${dbUser}:${dbPass}@localhost:5432/${dbName}

# Database Connection Pool
DB_HOST=localhost
DB_PORT=5432
DB_NAME=${dbName}
DB_USER=${dbUser}
DB_PASSWORD=${dbPass}
DB_MAX_CONNECTIONS=20
"@

$envContent | Out-File -FilePath ".env.local" -Encoding UTF8
Write-Host "✅ Archivo .env.local creado" -ForegroundColor Green

# Crear base de datos
Write-Host "`n🗄️  Creando base de datos '$dbName'..." -ForegroundColor Yellow
$env:PGPASSWORD = $dbPass
$createDbResult = & psql -U $dbUser -h localhost -c "CREATE DATABASE $dbName;" 2>&1

if ($createDbResult -like "*already exists*") {
    Write-Host "⚠️  La base de datos ya existe, se usará la existente" -ForegroundColor Yellow
} elseif ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Base de datos '$dbName' creada exitosamente" -ForegroundColor Green
} else {
    Write-Host "❌ Error creando base de datos: $createDbResult" -ForegroundColor Red
    exit 1
}

# Inicializar tablas
Write-Host "`n📊 Inicializando tablas..." -ForegroundColor Yellow
bun run db:init

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Tablas creadas exitosamente" -ForegroundColor Green
} else {
    Write-Host "❌ Error inicializando tablas" -ForegroundColor Red
    exit 1
}

# Preguntar si quiere sembrar datos
Write-Host "`n🌱 ¿Deseas agregar datos de ejemplo?" -ForegroundColor Yellow
$seed = Read-Host "(S/N)"

if ($seed -eq "S" -or $seed -eq "s") {
    Write-Host "`n🌱 Sembrando datos de ejemplo..." -ForegroundColor Yellow
    bun run db:seed
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Datos de ejemplo agregados" -ForegroundColor Green
    } else {
        Write-Host "❌ Error sembrando datos" -ForegroundColor Red
    }
}

# Resumen final
Write-Host "`n" -NoNewline
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✨ Configuración completada exitosamente ✨" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "`nPróximos pasos:" -ForegroundColor Yellow
Write-Host "  1. Ejecuta: " -NoNewline -ForegroundColor White
Write-Host "bun run dev" -ForegroundColor Cyan
Write-Host "  2. Abre: " -NoNewline -ForegroundColor White
Write-Host "http://localhost:3000" -ForegroundColor Cyan
Write-Host "`n📚 Documentación: DATABASE_SETUP.md" -ForegroundColor Yellow
Write-Host ""

# Limpiar variable de contraseña
Remove-Variable dbPass
$env:PGPASSWORD = ""
