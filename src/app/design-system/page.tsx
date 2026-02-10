"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { ComponentPlayground } from "@/components/shared/ComponentPlayground";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Layers,
    Type,
    Layout,
    MousePointer2,
    FormInput,
    Settings2,
    AlertCircle,
    Home,
    CheckCircle2,
    Paintbrush,
    BarChart3,
    Tag,
    Command as CommandIcon,
    Bell,
    CreditCard,
    DollarSign,
    User,
    Search,
    Table as TableIcon,
    Eye,
    EyeOff,
    Hash,
    Mail,
    Check,
    Loader2,
    Pencil,
    PlusCircle,
    X
} from "lucide-react";
import { KPICard } from "@/components/ui/KPICard";
import { AreaChart } from "@/components/charts/AreaChart";
import { BarChart } from "@/components/charts/BarChart";
import { PieChart } from "@/components/charts/PieChart";
import { RadarChart } from "@/components/charts/RadarChart";
import { ModuleHeader } from "@/components/shared/ModuleHeader";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/Skeleton";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays } from "date-fns";
import { Textarea } from "@/components/ui/Textarea";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { TagInput } from "@/components/ui/TagInput";
import { FileUpload } from "@/components/ui/FileUpload";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Chip } from "@/components/ui/Chip";
import { DialogButton } from "@/components/ui/DialogButton";
import { DialogFooter } from "@/components/ui/dialog";
import { FormGroup } from "@/components/ui/FormGroup";

import { OrdexTableShowcase } from "@/components/shared/OrdexTableShowcase";

const chartData = [
    { name: "Jan", total: 1200, sales: 900 },
    { name: "Feb", total: 2100, sales: 1400 },
    { name: "Mar", total: 1800, sales: 1200 },
    { name: "Apr", total: 2400, sales: 1800 },
    { name: "May", total: 3200, sales: 2400 },
    { name: "Jun", total: 2800, sales: 2100 },
];
const pieData = [
    { name: "Direct", value: 400 },
    { name: "Referral", value: 300 },
    { name: "Social", value: 300 },
    { name: "Organic", value: 200 },
];
const radarData = [
    { subject: 'Math', A: 120, fullMark: 150 },
    { subject: 'Chinese', A: 98, fullMark: 150 },
    { subject: 'English', A: 86, fullMark: 150 },
    { subject: 'Geography', A: 99, fullMark: 150 },
    { subject: 'Physics', A: 85, fullMark: 150 },
    { subject: 'History', A: 65, fullMark: 150 },
];

type Category = "Basic" | "Forms" | "KPIs" | "Charts" | "Navigation" | "Feedback" | "TableSuite" | "ChipsBadges";

export default function DesignSystemPage() {
    return (
        <React.Suspense fallback={<div className="p-10">Loading Canvas...</div>}>
            <DesignSystemContent />
        </React.Suspense>
    );
}

function DesignSystemContent() {
    const searchParams = useSearchParams();
    const catParam = searchParams.get("cat") as Category;
    const [activeCategory, setActiveCategory] = React.useState<Category>("Basic");

    React.useEffect(() => {
        if (catParam) {
            // Decode the parameter to handle spaces and special characters like &
            const decodedCat = decodeURIComponent(catParam) as Category;
            setActiveCategory(decodedCat);
        }
    }, [catParam]);

    // Button Props
    const [btnVariant, setBtnVariant] = React.useState<"default" | "secondary" | "outline" | "ghost">("default");
    const [btnSize, setBtnSize] = React.useState<"default" | "sm" | "lg" | "icon">("default");
    const [btnDisabled, setBtnDisabled] = React.useState(false);

    // Input Props
    const [inputDisabled, setInputDisabled] = React.useState(false);
    const [inputType, setInputType] = React.useState("text");
    const [showPassword, setShowPassword] = React.useState(false);
    const [phone, setPhone] = React.useState("");
    const [selectedTags, setSelectedTags] = React.useState(["ERP", "Next.js", "Tailwind"]);
    const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);

    const countries = [
        { code: "AR", label: "Argentina", flag: "🇦🇷", dial: "+54" },
        { code: "US", label: "United States", flag: "🇺🇸", dial: "+1" },
        { code: "ES", label: "Spain", flag: "🇪🇸", dial: "+34" },
        { code: "UY", label: "Uruguay", flag: "🇺🇾", dial: "+598" },
    ];

    const categories = [
        { id: "Basic" as Category, icon: Layers, label: "Basic Components", description: "Buttons, Cards, Avatars, and more." },
        { id: "Forms" as Category, icon: FormInput, label: "Form Elements", description: "Inputs, Checkboxes, Selects, and Pickers." },
        { id: "KPIs" as Category, icon: BarChart3, label: "KPIs", description: "Key performance indicators and metrics." },
        { id: "Charts" as Category, icon: Paintbrush, label: "Charts", description: "Advanced data visualization." },
        { id: "TableSuite" as Category, icon: TableIcon, label: "Table Suite", description: "Advanced table variants and layers." },
        { id: "Navigation" as Category, icon: Layout, label: "Navigation", description: "Tabs, Pagination, and Headers." },
        { id: "ChipsBadges" as Category, icon: Tag, label: "Chips & Badges", description: "Interactive status and notification elements." },
        { id: "Feedback" as Category, icon: AlertCircle, label: "Feedback & Overlay", description: "Dialogs, Tooltips, Skeletons, and Spinners." },
    ];

    return (
        <div className="min-h-full bg-surface py-6 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Compact Header (No Back Button) */}
                    <div className="flex items-center justify-between border-b pb-4 border-border/50 sticky top-0 bg-surface/80 backdrop-blur-md z-40 -mx-2 px-2">
                        <div className="flex items-center gap-4">
                            <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground font-display">
                                {categories.find(c => c.id === activeCategory)?.label}
                            </h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-6 w-px bg-border mx-2" />
                            <span className="text-[10px] font-mono text-muted-foreground opacity-50">ORDEX DS v2.0</span>
                        </div>
                    </div>

                    {/* Rendering Category Content */}
                    {activeCategory === "Basic" && (
                        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <section id="buttons">
                                <ComponentPlayground
                                    title="Action Buttons"
                                    description="Primary, Secondary, Outline, and Ghost actions with refined aesthetics."
                                    component={
                                        <div className="space-y-8 w-full">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                {/* Primary */}
                                                <div className="space-y-3">
                                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Primary (Navy)</p>
                                                    <div className="flex flex-wrap gap-4 items-center">
                                                        <Button>Primary Default</Button>
                                                        <Button className="bg-btn-primary-hover">Hover State</Button>
                                                        <Button disabled>Disabled</Button>
                                                    </div>
                                                </div>

                                                {/* Secondary */}
                                                <div className="space-y-3">
                                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Secondary (Gray/Blue)</p>
                                                    <div className="flex flex-wrap gap-4 items-center">
                                                        <Button variant="secondary">Secondary Default</Button>
                                                        <Button variant="secondary" className="bg-btn-secondary-hover">Hover State</Button>
                                                        <Button variant="secondary" disabled>Disabled</Button>
                                                    </div>
                                                </div>

                                                {/* Outline */}
                                                <div className="space-y-3">
                                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Outline</p>
                                                    <div className="flex flex-wrap gap-4 items-center">
                                                        <Button variant="outline">Outline Default</Button>
                                                        <Button variant="outline" className="bg-btn-secondary">Hover State</Button>
                                                        <Button variant="outline" disabled>Disabled</Button>
                                                    </div>
                                                </div>

                                                {/* Ghost */}
                                                <div className="space-y-3">
                                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Ghost</p>
                                                    <div className="flex flex-wrap gap-4 items-center">
                                                        <Button variant="ghost">Ghost Default</Button>
                                                        <Button variant="ghost" className="bg-btn-secondary">Hover State</Button>
                                                        <Button variant="ghost" disabled>Disabled</Button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-4 items-center pt-4 border-t border-border/50">
                                                <Button size="sm">Small</Button>
                                                <Button>Default Size</Button>
                                                <Button size="lg">Large (+25%)</Button>
                                                <Button variant="secondary" size="lg">Large (+25%)</Button>
                                            </div>
                                        </div>
                                    }
                                    code={`<Button>Primary</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>`}
                                    cssCode={`.button {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: var(--radius);\n  font-weight: 500;\n  transition: all 0.2s;\n}\n\n.button-lg {\n  height: 2.75rem; /* 44px */\n  padding: 0.625rem 1.5rem;\n  font-size: 1rem;\n}`}
                                />
                            </section>

                            <section id="cards">
                                <ComponentPlayground
                                    title="Premium Containers"
                                    description="Card system with variants for different use cases."
                                    component={
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                                            {/* Default Card */}
                                            <Card className="shadow-md rounded-[16px]">
                                                <CardHeader className="pb-3">
                                                    <div className="w-10 h-10 rounded-lg bg-[color-mix(in_srgb,var(--primary),transparent_90%)] flex items-center justify-center mb-2">
                                                        <Layers className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <CardTitle className="text-lg font-display">Default</CardTitle>
                                                </CardHeader>
                                                <CardContent className="text-muted-foreground text-sm font-inter">
                                                    Standard card for content display.
                                                </CardContent>
                                            </Card>

                                            {/* Interactive Card */}
                                            <Card variant="interactive" className="shadow-md rounded-[16px]">
                                                <CardHeader className="pb-3">
                                                    <div className="w-10 h-10 rounded-lg bg-[color-mix(in_srgb,var(--primary),transparent_90%)] flex items-center justify-center mb-2">
                                                        <MousePointer2 className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <CardTitle className="text-lg font-display">Interactive</CardTitle>
                                                </CardHeader>
                                                <CardContent className="text-muted-foreground text-sm font-inter">
                                                    Hover to see elevation effect.
                                                </CardContent>
                                            </Card>

                                            {/* Accent Card */}
                                            <Card variant="accent" className="shadow-md rounded-[16px]">
                                                <CardHeader className="pb-3">
                                                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-2">
                                                        <BarChart3 className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <CardTitle className="text-lg font-display">Accent</CardTitle>
                                                </CardHeader>
                                                <CardContent className="text-muted-foreground text-sm font-inter">
                                                    Highlighted content card.
                                                </CardContent>
                                            </Card>
                                        </div>
                                    }
                                    code={`<Card variant="default">...</Card>
<Card variant="interactive">...</Card>
<Card variant="accent">...</Card>`}
                                    cssCode={`.card {\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: 1rem;\n  overflow: hidden;\n}\n\n.card-interactive:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);\n}`}
                                />
                            </section>

                            <section id="avatars">
                                <ComponentPlayground
                                    title="Avatar System"
                                    description="User representation with multiple sizes and fallback states."
                                    component={
                                        <div className="space-y-6 w-full">
                                            {/* Size Showcase */}
                                            <div className="space-y-3">
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Sizes</p>
                                                <div className="flex items-end gap-4">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src="https://github.com/shadcn.png" />
                                                        <AvatarFallback className="text-xs">SM</AvatarFallback>
                                                    </Avatar>
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src="https://github.com/vercel.png" />
                                                        <AvatarFallback>MD</AvatarFallback>
                                                    </Avatar>
                                                    <Avatar className="h-14 w-14">
                                                        <AvatarImage src="https://github.com/shadcn.png" />
                                                        <AvatarFallback className="text-lg">LG</AvatarFallback>
                                                    </Avatar>
                                                    <Avatar className="h-20 w-20">
                                                        <AvatarImage src="https://github.com/vercel.png" />
                                                        <AvatarFallback className="text-2xl">XL</AvatarFallback>
                                                    </Avatar>
                                                </div>
                                            </div>

                                            {/* Fallback States */}
                                            <div className="space-y-3">
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Fallback States</p>
                                                <div className="flex items-center gap-4">
                                                    <Avatar>
                                                        <AvatarImage src="https://github.com/shadcn.png" />
                                                        <AvatarFallback>AB</AvatarFallback>
                                                    </Avatar>
                                                    <Avatar>
                                                        <AvatarFallback className="bg-primary text-primary-foreground">CD</AvatarFallback>
                                                    </Avatar>
                                                    <Avatar>
                                                        <AvatarFallback className="bg-muted">EF</AvatarFallback>
                                                    </Avatar>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    code={`<Avatar className="h-8 w-8">
  <AvatarImage src="..." />
  <AvatarFallback>SM</AvatarFallback>
</Avatar>

<Avatar className="h-14 w-14">
  <AvatarFallback className="bg-primary">LG</AvatarFallback>
</Avatar>`}
                                    cssCode={`.avatar {
  border-radius: 9999px;
  overflow: hidden;
}

.avatar-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}`}
                                />
                            </section>

                            <section id="structural">
                                <ComponentPlayground
                                    title="Layout Primitives"
                                    description="Separators and loading skeletons for UI structure."
                                    component={
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                                            {/* Separators */}
                                            <div className="space-y-4">
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-display">Separators</p>
                                                <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                                                    <div className="text-sm">Horizontal</div>
                                                    <Separator />
                                                    <div className="flex h-5 items-center space-x-4 text-sm">
                                                        <div>Home</div>
                                                        <Separator orientation="vertical" />
                                                        <div>Products</div>
                                                        <Separator orientation="vertical" />
                                                        <div>Contact</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Skeletons */}
                                            <div className="space-y-4">
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Loading Skeletons</p>
                                                <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                                                    <div className="flex items-center space-x-4">
                                                        <Skeleton className="h-12 w-12 rounded-full" />
                                                        <div className="space-y-2">
                                                            <Skeleton className="h-4 w-[200px]" />
                                                            <Skeleton className="h-3 w-[150px]" />
                                                        </div>
                                                    </div>
                                                    <Skeleton className="h-24 w-full rounded-lg" />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    code={`{/* Separator */}
<Separator />
<Separator orientation="vertical" />

{/* Skeleton */}
<Skeleton className="h-12 w-12 rounded-full" />
<Skeleton className="h-4 w-[200px]" />`}
                                    cssCode={`.separator {
  background: var(--border);
  height: 1px;
}

.skeleton {
  background: var(--muted);
  animation: pulse 2s infinite;
}`}
                                />
                            </section>

                            <section id="scroll-area">
                                <ComponentPlayground
                                    title="Scroll Container"
                                    description="Custom scrollable area with styled scrollbar."
                                    component={
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                            {/* Notification List */}
                                            <div className="space-y-3">
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Notification Panel</p>
                                                <ScrollArea className="h-64 w-full rounded-xl border bg-muted/30 p-4">
                                                    <div className="space-y-3">
                                                        {[
                                                            { title: "New Order #1234", time: "2min ago", type: "success" },
                                                            { title: "Payment Received", time: "5min ago", type: "success" },
                                                            { title: "Low Stock Alert", time: "10min ago", type: "warning" },
                                                            { title: "Customer Message", time: "15min ago", type: "info" },
                                                            { title: "Order Shipped", time: "30min ago", type: "success" },
                                                            { title: "Refund Requested", time: "1h ago", type: "error" },
                                                            { title: "New Review", time: "2h ago", type: "info" },
                                                        ].map((item, i) => (
                                                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-surface border border-border/50">
                                                                <div className={cn(
                                                                    "w-2 h-2 rounded-full",
                                                                    item.type === "success" && "bg-emerald-500",
                                                                    item.type === "warning" && "bg-amber-500",
                                                                    item.type === "error" && "bg-red-500",
                                                                    item.type === "info" && "bg-blue-500"
                                                                )} />
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-sm font-medium truncate">{item.title}</p>
                                                                    <p className="text-xs text-muted-foreground">{item.time}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </ScrollArea>
                                            </div>

                                            {/* Horizontal Scroll */}
                                            <div className="space-y-3">
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Horizontal Scroll</p>
                                                <ScrollArea className="w-full whitespace-nowrap rounded-xl border bg-muted/30">
                                                    <div className="flex w-max space-x-4 p-4">
                                                        {Array.from({ length: 8 }).map((_, i) => (
                                                            <div key={i} className="w-32 h-24 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-medium">
                                                                Card {i + 1}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </ScrollArea>
                                            </div>
                                        </div>
                                    }
                                    code={`<ScrollArea className="h-64 rounded-xl border">
  {items.map((item) => (
    <div className="p-3 rounded-lg bg-surface">
      {item.title}
    </div>
  ))}
</ScrollArea>

{/* Horizontal */}
<ScrollArea className="whitespace-nowrap">
  <div className="flex space-x-4">
    {cards}
  </div>
</ScrollArea>`}
                                    cssCode={`.scroll-area {\n  overflow: auto;\n  border-radius: 0.75rem;\n}\n\n.scrollbar::-webkit-scrollbar {\n  width: 6px;\n}\n\n.scrollbar::-webkit-scrollbar-thumb {\n  background: var(--border);\n  border-radius: 3px;\n}`}
                                />
                            </section>
                        </div>
                    )}

                    {activeCategory === "Forms" && (
                        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <section id="inputs">
                                <ComponentPlayground
                                    title="Smart Inputs"
                                    description="Form controls with refined state aesthetics and labels."
                                    component={
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                                            {/* States based on image */}
                                            <div className="space-y-6">
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Aesthetic States</p>
                                                <Input
                                                    id="state-default"
                                                    label="Nombre de Usuario"
                                                    placeholder=" "
                                                    defaultValue=""
                                                />
                                                <Input
                                                    id="state-filled"
                                                    label="Email Corporativo"
                                                    placeholder=" "
                                                    defaultValue="Valor completado"
                                                    className="border-primary"
                                                />
                                                <Input
                                                    id="state-disabled"
                                                    label="Campo Deshabilitado"
                                                    placeholder=" "
                                                    disabled
                                                />
                                            </div>

                                            <div className="space-y-6">
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Feedback States</p>
                                                <Input
                                                    id="state-error"
                                                    label="Email Corporativo"
                                                    state="error"
                                                    defaultValue="Valor incorrecto"
                                                    helperText="Este campo es obligatorio"
                                                />
                                                <Input
                                                    id="state-success"
                                                    label="Email Corporativo"
                                                    state="success"
                                                    defaultValue="Valor completado"
                                                    helperText="Email verificado correctamente"
                                                />
                                            </div>

                                            <div className="space-y-6">
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Features</p>
                                                <Input
                                                    id="feat-password"
                                                    label="Password"
                                                    type={showPassword ? "text" : "password"}
                                                    rightElement={
                                                        <button onClick={() => setShowPassword(!showPassword)}>
                                                            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                                        </button>
                                                    }
                                                />
                                                <Input
                                                    id="feat-search"
                                                    label="Search Product"
                                                    leftElement={<Hash className="size-4" />}
                                                    placeholder=" "
                                                    defaultValue="12345"
                                                    helperText="Search by ID or SKU"
                                                />
                                            </div>
                                        </div>
                                    }
                                    code={`<Input \n  label="Email" \n  leftElement={<Mail />} \n/>\n\n<PhoneInput \n  label="Phone" \n  countries={list} \n/>\n\n<TagInput \n  tags={tags} \n  onAddTag={add} \n/>\n\n<FileUpload \n  label="Attachments" \n/>`}
                                    cssCode={`.form-control {\n  border-radius: 16px;\n  background: var(--surface);\n  transition: 0.3s ease;\n}`}
                                />
                            </section>

                            <section id="checkboxes">
                                <ComponentPlayground
                                    title="Checkbox System"
                                    description="Multi-select controls with hover and focus states."
                                    component={
                                        <div className="space-y-6 w-full">
                                            <div className="space-y-4">
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">States</p>
                                                <div className="flex flex-wrap gap-6">
                                                    <div className="flex items-center space-x-3">
                                                        <Checkbox id="cb-unchecked" />
                                                        <label htmlFor="cb-unchecked" className="text-sm font-medium">Unchecked</label>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <Checkbox id="cb-checked" defaultChecked />
                                                        <label htmlFor="cb-checked" className="text-sm font-medium">Checked</label>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <Checkbox id="cb-disabled" disabled />
                                                        <label htmlFor="cb-disabled" className="text-sm font-medium text-muted-foreground">Disabled</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    code={`<Checkbox id="accept" />
<Checkbox id="checked" defaultChecked />
<Checkbox id="disabled" disabled />`}
                                    cssCode={`.checkbox {
  height: 1.25rem; /* 20px */
  width: 1.25rem;
  border-radius: 0.375rem;
  border: 2px solid var(--muted-foreground-30);
  transition: all 0.2s;
}

.checkbox:checked {
  background: var(--primary);
  border-color: var(--primary);
}`}
                                />
                            </section>

                            <section id="switches">
                                <ComponentPlayground
                                    title="Toggle Switches"
                                    description="Binary controls with smooth animations (44px touch target)."
                                    component={
                                        <div className="space-y-6 w-full">
                                            <div className="space-y-4">
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">States</p>
                                                <div className="flex flex-wrap gap-6">
                                                    <div className="flex items-center space-x-3">
                                                        <Switch id="sw-off" />
                                                        <label htmlFor="sw-off" className="text-sm font-medium">Off</label>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <Switch id="sw-on" defaultChecked />
                                                        <label htmlFor="sw-on" className="text-sm font-medium">On</label>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <Switch id="sw-disabled" disabled />
                                                        <label htmlFor="sw-disabled" className="text-sm font-medium text-muted-foreground">Disabled</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    code={`<Switch />
<Switch defaultChecked />
<Switch disabled />`}
                                    cssCode={`.switch {
  height: 1.5rem; /* 24px */
  width: 2.75rem; /* 44px */
  border-radius: 9999px;
  background: var(--muted);
  transition: all 0.2s;
}

.switch[data-state=checked] {
  background: var(--primary);
}`}
                                />
                            </section>

                            <section id="selects">
                                <ComponentPlayground
                                    title="Select Dropdown"
                                    description="Dropdown menus with rounded-xl styling and hover states."
                                    component={
                                        <div className="flex flex-wrap gap-4 w-full">
                                            <Select>
                                                <SelectTrigger className="w-[200px]">
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="electronics">Electronics</SelectItem>
                                                    <SelectItem value="clothing">Clothing</SelectItem>
                                                    <SelectItem value="furniture">Furniture</SelectItem>
                                                    <SelectItem value="food">Food & Beverages</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Select defaultValue="active">
                                                <SelectTrigger className="w-[160px]">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="active">Active</SelectItem>
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="inactive">Inactive</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    }
                                    code={`<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>`}
                                    cssCode={`.select-trigger {
  height: 2.5rem; /* 40px */
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  background: var(--surface);
  transition: all 0.2s;
}

.select-trigger:hover {
  border-color: var(--primary-50);
}

.select-content {
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
}`}
                                />
                            </section>

                            <section id="date-picker">
                                <ComponentPlayground
                                    title="Date Range Picker"
                                    description="Calendar popover for selecting a date range."
                                    component={
                                        <DatePickerWithRange
                                            className="w-full max-w-sm"
                                            date={{
                                                from: new Date(2024, 0, 20),
                                                to: addDays(new Date(2024, 0, 20), 20),
                                            }}
                                        />
                                    }
                                    code={`import { DatePickerWithRange } from "@/components/ui/date-range-picker";\n\n<DatePickerWithRange />`}
                                />
                            </section>

                            <section id="specialized-inputs">
                                <ComponentPlayground
                                    title="Specialized Inputs"
                                    description="PhoneInput with country selector, TagInput with badge chips, and FileUpload with drag interaction."
                                    component={
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                                            {/* Phone Input */}
                                            <div className="space-y-6">
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Phone Input</p>
                                                <PhoneInput
                                                    label="Teléfono"
                                                    value={phone}
                                                    onChange={setPhone}
                                                    countries={countries}
                                                />
                                            </div>

                                            {/* Tag Input */}
                                            <div className="space-y-6">
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tag Input</p>
                                                <TagInput
                                                    label="Tags"
                                                    tags={selectedTags}
                                                    onAddTag={(tag) => setSelectedTags([...selectedTags, tag])}
                                                    onRemoveTag={(tag) =>
                                                        setSelectedTags(selectedTags.filter((t) => t !== tag))
                                                    }
                                                    placeholder="Type and press Enter..."
                                                />
                                            </div>

                                            {/* File Upload */}
                                            <div className="space-y-6 md:col-span-2">
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">File Upload</p>
                                                <FileUpload
                                                    label="Adjuntos"
                                                    onFileSelect={setUploadedFile}
                                                    helperText="PDF, PNG, JPG up to 10MB"
                                                />
                                            </div>
                                        </div>
                                    }
                                    code={`<PhoneInput \n  label="Phone" \n  value={phone} \n  onChange={setPhone} \n  countries={countries} \n/>\n\n<TagInput \n  label="Tags" \n  tags={tags} \n  onAddTag={add} \n  onRemoveTag={remove} \n/>\n\n<FileUpload \n  label="Attachments" \n  onFileSelect={fn} \n  helperText="PDF, PNG, JPG up to 10MB" \n/>`}
                                />
                            </section>
                        </div>
                    )}

                    {activeCategory === "KPIs" && (
                        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <section id="kpis">
                                <ComponentPlayground
                                    title="KPI Cards"
                                    description="High-level metrics with trend indicators for dashboard summaries."
                                    component={
                                        <div className="grid gap-4 md:grid-cols-2 w-full max-w-2xl">
                                            <KPICard label="Total Revenue" value="$45,231.89" icon={DollarSign} trend="up" trendValue="+20.1%" trendLabel="from last month" />
                                            <KPICard label="Active Clients" value="+2350" icon={User} trend="down" trendValue="-4%" trendLabel="from last week" />
                                        </div>
                                    }
                                    code={`import { KPICard } from "@/components/ui/KPICard";\n\n<KPICard \n  label="Total Revenue" \n  value="$45,231.89" \n  icon={DollarSign} \n  trend="up" \n  trendValue="+20.1%" \n  trendLabel="from last month" \n/>`}
                                    cssCode={`.kpi-card {\n  padding: 1.5rem;\n  border-radius: 1.25rem;\n  background: var(--surface);\n  border: 1px solid var(--border);\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}`}
                                />
                            </section>
                        </div>
                    )}

                    {activeCategory === "Charts" && (
                        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <section id="charts" className="space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-black tracking-tight uppercase font-display">Premium Charts Suite</h3>
                                    <p className="text-muted-foreground font-inter">High-performance Recharts wrappers with Ordex governance.</p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <ComponentPlayground
                                        title="Area Chart"
                                        description="Gradient fill with hover interactions."
                                        component={<AreaChart data={chartData} categories={["total", "sales"]} index="name" />}
                                        code={`<AreaChart \n  data={data} \n  categories={["total", "sales"]} \n  index="name" \n/>`}
                                    />
                                    <ComponentPlayground
                                        title="Bar Chart"
                                        description="Rounded columns with strict spacing."
                                        component={<BarChart data={chartData} categories={["total", "sales"]} index="name" />}
                                        code={`<BarChart \n  data={data} \n  categories={["total", "sales"]} \n  index="name" \n/>`}
                                    />
                                    <ComponentPlayground
                                        title="Pie Chart"
                                        description="Donut variant with opacity scales."
                                        component={<PieChart data={pieData} category="value" index="name" />}
                                        code={`<PieChart \n  data={data} \n  category="value" \n  index="name" \n/>`}
                                    />
                                    <ComponentPlayground
                                        title="Radar Chart"
                                        description="Transparent fill for complex metrics."
                                        component={<RadarChart data={radarData} categories={["A"]} index="subject" />}
                                        code={`<RadarChart \n  data={data} \n  categories={["A"]} \n  index="subject" \n/>`}
                                    />
                                </div>
                            </section>
                        </div>
                    )}



                    {activeCategory === "Navigation" && (
                        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <section id="module-header">
                                <ComponentPlayground
                                    title="Module Header"
                                    description="Standardized page header with breadcrumbs."
                                    component={
                                        <div className="w-full max-w-2xl border p-6 rounded-xl bg-background">
                                            <ModuleHeader
                                                title="Inventory"
                                                description="Manage your product stock and categories."
                                                breadcrumbs={[{ label: "Products" }, { label: "Inventory", href: "#" }]}
                                                actions={<Button>Add Product</Button>}
                                            />
                                        </div>
                                    }
                                    code={`<ModuleHeader \n  title="Inventory" \n  breadcrumbs={[{ label: "Products" }, { label: "Inventory" }]} \n  actions={<Button>Add Product</Button>} \n/>`}
                                    cssCode={`.module-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 2rem 0;\n  border-bottom: 1px solid var(--border);\n}`}
                                />
                            </section>
                            <section id="tabs">
                                <ComponentPlayground
                                    title="Tabs Navigation"
                                    description="Switch between views without page reload."
                                    component={
                                        <Tabs defaultValue="account" className="w-[400px]">
                                            <TabsList>
                                                <TabsTrigger value="account">Account</TabsTrigger>
                                                <TabsTrigger value="password">Password</TabsTrigger>
                                                <TabsTrigger value="settings">Settings</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="account" className="p-4 border rounded-lg mt-2 text-sm text-muted-foreground">Make changes to your account here.</TabsContent>
                                            <TabsContent value="password" className="p-4 border rounded-lg mt-2 text-sm text-muted-foreground">Change your password here.</TabsContent>
                                            <TabsContent value="settings" className="p-4 border rounded-lg mt-2 text-sm text-muted-foreground">Manage your settings.</TabsContent>
                                        </Tabs>
                                    }
                                    code={`<Tabs defaultValue="account">\n  <TabsList>\n    <TabsTrigger value="account">Account</TabsTrigger>\n  </TabsList>\n  <TabsContent value="account">...</TabsContent>\n</Tabs>`}
                                />
                            </section>
                            <section id="tri-state-tabs">
                                <ComponentPlayground
                                    title="Tri-State Tabs"
                                    description="Universal navigation system with Large, Medium, and Small scales."
                                    component={
                                        <div className="space-y-12 w-full">
                                            <div className="space-y-6">
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Large (Module Level)</p>
                                                <Tabs defaultValue="overview" className="w-full">
                                                    <TabsList size="large">
                                                        <TabsTrigger value="overview" size="large">Overview</TabsTrigger>
                                                        <TabsTrigger value="analytics" size="large">Analytics</TabsTrigger>
                                                        <TabsTrigger value="settings" size="large">Settings</TabsTrigger>
                                                    </TabsList>
                                                </Tabs>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                                <div className="space-y-6">
                                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Medium (Modal Level)</p>
                                                    <Tabs defaultValue="account">
                                                        <TabsList size="medium">
                                                            <TabsTrigger value="account" size="medium">Account</TabsTrigger>
                                                            <TabsTrigger value="password" size="medium">Password</TabsTrigger>
                                                        </TabsList>
                                                    </Tabs>
                                                </div>

                                                <div className="space-y-6">
                                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Small (Card Level)</p>
                                                    <Tabs defaultValue="day">
                                                        <TabsList size="small">
                                                            <TabsTrigger value="day" size="small">Day</TabsTrigger>
                                                            <TabsTrigger value="week" size="small">Week</TabsTrigger>
                                                            <TabsTrigger value="month" size="small">Month</TabsTrigger>
                                                        </TabsList>
                                                    </Tabs>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    code={`<TabsList size="large">\n  <TabsTrigger value="1" size="large">Large</TabsTrigger>\n</TabsList>\n\n<TabsList size="medium">\n  <TabsTrigger value="1" size="medium">Medium</TabsTrigger>\n</TabsList>\n\n<TabsList size="small">\n  <TabsTrigger value="1" size="small">Small</TabsTrigger>\n</TabsList>`}
                                />
                            </section>

                            <section id="pagination">
                                <ComponentPlayground
                                    title="Smart Pagination"
                                    description="Navigational control with 1.25x scaling on interaction."
                                    component={
                                        <div className="w-full h-24 flex items-center justify-center bg-[#F8FAFC] dark:bg-navy/20 rounded-[16px] border border-[color-mix(in_srgb,#052940,transparent_85%)]">
                                            <Pagination>
                                                <PaginationContent>
                                                    <PaginationItem>
                                                        <PaginationPrevious href="#" />
                                                    </PaginationItem>
                                                    <PaginationItem>
                                                        <PaginationLink href="#" isActive>1</PaginationLink>
                                                    </PaginationItem>
                                                    <PaginationItem>
                                                        <PaginationLink href="#">2</PaginationLink>
                                                    </PaginationItem>
                                                    <PaginationItem>
                                                        <PaginationLink href="#">3</PaginationLink>
                                                    </PaginationItem>
                                                    <PaginationItem>
                                                        <PaginationEllipsis />
                                                    </PaginationItem>
                                                    <PaginationItem>
                                                        <PaginationNext href="#" />
                                                    </PaginationItem>
                                                </PaginationContent>
                                            </Pagination>
                                        </div>
                                    }
                                    code={`<Pagination>\n  <PaginationContent>\n    <PaginationLink isActive>1</PaginationLink>\n    <PaginationLink>2</PaginationLink>\n  </PaginationContent>\n</Pagination>`}
                                />
                            </section>
                        </div>
                    )}

                    {activeCategory === "Feedback" && (
                        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <section id="access-states">
                                <ComponentPlayground
                                    title="Status Badges"
                                    description="Visual indicators with semantic variants for ERP states."
                                    component={
                                        <div className="space-y-4 w-full">
                                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Base Variants</p>
                                            <div className="flex gap-3 items-center flex-wrap">
                                                <Badge variant="default">Default</Badge>
                                                <Badge variant="secondary">Secondary</Badge>
                                                <Badge variant="outline">Outline</Badge>
                                                <Badge variant="destructive">Destructive</Badge>
                                            </div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-4">Status Variants</p>
                                            <div className="flex gap-3 items-center flex-wrap">
                                                <Badge variant="success">Success</Badge>
                                                <Badge variant="warning">Warning</Badge>
                                                <Badge variant="info">Info</Badge>
                                                <Badge variant="neutral">Neutral</Badge>
                                            </div>
                                        </div>
                                    }
                                    code={`<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="neutral">Neutral</Badge>`}
                                    cssCode={`.badge {\n  padding: 0.25rem 0.625rem;\n  border-radius: 8px;\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n\n.badge-success {\n  background: rgb(209 250 229);\n  color: rgb(4 120 87);\n}\n\n.badge-warning {\n  background: rgb(254 243 199);\n  color: rgb(180 83 9);\n}`}
                                />
                            </section>
                            <section id="smart-search">
                                <ComponentPlayground
                                    title="Smart Command Filter"
                                    description="Keyboard-accessible command palette."
                                    component={
                                        <div className="w-full max-w-[450px] border rounded-xl overflow-hidden shadow-sm bg-background">
                                            <Command className="rounded-lg border shadow-md">
                                                <CommandInput placeholder="Type a command or search..." />
                                                <CommandList>
                                                    <CommandEmpty>No results found.</CommandEmpty>
                                                    <CommandGroup heading="Suggestions">
                                                        <CommandItem><BarChart3 className="mr-2 h-4 w-4" />Analytics</CommandItem>
                                                        <CommandItem><User className="mr-2 h-4 w-4" />Profile</CommandItem>
                                                        <CommandItem><CreditCard className="mr-2 h-4 w-4" />Billing</CommandItem>
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </div>
                                    }
                                    code={`<Command>\n  <CommandInput placeholder="Search..." />\n  <CommandList>\n    <CommandItem>Analytics</CommandItem>\n  </CommandList>\n</Command>`}
                                />
                            </section>
                            <section id="notifications">
                                <ComponentPlayground
                                    title="Notification Popover"
                                    description="Overlay for notifications and quick actions."
                                    component={
                                        <div className="flex items-center gap-4">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" size="icon" className="relative">
                                                        <Bell className="h-4 w-4" />
                                                        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-80" align="start">
                                                    <div className="grid gap-4">
                                                        <div className="space-y-2">
                                                            <h4 className="font-medium leading-none">Notifications</h4>
                                                            <p className="text-sm text-muted-foreground">You have 3 unread messages.</p>
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 text-sm">
                                                                <div className="h-2 w-2 bg-blue-500 rounded-full" />
                                                                <span>New order received #1234</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 text-sm">
                                                                <div className="h-2 w-2 bg-amber-500 rounded-full" />
                                                                <span>Inventory low warning</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                            <span className="text-sm text-muted-foreground">Click bell to toggle</span>
                                        </div>
                                    }
                                    code={`<Popover>\n  <PopoverTrigger><Button><Bell /></Button></PopoverTrigger>\n  <PopoverContent>Notifications...</PopoverContent>\n</Popover>`}
                                />
                            </section>

                            <section id="dialogs">
                                <ComponentPlayground
                                    title="Dialog"
                                    description="Modal dialogs for critical actions or information."
                                    component={
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline">Edit Profile</Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Edit profile</DialogTitle>
                                                    <DialogDescription>
                                                        Make changes to your profile here. Click save when you're done.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-6 py-4">
                                                    <Input
                                                        id="name"
                                                        label="Name"
                                                        defaultValue="Pedro Duarte"
                                                    />
                                                    <Input
                                                        id="username"
                                                        label="Username"
                                                        defaultValue="@peduarte"
                                                    />
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit">Save changes</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    }
                                    code={`<Dialog>\n  <DialogTrigger>Open</DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Title</DialogTitle>\n    </DialogHeader>\n    Content...\n  </DialogContent>\n</Dialog>`}
                                />
                            </section>

                            <section id="sheets">
                                <ComponentPlayground
                                    title="Sheet"
                                    description="Slide-out panels for navigation or details."
                                    component={
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <Button variant="outline">Open Sheet</Button>
                                            </SheetTrigger>
                                            <SheetContent>
                                                <SheetHeader>
                                                    <SheetTitle>Edit profile</SheetTitle>
                                                    <SheetDescription>
                                                        Make changes to your profile here. Click save when you're done.
                                                    </SheetDescription>
                                                </SheetHeader>
                                                <div className="grid gap-6 py-8">
                                                    <Input
                                                        id="sheet-name"
                                                        label="Name"
                                                        value="Pedro Duarte"
                                                    />
                                                    <Input
                                                        id="sheet-username"
                                                        label="Username"
                                                        value="@peduarte"
                                                    />
                                                </div>
                                                <SheetFooter>
                                                    <Button type="submit">Save changes</Button>
                                                </SheetFooter>
                                            </SheetContent>
                                        </Sheet>
                                    }
                                    code={`<Sheet>\n  <SheetTrigger>Open</SheetTrigger>\n  <SheetContent>Content...</SheetContent>\n</Sheet>`}
                                />
                            </section>

                            <section id="tooltips">
                                <ComponentPlayground
                                    title="Tooltip"
                                    description=" informative text when hovering over an element."
                                    component={
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="outline" className="w-10 h-10 rounded-full p-0">?</Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Add to library</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    }
                                    code={`<TooltipProvider>\n  <Tooltip>\n    <TooltipTrigger>Hover me</TooltipTrigger>\n    <TooltipContent>Tooltip text</TooltipContent>\n  </Tooltip>\n</TooltipProvider>`}
                                />
                            </section>

                            <section id="dialogs">
                                <ComponentPlayground
                                    title="Dialog Button"
                                    description="Refactored Dialog with Portal and State Reset."
                                    component={
                                        <div className="flex gap-4">
                                            <DialogButton
                                                triggerLabel="Edit Profile"
                                                dialogTitle="Edit Profile"
                                                dialogDescription="Make changes to your profile here."
                                                onOpenChange={(open) => console.log("Dialog open state:", open)}
                                            >
                                                <div className="grid gap-6 py-4">
                                                    <Input
                                                        id="db-name"
                                                        label="Name"
                                                        defaultValue="Pedro Duarte"
                                                    />
                                                    <Input
                                                        id="db-username"
                                                        label="Username"
                                                        defaultValue="@peduarte"
                                                    />
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit">Save changes</Button>
                                                </DialogFooter>
                                            </DialogButton>
                                        </div>
                                    }
                                    code={`<DialogButton \n  triggerLabel="Edit Profile" \n  dialogTitle="Edit Profile" \n/>`}
                                />
                            </section>

                            <section id="dropdowns">
                                <ComponentPlayground
                                    title="Action Dropdowns"
                                    description="Menu for contextual actions and dangerous operations."
                                    component={
                                        <div className="flex flex-wrap gap-8 items-start">
                                            {/* Standard Menu */}
                                            <div className="space-y-3">
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Standard Actions</p>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="outline">User Settings</Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className="w-56">
                                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>
                                                            <User className="mr-2 h-4 w-4" />
                                                            <span>Profile</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <CreditCard className="mr-2 h-4 w-4" />
                                                            <span>Billing</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Settings2 className="mr-2 h-4 w-4" />
                                                            <span>Settings</span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>

                                            {/* Dangerous Action Menu */}
                                            <div className="space-y-3">
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Dangerous Actions</p>
                                                <AlertDialog>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="secondary" className="border-red-500/20 text-red-600 bg-red-50/50 hover:bg-red-50 hover:border-red-500/40">
                                                                Manage Client
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent className="w-56">
                                                            <DropdownMenuLabel>Client Management</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                <span>Ver detalle</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Pencil className="mr-2 h-4 w-4" />
                                                                <span>Editar datos</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                                <span>Añadir gestión</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <AlertDialogTrigger asChild>
                                                                <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer">
                                                                    <X className="mr-2 h-4 w-4" />
                                                                    <span className="font-bold">Suspender cliente</span>
                                                                </DropdownMenuItem>
                                                            </AlertDialogTrigger>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle className="text-xl font-black uppercase tracking-tight">¿Confirmar Suspensión?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Esta acción desactivará el acceso del cliente de forma inmediata. Podrás revertir este cambio desde el panel de administración.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter className="mt-4">
                                                            <AlertDialogCancel>No, cancelar</AlertDialogCancel>
                                                            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                                                Sí, suspender
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>
                                    }
                                    code={`<AlertDialog>\n  <DropdownMenu>\n    <DropdownMenuTrigger>Options</DropdownMenuTrigger>\n    <DropdownMenuContent>\n      <AlertDialogTrigger asChild>\n        <DropdownMenuItem className="text-red-500">Suspend</DropdownMenuItem>\n      </AlertDialogTrigger>\n    </DropdownMenuContent>\n  </DropdownMenu>\n  <AlertDialogContent>...</AlertDialogContent>\n</AlertDialog>`}
                                />
                            </section>
                        </div>
                    )}
                    {activeCategory === "TableSuite" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <OrdexTableShowcase />
                        </div>
                    )}

                    {activeCategory === "ChipsBadges" && (
                        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <section id="chips">
                                <ComponentPlayground
                                    title="Interactive Chips"
                                    description="Pill-shaped action elements with removable support."
                                    component={
                                        <div className="space-y-8 w-full">
                                            <div className="space-y-4">
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-display">Standard Chips</p>
                                                <div className="flex flex-wrap gap-3">
                                                    <Chip>Default Chip</Chip>
                                                    <Chip variant="outline">Outline Chip</Chip>
                                                    <Chip onRemove={() => console.log("Removed")}>Removable</Chip>
                                                    <Chip size="pill">Pill Shape</Chip>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    code={`<Chip>Standard</Chip>\n<Chip variant="outline">Outline</Chip>\n<Chip onRemove={handleRemove}>Removable</Chip>\n<Chip size="pill">Pill</Chip>`}
                                />
                            </section>

                            <section id="badges-advanced">
                                <ComponentPlayground
                                    title="Advanced Badges"
                                    description="High-contrast notification indicators with overlap support."
                                    component={
                                        <div className="space-y-12 w-full">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                                <div className="space-y-4">
                                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-display">Count & Max Logic</p>
                                                    <div className="flex gap-6 items-center">
                                                        <div className="relative p-2 bg-muted rounded-lg">
                                                            <Bell className="h-6 w-6" />
                                                            <Badge count={5} overlap />
                                                        </div>
                                                        <div className="relative p-2 bg-muted rounded-lg">
                                                            <Mail className="h-6 w-6" />
                                                            <Badge count={120} max={99} overlap />
                                                        </div>
                                                        <div className="relative p-2 bg-muted rounded-lg">
                                                            <User className="h-6 w-6" />
                                                            <Badge variant="dot" overlap />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-display">Standalone States</p>
                                                    <div className="flex gap-3 flex-wrap">
                                                        <Badge variant="success">PAID</Badge>
                                                        <Badge variant="warning">PENDING</Badge>
                                                        <Badge variant="info">DRAFT</Badge>
                                                        <Badge variant="neutral">VOID</Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    code={`<Badge count={5} overlap />\n<Badge count={120} max={99} overlap />\n<Badge variant="dot" overlap />`}
                                />
                            </section>
                        </div>
                    )}

                    {activeCategory === "Feedback" && (
                        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <section id="skeletons">
                                <ComponentPlayground
                                    title="Skeletons"
                                    description="Loading placeholders for various content types."
                                    component={
                                        <div className="space-y-8 w-full max-w-2xl">
                                            <div className="space-y-4">
                                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-display">Components</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {/* KPI Skeleton matching Ordex Geometry */}
                                                    <div className="rounded-[16px] border border-border bg-card p-6 space-y-4 shadow-sm">
                                                        <div className="flex justify-between items-start">
                                                            <Skeleton className="h-4 w-24 rounded-[4px]" />
                                                            <Skeleton className="h-8 w-8 rounded-[8px]" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Skeleton className="h-8 w-32 rounded-[8px]" />
                                                            <Skeleton className="h-4 w-48 rounded-[4px]" />
                                                        </div>
                                                    </div>

                                                    {/* Avatar & Text Skeleton */}
                                                    <div className="rounded-[16px] border border-border bg-card p-6 flex items-center gap-4 shadow-sm">
                                                        <Skeleton className="h-12 w-12 rounded-full" />
                                                        <div className="space-y-2 flex-1">
                                                            <Skeleton className="h-4 w-3/4 rounded-[4px]" />
                                                            <Skeleton className="h-3 w-1/2 rounded-[4px]" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-4 font-display">Table Row Skeleton</p>
                                                    <div className="rounded-[16px] border border-border bg-card p-4 space-y-4">
                                                        <div className="flex items-center justify-between gap-4">
                                                            <Skeleton className="h-4 w-8 rounded-[4px]" />
                                                            <Skeleton className="h-4 flex-1 rounded-[4px]" />
                                                            <Skeleton className="h-4 w-24 rounded-[4px]" />
                                                            <Skeleton className="h-8 w-20 rounded-[8px]" />
                                                        </div>
                                                        <div className="flex items-center justify-between gap-4 opacity-70">
                                                            <Skeleton className="h-4 w-8 rounded-[4px]" />
                                                            <Skeleton className="h-4 flex-1 rounded-[4px]" />
                                                            <Skeleton className="h-4 w-24 rounded-[4px]" />
                                                            <Skeleton className="h-8 w-20 rounded-[8px]" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    code={`<Skeleton className="h-12 w-12 rounded-full" />\n<Skeleton className="h-4 w-full" />`}
                                />
                            </section>

                            <section id="buttons-loading">
                                <ComponentPlayground
                                    title="Button Loading States"
                                    description="Feedback states for actions."
                                    component={
                                        <div className="space-y-8 w-full">
                                            <div className="flex flex-wrap gap-4 items-center">
                                                <Button isLoading>Save Changes</Button>
                                                <Button isLoading variant="secondary">Export</Button>
                                                <Button isLoading variant="outline">Refresh</Button>
                                                <Button isLoading variant="destructive">Delete</Button>
                                                <Button isLoading size="icon"><Home className="h-4 w-4" /></Button>
                                            </div>
                                        </div>
                                    }
                                    code={`<Button isLoading>Save Changes</Button>`}
                                />
                            </section>

                            <section id="inputs-loading">
                                <ComponentPlayground
                                    title="Input Loading States"
                                    description="Feedback for search and data entry."
                                    component={
                                        <div className="space-y-8 w-full max-w-lg">
                                            <div className="space-y-4">
                                                <Input
                                                    variant="search"
                                                    placeholder="Searching clients..."
                                                    leftElement={<Search className="h-4 w-4" />}
                                                    isLoading
                                                />
                                                <Input
                                                    label="Async Validation"
                                                    placeholder="Checking availability..."
                                                    isLoading
                                                />
                                            </div>
                                        </div>
                                    }
                                    code={`<Input variant="search" isLoading />`}
                                />
                            </section>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
