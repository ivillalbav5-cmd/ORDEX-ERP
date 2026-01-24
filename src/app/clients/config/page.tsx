"use client";

import { useState } from 'react';
import { Plus, Edit, Trash2, ArrowLeft, Save, X } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';

interface Item {
    id: string;
    nombre: string;
    rubroId?: string;
}

export default function ConfigPage() {
    const [rubros, setRubros] = useState<Item[]>([
        { id: '1', nombre: 'Industrial' },
        { id: '2', nombre: 'Tecnología' },
        { id: '3', nombre: 'Retail' },
    ]);

    const [subrubros, setSubrubros] = useState<Item[]>([
        { id: '1', nombre: 'Maquinaria', rubroId: '1' },
        { id: '2', nombre: 'Software', rubroId: '2' },
        { id: '3', nombre: 'Indumentaria', rubroId: '3' },
    ]);

    const [isAddingRubro, setIsAddingRubro] = useState(false);
    const [isAddingSubrubro, setIsAddingSubrubro] = useState(false);
    const [newItemName, setNewItemName] = useState('');
    const [selectedRubroId, setSelectedRubroId] = useState('');

    const addRubro = () => {
        if (!newItemName) return;
        setRubros([...rubros, { id: Math.random().toString(), nombre: newItemName }]);
        setNewItemName('');
        setIsAddingRubro(false);
    };

    const addSubrubro = () => {
        if (!newItemName || !selectedRubroId) return;
        setSubrubros([...subrubros, { id: Math.random().toString(), nombre: newItemName, rubroId: selectedRubroId }]);
        setNewItemName('');
        setSelectedRubroId('');
        setIsAddingSubrubro(false);
    };

    const deleteRubro = (id: string) => {
        setRubros(rubros.filter(r => r.id !== id));
        setSubrubros(subrubros.filter(s => s.rubroId !== id));
    };

    const deleteSubrubro = (id: string) => {
        setSubrubros(subrubros.filter(s => s.id !== id));
    };

    return (
        <div className="space-y-8 font-sans">
            <PageHeader
                title="Configuración de Clientes"
                description="Gestione los rubros y subrubros del sistema."
                actions={
                    <Link
                        href="/clients"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 transition-all"
                    >
                        <ArrowLeft size={18} />
                        Volver a Clientes
                    </Link>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Rubros Section */}
                <div className="bg-card ring-1 ring-border rounded-[20px] overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-border flex justify-between items-center bg-background/50">
                        <div>
                            <h2 className="text-xl font-bold font-heading">Rubros</h2>
                            <p className="text-xs text-muted-foreground mt-1">Categorías principales de clientes.</p>
                        </div>
                        <button
                            onClick={() => setIsAddingRubro(true)}
                            className="p-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all"
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    <div className="p-4 space-y-2">
                        {isAddingRubro && (
                            <div className="flex gap-2 p-3 bg-primary/5 rounded-xl animate-in slide-in-from-top-2">
                                <input
                                    type="text"
                                    value={newItemName}
                                    onChange={(e) => setNewItemName(e.target.value)}
                                    placeholder="Nombre del rubro"
                                    className="flex-1 px-3 py-1.5 rounded-lg bg-background border border-border focus:ring-1 focus:ring-primary outline-none text-sm"
                                    autoFocus
                                />
                                <button onClick={addRubro} className="p-1.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all">
                                    <Save size={16} />
                                </button>
                                <button onClick={() => setIsAddingRubro(false)} className="p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all">
                                    <X size={16} />
                                </button>
                            </div>
                        )}

                        {rubros.map((rubro) => (
                            <div key={rubro.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/50 transition-all group">
                                <span className="font-medium text-sm">{rubro.nombre}</span>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1.5 text-muted-foreground hover:text-primary transition-colors">
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => deleteRubro(rubro.id)}
                                        className="p-1.5 text-muted-foreground hover:text-red-600 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Subrubros Section */}
                <div className="bg-card ring-1 ring-border rounded-[20px] overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-border flex justify-between items-center bg-background/50">
                        <div>
                            <h2 className="text-xl font-bold font-heading">Subrubros</h2>
                            <p className="text-xs text-muted-foreground mt-1">Especializaciones dentro de cada rubro.</p>
                        </div>
                        <button
                            onClick={() => setIsAddingSubrubro(true)}
                            className="p-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all"
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    <div className="p-4 space-y-2">
                        {isAddingSubrubro && (
                            <div className="space-y-3 p-4 bg-primary/5 rounded-xl animate-in slide-in-from-top-2">
                                <select
                                    value={selectedRubroId}
                                    onChange={(e) => setSelectedRubroId(e.target.value)}
                                    className="w-full px-3 py-1.5 rounded-lg bg-background border border-border focus:ring-1 focus:ring-primary outline-none text-sm"
                                >
                                    <option value="">Seleccione un rubro...</option>
                                    {rubros.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
                                </select>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newItemName}
                                        onChange={(e) => setNewItemName(e.target.value)}
                                        placeholder="Nombre del subrubro"
                                        className="flex-1 px-3 py-1.5 rounded-lg bg-background border border-border focus:ring-1 focus:ring-primary outline-none text-sm"
                                    />
                                    <button onClick={addSubrubro} className="p-1.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all">
                                        <Save size={16} />
                                    </button>
                                    <button onClick={() => setIsAddingSubrubro(false)} className="p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all">
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {subrubros.map((subrubro) => (
                            <div key={subrubro.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/50 transition-all group">
                                <div>
                                    <span className="font-medium text-sm">{subrubro.nombre}</span>
                                    <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded-full font-bold">
                                        {rubros.find(r => r.id === subrubro.rubroId)?.nombre}
                                    </span>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1.5 text-muted-foreground hover:text-primary transition-colors">
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => deleteSubrubro(subrubro.id)}
                                        className="p-1.5 text-muted-foreground hover:text-red-600 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
