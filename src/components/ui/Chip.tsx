import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const chipVariants = cva(
    "inline-flex items-center gap-1.5 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-default",
    {
        variants: {
            variant: {
                default:
                    "bg-[color-mix(in_srgb,var(--primary),transparent_90%)] text-primary hover:bg-[color-mix(in_srgb,var(--primary),transparent_85%)] dark:bg-[color-mix(in_srgb,#DBF227,transparent_85%)] dark:text-[#DBF227] dark:hover:bg-[color-mix(in_srgb,#DBF227,transparent_80%)]",
                outline:
                    "border border-border text-foreground hover:bg-muted/50",
            },
            size: {
                default: "px-3 py-1 rounded-[16px] text-[12px] font-medium font-inter",
                pill: "px-3 py-1 rounded-full text-[12px] font-medium font-inter",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ChipProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
    onRemove?: () => void
}

function Chip({ className, variant, size, onRemove, children, ...props }: ChipProps) {
    return (
        <div className={cn(chipVariants({ variant, size }), className)} {...props}>
            {children}
            {onRemove && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    className="ml-0.5 rounded-full p-0.5 hover:bg-primary/10 transition-transform hover:scale-125 focus:outline-none"
                >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                </button>
            )}
        </div>
    )
}

export { Chip, chipVariants }
