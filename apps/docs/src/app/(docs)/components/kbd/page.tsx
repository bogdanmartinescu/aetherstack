import type { Metadata } from "next"
import { Kbd } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Kbd",
  description: "Keyboard key badge for displaying shortcuts and hotkeys.",
}

const SOURCE = `import * as React from "react"
import { cn } from "@/lib/utils"

const Kbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        "inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
)
Kbd.displayName = "Kbd"

export { Kbd }`

export default function KbdPage() {
  return (
    <ComponentPage
      name="Kbd"
      description="Renders a keyboard key badge using the semantic <kbd> HTML element. Use to document shortcuts, command palette hints, or hotkey references."
      features={[
        "Semantic <kbd> element — correctly announced by screen readers",
        "Monospace font for authentic key appearance",
        "Composable — nest multiple Kbd for multi-key shortcuts",
        "No dependencies",
      ]}
      preview={
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            Press <Kbd>⌘</Kbd><Kbd>K</Kbd> to search
          </span>
          <span className="flex items-center gap-1">
            <Kbd>Ctrl</Kbd><Kbd>S</Kbd> to save
          </span>
          <span className="flex items-center gap-1">
            <Kbd>Escape</Kbd> to close
          </span>
        </div>
      }
      previewCode={`import { Kbd } from "@aetherstack/ui"

<span>Press <Kbd>⌘</Kbd><Kbd>K</Kbd> to search</span>
<span><Kbd>Ctrl</Kbd><Kbd>S</Kbd> to save</span>
<span><Kbd>Escape</Kbd> to close</span>`}
      cliInstall="npx aether-ui add kbd"
      manualInstallCode={SOURCE}
      examples={[
        {
          title: "In a command palette hint",
          description: "Show shortcuts alongside menu items.",
          preview: (
            <div className="w-56 rounded-md border border-border bg-background p-1 shadow-sm text-sm">
              {[
                { label: "Search", keys: ["⌘", "K"] },
                { label: "New file", keys: ["⌘", "N"] },
                { label: "Save", keys: ["⌘", "S"] },
              ].map(({ label, keys }) => (
                <div key={label} className="flex items-center justify-between rounded px-2 py-1.5 hover:bg-accent cursor-pointer">
                  <span>{label}</span>
                  <span className="flex gap-0.5">
                    {keys.map((k) => <Kbd key={k}>{k}</Kbd>)}
                  </span>
                </div>
              ))}
            </div>
          ),
          code: `<div className="flex items-center justify-between">
  <span>Search</span>
  <span className="flex gap-0.5">
    <Kbd>⌘</Kbd><Kbd>K</Kbd>
  </span>
</div>`,
        },
        {
          title: "In a search input",
          description: "Place inside the search trigger to hint the keyboard shortcut.",
          preview: (
            <button className="flex h-9 w-64 items-center gap-2 rounded-md border border-border bg-muted/40 px-3 text-xs text-muted-foreground">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <span className="flex-1 text-left">Search…</span>
              <Kbd>⌘K</Kbd>
            </button>
          ),
          code: `<button className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
  <SearchIcon />
  <span>Search…</span>
  <Kbd>⌘K</Kbd>
</button>`,
        },
      ]}
      props={[
        { name: "className", type: "string", description: "Additional classes for sizing, color, or spacing overrides." },
        { name: "...props", type: "React.HTMLAttributes<HTMLElement>", description: "All standard HTML element attributes." },
      ]}
      a11yNotes={[
        "<kbd> is a semantic HTML element — screen readers announce its content as keyboard input.",
        "For multi-key combos, wrap each key in its own Kbd rather than putting the whole shortcut in one.",
        "Avoid using Kbd as an interactive element — it's presentational only.",
      ]}
    />
  )
}
