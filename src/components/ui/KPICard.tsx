import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/Card";
import { LucideIcon, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface KPICardProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    value: string | number;
    icon?: LucideIcon;
    trend?: "up" | "down" | "neutral";
    trendValue?: string;
    trendLabel?: string;
}

export function KPICard({
    label,
    value,
    icon: Icon,
    trend,
    trendValue,
    trendLabel,
    className,
    ...props
}: KPICardProps) {
    return (
        <Card className={cn("overflow-hidden rounded-[16px] border-border bg-card shadow-sm hover:shadow-md transition-all duration-300", className)} {...props}>
            <CardContent className="p-6 h-full flex flex-col justify-between">
                <div className="flex items-start gap-4">
                    {/* UI Guardian: Icon with color-mix background - Moved to Left */}
                    {Icon && (
                        <div className="flex-shrink-0 p-3 rounded-[12px] bg-[var(--icon-container-bg)] text-[var(--icon-container-fg)]">
                            <Icon className="h-5 w-5 opacity-100" />
                        </div>
                    )}

                    <div className="flex-1 space-y-4">
                        <div className="flex flex-col gap-1">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-sans opacity-70">
                                {label}
                            </p>
                            <div className="text-3xl font-black tracking-tight text-foreground font-display">{value}</div>
                        </div>

                        <div className="flex items-center gap-3">
                            {trend && (
                                <div className={cn(
                                    "flex items-center text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider",
                                    trend === "up" && "text-emerald-800 bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-300",
                                    trend === "down" && "text-rose-800 bg-rose-100 dark:bg-rose-500/20 dark:text-rose-300",
                                    trend === "neutral" && "text-slate-700 bg-slate-100 dark:bg-slate-500/20 dark:text-slate-300"
                                )}>
                                    {trend === "up" && <ArrowUpRight className="h-3 w-3 mr-1 strike-[2.5]" />}
                                    {trend === "down" && <ArrowDownRight className="h-3 w-3 mr-1 strike-[2.5]" />}
                                    {trend === "neutral" && <Minus className="h-3 w-3 mr-1 strike-[2.5]" />}
                                    {trendValue}
                                </div>
                            )}
                            {trendLabel && (
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight opacity-50 whitespace-nowrap">
                                    {trendLabel}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
