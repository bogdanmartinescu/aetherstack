import type { Metadata } from "next"
import { ComponentPage } from "@/components/component-page"
import { DialogPreview } from "@/components/previews/interactive-previews"

export const metadata: Metadata = {
  title: "Dialog",
  description: "A modal window that overlays the page.",
}

const MANUAL_SOURCE = `import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<...>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
))

const DialogContent = React.forwardRef<...>(({ children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
        "gap-4 border border-border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out ...",
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 ...">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))

// + DialogHeader, DialogFooter, DialogTitle, DialogDescription
// Full source: packages/ui/src/components/dialog.tsx

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose }`

export default function DialogPage() {
  return (
    <ComponentPage
      name="Dialog"
      description="A modal dialog that interrupts user flow to focus attention on a critical action or information. Built on Radix UI Dialog — manages focus trapping, scroll locking, Escape key, and ARIA modal pattern automatically."
      radixSource="https://www.radix-ui.com/primitives/docs/components/dialog"
      features={[
        "Focus is trapped inside while open",
        "Page scroll is locked when dialog is open",
        "Escape key closes the dialog",
        "Animated open/close transitions",
        "Backdrop overlay with click-to-close",
        "Fully accessible with correct ARIA dialog role",
      ]}
      preview={<DialogPreview />}
      previewCode={`import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`}
      cliInstall={`npx aether-ui add dialog`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-dialog lucide-react`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Confirmation dialog",
          description: "Use for destructive or irreversible actions.",
          preview: <DialogPreview />,
          code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">Delete account</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete account</DialogTitle>
      <DialogDescription>
        This will permanently delete your account and all associated data.
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button variant="destructive" onClick={handleDelete}>
        Yes, delete
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
        },
        {
          title: "Form dialog",
          description: "Use dialogs for quick-entry forms without navigating away.",
          preview: <DialogPreview />,
          code: `<Dialog>
  <DialogTrigger asChild>
    <Button>Invite team member</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Invite team member</DialogTitle>
      <DialogDescription>
        Enter their email to send an invitation.
      </DialogDescription>
    </DialogHeader>
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="invite-email">Email address</Label>
        <Input id="invite-email" type="email" placeholder="colleague@company.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="invite-role">Role</Label>
        <Select>
          <SelectTrigger id="invite-role">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Send invitation</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
        },
        {
          title: "Controlled open state",
          description: "Control the dialog from parent state for programmatic open/close.",
          preview: <DialogPreview />,
          code: `"use client"
import { useState } from "react"

export function ControlledDialog() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Controlled dialog</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}`,
        },
      ]}
      props={[]}
      propGroups={[
        {
          title: "Dialog (Root)",
          props: [
            { name: "open", type: "boolean", description: "Controlled open state." },
            { name: "defaultOpen", type: "boolean", default: "false", description: "Uncontrolled initial open state." },
            { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes." },
            { name: "modal", type: "boolean", default: "true", description: "When true, focus is trapped and backdrop is shown." },
          ],
        },
        {
          title: "DialogContent",
          props: [
            { name: "className", type: "string", description: "Use sm:max-w-* to control dialog width." },
            { name: "onInteractOutside", type: "(e: Event) => void", description: "Called when user clicks outside. Call e.preventDefault() to prevent closing." },
            { name: "onEscapeKeyDown", type: "(e: KeyboardEvent) => void", description: "Called on Escape. Call e.preventDefault() to prevent closing." },
          ],
        },
        {
          title: "DialogClose",
          props: [
            { name: "asChild", type: "boolean", default: "false", description: "Render as a child element (e.g., wrap a Button)." },
          ],
        },
      ]}
      a11yNotes={[
        "Has role='dialog' and aria-modal='true' — screen readers announce it as a modal.",
        "Focus moves to the first focusable element when the dialog opens.",
        "Focus returns to the trigger element when the dialog closes.",
        "DialogTitle is required — it provides the accessible name for the dialog.",
        "DialogDescription is optional but recommended for supplementary context.",
        "The overlay backdrop has aria-hidden='true' to prevent screen readers from reading it.",
      ]}
    />
  )
}
