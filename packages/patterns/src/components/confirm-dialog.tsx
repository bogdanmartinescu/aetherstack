"use client"

import * as React from "react"
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  VisuallyHidden,
} from "@aetherstack/ui"
import { cn } from "@aetherstack/utils"

export interface ConfirmDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  description?: React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
  variant?: "default" | "destructive"
  onConfirm: () => void | Promise<void>
  onCancel?: () => void
  isLoading?: boolean
  children?: React.ReactNode
  className?: string
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  onConfirm,
  onCancel,
  isLoading = false,
  children,
  className,
}: ConfirmDialogProps) {
  const handleCancel = () => {
    onCancel?.()
    onOpenChange?.(false)
  }

  const handleConfirm = async () => {
    await onConfirm()
    onOpenChange?.(false)
  }

  const dialogContent = (
    <DialogContent className={cn("sm:max-w-md", className)}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description ? (
          <DialogDescription>{description}</DialogDescription>
        ) : (
          <VisuallyHidden>
            <DialogDescription>Confirm action</DialogDescription>
          </VisuallyHidden>
        )}
      </DialogHeader>
      <DialogFooter className="mt-2 gap-2">
        <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
          {cancelLabel}
        </Button>
        <Button variant={variant} onClick={handleConfirm} disabled={isLoading}>
          {confirmLabel}
        </Button>
      </DialogFooter>
    </DialogContent>
  )

  const controlledProps = {
    ...(open !== undefined ? { open } : {}),
    ...(onOpenChange !== undefined ? { onOpenChange } : {}),
  }

  if (children) {
    return (
      <Dialog {...controlledProps}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        {dialogContent}
      </Dialog>
    )
  }

  return <Dialog {...controlledProps}>{dialogContent}</Dialog>
}
