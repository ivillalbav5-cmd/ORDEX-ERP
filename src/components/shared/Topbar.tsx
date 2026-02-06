"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Search, Bell, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Topbar() {
    const pathname = usePathname();

    // Dynamic breadcrumb based on current route
    const getBreadcrumb = () => {
        if (pathname.includes("/clientes")) {
            const subPath = pathname.split("/clientes/")[1];
            if (subPath) {
                const viewName = subPath.toUpperCase().replace("-", " ");
                return { parent: "CLIENTES", child: viewName };
            }
            return { parent: "CLIENTES", child: "RESUMEN" };
        }
        if (pathname.includes("/productos")) return { parent: "PRODUCTOS", child: "INVENTARIO" };
        if (pathname.includes("/configuracion")) return { parent: "SISTEMA", child: "CONFIGURACIÓN" };
        if (pathname.includes("/design-system")) return { parent: "SISTEMA", child: "DESIGN SYSTEM" };
        return { parent: "ORDEX", child: "DASHBOARD" };
    };

    const breadcrumb = getBreadcrumb();

    return (
        <header className="sticky top-0 z-40 w-full h-16 bg-surface/80 backdrop-blur-md flex items-center border-b border-border transition-colors">
            {/* Left: Breadcrumbs & Mobile Toggle */}
            <div className="flex items-center gap-4 pl-6">
                {/* Mobile Toggle inside TopBar */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden h-10 w-10 text-muted-foreground"
                >
                    <Search className="w-5 h-5" /> {/* Placeholder for mobile menu button if needed, but the user wants 100% width and breadcrumbs */}
                </Button>

                <nav className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <span>{breadcrumb.parent}</span>
                    <span className="opacity-40">/</span>
                    <span className="text-foreground">{breadcrumb.child}</span>
                </nav>
            </div>

            {/* Center: Smart Search - Centered and constrained */}
            <div className="flex-1 flex justify-center px-4">
                <div className="relative group w-full max-w-[520px] mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscador inteligente..."
                        className="w-full h-10 pl-11 pr-24 bg-muted border border-primary/10 rounded-xl text-sm font-medium text-foreground placeholder:text-muted-foreground focus:bg-surface focus:border-primary/20 focus:outline-none transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 bg-surface border border-border rounded-lg text-[10px] font-medium text-muted-foreground pointer-events-none">
                        CTRL + K
                    </div>
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 pr-6">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <HelpCircle className="w-5 h-5" />
                </Button>

                <div className="relative">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <Bell className="w-5 h-5" />
                    </Button>
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-surface" />
                </div>

                <div className="h-5 w-px bg-border mx-2" />

                <ThemeToggle />
            </div>
        </header>
    );
}
