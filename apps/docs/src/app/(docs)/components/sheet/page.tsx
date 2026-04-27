import type { Metadata } from "next"
import { ComponentPage } from "@/components/component-page"
import { SheetPreview } from "@/components/previews/interactive-previews"

export const metadata: Metadata = {
  title: "Sheet",
  description: "A slide-in panel from any screen edge.",
}

const MANUAL_SOURCE = `// Sheet is built on @radix-ui/react-dialog with a side variant.
// It shares the Dialog overlay and close button infrastructure.
// Full source: packages/ui/src/components/sheet.tsx

import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cva } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out ...",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t ...",
        left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm ...",
        right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm ...",
      },
    },
    defaultVariants: { side: "right" },
  },
)

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose }`

export default function SheetPage() {
  return (
    <ComponentPage
      name="Sheet"
      description="A slide-in side panel built on Radix UI Dialog. Identical to Dialog in behavior (focus trap, scroll lock, Escape key) but slides in from a screen edge. Available from all four sides."
      radixSource="https://www.radix-ui.com/primitives/docs/components/dialog"
      features={[
        "Slides from top, right, bottom, or left",
        "Same accessibility guarantees as Dialog",
        "Focus trap and scroll lock",
        "Controlled and uncontrolled",
        "Built on Dialog — shares all dialog API",
      ]}
      preview={<SheetPreview />}
      previewCode={`import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Make changes to your profile here.
          </SheetDescription>
        </SheetHeader>
        {/* sheet body content */}
      </SheetContent>
    </Sheet>
  )
}`}
      cliInstall={`npx aether-ui add sheet`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-dialog class-variance-authority lucide-react`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "All four sides",
          description: "Use the side prop to control where the sheet slides in from.",
          preview: <SheetPreview />,
          code: `{(["top", "right", "bottom", "left"] as const).map((side) => (
  <Sheet key={side}>
    <SheetTrigger asChild>
      <Button variant="outline" className="capitalize">{side}</Button>
    </SheetTrigger>
    <SheetContent side={side}>
      <SheetHeader>
        <SheetTitle>Sheet from {side}</SheetTitle>
        <SheetDescription>Content inside the sheet.</SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
))}`,
        },
        {
          title: "Navigation drawer",
          description: "Use a left Sheet as a responsive navigation drawer.",
          preview: <SheetPreview />,
          code: `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline" size="icon" className="md:hidden">
      <Menu className="h-4 w-4" />
    </Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Navigation</SheetTitle>
    </SheetHeader>
    <nav className="mt-6 space-y-1">
      <a href="/dashboard" className="block rounded-md px-3 py-2 text-sm hover:bg-muted">Dashboard</a>
      <a href="/projects" className="block rounded-md px-3 py-2 text-sm hover:bg-muted">Projects</a>
      <a href="/settings" className="block rounded-md px-3 py-2 text-sm hover:bg-muted">Settings</a>
    </nav>
  </SheetContent>
</Sheet>`,
        },
        {
          title: "Settings panel",
          description: "A right-side settings panel is common in SaaS dashboards.",
          preview: <SheetPreview />,
          code: `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">
      <Settings className="h-4 w-4 mr-2" />
      Settings
    </Button>
  </SheetTrigger>
  <SheetContent className="sm:max-w-md">
    <SheetHeader>
      <SheetTitle>Account Settings</SheetTitle>
      <SheetDescription>
        Manage your account preferences.
      </SheetDescription>
    </SheetHeader>
    <div className="py-6 space-y-6">
      {/* settings fields */}
    </div>
    <SheetFooter>
      <SheetClose asChild>
        <Button variant="outline">Cancel</Button>
      </SheetClose>
      <Button>Save changes</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
        },
      ]}
      props={[]}
      propGroups={[
        {
          title: "Sheet (Root)",
          props: [
            { name: "open", type: "boolean", description: "Controlled open state." },
            { name: "defaultOpen", type: "boolean", default: "false", description: "Uncontrolled initial open state." },
            { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes." },
          ],
        },
        {
          title: "SheetContent",
          props: [
            { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"right"', description: "The edge the sheet slides in from." },
            { name: "className", type: "string", description: "Use sm:max-w-* to control sheet width." },
            { name: "onInteractOutside", type: "(e: Event) => void", description: "Called when user clicks the overlay. Prevent default to disable close-on-click." },
          ],
        },
      ]}
      a11yNotes={[
        "Same accessibility behavior as Dialog — focus trap, aria-modal, role='dialog'.",
        "SheetTitle provides the accessible name and is required.",
        "Escape key always closes the sheet unless prevented.",
        "For a navigation drawer, add role='navigation' and an aria-label to the nav element inside.",
      ]}
    />
  )
}
