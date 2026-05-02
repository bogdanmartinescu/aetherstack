"use client"

import * as React from "react"
import { cn } from "@aetherstack/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@aetherstack/ui"

interface AIAssistantPanelProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  side?: "right" | "left"
  className?: string
}

function AIAssistantPanel({
  open,
  onOpenChange,
  title = "AI Assistant",
  children,
  footer,
  side = "right",
  className,
}: AIAssistantPanelProps) {
  return (
    <Sheet
      {...(open !== undefined ? { open } : {})}
      {...(onOpenChange !== undefined ? { onOpenChange } : {})}
    >
      <SheetContent
        side={side}
        className={cn("flex w-[420px] max-w-full flex-col p-0 sm:max-w-[420px]", className)}
      >
        <SheetHeader className="flex-row items-center justify-between border-b border-border px-4 py-3">
          <SheetTitle className="text-base">{title}</SheetTitle>
          <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" />
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">{children}</div>

        {footer && (
          <div className="shrink-0 border-t border-border p-4">{footer}</div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export { AIAssistantPanel }
