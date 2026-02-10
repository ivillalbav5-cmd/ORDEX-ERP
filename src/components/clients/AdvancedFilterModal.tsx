"use client";

import React, { useState } from "react";
import { X, Filter, Tag, Calendar, CheckSquare, Square, Building, User, Phone, MapPin, CreditCard, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface AdvancedFilterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AdvancedFilterModal({ isOpen, onClose }: AdvancedFilterModalProps) {
    const [tags, setTags] = useState(["Mayorista", "VIP", "Moroso"]);
    const [selectedStatus, setSelectedStatus] = useState<string[]>(["Activo"]);

    const toggleStatus = (status: string) => {
        setSelectedStatus(prev =>
            prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
        );
    };

    const removeTag = (tagToRemove: string) => {
        setTags(prev => prev.filter(tag => tag !== tagToRemove));
    };

    const clearFilters = () => {
        setSelectedStatus([]);
        setTags([]);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose} />

            {/* Modal */}
            <Card className="relative w-full max-w-2xl bg-surface shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]" padding="none">
                {/* Header */}
                <div className="p-6 border-b border-border flex items-center justify-between bg-muted">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <Filter className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">Filtros Avanzados</h3>
                            <p className="text-xs text-muted-foreground">Refina tu búsqueda de clientes</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl">
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    {/* Client Info Filters */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                <Building className="w-4 h-4 text-primary" />
                                Razón Social
                            </label>
                            <input
                                type="text"
                                placeholder="Nombre de la empresa..."
                                className="w-full px-4 h-11 bg-muted border border-border rounded-xl text-sm font-medium focus:border-primary/30 focus:outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                <CreditCard className="w-4 h-4 text-primary" />
                                CUIT
                            </label>
                            <input
                                type="text"
                                placeholder="XX-XXXXXXXX-X"
                                className="w-full px-4 h-11 bg-muted border border-border rounded-xl text-sm font-medium focus:border-primary/30 focus:outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                <User className="w-4 h-4 text-primary" />
                                Vendedor Asignado
                            </label>
                            <select className="w-full px-4 h-11 bg-muted border border-border rounded-xl text-sm font-medium focus:border-primary/30 focus:outline-none transition-all">
                                <option value="">Todos los vendedores</option>
                                <option value="juan">Juan Pérez</option>
                                <option value="maria">María López</option>
                                <option value="ricardo">Ricardo Darín</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                <MapPin className="w-4 h-4 text-primary" />
                                Provincia
                            </label>
                            <select className="w-full px-4 h-11 bg-muted border border-border rounded-xl text-sm font-medium focus:border-primary/30 focus:outline-none transition-all">
                                <option value="">Todas las provincias</option>
                                <option value="buenos_aires">Buenos Aires</option>
                                <option value="cordoba">Córdoba</option>
                                <option value="santa_fe">Santa Fe</option>
                            </select>
                        </div>
                    </div>

                    {/* Status Section */}
                    <div className="space-y-3">
                        <h4 className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            <CheckSquare className="w-4 h-4 text-primary" />
                            Estado del Cliente
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {["Activo", "Inactivo", "Suspendido"].map((status) => {
                                const isSelected = selectedStatus.includes(status);
                                return (
                                    <button
                                        key={status}
                                        onClick={() => toggleStatus(status)}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium uppercase tracking-wide transition-all border",
                                            isSelected
                                                ? "bg-primary/10 border-primary text-primary"
                                                : "bg-muted border-border text-muted-foreground hover:border-primary/30"
                                        )}
                                    >
                                        {isSelected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                                        {status}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Date Range Section */}
                    <div className="space-y-3">
                        <h4 className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            <Calendar className="w-4 h-4 text-primary" />
                            Última Compra
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Desde</label>
                                <input type="date" className="w-full px-4 h-11 bg-muted border border-border rounded-xl text-sm font-medium focus:border-primary/30 focus:outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Hasta</label>
                                <input type="date" className="w-full px-4 h-11 bg-muted border border-border rounded-xl text-sm font-medium focus:border-primary/30 focus:outline-none transition-all" />
                            </div>
                        </div>
                    </div>

                    {/* Tags Section */}
                    <div className="space-y-3">
                        <h4 className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            <Tag className="w-4 h-4 text-primary" />
                            Etiquetas
                        </h4>
                        <div className="p-4 bg-muted border border-border rounded-xl flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <div key={tag} className="flex items-center gap-2 px-3 py-1.5 bg-surface border border-border rounded-lg animate-in fade-in zoom-in duration-200">
                                    <span className="text-xs font-medium text-foreground">{tag}</span>
                                    <button onClick={() => removeTag(tag)} className="text-red-400 hover:text-red-500 transition-colors">
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                            <input
                                className="flex-1 min-w-[120px] h-8 bg-transparent border-none text-sm font-medium outline-none placeholder:text-muted-foreground"
                                placeholder="Agregar etiqueta..."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && e.currentTarget.value) {
                                        setTags(prev => [...prev, e.currentTarget.value]);
                                        e.currentTarget.value = "";
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border bg-muted flex items-center justify-between">
                    <Button
                        variant="ghost"
                        onClick={clearFilters}
                        className="gap-2 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                        <Trash2 className="w-4 h-4" />
                        Limpiar Filtros
                    </Button>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button variant="default" onClick={onClose}>
                            Aplicar Filtros
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
