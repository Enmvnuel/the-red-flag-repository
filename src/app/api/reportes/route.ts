import { NextRequest, NextResponse } from 'next/server'
import { getReportes, crearReporte } from '@/lib/queries'

// Forzar que esta ruta sea dinámica (no se pre-renderice durante build)
export const dynamic = 'force-dynamic'

// GET /api/reportes - Obtener todos los reportes
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '100')

    const data = await getReportes(page, limit)

    return NextResponse.json({
      success: true,
      data: data.reportes,
      reportes: data.reportes,
      total: data.total,
      page: data.page,
      totalPages: data.totalPages
    })
  } catch (error) {
    console.error('Error obteniendo reportes:', error)
    return NextResponse.json(
      { success: false, error: 'Error obteniendo reportes' },
      { status: 500 }
    )
  }
}

// POST /api/reportes - Crear un nuevo reporte
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validación básica
    if (!body.nombre || !body.edad || !body.ciudad || !body.genero || !body.descripcion) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos: nombre, edad, ciudad, genero y descripcion son obligatorios' },
        { status: 400 }
      )
    }

    // Validar género
    if (body.genero !== 'hombre' && body.genero !== 'mujer') {
      return NextResponse.json(
        { success: false, error: 'El género debe ser "hombre" o "mujer"' },
        { status: 400 }
      )
    }

    // Validar tipo de reporte (opcional, por defecto 'infiel')
    if (body.tipoReporte && body.tipoReporte !== 'infiel' && body.tipoReporte !== 'cachudo') {
      return NextResponse.json(
        { success: false, error: 'El tipo de reporte debe ser "infiel" o "cachudo"' },
        { status: 400 }
      )
    }

    // Validar edad
    const edad = parseInt(body.edad)
    if (isNaN(edad) || edad < 18 || edad > 100) {
      return NextResponse.json(
        { success: false, error: 'La edad debe ser un número entre 18 y 100' },
        { status: 400 }
      )
    }

    const reporte = await crearReporte({
      nombre: body.nombre,
      apellido: body.apellido || null,
      edad: edad,
      ciudad: body.ciudad,
      genero: body.genero,
      descripcion: body.descripcion,
      redSocial: body.redSocial || null,
      tipoReporte: body.tipoReporte || 'infiel',
      denuncias: 0,
    })

    return NextResponse.json({
      success: true,
      data: reporte,
      message: 'Reporte creado exitosamente'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creando reporte:', error)
    return NextResponse.json(
      { success: false, error: 'Error creando reporte. Por favor intenta de nuevo.' },
      { status: 500 }
    )
  }
}
