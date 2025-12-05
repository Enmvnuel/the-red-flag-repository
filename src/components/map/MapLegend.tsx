"use client";

import { motion } from "framer-motion";

export default function MapLegend() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6"
        >
            <h3 className="font-bold text-slate-800 mb-4">Leyenda del Mapa</h3>

            <div className="space-y-4">
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Niveles de Infidelidad</p>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded bg-rose-500" />
                            <span className="text-sm text-slate-600">Muy Alto ({">"} 60%)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded bg-rose-400" />
                            <span className="text-sm text-slate-600">Alto (40% - 60%)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded bg-rose-300" />
                            <span className="text-sm text-slate-600">Medio (20% - 40%)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded bg-rose-100" />
                            <span className="text-sm text-slate-600">Bajo ({`<`} 20%)</span>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Marcadores</p>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                            <span className="text-sm text-slate-600">Hombres</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-rose-500" />
                            <span className="text-sm text-slate-600">Mujeres</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
