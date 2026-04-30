"use client"

import { useState } from "react"
import type { Metadata } from "next"
import { Collapsible, CollapsibleContent, CollapsibleTrigger, Button } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"
import { ChevronsUpDown } from "lucide-react"

const SOURCE = `import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }`

function Demo() {
  const [open, setOpen] = useState(false)
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-[300px] space-y-2">
      <div className="flex items-center justify-between space-x-4 rounded-md border border-border px-4 py-2">
        <h4 className="text-sm font-semibold">3 repositories pinned</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border border-border px-4 py-2 text-sm font-mono">@radix-ui/react-collapsible</div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border border-border px-4 py-2 text-sm font-mono">@radix-ui/react-dialog</div>
        <div className="rounded-md border border-border px-4 py-2 text-sm font-mono">@radix-ui/react-dropdown-menu</div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default function CollapsiblePage() {
  return (
    <ComponentPage
      name="Collapsible"
      description="An interactive component that expands and collapses content sections. Lower-level than Accordion — use when you need programmatic control or custom layouts."
      radixSource="https://www.radix-ui.com/primitives/docs/components/collapsible"
      features={[
        "Controlled and uncontrolled modes",
        "CollapsibleTrigger can be any element via asChild",
        "CollapsibleContent animates height via data-state",
        "No default styles — compose freely",
      ]}
      preview={<Demo />}
      previewCode={`import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@aetherstack/ui"

function Demo() {
  const [open, setOpen] = useState(false)
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>
        <p>Hidden content revealed on expand.</p>
      </CollapsibleContent>
    </Collapsible>
  )
}`}
      cliInstall="npx aether-ui add collapsible"
      manualInstallCode={SOURCE}
      manualSteps={[{ title: "Install dependencies", code: "npm install @radix-ui/react-collapsible", filename: "terminal" }]}
      examples={[]}
      props={[
        { name: "open", type: "boolean", description: "Controlled open state." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Initial open state for uncontrolled usage." },
        { name: "disabled", type: "boolean", default: "false", description: "Prevents opening/closing." },
        { name: "asChild", type: "boolean", description: "On CollapsibleTrigger — merge props into the child element." },
      ]}
      a11yNotes={[
        "CollapsibleTrigger sets aria-expanded on the trigger element automatically.",
        "CollapsibleContent uses aria-hidden when closed so screen readers skip it.",
        "Keyboard: Space or Enter on the trigger toggles the content.",
      ]}
    />
  )
}
