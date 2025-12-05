"use client";

import { motion } from "framer-motion";
import { RegionPath } from "./PeruMapPaths";

interface DepartmentLabelProps {
    region: RegionPath;
    isVisible: boolean;
    count: number;
}

export default function DepartmentLabel({ region, isVisible, count }: DepartmentLabelProps) {
    if (!isVisible) return null;

    return (
        <motion.g
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none select-none"
        >
            <text
                x={region.center.x}
                y={region.center.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-800 text-[10px] font-black drop-shadow-md shadow-white"
                style={{ textShadow: "0px 0px 4px rgba(255,255,255,0.8)" }}
            >
                {region.name}
            </text>
            {count > 0 && (
                <text
                    x={region.center.x}
                    y={region.center.y + 12}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-rose-600 text-[8px] font-bold"
                >
                    {count} casos
                </text>
            )}
        </motion.g>
    );
}
