"use client"

import { SonnerToaster, sonnerToast, Button } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

const MANUAL_SOURCE = `"use client"

import { Toaster as SonnerToaster, toast } from "sonner"
import type { ToasterProps } from "sonner"
import { cn } from "@/lib/utils"

function Toaster({ className, toastOptions, ...props }: ToasterProps) {
  return (
    <SonnerToaster
      className={cn(className)}
      toastOptions={{
        classNames: {
          toast: "bg-background text-foreground border border-border shadow-md",
          title: "font-medium text-sm",
          description: "text-muted-foreground text-sm",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
          closeButton: "border-border",
          error: "text-destructive border-destructive/50",
        },
        ...toastOptions,
      }}
      {...props}
    />
  )
}

export { Toaster, toast }`

export default function SonnerPage() {
  return (
    <ComponentPage
      name="Sonner"
      description="A modern opinionated toast notification system and alternative to Toast. Stacks notifications in a queue with auto-dismiss, rich semantic types, and promise-based toasts for async actions."
      features={[
        "Stacked toast queue with auto-dismiss",
        "Promise-based toast for async actions",
        "Themed to match Aether UI tokens",
        "Rich toast types: success, error, warning, info",
      ]}
      preview={
        <div className="flex flex-wrap gap-2">
          <SonnerToaster />
          <Button variant="outline" onClick={() => sonnerToast("Default notification")}>
            Default
          </Button>
          <Button
            variant="outline"
            onClick={() => sonnerToast.success("Saved successfully!")}
          >
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() => sonnerToast.error("Something went wrong")}
          >
            Error
          </Button>
          <Button
            variant="outline"
            onClick={() => sonnerToast.warning("Session expiring soon")}
          >
            Warning
          </Button>
        </div>
      }
      previewCode={`"use client"

import { SonnerToaster, sonnerToast, Button } from "@/components/ui/sonner"

export function SonnerDemo() {
  return (
    <>
      <SonnerToaster />
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => sonnerToast("Default notification")}>
          Default
        </Button>
        <Button variant="outline" onClick={() => sonnerToast.success("Saved!")}>
          Success
        </Button>
        <Button variant="outline" onClick={() => sonnerToast.error("Something went wrong")}>
          Error
        </Button>
      </div>
    </>
  )
}`}
      cliInstall={`npx aether-ui add sonner`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install sonner`,
          filename: "terminal",
        },
        {
          title: "Add <SonnerToaster /> to your root layout",
          code: `// app/layout.tsx
import { SonnerToaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SonnerToaster />
      </body>
    </html>
  )
}`,
          filename: "app/layout.tsx",
        },
        {
          title: "Fire toasts from anywhere",
          code: `import { sonnerToast } from "@/components/ui/sonner"

sonnerToast("Default message")
sonnerToast.success("Action completed!")
sonnerToast.error("Something went wrong")
sonnerToast.warning("Session expiring soon")
sonnerToast.info("Update available")

// Promise-based
sonnerToast.promise(fetch("/api/save"), {
  loading: "Saving…",
  success: "Saved!",
  error: "Save failed",
})`,
          filename: "your-component.tsx",
        },
      ]}
      examples={[
        {
          title: "All types",
          description: "Fire default, success, error, and warning toasts.",
          preview: (
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => sonnerToast("Hello!")}>Default</Button>
              <Button variant="outline" onClick={() => sonnerToast.success("Done!")}>Success</Button>
              <Button variant="outline" onClick={() => sonnerToast.error("Failed!")}>Error</Button>
              <Button variant="outline" onClick={() => sonnerToast.warning("Heads up!")}>Warning</Button>
              <Button variant="outline" onClick={() => sonnerToast.info("FYI")}>Info</Button>
            </div>
          ),
          code: `sonnerToast("Hello!")
sonnerToast.success("Done!")
sonnerToast.error("Failed!")
sonnerToast.warning("Heads up!")
sonnerToast.info("FYI")`,
        },
        {
          title: "With description",
          description: "Add a description for more context.",
          preview: (
            <Button
              variant="outline"
              onClick={() =>
                sonnerToast("Changes saved", {
                  description: "Your profile has been updated successfully.",
                })
              }
            >
              Show with description
            </Button>
          ),
          code: `sonnerToast("Changes saved", {
  description: "Your profile has been updated successfully.",
})`,
        },
        {
          title: "Promise toast",
          description: "Track async operations with loading, success, and error states automatically.",
          preview: (
            <Button
              variant="outline"
              onClick={() =>
                sonnerToast.promise(
                  new Promise((resolve) => setTimeout(resolve, 2000)),
                  { loading: "Loading…", success: "Done!", error: "Failed" },
                )
              }
            >
              Async action
            </Button>
          ),
          code: `sonnerToast.promise(saveData(), {
  loading: "Saving…",
  success: "Saved successfully!",
  error: "Failed to save",
})`,
        },
      ]}
      props={[]}
      propGroups={[
        {
          title: "SonnerToaster",
          props: [
            {
              name: "position",
              type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"',
              default: '"bottom-right"',
              description: "Screen position where toasts appear.",
            },
            {
              name: "richColors",
              type: "boolean",
              default: "false",
              description: "Enables richer semantic color themes for each toast type.",
            },
            {
              name: "expand",
              type: "boolean",
              default: "false",
              description: "Expands all toasts by default instead of stacking them.",
            },
            {
              name: "duration",
              type: "number",
              default: "4000",
              description: "Default auto-dismiss duration in milliseconds.",
            },
            {
              name: "closeButton",
              type: "boolean",
              default: "false",
              description: "Renders a close button on each toast.",
            },
          ],
        },
        {
          title: "sonnerToast()",
          props: [
            {
              name: "message",
              type: "string | ReactNode",
              description: "The main toast message.",
            },
            {
              name: "description",
              type: "string | ReactNode",
              description: "Optional secondary text below the message.",
            },
            {
              name: "duration",
              type: "number",
              description: "Per-toast override for auto-dismiss duration.",
            },
            {
              name: "action",
              type: "{ label: string; onClick: () => void }",
              description: "Optional action button rendered inside the toast.",
            },
          ],
        },
      ]}
      a11yNotes={[
        "Sonner renders toasts in an aria-live region — screen readers announce new toasts automatically.",
        "Use closeButton prop on SonnerToaster to give keyboard users an explicit dismiss control.",
        "Avoid setting duration to 0 (never dismisses) for non-critical toasts — users may miss them.",
        "For critical errors, prefer a Dialog or Alert component over a transient toast.",
      ]}
    />
  )
}
