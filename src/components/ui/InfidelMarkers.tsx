"use client";

import { motion } from "framer-motion";
import { Reporte } from "@/types";
import { RegionPath } from "./PeruMapPaths";
import { useState } from "react";

interface InfidelMarkersProps {
    region: RegionPath;
    reportes: Reporte[];
    isSelected: boolean;
}

export default function InfidelMarkers({ region, reportes, isSelected }: InfidelMarkersProps) {
    const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

    if (reportes.length === 0) return null;

    // Generate deterministic random positions around the center
    // We use the report ID to seed the position so it stays consistent
    const getPosition = (id: string, index: number) => {
        const seed = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const angle = (seed % 360) * (Math.PI / 180);
        // Radius varies but stays within a reasonable range (e.g., 5-25px from center)
        const radius = (seed % 20) + 5;

        return {
            x: region.center.x + Math.cos(angle) * radius,
            y: region.center.y + Math.sin(angle) * radius,
        };
    };

    return (
        <g className="pointer-events-none">
            {reportes.map((reporte, index) => {
                const pos = getPosition(reporte.id, index);
                const isHovered = hoveredMarker === reporte.id;

                return (
                    <motion.g
                        key={reporte.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="pointer-events-auto cursor-pointer"
                        onMouseEnter={() => setHoveredMarker(reporte.id)}
                        onMouseLeave={() => setHoveredMarker(null)}
                    >
                        {/* Pulse effect */}
                        <motion.circle
                            cx={pos.x}
                            cy={pos.y}
                            r={isSelected ? 6 : 3}
                            className="fill-rose-500 opacity-50"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 0, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.2,
                            }}
                        />

                        {/* Main Dot */}
                        <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={isSelected ? 3 : 1.5}
                            className="fill-rose-600 stroke-white stroke-[0.5]"
                        />

                        {/* Tooltip */}
                        {isHovered && (
                            <foreignObject
                                x={pos.x + 10}
                                y={pos.y - 20}
                                width="150"
                                height="60"
                                className="overflow-visible z-50"
                            >
                                <div className="bg-slate-900/90 text-white text-[10px] p-2 rounded-lg shadow-xl backdrop-blur-sm border border-slate-700/50 whitespace-nowrap">
                                    <p className="font-bold text-rose-400">{reporte.nombre} {reporte.apellido}</p>
                                    <p className="text-slate-300">{reporte.ciudad}</p>
                                </div>
                            </foreignObject>
                        )}
                    </motion.g>
                );
            })}
        </g>
    );
}
