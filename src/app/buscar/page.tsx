"use client";

import { useState } from "react";
import { Search, Filter, MapPin, Calendar, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { mockReportes } from "@/data/mockData";
import type { Genero } from "@/types";

export default function BuscarPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Buscar Denuncias</h1>
          <p className="mt-4 text-lg text-gray-600">Encuentra información sobre personas reportadas</p>
        </div>

        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar por nombre..."
                  className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
              </div>

              <div className="relative sm:w-48">
                <Filter className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <select
                  value={ciudadFiltro}
                  onChange={(e) => setCiudadFiltro(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-gray-300 py-3 pl-12 pr-4 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
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

            <div className="flex gap-2">
              <button
                onClick={() => setGeneroFiltro("")}
                className={`flex-1 rounded-lg border-2 px-4 py-2 font-semibold transition-all ${
                  generoFiltro === ""
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setGeneroFiltro("hombre")}
                className={`flex-1 rounded-lg border-2 px-4 py-2 font-semibold transition-all ${
                  generoFiltro === "hombre"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                Hombres
              </button>
              <button
                onClick={() => setGeneroFiltro("mujer")}
                className={`flex-1 rounded-lg border-2 px-4 py-2 font-semibold transition-all ${
                  generoFiltro === "mujer"
                    ? "border-pink-500 bg-pink-50 text-pink-700"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                Mujeres
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {reportesFiltrados.length} {reportesFiltrados.length === 1 ? "resultado" : "resultados"}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reportesFiltrados.map((reporte) => (
            <Link
              key={reporte.id}
              href={`/reporte/${reporte.id}`}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all hover:border-red-300 hover:shadow-2xl"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600">
                    {reporte.nombre} {reporte.apellido}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">{reporte.edad} años</p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-bold text-red-600">{reporte.denuncias}</span>
                </div>
              </div>

              <p className="mb-4 line-clamp-2 text-sm text-gray-600">{reporte.descripcion}</p>

              <div className="space-y-2 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{reporte.ciudad}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(reporte.fecha).toLocaleDateString("es-PE")}</span>
                </div>
              </div>

              <div className="mt-4">
                <span className="text-sm font-semibold text-red-600 group-hover:underline">
                  Ver detalles →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {reportesFiltrados.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
            <Search className="mx-auto h-16 w-16 text-gray-300" />
            <h3 className="mt-4 text-xl font-bold text-gray-900">No se encontraron resultados</h3>
            <p className="mt-2 text-gray-600">Intenta con otros términos de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
}
