"use client";

import { useState, useMemo } from 'react';
import {
    Plus,
    FileText,
    ChevronDown,
    Search,
    Filter,
    MoreVertical,
    Mail,
    Phone,
    X,
    Eye,
    Edit,
    Trash2,
    Settings
} from 'lucide-react';
import Link from 'next/link';

import { PageHeader } from '@/components/page-header';
import { ClientStatus } from '@/types/client';

// Mock Data expanded to match the new model
const clientsData = [
    { id: '1', razonSocial: 'Empresa A S.A.', cuit: '30-11223344-5', rubro: 'Industrial', contact: 'Juan Pérez', email: 'juan@empresa-a.com', phone: '+54 9 11 1234-5678', location: 'Buenos Aires', status: 'Activo' as ClientStatus, amount: '125.000', lastActivity: 'Hace 2 horas', vendedor: 'Carlos Vendedor' },
    { id: '2', razonSocial: 'Tech Solutions', cuit: '30-55667788-9', rubro: 'Tecnología', contact: 'María García', email: 'maria@tech.com', phone: '+54 9 11 8765-4321', location: 'Córdoba', status: 'Suspendido' as ClientStatus, amount: '84.000', lastActivity: 'Hace 5 min', vendedor: 'Ana Ventas' },
    { id: '3', razonSocial: 'Retail Group', cuit: '33-99887766-1', rubro: 'Retail', contact: 'Carlos López', email: 'carlos@retail.com', phone: '+54 9 11 1111-2222', location: 'Rosario', status: 'Inactivo' as ClientStatus, amount: '12.500', lastActivity: '02/01/2026', vendedor: 'Carlos Vendedor' },
    { id: '4', razonSocial: 'Consulting Svc', cuit: '30-22334455-6', rubro: 'Servicios', contact: 'Ana Martínez', email: 'ana@consulting.com', phone: '+54 9 11 3333-4444', location: 'Mendoza', status: 'Activo' as ClientStatus, amount: '230.000', lastActivity: 'Ayer', vendedor: 'Ana Ventas' },
    { id: '5', razonSocial: 'Global Logistics', cuit: '33-44556677-8', rubro: 'Logística', contact: 'Roberto Díaz', email: 'roberto@global.com', phone: '+54 9 11 5555-6666', location: 'Buenos Aires', status: 'Activo' as ClientStatus, amount: '98.000', lastActivity: 'Hace 1 día', vendedor: 'Carlos Vendedor' },
];

export default function ClientsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRubro, setFilterRubro] = useState('Todos');
    const [filterVendedor, setFilterVendedor] = useState('Todos');
    const [filterStatus, setFilterStatus] = useState('Todos');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [openActionId, setOpenActionId] = useState<string | null>(null);

    const filteredClients = useMemo(() => {
        return clientsData.filter(client => {
            const matchesSearch =
                client.razonSocial.toLowerCase().includes(searchQuery.toLowerCase()) ||
                client.cuit.includes(searchQuery);

            const matchesRubro = filterRubro === 'Todos' || client.rubro === filterRubro;
            const matchesVendedor = filterVendedor === 'Todos' || client.vendedor === filterVendedor;
            const matchesStatus = filterStatus === 'Todos' || client.status === filterStatus;

            return matchesSearch && matchesRubro && matchesVendedor && matchesStatus;
        });
    }, [searchQuery, filterRubro, filterVendedor, filterStatus]);

    const rubros = ['Todos', 'Industrial', 'Tecnología', 'Retail', 'Servicios', 'Logística'];
    const vendedores = ['Todos', 'Carlos Vendedor', 'Ana Ventas'];
    const estados = ['Todos', 'Activo', 'Inactivo', 'Suspendido'];

    return (
        <div className="space-y-8 font-sans">
            <PageHeader
                title="Clientes"
                description="Listado y gestión operativa de su cartera comercial."
                actions={
                    <>
                        <Link
                            href="/clients/config"
                            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary/10 text-primary font-bold text-base hover:bg-primary/20 transition-all shadow-sm"
                        >
                            <Settings size={20} />
                            Configurar
                        </Link>
                        <button
                            className="flex items-center gap-2 px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-base hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                        >
                            <Plus size={20} />
                            Crear cliente
                        </button>
                    </>
                }
            />

            <div className="rounded-3xl bg-card ring-1 ring-border overflow-hidden shadow-sm">
                <div className="p-6 border-b border-border flex flex-col gap-6 bg-background/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold font-heading">Listado de Clientes</h2>
                            <p className="text-xs text-muted-foreground mt-0.5">Gestione su base de datos de forma centralizada.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                                <input
                                    type="text"
                                    placeholder="Razón Social o CUIT..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2.5 rounded-xl bg-primary/5 border-none outline-none focus:ring-1 focus:ring-primary/20 w-64 text-sm transition-all text-foreground"
                                />
                            </div>
                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold transition-all ${filterRubro !== 'Todos' || filterVendedor !== 'Todos' || filterStatus !== 'Todos' ? 'bg-primary text-primary-foreground border-primary hover:opacity-90' : 'bg-primary/10 border-transparent text-primary hover:bg-primary/20'}`}
                            >
                                <Filter size={14} /> Filtros {(filterRubro !== 'Todos' || filterVendedor !== 'Todos' || filterStatus !== 'Todos') && "•"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filters Modal */}
                {isFilterOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 p-4">
                        <div className="bg-card w-full max-w-md rounded-3xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
                            <div className="p-6 border-b border-border flex items-center justify-between bg-background/50">
                                <div>
                                    <h3 className="text-lg font-bold font-heading">Filtros Avanzados</h3>
                                    <p className="text-xs text-muted-foreground mt-0.5">Refine el listado de clientes.</p>
                                </div>
                                <button onClick={() => setIsFilterOpen(false)} className="p-2 rounded-xl hover:bg-secondary transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-widest pl-1">Rubro</label>
                                    <div className="relative">
                                        <select
                                            className="w-full px-4 py-3 bg-primary/5 border-none rounded-xl text-sm font-bold text-foreground outline-none focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer appearance-none"
                                            value={filterRubro}
                                            onChange={(e) => setFilterRubro(e.target.value)}
                                        >
                                            {rubros.map(r => <option key={r} value={r}>{r}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" size={16} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-widest pl-1">Vendedor</label>
                                    <div className="relative">
                                        <select
                                            className="w-full px-4 py-3 bg-primary/5 border-none rounded-xl text-sm font-bold text-foreground outline-none focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer appearance-none"
                                            value={filterVendedor}
                                            onChange={(e) => setFilterVendedor(e.target.value)}
                                        >
                                            {vendedores.map(v => <option key={v} value={v}>{v}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" size={16} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-widest pl-1">Estado</label>
                                    <div className="relative">
                                        <select
                                            className="w-full px-4 py-3 bg-primary/5 border-none rounded-xl text-sm font-bold text-foreground outline-none focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer appearance-none"
                                            value={filterStatus}
                                            onChange={(e) => setFilterStatus(e.target.value)}
                                        >
                                            {estados.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" size={16} />
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-border flex items-center gap-3">
                                <button
                                    onClick={() => {
                                        setFilterRubro('Todos');
                                        setFilterVendedor('Todos');
                                        setFilterStatus('Todos');
                                    }}
                                    className="flex-1 px-4 py-3 rounded-xl bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-all font-heading uppercase tracking-widest"
                                >
                                    Limpiar
                                </button>
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="flex-1 px-4 py-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 font-heading uppercase tracking-widest"
                                >
                                    Aplicar Filtros
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Advanced Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse font-sans">
                        <thead>
                            <tr className="bg-primary/5 border-b border-border/50">
                                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">CUIT</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Rubro</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Vendedor</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Última Actividad</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-right">Saldo</th>
                                <th className="px-6 py-4 text-center"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {filteredClients.map((client) => (
                                <tr key={client.id} className="group hover:bg-secondary/20 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 bg-sutil text-primary rounded-xl flex items-center justify-center font-bold text-xs ring-1 ring-border/5">
                                                {client.razonSocial.slice(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <Link href={`/clients/${client.id}`} className="font-bold text-sm hover:text-primary transition-colors text-foreground">
                                                    {client.razonSocial}
                                                </Link>
                                                <p className="text-[10px] text-muted-foreground">{client.location}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-bold text-foreground">{client.cuit}</td>
                                    <td className="px-6 py-4 text-xs font-bold text-foreground">{client.rubro}</td>
                                    <td className="px-6 py-4 text-xs font-medium text-foreground">{client.vendedor}</td>
                                    <td className="px-6 py-4 text-xs font-medium text-foreground">{client.lastActivity}</td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${client.status === 'Activo' ? 'bg-green-500/10 border-green-500/20 text-green-700' :
                                            client.status === 'Suspendido' ? 'bg-red-500/10 border-red-500/20 text-red-700' :
                                                'bg-gray-100 border-gray-200 text-gray-600'
                                            }`}>
                                            {client.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-sm font-bold text-foreground">ARS ${client.amount}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center relative text-foreground">
                                        <button
                                            onClick={() => setOpenActionId(openActionId === client.id ? null : client.id)}
                                            className="p-1.5 hover:bg-secondary rounded-lg transition-all"
                                        >
                                            <MoreVertical size={16} />
                                        </button>
                                        {openActionId === client.id && (
                                            <>
                                                <div className="fixed inset-0 z-10" onClick={() => setOpenActionId(null)} />
                                                <div className="absolute right-8 top-10 z-20 w-40 bg-card border border-border rounded-xl shadow-xl p-1 animate-in fade-in zoom-in-95 duration-100 flex flex-col items-stretch text-left">
                                                    <Link href={`/clients/${client.id}`} className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-all">
                                                        <Eye size={14} /> Ver Cliente
                                                    </Link>
                                                    <button className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-all text-left w-full">
                                                        <Edit size={14} /> Editar
                                                    </button>
                                                    <button className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-all text-left w-full">
                                                        <Plus size={14} /> Añadir Gestión
                                                    </button>
                                                    <div className="h-px bg-border/50 my-1" />
                                                    <button className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-all text-left w-full">
                                                        <Trash2 size={14} /> Eliminar
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
