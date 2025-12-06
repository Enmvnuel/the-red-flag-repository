"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { RegionPath } from "@/components/ui/PeruMapPaths";

interface MapPathProps {
    region: RegionPath;
    isSelected: boolean;
    isHovered: boolean;
    menInfidels: number;
    womenInfidels: number;
    onHover: (id: string) => void;
    onLeave: () => void;
    onClick: (id: string) => void;
}

function MapPath({
    region,
    isSelected,
    isHovered,
    menInfidels,
    womenInfidels,
    onHover,
    onLeave,
    onClick,
}: MapPathProps) {
    // Determinar el género predominante
    const isMaleDominant = menInfidels > womenInfidels;
    const totalInfidels = menInfidels + womenInfidels;

    // Determine color based on gender dominance
    const getFillColor = () => {
        if (totalInfidels === 0) return "#f1f5f9"; // slate-100 default

        if (isSelected) {
            return isMaleDominant ? "#3b82f6" : "#f43f5e"; // blue-500 : rose-500
        }
        
        if (isHovered) {
            return isMaleDominant ? "#60a5fa" : "#fb7185"; // blue-400 : rose-400
        }

        // Gradient based on gender and intensity - COLORES SUAVES con más intensidad
        if (isMaleDominant) {
            // Colores AZULES con intensidad media
            if (totalInfidels > 2000) return "#60a5fa"; // blue-400
            if (totalInfidels > 1000) return "#93c5fd"; // blue-300
            return "#bfdbfe"; // blue-200
        } else {
            // Colores ROSADOS con intensidad media
            if (totalInfidels > 2000) return "#fb7185"; // rose-400
            if (totalInfidels > 1000) return "#fda4af"; // rose-300
            return "#fecdd3"; // rose-200
        }
    };

    return (
        <motion.path
            d={region.d}
            id={region.id}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{
                opacity: 1,
                pathLength: 1,
                fill: getFillColor(),
                stroke: isSelected || isHovered ? "#ffffff" : "#fff1f2",
                strokeWidth: isSelected ? 3 : isHovered ? 2 : 1,
                scale: isSelected ? 1.01 : 1,
            }}
            transition={{
                duration: 0.5,
                ease: "easeInOut",
                fill: { duration: 0.3 }
            }}
            className="cursor-pointer transition-colors duration-300"
            onMouseEnter={() => onHover(region.id)}
            onMouseLeave={onLeave}
            onClick={() => onClick(region.id)}
            style={{
                transformOrigin: "center",
                filter: isSelected ? "drop-shadow(0 0 10px rgba(225, 29, 72, 0.5))" : "none"
            }}
        />
    );
}

export default memo(MapPath);
