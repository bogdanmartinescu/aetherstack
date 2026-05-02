"use client"

import { ComponentPage } from "@/components/component-page"
import {
  ToastPreview,
  ToastDestructivePreview,
} from "@/components/previews/interactive-previews"

const MANUAL_SOURCE = `"use client"

import * as React from "react"
import * as ToastPrimitive from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

const toastVariants = cva([...], {
  variants: {
    variant: {
      default:     "border-border bg-background text-foreground",
      success:     "border-emerald-500/30 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-100",
      warning:     "border-amber-500/30 bg-amber-50 text-amber-900 dark:bg-amber-950/60 dark:text-amber-100",
      info:        "border-blue-500/30 bg-blue-50 text-blue-900 dark:bg-blue-950/60 dark:text-blue-100",
      destructive: "border-destructive/30 bg-destructive/10 text-destructive",
    },
  },
  defaultVariants: { variant: "default" },
})

// Convenience component — drop in your root layout
function Toaster() {
  const { toasts } = useToast()
  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant, ...props }) => (
        <Toast key={id} variant={variant} {...props}>
          {VARIANT_ICONS[variant ?? "default"]}
          <div className="flex-1 space-y-0.5">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}

// Full source: packages/ui/src/components/toast.tsx`

export default function ToastPage() {
  return (
    <ComponentPage
      name="Toast"
      description="Transient notification messages that appear at the bottom-right of the screen and auto-dismiss. Five semantic variants with automatic icons, swipe-to-dismiss, and ARIA live regions. Drop in <Toaster /> once and call toast() anywhere."
      radixSource="https://www.radix-ui.com/primitives/docs/components/toast"
      features={[
        "Five variants: default, success, warning, info, destructive — each with automatic icon",
        "Module-level state — call toast() from anywhere without prop drilling",
        "Convenience <Toaster /> component — add once to your root layout",
        "Swipe-to-dismiss on touch devices",
        "Auto-stacks up to 5 toasts (configurable via TOAST_LIMIT)",
        "ARIA live region — screen readers announce new toasts automatically",
        "Animated slide-up with Tailwind data-state classes",
      ]}
      preview={<ToastPreview />}
      previewCode={`"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

export function ToastDemo() {
  return (
    <div className="flex gap-2">
      <Button onClick={() => toast({ title: "Saved!", description: "Changes have been saved." })}>
        Default
      </Button>
      <Button onClick={() => toast({ variant: "success", title: "Success!", description: "Action completed." })}>
        Success
      </Button>
      <Button onClick={() => toast({ variant: "info", title: "Heads up", description: "New version available." })}>
        Info
      </Button>
      <Button onClick={() => toast({ variant: "warning", title: "Warning", description: "Session expiring soon." })}>
        Warning
      </Button>
    </div>
  )
}`}
      cliInstall={`npx aether-ui add toast`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-toast class-variance-authority lucide-react`,
          filename: "terminal",
        },
        {
          title: "Add <Toaster /> to your root layout",
          code: `// app/layout.tsx
import { Toaster } from "@/components/ui/toast"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}`,
          filename: "app/layout.tsx",
        },
        {
          title: "Fire toasts from anywhere",
          code: `import { toast } from "@/components/ui/toast"

// Default
toast({ title: "Saved!", description: "Your changes have been saved." })

// Success
toast({ variant: "success", title: "Done!", description: "Export finished." })

// Warning
toast({ variant: "warning", title: "Warning", description: "Session expires in 5 min." })

// Info
toast({ variant: "info", title: "Update available", description: "v2.1.0 is ready." })

// Error
toast({ variant: "destructive", title: "Error", description: "Something went wrong." })`,
          filename: "your-component.tsx",
        },
      ]}
      examples={[
        {
          title: "All variants",
          description: "Five semantic variants — each includes an automatic icon and colour-coded background.",
          preview: <ToastPreview />,
          code: `toast({ title: "Saved!", description: "Changes have been saved." })
toast({ variant: "success", title: "Success!", description: "Action completed." })
toast({ variant: "info", title: "Heads up", description: "New version available." })
toast({ variant: "warning", title: "Warning", description: "Session expiring soon." })
toast({ variant: "destructive", title: "Error", description: "Something went wrong." })`,
        },
        {
          title: "Destructive",
          description: "Use variant='destructive' for errors and critical failures.",
          preview: <ToastDestructivePreview />,
          code: `toast({
  variant: "destructive",
  title: "Delete failed",
  description: "Could not delete the record. Please try again.",
})`,
        },
        {
          title: "With action",
          description: "Include a ToastAction for recoverable operations like undo.",
          preview: <ToastPreview />,
          code: `import { toast, ToastAction } from "@/components/ui/toast"

toast({
  variant: "success",
  title: "Email sent",
  description: "Your message has been delivered.",
  action: (
    <ToastAction altText="Undo send" onClick={handleUndo}>
      Undo
    </ToastAction>
  ),
})`,
        },
      ]}
      props={[]}
      propGroups={[
        {
          title: "toast() function",
          props: [
            {
              name: "title",
              type: "ReactNode",
              description: "Bold heading text displayed in the toast.",
            },
            {
              name: "description",
              type: "ReactNode",
              description: "Supporting detail text below the title.",
            },
            {
              name: "variant",
              type: '"default" | "success" | "warning" | "info" | "destructive"',
              default: '"default"',
              description: "Controls the colour scheme and automatic icon. Choose based on the semantic meaning of the notification.",
            },
            {
              name: "duration",
              type: "number",
              default: "5000",
              description: "Milliseconds before the toast auto-dismisses.",
            },
            {
              name: "action",
              type: "ToastActionElement",
              description: "Optional action button for recoverable operations (e.g. Undo).",
            },
          ],
        },
        {
          title: "ToastAction",
          props: [
            {
              name: "altText",
              type: "string",
              description: "Required. Screen-reader description of the action.",
            },
          ],
        },
        {
          title: "useToast hook",
          props: [
            {
              name: "toasts",
              type: "ToastEntry[]",
              description: "Array of active toast entries (used internally by <Toaster />).",
            },
            {
              name: "toast(input)",
              type: "(input: ToastInput) => { id, dismiss, update }",
              description: "Imperative function to fire a toast. Returns controls to dismiss or update it.",
            },
            {
              name: "dismiss(toastId?)",
              type: "(toastId?: string) => void",
              description: "Dismisses a toast by ID, or all toasts if no ID is provided.",
            },
          ],
        },
      ]}
      a11yNotes={[
        "ToastViewport has role='region' and aria-label='Notifications' — a landmark for assistive technology.",
        "Each Toast has role='status' and aria-live='polite' — announcements are non-interruptive.",
        "Destructive toasts use aria-live='assertive' for immediate announcement of critical errors.",
        "ToastAction requires altText — a descriptive label read aloud by screen readers.",
        "ToastClose has aria-label='Close' — announced as a dismiss control.",
        "Swipe-to-dismiss is available on touch devices with ARIA-appropriate interaction patterns.",
      ]}
    />
  )
}
