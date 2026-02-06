"use client";

import React, { useState, useRef, useEffect } from "react";
import { ClientsHeader } from "@/components/clients/ClientsHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
    Plus,
    Edit2,
    Trash2,
    Layers,
    MoreVertical,
    Check,
    X,
    FolderTree
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Taxonomía
interface Rubro {
    id: string;
    nombre: string;
    subRubros: SubRubro[];
}

interface SubRubro {
    id: string;
    nombre: string;
}

const INITIAL_RUBROS: Rubro[] = [
    {
        id: "R1", nombre: "Ferretería", subRubros: [
            { id: "SR1", nombre: "Herramientas Eléctricas" },
            { id: "SR2", nombre: "Herramientas Manuales" },
            { id: "SR3", nombre: "Herrajes" },
            { id: "SR4", nombre: "Fijaciones" },
            { id: "SR5", nombre: "Adhesivos" },
            { id: "SR6", nombre: "Pinturas" }
        ]
    },
    {
        id: "R2", nombre: "Iluminación", subRubros: [
            { id: "SR7", nombre: "LED Industrial" },
            { id: "SR8", nombre: "LED Hogar" },
            { id: "SR9", nombre: "Exterior" },
            { id: "SR10", nombre: "Decorativa" }
        ]
    },
    {
        id: "R3", nombre: "Agroindustria", subRubros: [
            { id: "SR11", nombre: "Maquinaria" },
            { id: "SR12", nombre: "Repuestos" },
            { id: "SR13", nombre: "Insumos" },
            { id: "SR14", nombre: "Fertilizantes" }
        ]
    },
    {
        id: "R4", nombre: "Energía", subRubros: [
            { id: "SR15", nombre: "Cables" },
            { id: "SR16", nombre: "Tableros" },
            { id: "SR17", nombre: "Protecciones" },
            { id: "SR18", nombre: "Solar" }
        ]
    },
    {
        id: "R5", nombre: "Construcción", subRubros: [
            { id: "SR19", nombre: "Construcción en Seco" },
            { id: "SR20", nombre: "Tradicional" },
            { id: "SR21", nombre: "Aislaciones" },
            { id: "SR22", nombre: "Impermeabilizantes" }
        ]
    },
];

export default function ConfigurarClientesPage() {
    const [rubros, setRubros] = useState<Rubro[]>(INITIAL_RUBROS);
    const [selectedRubro, setSelectedRubro] = useState<Rubro>(INITIAL_RUBROS[0]);
    const [editingRubroId, setEditingRubroId] = useState<string | null>(null);
    const [editingValue, setEditingValue] = useState("");
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editingRubroId && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [editingRubroId]);

    const handleSelectRubro = (rubro: Rubro) => {
        if (!editingRubroId) {
            setSelectedRubro(rubro);
        }
    };

    const startEditing = (rubro: Rubro, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingRubroId(rubro.id);
        setEditingValue(rubro.nombre);
    };

    const saveEdit = () => {
        if (editingRubroId && editingValue.trim()) {
            setRubros(prev => prev.map(r =>
                r.id === editingRubroId ? { ...r, nombre: editingValue.trim() } : r
            ));
            if (selectedRubro.id === editingRubroId) {
                setSelectedRubro({ ...selectedRubro, nombre: editingValue.trim() });
            }
        }
        setEditingRubroId(null);
        setEditingValue("");
    };

    const cancelEdit = () => {
        setEditingRubroId(null);
        setEditingValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") saveEdit();
        if (e.key === "Escape") cancelEdit();
    };

    return (
        <main className="h-[calc(100vh-64px)] flex flex-col p-[42px] animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
            <ClientsHeader hideDateRange={true} />

            <div className="grid grid-cols-12 gap-6 mt-6 flex-1 overflow-hidden">
                {/* Column 1: Rubros Panel */}
                <Card className="col-span-12 lg:col-span-4 flex flex-col overflow-hidden" padding="none">
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-white dark:bg-[#052940]">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-primary/10 rounded-xl">
                                <Layers className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-base font-semibold text-foreground">Rubros</h4>
                                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Categorías principales</p>
                            </div>
                        </div>
                        <Button className="rounded-2xl gap-2 font-bold px-4 py-2">
                            <Plus className="w-4 h-4" />
                            Crear Rubro
                        </Button>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
                        {rubros.map((rubro) => (
                            <div
                                key={rubro.id}
                                onClick={() => handleSelectRubro(rubro)}
                                className={cn(
                                    "w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all group cursor-pointer",
                                    selectedRubro.id === rubro.id
                                        ? "bg-primary text-primary-foreground shadow-lg"
                                        : "hover:bg-muted text-foreground"
                                )}
                            >
                                {editingRubroId === rubro.id ? (
                                    <div className="flex items-center gap-2 flex-1" onClick={(e) => e.stopPropagation()}>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={editingValue}
                                            onChange={(e) => setEditingValue(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            className="flex-1 px-3 h-9 bg-surface border border-primary/30 rounded-lg text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                        <button onClick={saveEdit} className="p-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600">
                                            <Check className="w-4 h-4" />
                                        </button>
                                        <button onClick={cancelEdit} className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-3">
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded",
                                                selectedRubro.id === rubro.id ? "bg-white/20" : "bg-muted text-muted-foreground"
                                            )}>
                                                {rubro.subRubros.length}
                                            </span>
                                            <span className="font-semibold text-sm">{rubro.nombre}</span>
                                        </div>
                                        <div className={cn(
                                            "flex items-center gap-1 transition-opacity",
                                            selectedRubro.id === rubro.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                        )}>
                                            <button
                                                onClick={(e) => startEditing(rubro, e)}
                                                className={cn(
                                                    "p-1.5 rounded-lg transition-colors",
                                                    selectedRubro.id === rubro.id ? "hover:bg-white/20" : "hover:bg-muted"
                                                )}
                                            >
                                                <Edit2 className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={(e) => e.stopPropagation()}
                                                className={cn(
                                                    "p-1.5 rounded-lg transition-colors text-red-500",
                                                    selectedRubro.id === rubro.id ? "hover:bg-white/20" : "hover:bg-red-50 dark:hover:bg-red-900/20"
                                                )}
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Column 2: Sub-rubros Panel */}
                <Card className="col-span-12 lg:col-span-8 flex flex-col overflow-hidden" padding="none">
                    {/* Dynamic Header */}
                    <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-white dark:bg-[#052940]">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-primary/10 rounded-xl">
                                <FolderTree className="w-5 h-5 text-primary dark:text-[#DBF227]" />
                            </div>
                            <div>
                                <h4 className="text-base font-semibold text-foreground">Sub-rubros de {selectedRubro.nombre}</h4>
                                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">{selectedRubro.subRubros.length} categorías secundarias</p>
                            </div>
                        </div>
                        <Button className="rounded-2xl gap-2 font-bold px-4 py-2">
                            <Plus className="w-4 h-4" />
                            Crear Sub-rubro
                        </Button>
                    </div>

                    {/* Mini-Bento Cards Grid */}
                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {selectedRubro.subRubros.map((sub) => (
                                <div
                                    key={sub.id}
                                    className="relative p-4 rounded-xl bg-surface border border-border hover:border-primary/30 dark:hover:border-[#DBF227]/50 hover:shadow-md transition-all group"
                                >
                                    <div className="flex items-start justify-between">
                                        <span className="font-medium text-sm text-foreground leading-tight pr-6">{sub.nombre}</span>
                                        <div className="relative">
                                            <button
                                                onClick={() => setActiveSubMenu(activeSubMenu === sub.id ? null : sub.id)}
                                                className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted transition-all"
                                            >
                                                <MoreVertical className="w-4 h-4 text-muted-foreground" />
                                            </button>
                                            {activeSubMenu === sub.id && (
                                                <div className="absolute right-0 top-8 z-50 w-40 bg-surface border border-border rounded-xl shadow-xl py-1 animate-in fade-in zoom-in-95 duration-150">
                                                    <button className="w-full px-4 py-2 text-left text-xs font-medium text-foreground hover:bg-muted flex items-center gap-2">
                                                        <Edit2 className="w-3.5 h-3.5" />
                                                        Editar
                                                    </button>
                                                    <button className="w-full px-4 py-2 text-left text-xs font-medium text-foreground hover:bg-muted flex items-center gap-2">
                                                        <FolderTree className="w-3.5 h-3.5" />
                                                        Mover a...
                                                    </button>
                                                    <hr className="my-1 border-border" />
                                                    <button className="w-full px-4 py-2 text-left text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                        Eliminar
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">{sub.id}</span>
                                    </div>
                                </div>
                            ))}

                            {/* Quick Add Card */}
                            <button className="p-4 rounded-xl border-2 border-dashed border-border hover:border-primary dark:hover:border-[#DBF227] hover:bg-primary/5 dark:hover:bg-[#DBF227]/5 transition-all flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary dark:hover:text-[#DBF227] min-h-[80px]">
                                <Plus className="w-5 h-5" />
                                <span className="text-[10px] font-bold uppercase tracking-wide">Agregar Sub-rubro</span>
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </main>
    );
}
