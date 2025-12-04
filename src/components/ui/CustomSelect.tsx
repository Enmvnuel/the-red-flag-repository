"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, MapPin } from "lucide-react";

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    icon?: React.ElementType;
    className?: string;
    accentColor?: "rose" | "blue" | "pink";
}

export default function CustomSelect({
    options,
    value,
    onChange,
    placeholder = "Seleccionar",
    icon: Icon = MapPin,
    className = "",
    accentColor = "rose",
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const colorMap = {
        rose: {
            ring: "focus:ring-rose-500",
            text: "text-rose-600",
            bg: "bg-rose-50",
            hover: "hover:bg-rose-50",
            active: "bg-rose-100 text-rose-700",
        },
        blue: {
            ring: "focus:ring-blue-500",
            text: "text-blue-600",
            bg: "bg-blue-50",
            hover: "hover:bg-blue-50",
            active: "bg-blue-100 text-blue-700",
        },
        pink: {
            ring: "focus:ring-pink-500",
            text: "text-pink-600",
            bg: "bg-pink-50",
            hover: "hover:bg-pink-50",
            active: "bg-pink-100 text-pink-700",
        },
    };

    const colors = colorMap[accentColor];

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`relative w-full cursor-pointer rounded-2xl bg-slate-100/50 py-4 pl-14 pr-12 text-left text-lg font-medium shadow-inner ring-1 ring-inset ring-slate-200 transition-all hover:bg-white focus:outline-none focus:ring-2 ${colors.ring} ${isOpen ? "bg-white ring-2 " + colors.ring : ""}`}
            >
                <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                    <Icon className={`h-5 w-5 text-slate-400 transition-colors ${isOpen ? colors.text : ""}`} />
                </div>
                <span className={`block truncate ${!selectedOption ? "text-slate-500" : "text-slate-900"}`}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <ChevronDown
                        className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 " + colors.text : ""}`}
                    />
                </div>
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-2xl bg-white py-2 shadow-2xl ring-1 ring-black/5 focus:outline-none animate-in fade-in zoom-in-95 duration-100">
                    {options.map((option) => {
                        const isSelected = option.value === value;
                        return (
                            <div
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`relative cursor-pointer select-none py-3 pl-14 pr-4 transition-colors ${isSelected ? colors.active : `text-slate-900 ${colors.hover}`
                                    }`}
                            >
                                {isSelected && (
                                    <span className={`absolute inset-y-0 left-0 flex items-center pl-5 ${colors.text}`}>
                                        <Check className="h-4 w-4" />
                                    </span>
                                )}
                                <span className={`block truncate ${isSelected ? "font-semibold" : "font-medium"}`}>
                                    {option.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
