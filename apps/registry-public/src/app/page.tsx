export default function RegistryIndexPage() {
  return (
    <main className="bg-background flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="border-border bg-muted text-muted-foreground mb-4 inline-flex rounded-full border px-3 py-1 text-xs">
        @aether registry
      </div>
      <h1 className="text-foreground mb-3 text-3xl font-bold">Aether UI Public Registry</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        Install components directly into your project using the Aether UI CLI.
      </p>

      <div className="w-full max-w-lg space-y-3 text-left">
        <p className="text-muted-foreground px-1 text-xs">1. Initialize your project</p>
        <pre className="border-border bg-muted text-foreground rounded-lg border px-6 py-3 text-sm">
          npx @aetherstack/cli init
        </pre>
        <p className="text-muted-foreground px-1 text-xs">2. Add a component</p>
        <pre className="border-border bg-muted text-foreground rounded-lg border px-6 py-3 text-sm">
          npx @aetherstack/cli add button
        </pre>
        <p className="text-muted-foreground px-1 text-xs">3. Browse available components</p>
        <pre className="border-border bg-muted text-foreground rounded-lg border px-6 py-3 text-sm">
          npx @aetherstack/cli list
        </pre>
      </div>

      <p className="text-muted-foreground mt-10 text-xs">
        Registry manifest available at <code>/r/registry.json</code>
      </p>
    </main>
  )
}
