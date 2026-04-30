"use client"

import * as React from "react"
import {
  CommandPaletteDialog,
  CommandPalette,
  CommandPaletteInput,
  CommandPaletteList,
  CommandPaletteEmpty,
  CommandGroup,
  CommandItem,
} from "@aetherstack/patterns"
import { Button } from "@aetherstack/ui"

export function CommandPalettePreview() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col items-center gap-3">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open Command Palette
        <kbd className="ml-2 hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          ⌘K
        </kbd>
      </Button>
      <p className="text-xs text-muted-foreground">Click the button to open the palette</p>

      <CommandPaletteDialog open={open} onOpenChange={setOpen}>
        <CommandPalette>
          <CommandPaletteInput placeholder="Search commands…" />
          <CommandPaletteList>
            <CommandPaletteEmpty>No results found.</CommandPaletteEmpty>
            <CommandGroup heading="Pages">
              <CommandItem onSelect={() => setOpen(false)}>Dashboard</CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>Analytics</CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>Settings</CommandItem>
            </CommandGroup>
            <CommandGroup heading="Actions">
              <CommandItem onSelect={() => setOpen(false)}>Create new project</CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>Invite team member</CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>Export data</CommandItem>
            </CommandGroup>
          </CommandPaletteList>
        </CommandPalette>
      </CommandPaletteDialog>
    </div>
  )
}
