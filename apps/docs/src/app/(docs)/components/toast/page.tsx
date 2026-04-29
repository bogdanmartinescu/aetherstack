import type { Metadata } from "next"
import { ComponentPage } from "@/components/component-page"
import {
  ToastPreview,
  ToastDestructivePreview,
} from "@/components/previews/interactive-previews"

export const metadata: Metadata = {
  title: "Toast",
  description: "Transient notification messages that slide in from the edge of the screen.",
}

const MANUAL_SOURCE = `"use client"

import * as React from "react"
import * as ToastPrimitive from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitive.Provider

const ToastViewport = React.forwardRef<...>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className,
    )}
    {...props}
  />
))

const toastVariants = cva([...], {
  variants: {
    variant: {
      default: "border border-border bg-background text-foreground",
      destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
    },
  },
  defaultVariants: { variant: "default" },
})

const Toast = React.forwardRef<...>(({ className, variant, ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    className={cn(toastVariants({ variant }), className)}
    {...props}
  />
))

const ToastAction = React.forwardRef<...>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action ref={ref} className={cn("shrink-0 rounded-md border ...", className)} {...props} />
))

const ToastClose = React.forwardRef<...>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close ref={ref} className={cn("absolute right-2 top-2 ...", className)} toast-close="" {...props}>
    <XIcon className="h-4 w-4" />
  </ToastPrimitive.Close>
))

const ToastTitle = React.forwardRef<...>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
))

const ToastDescription = React.forwardRef<...>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
))

// useToast hook — module-level reducer, state is shared across all consumers
function useToast() { ... }
function toast(input: ToastInput) { ... }

// Full source: packages/ui/src/components/toast.tsx

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  toastVariants,
  useToast,
  toast,
}`

export default function ToastPage() {
  return (
    <ComponentPage
      name="Toast"
      description="Transient notification messages that appear at the edge of the screen and auto-dismiss. Built on Radix UI Toast — handles stacking, swipe-to-dismiss, and ARIA live region announcements."
      radixSource="https://www.radix-ui.com/primitives/docs/components/toast"
      features={[
        "Module-level state — call toast() from anywhere in your app",
        "Two variants: default and destructive",
        "Supports title, description, and an optional action button",
        "Swipe-to-dismiss on touch devices",
        "Auto-stacks up to 5 toasts (configurable via TOAST_LIMIT)",
        "ARIA live region — screen readers announce new toasts automatically",
        "Animated slide-in/out with Tailwind data-state classes",
      ]}
      preview={<ToastPreview />}
      previewCode={`"use client"

import { Button } from "@/components/ui/button"
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  useToast,
  toast,
} from "@/components/ui/toast"

export function ToastDemo() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      <Button
        variant="outline"
        onClick={() =>
          toast({ title: "Success!", description: "Your action was completed." })
        }
      >
        Show Toast
      </Button>

      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
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
          title: "Add ToastProvider and ToastViewport to your layout",
          code: `// app/layout.tsx
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  useToast,
} from "@/components/ui/toast"

// Wrap your app in ToastProvider and include ToastViewport at the root:
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ToastProvider>
          {children}
          <ToastViewport />
        </ToastProvider>
      </body>
    </html>
  )
}`,
          filename: "app/layout.tsx",
        },
      ]}
      examples={[
        {
          title: "Default",
          description: "A standard notification with title and description.",
          preview: <ToastPreview />,
          code: `import { toast } from "@/components/ui/toast"

toast({
  title: "Success!",
  description: "Your action was completed.",
})`,
        },
        {
          title: "Destructive",
          description: "Use variant='destructive' for error or warning notifications.",
          preview: <ToastDestructivePreview />,
          code: `import { toast } from "@/components/ui/toast"

toast({
  variant: "destructive",
  title: "Error",
  description: "Something went wrong. Please try again.",
})`,
        },
        {
          title: "With action",
          description: "Include a ToastAction button for recoverable operations like undo.",
          preview: <ToastPreview />,
          code: `import { toast, ToastAction } from "@/components/ui/toast"

toast({
  title: "Email sent",
  description: "Your message has been delivered.",
  action: (
    <ToastAction altText="Undo send" onClick={handleUndo}>
      Undo
    </ToastAction>
  ),
})`,
        },
        {
          title: "Title and description",
          description: "Combine title and description for richer context.",
          preview: <ToastPreview />,
          code: `import { toast } from "@/components/ui/toast"

toast({
  title: "Scheduled",
  description: "Your post will be published on Friday at 9:00 AM.",
})`,
        },
      ]}
      props={[]}
      propGroups={[
        {
          title: "Toast",
          props: [
            {
              name: "variant",
              type: '"default" | "destructive"',
              default: '"default"',
              description: "Visual style. Use destructive for error or warning messages.",
            },
            {
              name: "open",
              type: "boolean",
              description: "Controlled open state. Managed automatically by useToast.",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean) => void",
              description: "Callback when open state changes. Managed automatically by useToast.",
            },
            {
              name: "duration",
              type: "number",
              default: "5000",
              description: "Milliseconds before the toast auto-dismisses.",
            },
          ],
        },
        {
          title: "ToastAction",
          props: [
            {
              name: "altText",
              type: "string",
              description: "Required. Screen-reader description of the action (e.g. 'Undo send email').",
            },
          ],
        },
        {
          title: "useToast hook",
          props: [
            {
              name: "toasts",
              type: "ToastEntry[]",
              description: "Array of active toast entries to render.",
            },
            {
              name: "toast(input)",
              type: "(input: ToastInput) => { id, dismiss, update }",
              description: "Imperative function to fire a new toast. Returns controls to dismiss or update it.",
            },
            {
              name: "dismiss(toastId?)",
              type: "(toastId?: string) => void",
              description: "Dismisses a specific toast by ID, or all toasts if no ID is provided.",
            },
          ],
        },
      ]}
      a11yNotes={[
        "ToastViewport has role='region' and aria-label='Notifications' — a screen reader landmark.",
        "Each Toast has role='status' and aria-live='polite' by default — announcements are non-interruptive.",
        "Destructive toasts use aria-live='assertive' for immediate announcement.",
        "ToastAction requires altText — a descriptive label read aloud by screen readers.",
        "ToastClose has aria-label='Close' — screen readers announce it as a dismiss button.",
        "Swipe-to-dismiss is available on touch devices with proper visual feedback.",
      ]}
    />
  )
}
