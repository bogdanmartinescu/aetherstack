import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "CLI",
  description: "The aether-ui CLI adds components directly into your codebase — you own the code.",
}

function Callout({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-lg border border-border bg-muted/40 px-4 py-3">
      {title && <p className="mb-1 text-sm font-semibold text-foreground">{title}</p>}
      <div className="text-sm text-muted-foreground">{children}</div>
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
    <div className="mb-10 rounded-lg border border-border bg-card overflow-hidden">
      <div className="border-b border-border bg-muted/30 px-4 py-3">
        <code className="font-mono text-sm font-semibold text-foreground">{command}</code>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
      {args && args.length > 0 && (
        <div className="border-b border-border px-4 py-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Arguments</p>
          <div className="space-y-1.5">
            {args.map((a) => (
              <div key={a.name} className="flex items-start gap-3">
                <code className="mt-0.5 shrink-0 rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                  {a.name}
                  {a.required && <span className="ml-1 text-destructive">*</span>}
                </code>
                <span className="text-xs text-muted-foreground">{a.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {options && options.length > 0 && (
        <div className="px-4 py-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Options</p>
          <div className="space-y-1.5">
            {options.map((o) => (
              <div key={o.flag} className="flex items-start gap-3">
                <code className="mt-0.5 shrink-0 rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                  {o.flag}
                </code>
                <span className="text-xs text-muted-foreground">
                  {o.description}
                  {o.default && (
                    <span className="ml-1 text-muted-foreground/60">(default: {o.default})</span>
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
      {/* Header */}
      <div className="mb-10">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">CLI</h1>
        <p className="text-lg text-muted-foreground">
          The <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-base">aether-ui</code> CLI 
          adds components directly into your project. No library to install — the component source lives 
          in your codebase and you own it entirely.
        </p>
      </div>

      {/* Philosophy callout */}
      <Callout title="Open code, not a dependency">
        Unlike traditional component libraries, Aether UI copies component source files into your project
        via the CLI. You get full transparency, full control, and zero API lock-in. Update components 
        by running the CLI again — or just edit them directly.
      </Callout>

      {/* Installation */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          No global install required. Run the CLI directly with <code className="rounded bg-muted px-1 font-mono text-xs">npx</code>:
        </p>
        <CodeBlock
          code={`npx aether-ui@latest init`}
          filename="terminal"
        />
        <p className="mt-4 text-sm text-muted-foreground">
          Or install globally to use the shorter <code className="rounded bg-muted px-1 font-mono text-xs">aether-ui</code> command:
        </p>
        <CodeBlock
          code={`npm install -g aether-ui
# or
pnpm add -g aether-ui`}
          filename="terminal"
        />
      </section>

      {/* Commands */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">Commands</h2>

        <CommandRef
          command="aether-ui init"
          description="Initialize Aether UI in a project. Creates aether.config.json, installs shared dependencies, and sets up the utility function."
          options={[
            { flag: "--cwd <path>", description: "Working directory. Defaults to the current directory." },
            { flag: "--yes, -y", description: "Skip confirmation prompts and use defaults." },
            { flag: "--defaults, -d", description: "Use default configuration values without prompting." },
            { flag: "--force, -f", description: "Force overwrite of existing configuration." },
          ]}
        />

        <CommandRef
          command="aether-ui add [components...]"
          description="Add one or more components to your project. Copies component source files into your configured components directory."
          args={[
            {
              name: "components",
              description: "One or more component names to add. Runs interactive selection if omitted.",
            },
          ]}
          options={[
            { flag: "--all", description: "Add all available components." },
            { flag: "--path <path>", description: "Custom path to write the component files." },
            { flag: "--overwrite", description: "Overwrite existing component files without prompting." },
            { flag: "--cwd <path>", description: "Working directory. Defaults to the current directory." },
            { flag: "--yes, -y", description: "Skip confirmation prompts." },
          ]}
        />

        <CommandRef
          command="aether-ui diff [component]"
          description="Show the diff between your local component and the latest registry version. Useful for seeing what changed after an upstream update."
          args={[
            {
              name: "component",
              description: "Component name to diff. Shows all components with changes if omitted.",
            },
          ]}
          options={[
            { flag: "--yes, -y", description: "Skip confirmation prompts." },
            { flag: "--cwd <path>", description: "Working directory. Defaults to the current directory." },
          ]}
        />

        <CommandRef
          command="aether-ui update [components...]"
          description="Update components to their latest registry versions. Runs diff first to show changes."
          args={[
            {
              name: "components",
              description: "Components to update. Updates all installed components if omitted.",
            },
          ]}
          options={[
            { flag: "--all", description: "Update all installed components." },
            { flag: "--yes, -y", description: "Skip confirmation and overwrite automatically." },
            { flag: "--cwd <path>", description: "Working directory. Defaults to the current directory." },
          ]}
        />

        <CommandRef
          command="aether-ui list"
          description="List all available components in the Aether UI registry."
          options={[
            { flag: "--installed", description: "Only show components already installed in the project." },
            { flag: "--category <name>", description: "Filter by category (primitives, patterns, blocks)." },
          ]}
        />
      </section>

      {/* Config file */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">
          Configuration — <code className="font-mono text-xl">aether.config.json</code>
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Running <code className="rounded bg-muted px-1 font-mono text-xs">aether-ui init</code> creates 
          an <code className="rounded bg-muted px-1 font-mono text-xs">aether.config.json</code> file at 
          your project root. All CLI commands read from this file.
        </p>
        <CodeBlock
          code={`{
  "$schema": "https://aether-ui.dev/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}`}
          filename="aether.config.json"
        />

        <div className="mt-6 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2.5 text-left font-medium text-foreground">Key</th>
                <th className="px-4 py-2.5 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-2.5 text-left font-medium text-foreground">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["style", `"default" | "new-york"`, "Visual style variant for components."],
                ["rsc", "boolean", "Enable React Server Component support. Adds \"use client\" directives where needed."],
                ["tsx", "boolean", "Use TypeScript (.tsx) or JavaScript (.jsx) for component files."],
                ["tailwind.config", "string", "Path to your Tailwind CSS config file."],
                ["tailwind.css", "string", "Path to the CSS file where global styles and tokens are imported."],
                ["tailwind.baseColor", "string", "Base color palette used for generated CSS variables."],
                ["tailwind.cssVariables", "boolean", "Use CSS variables (true) or Tailwind utility classes (false) for theming."],
                ["tailwind.prefix", "string", "Tailwind class prefix, e.g. \"tw-\". Leave empty for no prefix."],
                ["aliases.components", "string", "Import alias for your components directory."],
                ["aliases.utils", "string", "Import alias for the cn utility function."],
                ["aliases.ui", "string", "Import alias for Aether UI component files."],
              ].map(([key, type, desc]) => (
                <tr key={key as string} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-2.5 font-mono text-xs text-foreground">{key}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{type}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Common workflows */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Common workflows</h2>

        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">Set up a new project</p>
            <CodeBlock
              code={`# 1. Create your app (Next.js example)
npx create-next-app@latest my-app --typescript --tailwind --app
cd my-app

# 2. Initialize Aether UI
npx aether-ui@latest init

# 3. Add your first component
npx aether-ui add button`}
              filename="terminal"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-foreground">Add multiple components at once</p>
            <CodeBlock
              code={`npx aether-ui add button input label badge card
# or interactively (omit component names)
npx aether-ui add`}
              filename="terminal"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-foreground">Check for upstream updates</p>
            <CodeBlock
              code={`# See what changed in the registry vs. your local files
npx aether-ui diff

# Update specific components
npx aether-ui update button card

# Update everything
npx aether-ui update --all`}
              filename="terminal"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-foreground">Use a custom component path</p>
            <CodeBlock
              code={`# Write components to a custom directory
npx aether-ui add button --path src/design-system/ui`}
              filename="terminal"
            />
          </div>
        </div>
      </section>

      {/* npm publishing */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Publishing packages to npm</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          The core Aether UI packages (<code className="rounded bg-muted px-1 font-mono text-xs">@aetherstack/ui</code>,{" "}
          <code className="rounded bg-muted px-1 font-mono text-xs">@aetherstack/tokens</code>,{" "}
          <code className="rounded bg-muted px-1 font-mono text-xs">@aetherstack/utils</code>) are published as 
          pre-built ESM+CJS packages. The build pipeline uses{" "}
          <a href="https://tsup.egoist.dev" target="_blank" rel="noreferrer" className="text-primary underline-offset-4 hover:underline">tsup</a>.
        </p>

        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">1. Build all packages</p>
            <CodeBlock
              code={`# From the monorepo root
pnpm build

# Or build a single package
pnpm --filter @aetherstack/ui build`}
              filename="terminal"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-foreground">2. Version packages</p>
            <CodeBlock
              code={`# Bump version in package.json before publishing
# Follow semver: patch for bugfixes, minor for new features, major for breaking changes
npm version patch   # 0.0.1 → 0.0.2
npm version minor   # 0.0.1 → 0.1.0
npm version major   # 0.0.1 → 1.0.0`}
              filename="terminal"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-foreground">3. Publish to npm</p>
            <CodeBlock
              code={`# Publish from package directory
cd packages/ui
npm publish --access public

# Or publish all publishable packages from root
pnpm -r publish --access public`}
              filename="terminal"
            />
          </div>
        </div>

        <Callout title="publishConfig">
          Each package uses <code className="rounded bg-muted px-0.5 font-mono text-xs">publishConfig</code> in 
          its <code className="rounded bg-muted px-0.5 font-mono text-xs">package.json</code> to override 
          exports when publishing. In the monorepo workspace, imports resolve to{" "}
          <code className="rounded bg-muted px-0.5 font-mono text-xs">./src/*.ts</code> (raw TypeScript, 
          compiled by the consuming app). On npm, consumers receive pre-built{" "}
          <code className="rounded bg-muted px-0.5 font-mono text-xs">./dist/*.mjs</code> and{" "}
          <code className="rounded bg-muted px-0.5 font-mono text-xs">./dist/*.js</code> files.
        </Callout>
      </section>

      {/* Monorepo */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Monorepo support</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Using Aether UI inside a pnpm or npm workspace? Pass the{" "}
          <code className="rounded bg-muted px-1 font-mono text-xs">--cwd</code> flag to point the CLI 
          at the app where you want components installed:
        </p>
        <CodeBlock
          code={`# Add a component to a specific workspace app
npx aether-ui add button --cwd apps/web

# Initialize in a specific workspace app
npx aether-ui init --cwd apps/web`}
          filename="terminal"
        />
      </section>
    </div>
  )
}
