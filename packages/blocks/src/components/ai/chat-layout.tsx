"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@aetherstack/utils"
import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@aetherstack/ui"

interface ChatLayoutProps {
  sidebar?: React.ReactNode
  header?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  sidebarOpen?: boolean
  onSidebarToggle?: (open: boolean) => void
  className?: string
}

function ChatLayout({
  sidebar,
  header,
  children,
  footer,
  sidebarOpen = false,
  onSidebarToggle,
  className,
}: ChatLayoutProps) {
  return (
    <div className={cn("flex h-screen overflow-hidden bg-background", className)}>
      {sidebar && (
        <>
          <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border bg-card">
            {sidebar}
          </aside>

          <Sheet
            open={sidebarOpen}
            {...(onSidebarToggle !== undefined ? { onOpenChange: onSidebarToggle } : {})}
          >
            <SheetContent side="left" className="w-60 p-0">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              {sidebar}
            </SheetContent>
          </Sheet>
        </>
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        {header ? (
          <header className="flex h-14 shrink-0 items-center border-b border-border px-4 gap-2">
            {sidebar && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => onSidebarToggle?.(!sidebarOpen)}
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            )}
            {header}
          </header>
        ) : sidebar ? (
          <div className="flex h-14 shrink-0 items-center border-b border-border px-4 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSidebarToggle?.(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        ) : null}

        <main className="flex-1 overflow-y-auto">{children}</main>

        {footer && (
          <div className="shrink-0 border-t border-border p-4">{footer}</div>
        )}
      </div>
    </div>
  )
}

export { ChatLayout }
