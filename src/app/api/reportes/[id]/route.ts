import { NextRequest, NextResponse } from 'next/server'
import { getReportePorId, actualizarReporte, eliminarReporte } from '@/lib/queries'

// GET /api/reportes/[id] - Obtener un reporte específico
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const reporte = await getReportePorId(id)

    if (!reporte) {
      return NextResponse.json(
        { error: 'Reporte no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(reporte)
  } catch (error) {
    console.error('Error obteniendo reporte:', error)
    return NextResponse.json(
      { error: 'Error obteniendo reporte' },
      { status: 500 }
    )
  }
}

// PATCH /api/reportes/[id] - Actualizar un reporte
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const reporte = await actualizarReporte(id, body)

    return NextResponse.json(reporte)
  } catch (error) {
    console.error('Error actualizando reporte:', error)
    return NextResponse.json(
      { error: 'Error actualizando reporte' },
      { status: 500 }
    )
  }
}
// DELETE /api/reportes/[id] - Eliminar un reporte
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await eliminarReporte(id)

    return NextResponse.json({ message: 'Reporte eliminado exitosamente' })
  } catch (error) {
    console.error('Error eliminando reporte:', error)
    return NextResponse.json(
      { error: 'Error eliminando reporte' },
      { status: 500 }
    )
  }
}
