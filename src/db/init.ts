import { Pool } from 'pg'

// Crear pool con configuración SSL para certificados auto-firmados
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

async function initDatabase() {
  const client = await pool.connect()
  
  try {
    console.log('🔧 Inicializando base de datos...')

    // Crear tipo ENUM para género
    await client.query(`
      DO $$ BEGIN
        CREATE TYPE genero AS ENUM ('hombre', 'mujer');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `)

    // Crear tabla de reportes
    await client.query(`
      CREATE TABLE IF NOT EXISTS reportes (
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
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)

    // Crear índices para mejorar el rendimiento
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_reportes_nombre_apellido 
      ON reportes(nombre, apellido)
    `)
    
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_reportes_ciudad 
      ON reportes(ciudad)
    `)
    
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_reportes_genero 
      ON reportes(genero)
    `)
    
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_reportes_fecha 
      ON reportes(fecha)
    `)

    // Crear tabla de búsquedas para analytics
    await client.query(`
      CREATE TABLE IF NOT EXISTS busquedas (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        termino VARCHAR(255) NOT NULL,
        ciudad VARCHAR(255),
        genero genero,
        fecha TIMESTAMP DEFAULT NOW()
      )
    `)

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_busquedas_termino 
      ON busquedas(termino)
    `)
    
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_busquedas_fecha 
      ON busquedas(fecha)
    `)

    // Crear tabla de estadísticas por ciudad
    await client.query(`
      CREATE TABLE IF NOT EXISTS estadisticas_ciudad (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        ciudad VARCHAR(255) UNIQUE NOT NULL,
        total_reportes INTEGER DEFAULT 0,
        ultima_actualizacion TIMESTAMP DEFAULT NOW()
      )
    `)

    console.log('✅ Base de datos inicializada correctamente')
    console.log('📊 Tablas creadas:')
    console.log('   - reportes')
    console.log('   - busquedas')
    console.log('   - estadisticas_ciudad')
    
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error)
    throw error
  } finally {
    client.release()
    await pool.end()
  }
}

initDatabase()
