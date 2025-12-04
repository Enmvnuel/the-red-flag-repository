"use client";

import { useState, useMemo } from "react";
import { PERU_REGIONS } from "./PeruMapPaths";
import { mockReportes } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";

interface RegionStats {
  count: number;
  male: number;
  female: number;
}

export default function PeruMap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const regionStats = useMemo(() => {
    const stats: Record<string, RegionStats> = {};

    PERU_REGIONS.forEach(region => {
      const reports = mockReportes.filter(r => r.ciudad === region.name);
      stats[region.id] = {
        count: reports.length,
        male: reports.filter(r => r.genero === "hombre").length,
        female: reports.filter(r => r.genero === "mujer").length,
      };
    });
    return stats;
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="relative w-full h-full min-h-[600px] flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-[600px] aspect-[3/4]"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredRegion(null)}
      >
        <svg
          viewBox="0 0 600 800"
          className="w-full h-full drop-shadow-2xl filter"
          style={{ filter: "drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))" }}
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#f43f5e", stopOpacity: 0.2 }} />
              <stop offset="100%" style={{ stopColor: "#e11d48", stopOpacity: 0.6 }} />
            </linearGradient>
          </defs>

          {PERU_REGIONS.map((region) => {
            const stats = regionStats[region.id];
            const isHovered = hoveredRegion === region.id;
            const isSelected = selectedRegion === region.id;
            const hasReports = stats.count > 0;

            return (
              <motion.path
                key={region.id}
                d={region.d}
                id={region.id}
                data-name={region.name}
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className={`
                  cursor-pointer transition-all duration-300 ease-out
                  ${isSelected ? 'fill-rose-600 stroke-white stroke-2' : ''}
                  ${!isSelected && isHovered ? 'fill-rose-400 stroke-white stroke-2' : ''}
                  ${!isSelected && !isHovered && hasReports ? 'fill-rose-200 stroke-white' : ''}
                  ${!isSelected && !isHovered && !hasReports ? 'fill-slate-200 stroke-white' : ''}
                `}
                strokeWidth={isHovered || isSelected ? 2 : 1}
                onMouseEnter={() => setHoveredRegion(region.id)}
                onClick={() => setSelectedRegion(region.id === selectedRegion ? null : region.id)}
              />
            );
          })}
        </svg>

        <AnimatePresence>
          {hoveredRegion && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute pointer-events-none z-50"
              style={{
                left: mousePos.x + 20,
                top: mousePos.y - 20,
              }}
            >
              <div className="bg-white/90 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-xl min-w-[200px]">
                <h3 className="font-black text-slate-800 text-lg mb-1">
                  {PERU_REGIONS.find(r => r.id === hoveredRegion)?.name}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Reportes</span>
                    <span className="text-lg font-black text-rose-600">
                      {regionStats[hoveredRegion]?.count || 0}
                    </span>
                  </div>
                  {regionStats[hoveredRegion]?.count > 0 && (
                    <div className="flex gap-2 text-xs font-medium">
                      <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                        ♂ {regionStats[hoveredRegion].male}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-rose-100 text-rose-700">
                        ♀ {regionStats[hoveredRegion].female}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedRegion && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-4 right-4 w-64 bg-white/80 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-2xl"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-black text-slate-900">
                {PERU_REGIONS.find(r => r.id === selectedRegion)?.name}
              </h2>
              <button
                onClick={() => setSelectedRegion(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100">
                <p className="text-sm text-rose-600 font-medium mb-1">Nivel de Infidelidad</p>
                <p className="text-3xl font-black text-rose-700">
                  {regionStats[selectedRegion]?.count > 5 ? 'ALTO' :
                    regionStats[selectedRegion]?.count > 2 ? 'MEDIO' : 'BAJO'}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-slate-500">Últimos reportes:</p>
                {mockReportes
                  .filter(r => r.ciudad === PERU_REGIONS.find(reg => reg.id === selectedRegion)?.name)
                  .slice(0, 3)
                  .map(report => (
                    <div key={report.id} className="text-xs p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                      <span className="font-bold text-slate-700">{report.nombre}</span>
                      <span className="text-slate-400 mx-1">•</span>
                      <span className="text-slate-500">{report.fecha}</span>
                    </div>
                  ))}
                {mockReportes.filter(r => r.ciudad === PERU_REGIONS.find(reg => reg.id === selectedRegion)?.name).length === 0 && (
                  <p className="text-xs text-slate-400 italic">No hay reportes recientes.</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
