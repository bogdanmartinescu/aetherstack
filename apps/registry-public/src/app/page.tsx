export default function RegistryIndexPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-4 inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
        @aether registry
      </div>
      <h1 className="mb-3 text-3xl font-bold text-foreground">Aether UI Public Registry</h1>
      <p className="mb-6 max-w-md text-muted-foreground">
        Install components directly into your project using the Aether UI CLI.
      </p>

      <div className="w-full max-w-lg space-y-3 text-left">
        <p className="px-1 text-xs text-muted-foreground">1. Initialize your project</p>
        <pre className="rounded-lg border border-border bg-muted px-6 py-3 text-sm text-foreground">
          npx @aetherstack/cli init
        </pre>
        <p className="px-1 text-xs text-muted-foreground">2. Add a component</p>
        <pre className="rounded-lg border border-border bg-muted px-6 py-3 text-sm text-foreground">
          npx @aetherstack/cli add button
        </pre>
        <p className="px-1 text-xs text-muted-foreground">3. Browse available components</p>
        <pre className="rounded-lg border border-border bg-muted px-6 py-3 text-sm text-foreground">
          npx @aetherstack/cli list
        </pre>
      </div>

      <p className="mt-10 text-xs text-muted-foreground">
        Registry manifest available at <code>/r/registry.json</code>
      </p>
    </main>
  )
}
