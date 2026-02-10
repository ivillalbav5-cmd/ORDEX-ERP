"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/badge";
import { X, Search } from "lucide-react";

export interface TagInputProps {
    label: string;
    tags: string[];
    onAddTag: (tag: string) => void;
    onRemoveTag: (tag: string) => void;
    id?: string;
    placeholder?: string;
    className?: string;
    helperText?: string;
}

export function TagInput({
    label,
    tags,
    onAddTag,
    onRemoveTag,
    id,
    placeholder = "Add tags...",
    className,
    helperText,
}: TagInputProps) {
    const [inputValue, setInputValue] = React.useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault();
            if (!tags.includes(inputValue.trim())) {
                onAddTag(inputValue.trim());
            }
            setInputValue("");
        }
    };

    return (
        <div className={cn("space-y-3 w-full", className)}>
            <Input
                id={id}
                label={label}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                helperText={helperText}
                leftElement={<Search className="h-4 w-4" />}
            />
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-1 duration-300">
                    {tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="pl-3 pr-1 py-1 text-xs font-bold rounded-lg border border-primary/10 flex items-center gap-1 group bg-primary/5 text-primary hover:bg-primary/10 transition-all"
                        >
                            {tag}
                            <button
                                onClick={() => onRemoveTag(tag)}
                                className="p-0.5 rounded-md hover:bg-primary/20 transition-colors"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    );
}
