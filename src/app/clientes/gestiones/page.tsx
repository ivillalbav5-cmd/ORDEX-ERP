"use client";

import React, { useState, useEffect } from "react";
import { ClientsHeader } from "@/components/clients/ClientsHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import { Card } from "@/components/ui/Card";
import { GESTIONES, Gestion, CLIENTS } from "@/constants/clients";
import {
    Search,
    Filter,
    Clock,
    ChevronLeft,
    ChevronRight,
    Plus,
    X,
    Phone,
    Mail,
    MapPin,
    User,
    Building,
    MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

// Status badge colors
const statusColors: Record<string, { bg: string; text: string }> = {
    "Pendiente": { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-300" },
    "En Proceso": { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-300" },
    "Urgente": { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-300" },
    "Completada": { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-300" },
    "Sin Éxito": { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-600 dark:text-gray-400" }
};

// Map tipo to estado
const tipoToEstado: Record<string, string> = {
    "Llamada": "En Proceso",
    "Visita": "Completada",
    "Email": "Pendiente",
    "Creación de Cuenta": "Completada"
};

// Get initials from name
function getInitials(name: string): string {
    return name.split(" ").slice(0, 2).map(word => word[0]).join("").toUpperCase();
}

// Format date
function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleDateString('es-AR', { month: 'short' }).replace('.', '');
    return `${day} ${month.charAt(0).toUpperCase() + month.slice(1)}`;
}

function formatTime(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) + ' hs';
}

export default function GestionesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedGestion, setSelectedGestion] = useState<Gestion | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const itemsPerPage = 8;

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const filteredGestiones = GESTIONES.filter(g => {
        const matchesSearch = g.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
            g.vendedor.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    }).sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

    const totalPages = Math.ceil(filteredGestiones.length / itemsPerPage);
    const paginatedGestiones = filteredGestiones.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleRowClick = (gestion: Gestion) => {
        setSelectedGestion(gestion);
        setIsSheetOpen(true);
    };

    const closeSheet = () => {
        setIsSheetOpen(false);
        setTimeout(() => setSelectedGestion(null), 300);
    };

    // Get client data for selected gestion
    const selectedClient = selectedGestion
        ? CLIENTS.find(c => c.razonSocial === selectedGestion.cliente)
        : null;

    return (
        <main className="h-[calc(100vh-64px)] flex flex-col p-[42px] animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
            {isLoading ? (
                <div className="flex items-center justify-between h-[58px]">
                    <div className="flex gap-6 h-full">
                        {[1, 2, 3, 4].map(i => <Skeleton key={i} className="w-24 h-4 my-auto" />)}
                    </div>
                    <div className="flex gap-3 h-full">
                        <Skeleton className="w-40 h-[58px] rounded-2xl" />
                        <Skeleton className="w-40 h-[58px] rounded-2xl" />
                    </div>
                </div>
            ) : (
                <ClientsHeader />
            )}

            {/* Main Content Card */}
            <Card className="flex-1 flex flex-col overflow-hidden mt-6" padding="none">
                {/* Internal Header */}
                <div className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-surface border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-primary/10 rounded-xl">
                            <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-foreground">Historial de Gestiones</h3>
                            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">{filteredGestiones.length} registros</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Smart Search */}
                        <div className="relative w-64 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                placeholder="Buscar por nombre, CUIT..."
                                className="w-full h-10 pl-11 pr-4 bg-muted border border-primary/10 rounded-xl text-sm font-medium text-foreground placeholder:text-muted-foreground focus:bg-surface focus:border-primary/20 focus:outline-none transition-all"
                            />
                        </div>

                        {/* Filter Button */}
                        <Button variant="outline" size="default" className="gap-2">
                            <Filter className="w-4 h-4" />
                            Filtrar
                        </Button>

                        {/* CTA */}
                        <Button variant="default" className="gap-2 h-10">
                            <Plus className="w-4 h-4" />
                            Nueva Gestión
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-auto custom-scrollbar">
                    <table className="w-full text-left">
                        <thead className="sticky top-0 z-10 bg-muted">
                            <tr>
                                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Vendedor</th>
                                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Cliente</th>
                                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Fecha y Hora</th>
                                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Tipo</th>
                                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border bg-surface">
                            {isLoading ? (
                                Array.from({ length: 8 }).map((_, i) => (
                                    <tr key={i} className="h-[64px]">
                                        <td className="px-6 py-3">
                                            <div className="flex items-center gap-3">
                                                <Skeleton className="w-9 h-9 rounded-full" />
                                                <Skeleton className="w-32 h-4" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="flex flex-col gap-1">
                                                <Skeleton className="w-40 h-4" />
                                                <Skeleton className="w-20 h-3" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-3"><Skeleton className="w-28 h-4" /></td>
                                        <td className="px-6 py-3"><Skeleton className="w-24 h-4" /></td>
                                        <td className="px-6 py-3"><Skeleton className="w-20 h-6 rounded-full" /></td>
                                    </tr>
                                ))
                            ) : (
                                paginatedGestiones.map((gestion) => {
                                    const estado = tipoToEstado[gestion.tipo];
                                    const colors = statusColors[estado];

                                    return (
                                        <tr
                                            key={gestion.id}
                                            className="group h-[64px] hover:bg-muted/50 transition-all cursor-pointer border-b border-border/50"
                                            onClick={() => handleRowClick(gestion)}
                                        >
                                            <td className="px-6 py-3 italic tracking-tightest">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                                        {getInitials(gestion.vendedor)}
                                                    </div>
                                                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{gestion.vendedor}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-foreground tracking-tight">{gestion.cliente}</span>
                                                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">AFIP Activa</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-semibold text-foreground">{formatDate(gestion.fecha)}</span>
                                                    <span className="text-[10px] text-muted-foreground font-medium">{formatTime(gestion.fecha)}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <span className="text-xs font-medium text-muted-foreground">{gestion.tipo}</span>
                                            </td>
                                            <td className="px-6 py-3">
                                                <span className={cn(
                                                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                                    colors.bg,
                                                    colors.text
                                                )}>
                                                    {estado}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="px-6 py-4 flex items-center justify-between bg-muted border-t border-border">
                    <p className="text-xs font-medium text-muted-foreground">
                        Mostrando <span className="text-foreground font-semibold">{paginatedGestiones.length}</span> de <span className="text-foreground font-semibold">{filteredGestiones.length}</span> registros
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="h-8 w-8"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={cn(
                                    "w-8 h-8 rounded-lg text-xs font-semibold transition-all",
                                    currentPage === page
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted"
                                )}
                            >
                                {page}
                            </button>
                        ))}
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="h-8 w-8"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Side Sheet */}
            <>
                {/* Backdrop */}
                <div
                    className={cn(
                        "fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] transition-opacity duration-300",
                        isSheetOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}
                    onClick={closeSheet}
                />

                {/* Panel */}
                <aside
                    className={cn(
                        "fixed right-0 top-0 h-full w-full max-w-md bg-surface border-l border-border shadow-2xl z-[70] transform transition-transform duration-500 ease-out flex flex-col",
                        isSheetOpen ? "translate-x-0" : "translate-x-full"
                    )}
                >
                    {selectedGestion && (
                        <>
                            {/* Header */}
                            <div className="p-6 border-b border-border flex items-center justify-between bg-muted">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                                        {getInitials(selectedGestion.vendedor)}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">Detalle de Gestión</h3>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{selectedGestion.id}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={closeSheet} className="rounded-full">
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-6">
                                {/* Gestión Info */}
                                <section className="space-y-4">
                                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide border-l-2 border-primary pl-3">Información de la Gestión</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-muted rounded-xl space-y-1">
                                            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Vendedor</p>
                                            <p className="text-sm font-semibold text-foreground">{selectedGestion.vendedor}</p>
                                        </div>
                                        <div className="p-4 bg-muted rounded-xl space-y-1">
                                            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Tipo</p>
                                            <p className="text-sm font-semibold text-foreground">{selectedGestion.tipo}</p>
                                        </div>
                                        <div className="p-4 bg-muted rounded-xl space-y-1">
                                            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Fecha</p>
                                            <p className="text-sm font-semibold text-foreground">{formatDate(selectedGestion.fecha)}</p>
                                        </div>
                                        <div className="p-4 bg-muted rounded-xl space-y-1">
                                            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Hora</p>
                                            <p className="text-sm font-semibold text-foreground">{formatTime(selectedGestion.fecha)}</p>
                                        </div>
                                    </div>
                                </section>

                                {/* Observaciones */}
                                <section className="space-y-4">
                                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide border-l-2 border-primary pl-3">Observaciones</h4>
                                    <div className="p-4 rounded-xl bg-muted border border-border">
                                        <div className="flex items-start gap-3">
                                            <MessageSquare className="w-5 h-5 text-primary mt-0.5" />
                                            <p className="text-sm text-foreground leading-relaxed">{selectedGestion.observaciones}</p>
                                        </div>
                                    </div>
                                </section>

                                {/* Cliente Info */}
                                {selectedClient && (
                                    <section className="space-y-4">
                                        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide border-l-2 border-accent pl-3">Ficha del Cliente</h4>
                                        <div className="p-4 bg-muted rounded-xl space-y-3">
                                            <div className="flex items-center gap-3">
                                                <Building className="w-4 h-4 text-primary" />
                                                <span className="text-sm font-semibold text-foreground">{selectedClient.razonSocial}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <User className="w-4 h-4 text-primary" />
                                                <span className="text-sm text-foreground">{selectedClient.responsable}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Phone className="w-4 h-4 text-primary" />
                                                <span className="text-sm text-foreground">{selectedClient.telefono}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Mail className="w-4 h-4 text-primary" />
                                                <span className="text-sm text-foreground">{selectedClient.email}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <MapPin className="w-4 h-4 text-primary" />
                                                <span className="text-sm text-foreground">{selectedClient.localidad}, {selectedClient.provincia}</span>
                                            </div>
                                        </div>
                                    </section>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-border bg-muted">
                                <Button variant="default" className="w-full gap-2">
                                    Ver Ficha Completa del Cliente
                                </Button>
                            </div>
                        </>
                    )}
                </aside>
            </>
        </main>
    );
}
