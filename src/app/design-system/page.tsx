"use client";

import React, { useState } from "react";
import { Search, ChevronDown, Plus, Download, Settings, FileText, Check, Copy, MoreVertical } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export default function DesignSystemPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState("Todos");

    return (
        <div className="max-w-7xl mx-auto space-y-16 py-8 animate-in fade-in duration-500">

            {/* Header */}
            <PageHeader
                title="Ordex Design System"
                description={<>Filosofía: <span className="text-foreground font-semibold">Claridad</span>, <span className="text-foreground font-semibold">Contraste</span> y <span className="text-foreground font-semibold">Consistencia</span>.</>}
                actions={
                    <div className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                        v1.2.0 Interactive
                    </div>
                }
            />

            <Section title="I. Paleta de Colores" description="La base del sistema. Texto seleccionable para facilitar la copia.">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <ColorSwatch
                        name="Primario"
                        variable="--primary"
                        hex="#052941 (L) / #DBF227 (D)"
                        roles={["Fondos oscuros", "Botones principales", "Texto alto contraste"]}
                        bgClass="bg-primary"
                        textClass="text-primary-foreground"
                    />
                    <ColorSwatch
                        name="Acento"
                        variable="--accent"
                        hex="#DBF227 (L) / #fcff8d (D)"
                        roles={["Acciones clave (Dark)", "Estados activos", "Foco (Rings)"]}
                        bgClass="bg-accent"
                        textClass="text-accent-foreground"
                    />
                    <ColorSwatch
                        name="Fondo"
                        variable="--background"
                        hex="#F8F9FB (L) / #081e2e (D)"
                        roles={["Fondo general de la aplicación"]}
                        bgClass="bg-background"
                        textClass="text-foreground border border-border/50"
                    />
                    <ColorSwatch
                        name="Contenido (Card)"
                        variable="--card"
                        hex="#FFFFFF (L) / #052941 (D)"
                        roles={["Superficie de tarjetas", "Modales", "Popovers"]}
                        bgClass="bg-card"
                        textClass="text-card-foreground border border-border/50"
                    />
                    <ColorSwatch
                        name="Sutil"
                        variable="--sutil"
                        hex="#cedcf2 (L) / #1e3a52 (D)"
                        roles={["Bordes", "Separadores", "Fondos secundarios hover"]}
                        bgClass="bg-sutil"
                        textClass="text-foreground"
                    />
                    <ColorSwatch
                        name="Texto"
                        variable="--foreground"
                        hex="#1b1e21 (L) / #e5e7eb (D)"
                        roles={["Texto principal", "Titulares"]}
                        bgClass="bg-foreground"
                        textClass="text-background"
                    />
                    <ColorSwatch
                        name="Gradiente Marca"
                        variable="--brand-gradient"
                        hex="#052941→#2c8fd1 (L) / #DBF227→#ffffd9 (D)"
                        roles={["Títulos destacados", "Elementos de marketing"]}
                        bgClass="bg-brand"
                        textClass="text-white"
                    />
                </div>
            </Section>

            {/* Interactive Components Section */}
            <Section title="II. Componentes Interactivos" description="Elementos de control con estados detallados.">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                    {/* Buttons */}
                    <ComponentCard title="Botones">
                        <div className="flex flex-wrap gap-4 mb-8 p-6 bg-secondary/20 rounded-2xl border border-dashed border-border justify-center sm:justify-start">
                            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium shadow-lg hover:bg-[#003e60] dark:hover:bg-accent dark:hover:text-accent-foreground active:scale-95 transition-all">
                                <Plus size={20} />
                                Primario
                            </button>
                            <button className="flex items-center gap-2 bg-primary/10 text-primary dark:bg-primary/10 dark:text-primary px-6 py-3 rounded-xl font-medium hover:bg-primary/20 active:scale-95 transition-all">
                                <Download size={20} />
                                Secundario
                            </button>
                            <button className="p-3 bg-transparent hover:bg-sutil dark:hover:bg-primary/10 rounded-xl text-foreground dark:text-primary transition-all active:scale-95">
                                <Settings size={24} />
                            </button>
                            <button className="flex items-center gap-2 bg-transparent text-foreground dark:text-primary px-4 py-2 rounded-xl font-medium hover:bg-sutil dark:hover:bg-primary/10 active:scale-95 transition-all">
                                <Settings size={20} />
                                Ghost
                            </button>
                        </div>

                        <div className="space-y-6">
                            <h4 className="font-bold text-sm text-foreground uppercase tracking-wider border-b border-border/50 pb-2">Botón Primario</h4>
                            <DetailedSpec
                                label="Default"
                                classes="bg-primary text-primary-foreground rounded-xl shadow-lg shadow-black/5"
                            />
                            <DetailedSpec
                                label="Hover"
                                classes="hover:bg-[#003e60] (L) / dark:hover:bg-accent dark:hover:text-accent-foreground"
                            />
                            <DetailedSpec
                                label="Active"
                                classes="active:scale-95 transition-all"
                            />

                            <h4 className="font-bold text-sm text-foreground uppercase tracking-wider border-b border-border/50 pb-2 pt-4">Botón Secundario</h4>
                            <DetailedSpec
                                label="Default"
                                classes="bg-primary/10 text-primary rounded-xl"
                            />
                            <DetailedSpec
                                label="Hover"
                                classes="hover:bg-primary/20"
                            />
                        </div>
                    </ComponentCard>

                    {/* Inputs */}
                    <ComponentCard title="Inputs y Filtros (Interactivos)">
                        <div className="flex flex-col gap-6 mb-8 p-6 bg-secondary/20 rounded-2xl border border-dashed border-border min-h-[250px]">
                            {/* Search Input - Interactive */}
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="text"
                                    placeholder="Escribe para probar..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-primary/5 border-none rounded-xl outline-none focus:ring-1 focus:ring-primary/20 transition-all placeholder-primary/50 text-foreground"
                                />
                                {searchQuery && (
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded">
                                        Escribiendo...
                                    </span>
                                )}
                            </div>

                            {/* Filters - Interactive Dropdown */}
                            <div className="relative">
                                <button
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all text-sm border ${isFilterOpen
                                        ? 'bg-primary text-primary-foreground border-primary shadow-lg ring-2 ring-primary/20'
                                        : 'bg-primary/10 text-primary border-transparent hover:bg-primary/20'
                                        }`}
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                >
                                    {isFilterOpen ? 'Filtros Activos' : 'Filtros'}
                                    <ChevronDown size={16} className={`transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {isFilterOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-xl z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200 p-1">
                                        {['Todos', 'Activos', 'Pendientes', 'Cancelados'].map((status) => (
                                            <div
                                                key={status}
                                                className={`px-3 py-2 text-sm rounded-lg cursor-pointer flex items-center justify-between ${activeFilter === status
                                                    ? 'bg-primary/10 text-primary font-bold'
                                                    : 'text-foreground hover:bg-secondary'
                                                    }`}
                                                onClick={() => {
                                                    setActiveFilter(status);
                                                    setIsFilterOpen(false);
                                                }}
                                            >
                                                {status}
                                                {activeFilter === status && <Check size={14} />}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="text-xs text-muted-foreground mt-2">
                                Filtro seleccionado: <span className="font-bold text-primary">{activeFilter}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <SpecRow label="Search Input" value="bg-primary/5" desc="Typing simulation active" />
                            <SpecRow label="Filter Dropdown" value="bg-card shadow-xl" desc="Click 'Filtros' to toggle" />
                        </div>
                    </ComponentCard>
                </div>
            </Section>

            {/* Page Header Section */}
            <Section title="III. Encabezado de Página" description="Estándar para títulos de módulo y acciones principales.">
                <ComponentCard title="PageHeader Component">
                    <div className="mb-8 p-6 bg-secondary/20 rounded-2xl border border-dashed border-border">
                        <PageHeader
                            title="Módulo Ejemplo"
                            description="Descripción breve del contenido de la página."
                            actions={
                                <>
                                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 transition-all">
                                        <FileText size={18} />
                                        Reporte
                                    </button>
                                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:shadow-md hover:shadow-black/5 active:scale-95 transition-all">
                                        <Plus size={18} />
                                        Nuevo Item
                                    </button>
                                </>
                            }
                        />
                    </div>
                </ComponentCard>
            </Section>

            {/* Cards Section */}
            <Section title="IV. Composición de Tarjetas" description="El contenedor principal de la UI. Define la jerarquía, agrupación y separación del contenido.">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                    {/* New KPI Card Standard */}
                    <ComponentCard title="KPI Card Standard">
                        <div className="mb-8 p-6 bg-secondary/20 rounded-2xl border border-dashed border-border flex justify-center">
                            {/* DEMO CARD */}
                            <div className="relative w-full max-w-[280px] h-[180px] rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border shadow-ordex flex flex-col justify-end group hover:-translate-y-1 transition-transform duration-300">
                                {/* Icon Top-Left (Smaller) */}
                                <div className="absolute top-6 left-6 p-2.5 rounded-[12px] bg-primary/10 text-primary transition-colors">
                                    <Download size={18} />
                                </div>

                                {/* Filter Top-Right */}
                                <button className="absolute top-6 right-6 flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors bg-primary/10 hover:bg-primary/20 px-2.5 py-1.5 rounded-xl">
                                    Último Mes
                                    <ChevronDown size={14} />
                                </button>

                                {/* Content Bottom */}
                                <div className="mt-12">
                                    <p className="text-sm font-bold text-muted-foreground mb-1">Ventas Totales</p>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-3xl font-extrabold text-foreground tracking-tight font-heading">$ 45.2k</h3>
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border border-transparent">
                                            <ChevronDown className="rotate-180" size={12} />
                                            +12.5%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <SpecRow label="Radius" value="rounded-3xl" desc="Standard para tarjetas" />
                            <SpecRow label="Icono" value="Reducido" desc="p-2.5, size-18, rounded-[12px]" />
                            <SpecRow label="Botones internos" value="rounded-xl" />
                        </div>
                    </ComponentCard>

                    {/* Chip Styles */}
                    <ComponentCard title="Chips de Estado">
                        <div className="flex flex-wrap gap-4 mb-8 p-6 bg-secondary/20 rounded-2xl border border-dashed border-border">
                            {/* Positive */}
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400">
                                <span>+12%</span>
                            </div>
                            {/* Negative */}
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400">
                                <span>-5.4%</span>
                            </div>
                            {/* Neutral/Action */}
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                                <span>Estable</span>
                            </div>
                            {/* Alert/Warning */}
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">
                                <span>Atención</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <SpecRow label="Positivo" value="Green-100/700 (L)" desc="Green-500/10 / 400 (D)" />
                            <SpecRow label="Negativo" value="Red-100/700 (L)" desc="Red-500/10 / 400 (D)" />
                        </div>
                    </ComponentCard>

                </div>
            </Section>

            {/* Lists & Tables Section */}
            <Section title="V. Listas y Tablas" description="Patrón de visualización de datos. Optimizado para escaneo rápido con avatares, badges y tipografía jerarquizada.">
                <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
                    {/* Static Demo Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-primary/5 border-b border-border/50">
                                    <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Usuario</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Rol</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-center"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                <tr className="group hover:bg-secondary/20 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-xl flex items-center justify-center text-xs font-bold bg-sutil text-foreground transition-transform group-hover:scale-105">
                                                JD
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors cursor-pointer">Jane Doe</p>
                                                <p className="text-[11px] text-muted-foreground mt-0.5">jane@ordex.com</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-foreground">Administrador</td>
                                    <td className="px-6 py-4">
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                            Activo
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="p-2 rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all active:scale-95">
                                            <MoreVertical size={16} />
                                        </button>
                                    </td>
                                </tr>
                                <tr className="group hover:bg-secondary/20 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-xl flex items-center justify-center text-xs font-bold bg-sutil text-foreground transition-transform group-hover:scale-105">
                                                RS
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors cursor-pointer">Robert Smith</p>
                                                <p className="text-[11px] text-muted-foreground mt-0.5">robert@ordex.com</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-foreground">Editor</td>
                                    <td className="px-6 py-4">
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold bg-secondary border-border text-muted-foreground">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                            Offline
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="p-2 rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all active:scale-95">
                                            <MoreVertical size={16} />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <SpecRow label="Header" value="bg-primary/5" desc="Uppercase, tracking-wider" />
                    <SpecRow label="Row Hover" value="bg-secondary/20" desc="Transition-colors duration-200" />
                    <SpecRow label="Avatar" value="bg-primary/10" desc="Text-Primary" />
                </div>
            </Section>

        </div>
    );
}

function Section({ title, description, children }: { title: string, description: string, children: React.ReactNode }) {
    return (
        <section className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold font-heading">{title}</h2>
                <p className="text-muted-foreground max-w-3xl leading-relaxed">{description}</p>
            </div>
            {children}
        </section>
    )
}

function ComponentCard({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="bg-card rounded-3xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold mb-6 font-heading border-l-4 border-primary pl-3">{title}</h3>
            {children}
        </div>
    )
}

function ColorSwatch({ name, variable, hex, roles, bgClass, textClass }: { name: string, variable: string, hex: string, roles: string[], bgClass: string, textClass: string }) {
    return (
        <div className="group space-y-3">
            <div className={`h-32 rounded-2xl ${bgClass} ${textClass} p-4 flex flex-col justify-between shadow-sm ring-1 ring-black/5 relative overflow-hidden transition-transform group-hover:scale-[1.02] select-text`}>
                <div className="flex justify-between items-start">
                    <div className="font-bold tracking-wide">{name}</div>
                    {/* Removed Copy Icon to allow native selection */}
                </div>
                <div className="select-text cursor-text">
                    <div className="font-mono text-xs opacity-90 font-bold">{hex}</div>
                    <div className="font-mono text-xs opacity-70 mt-0.5">{variable}</div>
                </div>
                {/* Gradient overlay set to pointer-events-none to allow text selection underneath */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
            <div className="space-y-1 px-1">
                {roles.map((role, i) => (
                    <div key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-primary/40" />
                        {role}
                    </div>
                ))}
            </div>
        </div>
    )
}

function SpecRow({ label, value, desc }: { label: string, value: string, desc?: string }) {
    return (
        <div className="grid grid-cols-[100px_1fr] gap-4 text-sm py-2 border-b border-border/40 last:border-0">
            <span className="font-semibold text-muted-foreground">{label}</span>
            <div className="flex flex-col">
                <span className="font-mono text-foreground">{value}</span>
                {desc && <span className="text-xs text-muted-foreground mt-0.5">{desc}</span>}
            </div>
        </div>
    )
}

function DetailedSpec({ label, classes }: { label: string, classes: string }) {
    return (
        <div className="grid grid-cols-[80px_1fr] gap-4 text-xs py-2 border-b border-border/40 last:border-0">
            <span className="font-medium text-muted-foreground">{label}</span>
            <code className="bg-primary/5 text-primary rounded px-1.5 py-0.5 font-mono">{classes}</code>
        </div>
    )
}
