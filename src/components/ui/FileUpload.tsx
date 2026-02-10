"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Upload, File, X } from "lucide-react";

export interface FileUploadProps {
    label: string;
    onFileSelect: (file: File | null) => void;
    id?: string;
    className?: string;
    helperText?: string;
}

export function FileUpload({
    label,
    onFileSelect,
    id,
    className,
    helperText,
}: FileUploadProps) {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
        onFileSelect(file);
    };

    const clearFile = () => {
        setSelectedFile(null);
        onFileSelect(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className={cn("space-y-2 w-full font-inter", className)}>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">
                {label}
            </p>
            <div
                onClick={() => !selectedFile && inputRef.current?.click()}
                className={cn(
                    "relative min-h-[52px] border-2 border-dashed border-primary/20 rounded-[16px] bg-surface flex items-center px-4 transition-all cursor-pointer group",
                    !selectedFile && "hover:border-primary/40 hover:bg-primary/5",
                    selectedFile && "cursor-default border-primary"
                )}
            >
                <input
                    type="file"
                    id={id}
                    className="hidden"
                    onChange={handleFileChange}
                    ref={inputRef}
                />
                {!selectedFile ? (
                    <div className="flex items-center gap-3 text-muted-foreground group-hover:text-primary transition-colors">
                        <Upload className="h-5 w-5" />
                        <span className="text-sm font-semibold">Cargar o arrastrar archivo...</span>
                    </div>
                ) : (
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <File className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold truncate max-w-[200px]">{selectedFile.name}</span>
                                <span className="text-[10px] text-muted-foreground font-medium">
                                    {(selectedFile.size / 1024).toFixed(1)} KB
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); clearFile(); }}
                            className="p-1.5 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 rounded-lg transition-colors text-muted-foreground"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>
            {helperText && (
                <p className="text-xs text-muted-foreground font-medium pl-1 opacity-70">
                    {helperText}
                </p>
            )}
        </div>
    );
}
