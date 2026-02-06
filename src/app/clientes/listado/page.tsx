"use client";

import React, { useState, useRef, useEffect } from "react";
import { ClientsHeader } from "@/components/clients/ClientsHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AdvancedFilterModal } from "@/components/clients/AdvancedFilterModal";
import {
    Search,
    Filter,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    Download,
    Eye,
    Edit,
    MessageSquare,
    ShieldAlert,
    FileText,
    FileSpreadsheet
} from "lucide-react";
import { CLIENTS, Client } from "@/constants/clients";
import { cn } from "@/lib/utils";
import { ClientSideSheet } from "@/components/clients/ClientSideSheet";
import { ClientViewModal } from "@/components/clients/ClientViewModal";
import { Skeleton } from "@/components/ui/Skeleton";

// Dropdown Menu Component
function RowActionMenu({ client, onView }: { client: Client; onView: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
            >
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </Button>
            {isOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-surface border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                    <button
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                        onClick={(e) => { e.stopPropagation(); onView(); setIsOpen(false); }}
                    >
                        <Eye className="w-4 h-4 text-primary" />
                        Ver Ficha
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                        <Edit className="w-4 h-4 text-blue-500" />
                        Editar
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                        <MessageSquare className="w-4 h-4 text-green-500" />
                        Gestión
                    </button>
                    <div className="border-t border-border" />
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <ShieldAlert className="w-4 h-4" />
                        Suspender
                    </button>
                </div>
            )}
        </div>
    );
}

// Export Dropdown
function ExportMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <Button variant="outline" size="default" className="gap-2" onClick={() => setIsOpen(!isOpen)}>
                <Download className="w-4 h-4" />
                Exportar
            </Button>
            {isOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-surface border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                        <FileText className="w-4 h-4 text-red-500" />
                        Descargar PDF
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                        <FileSpreadsheet className="w-4 h-4 text-green-600" />
                        Descargar Excel
                    </button>
                </div>
            )}
        </div>
    );
}

// Get initials from client name
function getInitials(name: string): string {
    return name.split(" ").slice(0, 2).map(word => word[0]).join("").toUpperCase();
}

export default function ClientsListPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const itemsPerPage = 8;

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const handleOpenModal = (client: Client) => {
        setSelectedClient(client);
        setIsViewModalOpen(true);
    };

    const filteredClients = CLIENTS.filter(client =>
        client.razonSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.cuit.includes(searchTerm)
    );

    const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
    const paginatedClients = filteredClients.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <main className="h-[calc(100vh-64px)] flex flex-col p-[42px] animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
            {/* Module Header - 58px height unified */}
            {isLoading ? (
                <div className="flex items-center justify-between h-[58px]">
                    <div className="flex gap-6 h-full">
                        {[1, 2, 3, 4].map(i => <Skeleton key={i} className="w-20 h-4 my-auto" />)}
                    </div>
                    <div className="flex gap-3 h-full">
                        <Skeleton className="w-40 h-[58px] rounded-2xl" />
                        <Skeleton className="w-40 h-[58px] rounded-2xl" />
                    </div>
                </div>
            ) : (
                <ClientsHeader />
            )}

            {/* Main Content Card - fills viewport */}
            <Card className="flex-1 flex flex-col overflow-hidden mt-6" padding="none">
                {/* Internal Header - Search & Filters */}
                <div className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-surface border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-primary/10 rounded-xl">
                            <Filter className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h4 className="text-base font-semibold text-foreground">Listado de Clientes</h4>
                            <p className="text-xs text-muted-foreground">Gestión comercial centralizada</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative w-full md:w-80 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                placeholder="Buscar por nombre, CUIT..."
                                className="w-full h-10 pl-11 pr-4 bg-muted border border-primary/10 rounded-xl text-sm font-medium text-foreground placeholder:text-muted-foreground focus:bg-surface focus:border-primary/20 focus:outline-none transition-all"
                            />
                        </div>
                        <Button variant="outline" size="default" className="gap-2" onClick={() => setIsFilterOpen(true)}>
                            <Filter className="w-4 h-4" />
                            Filtrar
                        </Button>
                        <ExportMenu />
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-auto custom-scrollbar">
                    <table className="w-full text-left">
                        <thead className="sticky top-0 z-10 bg-muted">
                            <tr>
                                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Cliente</th>
                                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">CUIT / IVA</th>
                                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Localidad</th>
                                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Vendedor</th>
                                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Ult. Compra</th>
                                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Estado</th>
                                <th className="px-6 py-3 w-12"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border bg-surface">
                            {isLoading ? (
                                Array.from({ length: 8 }).map((_, i) => (
                                    <tr key={i} className="h-[64px]">
                                        <td className="px-6 py-3">
                                            <div className="flex items-center gap-3">
                                                <Skeleton className="w-9 h-9 rounded-full" />
                                                <div className="space-y-2">
                                                    <Skeleton className="w-16 h-3" />
                                                    <Skeleton className="w-32 h-4" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3"><Skeleton className="w-24 h-4" /></td>
                                        <td className="px-6 py-3"><Skeleton className="w-20 h-4" /></td>
                                        <td className="px-6 py-3"><Skeleton className="w-28 h-4" /></td>
                                        <td className="px-6 py-3"><Skeleton className="w-20 h-4" /></td>
                                        <td className="px-6 py-3"><Skeleton className="w-16 h-6 rounded-full" /></td>
                                        <td className="px-6 py-3"><Skeleton className="w-8 h-8 rounded-full" /></td>
                                    </tr>
                                ))
                            ) : (
                                paginatedClients.map((client) => (
                                    <tr
                                        key={client.id}
                                        className="group hover:bg-muted/50 transition-all cursor-pointer"
                                        onClick={() => handleOpenModal(client)}
                                    >
                                        {/* Avatar + Name */}
                                        <td className="px-6 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                                    {getInitials(client.razonSocial)}
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-xs text-muted-foreground">{client.id}</span>
                                                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{client.razonSocial}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-sm text-foreground">{client.cuit}</span>
                                                <span className="text-xs text-muted-foreground">{client.condicionIVA}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 text-sm text-muted-foreground">
                                            {client.localidad}, {client.provincia}
                                        </td>
                                        <td className="px-6 py-3 text-sm text-muted-foreground">
                                            {client.vendedorAsignado}
                                        </td>
                                        <td className="px-6 py-3 text-sm text-foreground">
                                            {client.fechaUltimaCompra}
                                        </td>
                                        <td className="px-6 py-3">
                                            <span className={cn(
                                                "inline-flex px-2.5 py-1 rounded-full text-xs font-medium",
                                                client.estado === "Activo" && "bg-green-500/20 text-green-600 dark:text-green-400",
                                                client.estado === "Inactivo" && "bg-orange-500/20 text-orange-600 dark:text-orange-400",
                                                client.estado === "Suspendido" && "bg-red-500/20 text-red-600 dark:text-red-400"
                                            )}>
                                                {client.estado}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <RowActionMenu client={client} onView={() => handleOpenModal(client)} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    {paginatedClients.length === 0 && (
                        <div className="h-64 flex flex-col items-center justify-center gap-3 bg-surface">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                                <Search className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground">Sin coincidencias para esta búsqueda</p>
                        </div>
                    )}
                </div>

                {/* Pagination Footer - bg matches muted */}
                <div className="px-6 py-4 flex items-center justify-between bg-muted">
                    <p className="text-xs text-muted-foreground">
                        Mostrando <span className="font-medium text-foreground">{paginatedClients.length}</span> de <span className="font-medium text-foreground">{filteredClients.length}</span> registros
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => (
                                <Button
                                    key={i}
                                    variant={currentPage === i + 1 ? "primary" : "ghost"}
                                    size="sm"
                                    onClick={() => setCurrentPage(i + 1)}
                                    className="w-8"
                                >
                                    {i + 1}
                                </Button>
                            ))}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </Card>

            <ClientViewModal
                client={selectedClient}
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
            />

            <ClientSideSheet
                client={selectedClient}
                isOpen={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
            />

            <AdvancedFilterModal
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
            />
        </main>
    );
}
