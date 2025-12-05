"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { RegionPath } from "@/components/ui/PeruMapPaths";

interface MapPathProps {
    region: RegionPath;
    isSelected: boolean;
    isHovered: boolean;
    infidelityRate: number;
    onHover: (id: string) => void;
    onLeave: () => void;
    onClick: (id: string) => void;
}

function MapPath({
    region,
    isSelected,
    isHovered,
    infidelityRate,
    onHover,
    onLeave,
    onClick,
}: MapPathProps) {
    // Determine color based on infidelity rate
    const getFillColor = () => {
        if (isSelected) return "#e11d48"; // rose-600
        if (isHovered) return "#fb7185"; // rose-400

        // Gradient based on rate
        if (infidelityRate > 60) return "#f43f5e"; // rose-500
        if (infidelityRate > 40) return "#fb7185"; // rose-400
        if (infidelityRate > 20) return "#fda4af"; // rose-300
        return "#ffe4e6"; // rose-100
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
