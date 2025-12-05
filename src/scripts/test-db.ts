import { prisma, connectDB } from '../lib/db'

async function testConnection() {
  try {
    console.log('🔄 Probando conexión a Amazon Aurora PostgreSQL...\n')
    
    // Conectar
    await connectDB()
    
    // Probar consulta
    const count = await prisma.reporte.count()
    console.log(`📊 Total de reportes en la base de datos: ${count}`)
    
    // Obtener estadísticas
    const stats = await prisma.reporte.groupBy({
      by: ['genero'],
      _count: true,
    })
    
    console.log('\n📈 Reportes por género:')
    stats.forEach(stat => {
      console.log(`   ${stat.genero}: ${stat._count}`)
    })
    
    // Probar una consulta compleja
    const ciudades = await prisma.reporte.groupBy({
      by: ['ciudad'],
      _count: true,
      orderBy: {
        _count: {
          ciudad: 'desc'
        }
      },
      take: 5
    })
    
    console.log('\n🏙️  Top 5 ciudades con más reportes:')
    ciudades.forEach((ciudad, index) => {
      console.log(`   ${index + 1}. ${ciudad.ciudad}: ${ciudad._count} reportes`)
    })
    
    console.log('\n✅ Todas las pruebas pasaron exitosamente!')
    console.log('👋 Desconectando...\n')
    
    await prisma.$disconnect()
  } catch (error) {
    console.error('\n❌ Error de conexión:', error)
    console.error('\n💡 Verifica:')
    console.error('   1. Que el archivo .env.local exista con DATABASE_URL')
    console.error('   2. Que las credenciales de Aurora sean correctas')
    console.error('   3. Que el Security Group permita tu IP')
    console.error('   4. Que hayas ejecutado: bun run db:migrate\n')
    process.exit(1)
  }
}

testConnection()
