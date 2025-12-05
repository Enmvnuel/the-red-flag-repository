"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { REGION_CENTERS } from "./RegionCenters";
import { MOCK_MAP_DATA } from "@/data/mapData";

interface InfidelMarkersProps {
    selectedRegion: string | null;
}

export default function InfidelMarkers({ selectedRegion }: InfidelMarkersProps) {
    // Generate random markers based on stats
    const markers = useMemo(() => {
        const allMarkers: Array<{ id: string; x: number; y: number; type: 'man' | 'woman' }> = [];

        Object.entries(MOCK_MAP_DATA).forEach(([regionId, stats]) => {
            const center = REGION_CENTERS[regionId];
            if (!center) return;

            // Determine number of markers to show (scaled down for visual clarity)
            // If selected, show more detail for that region
            const scaleFactor = selectedRegion === regionId ? 0.05 : 0.01;
            const count = Math.min(Math.floor(stats.totalInfidels * scaleFactor), 50); // Cap at 50 per region to avoid lag

            for (let i = 0; i < count; i++) {
                // Random scatter around center
                // Use a simple box-muller transform or just random within a radius
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * 30; // 30px radius scatter
                const x = center.x + Math.cos(angle) * radius;
                const y = center.y + Math.sin(angle) * radius;

                allMarkers.push({
                    id: `${regionId}-${i}`,
                    x,
                    y,
                    type: Math.random() > 0.5 ? 'man' : 'woman'
                });
            }
        });

        return allMarkers;
    }, [selectedRegion]);

    return (
        <g className="pointer-events-none">
            {markers.map((marker) => (
                <motion.circle
                    key={marker.id}
                    cx={marker.x}
                    cy={marker.y}
                    r={selectedRegion ? 2 : 1.5}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 0.6,
                        scale: 1,
                        fill: marker.type === 'man' ? '#3b82f6' : '#e11d48'
                    }}
                    transition={{ duration: 0.5, delay: Math.random() * 0.5 }}
                />
            ))}
        </g>
    );
}
