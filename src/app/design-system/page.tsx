"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Layers, MousePointer2, Type, Layout } from "lucide-react";

export default function DesignSystemPage() {
    return (
        <div className="space-y-12 p-6">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                        <Layers className="w-8 h-8 text-primary" />
                        ORDEX Design System
                    </h1>
                    <div className="flex items-center gap-4 px-4 py-2 bg-muted border border-border rounded-xl">
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Theme</span>
                        <ThemeToggle />
                    </div>
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl">
                    Exploración de componentes y tokens semánticos para la arquitectura ORDEX.
                    <span className="text-primary font-medium"> Primary CTA</span> cambia de Navy (Light) a Lime (Dark).
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Buttons Section */}
                <Card className="md:col-span-2 lg:col-span-3 space-y-6">
                    <div className="flex items-center gap-2 text-primary">
                        <MousePointer2 className="w-5 h-5" />
                        <h2 className="text-xl font-semibold">Sistema de Botones</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-3">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Primary CTA</span>
                            <div className="space-y-2">
                                <Button variant="primary">Acción Principal</Button>
                                <p className="text-xs text-muted-foreground">Navy (Light) → Lime (Dark)</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Accent</span>
                            <div className="space-y-2">
                                <Button variant="accent">Acción Accent</Button>
                                <p className="text-xs text-muted-foreground">Lime (Light) → Navy (Dark)</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Outline & Ghost</span>
                            <div className="space-y-2">
                                <Button variant="outline">Outline</Button>
                                <Button variant="ghost">Ghost</Button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Tamaños</span>
                            <div className="flex flex-col gap-2 items-start">
                                <Button size="sm">SM (32px)</Button>
                                <Button size="default">Default (42px)</Button>
                                <Button size="lg">LG (56px)</Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Inputs Section */}
                <Card className="md:col-span-2 space-y-6">
                    <div className="flex items-center gap-2 text-primary">
                        <Type className="w-5 h-5" />
                        <h2 className="text-xl font-semibold">Inputs</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <Input label="Input Default" id="input-default" placeholder=" " />
                            <Input label="Deshabilitado" id="input-disabled" disabled placeholder=" " />
                        </div>
                        <div className="space-y-4">
                            <Input label="Error" id="input-error" state="error" defaultValue="Valor incorrecto" />
                            <Input label="Success" id="input-success" state="success" defaultValue="Validación exitosa" />
                        </div>
                    </div>
                </Card>

                {/* Cards Section */}
                <Card variant="accent" className="space-y-6">
                    <div className="flex items-center gap-2 text-primary">
                        <Layout className="w-5 h-5" />
                        <h2 className="text-xl font-semibold">Superficies</h2>
                    </div>
                    <div className="space-y-3">
                        <Card variant="default" padding="md">
                            Card Default
                        </Card>
                        <Card variant="interactive" padding="md">
                            Card Interactive (Hover me)
                        </Card>
                        <Card variant="accent" padding="md">
                            Card Accent
                        </Card>
                    </div>
                </Card>
            </div>
        </div>
    );
}
