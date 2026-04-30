import type { Metadata } from "next"
import { PatternPage } from "@/components/pattern-page"
import { CommandPalettePreview } from "./preview"

export const metadata: Metadata = {
  title: "Command Palette",
  description: "Keyboard-driven command palette dialog with search, grouped results, and keyboard navigation.",
}

export default function CommandPalettePage() {
  return (
    <PatternPage
      name="Command Palette"
      description="A keyboard-first command palette built on cmdk. Supports grouped results, fuzzy search, empty states, and dialog presentation. Bind it to ⌘K for a native feel."
      cliInstall="npx aether-ui add command-palette"
      importCode={`import {
  CommandPaletteDialog,
  CommandPalette,
  CommandPaletteInput,
  CommandPaletteList,
  CommandPaletteEmpty,
  CommandGroup,
  CommandItem,
} from "@aetherstack/patterns"`}
      usageCode={`import * as React from "react"
import {
  CommandPaletteDialog,
  CommandPalette,
  CommandPaletteInput,
  CommandPaletteList,
  CommandPaletteEmpty,
  CommandGroup,
  CommandItem,
} from "@aetherstack/patterns"

export function MyCommandPalette() {
  const [open, setOpen] = React.useState(false)

  // Bind to ⌘K / Ctrl+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <CommandPaletteDialog open={open} onOpenChange={setOpen}>
      <CommandPalette>
        <CommandPaletteInput placeholder="Search commands…" />
        <CommandPaletteList>
          <CommandPaletteEmpty>No results found.</CommandPaletteEmpty>
          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => setOpen(false)}>Dashboard</CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>Settings</CommandItem>
          </CommandGroup>
        </CommandPaletteList>
      </CommandPalette>
    </CommandPaletteDialog>
  )
}`}
      preview={<CommandPalettePreview />}
      props={[
        { name: "open", type: "boolean", required: true, description: "Controls dialog visibility (CommandPaletteDialog)." },
        { name: "onOpenChange", type: "(open: boolean) => void", required: true, description: "Called when the dialog open state should change." },
        { name: "children", type: "ReactNode", required: true, description: "Compose CommandPalette, CommandPaletteInput, CommandPaletteList etc. inside." },
        { name: "className", type: "string", description: "Additional classes on the CommandPrimitive root." },
      ]}
      a11yNotes={[
        "Built on cmdk which handles full keyboard navigation: Arrow keys, Enter to select, Escape to dismiss.",
        "The dialog traps focus and restores it on close.",
        "Results list is a live region — screen readers announce matches as you type.",
        "Group headings are rendered with proper semantics via cmdk internals.",
      ]}
    />
  )
}
