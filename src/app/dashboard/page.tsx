"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import {
    TrendingUp,
    Users,
    Package,
    ArrowUpRight,
    Wallet,
    Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";

export default function DashboardPage() {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="p-[42px] animate-in fade-in duration-500">
            <div className="flex flex-col gap-8">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-foreground tracking-tight">Dashboard Overview</h1>
                        <p className="text-foreground/50 font-medium mt-1">Monitoreo global de la arquitectura operativa de ORDEX</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-surface-bg/50 border border-foreground/5 rounded-ordex px-4 py-2 backdrop-blur-md">
                            <Calendar className="w-4 h-4 text-brand" />
                            <span className="text-xs font-bold uppercase tracking-widest text-foreground/70">Hoy: 06 FEB 2026</span>
                        </div>
                        <Button variant="primary" className="gap-2 px-6">
                            <PlusIcon className="w-4 h-4" />
                            GENERAR REPORTE
                        </Button>
                    </div>
                </div>

                {/* Primary Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <Card key={i} className="p-8 h-40 border-none shadow-xl bg-white">
                                <Skeleton className="w-12 h-12 rounded-2xl mb-6" />
                                <div className="space-y-2">
                                    <Skeleton className="w-20 h-3" />
                                    <Skeleton className="w-32 h-8" />
                                </div>
                            </Card>
                        ))
                    ) : (
                        [
                            { label: "Ventas Totales", value: "$4.120.000", change: "+14%", icon: Wallet, color: "text-green-600", bg: "bg-green-50" },
                            { label: "Nuevos Clientes", value: "24", change: "+12%", icon: Users, color: "text-brand", bg: "bg-brand/10" },
                            { label: "Stock Crítico", value: "12", change: "-2", icon: Package, color: "text-red-600", bg: "bg-red-50" },
                            { label: "Performance", value: "94%", change: "+3%", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
                        ].map((stat, i) => (
                            <Card key={i} className="p-8 flex flex-col justify-between border-none shadow-xl bg-white group hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer">
                                <div className="flex items-center justify-between mb-6">
                                    <div className={cn(stat.bg, "p-3 rounded-2xl shadow-sm")}>
                                        <stat.icon className={cn(stat.color, "w-6 h-6")} />
                                    </div>
                                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/20 group-hover:text-brand transition-colors flex items-center gap-1.5">
                                        DETALLE <ArrowUpRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.25em] mb-1">{stat.label}</p>
                                            <h3 className="text-3xl font-black text-foreground tracking-tight">{stat.value}</h3>
                                        </div>
                                        <span className={cn(stat.color, "text-[11px] font-black bg-white px-2 py-1 rounded-lg shadow-sm mb-1")}>{stat.change}</span>
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-12 gap-8">
                    {/* Activity Feed / Placeholder */}
                    <Card className="col-span-12 lg:col-span-8 h-[450px] p-10 border-none shadow-xl bg-white flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 bg-foreground/[0.02] rounded-full flex items-center justify-center mb-8">
                            <TrendingUp className="w-12 h-12 text-foreground/5" />
                        </div>
                        <h4 className="text-2xl font-black text-foreground mb-3">Monitor de Actividad Comercial</h4>
                        <p className="text-sm text-foreground/40 font-bold max-w-sm uppercase tracking-wide">No hay reportes generados para el período seleccionado. Iniciá la gestión de clientes para ver datos aquí.</p>
                        <Button variant="outline" className="mt-10 px-8 h-12">CONFIGURAR WIDGETS</Button>
                    </Card>

                    {/* Quick Access */}
                    <Card className="col-span-12 lg:col-span-4 h-[450px] p-10 border-none shadow-2xl bg-primary text-white flex flex-col">
                        <h4 className="text-xl font-black mb-8 italic tracking-tighter">ACCESO RÁPIDO</h4>
                        <div className="space-y-4 flex-1">
                            {[
                                { label: "Gestionar Clientes", desc: "Ver listado y estados", href: "/clientes/resumen" },
                                { label: "Facturación masiva", desc: "Procesar pendientes", href: "#" },
                                { label: "Configurar Rubros", desc: "Taxonomía de mercado", href: "/clientes/configurar" },
                            ].map((link, i) => (
                                <button key={i} className="w-full p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-brand hover:text-primary hover:border-brand transition-all text-left flex items-center justify-between group">
                                    <div>
                                        <p className="font-black text-[11px] uppercase tracking-widest">{link.label}</p>
                                        <p className="text-[10px] opacity-40 font-bold group-hover:opacity-60">{link.desc}</p>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 opacity-20 group-hover:opacity-100" />
                                </button>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </main>
    );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    );
}
