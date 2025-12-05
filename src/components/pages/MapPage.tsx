"use client";

import { useState, useMemo } from "react";
import { mockReportes } from "@/data/mockData";
import PeruMap from "@/components/ui/PeruMap";
import GlobalStats from "@/components/ui/GlobalStats";
import DepartmentStats from "@/components/ui/DepartmentStats";
import { Map as MapIcon } from "lucide-react";
import { PERU_REGIONS } from "@/components/ui/PeruMapPaths";
import { AnimatePresence } from "framer-motion";

export default function MapPage() {
    const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);

    // Calculate Global Stats
    const stats = useMemo(() => {
        const totalReportes = mockReportes.length;
        const uniqueInfieles = new Set(mockReportes.map(r => r.nombre + r.apellido)).size;
        const hombres = mockReportes.filter(r => r.genero === "hombre").length;
        const mujeres = mockReportes.filter(r => r.genero === "mujer").length;
        const hombresPct = Math.round((hombres / totalReportes) * 100);
        const mujeresPct = Math.round((mujeres / totalReportes) * 100);

        const cityStats = mockReportes.reduce((acc, curr) => {
            acc[curr.ciudad] = (acc[curr.ciudad] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const topCities = Object.entries(cityStats)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5);

        return { totalReportes, uniqueInfieles, hombresPct, mujeresPct, topCities };
    }, []);

    // Selected Region Data
    const selectedRegionData = useMemo(() => {
        if (!selectedRegionId) return null;
        const region = PERU_REGIONS.find(r => r.id === selectedRegionId);
        if (!region) return null;

        const regionReports = mockReportes.filter(r => r.ciudad === region.name);

        return {
            name: region.name,
            stats: {
                count: regionReports.length,
                male: regionReports.filter(r => r.genero === "hombre").length,
                female: regionReports.filter(r => r.genero === "mujer").length,
            },
            recentReports: regionReports.slice(0, 5)
        };
    }, [selectedRegionId]);

    return (
        <div className="min-h-screen bg-slate-50 px-6 py-12 bg-[url('/grid.svg')] bg-fixed selection:bg-rose-500 selection:text-white">
            <div className="mx-auto max-w-7xl h-[calc(100vh-6rem)] flex flex-col">
                {/* Header */}
                <div className="mb-8 text-center flex-none">
                    <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-sm font-semibold text-rose-600 ring-1 ring-inset ring-rose-100 mb-4">
                        <MapIcon className="h-4 w-4" />
                        Mapa en Tiempo Real
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl mb-2">
                        Mapa de Infidelidad
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Visualiza en tiempo real dónde se concentran los reportes.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 flex-1 min-h-0">
                    {/* Stats Sidebar (Left) */}
                    <div className="lg:col-span-4 h-full min-h-0 flex flex-col">
                        <AnimatePresence mode="wait">
                            {selectedRegionData ? (
                                <DepartmentStats
                                    key="dept-stats"
                                    regionName={selectedRegionData.name}
                                    stats={selectedRegionData.stats}
                                    recentReports={selectedRegionData.recentReports}
                                    onClose={() => setSelectedRegionId(null)}
                                />
                            ) : (
                                <GlobalStats
                                    key="global-stats"
                                    {...stats}
                                />
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Map Area (Right) */}
                    <div className="lg:col-span-8 h-full min-h-0">
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-4 h-full relative overflow-hidden flex items-center justify-center">
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-50 pointer-events-none"></div>

                            <PeruMap
                                reportes={mockReportes}
                                onRegionSelect={setSelectedRegionId}
                                selectedRegionId={selectedRegionId}
                            />

                            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-[10px] font-medium text-slate-400 border border-slate-200 shadow-sm">
                                * Datos basados en reportes de la comunidad
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
