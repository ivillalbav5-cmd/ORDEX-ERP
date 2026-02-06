"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
            <ol className="flex items-center gap-1.5 sm:gap-2.5">
                <li className="flex items-center">
                    <Link
                        href="/dashboard"
                        className="text-primary/40 hover:text-brand transition-colors p-1"
                    >
                        <Home className="w-3.5 h-3.5" />
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-1.5 sm:gap-2.5">
                        <ChevronRight className="w-3.5 h-3.5 text-primary/20 shrink-0" />
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="text-[10px] sm:text-xs font-medium text-primary/40 hover:text-brand transition-colors uppercase tracking-widest whitespace-nowrap"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-widest whitespace-nowrap">
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
