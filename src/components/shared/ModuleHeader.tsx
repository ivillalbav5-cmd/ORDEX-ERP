import * as React from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Breadcrumb,
    BreadcrumbItem as BreadcrumbItemUI,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface ModuleHeaderProps {
    title: string;
    description?: string;
    breadcrumbs?: BreadcrumbItem[];
    actions?: React.ReactNode;
    className?: string;
}

export function ModuleHeader({
    title,
    description,
    breadcrumbs = [],
    actions,
    className,
}: ModuleHeaderProps) {
    return (
        <div className={cn("space-y-4 mb-8", className)}>
            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
                <Breadcrumb className="animate-in fade-in slide-in-from-left-4 duration-500">
                    <BreadcrumbList>
                        <BreadcrumbItemUI>
                            <BreadcrumbLink asChild>
                                <Link href="/dashboard">
                                    <Home className="h-4 w-4" />
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItemUI>
                        {breadcrumbs.map((item, index) => (
                            <React.Fragment key={index}>
                                <BreadcrumbSeparator />
                                <BreadcrumbItemUI>
                                    {item.href ? (
                                        <BreadcrumbLink asChild>
                                            <Link href={item.href}>{item.label}</Link>
                                        </BreadcrumbLink>
                                    ) : (
                                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                    )}
                                </BreadcrumbItemUI>
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            )}

            {/* Title & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-100">
                <div className="space-y-1.5">
                    <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                    {description && (
                        <p className="text-muted-foreground text-lg">
                            {description}
                        </p>
                    )}
                </div>
                {actions && <div className="flex items-center gap-3">{actions}</div>}
            </div>
        </div>
    );
}
