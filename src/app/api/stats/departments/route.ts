import { NextResponse } from 'next/server'
import { ReporteService } from '@/services/reporteService'

// Forzar que esta ruta sea dinámica (no se pre-renderice durante build)
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const stats = await ReporteService.getStatsByDepartment()
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching department stats:', error)
    return NextResponse.json(
      { error: 'Error al obtener estadísticas por departamento' },
      { status: 500 }
    )
  }
}
