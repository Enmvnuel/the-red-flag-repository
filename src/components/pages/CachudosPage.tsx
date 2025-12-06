"use client";

import { useState, useMemo } from "react";
import { Search, Filter, MapPin, Calendar, AlertTriangle, User, SearchCheck, X, Heart } from "lucide-react";
import Link from "next/link";
import { useReportes } from "@/hooks/useDatabase";
import CustomSelect from "@/components/ui/CustomSelect";

export default function CachudosPage() {
  const [busqueda, setBusqueda] = useState("");
  const [ciudadFiltro, setCiudadFiltro] = useState("");
  const { reportes, loading, error } = useReportes(500);

  const title = "Cachudos Reportados";
  const subtitle = "Personas a quienes les fueron infieles según reportes de la comunidad";

  // Colores amarillo/oro para cachudos
  const accentColor = "text-amber-600";
  const ringColor = "focus:ring-amber-500";
  const bgGradientIcon = "bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600 ring-amber-200";
  const hoverShadow = "hover:shadow-amber-500/10";
  const hoverRing = "hover:ring-amber-100";
  const buttonHover = "group-hover:bg-amber-600 group-hover:shadow-amber-200";
  const badgeBg = "bg-amber-50 text-amber-600 ring-amber-100/50";

  const reportesCachudos = useMemo(() => 
    reportes.filter((r) => r.tipoReporte === "cachudo"),
    [reportes]
  );

  const reportesFiltrados = useMemo(() => {
    return reportesCachudos.filter((reporte) => {
      const matchNombre = busqueda === "" || 
        reporte.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        (reporte.apellido && reporte.apellido.toLowerCase().includes(busqueda.toLowerCase()));
      const matchCiudad = ciudadFiltro === "" || reporte.ciudad === ciudadFiltro;
      return matchNombre && matchCiudad;
    });
  }, [reportesCachudos, busqueda, ciudadFiltro]);

  const ciudades = useMemo(() => 
    Array.from(new Set(reportesCachudos.map((r) => r.ciudad))),
    [reportesCachudos]
  );
  
  const cityOptions = [
    { value: "", label: "Todas las ciudades" },
    ...ciudades.map((c) => ({ value: c, label: c })),
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-amber-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Cargando...</span>
          </div>
          <p className="mt-4 text-lg font-semibold text-slate-600">Cargando reportes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-12 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertTriangle className="h-16 w-16 text-rose-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Error al cargar datos</h2>
          <p className="text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12 bg-[url('/grid.svg')] bg-fixed selection:bg-amber-500 selection:text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-600 ring-1 ring-inset ring-amber-100 mb-4">
            <Heart className="h-4 w-4" />
            Base de Datos de Cachudos
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 sm:text-6xl mb-6">
            {title}
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-600 font-medium leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="sticky top-4 z-30 mb-12 rounded-[2rem] border border-white/50 bg-white/80 p-6 shadow-2xl shadow-slate-200/50 backdrop-blur-xl ring-1 ring-slate-200/50">
          <div className="flex flex-col gap-4 md:flex-row">
            {/* Search Input */}
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                <SearchCheck className={`h-5 w-5 text-slate-400 group-focus-within:${accentColor} transition-colors`} />
              </div>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre..."
                className={`block w-full rounded-2xl border-0 bg-slate-100/50 py-4 pl-14 pr-12 text-slate-900 shadow-inner ring-1 ring-inset ring-slate-200 placeholder:text-slate-500 focus:bg-white focus:ring-2 focus:ring-inset ${ringColor} transition-all font-medium text-lg`}
              />
              {busqueda && (
                <button
                  onClick={() => setBusqueda("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <div className="rounded-full bg-slate-200 p-1 hover:bg-slate-300">
                    <X className="h-4 w-4" />
                  </div>
                </button>
              )}
            </div>

            {/* City Filter */}
            <CustomSelect
              options={cityOptions}
              value={ciudadFiltro}
              onChange={setCiudadFiltro}
              placeholder="Todas las ciudades"
              icon={Filter}
              accentColor="amber"
              className="md:w-80"
            />
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">
              {reportesFiltrados.length} {reportesFiltrados.length === 1 ? "Resultado encontrado" : "Resultados encontrados"}
            </p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reportesFiltrados.map((reporte) => (
            <Link
              key={reporte.id}
              href={`/reporte/${reporte.id}`}
              className={`group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${hoverShadow} ring-1 ring-slate-100 ${hoverRing}`}
            >
              {/* Header */}
              <div className="mb-6 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 ring-1 ${bgGradientIcon}`}>
                    <Heart className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold text-slate-900 leading-tight group-hover:${accentColor} transition-colors`}>
                      {reporte.nombre} <br /> {reporte.apellido}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 mt-1">{reporte.edad} años</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 ring-1 ring-inset ${badgeBg}`}>
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-bold">{reporte.denuncias}</span>
                </div>
              </div>

              {/* Description */}
              <div className="flex-1 mb-6">
                <p className="line-clamp-3 text-base leading-relaxed text-slate-600">
                  {reporte.descripcion}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-auto">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{reporte.ciudad}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{new Date(reporte.fecha).toLocaleDateString("es-PE")}</span>
                  </div>
                </div>

                <span className={`rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-all ${buttonHover} group-hover:shadow-lg`}>
                  Ver reporte
                </span>
              </div>
            </Link>
          ))}
        </div>

        {reportesFiltrados.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-slate-200 bg-slate-50/50 p-20 text-center">
            <div className="mb-6 rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100">
              <Heart className="h-12 w-12 text-amber-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">No se encontraron resultados</h3>
            <p className="text-lg text-slate-500 max-w-md mx-auto mb-8">
              Intenta ajustar los filtros o busca con otros términos para encontrar lo que necesitas.
            </p>
            <button
              onClick={() => {
                setBusqueda("");
                setCiudadFiltro("");
              }}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-4 text-base font-bold text-white transition-all hover:scale-105 hover:shadow-xl hover:bg-amber-600"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
