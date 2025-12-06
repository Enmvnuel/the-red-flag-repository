import { NextRequest, NextResponse } from 'next/server'
import { getEstadisticas } from '@/lib/queries'

// GET /api/stats - Obtener estadísticas generales
export async function GET(request: NextRequest) {
  try {
    const stats = await getEstadisticas()

    return NextResponse.json({
      success: true,
      data: stats
    })
  } catch (error) {
    console.error('Error en GET /api/stats:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener estadísticas' },
      { status: 500 }
    )
  }
}
