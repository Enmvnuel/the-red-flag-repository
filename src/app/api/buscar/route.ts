import { NextRequest, NextResponse } from 'next/server'
import { buscarReportes } from '@/lib/queries'
import type { Genero } from '@/types'

// Forzar que esta ruta sea dinámica (no se pre-renderice durante build)
export const dynamic = 'force-dynamic'

// GET /api/buscar - Buscar reportes
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const termino = searchParams.get('q') || ''
    const ciudad = searchParams.get('ciudad') || undefined
    const genero = searchParams.get('genero') as Genero | undefined
    const edadMin = searchParams.get('edadMin') ? parseInt(searchParams.get('edadMin')!) : undefined
    const edadMax = searchParams.get('edadMax') ? parseInt(searchParams.get('edadMax')!) : undefined

    if (!termino) {
      return NextResponse.json(
        { error: 'El término de búsqueda es requerido' },
        { status: 400 }
      )
    }

    const reportes = await buscarReportes(termino, {
      ciudad,
      genero,
      edadMin,
      edadMax,
    })

    return NextResponse.json({ reportes })
  } catch (error) {
    console.error('Error buscando reportes:', error)
    return NextResponse.json(
      { error: 'Error buscando reportes' },
      { status: 500 }
    )
  }
}
