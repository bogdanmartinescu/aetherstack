import { Button } from "@aetherstack/ui"

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 border-b border-border pb-6">
          <div className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Aetherstack
          </div>
          <h1 className="text-3xl font-bold text-foreground">Aether Studio</h1>
          <p className="mt-1 text-muted-foreground">
            Internal component playground — not for public use.
          </p>
        </div>

        {/* Component gallery placeholder */}
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Button</h2>
          <div className="flex flex-wrap gap-3 rounded-lg border border-border bg-card p-6">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-3 rounded-lg border border-border bg-card p-6">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">+</Button>
          </div>
        </section>

        <p className="text-xs text-muted-foreground">
          More components will appear here as they are added to @aetherstack/ui.
        </p>
      </div>
    </main>
  )
}
