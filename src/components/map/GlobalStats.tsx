"use client";

import { motion } from "framer-motion";

interface GlobalStatsProps {
    stats: {
        totalInfidels: number;
        totalMen: number;
        totalWomen: number;
        totalCachudos: number;
        averageRate: number;
    };
}

export default function GlobalStats({ stats }: GlobalStatsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 overflow-hidden relative"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full -mr-10 -mt-10 blur-3xl opacity-50" />

            <h2 className="text-2xl font-black text-slate-800 mb-6 relative z-10">
                Estadísticas Nacionales 🇵🇪
            </h2>

            <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white shadow-lg">
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Total Infieles Detectados</p>
                    <p className="text-4xl font-black text-rose-500">{stats.totalInfidels.toLocaleString()}</p>
                </div>

                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                    <p className="text-blue-600 text-xs font-bold uppercase mb-1">Hombres Infieles</p>
                    <p className="text-2xl font-black text-slate-800">{stats.totalMen.toLocaleString()}</p>
                    <div className="w-full bg-blue-200 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div
                            className="bg-blue-500 h-full rounded-full"
                            style={{ width: `${(stats.totalMen / stats.totalInfidels) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="bg-rose-50 rounded-2xl p-4 border border-rose-100">
                    <p className="text-rose-600 text-xs font-bold uppercase mb-1">Mujeres Infieles</p>
                    <p className="text-2xl font-black text-slate-800">{stats.totalWomen.toLocaleString()}</p>
                    <div className="w-full bg-rose-200 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div
                            className="bg-rose-500 h-full rounded-full"
                            style={{ width: `${(stats.totalWomen / stats.totalInfidels) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="col-span-2 bg-amber-50 rounded-2xl p-4 border border-amber-100 flex items-center justify-between">
                    <div>
                        <p className="text-amber-700 text-xs font-bold uppercase mb-1">Total Cachudos</p>
                        <p className="text-2xl font-black text-slate-800">{stats.totalCachudos.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-amber-700 text-xs font-bold uppercase mb-1">Tasa Promedio</p>
                        <p className="text-2xl font-black text-amber-600">{stats.averageRate}%</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
