"use client";

import { useState } from 'react';
import {
    Plus,
    FileText,
    ChevronDown,
    Search,
    Filter,
    MoreVertical,
    Mail,
    Phone,
    MapPin,
    X,
    Eye,
    Edit,
    Trash2,
    Calendar,
    Briefcase,
    Building2
} from 'lucide-react';

import { PageHeader } from '@/components/page-header';

// Mock Data
const clientsData = [
    { id: 1, name: 'Empresa A S.A.', cuit: '30-11223344-5', rubro: 'Industrial', contact: 'Juan Pérez', email: 'juan@empresa-a.com', phone: '+54 9 11 1234-5678', location: 'Buenos Aires', status: 'Activo', amount: '125.000', joined: 'Oct 2023', lastActivity: 'Hace 2 horas' },
    { id: 2, name: 'Tech Solutions', cuit: '30-55667788-9', rubro: 'Tecnología', contact: 'María García', email: 'maria@tech.com', phone: '+54 9 11 8765-4321', location: 'Córdoba', status: 'Nuevo', amount: '84.000', joined: 'Dic 2023', lastActivity: 'Hace 5 min' },
    { id: 3, name: 'Retail Group', cuit: '33-99887766-1', rubro: 'Retail', contact: 'Carlos López', email: 'carlos@retail.com', phone: '+54 9 11 1111-2222', location: 'Rosario', status: 'Inactivo', amount: '12.500', joined: 'Ene 2023', lastActivity: '02/01/2026' },
    { id: 4, name: 'Consulting Svc', cuit: '30-22334455-6', rubro: 'Servicios', contact: 'Ana Martínez', email: 'ana@consulting.com', phone: '+54 9 11 3333-4444', location: 'Mendoza', status: 'Activo', amount: '230.000', joined: 'Mar 2023', lastActivity: 'Ayer' },
    { id: 5, name: 'Global Logistics', cuit: '33-44556677-8', rubro: 'Logística', contact: 'Roberto Díaz', email: 'roberto@global.com', phone: '+54 9 11 5555-6666', location: 'Buenos Aires', status: 'Activo', amount: '98.000', joined: 'Nov 2023', lastActivity: 'Hace 1 día' },
    { id: 6, name: 'Innovatech SRL', cuit: '30-66778899-0', rubro: 'Tecnología', contact: 'Laura Sánchez', email: 'laura@innovatech.com', phone: '+54 9 11 7777-8888', location: 'La Plata', status: 'Activo', amount: '65.000', joined: 'Oct 2023', lastActivity: 'Hace 3 horas' },
    { id: 7, name: 'Green Foods', cuit: '30-12345678-9', rubro: 'Alimentos', contact: 'Pedro Ruiz', email: 'pedro@green.com', phone: '+54 9 11 9999-0000', location: 'Salta', status: 'Pendiente', amount: '45.000', joined: 'Dic 2023', lastActivity: 'Hace 1 semana' },
];

const rubroData = [
    { name: 'Tecnología', value: 35, color: '#2c8fd1', revenue: '$ 450k' },
    { name: 'Retail', value: 25, color: '#10B981', revenue: '$ 320k' },
    { name: 'Servicios', value: 25, color: '#F59E0B', revenue: '$ 280k' },
    { name: 'Industrial', value: 15, color: '#6366F1', revenue: '$ 180k' },
];

const rankingData = [
    { name: 'Consulting Svc', category: 'Servicios', amount: 230000, growth: '+12%' },
    { name: 'Empresa A S.A.', category: 'Industrial', amount: 125000, growth: '+5%' },
    { name: 'Global Log.', category: 'Logística', amount: 98000, growth: '+8%' },
    { name: 'Tech Solutions', category: 'Tecnología', amount: 84000, growth: '+15%' },
    { name: 'Innovatech', category: 'Tecnología', amount: 65000, growth: '+2%' },
];

export default function ClientsPage() {
    const [selectedRubro, setSelectedRubro] = useState<string>('Todos');
    const [timeFilter, setTimeFilter] = useState('Este Año');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isNewClientOpen, setIsNewClientOpen] = useState(false);
    const [openActionId, setOpenActionId] = useState<number | null>(null);

    // Interactive Chart Data
    const activePieData = selectedRubro === 'Todos'
        ? rubroData
        : rubroData.map(d => ({ ...d, color: d.name === selectedRubro ? d.color : '#e2e8f033' }));

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val);
    }

    return (
        <div className="space-y-8 font-sans relative">
            {/* Header */}
            {/* Page Header */}
            <PageHeader
                title="Clientes"
                description="Visión general y gestión detallada de tu cartera."
                actions={
                    <>
                        <button
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 transition-all"
                            onClick={() => alert("Generando reporte PDF...")}
                        >
                            <FileText size={18} />
                            Reporte
                        </button>
                        <button
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:shadow-md hover:shadow-black/5 active:scale-95 transition-all"
                            onClick={() => setIsNewClientOpen(true)}
                        >
                            <Plus size={18} />
                            Nuevo Cliente
                        </button>
                    </>
                }
            />



            {/* Row 2: Advanced List */}
            <div className="rounded-3xl bg-card ring-1 ring-border overflow-hidden">
                {/* List Header */}
                <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-background/50">
                    <div>
                        <h2 className="text-xl font-bold text-foreground tracking-tight font-heading">Listado de Clientes</h2>
                        <p className="text-xs text-muted-foreground mt-1">Gestión operativa de cuentas activas.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Buscar por nombre, CUIT..."
                                className="pl-9 pr-4 py-2.5 rounded-xl bg-primary/5 border-none outline-none focus:ring-1 focus:ring-primary/20 w-64 transition-all placeholder-primary/50 text-foreground"
                            />
                        </div>
                        <div className="relative">
                            <button
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${isFilterOpen ? 'bg-primary text-primary-foreground border-primary' : 'bg-primary/10 border-transparent text-primary hover:bg-primary/20'}`}
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                            >
                                <Filter size={14} /> Filtros
                            </button>
                            {isFilterOpen && (
                                <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border shadow-xl rounded-xl p-2 z-20 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="p-2 text-xs font-bold text-muted-foreground">Filtrar por Estado</div>
                                    {['Activo', 'Pendiente', 'Inactivo', 'Nuevo'].map(status => (
                                        <div key={status} className="flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded-lg cursor-pointer text-sm font-medium">
                                            <div className="w-4 h-4 rounded border border-input flex items-center justify-center" />
                                            {status}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Beautiful Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-primary/5 border-b border-border/50">
                                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Cuit</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Rubro</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Ubicación</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Contacto</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-right">Facturación</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-center"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {clientsData.map((client) => (
                                <tr key={client.id} className="group hover:bg-sutil/30 transition-colors">
                                    {/* Cliente: Avatar + Name + ID */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 min-w-[40px] rounded-full flex items-center justify-center text-xs font-bold bg-sutil text-foreground transition-transform group-hover:scale-105">
                                                {client.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors cursor-pointer">{client.name}</p>
                                                <span className="bg-secondary/50 px-1.5 py-0.5 rounded text-[10px] font-mono border border-border/50 text-muted-foreground">ID #{client.id}</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* CUIT */}
                                    <td className="px-6 py-4 text-xs text-muted-foreground">
                                        {client.cuit}
                                    </td>

                                    {/* Rubro (Clean text) */}
                                    <td className="px-6 py-4 text-xs font-medium text-foreground">
                                        {client.rubro}
                                    </td>

                                    {/* Ubicación (Clean text) */}
                                    <td className="px-6 py-4 text-xs text-muted-foreground">
                                        {client.location}
                                    </td>

                                    {/* Contacto: Phone + Mail with Primary Icons */}
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                                                <Phone size={14} className="text-primary" />
                                                {client.phone}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Mail size={14} className="text-primary" />
                                                <span className="truncate max-w-[140px]">{client.email}</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Estado */}
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold ${client.status === 'Activo' ? 'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400' :
                                            client.status === 'Nuevo' ? 'bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400' :
                                                'bg-secondary border-border text-muted-foreground'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${client.status === 'Activo' ? 'bg-green-500' :
                                                client.status === 'Nuevo' ? 'bg-blue-500' : 'bg-gray-400'
                                                }`} />
                                            {client.status}
                                        </div>
                                    </td>

                                    {/* Facturación */}
                                    <td className="px-6 py-4 text-right">
                                        <p className="text-sm font-bold text-foreground tracking-tight">ARS ${client.amount}</p>
                                    </td>

                                    {/* Acción */}
                                    <td className="px-6 py-4 text-center relative">
                                        <button
                                            onClick={() => setOpenActionId(openActionId === client.id ? null : client.id)}
                                            className={`p-2 rounded-xl hover:bg-primary/10 transition-all active:scale-95 ${openActionId === client.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-primary'}`}
                                        >
                                            <MoreVertical size={16} />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {openActionId === client.id && (
                                            <>
                                                <div className="fixed inset-0 z-10" onClick={() => setOpenActionId(null)} />
                                                <div className="absolute right-8 top-8 z-20 w-32 bg-card border border-border rounded-xl shadow-xl p-1 animate-in fade-in zoom-in-95 duration-100 flex flex-col items-stretch text-left">
                                                    <button className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-foreground hover:bg-secondary rounded-lg transition-colors text-left w-full">
                                                        <Eye size={12} />
                                                        Ver Detalles
                                                    </button>
                                                    <button className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-foreground hover:bg-secondary rounded-lg transition-colors text-left w-full">
                                                        <Edit size={12} />
                                                        Editar
                                                    </button>
                                                    <div className="h-px bg-border/50 my-1" />
                                                    <button className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-left w-full">
                                                        <Trash2 size={12} />
                                                        Eliminar
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

                {/* Clean Pagination */}
                <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-primary/5">
                    <span className="text-xs font-bold text-muted-foreground">Mostrando 7 de 1,234 registros</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-bold text-muted-foreground hover:text-foreground transition-all disabled:opacity-50">Anterior</button>
                        <button className="px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-bold text-muted-foreground hover:text-foreground transition-all">Siguiente</button>
                    </div>
                </div>
            </div>

            {/* Simple Modal Overlay for Nuevo Cliente */}
            {isNewClientOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-card w-full max-w-lg p-6 rounded-3xl shadow-xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold font-heading">Nuevo Cliente</h2>
                            <button onClick={() => setIsNewClientOpen(false)} className="p-2 rounded-full hover:bg-secondary transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <p className="text-muted-foreground mb-6">Complete la información para registrar un nuevo cliente en el sistema.</p>

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-foreground">Nombre de Empresa</label>
                                <input type="text" className="w-full px-4 py-2.5 rounded-xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-background outline-none transition-all" placeholder="Ej. Tech Solutions" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-foreground">Contacto</label>
                                    <input type="text" className="w-full px-4 py-2.5 rounded-xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-background outline-none transition-all" placeholder="Nombre completo" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-foreground">Email</label>
                                    <input type="email" className="w-full px-4 py-2.5 rounded-xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-background outline-none transition-all" placeholder="correo@empresa.com" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button onClick={() => setIsNewClientOpen(false)} className="px-4 py-2 rounded-xl text-sm font-bold hover:bg-secondary transition-colors text-muted-foreground">Cancelar</button>
                            <button onClick={() => { alert('Cliente creado!'); setIsNewClientOpen(false); }} className="px-6 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:shadow-md hover:shadow-black/5 transition-all">Guardar Cliente</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
