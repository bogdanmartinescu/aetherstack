import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "CLI",
  description:
    "Install Aether UI components from the public registry with the scoped CLI. Includes init, add, list, and deterministic generate scaffolding.",
}

function Callout({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="border-border bg-muted/40 my-4 rounded-lg border px-4 py-3">
      {title && <p className="text-foreground mb-1 text-sm font-semibold">{title}</p>}
      <div className="text-muted-foreground text-sm">{children}</div>
    </div>
  )
}

function CommandRef({
  command,
  description,
  args,
  options,
}: {
  command: string
  description: string
  args?: { name: string; description: string; required?: boolean }[]
  options?: { flag: string; description: string; default?: string }[]
}) {
  return (
    <div className="border-border bg-card mb-10 overflow-hidden rounded-lg border">
      <div className="border-border bg-muted/30 border-b px-4 py-3">
        <code className="text-foreground font-mono text-sm font-semibold">{command}</code>
        <p className="text-muted-foreground mt-1 text-xs">{description}</p>
      </div>
      {args && args.length > 0 && (
        <div className="border-border border-b px-4 py-3">
          <p className="text-muted-foreground mb-2 text-xs font-semibold uppercase tracking-wider">
            Arguments
          </p>
          <div className="space-y-1.5">
            {args.map((a) => (
              <div key={a.name} className="flex items-start gap-3">
                <code className="bg-muted text-foreground mt-0.5 shrink-0 rounded px-1.5 py-0.5 font-mono text-xs">
                  {a.name}
                  {a.required && <span className="text-destructive ml-1">*</span>}
                </code>
                <span className="text-muted-foreground text-xs">{a.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {options && options.length > 0 && (
        <div className="px-4 py-3">
          <p className="text-muted-foreground mb-2 text-xs font-semibold uppercase tracking-wider">
            Options
          </p>
          <div className="space-y-1.5">
            {options.map((o) => (
              <div key={o.flag} className="flex items-start gap-3">
                <code className="bg-muted text-foreground mt-0.5 shrink-0 rounded px-1.5 py-0.5 font-mono text-xs">
                  {o.flag}
                </code>
                <span className="text-muted-foreground text-xs">
                  {o.description}
                  {o.default && (
                    <span className="text-muted-foreground/60 ml-1">(default: {o.default})</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function CLIPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-10">
        <h1 className="text-foreground mb-3 text-4xl font-bold tracking-tight">CLI</h1>
        <p className="text-muted-foreground text-lg">
          Install editable components from the Aether UI registry and assemble starter pages from
          deterministic, registry-backed component selection.
        </p>
      </div>

      <Callout title="Open code, under your control">
        The CLI copies source files into your project. You can inspect and edit them locally.
        Automatic upstream diff and update commands are planned, not available in this release.
      </Callout>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold tracking-tight">Quick start</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Run the published scoped package from the root of an existing React project. Initializing
          creates aether.json; it does not install framework dependencies or configure Tailwind
          for you.
        </p>
        <CodeBlock
          code={`npx @aetherstack/cli init
npx @aetherstack/cli list
npx @aetherstack/cli add button
npx @aetherstack/cli add input label --dry-run`}
          filename="terminal"
        />
        <p className="text-muted-foreground mt-4 text-sm">
          You may also install the package globally with
          <code className="bg-muted ml-1 rounded px-1 font-mono text-xs">
            npm install -g @aetherstack/cli
          </code>
          and run it as <code className="bg-muted rounded px-1 font-mono text-xs">aether-ui</code>.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-6 text-2xl font-semibold tracking-tight">
          Available commands
        </h2>

        <CommandRef
          command="aether-ui init"
          description="Create aether.json with registry and output-directory settings. Existing configs are preserved unless --force is provided."
          options={[
            { flag: "--cwd <path>", description: "Project root (default: current directory)." },
            {
              flag: "--registry <url>",
              description: "Registry origin.",
              default: "https://registry.aether-ui.dev",
            },
            {
              flag: "--components-dir <path>",
              description: "Relative path for components.",
              default: "src/components/ui",
            },
            {
              flag: "--utils-dir <path>",
              description: "Relative path for utilities.",
              default: "src/lib",
            },
            { flag: "--force", description: "Replace an existing config file." },
            { flag: "--dry-run", description: "Print the config without writing it." },
          ]}
        />

        <CommandRef
          command="aether-ui add <components...>"
          description="Copy one or more named registry items into your initialized project."
          args={[
            {
              name: "components",
              description: "At least one registry item name.",
              required: true,
            },
          ]}
          options={[
            { flag: "--cwd <path>", description: "Project root." },
            { flag: "--registry <url>", description: "Override the configured registry." },
            { flag: "--overwrite", description: "Overwrite conflicting local files." },
            { flag: "--dry-run", description: "Preview destination files without writing." },
          ]}
        />

        <CommandRef
          command="aether-ui list"
          description="Browse the current remote registry without requiring a local configuration."
          options={[
            {
              flag: "--cwd <path>",
              description: "Read optional project settings from this directory.",
            },
            { flag: "--registry <url>", description: "Override the registry origin." },
            { flag: "--type <type>", description: "Filter by registry type (ui, pattern, block)." },
          ]}
        />

        <CommandRef
          command={'aether-ui generate "<description>"'}
          description="Match a description to known registry components and optionally create a starter page. This is rule-based scaffolding, not an LLM API."
          args={[
            {
              name: "description",
              description: "Description of the UI to scaffold.",
              required: true,
            },
          ]}
          options={[
            { flag: "--cwd <path>", description: "Project root." },
            { flag: "--registry <url>", description: "Override the registry origin." },
            { flag: "--dry-run", description: "Preview the component plan without writing files." },
            {
              flag: "--no-starter",
              description: "Install matched components without generating a starter page.",
            },
          ]}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold tracking-tight">
          Configuration
        </h2>
        <p className="text-muted-foreground mb-4 text-sm">
          The init command writes aether.json. The following is the default configuration (an
          optional $schema field is also written).
        </p>
        <CodeBlock
          code={`{
  "registry": "https://registry.aether-ui.dev",
  "aliases": {
    "components": "src/components/ui",
    "utils": "src/lib"
  }
}`}
          filename="aether.json"
        />
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold tracking-tight">
          Working with a monorepo
        </h2>
        <CodeBlock
          code={`npx @aetherstack/cli init --cwd apps/web
npx @aetherstack/cli add button --cwd apps/web
npx @aetherstack/cli generate "a SaaS dashboard" --cwd apps/web --dry-run`}
          filename="terminal"
        />
      </section>

      <Callout title="Not yet implemented">
        Safe upstream diff, update, migration, and component removal are planned for the source
        lifecycle milestone. For now, changes to installed files are managed by you; always review
        --overwrite before replacing edited source.
      </Callout>
    </div>
  )
}
