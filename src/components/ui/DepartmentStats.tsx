"use client";

import { motion } from "framer-motion";
import { X, MapPin, Calendar, User, UserX, ShieldAlert } from "lucide-react";
import { Reporte } from "@/types";

interface DepartmentStatsProps {
    regionName: string;
    stats: {
        count: number;
        male: number;
        female: number;
    };
    departmentData?: {
        totalInfidels: number;
        menInfidels: number;
        womenInfidels: number;
        denuncias: number;
        edadPromedio: number;
        edadMinima: number;
        edadMaxima: number;
    } | null;
    recentReports: Reporte[];
    onClose: () => void;
}

export default function DepartmentStats({ regionName, stats, departmentData, recentReports, onClose }: DepartmentStatsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="h-full bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col"
        >
            <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                <div>
                    <div className="flex items-center gap-2 text-rose-600 mb-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Departamento</span>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">{regionName}</h2>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
                {/* Risk Level */}
                <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100 text-center">
                    <p className="text-sm text-rose-600 font-medium mb-1 uppercase tracking-wide">Nivel de Infidelidad</p>
                    <p className="text-4xl font-black text-rose-700">
                        {stats.count > 10 ? 'CRÍTICO' :
                            stats.count > 5 ? 'ALTO' :
                                stats.count > 2 ? 'MEDIO' : 'BAJO'}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-xs text-slate-500 font-bold uppercase mb-2">Hombres</p>
                        <p className="text-2xl font-black text-blue-600">{stats.male}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-xs text-slate-500 font-bold uppercase mb-2">Mujeres</p>
                        <p className="text-2xl font-black text-rose-600">{stats.female}</p>
                    </div>
                </div>

                {/* Edad Stats - Solo si hay datos del departamento */}
                {departmentData && (
                    <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-indigo-400" />
                            Rango de Edades
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="text-center">
                                <p className="text-xs text-slate-500 font-medium mb-1">Promedio</p>
                                <p className="text-xl font-black text-indigo-600">{departmentData.edadPromedio}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-slate-500 font-medium mb-1">Mínima</p>
                                <p className="text-xl font-black text-slate-600">{departmentData.edadMinima}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-slate-500 font-medium mb-1">Máxima</p>
                                <p className="text-xl font-black text-slate-600">{departmentData.edadMaxima}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Total Denuncias */}
                {departmentData && departmentData.denuncias > 0 && (
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-center">
                        <p className="text-xs text-amber-600 font-bold uppercase mb-2">Total Denuncias</p>
                        <p className="text-3xl font-black text-amber-700">{departmentData.denuncias}</p>
                    </div>
                )}

                {/* Recent Reports List */}
                <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" />
                        Más Acusados
                    </h3>
                    <div className="space-y-3">
                        {recentReports.length > 0 ? (
                            recentReports.map((report) => (
                                <div key={report.id} className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className={`p-1.5 rounded-full ${report.genero === 'hombre' ? 'bg-blue-100 text-blue-600' : 'bg-rose-100 text-rose-600'}`}>
                                                <User className="w-3 h-3" />
                                            </div>
                                            <span className="font-bold text-slate-800">{report.nombre} {report.apellido}</span>
                                        </div>
                                        <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                                            {report.fecha}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                                        {report.descripcion}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                <p className="text-sm">No hay reportes recientes en esta zona.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
