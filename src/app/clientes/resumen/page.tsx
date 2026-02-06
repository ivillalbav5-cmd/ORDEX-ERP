"use client";

import React from "react";
import { ClientsHeader } from "@/components/clients/ClientsHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
    Users,
    UserMinus,
    UserX,
    TrendingUp,
    ArrowUpRight,
    Search
} from "lucide-react";
import { CLIENTS } from "@/constants/clients";

export default function ClientsResumenPage() {
    const totalClients = CLIENTS.length;
    const activeClients = CLIENTS.filter(c => c.estado === "Activo").length;
    const inactiveClients = CLIENTS.filter(c => c.estado === "Inactivo").length;
    const suspendedClients = CLIENTS.filter(c => c.estado === "Suspendido").length;

    return (
        <main className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            <ClientsHeader />

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-12 gap-6 grid-rows-[auto_auto_auto]">

                {/* KPI Cards */}
                <Card className="col-span-12 lg:col-span-3 p-6 flex flex-col justify-between border-none shadow-xl bg-white/80 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-brand/10 rounded-2xl">
                            <Users className="w-6 h-6 text-brand" />
                        </div>
                        <div className="flex items-center gap-1 text-green-500 bg-green-50 px-2 py-1 rounded-full text-xs font-bold">
                            <TrendingUp className="w-3 h-3" />
                            +12%
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground/50 uppercase tracking-widest">Total Clientes</p>
                        <h3 className="text-4xl font-black text-foreground mt-1 tracking-tight">{totalClients}</h3>
                    </div>
                </Card>

                <Card className="col-span-12 lg:col-span-3 p-6 flex flex-col justify-between border-none shadow-xl bg-white/80 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-2xl">
                            <Users className="w-6 h-6 text-blue-500" />
                        </div>
                        <div className="flex items-center gap-1 text-blue-500 bg-blue-50 px-2 py-1 rounded-full text-xs font-bold">
                            Activos
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground/50 uppercase tracking-widest">Activos</p>
                        <h3 className="text-4xl font-black text-foreground mt-1 tracking-tight">{activeClients}</h3>
                    </div>
                </Card>

                <Card className="col-span-12 lg:col-span-3 p-6 flex flex-col justify-between border-none shadow-xl bg-white/80 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-amber-500/10 rounded-2xl">
                            <UserMinus className="w-6 h-6 text-amber-500" />
                        </div>
                        <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-full text-xs font-bold">
                            Inactivos
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground/50 uppercase tracking-widest">Desactualizados</p>
                        <h3 className="text-4xl font-black text-foreground mt-1 tracking-tight">{inactiveClients}</h3>
                    </div>
                </Card>

                <Card className="col-span-12 lg:col-span-3 p-6 flex flex-col justify-between border-none shadow-xl bg-white/80 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-red-500/10 rounded-2xl">
                            <UserX className="w-6 h-6 text-red-500" />
                        </div>
                        <div className="flex items-center gap-1 text-red-500 bg-red-50 px-2 py-1 rounded-full text-xs font-bold">
                            Críticos
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground/50 uppercase tracking-widest">Suspendidos</p>
                        <h3 className="text-4xl font-black text-foreground mt-1 tracking-tight">{suspendedClients}</h3>
                    </div>
                </Card>

                {/* Main Content Area - Donut & Ranking */}
                <Card className="col-span-12 lg:col-span-8 h-[450px] p-8 border-none shadow-xl bg-white flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h4 className="text-xl font-black text-foreground">Distribución por Rubro</h4>
                            <p className="text-sm text-foreground/40 font-medium">Análisis de participación de mercado interno</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest opacity-60">Ver Detalle</Button>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        {/* Placeholder for Donut Chart */}
                        <div className="relative w-64 h-64 flex items-center justify-center">
                            <div className="absolute inset-0 border-[24px] border-brand/20 rounded-full" />
                            <div className="absolute inset-0 border-[24px] border-l-brand border-t-brand border-r-blue-500 border-b-amber-500 rounded-full animate-spin-slow opacity-80" />
                            <div className="text-center z-10">
                                <span className="text-xs font-bold text-foreground/40 uppercase tracking-widest">Total</span>
                                <p className="text-3xl font-black text-foreground leading-none mt-1">{totalClients}</p>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="col-span-12 lg:col-span-4 h-[450px] p-8 border-none shadow-xl bg-white flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h4 className="text-xl font-black text-foreground">Top Deudores</h4>
                            <p className="text-sm text-foreground/40 font-medium">Gestión de cobranza pendiente</p>
                        </div>
                    </div>
                    <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        {CLIENTS.filter(c => c.saldoDeuda > 0).sort((a, b) => b.saldoDeuda - a.saldoDeuda).slice(0, 5).map((client) => (
                            <div key={client.id} className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold text-foreground/80">{client.razonSocial}</span>
                                    <span className="font-black text-red-500">${client.saldoDeuda.toLocaleString()}</span>
                                </div>
                                <div className="w-full h-2 bg-foreground/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-red-500 rounded-full"
                                        style={{ width: `${Math.min((client.saldoDeuda / 2000000) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Bottom Row: Sales Ranking */}
                <Card className="col-span-12 p-8 border-none shadow-xl bg-white">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h4 className="text-xl font-black text-foreground">Ranking de Vendedores</h4>
                            <p className="text-sm text-foreground/40 font-medium">Performance de gestión comercial por agente</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: "Juan Pérez", clients: 45, goal: 92 },
                            { name: "María López", clients: 38, goal: 85 },
                            { name: "Ricardo Darín", clients: 22, goal: 78 },
                            { name: "Roberto Sánchez", clients: 15, goal: 60 }
                        ].map((vendedor, i) => (
                            <div key={i} className="flex flex-col gap-4 p-4 rounded-2xl bg-foreground/[0.02] hover:bg-brand/5 border border-transparent hover:border-brand/20 transition-all cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center font-black text-foreground group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
                                        {vendedor.name[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-foreground">{vendedor.name}</p>
                                        <p className="text-xs text-foreground/40 font-medium whitespace-nowrap">{vendedor.clients} Clientes asignados</p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-foreground/30">
                                        <span>Eficiencia</span>
                                        <span>{vendedor.goal}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-foreground/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-brand group-hover:scale-x-105 origin-left transition-transform" style={{ width: `${vendedor.goal}%` }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

            </div>
        </main>
    );
}
