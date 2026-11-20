"use client"

import * as React from "react"
import { cn } from "@aetherstack/utils"
import { Badge } from "@aetherstack/ui"

// ── Types ─────────────────────────────────────────────────────────────────────

export interface KanbanItem {
  id: string
  title: string
  description?: string
  badge?: string
}

export interface KanbanCardProps {
  item: KanbanItem
  className?: string
}

export interface KanbanColumnProps {
  title: string
  items: KanbanItem[]
  onDrop?: (item: KanbanItem, columnTitle: string) => void
  className?: string
}

export interface KanbanBoardProps {
  columns: KanbanColumnProps[]
  className?: string
}

// ── KanbanCard ────────────────────────────────────────────────────────────────

export function KanbanCard({ item, className }: KanbanCardProps) {
  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.setData("application/json", JSON.stringify(item))
    e.dataTransfer.effectAllowed = "move"
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={cn(
        "border-border bg-card cursor-grab select-none rounded-lg border p-3 shadow-sm active:cursor-grabbing",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-foreground text-sm font-medium leading-snug">{item.title}</p>
        {item.badge && (
          <Badge variant="secondary" className="shrink-0 text-xs">
            {item.badge}
          </Badge>
        )}
      </div>
      {item.description && (
        <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">{item.description}</p>
      )}
    </div>
  )
}

// ── KanbanColumn ──────────────────────────────────────────────────────────────

export function KanbanColumn({ title, items, onDrop, className }: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = React.useState(false)

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setIsDragOver(true)
  }

  function handleDragLeave() {
    setIsDragOver(false)
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragOver(false)
    const raw = e.dataTransfer.getData("application/json")
    if (!raw) return
    try {
      const item = JSON.parse(raw) as KanbanItem
      onDrop?.(item, title)
    } catch {
      // Silently ignore invalid drag data
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "bg-muted/40 flex min-h-[200px] w-[280px] flex-col gap-2 rounded-xl p-3 transition-colors",
        isDragOver && "bg-muted/70 ring-primary/30 ring-2",
        className,
      )}
    >
      <div className="flex items-center justify-between px-1 pb-1">
        <h3 className="text-foreground text-sm font-semibold">{title}</h3>
        <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs font-medium">
          {items.length}
        </span>
      </div>
      {items.map((item) => (
        <KanbanCard key={item.id} item={item} />
      ))}
      {items.length === 0 && (
        <div className="border-border text-muted-foreground flex flex-1 items-center justify-center rounded-lg border-2 border-dashed py-6 text-xs">
          Drop cards here
        </div>
      )}
    </div>
  )
}

// ── KanbanBoard ───────────────────────────────────────────────────────────────

export function KanbanBoard({ columns, className }: KanbanBoardProps) {
  return (
    <div
      className={cn("flex gap-4 overflow-x-auto pb-4", className)}
      role="region"
      aria-label="Kanban board"
    >
      {columns.map((col) => (
        <KanbanColumn
          key={col.title}
          title={col.title}
          items={col.items}
          {...(col.onDrop !== undefined ? { onDrop: col.onDrop } : {})}
          {...(col.className !== undefined ? { className: col.className } : {})}
        />
      ))}
    </div>
  )
}
