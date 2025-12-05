import { pool, query } from './db'
import type { Genero, Reporte } from '@/types'

// Obtener todos los reportes con paginación
export async function getReportes(page: number = 1, limit: number = 20) {
  const offset = (page - 1) * limit
  
  const reportesQuery = await query(
    'SELECT * FROM reportes ORDER BY fecha DESC LIMIT $1 OFFSET $2',
    [limit, offset]
  )
  
  const countQuery = await query('SELECT COUNT(*) FROM reportes')
  const total = parseInt(countQuery.rows[0].count)

  return {
    reportes: reportesQuery.rows,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  }
}

// Buscar reportes por nombre
export async function buscarReportes(
  termino: string,
  filtros?: {
    ciudad?: string
    genero?: Genero
    edadMin?: number
    edadMax?: number
  }
) {
  let queryText = `
    SELECT * FROM reportes 
    WHERE (nombre ILIKE $1 OR apellido ILIKE $1)
  `
  const params: any[] = [`%${termino}%`]
  let paramCount = 1

  if (filtros?.ciudad) {
    paramCount++
    queryText += ` AND ciudad = $${paramCount}`
    params.push(filtros.ciudad)
  }

  if (filtros?.genero) {
    paramCount++
    queryText += ` AND genero = $${paramCount}`
    params.push(filtros.genero)
  }

  if (filtros?.edadMin) {
    paramCount++
    queryText += ` AND edad >= $${paramCount}`
    params.push(filtros.edadMin)
  }

  if (filtros?.edadMax) {
    paramCount++
    queryText += ` AND edad <= $${paramCount}`
    params.push(filtros.edadMax)
  }

  queryText += ' ORDER BY denuncias DESC'

  const result = await query(queryText, params)

  // Registrar la búsqueda para analytics
  await query(
    'INSERT INTO busquedas (termino, ciudad, genero, fecha) VALUES ($1, $2, $3, NOW())',
    [termino, filtros?.ciudad || null, filtros?.genero || null]
  ).catch(() => {}) // Ignorar errores de logging

  return result.rows
}

// Obtener un reporte por ID
export async function getReportePorId(id: string) {
  const result = await query('SELECT * FROM reportes WHERE id = $1', [id])
  return result.rows[0] || null
}

// Crear un nuevo reporte
export async function crearReporte(data: Omit<Reporte, 'id' | 'fecha' | 'createdAt' | 'updatedAt'>) {
  const result = await query(
    `INSERT INTO reportes 
    (nombre, apellido, edad, ciudad, genero, descripcion, denuncias, red_social, evidencias, fecha, created_at, updated_at) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW(), NOW()) 
    RETURNING *`,
    [
      data.nombre,
      data.apellido || null,
      data.edad,
      data.ciudad,
      data.genero,
      data.descripcion,
      data.denuncias || 1,
      data.redSocial || null,
      data.evidencias || [],
    ]
  )
  return result.rows[0]
}

// Incrementar denuncias de un reporte
export async function incrementarDenuncias(id: string) {
  const result = await query(
    'UPDATE reportes SET denuncias = denuncias + 1, updated_at = NOW() WHERE id = $1 RETURNING *',
    [id]
  )
  return result.rows[0]
}

// Obtener estadísticas generales
export async function getEstadisticas() {
  const totalResult = await query('SELECT COUNT(*) as total FROM reportes')
  const generoResult = await query(
    'SELECT genero, COUNT(*) as count FROM reportes GROUP BY genero'
  )
  const ciudadesResult = await query(
    'SELECT ciudad, COUNT(*) as count FROM reportes GROUP BY ciudad ORDER BY count DESC LIMIT 10'
  )

  return {
    totalReportes: parseInt(totalResult.rows[0].total),
    reportesPorGenero: generoResult.rows.map(row => ({
      genero: row.genero,
      _count: parseInt(row.count)
    })),
    ciudadesTop: ciudadesResult.rows.map(row => ({
      ciudad: row.ciudad,
      _count: parseInt(row.count)
    })),
  }
}

// Obtener reportes por ciudad
export async function getReportesPorCiudad(ciudad: string) {
  const result = await query(
    'SELECT * FROM reportes WHERE ciudad = $1 ORDER BY denuncias DESC',
    [ciudad]
  )
  return result.rows
}

// Obtener reportes por género
export async function getReportesPorGenero(genero: Genero) {
  const result = await query(
    'SELECT * FROM reportes WHERE genero = $1 ORDER BY fecha DESC',
    [genero]
  )
  return result.rows
}

// Actualizar un reporte
export async function actualizarReporte(id: string, data: Partial<Reporte>) {
  const fields: string[] = []
  const values: any[] = []
  let paramCount = 1

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && key !== 'id' && key !== 'createdAt') {
      const dbKey = key === 'redSocial' ? 'red_social' : 
                    key === 'createdAt' ? 'created_at' :
                    key === 'updatedAt' ? 'updated_at' : key
      fields.push(`${dbKey} = $${paramCount}`)
      values.push(value)
      paramCount++
    }
  })

  if (fields.length === 0) {
    return await getReportePorId(id)
  }

  fields.push(`updated_at = NOW()`)
  values.push(id)

  const result = await query(
    `UPDATE reportes SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
    values
  )
  return result.rows[0]
}

// Eliminar un reporte (si es necesario para moderación)
export async function eliminarReporte(id: string) {
  const result = await query('DELETE FROM reportes WHERE id = $1 RETURNING *', [id])
  return result.rows[0]
}
