import type { Metadata } from "next"
import { Badge } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Badge",
  description: "Small label for status, count, or category.",
}

const MANUAL_SOURCE = `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }`

export default function BadgePage() {
  return (
    <ComponentPage
      name="Badge"
      description="A small, non-interactive label used to highlight status, category, count, or other short metadata. Renders as a div — not a button."
      features={[
        "4 variants: default (primary), secondary, destructive, outline",
        "Pill-shaped by default (rounded-full)",
        "Inherits all standard HTML div attributes",
        "Composable — works alongside text, buttons, and table cells",
      ]}
      preview={
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      }
      previewCode={`import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return (
    <div className="flex gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}`}
      cliInstall={`npx aether-ui add badge`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install class-variance-authority`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Variants",
          description: "Use variant to communicate semantic meaning.",
          preview: (
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Active</Badge>
              <Badge variant="secondary">Draft</Badge>
              <Badge variant="destructive">Error</Badge>
              <Badge variant="outline">Pending</Badge>
            </div>
          ),
          code: `<Badge variant="default">Active</Badge>
<Badge variant="secondary">Draft</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Pending</Badge>`,
        },
        {
          title: "With status dots",
          description: "Combine with a colored dot for richer status indicators.",
          preview: (
            <div className="flex flex-wrap gap-2">
              <Badge variant="default" className="gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                Online
              </Badge>
              <Badge variant="secondary" className="gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                Away
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                Offline
              </Badge>
            </div>
          ),
          code: `<Badge className="gap-1.5">
  <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
  Online
</Badge>`,
        },
        {
          title: "In a table cell",
          description: "Badges work naturally as inline elements within other components.",
          preview: (
            <div className="rounded-md border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left">
                  <tr>
                    <th className="px-4 py-2 font-medium text-muted-foreground">Name</th>
                    <th className="px-4 py-2 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="px-4 py-2">Alice Chen</td>
                    <td className="px-4 py-2"><Badge>Active</Badge></td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-2">Bob Marsh</td>
                    <td className="px-4 py-2"><Badge variant="secondary">Inactive</Badge></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ),
          code: `<TableCell>
  <Badge variant="default">Active</Badge>
</TableCell>`,
        },
        {
          title: "Custom colors",
          description: "Extend with arbitrary Tailwind classes for custom badge colors.",
          preview: (
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100/80">Info</Badge>
              <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100/80">Success</Badge>
              <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100/80">Warning</Badge>
            </div>
          ),
          code: `<Badge className="bg-blue-100 text-blue-800 border-blue-200">Info</Badge>
<Badge className="bg-green-100 text-green-800 border-green-200">Success</Badge>
<Badge className="bg-amber-100 text-amber-800 border-amber-200">Warning</Badge>`,
        },
      ]}
      props={[
        {
          name: "variant",
          type: '"default" | "secondary" | "destructive" | "outline"',
          default: '"default"',
          description: "Controls the visual style of the badge.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional Tailwind classes for custom styling.",
        },
        {
          name: "...props",
          type: "React.HTMLAttributes<HTMLDivElement>",
          description: "All standard HTML div attributes.",
        },
      ]}
      a11yNotes={[
        "Badge is a presentational div — it has no implicit ARIA role.",
        "If a badge communicates important information not conveyed elsewhere, add aria-label or visually-hidden text.",
        "Do not use a badge as an interactive element — for clickable labels, use Button with a badge-like class.",
      ]}
    />
  )
}
