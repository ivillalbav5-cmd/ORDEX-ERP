"use client";

import {
    Search,
    Bell,
    Menu,
    ChevronDown
} from 'lucide-react';
import { ThemeToggle } from "@/components/theme-toggle";

interface NavbarProps {
    onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
    return (
        <header className="sticky top-0 z-40 w-full bg-card/80 px-8 h-20 flex items-center border-b border-border/50 backdrop-blur-md transition-all duration-300">
            <div className="flex items-center justify-between gap-4 w-full">
                {/* Left Section: Mobile Menu & Search */}
                <div className="flex items-center gap-4 flex-1">
                    <button
                        className="md:hidden p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary active:scale-95 transition-all"
                        onClick={onMenuClick}
                    >
                        <Menu className="h-5 w-5" />
                    </button>

                    {/* Smart Search Trigger */}
                    {/* Smart Search Trigger */}
                    <button
                        className="hidden md:flex items-center gap-3 w-full max-w-md px-4 py-2.5 rounded-xl bg-primary/5 hover:bg-primary/10 border border-transparent transition-all group text-left"
                        onClick={() => alert("Smart Search Modal (Por Módulo) se abriría aquí")}
                    >
                        <Search className="h-4.5 w-4.5 text-primary transition-colors" />
                        <span className="text-sm font-medium text-primary/50 group-hover:text-primary transition-colors flex-1">Buscar en módulos...</span>
                        <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded bg-background/50 border border-primary/10 px-2 font-mono text-[10px] font-bold text-primary/70">
                            <span>⌘</span>K
                        </kbd>
                    </button>
                </div>

                {/* Right Section: Actions & Profile */}
                <div className="flex items-center gap-3 sm:gap-4">
                    {/* Theme Toggle Switch */}
                    <div className="hidden sm:block">
                        <ThemeToggle />
                    </div>

                    {/* Notifications */}
                    <button className="relative p-2.5 rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-200">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-card animate-pulse"></span>
                    </button>

                    <div className="h-8 w-[1px] bg-border/60 hidden sm:block"></div>

                    {/* Profile Dropdown */}
                    <button className="flex items-center gap-3 pl-1 pr-2 py-1 rounded-full hover:bg-primary/10 border border-transparent transition-all duration-200 group">
                        <div className="h-9 w-9 rounded-full bg-sutil flex items-center justify-center text-primary font-bold text-xs group-hover:scale-105 transition-transform duration-300">
                            AU
                        </div>
                        <div className="hidden md:flex flex-col items-start pr-2">
                            <span className="text-sm font-bold text-foreground leading-none group-hover:text-primary transition-colors">Administrador</span>
                            <span className="text-[10px] text-muted-foreground font-medium mt-1 group-hover:text-primary/80 transition-colors">admin@ordex.com</span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200 hidden md:block" />
                    </button>
                </div>
            </div>
        </header>
    );
}
