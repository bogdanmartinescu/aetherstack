"use client"

import * as React from "react"
import { cn } from "@aetherstack/utils"

export interface HeatmapProps {
  "aria-label": string
  rowLabels: readonly string[]
  columnLabels: readonly string[]
  values: readonly (readonly number[])[]
  className?: string
}

function clampValue(value: number): number {
  return Math.min(1, Math.max(0, value))
}

function formatValue(value: number): string {
  const clamped = clampValue(value)
  return String(Number(clamped.toFixed(2)))
}

function cellBackground(value: number): string {
  const clamped = clampValue(value)
  return `color-mix(in srgb, hsl(var(--primary)) ${Math.round(clamped * 100)}%, hsl(var(--muted)))`
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

export function Heatmap({
  "aria-label": ariaLabel,
  rowLabels,
  columnLabels,
  values,
  className,
}: HeatmapProps) {
  const [active, setActive] = React.useState({ row: 0, col: 0 })
  const cellRefs = React.useRef<(HTMLButtonElement | null)[][]>([])

  if (values.length !== rowLabels.length) {
    throw new Error("Heatmap values must match row and column labels")
  }
  for (const row of values) {
    if (row.length !== columnLabels.length) {
      throw new Error("Heatmap values must match row and column labels")
    }
  }

  const focusCell = (row: number, col: number) => {
    cellRefs.current[row]?.[col]?.focus()
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    row: number,
    col: number,
  ) => {
    if (event.key === "ArrowRight") {
      event.preventDefault()
      const nextCol = Math.min(col + 1, columnLabels.length - 1)
      if (nextCol !== col) {
        const next = { row, col: nextCol }
        setActive(next)
        focusCell(next.row, next.col)
      }
      return
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault()
      const nextCol = Math.max(col - 1, 0)
      if (nextCol !== col) {
        const next = { row, col: nextCol }
        setActive(next)
        focusCell(next.row, next.col)
      }
      return
    }

    if (event.key === "ArrowDown") {
      event.preventDefault()
      const nextRow = Math.min(row + 1, rowLabels.length - 1)
      if (nextRow !== row) {
        const next = { row: nextRow, col }
        setActive(next)
        focusCell(next.row, next.col)
      }
      return
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      const nextRow = Math.max(row - 1, 0)
      if (nextRow !== row) {
        const next = { row: nextRow, col }
        setActive(next)
        focusCell(next.row, next.col)
      }
    }
  }

  return (
    <div
      role="grid"
      aria-label={ariaLabel}
      className={cn(
        "border-border bg-background inline-grid gap-1 rounded-md border p-2",
        className,
      )}
      style={{ gridTemplateColumns: `auto repeat(${columnLabels.length}, auto)` }}
    >
      <div className="contents">
        <div className="text-muted-foreground text-xs font-medium" aria-hidden />
        {columnLabels.map((column) => (
          <div
            key={column}
            className="text-muted-foreground px-1 text-center text-xs font-medium"
            aria-hidden
          >
            {column}
          </div>
        ))}
      </div>
      {rowLabels.map((row, rowIndex) => (
        <div role="row" key={row} className="contents">
          <div
            className="text-muted-foreground flex items-center pr-2 text-xs font-medium"
            aria-hidden
          >
            {row}
          </div>
          {columnLabels.map((column, colIndex) => {
            const value = values[rowIndex]?.[colIndex] ?? 0
            const label = `${row}, ${column}, ${formatValue(value)}`
            const isActive = active.row === rowIndex && active.col === colIndex
            return (
              <button
                key={`${row}-${column}`}
                ref={(node) => {
                  if (!cellRefs.current[rowIndex]) {
                    cellRefs.current[rowIndex] = []
                  }
                  cellRefs.current[rowIndex][colIndex] = node
                }}
                type="button"
                role="gridcell"
                aria-label={label}
                tabIndex={isActive ? 0 : -1}
                onFocus={() => setActive({ row: rowIndex, col: colIndex })}
                onKeyDown={(event) => handleKeyDown(event, rowIndex, colIndex)}
                style={{ background: cellBackground(value) }}
                className={cn("border-border/50 size-10 rounded-sm border", focusRing)}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
