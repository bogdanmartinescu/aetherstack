/**
 * Stdio handshake + tool smoke against a published-like artifact (dist/).
 */
import { execFileSync } from "node:child_process"
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js"
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { resolve } from "node:path"
import { afterEach, beforeAll, describe, expect, it } from "vitest"

const PKG_ROOT = resolve(__dirname, "../..")
const DIST_ENTRY = resolve(PKG_ROOT, "dist/index.js")
const CANONICAL = resolve(PKG_ROOT, "../../registry/public/registry.json")

const FIXTURE = {
  name: "aether-ui",
  homepage: "https://aether-ui.dev",
  version: "0.0.1",
  items: [
    {
      name: "button",
      type: "registry:ui",
      title: "Button",
      author: "aetherstack",
      description: "A button",
      ai: { intent: "clickable action", prompts: ["add a button"] },
      files: [{ path: "button.tsx", type: "registry:ui", target: "ui/button.tsx" }],
    },
    {
      name: "card",
      type: "registry:ui",
      title: "Card",
      author: "aetherstack",
      files: [{ path: "card.tsx", type: "registry:ui", target: "ui/card.tsx" }],
    },
  ],
}

let fixtureFile: string
let tmp: string

beforeAll(() => {
  // Always rebuild so this file does not depend on suite order (vitest may
  // run stdio before pack-smoke).
  execFileSync("pnpm", ["exec", "tsup"], {
    cwd: PKG_ROOT,
    stdio: "pipe",
    env: process.env,
  })
  if (!existsSync(DIST_ENTRY)) {
    throw new Error("MCP build did not produce dist/index.js")
  }
}, 60_000)

afterEach(() => {
  if (tmp) rmSync(tmp, { recursive: true, force: true })
})

async function withClient(
  env: Record<string, string>,
  fn: (client: Client) => Promise<void>,
): Promise<void> {
  const childEnv: Record<string, string> = {}
  for (const [key, value] of Object.entries(process.env)) {
    if (value !== undefined) childEnv[key] = value
  }
  delete childEnv["AETHER_REGISTRY_URL"]
  delete childEnv["AETHER_REGISTRY_FILE"]
  Object.assign(childEnv, env)

  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [DIST_ENTRY],
    env: childEnv,
    stderr: "pipe",
  })

  const client = new Client({ name: "aether-mcp-test", version: "0.0.0" })
  await client.connect(transport)
  try {
    await fn(client)
  } finally {
    await client.close()
  }
}

describe("MCP stdio handshake (M0-05)", () => {
  it("lists tools and answers list_components against a fixture registry", async () => {
    tmp = mkdtempSync(resolve(tmpdir(), "aether-mcp-stdio-"))
    fixtureFile = resolve(tmp, "registry.json")
    writeFileSync(fixtureFile, JSON.stringify(FIXTURE))

    await withClient({ AETHER_REGISTRY_FILE: fixtureFile }, async (client) => {
      const tools = await client.listTools()
      const names = tools.tools.map((t) => t.name).sort()
      expect(names).toEqual([
        "compose_block",
        "get_component",
        "install_component",
        "list_components",
      ])

      const listed = await client.callTool({
        name: "list_components",
        arguments: { type: "all" },
      })
      const text = JSON.stringify(listed)
      expect(text).toContain("button")
      expect(text).toContain("card")

      const missing = await client.callTool({
        name: "get_component",
        arguments: { name: "does-not-exist" },
      })
      expect(missing.isError).toBe(true)
    })
  }, 30_000)

  it("serves the bundled registry when no env overrides are set", async () => {
    if (!existsSync(CANONICAL)) {
      throw new Error("canonical registry missing")
    }
    const expected = JSON.parse(readFileSync(CANONICAL, "utf-8")) as { items: unknown[] }

    await withClient({}, async (client) => {
      const listed = await client.callTool({
        name: "list_components",
        arguments: { type: "all" },
      })
      const content = listed.content as Array<{ type: string; text?: string }>
      const text = content.map((c) => c.text ?? "").join("\n")
      expect(text).toMatch(new RegExp(`${expected.items.length} items?`))
    })
  }, 30_000)
})
