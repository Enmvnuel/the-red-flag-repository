"use client";

import { Users, ShieldAlert, TrendingUp, UserX } from "lucide-react";

interface GlobalStatsProps {
    totalReportes: number;
    uniqueInfieles: number;
    hombresPct: number;
    mujeresPct: number;
    topCities: [string, number][];
}

export default function GlobalStats({
    totalReportes,
    uniqueInfieles,
    hombresPct,
    mujeresPct,
    topCities
}: GlobalStatsProps) {
    return (
        <div className="space-y-6 h-full overflow-y-auto pr-2 custom-scrollbar">
            {/* Main Counters */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 transition-transform hover:scale-[1.02]">
                    <div className="flex items-center gap-2 text-rose-600 mb-2">
                        <ShieldAlert className="h-5 w-5" />
                        <span className="text-xs font-bold uppercase tracking-wider">Alertas</span>
                    </div>
                    <p className="text-4xl font-black text-slate-900">{totalReportes}</p>
                    <p className="text-sm text-slate-500 mt-1">Reportes totales</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 transition-transform hover:scale-[1.02]">
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
                            <div
                                className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${hombresPct}%` }}
                            ></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-sm font-medium mb-2">
                            <span className="text-rose-600">Mujeres</span>
                            <span className="text-slate-900">{mujeresPct}%</span>
                        </div>
                        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-rose-500 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${mujeresPct}%` }}
                            ></div>
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
                        <div key={city} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-default">
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
    );
}
