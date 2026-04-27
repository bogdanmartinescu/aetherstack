import type { Metadata } from "next"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
  Badge,
} from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Card",
  description: "A surface container for grouping related content.",
}

const MANUAL_SOURCE = `import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-lg border border-border bg-card text-card-foreground shadow-sm", className)}
      {...props}
    />
  ),
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  ),
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }`

export default function CardPage() {
  return (
    <ComponentPage
      name="Card"
      description="A flexible surface container for grouping related content. Composed of six sub-components — Card, CardHeader, CardTitle, CardDescription, CardContent, and CardFooter — that can be used together or independently."
      features={[
        "Six composable sub-components",
        "Uses bg-card and border-border tokens — adapts automatically to light/dark mode",
        "Subtle shadow-sm by default",
        "Fully custom layout — add, remove, or reorder any sub-component",
      ]}
      preview={
        <Card className="w-72">
          <CardHeader>
            <CardTitle>Account Plan</CardTitle>
            <CardDescription>You are on the Pro plan.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            12 of 50 seats used · renews Jan 1, 2027
          </CardContent>
          <CardFooter className="gap-2">
            <Button size="sm">Manage</Button>
            <Button size="sm" variant="ghost">View usage</Button>
          </CardFooter>
        </Card>
      }
      previewCode={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

<Card>
  <CardHeader>
    <CardTitle>Account Plan</CardTitle>
    <CardDescription>You are on the Pro plan.</CardDescription>
  </CardHeader>
  <CardContent className="text-sm text-muted-foreground">
    12 of 50 seats used · renews Jan 1, 2027
  </CardContent>
  <CardFooter className="gap-2">
    <Button size="sm">Manage</Button>
    <Button size="sm" variant="ghost">View usage</Button>
  </CardFooter>
</Card>`}
      cliInstall={`npx aether-ui add card`}
      manualInstallCode={MANUAL_SOURCE}
      examples={[
        {
          title: "Metric card",
          description: "Display a key metric with a label and supporting data.",
          preview: (
            <div className="flex gap-4">
              {[
                { label: "Total revenue", value: "$12,400", delta: "+8.2%" },
                { label: "Active users", value: "3,280", delta: "+4.1%" },
              ].map((m) => (
                <Card key={m.label} className="w-44">
                  <CardHeader className="pb-2">
                    <CardDescription>{m.label}</CardDescription>
                    <CardTitle className="text-3xl">{m.value}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-muted-foreground">{m.delta} from last month</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ),
          code: `<Card>
  <CardHeader className="pb-2">
    <CardDescription>Total revenue</CardDescription>
    <CardTitle className="text-3xl">$12,400</CardTitle>
  </CardHeader>
  <CardContent className="pt-0">
    <p className="text-xs text-muted-foreground">+8.2% from last month</p>
  </CardContent>
</Card>`,
        },
        {
          title: "Content-only card",
          description: "CardContent alone for simple content containers.",
          preview: (
            <Card className="w-72">
              <CardContent className="pt-6 text-sm text-muted-foreground">
                This is a simple content-only card. Use it for notices, inline notes,
                or any content that needs a visual container without a formal header.
              </CardContent>
            </Card>
          ),
          code: `<Card>
  <CardContent className="pt-6 text-sm text-muted-foreground">
    Simple content-only card.
  </CardContent>
</Card>`,
        },
        {
          title: "With badge in header",
          description: "Combine CardTitle with a Badge for a labelled header.",
          preview: (
            <Card className="w-72">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">API Access</CardTitle>
                  <Badge variant="secondary">Pro</Badge>
                </div>
                <CardDescription>Manage your API keys and permissions.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                2 active keys · last used 3 hours ago
              </CardContent>
            </Card>
          ),
          code: `<Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle className="text-base">API Access</CardTitle>
      <Badge variant="secondary">Pro</Badge>
    </div>
    <CardDescription>Manage your API keys.</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
</Card>`,
        },
        {
          title: "Horizontal layout",
          description: "Override the default layout for horizontal cards.",
          preview: (
            <Card className="flex w-full max-w-sm flex-row items-center gap-4 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-lg font-bold">
                A
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">Alice Chen</p>
                <p className="truncate text-xs text-muted-foreground">alice@example.com</p>
              </div>
              <Badge className="ml-auto shrink-0">Admin</Badge>
            </Card>
          ),
          code: `<Card className="flex flex-row items-center gap-4 p-4">
  <Avatar>...</Avatar>
  <div>
    <p className="font-medium">Alice Chen</p>
    <p className="text-xs text-muted-foreground">alice@example.com</p>
  </div>
  <Badge className="ml-auto">Admin</Badge>
</Card>`,
        },
      ]}
      props={[]}
      propGroups={[
        {
          title: "Card",
          props: [
            { name: "className", type: "string", description: "Additional classes on the outer container div." },
            { name: "...props", type: "React.HTMLAttributes<HTMLDivElement>", description: "All standard HTML div attributes." },
          ],
        },
        {
          title: "CardHeader",
          props: [
            { name: "className", type: "string", description: "Defaults to flex flex-col space-y-1.5 p-6." },
            { name: "...props", type: "React.HTMLAttributes<HTMLDivElement>", description: "All standard HTML div attributes." },
          ],
        },
        {
          title: "CardTitle",
          props: [
            { name: "className", type: "string", description: "Defaults to text-2xl font-semibold leading-none tracking-tight." },
            { name: "...props", type: "React.HTMLAttributes<HTMLHeadingElement>", description: "Renders as h3." },
          ],
        },
        {
          title: "CardDescription",
          props: [
            { name: "className", type: "string", description: "Defaults to text-sm text-muted-foreground." },
            { name: "...props", type: "React.HTMLAttributes<HTMLParagraphElement>", description: "All standard HTML paragraph attributes." },
          ],
        },
        {
          title: "CardContent",
          props: [
            { name: "className", type: "string", description: "Defaults to p-6 pt-0." },
            { name: "...props", type: "React.HTMLAttributes<HTMLDivElement>", description: "All standard HTML div attributes." },
          ],
        },
        {
          title: "CardFooter",
          props: [
            { name: "className", type: "string", description: "Defaults to flex items-center p-6 pt-0." },
            { name: "...props", type: "React.HTMLAttributes<HTMLDivElement>", description: "All standard HTML div attributes." },
          ],
        },
      ]}
      a11yNotes={[
        "Card is a presentational container — it has no implicit ARIA role.",
        "CardTitle renders as an h3 heading. Ensure your heading hierarchy is correct in context.",
        "For interactive cards (clickable as a whole), wrap in a button or anchor and ensure keyboard focus is managed correctly.",
      ]}
    />
  )
}
