import type { Metadata } from "next"
import { Skeleton, Card, CardContent, CardHeader } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Skeleton",
  description: "A loading placeholder that mimics the shape of content.",
}

const MANUAL_SOURCE = `import * as React from "react"
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }`

export default function SkeletonPage() {
  return (
    <ComponentPage
      name="Skeleton"
      description="A loading placeholder that mimics the shape of content while data is being fetched. Use it in place of actual content to reduce perceived loading time and layout shift."
      features={[
        "CSS-only pulse animation using animate-pulse",
        "Uses bg-muted token — adapts to light/dark mode",
        "Composable — size and shape via className",
        "No JS, no dependencies",
      ]}
      preview={
        <div className="flex flex-col gap-3 w-64">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          </div>
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3 w-3/5" />
        </div>
      }
      previewCode={`import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDemo() {
  return (
    <div className="flex flex-col gap-3 w-64">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      </div>
      <Skeleton className="h-32 w-full rounded-lg" />
      <Skeleton className="h-3.5 w-full" />
      <Skeleton className="h-3 w-3/5" />
    </div>
  )
}`}
      cliInstall={`npx aether-ui add skeleton`}
      manualInstallCode={MANUAL_SOURCE}
      examples={[
        {
          title: "Text lines",
          description: "Mimic paragraph text with varying widths.",
          preview: (
            <div className="w-64 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/5" />
            </div>
          ),
          code: `<div className="space-y-2">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-4/5" />
  <Skeleton className="h-4 w-3/5" />
</div>`,
        },
        {
          title: "Avatar + text",
          description: "Match the shape of an avatar with accompanying text lines.",
          preview: (
            <div className="flex w-64 items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          ),
          code: `<div className="flex items-center gap-3">
  <Skeleton className="h-10 w-10 rounded-full" />
  <div className="space-y-2 flex-1">
    <Skeleton className="h-3.5 w-full" />
    <Skeleton className="h-3 w-3/4" />
  </div>
</div>`,
        },
        {
          title: "Card skeleton",
          description: "A full card-sized loading state.",
          preview: (
            <Card className="w-64">
              <CardHeader className="gap-2">
                <Skeleton className="h-5 w-3/5" />
                <Skeleton className="h-3.5 w-4/5" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3 w-2/5" />
                <Skeleton className="h-9 w-24 rounded-md" />
              </CardContent>
            </Card>
          ),
          code: `<Card>
  <CardHeader className="gap-2">
    <Skeleton className="h-5 w-3/5" />
    <Skeleton className="h-3.5 w-4/5" />
  </CardHeader>
  <CardContent className="space-y-3">
    <Skeleton className="h-3.5 w-full" />
    <Skeleton className="h-3.5 w-full" />
    <Skeleton className="h-9 w-24 rounded-md" />
  </CardContent>
</Card>`,
        },
        {
          title: "Table rows",
          description: "Skeleton rows for a data table loading state.",
          preview: (
            <div className="w-full space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-4 rounded-md border border-border px-4 py-3">
                  <Skeleton className="h-3.5 w-1/4" />
                  <Skeleton className="h-3.5 w-1/4" />
                  <Skeleton className="h-3.5 w-1/4" />
                  <Skeleton className="h-3.5 w-1/4" />
                </div>
              ))}
            </div>
          ),
          code: `{Array.from({ length: 4 }).map((_, i) => (
  <div key={i} className="flex gap-4 px-4 py-3 border-b border-border">
    <Skeleton className="h-4 w-1/4" />
    <Skeleton className="h-4 w-1/4" />
    <Skeleton className="h-4 w-1/4" />
    <Skeleton className="h-4 w-1/4" />
  </div>
))}`,
        },
      ]}
      props={[
        {
          name: "className",
          type: "string",
          required: true,
          description:
            "Controls the size and shape of the skeleton. Use Tailwind height (h-*), width (w-*), and border-radius (rounded-*) utilities to match your content.",
        },
        {
          name: "...props",
          type: "React.HTMLAttributes<HTMLDivElement>",
          description: "All standard HTML div attributes.",
        },
      ]}
      a11yNotes={[
        "Add aria-busy='true' on the parent container while content is loading to inform screen reader users.",
        "Consider adding a visually-hidden text like 'Loading content' inside or near the skeleton area for screen readers.",
        "Remove skeletons promptly when content loads — don't leave them as decorative placeholders.",
      ]}
    />
  )
}
