import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

async function seed() {
  const client = await pool.connect()
  
  try {
    console.log('🌱 Insertando datos de prueba...')

    // Limpiar datos existentes
    await client.query('DELETE FROM reportes')

    // Insertar reportes con distribución por género
    const reportes = [
      // Lima - mayoría mujeres (7 mujeres, 3 hombres)
      { nombre: 'María', apellido: 'García', edad: 28, ciudad: 'Lima', genero: 'mujer', descripcion: 'Infidelidad comprobada', denuncias: 2 },
      { nombre: 'Ana', apellido: 'López', edad: 32, ciudad: 'Lima', genero: 'mujer', descripcion: 'Engaño confirmado', denuncias: 1 },
      { nombre: 'Carlos', apellido: 'Pérez', edad: 35, ciudad: 'Lima', genero: 'hombre', descripcion: 'Infiel serial', denuncias: 3 },
      { nombre: 'Laura', apellido: 'Martínez', edad: 29, ciudad: 'Lima', genero: 'mujer', descripcion: 'Doble vida', denuncias: 2 },
      { nombre: 'Rosa', apellido: 'Fernández', edad: 26, ciudad: 'Lima', genero: 'mujer', descripcion: 'Infidelidad', denuncias: 1 },
      { nombre: 'Pedro', apellido: 'Sánchez', edad: 31, ciudad: 'Lima', genero: 'hombre', descripcion: 'Engaño', denuncias: 1 },
      { nombre: 'Sofía', apellido: 'Torres', edad: 27, ciudad: 'Lima', genero: 'mujer', descripcion: 'Infiel', denuncias: 2 },
      { nombre: 'Carmen', apellido: 'Díaz', edad: 30, ciudad: 'Lima', genero: 'mujer', descripcion: 'Infidelidad', denuncias: 1 },
      { nombre: 'Jorge', apellido: 'Ramírez', edad: 33, ciudad: 'Lima', genero: 'hombre', descripcion: 'Engaño', denuncias: 2 },
      { nombre: 'Patricia', apellido: 'Vega', edad: 28, ciudad: 'Lima', genero: 'mujer', descripcion: 'Infiel', denuncias: 1 },

      // Arequipa - mayoría mujeres (4 mujeres, 1 hombre)
      { nombre: 'Diana', apellido: 'Cruz', edad: 29, ciudad: 'Arequipa', genero: 'mujer', descripcion: 'Infidelidad', denuncias: 1 },
      { nombre: 'Elena', apellido: 'Silva', edad: 31, ciudad: 'Arequipa', genero: 'mujer', descripcion: 'Engaño', denuncias: 2 },
      { nombre: 'Roberto', apellido: 'Flores', edad: 34, ciudad: 'Arequipa', genero: 'hombre', descripcion: 'Infiel', denuncias: 1 },
      { nombre: 'Valentina', apellido: 'Rojas', edad: 27, ciudad: 'Arequipa', genero: 'mujer', descripcion: 'Infidelidad', denuncias: 1 },
      { nombre: 'Lucía', apellido: 'Morales', edad: 30, ciudad: 'Arequipa', genero: 'mujer', descripcion: 'Engaño', denuncias: 2 },

      // Áncash - mayoría hombres (4 hombres, 1 mujer)
      { nombre: 'Miguel', apellido: 'Castro', edad: 32, ciudad: 'Áncash', genero: 'hombre', descripcion: 'Infiel', denuncias: 2 },
      { nombre: 'Fernando', apellido: 'Vargas', edad: 29, ciudad: 'Áncash', genero: 'hombre', descripcion: 'Engaño', denuncias: 1 },
      { nombre: 'Alberto', apellido: 'Ruiz', edad: 35, ciudad: 'Áncash', genero: 'hombre', descripcion: 'Infidelidad', denuncias: 3 },
      { nombre: 'Sandra', apellido: 'Méndez', edad: 28, ciudad: 'Áncash', genero: 'mujer', descripcion: 'Infiel', denuncias: 1 },
      { nombre: 'Ricardo', apellido: 'Ortiz', edad: 31, ciudad: 'Áncash', genero: 'hombre', descripcion: 'Engaño', denuncias: 2 },

      // Cusco - mayoría hombres (3 hombres, 1 mujer)
      { nombre: 'Javier', apellido: 'Gutiérrez', edad: 33, ciudad: 'Cusco', genero: 'hombre', descripcion: 'Infiel', denuncias: 1 },
      { nombre: 'Antonio', apellido: 'Herrera', edad: 30, ciudad: 'Cusco', genero: 'hombre', descripcion: 'Engaño', denuncias: 2 },
      { nombre: 'Gabriela', apellido: 'Campos', edad: 27, ciudad: 'Cusco', genero: 'mujer', descripcion: 'Infidelidad', denuncias: 1 },
      { nombre: 'Daniel', apellido: 'Paredes', edad: 34, ciudad: 'Cusco', genero: 'hombre', descripcion: 'Infiel', denuncias: 1 },

      // La Libertad - mayoría mujeres (3 mujeres, 1 hombre)
      { nombre: 'Isabella', apellido: 'Reyes', edad: 26, ciudad: 'La Libertad', genero: 'mujer', descripcion: 'Infidelidad', denuncias: 1 },
      { nombre: 'Camila', apellido: 'Navarro', edad: 29, ciudad: 'La Libertad', genero: 'mujer', descripcion: 'Engaño', denuncias: 2 },
      { nombre: 'Luis', apellido: 'Montes', edad: 32, ciudad: 'La Libertad', genero: 'hombre', descripcion: 'Infiel', denuncias: 1 },
      { nombre: 'Natalia', apellido: 'Salazar', edad: 28, ciudad: 'La Libertad', genero: 'mujer', descripcion: 'Infidelidad', denuncias: 1 },

      // Piura - mayoría hombres (2 hombres, 1 mujer)
      { nombre: 'Andrés', apellido: 'Cortés', edad: 31, ciudad: 'Piura', genero: 'hombre', descripcion: 'Engaño', denuncias: 2 },
      { nombre: 'Manuel', apellido: 'Figueroa', edad: 29, ciudad: 'Piura', genero: 'hombre', descripcion: 'Infiel', denuncias: 1 },
      { nombre: 'Valeria', apellido: 'Peña', edad: 27, ciudad: 'Piura', genero: 'mujer', descripcion: 'Infidelidad', denuncias: 1 },

      // Callao - mayoría mujeres (2 mujeres, 1 hombre)
      { nombre: 'Daniela', apellido: 'Acosta', edad: 30, ciudad: 'Callao', genero: 'mujer', descripcion: 'Infiel', denuncias: 1 },
      { nombre: 'Carolina', apellido: 'Ríos', edad: 28, ciudad: 'Callao', genero: 'mujer', descripcion: 'Engaño', denuncias: 2 },
      { nombre: 'Alejandro', apellido: 'Carrillo', edad: 33, ciudad: 'Callao', genero: 'hombre', descripcion: 'Infidelidad', denuncias: 1 },

      // Ica - mayoría mujeres (2 mujeres, 1 hombre)
      { nombre: 'Fernanda', apellido: 'Molina', edad: 29, ciudad: 'Ica', genero: 'mujer', descripcion: 'Infiel', denuncias: 1 },
      { nombre: 'Adriana', apellido: 'Ponce', edad: 26, ciudad: 'Ica', genero: 'mujer', descripcion: 'Engaño', denuncias: 2 },
      { nombre: 'Francisco', apellido: 'Ibarra', edad: 31, ciudad: 'Ica', genero: 'hombre', descripcion: 'Infidelidad', denuncias: 1 },
    ]

    for (const reporte of reportes) {
      await client.query(
        `INSERT INTO reportes 
        (nombre, apellido, edad, ciudad, genero, descripcion, denuncias, fecha) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
        [
          reporte.nombre,
          reporte.apellido,
          reporte.edad,
          reporte.ciudad,
          reporte.genero,
          reporte.descripcion,
          reporte.denuncias
        ]
      )
    }

    console.log(`✅ ${reportes.length} reportes insertados`)

    // Mostrar estadísticas por departamento
    const stats = await client.query(`
      SELECT 
        ciudad,
        COUNT(*) as total,
        SUM(CASE WHEN genero = 'hombre' THEN 1 ELSE 0 END) as hombres,
        SUM(CASE WHEN genero = 'mujer' THEN 1 ELSE 0 END) as mujeres
      FROM reportes
      GROUP BY ciudad
      ORDER BY total DESC
    `)
    
    console.log('\n📊 Estadísticas por departamento:')
    stats.rows.forEach((row: any) => {
      const mayoriaGenero = parseInt(row.hombres) > parseInt(row.mujeres) ? '👨 HOMBRES (AZUL)' : '👩 MUJERES (ROSADO)'
      console.log(`   ${row.ciudad}: ${row.total} reportes (${row.hombres}H, ${row.mujeres}M) - ${mayoriaGenero}`)
    })

    console.log('\n✅ Base de datos lista con datos de ejemplo')

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    client.release()
    await pool.end()
  }
}

seed()
