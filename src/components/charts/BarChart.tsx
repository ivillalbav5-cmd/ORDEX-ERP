"use client";

import {
    Bar,
    BarChart as RechartsBarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { ChartTooltip } from "./ChartTooltip";

interface BarChartProps {
    data: any[];
    categories: string[];
    index: string;
    height?: number;
    valueFormatter?: (value: number) => string;
}

export function BarChart({ data, categories, index, height = 350, valueFormatter }: BarChartProps) {
    return (
        <Card className="p-6 rounded-[16px] w-full">
            <ResponsiveContainer width="100%" height={height}>
                <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barGap={8}>
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
                        cursor={{ fill: "var(--primary)", opacity: 0.1 }}
                    />
                    {categories.map((category) => (
                        <Bar
                            key={category}
                            dataKey={category}
                            fill="var(--primary)"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={50}
                        />
                    ))}
                </RechartsBarChart>
            </ResponsiveContainer>
        </Card>
    );
}
