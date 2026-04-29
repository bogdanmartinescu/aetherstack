import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "AI & LLMs",
  description:
    "Using Aether UI with AI agents — llms.txt, MCP server, prompt-driven CLI, and AI metadata.",
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 mt-10 text-xl font-semibold tracking-tight text-foreground first:mt-0">
      {children}
    </h2>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 mt-6 text-base font-semibold text-foreground">{children}</h3>
  )
}

function Prose({ children }: { children: React.ReactNode }) {
  return <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
}

function Callout({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="my-6 rounded-lg border border-border bg-muted/40 px-5 py-4">
      <p className="mb-1 text-sm font-semibold text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground">{children}</p>
    </div>
  )
}

function ToolCard({
  name,
  description,
  params,
}: {
  name: string
  description: string
  params: Array<{ name: string; type: string; description: string }>
}) {
  return (
    <div className="mb-4 rounded-lg border border-border bg-card p-4">
      <div className="mb-2 flex items-baseline gap-2">
        <code className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-mono font-semibold text-primary">
          {name}
        </code>
        <span className="text-sm text-muted-foreground">{description}</span>
      </div>
      {params.length > 0 && (
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="pb-1 pr-4 font-medium">param</th>
              <th className="pb-1 pr-4 font-medium">type</th>
              <th className="pb-1 font-medium">description</th>
            </tr>
          </thead>
          <tbody>
            {params.map((p) => (
              <tr key={p.name} className="border-b border-border/50 last:border-0">
                <td className="py-1 pr-4 font-mono text-foreground">{p.name}</td>
                <td className="py-1 pr-4 text-muted-foreground">{p.type}</td>
                <td className="py-1 text-muted-foreground">{p.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default function LlmsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-2 pb-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">AI &amp; LLMs</h1>
        <p className="text-base text-muted-foreground">
          Aether UI is designed to be the most LLM-friendly design system in the ecosystem.
          Every component ships with machine-readable AI metadata, the registry exposes a{" "}
          <code className="text-sm">llms.txt</code> index, and an MCP server lets agents browse
          and install components directly from Cursor, Claude Desktop, or any MCP-compatible tool.
        </p>
      </div>

      {/* llms.txt */}
      <SectionHeading>llms.txt</SectionHeading>
      <Prose>
        <p>
          The registry publishes a <code>llms.txt</code> file at the root of the public registry
          following the <a href="https://llmstxt.org/" className="underline underline-offset-4">llms.txt convention</a>.
          It lists every component with its intent, install command, and composition hints —
          optimised to fit inside an LLM context window.
        </p>
        <p>Paste this URL into any agent context or system prompt:</p>
      </Prose>
      <CodeBlock
        code="https://registry.aetherui.dev/llms.txt"
        filename="URL"
      />
      <Prose>
        <p>
          The file is regenerated on every <code>pnpm --filter @aetherstack/scripts build-registry</code> run
          and committed alongside the per-item JSON files. The CI stale-artefact check will fail
          a PR if it becomes out of sync.
        </p>
      </Prose>

      {/* AI Metadata */}
      <SectionHeading>AI Metadata on Registry Items</SectionHeading>
      <Prose>
        <p>
          Every public registry item ships an <code>ai</code> block alongside the standard registry fields.
          The schema is:
        </p>
      </Prose>
      <CodeBlock
        code={`{
  "ai": {
    "intent": "Short machine-readable purpose summary (one sentence)",
    "prompts": [
      "natural-language prompts that should produce this item"
    ],
    "composition": ["other-item", "also-this-one"],
    "slots": ["children", "actions", "footer"]
  }
}`}
        filename="registry item — ai block"
      />
      <Prose>
        <p>
          <strong className="text-foreground">intent</strong> — injected into <code>llms.txt</code> and MCP tool responses so agents understand what the component does without reading its source.
        </p>
        <p>
          <strong className="text-foreground">prompts</strong> — example natural-language inputs that <code>aether-ui generate</code> and the MCP <code>compose_block</code> tool use to match a description to the right component.
        </p>
        <p>
          <strong className="text-foreground">composition</strong> — sibling components frequently used together. Agents use this to build coherent groups.
        </p>
        <p>
          <strong className="text-foreground">slots</strong> — named insertion points an LLM can target when generating usage code (e.g. <code>children</code>, <code>actions</code>, <code>header</code>).
        </p>
      </Prose>

      <Callout title="Required for all public registry items">
        The CI <code>validate-registry</code> job rejects any public item that ships without an{" "}
        <code>ai</code> block. Add one before opening a PR that introduces a new component.
      </Callout>

      {/* MCP Server */}
      <SectionHeading>MCP Server</SectionHeading>
      <Prose>
        <p>
          <code>@aetherstack/mcp-server</code> is a{" "}
          <a href="https://modelcontextprotocol.io" className="underline underline-offset-4">Model Context Protocol</a>{" "}
          server that exposes the Aether UI registry to LLM agents. Connect it to Cursor, Claude Desktop,
          or any MCP-compatible tool via the <strong>stdio</strong> transport.
        </p>
      </Prose>

      <SubHeading>Connect to Cursor</SubHeading>
      <Prose>
        <p>
          Add the following entry to your <code>.cursor/mcp.json</code> (or Cursor&apos;s global MCP settings):
        </p>
      </Prose>
      <CodeBlock
        code={`{
  "mcpServers": {
    "aether-ui": {
      "command": "npx",
      "args": ["-y", "@aetherstack/mcp-server"]
    }
  }
}`}
        filename=".cursor/mcp.json"
      />

      <SubHeading>Connect to Claude Desktop</SubHeading>
      <CodeBlock
        code={`{
  "mcpServers": {
    "aether-ui": {
      "command": "npx",
      "args": ["-y", "@aetherstack/mcp-server"]
    }
  }
}`}
        filename="~/Library/Application Support/Claude/claude_desktop_config.json"
      />

      <SubHeading>Use a local registry</SubHeading>
      <Prose>
        <p>
          Override the bundled registry with a local file or a custom URL via environment variables:
        </p>
      </Prose>
      <CodeBlock
        code={`{
  "mcpServers": {
    "aether-ui": {
      "command": "npx",
      "args": ["-y", "@aetherstack/mcp-server"],
      "env": {
        "AETHER_REGISTRY_FILE": "/path/to/your/registry.json"
      }
    }
  }
}`}
        filename=".cursor/mcp.json"
      />

      <SubHeading>Available tools</SubHeading>

      <ToolCard
        name="list_components"
        description="List all components, patterns, and blocks in the registry."
        params={[
          { name: "type", type: '"all" | "primitives" | "patterns" | "blocks"', description: "Filter by category (default: all)" },
          { name: "query", type: "string?", description: "Optional keyword filter on name, title, or intent" },
        ]}
      />
      <ToolCard
        name="get_component"
        description="Get full details about a specific component."
        params={[
          { name: "name", type: "string", description: 'Registry name, e.g. "button" or "dashboard-shell"' },
        ]}
      />
      <ToolCard
        name="install_component"
        description="Get the install command for one or more components."
        params={[
          { name: "names", type: "string[]", description: "One or more registry names to install" },
        ]}
      />
      <ToolCard
        name="compose_block"
        description="Given a natural-language UI goal, suggest which components to install and how to compose them."
        params={[
          { name: "description", type: "string", description: 'e.g. "a SaaS dashboard with a sidebar and KPI cards"' },
        ]}
      />

      {/* Prompt-driven CLI */}
      <SectionHeading>Prompt-Driven CLI</SectionHeading>
      <Prose>
        <p>
          <code>aether-ui generate</code> resolves a natural-language description into a sequence
          of <code>add</code> calls and writes a starter file into your project. No LLM or API key
          required — resolution is keyword-based and fully deterministic.
        </p>
      </Prose>
      <CodeBlock
        code={`# Scaffold a SaaS dashboard
aether-ui generate "build me a SaaS dashboard"

# Scaffold a login page
aether-ui generate "login page"

# Scaffold a settings form
aether-ui generate "settings page"

# Preview without writing files
aether-ui generate "data table with users" --dry-run`}
        filename="terminal"
      />
      <Prose>
        <p>
          The command fetches the registry, resolves matching components, installs each one
          via the standard <code>add</code> flow, and writes a starter <code>page.tsx</code> file
          that imports and composes them.
        </p>
      </Prose>

      <SubHeading>Canonical recipes</SubHeading>
      <Prose>
        <p>The following prompts resolve deterministically to a complete set of components:</p>
      </Prose>
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
              <th className="px-4 py-2">Prompt</th>
              <th className="px-4 py-2">Components installed</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                prompt: "build me a SaaS dashboard",
                components: "dashboard-shell, metric-card, table, table-toolbar, page-header, empty-state, loading-state, error-state, nav",
              },
              {
                prompt: "login page",
                components: "login-block",
              },
              {
                prompt: "sign up page",
                components: "signup-block",
              },
              {
                prompt: "settings page",
                components: "section-header, form-field, input, textarea, switch, button",
              },
              {
                prompt: "data table",
                components: "table-toolbar, table, badge, button, empty-state, loading-state",
              },
            ].map((row, i) => (
              <tr key={i} className="border-b border-border/50 last:border-0">
                <td className="px-4 py-2.5 font-mono text-xs text-foreground">{row.prompt}</td>
                <td className="px-4 py-2.5 text-xs text-muted-foreground">{row.components}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* For AI Agents */}
      <SectionHeading>Using Aether UI in Agent Prompts</SectionHeading>
      <Prose>
        <p>
          When writing a system prompt for an agent that generates Aether UI code, include the
          following snippet to give it the context it needs:
        </p>
      </Prose>
      <CodeBlock
        code={`You are building a SaaS product with Aether UI, a design system for React and Next.js.

Registry: https://registry.aetherui.dev
llms.txt: https://registry.aetherui.dev/llms.txt
Docs: https://aetherui.dev

Key facts:
- Install components with: aether-ui add <name>
- Components live in components/ui/, patterns in components/patterns/, blocks in components/blocks/
- Import from @/components/ui/<name>, @/components/patterns/<name>, @/components/blocks/<name>
- Use tailwind classes; design tokens are CSS custom properties (--color-primary, --radius, etc.)
- Always compose from existing Aether UI components rather than building from scratch`}
        filename="system prompt snippet"
      />

      {/* MCP Server config reference */}
      <SectionHeading>Environment Variables</SectionHeading>
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
              <th className="px-4 py-2">Variable</th>
              <th className="px-4 py-2">Default</th>
              <th className="px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                var: "AETHER_REGISTRY_URL",
                default: "bundled",
                description: "Remote registry URL to fetch from (overrides bundled registry.json)",
              },
              {
                var: "AETHER_REGISTRY_FILE",
                default: "bundled",
                description: "Local path to a registry.json file (overrides bundled and URL)",
              },
            ].map((row) => (
              <tr key={row.var} className="border-b border-border/50 last:border-0">
                <td className="px-4 py-2.5 font-mono text-xs text-foreground">{row.var}</td>
                <td className="px-4 py-2.5 text-xs text-muted-foreground">{row.default}</td>
                <td className="px-4 py-2.5 text-xs text-muted-foreground">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
