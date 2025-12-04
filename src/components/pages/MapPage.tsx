"use client";

import { mockReportes } from "@/data/mockData";
import PeruMap from "@/components/ui/PeruMap";
import { Users, AlertTriangle, TrendingUp, Map as MapIcon, ShieldAlert, UserX } from "lucide-react";

export default function MapPage() {
    // Calculate Stats
    const totalReportes = mockReportes.length;
    const uniqueInfieles = new Set(mockReportes.map(r => r.nombre + r.apellido)).size;

    const hombres = mockReportes.filter(r => r.genero === "hombre").length;
    const mujeres = mockReportes.filter(r => r.genero === "mujer").length;

    const hombresPct = Math.round((hombres / totalReportes) * 100);
    const mujeresPct = Math.round((mujeres / totalReportes) * 100);

    // Top Departments (Cities in this mock data context)
    const cityStats = mockReportes.reduce((acc, curr) => {
        acc[curr.ciudad] = (acc[curr.ciudad] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const topCities = Object.entries(cityStats)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    return (
        <div className="min-h-screen bg-slate-50 px-6 py-12 bg-[url('/grid.svg')] bg-fixed selection:bg-rose-500 selection:text-white">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-sm font-semibold text-rose-600 ring-1 ring-inset ring-rose-100 mb-6">
                        <MapIcon className="h-4 w-4" />
                        Mapa en Tiempo Real
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl mb-4">
                        Mapa de Infidelidad
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Visualiza en tiempo real dónde se concentran los reportes. La verdad está ahí fuera.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Stats Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Main Counters */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                                <div className="flex items-center gap-2 text-rose-600 mb-2">
                                    <ShieldAlert className="h-5 w-5" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Alertas</span>
                                </div>
                                <p className="text-4xl font-black text-slate-900">{totalReportes}</p>
                                <p className="text-sm text-slate-500 mt-1">Reportes totales</p>
                            </div>
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                                <div className="flex items-center gap-2 text-slate-600 mb-2">
                                    <UserX className="h-5 w-5" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Infieles</span>
                                </div>
                                <p className="text-4xl font-black text-slate-900">{uniqueInfieles}</p>
                                <p className="text-sm text-slate-500 mt-1">Personas únicas</p>
                            </div>
                        </div>

                        {/* Gender Split */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Users className="h-5 w-5 text-slate-400" />
                                Distribución por Género
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm font-medium mb-2">
                                        <span className="text-blue-600">Hombres</span>
                                        <span className="text-slate-900">{hombresPct}%</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${hombresPct}%` }}></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm font-medium mb-2">
                                        <span className="text-rose-600">Mujeres</span>
                                        <span className="text-slate-900">{mujeresPct}%</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-rose-500 rounded-full" style={{ width: `${mujeresPct}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Top Departments */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-slate-400" />
                                Zonas Calientes
                            </h3>
                            <div className="space-y-4">
                                {topCities.map(([city, count], index) => (
                                    <div key={city} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${index === 0 ? 'bg-rose-100 text-rose-600' : 'bg-slate-200 text-slate-600'}`}>
                                                {index + 1}
                                            </span>
                                            <span className="font-medium text-slate-700">{city}</span>
                                        </div>
                                        <span className="font-bold text-slate-900">{count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Map Area */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 h-full min-h-[600px] relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-50 pointer-events-none"></div>
                            <PeruMap reportes={mockReportes} />

                            <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-xs font-medium text-slate-500 border border-slate-200 shadow-sm">
                                * Datos basados en reportes de la comunidad
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
