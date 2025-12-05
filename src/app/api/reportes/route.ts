import { NextRequest, NextResponse } from 'next/server'
import { getReportes, crearReporte } from '@/lib/queries'

// GET /api/reportes - Obtener todos los reportes
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const data = await getReportes(page, limit)

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error obteniendo reportes:', error)
    return NextResponse.json(
      { error: 'Error obteniendo reportes' },
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
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    const reporte = await crearReporte(body)

    return NextResponse.json(reporte, { status: 201 })
  } catch (error) {
    console.error('Error creando reporte:', error)
    return NextResponse.json(
      { error: 'Error creando reporte' },
      { status: 500 }
    )
  }
}
