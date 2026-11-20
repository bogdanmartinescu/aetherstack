import * as React from "react"
import { cn } from "@aetherstack/utils"

export type FloatingDockCorner = "top-left" | "top-right" | "bottom-left" | "bottom-right"

export interface FloatingDockProps {
  corner?: FloatingDockCorner
  contained?: boolean
  label?: string
  children: React.ReactNode
  className?: string
}

const CORNER_POSITION: Record<FloatingDockCorner, string> = {
  "top-left": "top-4 left-4",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-right": "bottom-4 right-4",
}

export function FloatingDock({
  corner = "bottom-right",
  contained,
  label = "Dock",
  children,
  className,
}: FloatingDockProps) {
  return (
    <div
      role="region"
      aria-label={label}
      data-corner={corner}
      className={cn(
        contained ? "absolute" : "fixed",
        CORNER_POSITION[corner],
        "pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)]",
        "rounded-lg border border-border bg-card shadow-lg",
        className,
      )}
    >
      {children}
    </div>
  )
}