import * as React from "react"
import { Button, ButtonProps } from "@/components/ui/Button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface DialogButtonProps extends ButtonProps {
    dialogTitle: string
    dialogDescription?: string
    children?: React.ReactNode // Content of the dialog
    triggerLabel?: string // Label for the button if not using children for trigger
    onOpenChange?: (open: boolean) => void
}

export function DialogButton({
    dialogTitle,
    dialogDescription,
    children,
    triggerLabel,
    onOpenChange,
    ...props
}: DialogButtonProps) {
    const [open, setOpen] = React.useState(false)

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
        if (onOpenChange) {
            onOpenChange(newOpen)
        }
        // State reset logic can be placed here if needed
        if (!newOpen) {
            // Example: Resetting internal form state signals could go here
            console.log("Dialog closed, state reset triggered")
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button {...props}>{triggerLabel || props.children}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    {dialogDescription && (
                        <DialogDescription>{dialogDescription}</DialogDescription>
                    )}
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}
