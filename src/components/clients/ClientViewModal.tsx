"use client";

import React, { useState } from "react";
import {
    X,
    Edit2,
    Building,
    CreditCard,
    Tag,
    MapPin,
    ShieldCheck,
    Wallet,
    Calendar,
    AlertCircle,
    Phone,
    Mail,
    User,
    Truck,
    Clock,
    DollarSign,
    CheckCircle2,
    History,
    Plus,
    Check
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { Client, GESTIONES } from "@/constants/clients";

interface ClientViewModalProps {
    client: Client | null;
    isOpen: boolean;
    onClose: () => void;
}

type TabType = "Identificación" | "Comercial" | "Domicilios" | "Gestiones";

export function ClientViewModal({ client, isOpen, onClose }: ClientViewModalProps) {
    const [activeTab, setActiveTab] = useState<TabType>("Identificación");

    if (!isOpen || !client) return null;

    const initials = client.razonSocial.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();

    // Mock data for Saldo and AFIP alert
    const isAfipWarning = new Date(client.vencimientoAFIP) < new Date();

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Container */}
            <Card
                className="relative w-full max-w-6xl h-[85vh] bg-white dark:bg-[#052940] shadow-2xl overflow-hidden rounded-2xl flex flex-col border border-primary/10"
                padding="none"
            >
                {/* Header Section */}
                <div className="p-8 pb-6 bg-primary/5 dark:bg-primary/10 flex items-center justify-between border-b border-primary/10">
                    <div className="flex items-center gap-6">
                        {/* Avatar */}
                        <div className="w-20 h-20 rounded-2xl bg-primary dark:bg-[#DBF227] flex items-center justify-center text-2xl font-black text-white dark:text-[#052940] shadow-lg">
                            {initials}
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-3xl font-black text-foreground tracking-tight">
                                {client.razonSocial}
                            </h2>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
                                <span className="flex items-center gap-1.5">
                                    <CreditCard className="w-4 h-4 text-primary dark:text-[#DBF227]" />
                                    {client.cuit}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Tag className="w-4 h-4 text-primary dark:text-[#DBF227]" />
                                    {client.rubro}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 text-primary dark:text-[#DBF227]" />
                                    {client.localidad}, {client.provincia}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            className="h-12 px-6 gap-2 rounded-2xl font-bold bg-white dark:bg-transparent dark:border-[#DBF227] dark:text-[#DBF227] dark:hover:bg-[#DBF227]/10"
                        >
                            <Edit2 className="w-4 h-4" />
                            Editar Cliente
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="h-12 w-12 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 text-muted-foreground hover:text-red-500"
                        >
                            <X className="w-6 h-6" />
                        </Button>
                    </div>
                </div>

                {/* Dashboard KPI Bento Cards Row */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-4 bg-muted/30">
                    {/* Status Card */}
                    <Card className="p-5 flex flex-col justify-between border-primary/10 bg-white dark:bg-surface-bg/50 shadow-sm">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Estado del Cliente</span>
                        <div className="flex items-center gap-2">
                            <div className={cn(
                                "w-2.5 h-2.5 rounded-full",
                                client.estado === "Activo" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" :
                                    client.estado === "Inactivo" ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                            )} />
                            <span className="text-lg font-black text-foreground">{client.estado}</span>
                        </div>
                    </Card>

                    {/* Balance Card */}
                    <Card className="p-5 flex flex-col justify-between border-primary/10 bg-white dark:bg-surface-bg/50 shadow-sm">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Saldo Cta Cte</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-primary dark:text-[#DBF227]">
                                ${client.saldoDeuda.toLocaleString('es-AR')}
                            </span>
                        </div>
                    </Card>

                    {/* Last Purchase Card */}
                    <Card className="p-5 flex flex-col justify-between border-primary/10 bg-white dark:bg-surface-bg/50 shadow-sm">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Última Compra</span>
                        <div className="flex flex-col">
                            <span className="text-lg font-black text-foreground">{client.fechaUltimaCompra}</span>
                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wide">Mostrador / Canal Directo</span>
                        </div>
                    </Card>

                    {/* AFIP Expiry Card */}
                    <Card className={cn(
                        "p-5 flex flex-col justify-between border-primary/10 bg-white dark:bg-surface-bg/50 shadow-sm",
                        isAfipWarning && "border-red-500/50 bg-red-50/30 dark:bg-red-900/10"
                    )}>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Vencimiento AFIP</span>
                        <div className="flex items-center gap-2">
                            {isAfipWarning && <AlertCircle className="w-5 h-5 text-red-500" />}
                            <span className={cn(
                                "text-lg font-black text-foreground",
                                isAfipWarning && "text-red-500"
                            )}>{client.vencimientoAFIP}</span>
                        </div>
                    </Card>
                </div>

                {/* Tabs Navigation */}
                <div className="px-8 border-b border-primary/10 flex items-center gap-8 bg-white dark:bg-[#052940]">
                    {["Identificación", "Comercial", "Domicilios", "Gestiones"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as TabType)}
                            className={cn(
                                "py-4 text-xs font-bold uppercase tracking-widest relative transition-all",
                                activeTab === tab
                                    ? "text-primary dark:text-[#DBF227]"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary dark:bg-[#DBF227] rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content Area */}
                <div className="flex-1 p-[42px] overflow-y-auto custom-scrollbar bg-white dark:bg-[#052940]">
                    {activeTab === "Identificación" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
                            <div className="space-y-6">
                                <SectionTitle icon={Building} title="Datos Fiscales" />
                                <DataField label="Razón Social" value={client.razonSocial} />
                                <DataField label="Nombre Fantasía" value={client.nombreFantasia} />
                                <DataField label="CUIT" value={client.cuit} />
                                <DataField label="Condición IVA" value={client.condicionIVA} />
                            </div>
                            <div className="space-y-6">
                                <SectionTitle icon={ShieldCheck} title="Impuestos" />
                                <DataField label="Ingresos Brutos" value={client.iibb} />
                                <DataField label="Tipo Contribuyente IIBB" value={client.tipoContribuyenteIIBB} />
                                <DataField label="Vencimiento IIBB" value={client.vencimientoIIBB} />
                            </div>
                            <div className="space-y-6">
                                <SectionTitle icon={Clock} title="Sistema" />
                                <DataField label="Fecha Alta" value={client.fechaAlta} />
                                <DataField label="Rubro" value={client.rubro} />
                                <DataField label="Sub-Rubro" value={client.subRubro} />
                            </div>
                        </div>
                    )}

                    {activeTab === "Comercial" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
                            <div className="space-y-6">
                                <SectionTitle icon={DollarSign} title="Condiciones de Venta" />
                                <DataField label="Condición de Pago" value={client.condicionVenta} />
                                <DataField label="Lista de Precios" value={client.listaPrecios} />
                                <DataField label="Bonificaciones" value={client.bonificaciones} />
                            </div>
                            <div className="space-y-6">
                                <SectionTitle icon={User} title="Asignación" />
                                <DataField label="Vendedor Responsable" value={client.vendedorAsignado} />
                                <DataField label="Límite de Crédito" value={`$${client.margenCredito.toLocaleString('es-AR')}`} />
                            </div>
                            <div className="space-y-6">
                                <SectionTitle icon={DollarSign} title="Situación Crediticia" />
                                <DataField label="Deuda Actual" value={`$${client.saldoDeuda.toLocaleString('es-AR')}`} />
                                <div className="p-4 bg-muted/50 rounded-xl border border-primary/5">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Observación Interna</p>
                                    <p className="text-sm font-medium text-foreground italic">"{client.observaciones}"</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "Domicilios" && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            <div className="flex items-center justify-between">
                                <SectionTitle icon={MapPin} title="Gestión de Domicilios" mb="mb-0" />
                                <Button className="rounded-2xl gap-2 font-bold px-6 py-2.5">
                                    <Plus className="w-5 h-5" />
                                    Nuevo Domicilio
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Current Main Address */}
                                <Card className="p-6 bg-white dark:bg-surface-bg/30 border-primary/10 shadow-sm rounded-2xl flex flex-col gap-4 group hover:border-primary/30 transition-all">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-primary/10 rounded-xl">
                                                <MapPin className="w-5 h-5 text-primary dark:text-[#DBF227]" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-foreground">{client.domicilio}</p>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Casa Central</p>
                                            </div>
                                        </div>
                                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                            <Check className="w-3 h-3" />
                                            Activo
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 border-t border-primary/5 pt-4">
                                        <div>
                                            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Localidad</p>
                                            <p className="text-xs font-bold text-foreground">{client.localidad}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">C.P.</p>
                                            <p className="text-xs font-bold text-foreground">{client.cp}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Provincia</p>
                                            <p className="text-xs font-bold text-foreground">{client.provincia}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary dark:text-[#DBF227] rounded-lg text-[10px] font-black uppercase tracking-widest">
                                            <Truck className="w-3.5 h-3.5" />
                                            Domicilio de Entrega
                                        </div>
                                    </div>
                                </Card>

                                {/* Additional Address Placeholder */}
                                <Card className="p-6 bg-muted/10 border-dashed border-primary/20 rounded-2xl flex items-center justify-center group hover:bg-muted/20 hover:border-primary/40 transition-all cursor-pointer">
                                    <div className="flex flex-col items-center gap-3 text-muted-foreground group-hover:text-primary transition-colors">
                                        <div className="p-3 bg-muted/40 rounded-full">
                                            <Plus className="w-6 h-6" />
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em]">Asociar nueva dirección</p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )}

                    {activeTab === "Gestiones" && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            <div className="flex items-center justify-between">
                                <SectionTitle icon={History} title="Registro de Gestiones" mb="mb-0" />
                                <Button className="rounded-2xl gap-2 font-bold px-6 py-2.5">
                                    <Plus className="w-5 h-5" />
                                    Añadir Gestión
                                </Button>
                            </div>

                            <div className="border border-primary/10 rounded-2xl overflow-hidden bg-white dark:bg-surface-bg/10">
                                <table className="w-full text-left">
                                    <thead className="bg-primary/5 border-b border-primary/10">
                                        <tr>
                                            <th className="px-8 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Vendedor</th>
                                            <th className="px-8 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Interacción</th>
                                            <th className="px-8 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">Fecha</th>
                                            <th className="px-8 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-primary/5">
                                        {GESTIONES.filter(g => g.cliente === client.razonSocial).map((gestion) => (
                                            <tr key={gestion.id} className="h-16 hover:bg-muted/30 transition-all group">
                                                <td className="px-8">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary">
                                                            {gestion.vendedor[0]}
                                                        </div>
                                                        <span className="text-sm font-bold text-foreground italic tracking-tightest">{gestion.vendedor}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-foreground">{gestion.tipo}</span>
                                                        <span className="text-[10px] text-muted-foreground font-medium truncate max-w-[300px]">{gestion.observaciones}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 text-center">
                                                    <span className="text-[11px] font-bold text-foreground">{new Date(gestion.fecha).toLocaleDateString('es-AR')}</span>
                                                </td>
                                                <td className="px-8 text-right">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                                        Procesada
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}

function SectionTitle({ icon: Icon, title, mb = "mb-6" }: { icon: any, title: string, mb?: string }) {
    return (
        <div className={cn("flex items-center gap-2", mb)}>
            <div className="p-2 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon className="w-4 h-4 text-primary dark:text-[#DBF227] opacity-100" />
            </div>
            <h4 className="text-xs font-black text-foreground uppercase tracking-[0.2em] opacity-100">{title}</h4>
        </div>
    );
}

function DataField({ label, value }: { label: string, value: string }) {
    return (
        <div className="space-y-1">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{label}</p>
            <p className="text-base font-bold text-foreground">{value || "—"}</p>
        </div>
    );
}
