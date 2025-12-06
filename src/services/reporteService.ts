import { pool } from '@/lib/db'
import { Reporte } from '@/types'

export interface CreateReporteInput {
  nombre: string
  apellido?: string
  edad: number
  ciudad: string
  genero: 'hombre' | 'mujer'
  descripcion: string
  redSocial?: string
}

export interface SearchFilters {
  nombre?: string
  apellido?: string
  ciudad?: string
  genero?: 'hombre' | 'mujer'
  edadMin?: number
  edadMax?: number
}

export class ReporteService {
  // Crear un nuevo reporte
  static async create(data: CreateReporteInput): Promise<Reporte> {
    const query = `
      INSERT INTO reportes (nombre, apellido, edad, ciudad, genero, descripcion, red_social, fecha)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      RETURNING *
    `
    
    const values = [
      data.nombre,
      data.apellido || null,
      data.edad,
      data.ciudad,
      data.genero,
      data.descripcion,
      data.redSocial || null
    ]

    const result = await pool.query(query, values)
    return this.mapToReporte(result.rows[0])
  }

  // Buscar reportes con filtros
  static async search(filters: SearchFilters, limit = 50, offset = 0): Promise<Reporte[]> {
    let queryText = 'SELECT * FROM reportes WHERE 1=1'
    const values: any[] = []
    let paramIndex = 1

    if (filters.nombre) {
      queryText += ` AND LOWER(nombre) LIKE LOWER($${paramIndex})`
      values.push(`%${filters.nombre}%`)
      paramIndex++
    }

    if (filters.apellido) {
      queryText += ` AND LOWER(apellido) LIKE LOWER($${paramIndex})`
      values.push(`%${filters.apellido}%`)
      paramIndex++
    }

    if (filters.ciudad) {
      queryText += ` AND ciudad = $${paramIndex}`
      values.push(filters.ciudad)
      paramIndex++
    }

    if (filters.genero) {
      queryText += ` AND genero = $${paramIndex}`
      values.push(filters.genero)
      paramIndex++
    }

    if (filters.edadMin) {
      queryText += ` AND edad >= $${paramIndex}`
      values.push(filters.edadMin)
      paramIndex++
    }

    if (filters.edadMax) {
      queryText += ` AND edad <= $${paramIndex}`
      values.push(filters.edadMax)
      paramIndex++
    }

    queryText += ` ORDER BY fecha DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`
    values.push(limit, offset)

    const result = await pool.query(queryText, values)
    return result.rows.map(row => this.mapToReporte(row))
  }

  // Obtener un reporte por ID
  static async getById(id: string): Promise<Reporte | null> {
    const query = 'SELECT * FROM reportes WHERE id = $1'
    const result = await pool.query(query, [id])
    
    if (result.rows.length === 0) return null
    return this.mapToReporte(result.rows[0])
  }

  // Obtener todos los reportes
  static async getAll(limit = 100, offset = 0): Promise<Reporte[]> {
    const query = `
      SELECT * FROM reportes 
      ORDER BY fecha DESC 
      LIMIT $1 OFFSET $2
    `
    const result = await pool.query(query, [limit, offset])
    return result.rows.map(row => this.mapToReporte(row))
  }

  // Obtener reportes por ciudad
  static async getByCity(ciudad: string): Promise<Reporte[]> {
    const query = 'SELECT * FROM reportes WHERE ciudad = $1 ORDER BY fecha DESC'
    const result = await pool.query(query, [ciudad])
    return result.rows.map(row => this.mapToReporte(row))
  }

  // Incrementar denuncias
  static async incrementDenuncias(id: string): Promise<void> {
    const query = `
      UPDATE reportes 
      SET denuncias = denuncias + 1, updated_at = NOW() 
      WHERE id = $1
    `
    await pool.query(query, [id])
  }

  // Obtener estadísticas generales
  static async getStats() {
    const query = `
      SELECT 
        COUNT(*) as total_reportes,
        COUNT(DISTINCT CONCAT(nombre, apellido)) as total_personas,
        SUM(CASE WHEN genero = 'hombre' THEN 1 ELSE 0 END) as total_hombres,
        SUM(CASE WHEN genero = 'mujer' THEN 1 ELSE 0 END) as total_mujeres,
        SUM(denuncias) as total_denuncias
      FROM reportes
    `
    const result = await pool.query(query)
    return result.rows[0]
  }

  // Obtener estadísticas por departamento/ciudad para el mapa
  static async getStatsByDepartment() {
    const query = `
      SELECT 
        ciudad as departamento,
        COUNT(*) as total_reportes,
        SUM(CASE WHEN genero = 'hombre' THEN 1 ELSE 0 END) as total_hombres,
        SUM(CASE WHEN genero = 'mujer' THEN 1 ELSE 0 END) as total_mujeres,
        SUM(denuncias) as total_denuncias,
        ROUND(AVG(edad), 1) as edad_promedio,
        MIN(edad) as edad_minima,
        MAX(edad) as edad_maxima
      FROM reportes
      GROUP BY ciudad
      ORDER BY total_reportes DESC
    `
    const result = await pool.query(query)
    return result.rows.map(row => ({
      departamento: row.departamento,
      totalReportes: parseInt(row.total_reportes),
      totalHombres: parseInt(row.total_hombres),
      totalMujeres: parseInt(row.total_mujeres),
      totalDenuncias: parseInt(row.total_denuncias),
      edadPromedio: parseFloat(row.edad_promedio),
      edadMinima: parseInt(row.edad_minima),
      edadMaxima: parseInt(row.edad_maxima)
    }))
  }

  // Obtener estadísticas por ciudad
  static async getStatsByCity() {
    const query = `
      SELECT 
        ciudad,
        COUNT(*) as total_reportes,
        SUM(CASE WHEN genero = 'hombre' THEN 1 ELSE 0 END) as hombres,
        SUM(CASE WHEN genero = 'mujer' THEN 1 ELSE 0 END) as mujeres,
        SUM(denuncias) as total_denuncias
      FROM reportes
      GROUP BY ciudad
      ORDER BY total_reportes DESC
    `
    const result = await pool.query(query)
    return result.rows
  }

  // Registrar búsqueda (para analytics)
  static async logSearch(termino: string, ciudad?: string, genero?: 'hombre' | 'mujer'): Promise<void> {
    const query = `
      INSERT INTO busquedas (termino, ciudad, genero, fecha)
      VALUES ($1, $2, $3, NOW())
    `
    await pool.query(query, [termino, ciudad || null, genero || null])
  }

  // Mapear de row de DB a tipo Reporte
  private static mapToReporte(row: any): Reporte {
    return {
      id: row.id,
      nombre: row.nombre,
      apellido: row.apellido,
      edad: row.edad,
      ciudad: row.ciudad,
      genero: row.genero,
      fecha: row.fecha.toISOString(),
      descripcion: row.descripcion,
      denuncias: row.denuncias,
      redSocial: row.red_social
    }
  }
}
