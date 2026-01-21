"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  AlertCircle,
  MoreHorizontal,
  ChevronDown,
  Briefcase,
  Tags,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  Clock
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { PageHeader } from '@/components/page-header';

const salesData = [
  { name: 'Ene', ars: 4.2, eur: 2.4 },
  { name: 'Feb', ars: 3.5, eur: 1.8 },
  { name: 'Mar', ars: 5.1, eur: 3.2 },
  { name: 'Abr', ars: 4.8, eur: 2.9 },
  { name: 'May', ars: 5.9, eur: 3.8 },
  { name: 'Jun', ars: 6.2, eur: 4.1 },
  { name: 'Jul', ars: 7.5, eur: 4.8 },
];

const recentOrders = [
  { id: 'ORD-001', client: 'Empresa A', status: 'Entregado', amount: '$ 125k', date: 'Hace 2h' },
  { id: 'ORD-002', client: 'Tech Solutions', status: 'Pendiente', amount: '$ 54k', date: 'Hace 5h' },
  { id: 'ORD-003', client: 'Global Corp', status: 'Proceso', amount: '$ 230k', date: 'Ayer' },
  { id: 'ORD-004', client: 'Retail S.A.', status: 'Entregado', amount: '$ 89k', date: 'Ayer' },
  { id: 'ORD-005', client: 'Consulting Grp', status: 'Pendiente', amount: '$ 12k', date: '20 Ene' },
];

export default function Dashboard() {
  const [currency, setCurrency] = useState<'ARS' | 'USD'>('ARS');

  return (
    <div className="space-y-8 font-sans">
      {/* Page Header */}
      <PageHeader
        title="Resumen del Dashboard"
        description="Esto es lo que está pasando con tu negocio hoy."
      />

      {/* KPI Cards Row 1 (4 Columns) */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

        {/* 1. Ventas Totales (Con Filtro) */}
        <div className="relative rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border transition-all hover:shadow-lg hover:-translate-y-1 group min-h-[160px] flex flex-col justify-end">
          {/* Icon Top-Left */}
          <div className="absolute top-6 left-6 p-2.5 rounded-[12px] bg-primary/10 text-primary transition-colors">
            <TrendingUp size={18} />
          </div>
          {/* Filter Top-Right */}
          <button className="absolute top-6 right-6 flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors bg-primary/10 hover:bg-primary/20 px-2.5 py-1.5 rounded-xl">
            Último Mes
            <ChevronDown size={14} />
          </button>

          <div className="mt-12">
            <p className="text-sm font-bold text-muted-foreground mb-1">Ventas Totales</p>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-extrabold text-foreground tracking-tight font-heading">$ 45.2M</h3>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400">
                <ArrowUpRight className="h-3 w-3" />
                +12.5%
              </div>
            </div>
          </div>
        </div>

        {/* 2. Total Clientes (Boton Ir a Clientes) */}
        <div className="relative rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border transition-all hover:shadow-lg hover:-translate-y-1 group min-h-[160px] flex flex-col justify-end">
          <div className="absolute top-6 left-6 p-2.5 rounded-[12px] bg-primary/10 text-primary transition-colors">
            <Users size={18} />
          </div>
          <Link href="/clients" className="absolute top-6 right-6 flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors bg-primary/10 hover:bg-primary/20 px-2.5 py-1.5 rounded-xl">
            Ir a Clientes
            <ArrowRight size={14} />
          </Link>

          <div className="mt-12">
            <p className="text-sm font-bold text-muted-foreground mb-1">Total Clientes</p>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-extrabold text-foreground tracking-tight font-heading">1,234</h3>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400">
                <ArrowUpRight className="h-3 w-3" />
                +8.2%
              </div>
            </div>
          </div>
        </div>

        {/* 3. Total Comerciales (Sin Filtro - Agregado Filtro "Todos" por consistencia visual/espacio) */}
        <div className="relative rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border transition-all hover:shadow-lg hover:-translate-y-1 group min-h-[160px] flex flex-col justify-end">
          <div className="absolute top-6 left-6 p-2.5 rounded-[12px] bg-primary/10 text-primary transition-colors">
            <Briefcase size={18} />
          </div>
          {/* Visual balance: filter implies "active" commercials */}
          <button className="absolute top-6 right-6 flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors bg-primary/10 hover:bg-primary/20 px-2.5 py-1.5 rounded-xl">
            Activos
            <ChevronDown size={14} />
          </button>

          <div className="mt-12">
            <p className="text-sm font-bold text-muted-foreground mb-1">Total Comerciales</p>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-extrabold text-foreground tracking-tight font-heading">24</h3>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                +4 este mes
              </div>
            </div>
          </div>
        </div>

        {/* 4. Gastos Totales (Con Filtro) */}
        <div className="relative rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border transition-all hover:shadow-lg hover:-translate-y-1 group min-h-[160px] flex flex-col justify-end">
          <div className="absolute top-6 left-6 p-2.5 rounded-[12px] bg-primary/10 text-primary transition-colors">
            <CreditCard size={18} />
          </div>
          <button className="absolute top-6 right-6 flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors bg-primary/10 hover:bg-primary/20 px-2.5 py-1.5 rounded-xl">
            Último Mes
            <ChevronDown size={14} />
          </button>

          <div className="mt-12">
            <p className="text-sm font-bold text-muted-foreground mb-1">Gastos Totales</p>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-extrabold text-foreground tracking-tight font-heading">$ 12.8M</h3>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400">
                <ArrowDownRight className="h-3 w-3" />
                -2.4%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Chart & Recent Orders */}
      <div className="grid gap-6 lg:grid-cols-3 h-[450px]">
        {/* Sales Performance Chart (70% approx) */}
        <div className="lg:col-span-2 rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-foreground tracking-tight font-heading">Rendimiento de Ventas</h2>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors bg-primary/10 hover:bg-primary/20 px-2.5 py-1.5 rounded-xl">
              Este Año
              <ChevronDown size={14} />
            </button>
          </div>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorArs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2c8fd1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2c8fd1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }} dy={10} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }}
                  tickFormatter={(value) => `$${value}M`}
                />
                <CartesianGrid vertical={false} stroke="#E5E7EB" strokeDasharray="4 4" strokeOpacity={0.5} />
                <Tooltip
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px 16px', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
                  itemStyle={{ fontSize: '13px', fontWeight: 'bold' }}
                  formatter={(value) => [`$ ${value}M`, 'Monto']}
                />
                <Area type="monotone" dataKey="ars" stroke="#2c8fd1" strokeWidth={3} fillOpacity={1} fill="url(#colorArs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders List (30% approx) */}
        <div className="col-span-1 rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border flex flex-col h-full bg-gradient-to-b from-card to-secondary/10 relative">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground tracking-tight font-heading">Últimas Órdenes</h2>
            <Link href="/orders" className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors bg-primary/10 hover:bg-primary/20 px-2.5 py-1.5 rounded-xl">
              Ir a Órdenes
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {recentOrders.map((order) => (
              <div key={order.id} className="group flex items-center justify-between p-3 rounded-xl bg-background border border-border/50 hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${order.status === 'Entregado' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                    order.status === 'Pendiente' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                    }`}>
                    {order.status === 'Entregado' ? <CheckCircle2 size={18} /> :
                      order.status === 'Pendiente' ? <Clock size={18} /> : <Package size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{order.client}</p>
                    <p className="text-[11px] text-muted-foreground font-medium">{order.id} • {order.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{order.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
}
