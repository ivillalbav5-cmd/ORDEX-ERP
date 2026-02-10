"use client";

import {
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart as RechartsRadarChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { ChartTooltip } from "./ChartTooltip";

interface RadarChartProps {
    data: any[];
    categories: string[];
    index: string;
    height?: number;
    valueFormatter?: (value: number) => string;
}

export function RadarChart({ data, categories, index, height = 350, valueFormatter }: RadarChartProps) {
    return (
        <Card className="p-6 rounded-[16px] w-full">
            <ResponsiveContainer width="100%" height={height}>
                <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="color-mix(in srgb, #052940, transparent 90%)" />
                    <PolarAngleAxis
                        dataKey={index}
                        tick={{ fill: "var(--muted-foreground)", fontSize: 12, fontFamily: "Inter" }}
                    />
                    <PolarRadiusAxis
                        angle={30}
                        domain={[0, 'auto']}
                        tick={false}
                        axisLine={false}
                    />
                    {categories.map((category) => (
                        <Radar
                            key={category}
                            name={category}
                            dataKey={category}
                            stroke="var(--primary)"
                            strokeWidth={2}
                            fill="var(--primary)"
                            fillOpacity={0.15}
                        />
                    ))}
                    <Tooltip content={<ChartTooltip formatter={valueFormatter} />} />
                </RechartsRadarChart>
            </ResponsiveContainer>
        </Card>
    );
}
