"use client";

import React, { useState, useEffect } from "react";
import { ClientsHeader } from "@/components/clients/ClientsHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AdvancedFilterModal } from "@/components/clients/AdvancedFilterModal";
import {
    Search,
    Filter,
    MoreVertical,
    Download,
    Eye,
    Edit,
    MessageSquare,
    ShieldAlert,
    FileText,
    FileSpreadsheet,
    Calendar as CalendarIcon
} from "lucide-react";
import { CLIENTS, Client } from "@/constants/clients";
import { cn } from "@/lib/utils";
import { ClientSideSheet } from "@/components/clients/ClientSideSheet";
import { ClientViewModal } from "@/components/clients/ClientViewModal";
import { Skeleton } from "@/components/ui/Skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Action Menu using DropdownMenu
function RowActionMenu({ client, onView }: { client: Client; onView: () => void }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuItem onClick={onView}>
                    <Eye className="mr-2 h-4 w-4 text-primary" />
                    Ver Ficha
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4 text-blue-500" />
                    Editar
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4 text-green-500" />
                    Gestión
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-600">
                    <ShieldAlert className="mr-2 h-4 w-4" />
                    Suspender
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

// Export Menu using DropdownMenu
function ExportMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="default" className="gap-2">
                    <Download className="w-4 h-4" />
                    Exportar
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuLabel>Formatos Disponibles</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4 text-red-500" />
                    Descargar PDF
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
                    Descargar Excel
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

// Get initials from client name
function getInitials(name: string): string {
    return name.split(" ").slice(0, 2).map(word => word[0]).join("").toUpperCase();
}

// Status Badge Variant Mapping
const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
        case "Activo": return "default"; // Greenish usually mapped to default or specific class
        case "Inactivo": return "secondary";
        case "Suspendido": return "destructive";
        default: return "outline";
    }
};

const getStatusColorClass = (status: string) => {
    switch (status) {
        case 'Activo': return "bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20";
        case 'Inactivo': return "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 border-orange-500/20";
        case 'Suspendido': return "bg-red-500/10 text-red-600 hover:bg-red-500/20 border-red-500/20";
        default: return "";
    }
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

    const handlePageChange = (page: number, e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentPage(page);
    };

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
                            <Input
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                placeholder="Buscar por nombre, CUIT..."
                                className="w-full h-10 pl-11 pr-4 bg-muted border-primary/10 text-sm font-medium focus:bg-surface"
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
                    <Table>
                        <TableHeader className="sticky top-0 z-10 bg-muted">
                            <TableRow>
                                <TableHead className="w-[300px]">Cliente</TableHead>
                                <TableHead>CUIT / IVA</TableHead>
                                <TableHead>Localidad</TableHead>
                                <TableHead>Vendedor</TableHead>
                                <TableHead>Ult. Compra</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                Array.from({ length: 8 }).map((_, i) => (
                                    <TableRow key={i} className="h-[64px]">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Skeleton className="w-9 h-9 rounded-full" />
                                                <div className="space-y-2">
                                                    <Skeleton className="w-16 h-3" />
                                                    <Skeleton className="w-32 h-4" />
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell><Skeleton className="w-24 h-4" /></TableCell>
                                        <TableCell><Skeleton className="w-20 h-4" /></TableCell>
                                        <TableCell><Skeleton className="w-28 h-4" /></TableCell>
                                        <TableCell><Skeleton className="w-20 h-4" /></TableCell>
                                        <TableCell><Skeleton className="w-16 h-6 rounded-full" /></TableCell>
                                        <TableCell><Skeleton className="w-8 h-8 rounded-full" /></TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                paginatedClients.map((client) => (
                                    <TableRow
                                        key={client.id}
                                        className="group cursor-pointer hover:bg-muted/50"
                                        onClick={() => handleOpenModal(client)}
                                    >
                                        {/* Avatar + Name */}
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                                                        {getInitials(client.razonSocial)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-xs text-muted-foreground">{client.id}</span>
                                                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{client.razonSocial}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-sm text-foreground">{client.cuit}</span>
                                                <span className="text-xs text-muted-foreground">{client.condicionIVA}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {client.localidad}, {client.provincia}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {client.vendedorAsignado}
                                        </TableCell>
                                        <TableCell>
                                            {client.fechaUltimaCompra}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={cn("font-medium", getStatusColorClass(client.estado))}>
                                                {client.estado}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div onClick={(e) => e.stopPropagation()}>
                                                <RowActionMenu client={client} onView={() => handleOpenModal(client)} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    {paginatedClients.length === 0 && (
                        <div className="h-64 flex flex-col items-center justify-center gap-3 bg-surface">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                                <Search className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground">Sin coincidencias para esta búsqueda</p>
                        </div>
                    )}
                </div>

                {/* Pagination Footer */}
                <div className="px-6 py-4 flex items-center justify-between bg-muted border-t border-border">
                    <p className="text-xs text-muted-foreground">
                        Mostrando <span className="font-medium text-foreground">{paginatedClients.length}</span> de <span className="font-medium text-foreground">{filteredClients.length}</span> registros
                    </p>

                    <Pagination className="w-auto mx-0">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); if (currentPage > 1) setCurrentPage(p => p - 1); }}
                                    className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
                                />
                            </PaginationItem>

                            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        href="#"
                                        isActive={currentPage === i + 1}
                                        onClick={(e) => handlePageChange(i + 1, e)}
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) setCurrentPage(p => p + 1); }}
                                    className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
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
