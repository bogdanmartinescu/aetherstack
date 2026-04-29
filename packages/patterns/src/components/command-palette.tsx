"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { cn } from "@aetherstack/utils"
import {
  Dialog,
  DialogContent,
} from "@aetherstack/ui"

// ── CommandPalette (root) ─────────────────────────────────────────────────────

export interface CommandPaletteProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive> {
  className?: string
}

export function CommandPalette({ className, ...props }: CommandPaletteProps) {
  return (
    <CommandPrimitive
      className={cn(
        "flex flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        className,
      )}
      {...props}
    />
  )
}

// ── CommandPaletteInput ───────────────────────────────────────────────────────

export interface CommandPaletteInputProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {
  className?: string
}

export function CommandPaletteInput({ className, ...props }: CommandPaletteInputProps) {
  return (
    <div className="flex items-center border-b border-border px-3" cmdk-input-wrapper="">
      <svg
        className="mr-2 h-4 w-4 shrink-0 text-muted-foreground"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <CommandPrimitive.Input
        className={cn(
          "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  )
}

// ── CommandPaletteList ────────────────────────────────────────────────────────

export interface CommandPaletteListProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> {
  className?: string
}

export function CommandPaletteList({ className, ...props }: CommandPaletteListProps) {
  return (
    <CommandPrimitive.List
      className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
      {...props}
    />
  )
}

// ── CommandPaletteEmpty ───────────────────────────────────────────────────────

export interface CommandPaletteEmptyProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> {
  className?: string
}

export function CommandPaletteEmpty({ className, ...props }: CommandPaletteEmptyProps) {
  return (
    <CommandPrimitive.Empty
      className={cn("py-6 text-center text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

// ── CommandGroup (re-export with styling) ─────────────────────────────────────

export interface CommandGroupProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> {
  className?: string
}

export function CommandGroup({ className, ...props }: CommandGroupProps) {
  return (
    <CommandPrimitive.Group
      className={cn(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
}

// ── CommandItem (re-export with styling) ──────────────────────────────────────

export interface CommandItemProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {
  className?: string
}

export function CommandItem({ className, ...props }: CommandItemProps) {
  return (
    <CommandPrimitive.Item
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

// ── CommandPaletteSeparator ───────────────────────────────────────────────────

export interface CommandPaletteSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> {
  className?: string
}

export function CommandPaletteSeparator({ className, ...props }: CommandPaletteSeparatorProps) {
  return (
    <CommandPrimitive.Separator
      className={cn("-mx-1 h-px bg-border", className)}
      {...props}
    />
  )
}

// ── CommandPaletteDialog ──────────────────────────────────────────────────────

export interface CommandPaletteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export function CommandPaletteDialog({
  open,
  onOpenChange,
  children,
}: CommandPaletteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <CommandPalette className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </CommandPalette>
      </DialogContent>
    </Dialog>
  )
}
