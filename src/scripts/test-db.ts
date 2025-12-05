import { pool, connectDB, disconnectDB } from '../lib/db'

async function testConnection() {
  try {
    console.log('🔄 Probando conexión a Amazon RDS PostgreSQL...\n')
    
    // Conectar
    await connectDB()
    
    // Probar consulta
    const countResult = await pool.query('SELECT COUNT(*) as total FROM reportes')
    const count = parseInt(countResult.rows[0].total)
    console.log(`📊 Total de reportes en la base de datos: ${count}`)
    
    // Obtener estadísticas
    const statsResult = await pool.query(
      'SELECT genero, COUNT(*) as count FROM reportes GROUP BY genero'
    )
    
    console.log('\n📈 Reportes por género:')
    statsResult.rows.forEach(stat => {
      console.log(`   ${stat.genero}: ${stat.count}`)
    })
    
    // Probar una consulta compleja
    const ciudadesResult = await pool.query(
      'SELECT ciudad, COUNT(*) as count FROM reportes GROUP BY ciudad ORDER BY count DESC LIMIT 5'
    )
    
    console.log('\n🏙️  Top 5 ciudades con más reportes:')
    ciudadesResult.rows.forEach((ciudad, index) => {
      console.log(`   ${index + 1}. ${ciudad.ciudad}: ${ciudad.count} reportes`)
    })
    
    console.log('\n✅ Todas las pruebas pasaron exitosamente!')
    console.log('👋 Desconectando...\n')
    
  } catch (error) {
    console.error('\n❌ Error de conexión:', error)
    console.error('\n💡 Verifica:')
    console.error('   1. Que el archivo .env.local exista con DATABASE_URL')
    console.error('   2. Que las credenciales de RDS sean correctas')
    console.error('   3. Que el Security Group permita tu IP')
    console.error('   4. Que hayas ejecutado: bun run db:init\n')
    process.exit(1)
  } finally {
    await disconnectDB()
  }
}

testConnection()

