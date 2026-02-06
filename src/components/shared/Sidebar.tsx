"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Layers, LucideIcon, LayoutDashboard, Users, Settings, Package, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface SidebarSubItem {
    label: string;
    href: string;
}

interface SidebarItemProps {
    label: string;
    icon: LucideIcon;
    href?: string;
    subItems?: SidebarSubItem[];
    collapsed?: boolean;
}

export function SidebarItem({
    label,
    icon: Icon,
    href,
    subItems,
    collapsed,
}: SidebarItemProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);

    const isActive = href ? pathname === href : subItems?.some(item => pathname === item.href);

    // Auto-open if any sub-item is active
    React.useEffect(() => {
        if (subItems?.some(item => pathname === item.href)) {
            setIsOpen(true);
        }
    }, [pathname, subItems]);

    if (collapsed) {
        return (
            <div className="group relative flex flex-col items-center">
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "h-12 w-12 rounded-xl text-sidebar-foreground hover:bg-muted transition-all",
                        isActive && "bg-sidebar-active text-sidebar-active-foreground"
                    )}
                >
                    <Icon className="w-5 h-5" />
                </Button>
                <span className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-surface text-foreground text-xs font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-border">
                    {label}
                </span>
            </div>
        );
    }

    if (!subItems) {
        return (
            <Link href={href || "#"}>
                <div
                    className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground hover:bg-muted transition-all cursor-pointer",
                        isActive && "bg-sidebar-active text-sidebar-active-foreground"
                    )}
                >
                    <Icon className={cn("w-5 h-5", isActive && "text-sidebar-active-foreground")} />
                    <span className="text-sm font-medium">{label}</span>
                </div>
            </Link>
        );
    }

    return (
        <div className="space-y-1">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sidebar-foreground hover:bg-muted transition-all cursor-pointer",
                    isActive && "bg-sidebar-active text-sidebar-active-foreground"
                )}
            >
                <div className="flex items-center gap-3">
                    <Icon className={cn("w-5 h-5", isActive && "text-sidebar-active-foreground")} />
                    <span className="text-sm font-medium">{label}</span>
                </div>
                <ChevronDown
                    className={cn(
                        "w-4 h-4 transition-transform duration-200 opacity-50",
                        isOpen && "rotate-180"
                    )}
                />
            </div>

            {isOpen && (
                <div className="ml-4 pl-4 border-l border-border space-y-1">
                    {subItems.map((item) => {
                        const isSubActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href}>
                                <div
                                    className={cn(
                                        "px-4 py-2.5 rounded-lg text-sm transition-all cursor-pointer",
                                        isSubActive
                                            ? "text-sidebar-active-foreground font-medium bg-sidebar-active"
                                            : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-muted"
                                    )}
                                >
                                    {item.label}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
    return (
        <aside
            className={cn(
                "fixed left-0 top-0 h-full flex flex-col transition-all duration-300 z-50 border-r border-border",
                "bg-sidebar text-sidebar-foreground",
                collapsed ? "w-20" : "w-64"
            )}
        >
            {/* Brand Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-border">
                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                            <Layers className="w-4 h-4 text-accent-foreground" />
                        </div>
                        <span className="text-lg font-bold text-foreground">ORDEX</span>
                    </div>
                )}
                {collapsed && (
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mx-auto">
                        <Layers className="w-4 h-4 text-accent-foreground" />
                    </div>
                )}
                {!collapsed && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onToggle}
                        className="h-8 w-8 rounded-lg"
                    >
                        <Menu className="w-4 h-4" />
                    </Button>
                )}
            </div>

            {/* Navigation */}
            <div className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-hide">
                <SidebarItem
                    label="Dashboard"
                    icon={LayoutDashboard}
                    href="/dashboard"
                    collapsed={collapsed}
                />
                <SidebarItem
                    label="Clientes"
                    icon={Users}
                    collapsed={collapsed}
                    subItems={[
                        { label: "Resumen", href: "/clientes/resumen" },
                        { label: "Listar", href: "/clientes/listado" },
                        { label: "Gestiones", href: "/clientes/gestiones" },
                        { label: "Configurar", href: "/clientes/configurar" },
                    ]}
                />
                <SidebarItem
                    label="Productos"
                    icon={Package}
                    collapsed={collapsed}
                    subItems={[
                        { label: "Inventario", href: "/productos/inventario" },
                        { label: "Categorías", href: "/productos/categorias" },
                    ]}
                />
                <SidebarItem
                    label="Configuración"
                    icon={Settings}
                    href="/configuracion"
                    collapsed={collapsed}
                />
            </div>

            {/* User Profile Footer */}
            <div className="p-3 border-t border-border">
                <div className={cn(
                    "flex items-center gap-3 p-2 rounded-xl hover:bg-muted transition-all cursor-pointer",
                    collapsed ? "justify-center" : "justify-start"
                )}>
                    <div className="relative">
                        <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-semibold text-sm">
                            NV
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-sidebar rounded-full" />
                    </div>
                    {!collapsed && (
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-medium truncate text-foreground">Nacho Villalba</span>
                            <span className="text-xs text-muted-foreground">Administrador</span>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
