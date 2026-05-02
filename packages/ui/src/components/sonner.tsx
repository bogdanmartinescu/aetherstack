"use client"

import { Toaster as SonnerToaster, toast } from "sonner"
import type { ToasterProps } from "sonner"
import { cn } from "@aetherstack/utils"

function Toaster({ className, toastOptions, ...props }: ToasterProps) {
  return (
    <SonnerToaster
      className={cn(className)}
      toastOptions={{
        classNames: {
          toast: "bg-background text-foreground border border-border shadow-md",
          title: "font-medium text-sm",
          description: "text-muted-foreground text-sm",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
          closeButton: "border-border",
          error: "text-destructive border-destructive/50",
          success: "border-border",
          warning: "border-border",
          info: "border-border",
        },
        ...toastOptions,
      }}
      {...props}
    />
  )
}
Toaster.displayName = "Toaster"

export { Toaster, toast }
