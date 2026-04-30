import type { Metadata } from "next"
import { Alert, AlertTitle, AlertDescription } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"
import { Info, AlertTriangle, CheckCircle2, XCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Alert",
  description: "Contextual feedback messages with multiple severity variants.",
}

const SOURCE = `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        warning: "border-amber-500/50 text-amber-700 dark:text-amber-400 [&>svg]:text-amber-500 bg-amber-50/50 dark:bg-amber-950/20",
        success: "border-emerald-500/50 text-emerald-700 dark:text-emerald-400 [&>svg]:text-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20",
        info: "border-blue-500/50 text-blue-700 dark:text-blue-400 [&>svg]:text-blue-500 bg-blue-50/50 dark:bg-blue-950/20",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
  ),
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
  ),
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
  ),
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription, alertVariants }`

export default function AlertPage() {
  return (
    <ComponentPage
      name="Alert"
      description="Contextual feedback banners with five severity variants. Pure CSS — no Radix dependency."
      features={[
        "5 variants: default, destructive, warning, success, info",
        "Icon slot via svg sibling selectors — just drop an SVG inside",
        "AlertTitle for bold heading, AlertDescription for body text",
        "role=\"alert\" for screen reader announcement",
      ]}
      preview={
        <div className="flex w-full max-w-md flex-col gap-3">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Default</AlertTitle>
            <AlertDescription>A neutral informational message.</AlertDescription>
          </Alert>
          <Alert variant="info">
            <Info className="h-4 w-4" />
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>Your session will expire in 10 minutes.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your changes have been saved.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>This action cannot be undone.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Destructive</AlertTitle>
            <AlertDescription>Failed to save changes. Please try again.</AlertDescription>
          </Alert>
        </div>
      }
      previewCode={`import { Alert, AlertTitle, AlertDescription } from "@aetherstack/ui"
import { CheckCircle2 } from "lucide-react"

<Alert variant="success">
  <CheckCircle2 className="h-4 w-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Your changes have been saved.</AlertDescription>
</Alert>`}
      cliInstall="npx aether-ui add alert"
      manualInstallCode={SOURCE}
      examples={[
        {
          title: "Without icon",
          description: "The icon slot is optional — the layout adapts automatically.",
          preview: (
            <Alert variant="info">
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>Maintenance window is scheduled for Sunday at 02:00 UTC.</AlertDescription>
            </Alert>
          ),
          code: `<Alert variant="info">
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>Maintenance window scheduled for Sunday at 02:00 UTC.</AlertDescription>
</Alert>`,
        },
        {
          title: "Description only",
          description: "AlertTitle is optional — use just AlertDescription for brief messages.",
          preview: (
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>You have unsaved changes.</AlertDescription>
            </Alert>
          ),
          code: `<Alert variant="warning">
  <AlertTriangle className="h-4 w-4" />
  <AlertDescription>You have unsaved changes.</AlertDescription>
</Alert>`,
        },
      ]}
      props={[
        { name: "variant", type: '"default" | "destructive" | "warning" | "success" | "info"', default: '"default"', description: "Controls border and text colour of the alert." },
        { name: "className", type: "string", description: "Additional classes on the alert div." },
        { name: "...props", type: "React.HTMLAttributes<HTMLDivElement>", description: "All standard HTML div attributes." },
      ]}
      a11yNotes={[
        "Alert has role=\"alert\" so screen readers announce it immediately when it appears in the DOM.",
        "For non-urgent updates consider role=\"status\" instead — override via the role prop.",
        "If the alert contains a link or button, ensure those are keyboard-accessible.",
      ]}
    />
  )
}
