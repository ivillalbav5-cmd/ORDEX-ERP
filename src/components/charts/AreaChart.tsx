"use client";

import {
    Area,
    AreaChart as RechartsAreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { ChartTooltip } from "./ChartTooltip";

interface AreaChartProps {
    data: any[];
    categories: string[];
    index: string;
    height?: number;
    valueFormatter?: (value: number) => string;
}

export function AreaChart({ data, categories, index, height = 350, valueFormatter }: AreaChartProps) {
    return (
        <Card className="p-6 rounded-[16px] w-full">
            <ResponsiveContainer width="100%" height={height}>
                <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid
                        strokeDasharray="0"
                        vertical={false}
                        stroke="color-mix(in srgb, #052940, transparent 95%)"
                    />
                    <XAxis
                        dataKey={index}
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        fontFamily="Inter"
                    />
                    <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={valueFormatter}
                        fontFamily="Inter"
                    />
                    <Tooltip
                        content={<ChartTooltip formatter={valueFormatter} />}
                        cursor={{ stroke: "var(--primary)", strokeWidth: 1, strokeOpacity: 0.2 }}
                    />
                    {categories.map((category) => (
                        <Area
                            key={category}
                            type="monotone"
                            dataKey={category}
                            stroke="var(--primary)"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorPrimary)"
                            activeDot={{
                                r: 6,
                                fill: "var(--primary)",
                                stroke: "var(--background)",
                                strokeWidth: 2,
                            }}
                        />
                    ))}
                </RechartsAreaChart>
            </ResponsiveContainer>
        </Card>
    );
}
