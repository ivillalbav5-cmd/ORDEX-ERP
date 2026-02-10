"use client";

import { cn } from "@/lib/utils";

interface ChartTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
    formatter?: (value: any) => string;
}

export function ChartTooltip({ active, payload, label, formatter }: ChartTooltipProps) {
    if (!active || !payload || payload.length === 0) {
        return null;
    }

    return (
        <div className={cn(
            "rounded-[12px] px-4 py-3 shadow-xl border border-border/10",
            "bg-[#052940] text-white", // Light Mode: Dark BG, White Text
            "dark:bg-[#DBF227] dark:text-[#052940]" // Dark Mode: Lime BG, Navy Text
        )}>
            <p className="text-xs font-medium opacity-70 mb-1 uppercase tracking-wider font-inter">
                {label}
            </p>
            {payload.map((item: any, index: number) => (
                <div key={index} className="flex items-center gap-2">
                    <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-bold font-inter">
                        {formatter ? formatter(item.value) : item.value}
                    </span>
                    {item.name && (
                        <span className="text-xs opacity-70 font-inter capitalize">
                            {item.name}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}
