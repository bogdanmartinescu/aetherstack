import { Button } from "@aetherstack/ui"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mx-auto max-w-3xl text-center">
        {/* Eyebrow */}
        <div className="mb-6 inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          Aetherstack · Design System
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
          Open-code · Registry-installable · Token-driven · Lucide icons · 16 components
        </p>

        {/* CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <a href="/introduction">Get started</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="/components">Components</a>
          </Button>
          <Button variant="ghost" size="lg" asChild>
            <a href="/cli">CLI</a>
          </Button>
        </div>

        {/* Feature grid */}
        <div className="mt-16 grid grid-cols-3 gap-4 text-left">
          {[
            {
              title: "Open code",
              desc: "Components are copied into your project — you own the source.",
            },
            {
              title: "Token-driven",
              desc: "Every color, radius, and spacing value is a CSS variable.",
            },
            {
              title: "Accessible",
              desc: "Built on Radix UI — keyboard nav, ARIA, and focus management built in.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="mb-1 text-sm font-semibold text-foreground">{f.title}</p>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Phase indicator */}
        <p className="mt-10 text-xs text-muted-foreground">
          Phase 3 complete · 16 primitives · Phase 4 App Patterns in progress
        </p>
      </div>
    </main>
  )
}
