"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PERU_REGIONS } from "@/components/ui/PeruMapPaths";
import { useReportes, useDepartmentStats } from "@/hooks/useDatabase";
import MapPath from "./MapPath";
import GlobalStats from "./GlobalStats";
import DepartmentStats from "./DepartmentStats";
import MapLegend from "./MapLegend";

export default function InteractiveMap() {
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    
    // Obtener datos reales de la base de datos
    const { reportes, loading, error } = useReportes();
    const { stats: departmentStats } = useDepartmentStats();

    // Crear mapa de datos por departamento desde la BD
    const mapDataByDepartment = useMemo(() => {
        const dataMap: Record<string, any> = {};
        
        departmentStats.forEach(dept => {
            // Calcular cachudos reales por departamento
            const cachudosEnDepartamento = reportes.filter(
                r => r.ciudad === dept.departamento && r.tipoReporte === "cachudo"
            ).length;
            
            dataMap[dept.departamento] = {
                id: dept.departamento,
                name: dept.departamento,
                totalInfidels: dept.totalReportes,
                menInfidels: dept.totalHombres,
                womenInfidels: dept.totalMujeres,
                cachudos: cachudosEnDepartamento,
                faithful: 0, // No tenemos este dato
                mostInfidelAgeRange: `${dept.edadMinima}-${dept.edadMaxima}`,
                infidelityRate: Math.min(100, Math.round((dept.totalReportes / 100) * 100)),
                trend: 'stable' as const
            };
        });
        
        return dataMap;
    }, [departmentStats, reportes]);

    // Calcular estadísticas globales desde la BD
    const globalStats = useMemo(() => {
        if (!reportes.length) return { totalInfidels: 0, totalMen: 0, totalWomen: 0, totalCachudos: 0, averageRate: 0 };

        const totalInfidels = reportes.length;
        const totalMen = reportes.filter(r => r.genero === "hombre").length;
        const totalWomen = reportes.filter(r => r.genero === "mujer").length;
        const totalCachudos = reportes.filter(r => r.tipoReporte === "cachudo").length;
        const averageRate = Math.round((totalInfidels / 1000) * 100); // Estimado

        return { totalInfidels, totalMen, totalWomen, totalCachudos, averageRate };
    }, [reportes]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);

    const handleHover = useCallback((id: string) => {
        setHoveredRegion(id);
    }, []);

    const handleLeave = useCallback(() => {
        setHoveredRegion(null);
    }, []);

    const handleClick = useCallback((id: string) => {
        setSelectedRegion(id);
    }, []);

    const currentStats = useMemo(() => {
        if (selectedRegion) {
            return mapDataByDepartment[selectedRegion];
        }
        return null;
    }, [selectedRegion, mapDataByDepartment]);

    // Auto-scroll to stats on mobile when a region is selected
    useEffect(() => {
        if (selectedRegion && window.innerWidth < 1024) { // lg breakpoint
            const statsPanel = document.getElementById('stats-panel');
            if (statsPanel) {
                statsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [selectedRegion]);

    return (
        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto p-4 min-h-[800px]">
            {/* Left Panel: Stats & Legend */}
            <div id="stats-panel" className="w-full lg:w-1/3 flex flex-col gap-6 order-2 lg:order-1">
                {loading ? (
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 text-center">
                        <p className="text-slate-500">Cargando datos...</p>
                    </div>
                ) : error ? (
                    <div className="bg-white rounded-3xl shadow-xl border border-rose-100 p-6 text-center">
                        <p className="text-rose-500">Error al cargar datos</p>
                    </div>
                ) : (
                    <GlobalStats stats={globalStats} />
                )}

                <AnimatePresence mode="wait">
                    {selectedRegion && currentStats ? (
                        <DepartmentStats
                            key="dept-stats"
                            stats={currentStats}
                            onClose={() => setSelectedRegion(null)}
                        />
                    ) : (
                        <MapLegend key="legend" />
                    )}
                </AnimatePresence>
            </div>

            {/* Right Panel: Map */}
            <div className="w-full lg:w-2/3 relative order-1 lg:order-2 flex flex-col items-center">
                <div
                    className="relative w-full aspect-[3/4] max-w-[600px]"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setHoveredRegion(null)}
                >
                    <svg
                        viewBox="0 0 600 800"
                        className="w-full h-full drop-shadow-2xl"
                        style={{ filter: "drop-shadow(0 20px 25px rgb(0 0 0 / 0.15))" }}
                    >
                        <defs>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="2" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* Render Regions */}
                        {PERU_REGIONS.map((region) => (
                            <MapPath
                                key={region.id}
                                region={region}
                                isSelected={selectedRegion === region.id}
                                isHovered={hoveredRegion === region.id}
                                menInfidels={mapDataByDepartment[region.id]?.menInfidels || 0}
                                womenInfidels={mapDataByDepartment[region.id]?.womenInfidels || 0}
                                onHover={handleHover}
                                onLeave={handleLeave}
                                onClick={handleClick}
                            />
                        ))}





                    </svg>

                    {/* Floating Tooltip */}
                    <AnimatePresence>
                        {hoveredRegion && mapDataByDepartment[hoveredRegion] && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                transition={{ duration: 0.15 }}
                                className="absolute pointer-events-none z-50"
                                style={{
                                    left: mousePos.x + 20,
                                    top: mousePos.y - 20,
                                }}
                            >
                                <div className="bg-slate-900/90 backdrop-blur-md text-white p-4 rounded-xl shadow-2xl border border-white/10 min-w-[180px]">
                                    <h3 className="font-bold text-lg mb-1">{mapDataByDepartment[hoveredRegion]?.name}</h3>
                                    <div className="flex items-center justify-between text-sm text-rose-300 mb-2">
                                        <span>Tasa de Infidelidad</span>
                                        <span className="font-bold">{mapDataByDepartment[hoveredRegion]?.infidelityRate}%</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="bg-white/10 rounded px-2 py-1 text-center">
                                            <span className="block text-slate-400 text-[10px]">Hombres</span>
                                            <span className="font-bold">{mapDataByDepartment[hoveredRegion]?.menInfidels}</span>
                                        </div>
                                        <div className="bg-white/10 rounded px-2 py-1 text-center">
                                            <span className="block text-slate-400 text-[10px]">Mujeres</span>
                                            <span className="font-bold">{mapDataByDepartment[hoveredRegion]?.womenInfidels}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-4 text-center text-slate-400 text-sm">
                    <p>Interactúa con el mapa para ver detalles por departamento.</p>
                </div>
            </div>
        </div>
    );
}
