import type { Metadata } from "next"
import {
  VisuallyHidden,
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"
import { Settings } from "lucide-react"

export const metadata: Metadata = {
  title: "Visually Hidden",
  description: "Hides content visually while keeping it accessible to screen readers.",
}

const MANUAL_SOURCE = `import * as VisuallyHiddenPrimitive from "@radix-ui/react-visually-hidden"

const VisuallyHidden = VisuallyHiddenPrimitive.Root

export { VisuallyHidden }`

export default function VisuallyHiddenPage() {
  return (
    <ComponentPage
      name="Visually Hidden"
      description="Hides content visually while keeping it accessible to screen readers. Required for icon-only buttons, dialogs without visible titles, and any UI where visual design omits text that assistive technology needs."
      radixSource="https://www.radix-ui.com/primitives/docs/utilities/visually-hidden"
      features={[
        "Content is announced by screen readers",
        "Invisible to sighted users",
        "Required for accessible icon-only buttons and dialogs without visible titles",
        "Built on Radix UI VisuallyHidden",
      ]}
      preview={
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" aria-label="Open settings">
            <Settings className="h-4 w-4" />
            <VisuallyHidden>Open settings</VisuallyHidden>
          </Button>
          <span className="text-sm text-muted-foreground">
            Icon button with hidden accessible label
          </span>
        </div>
      }
      previewCode={`import { VisuallyHidden } from "@/components/ui/visually-hidden"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

export function VisuallyHiddenDemo() {
  return (
    <Button variant="outline" size="icon">
      <Settings className="h-4 w-4" />
      <VisuallyHidden>Open settings</VisuallyHidden>
    </Button>
  )
}`}
      cliInstall={`npx aether-ui add visually-hidden`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-visually-hidden`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Icon-only button",
          description: "Provide an accessible name for a button that shows only an icon.",
          preview: (
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
                <VisuallyHidden>Settings</VisuallyHidden>
              </Button>
            </div>
          ),
          code: `<Button variant="outline" size="icon">
  <Settings className="h-4 w-4" />
  <VisuallyHidden>Settings</VisuallyHidden>
</Button>`,
        },
        {
          title: "Dialog with hidden title",
          description: "Use inside DialogTitle when you want a title for screen readers but no visible heading.",
          preview: (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>
                  <VisuallyHidden>Image preview dialog</VisuallyHidden>
                </DialogTitle>
                <DialogDescription>
                  <VisuallyHidden>A large preview of the selected image</VisuallyHidden>
                </DialogDescription>
                <div className="flex h-40 items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
                  Image preview content
                </div>
              </DialogContent>
            </Dialog>
          ),
          code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogTitle>
      <VisuallyHidden>Image preview dialog</VisuallyHidden>
    </DialogTitle>
    <DialogDescription>
      <VisuallyHidden>A large preview of the selected image</VisuallyHidden>
    </DialogDescription>
    {/* visual content */}
  </DialogContent>
</Dialog>`,
        },
        {
          title: "Skip navigation link",
          description: "A common accessibility pattern — visible only on focus.",
          preview: (
            <div className="relative">
              <a
                href="#main"
                className="absolute left-0 top-0 -translate-y-full rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground transition-transform focus:translate-y-0"
              >
                Skip to main content
              </a>
              <Button variant="outline">Tab to see skip link above</Button>
            </div>
          ),
          code: `<a
  href="#main"
  className="absolute left-0 top-0 -translate-y-full rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground transition-transform focus:translate-y-0"
>
  Skip to main content
</a>`,
        },
      ]}
      props={[
        {
          name: "children",
          type: "ReactNode",
          description: "Content to hide visually but expose to screen readers.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional Tailwind classes (use sparingly — VisuallyHidden applies its own positioning).",
        },
      ]}
      a11yNotes={[
        "Use inside DialogContent when you want a title but no visible heading — Radix Dialog requires a DialogTitle.",
        "Use inside icon-only buttons to provide accessible names for screen readers.",
        "Do not use display:none or visibility:hidden as alternatives — these hide content from assistive technology too.",
        "Prefer native aria-label on interactive elements when possible; use VisuallyHidden for non-interactive text nodes.",
      ]}
    />
  )
}
