"use client";

import {
    Cell,
    Pie,
    PieChart as RechartsPieChart,
    ResponsiveContainer,
    Tooltip,
    Legend
} from "recharts";
import { Card } from "@/components/ui/Card";
import { ChartTooltip } from "./ChartTooltip";

interface PieChartProps {
    data: any[];
    category: string;
    index: string;
    height?: number;
    valueFormatter?: (value: number) => string;
}

const OPACITY_VARIANTS = [
    "var(--primary)",                 // 100%
    "color-mix(in srgb, var(--primary), transparent 30%)", // 70%
    "color-mix(in srgb, var(--primary), transparent 60%)", // 40%
    "color-mix(in srgb, var(--primary), transparent 85%)", // 15%
];

export function PieChart({ data, category, index, height = 350, valueFormatter }: PieChartProps) {
    return (
        <Card className="p-6 rounded-[16px] w-full">
            <ResponsiveContainer width="100%" height={height}>
                <RechartsPieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius="60%"
                        outerRadius="100%"
                        paddingAngle={2}
                        dataKey={category}
                        nameKey={index}
                        stroke="var(--background)"
                        strokeWidth={2}
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={OPACITY_VARIANTS[index % OPACITY_VARIANTS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip formatter={valueFormatter} />} />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        formatter={(value) => <span className="text-sm font-medium font-inter ml-1">{value}</span>}
                    />
                </RechartsPieChart>
            </ResponsiveContainer>
        </Card>
    );
}
