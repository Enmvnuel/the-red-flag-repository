import { NextResponse } from 'next/server'
import { getEstadisticas } from '@/lib/queries'

// Forzar que esta ruta sea dinámica (no se pre-renderice durante build)
export const dynamic = 'force-dynamic'

// GET /api/estadisticas - Obtener estadísticas generales
export async function GET() {
  try {
    const estadisticas = await getEstadisticas()

    return NextResponse.json(estadisticas)
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error)
    return NextResponse.json(
      { error: 'Error obteniendo estadísticas' },
      { status: 500 }
    )
  }
}
