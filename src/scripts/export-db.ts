import { pool } from '@/lib/db'
import fs from 'fs'
import path from 'path'

async function exportDatabase() {
  console.log('🗄️  Exportando base de datos completa...\n')
  
  const client = await pool.connect()
  let sqlContent = `-- ==========================================
-- EXPONME DATABASE EXPORT
-- Fecha: ${new Date().toISOString()}
-- ==========================================

-- Eliminar tablas existentes si existen
DROP TABLE IF EXISTS busquedas CASCADE;
DROP TABLE IF EXISTS reportes CASCADE;
DROP TYPE IF EXISTS tipo_reporte CASCADE;
DROP TYPE IF EXISTS genero CASCADE;

`

  try {
    // Obtener estadísticas
    const stats = await client.query(`
      SELECT 
        COUNT(*) as total_reportes,
        SUM(CASE WHEN genero = 'hombre' THEN 1 ELSE 0 END) as total_hombres,
        SUM(CASE WHEN genero = 'mujer' THEN 1 ELSE 0 END) as total_mujeres,
        SUM(CASE WHEN tipo_reporte = 'infiel' THEN 1 ELSE 0 END) as total_infieles,
        SUM(CASE WHEN tipo_reporte = 'cachudo' THEN 1 ELSE 0 END) as total_cachudos,
        COUNT(DISTINCT ciudad) as total_ciudades
      FROM reportes
    `)
    
    const st = stats.rows[0]
    sqlContent += `-- ESTADÍSTICAS DE LA BASE DE DATOS:
-- Total de reportes: ${st.total_reportes}
-- Hombres: ${st.total_hombres}
-- Mujeres: ${st.total_mujeres}
-- Infieles: ${st.total_infieles}
-- Cachudos: ${st.total_cachudos}
-- Ciudades: ${st.total_ciudades}

`

    console.log('📊 Estadísticas de la base de datos:')
    console.log(`   Total de reportes: ${st.total_reportes}`)
    console.log(`   👨 Hombres: ${st.total_hombres}`)
    console.log(`   👩 Mujeres: ${st.total_mujeres}`)
    console.log(`   🔴 Infieles: ${st.total_infieles}`)
    console.log(`   🟡 Cachudos: ${st.total_cachudos}`)
    console.log(`   📍 Ciudades: ${st.total_ciudades}\n`)

    // Crear tipos ENUM
    sqlContent += `-- ==========================================
-- CREAR TIPOS ENUM
-- ==========================================

CREATE TYPE genero AS ENUM ('hombre', 'mujer');
CREATE TYPE tipo_reporte AS ENUM ('infiel', 'cachudo');

`

    // Crear tabla reportes
    sqlContent += `-- ==========================================
-- CREAR TABLA REPORTES
-- ==========================================

CREATE TABLE reportes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  apellido VARCHAR(255),
  edad INTEGER NOT NULL,
  ciudad VARCHAR(255) NOT NULL,
  genero genero NOT NULL,
  tipo_reporte tipo_reporte NOT NULL DEFAULT 'infiel',
  fecha TIMESTAMP NOT NULL DEFAULT NOW(),
  descripcion TEXT NOT NULL,
  denuncias INTEGER DEFAULT 1,
  red_social VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

`

    // Crear índices
    sqlContent += `-- ==========================================
-- CREAR ÍNDICES
-- ==========================================

CREATE INDEX IF NOT EXISTS idx_reportes_nombre_apellido ON reportes(nombre, apellido);
CREATE INDEX IF NOT EXISTS idx_reportes_ciudad ON reportes(ciudad);
CREATE INDEX IF NOT EXISTS idx_reportes_genero ON reportes(genero);
CREATE INDEX IF NOT EXISTS idx_reportes_tipo_reporte ON reportes(tipo_reporte);
CREATE INDEX IF NOT EXISTS idx_reportes_fecha ON reportes(fecha);

`

    // Crear tabla busquedas
    sqlContent += `-- ==========================================
-- CREAR TABLA BUSQUEDAS (ANALYTICS)
-- ==========================================

CREATE TABLE busquedas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  termino VARCHAR(255) NOT NULL,
  ciudad VARCHAR(255),
  genero genero,
  fecha TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_busquedas_termino ON busquedas(termino);
CREATE INDEX IF NOT EXISTS idx_busquedas_fecha ON busquedas(fecha);

`

    // Exportar datos de reportes
    console.log('📝 Exportando reportes...')
    const reportes = await client.query('SELECT * FROM reportes ORDER BY fecha DESC')
    
    if (reportes.rows.length > 0) {
      sqlContent += `-- ==========================================
-- DATOS DE REPORTES (${reportes.rows.length} registros)
-- ==========================================

INSERT INTO reportes (id, nombre, apellido, edad, ciudad, genero, tipo_reporte, fecha, descripcion, denuncias, red_social, created_at, updated_at) VALUES\n`

      reportes.rows.forEach((row, index) => {
        const isLast = index === reportes.rows.length - 1
        const nombre = row.nombre.replace(/'/g, "''")
        const apellido = row.apellido ? `'${row.apellido.replace(/'/g, "''")}'` : 'NULL'
        const descripcion = row.descripcion.replace(/'/g, "''")
        const redSocial = row.red_social ? `'${row.red_social.replace(/'/g, "''")}'` : 'NULL'
        const tipoReporte = row.tipo_reporte || 'infiel'
        
        sqlContent += `  ('${row.id}', '${nombre}', ${apellido}, ${row.edad}, '${row.ciudad}', '${row.genero}', '${tipoReporte}', '${row.fecha.toISOString()}', '${descripcion}', ${row.denuncias}, ${redSocial}, '${row.created_at.toISOString()}', '${row.updated_at.toISOString()}')${isLast ? ';' : ','}\n`
      })
      
      console.log(`   ✅ ${reportes.rows.length} reportes exportados`)
    }

    sqlContent += `\n-- ==========================================
-- FIN DE LA EXPORTACIÓN
-- ==========================================
`

    // Guardar archivo
    const outputPath = path.join(process.cwd(), 'exponme_database_complete.sql')
    fs.writeFileSync(outputPath, sqlContent, 'utf8')
    
    const fileSize = fs.statSync(outputPath).size / 1024
    
    console.log('\n✅ Exportación completada exitosamente!')
    console.log(`📁 Archivo: exponme_database_complete.sql`)
    console.log(`📦 Tamaño: ${fileSize.toFixed(2)} KB\n`)
    console.log('💡 Para restaurar en otra base de datos:')
    console.log('   psql -U postgres -d nueva_db -f exponme_database_complete.sql\n')
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    client.release()
    await pool.end()
  }
}

exportDatabase()
