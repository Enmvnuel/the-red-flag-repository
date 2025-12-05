"use client";

import { motion } from "framer-motion";
import { DepartmentStats as DepartmentStatsType } from "@/data/mapData";
import { User, UserX, ShieldAlert } from "lucide-react";

interface DepartmentStatsProps {
    stats: DepartmentStatsType;
    onClose: () => void;
}

export default function DepartmentStats({ stats, onClose }: DepartmentStatsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-3xl shadow-xl border border-rose-100 p-6 relative overflow-hidden"
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
            >
                ✕
            </button>

            <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-2">
                    Departamento
                </span>
                <h2 className="text-3xl font-black text-slate-900">{stats.name}</h2>
            </div>

            <div className="space-y-6">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-slate-500 font-medium">Nivel de Infidelidad</span>
                        <span className={`text-2xl font-black ${stats.infidelityRate > 50 ? 'text-rose-600' : 'text-amber-500'
                            }`}>
                            {stats.infidelityRate}%
                        </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${stats.infidelityRate}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full rounded-full ${stats.infidelityRate > 50 ? 'bg-rose-500' : 'bg-amber-500'
                                }`}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 shadow-sm flex flex-col items-center justify-center text-center group hover:scale-[1.02] transition-transform">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-2 text-blue-600">
                            <User className="w-4 h-4" />
                        </div>
                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Hombres</p>
                        <p className="text-2xl font-black text-blue-600">{stats.menInfidels}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 shadow-sm flex flex-col items-center justify-center text-center group hover:scale-[1.02] transition-transform">
                        <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center mb-2 text-rose-600">
                            <User className="w-4 h-4" />
                        </div>
                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Mujeres</p>
                        <p className="text-2xl font-black text-rose-600">{stats.womenInfidels}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 shadow-sm flex flex-col items-center justify-center text-center group hover:scale-[1.02] transition-transform">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mb-2 text-amber-600">
                            <UserX className="w-4 h-4" />
                        </div>
                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Cachudos</p>
                        <p className="text-2xl font-black text-amber-600">{stats.cachudos}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center group hover:scale-[1.02] transition-transform">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mb-2 text-slate-600">
                            <ShieldAlert className="w-4 h-4" />
                        </div>
                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Total Infieles</p>
                        <p className="text-2xl font-black text-slate-800">{stats.totalInfidels}</p>
                    </div>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-200">
                    <p className="text-rose-100 text-xs font-bold uppercase mb-1">Rango de Edad Más Infiel</p>
                    <p className="text-3xl font-black">{stats.mostInfidelAgeRange} años</p>
                </div>
            </div>
        </motion.div>
    );
}
