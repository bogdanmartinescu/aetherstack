#!/usr/bin/env node
/**
 * Aether UI MCP Server
 *
 * Exposes the Aether UI registry to LLM agents via the Model Context Protocol.
 * Connect this server to Cursor, Claude Desktop, or any MCP-compatible agent.
 *
 * Usage (stdio transport):
 *   node dist/index.js
 *
 * Cursor mcp.json entry:
 *   {
 *     "aether-ui": {
 *       "command": "npx",
 *       "args": ["@aetherstack/mcp-server"]
 *     }
 *   }
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"
import { loadRegistry } from "./registry.js"
import { resolveGenerate } from "./generate.js"

const server = new McpServer({
  name: "aether-ui",
  version: "0.0.1",
})

// ---------------------------------------------------------------------------
// list_components — returns all available registry items
// ---------------------------------------------------------------------------

server.tool(
  "list_components",
  "List all components, patterns, and blocks available in the Aether UI registry.",
  {
    type: z
      .enum(["all", "primitives", "patterns", "blocks"])
      .optional()
      .default("all")
      .describe(
        'Filter by category. "primitives" = registry:ui, "patterns" = registry:pattern, "blocks" = registry:block.',
      ),
    query: z.string().optional().describe("Optional keyword to filter by name, title, or intent."),
  },
  async ({ type, query }) => {
    const registry = await loadRegistry()

    let items = registry.items

    if (type !== "all") {
      const typeMap: Record<string, string> = {
        primitives: "registry:ui",
        patterns: "registry:pattern",
        blocks: "registry:block",
      }
      const registryType = typeMap[type] ?? type
      items = items.filter((i) => i.type === registryType)
    }

    if (query) {
      const q = query.toLowerCase()
      items = items.filter(
        (i) =>
          i.name.includes(q) ||
          i.title?.toLowerCase().includes(q) ||
          i.description?.toLowerCase().includes(q) ||
          i.ai?.intent?.toLowerCase().includes(q) ||
          i.ai?.prompts?.some((p) => p.toLowerCase().includes(q)),
      )
    }

    const lines = items.map((item) => {
      const intent = item.ai?.intent ?? item.description ?? ""
      return `- **${item.title ?? item.name}** (\`${item.name}\`) — ${intent}\n  Install: \`aether-ui add ${item.name}\``
    })

    return {
      content: [
        {
          type: "text" as const,
          text: [
            `## Aether UI — ${items.length} item${items.length === 1 ? "" : "s"}`,
            "",
            ...lines,
          ].join("\n"),
        },
      ],
    }
  },
)

// ---------------------------------------------------------------------------
// get_component — returns full details about one registry item
// ---------------------------------------------------------------------------

server.tool(
  "get_component",
  "Get detailed information about a specific Aether UI component, pattern, or block.",
  {
    name: z.string().describe("The registry name of the component (e.g. button, dashboard-shell)."),
  },
  async ({ name }) => {
    const registry = await loadRegistry()
    const item = registry.items.find((i) => i.name === name)

    if (!item) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Component not found: "${name}". Use list_components to browse available items.`,
          },
        ],
        isError: true,
      }
    }

    const lines: string[] = [
      `# ${item.title ?? item.name}`,
      "",
      `**Type:** ${item.type}`,
      `**Description:** ${item.description ?? "—"}`,
      "",
    ]

    if (item.ai?.intent) {
      lines.push(`**Intent:** ${item.ai.intent}`, "")
    }

    lines.push(`## Install`, "", "```bash", `aether-ui add ${item.name}`, "```", "")

    if (item.ai?.prompts?.length) {
      lines.push(
        `## Example Prompts`,
        "",
        ...item.ai.prompts.map((p) => `- "${p}"`),
        "",
      )
    }

    if (item.ai?.slots?.length) {
      lines.push(`## Slots / Props`, "", ...item.ai.slots.map((s) => `- \`${s}\``), "")
    }

    if (item.ai?.composition?.length) {
      lines.push(
        `## Often Used With`,
        "",
        ...item.ai.composition.map((c) => `- \`${c}\``),
        "",
      )
    }

    if (item.registryDependencies?.length) {
      lines.push(
        `## Registry Dependencies`,
        "",
        ...item.registryDependencies.map((d) => `- \`${d}\``),
        "",
      )
    }

    if (item.dependencies?.length) {
      lines.push(
        `## npm Dependencies`,
        "",
        "```bash",
        `pnpm add ${item.dependencies.join(" ")}`,
        "```",
        "",
      )
    }

    return {
      content: [{ type: "text" as const, text: lines.join("\n") }],
    }
  },
)

// ---------------------------------------------------------------------------
// install_component — returns the install command(s) for one or more items
// ---------------------------------------------------------------------------

server.tool(
  "install_component",
  "Get the install command for one or more Aether UI components.",
  {
    names: z
      .array(z.string())
      .describe("One or more registry names to install (e.g. [\"button\", \"card\"])."),
  },
  async ({ names }) => {
    const registry = await loadRegistry()

    const found: string[] = []
    const notFound: string[] = []

    for (const name of names) {
      const item = registry.items.find((i) => i.name === name)
      if (item) found.push(name)
      else notFound.push(name)
    }

    const lines: string[] = []

    if (found.length > 0) {
      lines.push(
        `## Install`,
        "",
        "```bash",
        `aether-ui add ${found.join(" ")}`,
        "```",
        "",
      )
    }

    if (notFound.length > 0) {
      lines.push(
        `## Not Found`,
        "",
        `The following items were not found in the registry: ${notFound.join(", ")}`,
        `Run \`list_components\` to browse what's available.`,
        "",
      )
    }

    return {
      content: [{ type: "text" as const, text: lines.join("\n") }],
    }
  },
)

// ---------------------------------------------------------------------------
// compose_block — recommends components for a described UI goal
// ---------------------------------------------------------------------------

server.tool(
  "compose_block",
  "Given a natural-language description of a UI goal, suggest which Aether UI components to install and how to compose them.",
  {
    description: z
      .string()
      .describe(
        "Natural-language description of the UI you want to build, e.g. \"a SaaS dashboard with a sidebar and KPI cards\".",
      ),
  },
  async ({ description }) => {
    const registry = await loadRegistry()
    const plan = resolveGenerate(description, registry)

    const lines: string[] = [
      `## Composition Plan`,
      "",
      `**Goal:** ${description}`,
      "",
      `**Install:**`,
      "",
      "```bash",
      `aether-ui add ${plan.components.join(" ")}`,
      "```",
      "",
    ]

    if (plan.starterCode) {
      lines.push(
        `## Starter File`,
        "",
        "```tsx",
        plan.starterCode,
        "```",
        "",
      )
    }

    if (plan.notes) {
      lines.push(`## Notes`, "", plan.notes, "")
    }

    return {
      content: [{ type: "text" as const, text: lines.join("\n") }],
    }
  },
)

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  // Log to stderr so it doesn't corrupt the MCP stdio stream
  process.stderr.write("Aether UI MCP server running on stdio\n")
}

main().catch((err: unknown) => {
  process.stderr.write(`Fatal: ${err instanceof Error ? err.message : String(err)}\n`)
  process.exit(1)
})
