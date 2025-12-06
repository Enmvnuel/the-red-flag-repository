"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, AlertTriangle, User, Flag, Share2, ShieldAlert } from "lucide-react";
import type { Reporte } from "@/types";

export default function ReportDetailPage() {
  const params = useParams();
  const [reporte, setReporte] = useState<Reporte | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReporte() {
      if (!params.id) return;
      
      try {
        setLoading(true);
        const response = await fetch(`/api/reportes/${params.id}`);
        const data = await response.json();
        
        if (data.success && data.data) {
          setReporte(data.data);
          setError(null);
        } else {
          setError(data.error || 'Reporte no encontrado');
        }
      } catch (err) {
        console.error('Error fetching reporte:', err);
        setError('Error al cargar el reporte');
      } finally {
        setLoading(false);
      }
    }

    fetchReporte();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Cargando...</span>
          </div>
          <p className="mt-4 text-lg font-semibold text-slate-600">Cargando reporte...</p>
        </div>
      </div>
    );
  }

  if (error || !reporte) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-12 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertTriangle className="h-16 w-16 text-rose-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Reporte no encontrado</h2>
          <p className="text-slate-600 mb-6">{error || 'No se pudo encontrar el reporte solicitado'}</p>
          <Link
            href="/buscar"
            className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-3 font-semibold text-white hover:bg-rose-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a búsqueda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12 bg-grid-pattern">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/buscar"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-rose-600"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Volver a búsqueda
        </Link>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-2xl shadow-slate-200/50 backdrop-blur-md">
          {/* Header Section */}
          <div className="relative bg-slate-900 px-8 py-12 text-white overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-rose-600 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-indigo-600 blur-3xl" />
            </div>

            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-rose-500/20 px-4 py-1.5 text-sm font-medium text-rose-200 ring-1 ring-inset ring-rose-500/40 backdrop-blur-sm">
                <ShieldAlert className="h-4 w-4" />
                <span>{reporte.denuncias} {reporte.denuncias === 1 ? 'denuncia verificada' : 'denuncias verificadas'}</span>
              </div>

              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                {reporte.nombre} {reporte.apellido || ''}
              </h1>

              <div className="mt-8 flex flex-wrap gap-6 text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-slate-800 p-2">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{reporte.edad} años</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-slate-800 p-2">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{reporte.ciudad}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-slate-800 p-2">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{new Date(reporte.fecha).toLocaleDateString("es-PE")}</span>
                </div>
              </div>

              {reporte.redSocial && (
                <div className="mt-6 inline-block rounded-xl bg-slate-800/50 px-4 py-2 backdrop-blur-sm">
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Red Social</span>
                  <p className="font-mono text-rose-300">{reporte.redSocial}</p>
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 sm:p-12">
            <section className="mb-12">
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                  <Flag className="h-5 w-5" />
                </div>
                Descripción de los hechos
              </h2>
              <div className="rounded-2xl bg-slate-50 p-6 text-lg leading-relaxed text-slate-700 border border-slate-100">
                {reporte.descripcion}
              </div>
            </section>



            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 mb-10">
              <div className="flex gap-4">
                <AlertTriangle className="h-6 w-6 shrink-0 text-amber-600" />
                <div>
                  <h3 className="mb-1 font-bold text-amber-900">Información Pública</h3>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Esta información es de carácter público y ha sido reportada por usuarios de la plataforma.
                    Si consideras que hay información incorrecta, puedes reportarlo al equipo de moderación.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-rose-600 px-6 py-4 font-bold text-white shadow-lg shadow-rose-600/30 transition-all hover:bg-rose-700 hover:shadow-xl hover:-translate-y-0.5">
                <Flag className="h-5 w-5" />
                Agregar denuncia
              </button>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-slate-200 bg-white px-6 py-4 font-bold text-slate-700 transition-all hover:border-rose-200 hover:text-rose-600 hover:bg-rose-50">
                <Share2 className="h-5 w-5" />
                Compartir reporte
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/denunciar"
            className="inline-flex items-center gap-2 text-slate-500 transition-colors hover:text-rose-600 font-medium"
          >
            ¿Conoces más información sobre este caso? <span className="underline decoration-2 underline-offset-4 decoration-rose-200 hover:decoration-rose-500">Haz una denuncia</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
