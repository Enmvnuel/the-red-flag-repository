import { pool } from '@/lib/db'

async function seed() {
  const client = await pool.connect()
  
  try {
    console.log('🌱 Sembrando datos de ejemplo...')

    // Limpiar datos existentes (opcional)
    // await client.query('TRUNCATE reportes, busquedas, estadisticas_ciudad CASCADE')

    // Insertar reportes de ejemplo
    const reportes = [
      {
        nombre: 'Juan',
        apellido: 'Pérez',
        edad: 28,
        ciudad: 'Lima',
        genero: 'hombre',
        descripcion: 'Comportamiento agresivo y manipulador. Múltiples denuncias por violencia psicológica.',
        denuncias: 3,
        redSocial: '@juanperez',
        evidencias: ['https://example.com/evidencia1.jpg']
      },
      {
        nombre: 'María',
        apellido: 'González',
        edad: 32,
        ciudad: 'Arequipa',
        genero: 'mujer',
        descripcion: 'Comportamiento tóxico y controlador. Reportes de acoso constante.',
        denuncias: 2,
        redSocial: null,
        evidencias: []
      },
      {
        nombre: 'Carlos',
        apellido: 'Rodríguez',
        edad: 35,
        ciudad: 'Cusco',
        genero: 'hombre',
        descripcion: 'Múltiples relaciones simultáneas sin consentimiento. Mentiras compulsivas.',
        denuncias: 5,
        redSocial: '@crodriguez',
        evidencias: ['https://example.com/evidencia2.jpg', 'https://example.com/evidencia3.jpg']
      },
      {
        nombre: 'Ana',
        apellido: 'Martínez',
        edad: 26,
        ciudad: 'Trujillo',
        genero: 'mujer',
        descripcion: 'Comportamiento manipulador y gaslighting. Varias denuncias por abuso emocional.',
        denuncias: 4,
        redSocial: null,
        evidencias: ['https://example.com/evidencia4.jpg']
      },
      {
        nombre: 'Diego',
        apellido: 'Sánchez',
        edad: 30,
        ciudad: 'Lima',
        genero: 'hombre',
        descripcion: 'Infidelidad reiterada y falta de compromiso emocional.',
        denuncias: 2,
        redSocial: '@diegosanchez',
        evidencias: []
      },
      {
        nombre: 'Lucía',
        apellido: 'Torres',
        edad: 29,
        ciudad: 'Piura',
        genero: 'mujer',
        descripcion: 'Comportamiento violento y agresivo. Múltiples denuncias por violencia física.',
        denuncias: 6,
        redSocial: null,
        evidencias: ['https://example.com/evidencia5.jpg']
      },
      {
        nombre: 'Roberto',
        apellido: 'Flores',
        edad: 40,
        ciudad: 'Lima',
        genero: 'hombre',
        descripcion: 'Acoso persistente después de la ruptura. Comportamiento obsesivo.',
        denuncias: 3,
        redSocial: '@rflores',
        evidencias: ['https://example.com/evidencia6.jpg', 'https://example.com/evidencia7.jpg']
      },
      {
        nombre: 'Patricia',
        apellido: 'Vargas',
        edad: 27,
        ciudad: 'Chiclayo',
        genero: 'mujer',
        descripcion: 'Mentiras constantes y manipulación emocional.',
        denuncias: 2,
        redSocial: null,
        evidencias: []
      },
      {
        nombre: 'Miguel',
        apellido: 'Castro',
        edad: 33,
        ciudad: 'Lima',
        genero: 'hombre',
        descripcion: 'Infidelidad y comportamiento narcisista. Varias denuncias.',
        denuncias: 4,
        redSocial: '@mcastro',
        evidencias: ['https://example.com/evidencia8.jpg']
      },
      {
        nombre: 'Elena',
        apellido: 'Ramos',
        edad: 31,
        ciudad: 'Ica',
        genero: 'mujer',
        descripcion: 'Comportamiento controlador y celos excesivos.',
        denuncias: 3,
        redSocial: null,
        evidencias: []
      }
    ]

    for (const reporte of reportes) {
      await client.query(
        `INSERT INTO reportes 
        (nombre, apellido, edad, ciudad, genero, descripcion, denuncias, red_social, evidencias) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          reporte.nombre,
          reporte.apellido,
          reporte.edad,
          reporte.ciudad,
          reporte.genero,
          reporte.descripcion,
          reporte.denuncias,
          reporte.redSocial,
          reporte.evidencias
        ]
      )
    }

    console.log(`✅ ${reportes.length} reportes insertados`)

    // Insertar búsquedas de ejemplo
    const busquedas = [
      { termino: 'Juan', ciudad: 'Lima', genero: null },
      { termino: 'María', ciudad: null, genero: 'mujer' },
      { termino: 'Carlos', ciudad: 'Cusco', genero: 'hombre' }
    ]

    for (const busqueda of busquedas) {
      await client.query(
        'INSERT INTO busquedas (termino, ciudad, genero) VALUES ($1, $2, $3)',
        [busqueda.termino, busqueda.ciudad, busqueda.genero]
      )
    }

    console.log(`✅ ${busquedas.length} búsquedas de ejemplo insertadas`)

    // Insertar estadísticas de ciudades
    const ciudades = ['Lima', 'Arequipa', 'Cusco', 'Trujillo', 'Piura', 'Chiclayo', 'Ica', 'Tacna']
    
    for (const ciudad of ciudades) {
      const result = await client.query(
        'SELECT COUNT(*) as total FROM reportes WHERE ciudad = $1',
        [ciudad]
      )
      const total = parseInt(result.rows[0].total)
      
      await client.query(
        `INSERT INTO estadisticas_ciudad (ciudad, total_reportes) 
        VALUES ($1, $2) 
        ON CONFLICT (ciudad) DO UPDATE SET 
        total_reportes = $2, 
        ultima_actualizacion = NOW()`,
        [ciudad, total]
      )
    }

    console.log(`✅ Estadísticas de ${ciudades.length} ciudades actualizadas`)
    console.log('🎉 Datos sembrados exitosamente')
    
  } catch (error) {
    console.error('❌ Error sembrando datos:', error)
    throw error
  } finally {
    client.release()
    await pool.end()
  }
}

seed()
