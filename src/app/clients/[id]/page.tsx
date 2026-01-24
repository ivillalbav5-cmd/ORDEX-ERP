"use client";

import { useState } from 'react';
import {
    ArrowLeft,
    Building2,
    CreditCard,
    MapPin,
    Clock,
    Phone,
    Mail,
    Calendar,
    AlertCircle,
    User,
    Plus,
    FileText,
    TrendingUp,
    ShieldCheck,
    Tag
} from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Client, ClientStatus } from '@/types/client';
import { formatDate } from '@/utils/date';

export default function ClientProfilePage({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState<'identificacion' | 'comercial' | 'domicilios' | 'actividad'>('identificacion');

    // Mock Client Data updated with new requirements
    const client: Client = {
        id: params.id,
        razonSocial: 'Tech Solutions S.A.',
        nombreFantasia: 'TechSol',
        cuit: '30-55667788-9',
        vencimientoAFIP: '2025-12-31',
        numeroIIBB: '901-123456-1',
        vencimientoIIBB: '2026-03-15',
        condicionIVAId: 'Responsable Inscripto',
        tipoIIBBId: 'Local',
        email: 'contacto@techsolutions.com',
        fechaAlta: '2023-10-15',
        fechaBaja: null,
        fechaUltimaCompra: '2026-01-20',
        estadoId: 'Activo' as ClientStatus,
        rubroId: 'Tecnología',
        subRubroId: 'Software',
        observaciones: 'Cliente preferencial con pagos al día.',
        condicionVentaId: 'CTA CTE',
        vendedorId: 'Ana Ventas',
        bonificaciones: [
            { id: '1', fechaCarga: '2025-11-01', porcentaje: 10, usuarioResponsable: 'admin', validez: null },
            { id: '2', fechaCarga: '2026-01-01', porcentaje: 5, usuarioResponsable: 'carlos_ventas', validez: '2026-02-01' }
        ],
        margenesCredito: [
            { id: '1', fechaCarga: '2025-11-01', monto: 500000, usuarioResponsable: 'admin', validez: null }
        ],
        listaPrecioId: 'Versión 1',
        domicilios: [
            { id: '1', domicilio: 'Av. Corrientes 1234', localidad: 'CABA', codigoPostal: '1043', provinciaId: 'Buenos Aires', telefono: '011-4567-8901', responsable: 'Juan Perez', vendedorId: 'Ana Ventas', email: 'logistica@techsol.com', esDomicilioEntrega: true, transporteId: 'Transporte Rápido', diasHorariosEntrega: 'Lun a Vie 9-18hs' }
        ]
    };

    const isExpired = (dateStr: string) => {
        return new Date(dateStr) < new Date();
    };

    const tabs = [
        { id: 'identificacion', label: 'Identificación', icon: Building2 },
        { id: 'comercial', label: 'Comercial', icon: CreditCard },
        { id: 'domicilios', label: 'Domicilios', icon: MapPin },
        { id: 'actividad', label: 'Actividad', icon: Clock },
    ];

    return (
        <div className="space-y-8 font-sans">
            <PageHeader
                title={client.razonSocial}
                description={
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="px-3 py-1.5 rounded-xl bg-sutil/20 text-primary text-sm font-bold ring-1 ring-primary/10 select-all cursor-text shadow-sm tracking-tight backdrop-blur-sm">
                            {client.cuit}
                        </span>
                        <span className="px-3 py-1.5 rounded-xl bg-sutil/20 text-primary text-sm font-bold ring-1 ring-primary/10 select-all cursor-text shadow-sm tracking-tight backdrop-blur-sm">
                            {client.rubroId}
                        </span>
                    </div>
                }
                actions={
                    <div className="flex gap-4">
                        <Link href="/clients" className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary/10 text-primary font-bold text-base hover:bg-primary/20 transition-all cursor-pointer">
                            <ArrowLeft size={20} /> Volver
                        </Link>
                        <button className="flex items-center gap-2 px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-base hover:opacity-90 transition-all shadow-lg shadow-primary/20 cursor-pointer">
                            <FileText size={20} /> Exportar
                        </button>
                    </div>
                }
            />

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    {
                        label: 'Estado',
                        value: client.estadoId,
                        color: client.estadoId === 'Activo' ? 'text-green-600' : client.estadoId === 'Suspendido' ? 'text-red-600' : 'text-slate-600',
                        icon: User
                    },
                    { label: 'Saldo Cta Cte', value: 'ARS $124.500', color: 'text-primary', icon: TrendingUp },
                    { label: 'Última Compra', value: formatDate(client.fechaUltimaCompra) || '-', color: 'text-muted-foreground', icon: Calendar },
                    { label: 'Venc. AFIP', value: formatDate(client.vencimientoAFIP), color: isExpired(client.vencimientoAFIP) ? 'text-red-600' : 'text-muted-foreground', icon: AlertCircle },
                ].map((stat, i) => (
                    <div key={i} className="bg-card p-5 rounded-[20px] ring-1 ring-border flex items-center gap-4">
                        <div className={`p-3 rounded-2xl bg-primary/5 ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase">{stat.label}</p>
                            <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Tabs Architecture - Seamless Integration Final Version */}
            <div className="bg-card ring-1 ring-border rounded-[20px] overflow-hidden shadow-sm">
                <div className="flex bg-primary/10 overflow-x-auto items-stretch h-[64px] border-b border-border">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-6 h-full text-sm font-bold transition-all relative min-w-fit cursor-pointer
                                ${activeTab === tab.id
                                    ? 'bg-card text-primary z-10 -mb-[1px]'
                                    : 'bg-transparent text-muted-foreground hover:bg-primary/5'}
                            `}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                            {/* Mask the bottom border for the active tab */}
                            {activeTab === tab.id && <div className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-card" />}
                        </button>
                    ))}
                    {/* Filler space correctly inherits the border-b from parent */}
                    <div className="flex-1" />
                </div>

                <div className="p-8">
                    {activeTab === 'identificacion' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in duration-300">
                            <section className="space-y-6">
                                <div className="mb-6">
                                    <h3 className="text-base font-black uppercase tracking-tighter text-foreground">Datos Generales</h3>
                                    <div className="h-px bg-border/50 w-[100px] mt-2" />
                                </div>
                                <div className="space-y-4">
                                    <DataRow label="Razón Social" value={client.razonSocial} />
                                    <DataRow label="Nombre Fantasía" value={client.nombreFantasia} />
                                    <DataRow label="Email" value={client.email} icon={<Mail size={14} />} />
                                    <DataRow label="Rubro / Subrubro" value={`${client.rubroId} / ${client.subRubroId}`} />
                                    <DataRow label="Observaciones" value={client.observaciones} />
                                </div>
                            </section>
                            <section className="space-y-6">
                                <div className="mb-6">
                                    <h3 className="text-base font-black uppercase tracking-tighter text-foreground">Impuestos y Vencimientos</h3>
                                    <div className="h-px bg-border/50 w-[100px] mt-2" />
                                </div>
                                <div className="space-y-4">
                                    <DataRow label="CUIT" value={client.cuit} />
                                    <DataRow label="Condición IVA" value={client.condicionIVAId} />
                                    <DataRow label="Vencimiento AFIP" value={formatDate(client.vencimientoAFIP)} alert={isExpired(client.vencimientoAFIP)} />
                                    <DataRow label="Nro IIBB" value={client.numeroIIBB} />
                                    <DataRow label="Vencimiento IIBB" value={formatDate(client.vencimientoIIBB)} alert={isExpired(client.vencimientoIIBB)} />
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'comercial' && (
                        <div className="space-y-12 animate-in fade-in duration-300">
                            {/* Relational Information Header */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-6 rounded-2xl bg-card ring-1 ring-border flex items-center gap-5 shadow-sm">
                                    <div className="p-4 rounded-xl bg-primary/10 text-primary">
                                        <User size={24} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <h4 className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest leading-none">Vendedor Asignado</h4>
                                        <p className="text-xl font-bold text-foreground leading-tight">{client.vendedorId}</p>
                                    </div>
                                </div>
                                <div className="p-6 rounded-2xl bg-card ring-1 ring-border flex items-center gap-5 shadow-sm">
                                    <div className="p-4 rounded-xl bg-primary/10 text-primary">
                                        <CreditCard size={24} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <h4 className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest leading-none">Condición de Venta</h4>
                                        <p className="text-xl font-bold text-foreground leading-tight">{client.condicionVentaId}</p>
                                    </div>
                                </div>
                                <div className="p-6 rounded-2xl bg-card ring-1 ring-border flex items-center gap-5 shadow-sm">
                                    <div className="p-4 rounded-xl bg-primary/10 text-primary">
                                        <Tag size={24} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <h4 className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest leading-none">Lista de Precios</h4>
                                        <p className="text-xl font-bold text-foreground leading-tight">{client.listaPrecioId}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Benefits / Bonuses Section */}
                            <section className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-base font-black uppercase tracking-tighter text-foreground">Historial de Beneficios</h3>
                                        <div className="h-px bg-border/50 w-[100px] mt-2" />
                                    </div>
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-all border border-primary/10 cursor-pointer">
                                        <Plus size={14} /> Cargar Beneficio
                                    </button>
                                </div>
                                <div className="overflow-hidden ring-1 ring-border rounded-2xl">
                                    <table className="w-full text-left text-xs">
                                        <thead className="bg-primary/5 border-b border-border text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                            <tr>
                                                <th className="px-6 py-3">Fecha Carga</th>
                                                <th className="px-6 py-3">Bonificación</th>
                                                <th className="px-6 py-3">Usuario Responsable</th>
                                                <th className="px-6 py-3">Validez</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {client.bonificaciones.map((b) => (
                                                <tr key={b.id} className="hover:bg-primary/5 transition-all">
                                                    <td className="px-6 py-4 font-medium">{formatDate(b.fechaCarga)}</td>
                                                    <td className="px-6 py-4 text-green-600 font-bold">{b.porcentaje}%</td>
                                                    <td className="px-6 py-4 text-muted-foreground font-medium">{b.usuarioResponsable}</td>
                                                    <td className="px-6 py-4 capitalize font-bold">
                                                        {b.validez ? formatDate(b.validez) : <span className="text-primary tracking-widest text-[9px]">PERPETUO</span>}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* Credit Margin Section */}
                            <section className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-base font-black uppercase tracking-tighter text-foreground">Historial de Margen de Crédito</h3>
                                        <div className="h-px bg-border/50 w-[100px] mt-2" />
                                    </div>
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-all border border-primary/10 cursor-pointer">
                                        <Plus size={14} /> Ajustar Margen
                                    </button>
                                </div>
                                <div className="overflow-hidden ring-1 ring-border rounded-2xl">
                                    <table className="w-full text-left text-xs">
                                        <thead className="bg-primary/5 border-b border-border text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                            <tr>
                                                <th className="px-6 py-3">Fecha Carga</th>
                                                <th className="px-6 py-3">Margen Otorgado</th>
                                                <th className="px-6 py-3">Usuario Responsable</th>
                                                <th className="px-6 py-3">Validez</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {client.margenesCredito.map((m) => (
                                                <tr key={m.id} className="hover:bg-primary/5 transition-all">
                                                    <td className="px-6 py-4 font-medium">{formatDate(m.fechaCarga)}</td>
                                                    <td className="px-6 py-4 text-primary font-bold">ARS ${m.monto.toLocaleString()}</td>
                                                    <td className="px-6 py-4 text-muted-foreground font-medium">{m.usuarioResponsable}</td>
                                                    <td className="px-6 py-4 capitalize font-bold">
                                                        {m.validez ? formatDate(m.validez) : <span className="text-primary tracking-widest text-[9px]">PERPETUO</span>}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'domicilios' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="flex justify-between items-center">
                                <div className="flex-1 max-w-xs text-left">
                                    <h3 className="text-base font-black uppercase tracking-tighter text-foreground">Listado de Domicilios</h3>
                                    <div className="h-px bg-border/50 w-[100px] mt-2" />
                                </div>
                                <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-primary/10 text-primary text-base font-bold hover:bg-primary/20 transition-all border border-primary/10 cursor-pointer">
                                    <Plus size={18} /> Agregar Domicilio
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {client.domicilios.map((dom) => (
                                    <div key={dom.id} className="p-6 rounded-2xl bg-secondary/30 ring-1 ring-border space-y-4">
                                        <div className="flex justify-between">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="text-primary" size={18} />
                                                <h4 className="font-bold">{dom.domicilio}</h4>
                                            </div>
                                            {dom.esDomicilioEntrega && <span className="text-[10px] font-bold bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full">ENTREGA</span>}
                                        </div>
                                        <div className="grid grid-cols-2 gap-y-2 text-xs">
                                            <span className="text-muted-foreground">Localidad:</span> <span className="font-medium">{dom.localidad}</span>
                                            <span className="text-muted-foreground">Provincia:</span> <span className="font-medium">{dom.provinciaId}</span>
                                            <span className="text-muted-foreground">Teléfono:</span> <span className="font-medium">{dom.telefono}</span>
                                            <span className="text-muted-foreground">Responsable:</span> <span className="font-medium">{dom.responsable}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'actividad' && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            <div className="flex justify-between items-center">
                                <div className="flex-1 max-w-xs text-left">
                                    <h3 className="text-base font-black uppercase tracking-tighter text-foreground">Gestiones Comerciales</h3>
                                    <div className="h-px bg-border/50 w-[100px] mt-2" />
                                </div>
                                <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-primary/10 text-primary text-base font-bold hover:bg-primary/20 transition-all border border-primary/10 cursor-pointer">
                                    <Plus size={18} /> Nueva Gestión
                                </button>
                            </div>
                            <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-border">
                                {[
                                    { date: '2026-01-21', user: 'Admin', trato: 'Llamada comercial por mora', resp: 'Paga el viernes' },
                                    { date: '2026-01-15', user: 'Ana', trato: 'Venta de temporada', resp: 'Interesado en nuevos productos' },
                                ].map((g, i) => (
                                    <div key={i} className="relative">
                                        <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background" />
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-muted-foreground">{formatDate(g.date)}</span>
                                                <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded font-mono">USUARIO: {g.user}</span>
                                            </div>
                                            <p className="font-bold text-sm">{g.trato}</p>
                                            <p className="text-xs text-muted-foreground italic">Respuesta: {g.resp}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function DataRow({ label, value, icon, alert }: { label: string; value: string; icon?: React.ReactNode; alert?: boolean }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">{label}</span>
            <div className={`flex items-center gap-2 font-medium text-sm opacity-100 ${alert ? 'text-red-600 font-bold' : 'text-foreground'}`}>
                {icon}
                {value}
            </div>
        </div>
    );
}
