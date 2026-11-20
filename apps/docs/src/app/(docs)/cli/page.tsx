import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "CLI",
  description:
    "The aether-ui CLI installs components, generates pages from prompts, and keeps your components up to date. Works with Next.js, Vite, Remix, Astro, and TanStack Start.",
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
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-foreground mb-3 text-4xl font-bold tracking-tight">CLI</h1>
        <p className="text-muted-foreground text-lg">
          One command adds a production-quality component directly to your codebase. The{" "}
          <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-base">aether-ui</code> CLI
          installs components, generates full pages from natural-language prompts, and keeps
          everything up to date — all without a runtime library to maintain.
        </p>
      </div>

      {/* Philosophy callout */}
      <Callout title="Open code, not a dependency">
        Unlike traditional component libraries, Aether UI copies component source files into your
        project via the CLI. You get full transparency, full control, and zero API lock-in. Update
        components by running the CLI again — or just edit them directly.
      </Callout>

      {/* Installation */}
      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold tracking-tight">Installation</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          No global install required. Run the CLI directly with{" "}
          <code className="bg-muted rounded px-1 font-mono text-xs">npx</code>:
        </p>
        <CodeBlock code={`npx aether-ui@latest init`} filename="terminal" />
        <p className="text-muted-foreground mt-4 text-sm">
          Or install globally to use the shorter{" "}
          <code className="bg-muted rounded px-1 font-mono text-xs">aether-ui</code> command:
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
        <h2 className="text-foreground mb-6 text-2xl font-semibold tracking-tight">Commands</h2>

        <CommandRef
          command="aether-ui init"
          description="Initialize Aether UI in a project. Creates aether.json, installs shared dependencies, and sets up the utility function."
          options={[
            {
              flag: "--cwd <path>",
              description: "Working directory. Defaults to the current directory.",
            },
            { flag: "--yes, -y", description: "Skip confirmation prompts and use defaults." },
            {
              flag: "--defaults, -d",
              description: "Use default configuration values without prompting.",
            },
            { flag: "--force, -f", description: "Force overwrite of existing configuration." },
          ]}
        />

        <CommandRef
          command="aether-ui add [components...]"
          description="Add one or more components to your project. Copies component source files into your configured components directory."
          args={[
            {
              name: "components",
              description:
                "One or more component names to add. Runs interactive selection if omitted.",
            },
          ]}
          options={[
            { flag: "--all", description: "Add all available components." },
            { flag: "--path <path>", description: "Custom path to write the component files." },
            {
              flag: "--overwrite",
              description: "Overwrite existing component files without prompting.",
            },
            {
              flag: "--cwd <path>",
              description: "Working directory. Defaults to the current directory.",
            },
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
            {
              flag: "--cwd <path>",
              description: "Working directory. Defaults to the current directory.",
            },
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
            {
              flag: "--cwd <path>",
              description: "Working directory. Defaults to the current directory.",
            },
          ]}
        />

        <CommandRef
          command="aether-ui list"
          description="List all available components in the Aether UI registry."
          options={[
            {
              flag: "--installed",
              description: "Only show components already installed in the project.",
            },
            {
              flag: "--category <name>",
              description: "Filter by category (primitives, patterns, blocks).",
            },
          ]}
        />

        <CommandRef
          command={`aether-ui generate "<prompt>"`}
          description="Generate a starter page or feature scaffold from a natural-language prompt. Installs the required components and writes a page.tsx with the composition wired together."
          args={[
            {
              name: "prompt",
              description: "Natural-language description of the UI to generate.",
              required: true,
            },
          ]}
          options={[
            {
              flag: "--cwd <path>",
              description: "Working directory. Defaults to the current directory.",
            },
          ]}
        />

        <div className="border-border bg-muted/30 mb-10 rounded-lg border p-4">
          <p className="text-foreground mb-3 text-sm font-semibold">Generate examples</p>
          <CodeBlock
            code={`# SaaS dashboard with charts and activity feed
npx aether-ui generate "a dashboard page with a stat strip, recent activity feed, and data table"

# AI chat interface
npx aether-ui generate "an AI chat layout with a sidebar for conversations and a streaming message thread"

# Marketing landing page
npx aether-ui generate "a landing page with a hero section, feature grid, and pricing table"`}
            filename="terminal"
          />
          <p className="text-muted-foreground mt-3 text-xs">
            The CLI installs required components, then writes a{" "}
            <code className="bg-muted rounded px-1 font-mono text-xs">page.tsx</code> with all
            components composed and ready to customise.
          </p>
        </div>
      </section>

      {/* Config file */}
      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold tracking-tight">
          Configuration — <code className="font-mono text-xl">aether.json</code>
        </h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Running <code className="bg-muted rounded px-1 font-mono text-xs">aether-ui init</code>{" "}
          creates an <code className="bg-muted rounded px-1 font-mono text-xs">aether.json</code>{" "}
          file at your project root. All CLI commands read from this file.
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
          filename="aether.json"
        />

        <div className="border-border mt-6 overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border bg-muted/50 border-b">
                <th className="text-foreground px-4 py-2.5 text-left font-medium">Key</th>
                <th className="text-foreground px-4 py-2.5 text-left font-medium">Type</th>
                <th className="text-foreground px-4 py-2.5 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {[
                ["style", `"default" | "new-york"`, "Visual style variant for components."],
                [
                  "rsc",
                  "boolean",
                  'Enable React Server Component support. Adds "use client" directives where needed.',
                ],
                [
                  "tsx",
                  "boolean",
                  "Use TypeScript (.tsx) or JavaScript (.jsx) for component files.",
                ],
                ["tailwind.config", "string", "Path to your Tailwind CSS config file."],
                [
                  "tailwind.css",
                  "string",
                  "Path to the CSS file where global styles and tokens are imported.",
                ],
                [
                  "tailwind.baseColor",
                  "string",
                  "Base color palette used for generated CSS variables.",
                ],
                [
                  "tailwind.cssVariables",
                  "boolean",
                  "Use CSS variables (true) or Tailwind utility classes (false) for theming.",
                ],
                [
                  "tailwind.prefix",
                  "string",
                  'Tailwind class prefix, e.g. "tw-". Leave empty for no prefix.',
                ],
                ["aliases.components", "string", "Import alias for your components directory."],
                ["aliases.utils", "string", "Import alias for the cn utility function."],
                ["aliases.ui", "string", "Import alias for Aether UI component files."],
              ].map(([key, type, desc]) => (
                <tr key={key as string} className="hover:bg-muted/20 transition-colors">
                  <td className="text-foreground px-4 py-2.5 font-mono text-xs">{key}</td>
                  <td className="text-muted-foreground px-4 py-2.5 font-mono text-xs">{type}</td>
                  <td className="text-muted-foreground px-4 py-2.5 text-xs">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Common workflows */}
      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold tracking-tight">
          Common workflows
        </h2>

        <div className="space-y-6">
          <div>
            <p className="text-foreground mb-2 text-sm font-medium">Set up a new project</p>
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
            <p className="text-foreground mb-2 text-sm font-medium">
              Add multiple components at once
            </p>
            <CodeBlock
              code={`npx aether-ui add button input label badge card
# or interactively (omit component names)
npx aether-ui add`}
              filename="terminal"
            />
          </div>

          <div>
            <p className="text-foreground mb-2 text-sm font-medium">Check for upstream updates</p>
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
            <p className="text-foreground mb-2 text-sm font-medium">Use a custom component path</p>
            <CodeBlock
              code={`# Write components to a custom directory
npx aether-ui add button --path src/design-system/ui`}
              filename="terminal"
            />
          </div>
        </div>
      </section>

      {/* Monorepo */}
      <section>
        <h2 className="text-foreground mb-4 text-2xl font-semibold tracking-tight">
          Monorepo support
        </h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Using Aether UI inside a pnpm or npm workspace? Pass the{" "}
          <code className="bg-muted rounded px-1 font-mono text-xs">--cwd</code> flag to point the
          CLI at the app where you want components installed:
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
