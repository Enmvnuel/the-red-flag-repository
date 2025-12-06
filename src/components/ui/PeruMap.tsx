"use client";

import { useState, useMemo } from "react";
import { PERU_REGIONS } from "./PeruMapPaths";
import { Reporte } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import MapLegend from "./MapLegend";

interface RegionStats {
  count: number;
  male: number;
  female: number;
}

interface PeruMapProps {
  reportes: Reporte[];
  departmentStats?: Record<string, any>;
  onRegionSelect?: (regionId: string | null) => void;
  selectedRegionId?: string | null;
}

export default function PeruMap({ reportes, departmentStats, onRegionSelect, selectedRegionId }: PeruMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const regionStats = useMemo(() => {
    const stats: Record<string, RegionStats> = {};

    PERU_REGIONS.forEach(region => {
      // Primero intentar obtener datos de departmentStats (datos reales de BD)
      const deptData = departmentStats?.[region.name];
      
      if (deptData) {
        stats[region.id] = {
          count: deptData.totalReportes || 0,
          male: deptData.totalHombres || 0,
          female: deptData.totalMujeres || 0,
        };
      } else {
        // Fallback: calcular desde reportes
        const regionReports = reportes.filter(r => r.ciudad === region.name);
        stats[region.id] = {
          count: regionReports.length,
          male: regionReports.filter(r => r.genero === "hombre").length,
          female: regionReports.filter(r => r.genero === "mujer").length,
        };
      }
    });
    return stats;
  }, [reportes, departmentStats]);

  const handleRegionClick = (regionId: string) => {
    if (onRegionSelect) {
      onRegionSelect(selectedRegionId === regionId ? null : regionId);
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-slate-50/50">
      <div className="relative w-full max-w-[800px] aspect-[3/4] p-8">
        <svg
          viewBox="0 0 600 800"
          className="w-full h-full drop-shadow-2xl filter"
          style={{ filter: "drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))" }}
        >
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {PERU_REGIONS.map((region) => {
            const stats = regionStats[region.id];
            const isHovered = hoveredRegion === region.id;
            const isSelected = selectedRegionId === region.id;
            const hasReports = stats.count > 0;

            // Determinar el género predominante
            const isMaleDominant = stats.male > stats.female;
            const totalReports = stats.count;
            
            // Calculate fill color based on intensity and gender
            let fillColor = "#f1f5f9"; // slate-100 default
            let strokeColor = "#ffffff";
            let strokeWidth = "1";
            
            if (isSelected) {
              fillColor = isMaleDominant ? "#0000FF" : "#FF0000"; // Pure blue : Pure red
              strokeWidth = "2";
            } else if (isHovered) {
              fillColor = isMaleDominant ? "#4169E1" : "#FF6B9D"; // Royal blue : Pink
              strokeWidth = "1.5";
            } else if (totalReports > 0) {
              if (isMaleDominant) {
                // Colores AZULES PUROS para hombres
                if (totalReports > 10) fillColor = "#0047AB"; // Cobalt blue
                else if (totalReports > 5) fillColor = "#4169E1"; // Royal blue
                else fillColor = "#87CEEB"; // Sky blue
              } else {
                // Colores ROSADOS para mujeres
                if (totalReports > 10) fillColor = "#E91E63"; // Vivid pink
                else if (totalReports > 5) fillColor = "#FF69B4"; // Hot pink
                else fillColor = "#FFB6C1"; // Light pink
              }
            }

            return (
              <g key={region.id} onClick={() => handleRegionClick(region.id)}>
                <motion.path
                  d={region.d}
                  id={region.id}
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 1, pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  style={{ 
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-out'
                  }}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                />

              </g>
            );
          })}
        </svg>

        <MapLegend />
      </div>
    </div>
  );
}
