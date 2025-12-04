"use client";

import { useState } from "react";
import { Search, Filter, MapPin, Calendar, AlertTriangle, User } from "lucide-react";
import Link from "next/link";
import { mockReportes } from "@/data/mockData";
import type { Genero } from "@/types";

export default function SearchPage() {
  const [busqueda, setBusqueda] = useState("");
  const [ciudadFiltro, setCiudadFiltro] = useState("");
  const [generoFiltro, setGeneroFiltro] = useState<Genero | "">("");

  const reportesFiltrados = mockReportes.filter((reporte) => {
    const matchNombre = reporte.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const matchCiudad = ciudadFiltro === "" || reporte.ciudad === ciudadFiltro;
    const matchGenero = generoFiltro === "" || reporte.genero === generoFiltro;
    return matchNombre && matchCiudad && matchGenero;
  });

  const ciudades = Array.from(new Set(mockReportes.map((r) => r.ciudad)));

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Buscar Denuncias
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Encuentra información verificada sobre personas reportadas en nuestra comunidad.
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="mb-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar por nombre..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                />
              </div>

              <div className="relative sm:w-64">
                <Filter className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <select
                  value={ciudadFiltro}
                  onChange={(e) => setCiudadFiltro(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-10 text-slate-900 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                >
                  <option value="">Todas las ciudades</option>
                  {ciudades.map((ciudad) => (
                    <option key={ciudad} value={ciudad}>
                      {ciudad}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setGeneroFiltro("")}
                className={`flex-1 rounded-xl border px-4 py-3 font-semibold transition-all ${
                  generoFiltro === ""
                    ? "border-rose-200 bg-rose-50 text-rose-700 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setGeneroFiltro("hombre")}
                className={`flex-1 rounded-xl border px-4 py-3 font-semibold transition-all ${
                  generoFiltro === "hombre"
                    ? "border-blue-200 bg-blue-50 text-blue-700 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                Hombres
              </button>
              <button
                onClick={() => setGeneroFiltro("mujer")}
                className={`flex-1 rounded-xl border px-4 py-3 font-semibold transition-all ${
                  generoFiltro === "mujer"
                    ? "border-pink-200 bg-pink-50 text-pink-700 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                Mujeres
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between px-2">
          <p className="text-sm font-medium text-slate-500">
            Mostrando {reportesFiltrados.length} {reportesFiltrados.length === 1 ? "resultado" : "resultados"}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reportesFiltrados.map((reporte) => (
            <Link
              key={reporte.id}
              href={`/reporte/${reporte.id}`}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-rose-200 hover:shadow-xl hover:shadow-rose-100/50"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    reporte.genero === 'hombre' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'
                  }`}>
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                      {reporte.nombre} {reporte.apellido}
                    </h3>
                    <p className="text-sm text-slate-500">{reporte.edad} años</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-rose-600 ring-1 ring-inset ring-rose-100">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span className="text-xs font-bold">{reporte.denuncias}</span>
                </div>
              </div>

              <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-slate-600">
                {reporte.descripcion}
              </p>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{reporte.ciudad}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{new Date(reporte.fecha).toLocaleDateString("es-PE")}</span>
                  </div>
                </div>
                
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-900 transition-colors group-hover:bg-rose-600 group-hover:text-white">
                  Ver reporte
                </span>
              </div>
            </Link>
          ))}
        </div>

        {reportesFiltrados.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-16 text-center">
            <div className="mb-4 rounded-full bg-slate-100 p-4">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No se encontraron resultados</h3>
            <p className="mt-2 text-slate-500">Intenta ajustar los filtros o busca con otros términos.</p>
            <button 
              onClick={() => {
                setBusqueda("");
                setCiudadFiltro("");
                setGeneroFiltro("");
              }}
              className="mt-6 text-sm font-semibold text-rose-600 hover:underline"
            >
              Limpiar todos los filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
