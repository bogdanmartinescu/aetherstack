import { Button } from "@aetherstack/ui"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mx-auto max-w-3xl text-center">
        {/* Eyebrow */}
        <div className="mb-6 inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          Aetherstack · Public Docs
        </div>

        {/* Wordmark */}
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-foreground">
          Aether UI
        </h1>

        {/* Tagline */}
        <p className="mb-2 text-xl text-muted-foreground">
          A premium design system for SaaS dashboards and admin interfaces.
        </p>
        <p className="mb-10 text-sm text-muted-foreground">
          Built on shadcn/ui. Fully open. Ready for production.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg">Get started</Button>
          <Button variant="outline" size="lg">
            View components
          </Button>
        </div>

        {/* Status */}
        <p className="mt-12 text-xs text-muted-foreground">
          Documentation site coming soon — foundation scaffolded.
        </p>
      </div>
    </main>
  )
}
