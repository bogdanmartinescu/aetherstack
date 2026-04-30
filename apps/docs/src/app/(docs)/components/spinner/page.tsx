import type { Metadata } from "next"
import { Spinner, Button } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Spinner",
  description: "Animated loading indicator with four sizes.",
}

const SOURCE = `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-current border-t-transparent",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        default: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12",
      },
    },
    defaultVariants: { size: "default" },
  },
)

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, label = "Loading…", ...props }, ref) => (
    <div ref={ref} role="status" aria-label={label} className={cn(spinnerVariants({ size }), className)} {...props}>
      <span className="sr-only">{label}</span>
    </div>
  ),
)

export { Spinner, spinnerVariants }`

export default function SpinnerPage() {
  return (
    <ComponentPage
      name="Spinner"
      description="A simple CSS-only animated loading indicator. Uses border-t-transparent to create the spinning arc effect. No dependencies."
      features={[
        "4 sizes: sm, default, lg, xl",
        "role=\"status\" + aria-label for screen reader accessibility",
        "Colour inherits from currentColor — adapts to any context",
        "No external dependencies",
      ]}
      preview={
        <div className="flex flex-wrap items-center gap-6">
          <Spinner size="sm" />
          <Spinner size="default" />
          <Spinner size="lg" />
          <Spinner size="xl" />
        </div>
      }
      previewCode={`import { Spinner } from "@aetherstack/ui"

<Spinner size="sm" />
<Spinner size="default" />
<Spinner size="lg" />
<Spinner size="xl" />`}
      cliInstall="npx aether-ui add spinner"
      manualInstallCode={SOURCE}
      examples={[
        {
          title: "Inside a button",
          description: "Combine with Button to show loading state during async actions.",
          preview: (
            <div className="flex gap-2">
              <Button disabled>
                <Spinner size="sm" className="mr-2" />
                Loading…
              </Button>
              <Button variant="outline" disabled>
                <Spinner size="sm" className="mr-2" />
                Saving
              </Button>
            </div>
          ),
          code: `<Button disabled>
  <Spinner size="sm" className="mr-2" />
  Loading…
</Button>`,
        },
        {
          title: "Custom color",
          description: "Spinner inherits currentColor — use text utilities to change its color.",
          preview: (
            <div className="flex gap-4">
              <Spinner className="text-primary" />
              <Spinner className="text-destructive" />
              <Spinner className="text-muted-foreground" />
              <Spinner className="text-emerald-500" />
            </div>
          ),
          code: `<Spinner className="text-primary" />
<Spinner className="text-destructive" />
<Spinner className="text-emerald-500" />`,
        },
        {
          title: "Centered page loader",
          description: "Full-height centered spinner for page-level loading states.",
          preview: (
            <div className="flex h-32 items-center justify-center">
              <Spinner size="lg" label="Loading page content…" />
            </div>
          ),
          code: `<div className="flex h-screen items-center justify-center">
  <Spinner size="lg" label="Loading page content…" />
</div>`,
        },
      ]}
      props={[
        { name: "size", type: '"sm" | "default" | "lg" | "xl"', default: '"default"', description: "Controls the width and height of the spinner." },
        { name: "label", type: "string", default: '"Loading…"', description: "Screen-reader label set on aria-label and in the sr-only span." },
        { name: "className", type: "string", description: "Additional classes — use text-* to change colour." },
      ]}
      a11yNotes={[
        "role=\"status\" announces loading updates without interrupting the user.",
        "The visible spinner div is hidden to screen readers; the sr-only span provides the label.",
        "Set label to a meaningful description, e.g. \"Saving changes…\" or \"Loading results…\".",
      ]}
    />
  )
}
