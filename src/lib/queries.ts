import { prisma } from './db'
import type { Genero, Reporte } from '@/types'

// Obtener todos los reportes con paginación
export async function getReportes(page: number = 1, limit: number = 20) {
  const skip = (page - 1) * limit
  
  const [reportes, total] = await Promise.all([
    prisma.reporte.findMany({
      skip,
      take: limit,
      orderBy: { fecha: 'desc' },
    }),
    prisma.reporte.count(),
  ])

  return {
    reportes,
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
  const where = {
    AND: [
      {
        OR: [
          { nombre: { contains: termino, mode: 'insensitive' as const } },
          { apellido: { contains: termino, mode: 'insensitive' as const } },
        ],
      },
      filtros?.ciudad ? { ciudad: filtros.ciudad } : {},
      filtros?.genero ? { genero: filtros.genero } : {},
      filtros?.edadMin ? { edad: { gte: filtros.edadMin } } : {},
      filtros?.edadMax ? { edad: { lte: filtros.edadMax } } : {},
    ],
  }

  const reportes = await prisma.reporte.findMany({
    where,
    orderBy: { denuncias: 'desc' },
  })

  // Registrar la búsqueda para analytics
  await prisma.busqueda.create({
    data: {
      termino,
      ciudad: filtros?.ciudad,
      genero: filtros?.genero,
    },
  }).catch(() => {}) // Ignorar errores de logging

  return reportes
}

// Obtener un reporte por ID
export async function getReportePorId(id: string) {
  return await prisma.reporte.findUnique({
    where: { id },
  })
}

// Crear un nuevo reporte
export async function crearReporte(data: Omit<Reporte, 'id' | 'fecha'>) {
  return await prisma.reporte.create({
    data: {
      ...data,
      fecha: new Date(),
    },
  })
}

// Incrementar denuncias de un reporte
export async function incrementarDenuncias(id: string) {
  return await prisma.reporte.update({
    where: { id },
    data: {
      denuncias: {
        increment: 1,
      },
    },
  })
}

// Obtener estadísticas generales
export async function getEstadisticas() {
  const [totalReportes, reportesPorGenero, ciudadesTop] = await Promise.all([
    prisma.reporte.count(),
    prisma.reporte.groupBy({
      by: ['genero'],
      _count: true,
    }),
    prisma.reporte.groupBy({
      by: ['ciudad'],
      _count: true,
      orderBy: {
        _count: {
          ciudad: 'desc',
        },
      },
      take: 10,
    }),
  ])

  return {
    totalReportes,
    reportesPorGenero,
    ciudadesTop,
  }
}

// Obtener reportes por ciudad
export async function getReportesPorCiudad(ciudad: string) {
  return await prisma.reporte.findMany({
    where: { ciudad },
    orderBy: { denuncias: 'desc' },
  })
}

// Obtener reportes por género
export async function getReportesPorGenero(genero: Genero) {
  return await prisma.reporte.findMany({
    where: { genero },
    orderBy: { fecha: 'desc' },
  })
}

// Actualizar un reporte
export async function actualizarReporte(id: string, data: Partial<Reporte>) {
  return await prisma.reporte.update({
    where: { id },
    data,
  })
}

// Eliminar un reporte (si es necesario para moderación)
export async function eliminarReporte(id: string) {
  return await prisma.reporte.delete({
    where: { id },
  })
}
