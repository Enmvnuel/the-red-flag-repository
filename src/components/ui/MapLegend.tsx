"use client";

import { Info } from "lucide-react";

export default function MapLegend() {
    return (
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-100 max-w-[200px]">
            <div className="flex items-center gap-2 mb-3 text-slate-500">
                <Info className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Leyenda</span>
            </div>

            <div className="space-y-3">
                <div>
                    <p className="text-[10px] font-medium text-slate-400 mb-1">Intensidad</p>
                    <div className="h-2 w-full rounded-full bg-gradient-to-r from-rose-100 via-rose-400 to-rose-700"></div>
                    <div className="flex justify-between text-[9px] text-slate-400 mt-1">
                        <span>Bajo</span>
                        <span>Alto</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
