"use client";

import { useState, useMemo } from "react";
import { useReportes, useDepartmentStats } from "@/hooks/useDatabase";
import PeruMap from "@/components/ui/PeruMap";
import GlobalStats from "@/components/ui/GlobalStats";
import DepartmentStats from "@/components/ui/DepartmentStats";
import { Map as MapIcon } from "lucide-react";
import { PERU_REGIONS } from "@/components/ui/PeruMapPaths";
import { AnimatePresence } from "framer-motion";

export default function MapPage() {
    const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
    const { reportes, loading, error } = useReportes();
    const { stats: departmentStats, loading: statsLoading } = useDepartmentStats();

    // Crear un mapa de datos por departamento desde la base de datos
    const mapDataByDepartment = useMemo(() => {
        const dataMap: Record<string, any> = {};
        
        departmentStats.forEach(dept => {
            dataMap[dept.departamento] = {
                totalInfidels: dept.totalReportes,
                menInfidels: dept.totalHombres,
                womenInfidels: dept.totalMujeres,
                denuncias: dept.totalDenuncias,
                edadPromedio: dept.edadPromedio,
                edadMinima: dept.edadMinima,
                edadMaxima: dept.edadMaxima
            };
        });
        
        return dataMap;
    }, [departmentStats]);

    // Calculate Global Stats
    const stats = useMemo(() => {
        if (!reportes.length) return { totalReportes: 0, uniqueInfieles: 0, hombresPct: 0, mujeresPct: 0, topCities: [] };

        const totalReportes = reportes.length;
        const uniqueInfieles = new Set(reportes.map(r => r.nombre + (r.apellido || ''))).size;
        const hombres = reportes.filter(r => r.genero === "hombre").length;
        const mujeres = reportes.filter(r => r.genero === "mujer").length;
        const hombresPct = Math.round((hombres / totalReportes) * 100);
        const mujeresPct = Math.round((mujeres / totalReportes) * 100);

        const cityStats = reportes.reduce((acc, curr) => {
            acc[curr.ciudad] = (acc[curr.ciudad] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const topCities = Object.entries(cityStats)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5);

        return { totalReportes, uniqueInfieles, hombresPct, mujeresPct, topCities };
    }, [reportes]);

    // Selected Region Data
    const selectedRegionData = useMemo(() => {
        if (!selectedRegionId || !reportes.length) return null;
        const region = PERU_REGIONS.find(r => r.id === selectedRegionId);
        if (!region) return null;

        const regionReports = reportes.filter(r => r.ciudad === region.name);
        const deptData = mapDataByDepartment[region.name];

        return {
            name: region.name,
            stats: {
                count: regionReports.length,
                male: regionReports.filter(r => r.genero === "hombre").length,
                female: regionReports.filter(r => r.genero === "mujer").length,
            },
            departmentData: deptData || null,
            recentReports: regionReports.slice(0, 5)
        };
    }, [selectedRegionId, reportes, mapDataByDepartment]);

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
                                    departmentData={selectedRegionData.departmentData}
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

                            {loading ? (
                                <div className="text-center text-slate-500">
                                    <p className="text-lg font-semibold">Cargando mapa...</p>
                                </div>
                            ) : error ? (
                                <div className="text-center text-rose-500">
                                    <p className="text-lg font-semibold">Error al cargar datos</p>
                                    <p className="text-sm">{error}</p>
                                </div>
                            ) : (
                                <PeruMap
                                    reportes={reportes}
                                    departmentStats={mapDataByDepartment}
                                    onRegionSelect={setSelectedRegionId}
                                    selectedRegionId={selectedRegionId}
                                />
                            )}

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
