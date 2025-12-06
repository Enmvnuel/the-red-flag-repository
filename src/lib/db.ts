import { Pool, PoolClient } from 'pg'

// Pool de conexiones para PostgreSQL
const globalForPg = globalThis as unknown as {
  pool: Pool | undefined
}

// Verificar que DATABASE_URL exista
if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL no está configurada')
  console.error('Configura la variable de entorno DATABASE_URL en:')
  console.error('- Desarrollo: archivo .env.local')
  console.error('- Producción: Panel de Dokploy → Environment Variables')
  throw new Error('DATABASE_URL is required')
}

export const pool = globalForPg.pool ?? new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20, // máximo de conexiones
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// Log de conexión (solo en desarrollo)
if (process.env.NODE_ENV !== 'production') {
  const dbHost = process.env.DATABASE_URL?.match(/@([^:]+)/)?.[1] || 'unknown'
  console.log(`✅ Conectado a PostgreSQL: ${dbHost}`)
}

if (process.env.NODE_ENV !== 'production') globalForPg.pool = pool

// Función helper para obtener un cliente del pool
export async function getClient(): Promise<PoolClient> {
  return await pool.connect()
}

// Función helper para ejecutar queries
export async function query(text: string, params?: any[]) {
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Executed query', { text, duration, rows: res.rowCount })
  }
  
  return res
}

// Función helper para manejar conexiones
export async function connectDB() {
  try {
    const client = await pool.connect()
    await client.query('SELECT NOW()')
    client.release()
    console.log('✅ Conectado a Amazon RDS PostgreSQL')
  } catch (error) {
    console.error('❌ Error conectando a la base de datos:', error)
    throw error
  }
}

// Función para cerrar el pool
export async function disconnectDB() {
  await pool.end()
}
