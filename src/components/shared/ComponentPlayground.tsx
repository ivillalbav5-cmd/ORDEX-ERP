"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Copy, Check, Monitor, Smartphone, Tablet, Paintbrush } from "lucide-react";

interface ComponentPlaygroundProps {
    title: string;
    description?: string;
    component: React.ReactNode;
    code: string;
    cssCode?: string;
    controls?: React.ReactNode;
}

export function ComponentPlayground({
    title,
    description,
    component,
    code,
    cssCode,
    controls,
}: ComponentPlaygroundProps) {
    const [bgType, setBgType] = React.useState<"light" | "dark" | "mesh">("light");
    const [view, setView] = React.useState<"preview" | "code" | "css">("preview");
    const [copied, setCopied] = React.useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const bgClasses = {
        light: "bg-slate-50",
        dark: "bg-[#052940] dark",
        mesh: "bg-slate-50 bg-[radial-gradient(at_top_left,_var(--tw-gradient-stops))] from-lime-100/50 via-slate-50 to-navy-100/20",
    };

    return (
        <Card className="overflow-hidden border-border bg-surface shadow-sm rounded-[16px] mb-4">
            <div className="flex flex-col md:flex-row border-b border-border items-center justify-between px-4 py-2 bg-muted/5">
                <div className="flex items-center gap-3">
                    <h3 className="text-sm font-bold text-foreground font-display">{title}</h3>
                    {description && <span className="text-[10px] text-muted-foreground hidden lg:inline-block border-l border-border pl-3">{description}</span>}
                </div>

                <div className="flex items-center gap-4">
                    <Tabs value={view} onValueChange={(v) => setView(v as any)} className="w-auto">
                        <TabsList className="bg-muted/50 p-0.5 rounded-lg h-8">
                            <TabsTrigger value="preview" className="px-3 py-1 text-[10px] rounded-md h-7">Preview</TabsTrigger>
                            <TabsTrigger value="code" className="px-3 py-1 text-[10px] rounded-md h-7">JSX</TabsTrigger>
                            {cssCode && <TabsTrigger value="css" className="px-3 py-1 text-[10px] rounded-md h-7">CSS</TabsTrigger>}
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[300px]">
                {/* Main Canvas */}
                <div className={cn(
                    "lg:col-span-3 p-6 flex items-center justify-center relative transition-colors duration-300",
                    view === "preview" ? bgClasses[bgType] : "bg-[#0a0a0a]"
                )}>
                    {/* Canvas Toggles - Only show in preview */}
                    {view === "preview" && (
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/10 backdrop-blur-md p-1 rounded-lg border border-white/20 shadow-sm z-10 scale-90 origin-top-right">
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn("h-7 w-7 rounded-sm", bgType === "light" && "bg-white text-navy shadow-sm")}
                                onClick={() => setBgType("light")}
                            >
                                <Monitor className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn("h-7 w-7 rounded-sm", bgType === "dark" && "bg-navy text-white shadow-sm")}
                                onClick={() => setBgType("dark")}
                            >
                                <Paintbrush className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn("h-7 w-7 rounded-sm", bgType === "mesh" && "bg-lime text-navy shadow-sm")}
                                onClick={() => setBgType("mesh")}
                            >
                                <Tablet className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    )}

                    <div className="w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-300">
                        {view === "preview" ? (
                            <div className="p-4 w-full">{component}</div>
                        ) : (
                            <div className="w-full h-full p-4 font-mono text-xs overflow-auto text-slate-300 rounded-lg relative group">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-3 right-3 h-7 w-7 text-slate-400 hover:text-white hover:bg-white/10"
                                    onClick={() => copyToClipboard(view === "code" ? code : (cssCode || ""))}
                                >
                                    {copied ? <Check className="h-3.5 w-3.5 text-lime" /> : <Copy className="h-3.5 w-3.5" />}
                                </Button>
                                <pre className="leading-relaxed">
                                    <code>{view === "code" ? code : cssCode}</code>
                                </pre>
                            </div>
                        )}
                    </div>
                </div>

                {/* Controls Panel */}
                <div className="lg:col-span-1 border-l border-border bg-muted/5 p-4 flex flex-col gap-4 overflow-y-auto">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground opacity-70">Properties</div>
                    <div className="flex flex-col gap-4">
                        {controls || <div className="text-[10px] text-muted-foreground italic">No interactive props available.</div>}
                    </div>

                    {/* CSS Code Section */}
                    {cssCode && (
                        <div className="mt-auto pt-4 border-t border-border">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground opacity-70">CSS Styles</div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-muted-foreground hover:text-foreground"
                                    onClick={() => copyToClipboard(cssCode)}
                                >
                                    {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                                </Button>
                            </div>
                            <div className="bg-[#0a0a0a] rounded-lg p-3 overflow-x-auto max-h-48 overflow-y-auto">
                                <pre className="text-[10px] font-mono text-slate-300 leading-relaxed">
                                    <code>{cssCode}</code>
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}
