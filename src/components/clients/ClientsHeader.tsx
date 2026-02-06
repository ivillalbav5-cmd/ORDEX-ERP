"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    List,
    Settings,
    MessageSquare,
    Plus,
    Calendar,
    ChevronRight,
    ChevronDown,
    FileText,
    FileSpreadsheet
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const NAV_ITEMS = [
    { label: "Resumen", href: "/clientes/resumen", icon: LayoutDashboard },
    { label: "Listar", href: "/clientes/listado", icon: List },
    { label: "Gestiones", href: "/clientes/gestiones", icon: MessageSquare },
    { label: "Configurar", href: "/clientes/configurar", icon: Settings },
];

interface ClientsHeaderProps {
    onExportPDF?: () => void;
    onExportExcel?: () => void;
    hideDateRange?: boolean;
}

export function ClientsHeader({ onExportPDF, onExportExcel, hideDateRange = false }: ClientsHeaderProps) {
    const pathname = usePathname();
    const [exportMenuOpen, setExportMenuOpen] = useState(false);

    return (
        <div className="flex items-center justify-between h-[58px]">
            {/* Left: Tab Navigation */}
            <div className="flex items-center gap-6 h-full">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "relative h-full flex items-center gap-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn("w-4 h-4", isActive ? "text-primary" : "opacity-50")} />
                            {item.label}
                            {isActive && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* Right: Date Filter + Primary CTA */}
            <div className="flex items-center gap-3 h-full">
                {!hideDateRange && (
                    <div className="flex items-center gap-2 px-5 h-[58px] bg-white dark:bg-surface border border-border rounded-2xl text-xs font-medium text-muted-foreground cursor-pointer hover:bg-muted transition-colors">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>ENERO 2024</span>
                        <ChevronRight className="w-3 h-3 opacity-40" />
                        <span>HOY</span>
                    </div>
                )}

                {/* Primary CTA - Height 58px, rounded-2xl (16px) */}
                <Button variant="primary" className="h-[58px] px-6 gap-2 rounded-2xl">
                    <Plus className="w-4 h-4" />
                    <span>Nuevo Cliente</span>
                </Button>
            </div>
        </div>
    );
}
