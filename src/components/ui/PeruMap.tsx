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
  onRegionSelect?: (regionId: string | null) => void;
  selectedRegionId?: string | null;
}

export default function PeruMap({ reportes, onRegionSelect, selectedRegionId }: PeruMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const regionStats = useMemo(() => {
    const stats: Record<string, RegionStats> = {};

    PERU_REGIONS.forEach(region => {
      const regionReports = reportes.filter(r => r.ciudad === region.name);
      stats[region.id] = {
        count: regionReports.length,
        male: regionReports.filter(r => r.genero === "hombre").length,
        female: regionReports.filter(r => r.genero === "mujer").length,
      };
    });
    return stats;
  }, [reportes]);

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

            // Calculate fill color based on intensity
            let fillClass = "fill-slate-100";
            if (isSelected) fillClass = "fill-rose-600";
            else if (isHovered) fillClass = "fill-rose-300";
            else if (stats.count > 10) fillClass = "fill-rose-500";
            else if (stats.count > 5) fillClass = "fill-rose-300";
            else if (stats.count > 0) fillClass = "fill-rose-100";

            return (
              <g key={region.id} onClick={() => handleRegionClick(region.id)}>
                <motion.path
                  d={region.d}
                  id={region.id}
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 1, pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className={`
                    cursor-pointer transition-all duration-300 ease-out stroke-white
                    ${fillClass}
                    ${isSelected ? 'stroke-[2px] z-10' : 'stroke-[1px] hover:stroke-[1.5px]'}
                  `}
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
