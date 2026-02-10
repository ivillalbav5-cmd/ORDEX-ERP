"use client";

import React from "react";
import { X, User, Phone, Mail, MapPin, CreditCard, ShoppingBag, ExternalLink, ShieldAlert, Edit, Eye, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { Client } from "@/constants/clients";

interface ClientSideSheetProps {
    client: Client | null;
    isOpen: boolean;
    onClose: () => void;
}

// Get initials from client name
function getInitials(name: string): string {
    return name.split(" ").slice(0, 2).map(word => word[0]).join("").toUpperCase();
}

export function ClientSideSheet({ client, isOpen, onClose }: ClientSideSheetProps) {
    if (!client) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Panel */}
            <aside
                className={cn(
                    "fixed right-0 top-0 h-full w-full max-w-md bg-surface border-l border-border shadow-2xl z-[70] transform transition-transform duration-500 ease-out flex flex-col",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header */}
                <div className="p-6 border-b border-border flex items-center justify-between bg-muted">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                            {getInitials(client.razonSocial)}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">{client.razonSocial}</h3>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{client.id}</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-6">
                    {/* Status Banner */}
                    <div className={cn(
                        "flex items-center gap-3 p-4 rounded-xl",
                        client.estado === "Activo" && "bg-green-500/10 border border-green-500/20",
                        client.estado === "Inactivo" && "bg-orange-500/10 border border-orange-500/20",
                        client.estado === "Suspendido" && "bg-red-500/10 border border-red-500/20"
                    )}>
                        <div className={cn(
                            "w-3 h-3 rounded-full animate-pulse",
                            client.estado === "Activo" && "bg-green-500",
                            client.estado === "Inactivo" && "bg-orange-500",
                            client.estado === "Suspendido" && "bg-red-500"
                        )} />
                        <span className={cn(
                            "text-sm font-medium uppercase tracking-wide",
                            client.estado === "Activo" && "text-green-600 dark:text-green-400",
                            client.estado === "Inactivo" && "text-orange-600 dark:text-orange-400",
                            client.estado === "Suspendido" && "text-red-600 dark:text-red-400"
                        )}>
                            Estado: {client.estado}
                        </span>
                    </div>

                    {/* Primary Info */}
                    <section className="space-y-4">
                        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide border-l-2 border-primary pl-3">Información Fiscal</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-muted rounded-xl space-y-1">
                                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">CUIT</p>
                                <p className="text-sm font-semibold text-foreground">{client.cuit}</p>
                            </div>
                            <div className="p-4 bg-muted rounded-xl space-y-1">
                                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Condición IVA</p>
                                <p className="text-sm font-semibold text-foreground">{client.condicionIVA}</p>
                            </div>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section className="space-y-4">
                        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide border-l-2 border-primary pl-3">Contacto</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                                <Phone className="w-4 h-4 text-primary" />
                                <span className="text-sm text-foreground">{client.telefono}</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                                <Mail className="w-4 h-4 text-primary" />
                                <span className="text-sm text-foreground">{client.email}</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span className="text-sm text-foreground">{client.localidad}, {client.provincia}</span>
                            </div>
                        </div>
                    </section>

                    {/* Commercial Info */}
                    <section className="space-y-4">
                        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide border-l-2 border-primary pl-3">Condiciones Comerciales</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 bg-muted rounded-xl space-y-1">
                                <ShoppingBag className="w-4 h-4 text-primary mb-2" />
                                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Vendedor</p>
                                <p className="text-sm font-semibold text-foreground">{client.vendedorAsignado}</p>
                            </div>
                            <div className="p-4 bg-muted rounded-xl space-y-1">
                                <CreditCard className="w-4 h-4 text-primary mb-2" />
                                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Límite Crédito</p>
                                <p className="text-sm font-semibold text-foreground">${client.margenCredito.toLocaleString()}</p>
                            </div>
                        </div>
                    </section>

                    {/* Observations */}
                    {client.observaciones && (
                        <section className="space-y-4">
                            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide border-l-2 border-primary pl-3">Observaciones</h4>
                            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-700 dark:text-amber-300">
                                {client.observaciones}
                            </div>
                        </section>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-border bg-muted space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="gap-2">
                            <Edit className="w-4 h-4" />
                            Editar
                        </Button>
                        <Button variant="default" className="gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Ver Ficha
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Gestión
                        </Button>
                        <Button variant="ghost" className="gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                            <ShieldAlert className="w-4 h-4" />
                            Suspender
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    );
}
