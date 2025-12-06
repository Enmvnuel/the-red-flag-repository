"use client";

import { useState, useEffect } from 'react'
import { Reporte } from '@/types'

export function useReportes(initialLimit = 100) {
  const [reportes, setReportes] = useState<Reporte[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchReportes()
  }, [])

  const fetchReportes = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/reportes?limit=${initialLimit}`)
      const data = await response.json()
      
      if (data.success) {
        setReportes(data.data || data.reportes || [])
      } else {
        setError(data.error || 'Error al cargar reportes')
      }
    } catch (err) {
      console.error('Error fetching reportes:', err)
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  const refresh = () => fetchReportes()

  return { reportes, loading, error, refresh }
}

export function useEstadisticas() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/stats')
      const data = await response.json()
      
      if (data.success) {
        setStats(data.data)
      } else {
        setError(data.error || 'Error al cargar estadísticas')
      }
    } catch (err) {
      console.error('Error fetching stats:', err)
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return { stats, loading, error }
}

export function useDepartmentStats() {
  const [stats, setStats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/stats/departments')
      const data = await response.json()
      
      setStats(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      console.error('Error fetching department stats:', err)
      setError('Error de conexión')
      setStats([])
    } finally {
      setLoading(false)
    }
  }

  const refresh = () => fetchStats()

  return { stats, loading, error, refresh }
}
