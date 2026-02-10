"use client";

import * as React from "react";
import { Search, Filter, Download, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface OrdexColumn<T> {
    key: string;
    header: string;
    render?: (row: T) => React.ReactNode;
    className?: string;
    isAmount?: boolean;
}

export interface OrdexTableProps<T> {
    title: string;
    icon?: React.ElementType;
    data: T[];
    columns: OrdexColumn<T>[];
    searchTerm?: string;
    onSearchChange?: (value: string) => void;

    // Selection
    selectedRows?: string[];
    onSelectRow?: (id: string, checked: boolean) => void;
    onSelectAll?: (checked: boolean) => void;

    // Sorting
    sortConfig?: { key: keyof T; direction: 'asc' | 'desc' } | null;
    onSort?: (key: keyof T) => void;

    // Footer
    totals?: { label: string; value: string; className?: string }[];

    // Pagination (existing)
    onFilterClick?: () => void;
    onExportClick?: () => void;
    totalSummaryLabel?: string;
    totalSummaryValue?: string | number;
    resultsCount?: number;
    totalResults?: number;
    className?: string;
}

export function OrdexTable<T extends { id: string | number }>({
    title,
    icon: Icon,
    data,
    columns,
    searchTerm,
    onSearchChange,
    onFilterClick,
    onExportClick,

    // Selection
    selectedRows,
    onSelectRow,
    onSelectAll,

    // Sorting
    sortConfig,
    onSort,

    // Footer
    totals, // Now expects Record<string, string> or similar map for column-aligned totals

    totalSummaryLabel = "Total",
    totalSummaryValue,
    resultsCount = 0,
    totalResults = 0,
    className,
}: OrdexTableProps<T> & { totals?: Record<string, string | { value: string; className?: string }> }) {
    return (
        <Card className={cn("rounded-[16px] border-border shadow-none overflow-hidden bg-card", className)}>
            {/* Actionable Header */}
            <div className="flex flex-col md:flex-row items-center justify-between p-4 gap-4 bg-card">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    {Icon && (
                        <div className="bg-primary/5 dark:bg-primary/10 p-2.5 rounded-lg">
                            <Icon className="h-5 w-5 text-primary opacity-100" />
                        </div>
                    )}
                    <h3 className="font-display font-bold text-foreground text-base tracking-tight">
                        {title}
                    </h3>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-[320px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                        <Input
                            placeholder="Buscar un dato"
                            className="pl-9 h-11 min-h-[44px] rounded-xl border-border bg-background dark:bg-muted/10 font-inter focus-visible:ring-1 focus-visible:ring-primary"
                            value={searchTerm}
                            onChange={(e) => onSearchChange?.(e.target.value)}
                        />
                    </div>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={onFilterClick}
                        className="h-11 px-4 font-inter font-semibold border-border text-foreground hover:bg-muted/50 shadow-none"
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        Filtro
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={onExportClick}
                        className="h-11 px-4 font-inter font-semibold border-border text-foreground hover:bg-muted/50 shadow-none"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Exportar
                    </Button>
                </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
                <Table className="border-none rounded-none w-full">
                    <TableHeader>
                        <TableRow className="border-b-border hover:bg-transparent">
                            {/* Selection Checkbox Header */}
                            {onSelectAll && (
                                <TableHead className="h-12 w-[50px] px-6 bg-primary/10 border-none">
                                    <Checkbox
                                        checked={selectedRows?.length === data.length && data.length > 0}
                                        onCheckedChange={(checked) => onSelectAll(checked as boolean)}
                                        aria-label="Select all"
                                    />
                                </TableHead>
                            )}

                            {columns.map((column) => (
                                <TableHead
                                    key={column.key as string}
                                    className={cn(
                                        "h-12 px-6 bg-primary/10 text-muted-foreground font-inter font-bold text-[13px] uppercase tracking-wider border-none",
                                        onSort && "cursor-pointer hover:text-foreground hover:bg-primary/20 transition-colors select-none",
                                        column.isAmount && "text-right",
                                        column.className
                                    )}
                                    onClick={() => onSort?.(column.key as keyof T)}
                                >
                                    <div className={cn("flex items-center gap-2", column.isAmount && "justify-end")}>
                                        {column.header}
                                        {onSort && sortConfig?.key === column.key && (
                                            sortConfig.direction === 'asc'
                                                ? <ChevronLeft className="h-3 w-3 rotate-90" />
                                                : <ChevronLeft className="h-3 w-3 -rotate-90" />
                                        )}
                                    </div>
                                </TableHead>
                            ))}
                            <TableHead className="h-12 bg-primary/10 border-none" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.id}
                                className={cn(
                                    "group border-b-border bg-card hover:bg-muted/50 transition-colors",
                                    selectedRows?.includes(String(row.id)) && "bg-muted/50"
                                )}
                            >
                                {/* Selection Checkbox Row */}
                                {onSelectRow && (
                                    <TableCell className="px-6 py-4 border-none w-[50px]">
                                        <Checkbox
                                            checked={selectedRows?.includes(String(row.id))}
                                            onCheckedChange={(checked) => onSelectRow(String(row.id), checked as boolean)}
                                            aria-label={`Select row ${row.id}`}
                                        />
                                    </TableCell>
                                )}

                                {columns.map((column) => (
                                    <TableCell
                                        key={`${row.id}-${String(column.key)}`}
                                        className={cn(
                                            "px-6 py-4 font-inter text-[14px] text-foreground border-none",
                                            column.isAmount && "text-right font-bold",
                                            column.className
                                        )}
                                    >
                                        {column.render ? column.render(row) : (row as any)[column.key]}
                                    </TableCell>
                                ))}
                                <TableCell className="px-6 py-4 text-right border-none">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-black/5 dark:hover:bg-white/5">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="rounded-xl border-border">
                                            <DropdownMenuItem className="rounded-lg">Editar</DropdownMenuItem>
                                            <DropdownMenuItem className="rounded-lg">Duplicar</DropdownMenuItem>
                                            <DropdownMenuItem className="rounded-lg text-red-600">Eliminar</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    {(totalSummaryValue !== undefined || totals) && (
                        <TableFooter className="bg-primary/10 mt-auto border-t-0">
                            <TableRow className="hover:bg-transparent border-none">
                                <TableCell
                                    colSpan={onSelectAll ? 2 : 1}
                                    className="px-6 py-4 border-none"
                                >
                                    <span className="font-bold font-inter text-foreground uppercase tracking-wider text-xs">Total</span>
                                </TableCell>

                                {columns.slice(1).map((column) => {
                                    const totalData = totals?.[column.key as string];
                                    const value = typeof totalData === 'object' ? totalData.value : totalData;
                                    const className = typeof totalData === 'object' ? totalData.className : undefined;

                                    return (
                                        <TableCell key={`total-${column.key}`} className={cn("px-6 py-4 border-none", column.isAmount && "text-right")}>
                                            {value && (
                                                <span className={cn("font-bold font-inter text-sm", className || "text-foreground")}>{value}</span>
                                            )}
                                        </TableCell>
                                    );
                                })}

                                <TableCell className="border-none" />
                            </TableRow>
                        </TableFooter>
                    )}
                </Table>
            </div>

            {/* Footer Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-border bg-card gap-4">
                <div className="text-[13px] font-inter text-muted-foreground font-medium">
                    Mostrando <span className="text-foreground font-bold">{resultsCount}</span> de <span className="text-foreground font-bold">{totalResults}</span> resultados
                </div>

                <div className="flex items-center gap-1.5">
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-lg border-border hover:bg-muted"
                        disabled
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-1">
                        <Button variant="secondary" size="sm" className="h-8 w-8 p-0 rounded-lg bg-secondary text-secondary-foreground font-bold font-inter text-xs shadow-none">1</Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg font-inter text-xs text-muted-foreground">2</Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg font-inter text-xs text-muted-foreground">3</Button>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-lg border-border hover:bg-muted"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </Card>
    );
}
