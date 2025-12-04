"use client";

import { useState } from "react";
import { Search, Filter, MapPin, Calendar, AlertTriangle, User, SearchCheck, X } from "lucide-react";
import Link from "next/link";
import { mockReportes } from "@/data/mockData";
import type { Genero } from "@/types";
import CustomSelect from "@/components/ui/CustomSelect";

interface GenderPageProps {
  gender: Genero;
}

export default function GenderPage({ gender }: GenderPageProps) {
  const [busqueda, setBusqueda] = useState("");
  const [ciudadFiltro, setCiudadFiltro] = useState("");

  const isMale = gender === "hombre";
  const title = isMale ? "Denuncias de Hombres" : "Denuncias de Mujeres";
  const subtitle = isMale ? "Reportes verificados de hombres en la plataforma" : "Reportes verificados de mujeres en la plataforma";

  // Tailwind classes based on theme
  const accentColor = isMale ? "text-blue-600" : "text-pink-600";
  const ringColor = isMale ? "focus:ring-blue-500" : "focus:ring-pink-500";
  const bgGradientIcon = isMale ? "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 ring-blue-200" : "bg-gradient-to-br from-pink-50 to-pink-100 text-pink-600 ring-pink-200";
  const hoverShadow = isMale ? "hover:shadow-blue-500/10" : "hover:shadow-pink-500/10";
  const hoverRing = isMale ? "hover:ring-blue-100" : "hover:ring-pink-100";
  const buttonHover = isMale ? "group-hover:bg-blue-600 group-hover:shadow-blue-200" : "group-hover:bg-pink-600 group-hover:shadow-pink-200";
  const badgeBg = isMale ? "bg-blue-50 text-blue-600 ring-blue-100/50" : "bg-pink-50 text-pink-600 ring-pink-100/50";

  const reportesGenero = mockReportes.filter((r) => r.genero === gender);

  const reportesFiltrados = reportesGenero.filter((reporte) => {
    const matchNombre = reporte.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const matchCiudad = ciudadFiltro === "" || reporte.ciudad === ciudadFiltro;
    return matchNombre && matchCiudad;
  });

  const ciudades = Array.from(new Set(reportesGenero.map((r) => r.ciudad)));
  const cityOptions = [
    { value: "", label: "Todas las ciudades" },
    ...ciudades.map((c) => ({ value: c, label: c })),
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12 bg-[url('/grid.svg')] bg-fixed selection:bg-rose-500 selection:text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 sm:text-6xl mb-6">
            {title}
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-600 font-medium leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Search & Filter Section - Glassmorphism */}
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
              accentColor={isMale ? "blue" : "pink"}
              className="md:w-80"
            />
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isMale ? 'bg-blue-400' : 'bg-pink-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isMale ? 'bg-blue-500' : 'bg-pink-500'}`}></span>
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
                    <User className="h-8 w-8" />
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
              <Search className="h-12 w-12 text-slate-300" />
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
              className={`inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-4 text-base font-bold text-white transition-all hover:scale-105 hover:shadow-xl ${isMale ? 'hover:bg-blue-600' : 'hover:bg-pink-600'}`}
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
