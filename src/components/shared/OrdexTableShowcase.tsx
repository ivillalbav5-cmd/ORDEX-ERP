"use client";

import * as React from "react";
import { OrdexTable, OrdexColumn } from "./OrdexTable";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

interface InvoiceData {
    id: string;
    invoice: string;
    concept: string;
    state: "success" | "warning" | "info" | "neutral";
    date: string;
    income: number;
    expense: number;
    balance: number;
}

const INVOICE_DATA: InvoiceData[] = [
    { id: "1", invoice: "INV-001", concept: "Suscripción Mensual Cloud", state: "success", date: "24 FEB 2026", income: 15000, expense: 2500, balance: 12500 },
    { id: "2", invoice: "INV-002", concept: "Mantenimiento Servidores", state: "info", date: "22 FEB 2026", income: 0, expense: 8200.50, balance: -8200.50 },
    { id: "3", invoice: "INV-003", concept: "Licencia Anual ERP", state: "warning", date: "15 FEB 2026", income: 45000, expense: 0, balance: 45000 },
    { id: "4", invoice: "INV-004", concept: "Consultoría IT", state: "neutral", date: "10 FEB 2026", income: 15000, expense: 0, balance: 15000 },
    { id: "5", invoice: "INV-005", concept: "Soporte Técnico Especializado", state: "success", date: "05 FEB 2026", income: 5500, expense: 0, balance: 5500 },
];

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount);
};

const COLUMNS: OrdexColumn<InvoiceData>[] = [
    { key: "invoice", header: "Factura" },
    { key: "concept", header: "Concepto" },
    {
        key: "state",
        header: "Estado",
        render: (row) => (
            <Badge variant={row.state} className="rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                {row.state === "success" ? "Pagado" : row.state === "warning" ? "Pendiente" : row.state === "info" ? "En Proceso" : "Cancelado"}
            </Badge>
        )
    },
    { key: "date", header: "Fecha" },
    {
        key: "income",
        header: "Ingreso",
        isAmount: true,
        render: (row) => <span className="text-emerald-600 dark:text-emerald-400">{formatCurrency(row.income)}</span>
    },
    {
        key: "expense",
        header: "Gasto",
        isAmount: true,
        render: (row) => <span className="text-rose-600 dark:text-rose-400">{formatCurrency(row.expense)}</span>
    },
    {
        key: "balance",
        header: "Saldo",
        isAmount: true,
        render: (row) => <span className={row.balance >= 0 ? "text-foreground" : "text-rose-500"}>{formatCurrency(row.balance)}</span>
    },
];

export function OrdexTableShowcase() {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
    const [sortConfig, setSortConfig] = React.useState<{ key: keyof InvoiceData; direction: 'asc' | 'desc' } | null>(null);

    // Filter
    const filteredData = React.useMemo(() => {
        return INVOICE_DATA.filter(item =>
            item.invoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.concept.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    // Sort
    const sortedData = React.useMemo(() => {
        if (!sortConfig) return filteredData;
        return [...filteredData].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortConfig]);

    // Selection
    const handleSelectRow = (id: string, checked: boolean) => {
        if (checked) {
            setSelectedRows(prev => [...prev, id]);
        } else {
            setSelectedRows(prev => prev.filter(rowId => rowId !== id));
        }
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedRows(sortedData.map(row => row.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSort = (key: keyof InvoiceData) => {
        setSortConfig(current => {
            if (current?.key === key) {
                return current.direction === 'asc' ? { key, direction: 'desc' } : null;
            }
            return { key, direction: 'asc' };
        });
    };

    // Totals
    const totals = React.useMemo(() => {
        const income = sortedData.reduce((acc, curr) => acc + curr.income, 0);
        const expense = sortedData.reduce((acc, curr) => acc + curr.expense, 0);
        const balance = sortedData.reduce((acc, curr) => acc + curr.balance, 0);

        return {
            income: { value: formatCurrency(income), className: "text-emerald-600 dark:text-emerald-400" },
            expense: { value: formatCurrency(expense), className: "text-rose-600 dark:text-rose-400" },
            balance: { value: formatCurrency(balance), className: "text-foreground" }
        };
    }, [sortedData]);

    return (
        <div className="w-full">
            <OrdexTable
                title="Gestión de Facturación"
                icon={FileText}
                data={sortedData}
                columns={COLUMNS}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}

                // Selection
                selectedRows={selectedRows}
                onSelectRow={handleSelectRow}
                onSelectAll={handleSelectAll}

                // Sorting
                sortConfig={sortConfig}
                onSort={handleSort}

                // Totals
                totals={totals}

                resultsCount={sortedData.length}
                totalResults={INVOICE_DATA.length}
            />
        </div>
    );
}
