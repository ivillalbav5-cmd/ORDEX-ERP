"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="h-9 w-20 rounded-full bg-secondary/50 animate-pulse"></div>
        );
    }

    return (
        <div className="flex items-center gap-1 p-1 rounded-full bg-primary/10 border border-transparent">
            <button
                onClick={() => setTheme("light")}
                className={`
                    relative flex items-center justify-center p-1.5 rounded-full transition-all duration-300
                    ${theme === 'light' ? 'bg-background text-yellow-500 shadow-sm ring-1 ring-border/50' : 'text-muted-foreground hover:text-foreground'}
                `}
                aria-label="Light Mode"
            >
                <Sun className="h-4 w-4" />
            </button>
            <button
                onClick={() => setTheme("dark")}
                className={`
                    relative flex items-center justify-center p-1.5 rounded-full transition-all duration-300
                    ${theme === 'dark' ? 'bg-background text-blue-400 shadow-sm ring-1 ring-border/50' : 'text-muted-foreground hover:text-foreground'}
                `}
                aria-label="Dark Mode"
            >
                <Moon className="h-4 w-4" />
            </button>
        </div>
    );
}
