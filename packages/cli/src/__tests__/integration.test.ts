/**
 * End-to-end integration test:
 *   1. Spins up a tiny HTTP server that serves the workspace's real
 *      `apps/registry-public/public/r` directory.
 *   2. Creates an empty fixture project in a tmp dir.
 *   3. Calls writeConfig (= what `aether-ui init` does internally).
 *   4. Calls resolveItem + installItem (= what `aether-ui add` does internally)
 *      for one primitive, one pattern, and one block.
 *   5. Asserts the files land at the expected paths.
 *
 * If this test fails, the registry-build script and the CLI install path are
 * out of sync.
 */
import { createServer, type Server } from "node:http"
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { resolve } from "node:path"
import { afterAll, beforeAll, beforeEach, afterEach, describe, expect, it } from "vitest"
import { writeConfig } from "../config"
import { resolveItem } from "../lib/registry"
import { installItem } from "../lib/installer"

const REGISTRY_DIR = resolve(__dirname, "../../../../apps/registry-public/public/r")

let server: Server
let baseUrl: string
let cwd: string

beforeAll(async () => {
  server = createServer((req, res) => {
    const url = new URL(req.url ?? "/", "http://localhost")
    const match = url.pathname.match(/^\/r\/([\w-]+\.json)$/)
    if (!match) {
      res.statusCode = 404
      res.end("not found")
      return
    }
    const file = resolve(REGISTRY_DIR, match[1]!)
    if (!existsSync(file)) {
      res.statusCode = 404
      res.end("not found")
      return
    }
    res.setHeader("Content-Type", "application/json")
    res.end(readFileSync(file, "utf-8"))
  })

  await new Promise<void>((resolveListen) => {
    server.listen(0, "127.0.0.1", resolveListen)
  })
  const address = server.address()
  if (typeof address !== "object" || address === null) {
    throw new Error("Failed to bind test registry server")
  }
  baseUrl = `http://127.0.0.1:${address.port}`
})

afterAll(async () => {
  await new Promise<void>((resolveClose, reject) => {
    server.close((err) => (err ? reject(err) : resolveClose()))
  })
})

beforeEach(() => {
  cwd = mkdtempSync(resolve(tmpdir(), "aether-cli-integ-"))
})

afterEach(() => {
  rmSync(cwd, { recursive: true, force: true })
})

describe("CLI integration: init + add", () => {
  it("creates aether.json then installs primitive, pattern, and block", async () => {
    if (!existsSync(REGISTRY_DIR)) {
      throw new Error(
        "Registry output not found — run `pnpm --filter @aetherstack/scripts build-registry` first.",
      )
    }

    writeConfig(
      {
        registry: baseUrl,
        aliases: {
          components: "src/components/ui",
          utils: "src/lib",
        },
      },
      cwd,
    )

    expect(existsSync(resolve(cwd, "aether.json"))).toBe(true)

    const config = {
      registry: baseUrl,
      aliases: {
        components: "src/components/ui",
        utils: "src/lib",
      },
    }

    for (const name of ["button", "form-field", "dashboard-shell"]) {
      const item = await resolveItem(baseUrl, name)
      expect(item, `expected to resolve ${name}`).not.toBeNull()
      const result = await installItem(item!, config, cwd, { baseUrl })
      expect(result.filesWritten.length).toBeGreaterThan(0)
    }

    expect(existsSync(resolve(cwd, "components/ui/button.tsx"))).toBe(true)
    expect(existsSync(resolve(cwd, "components/patterns/form-field.tsx"))).toBe(true)
    expect(existsSync(resolve(cwd, "components/blocks/dashboard-shell.tsx"))).toBe(true)

    const buttonSource = readFileSync(
      resolve(cwd, "components/ui/button.tsx"),
      "utf-8",
    )
    expect(buttonSource).toContain("Button")
  })

  it("returns null when component is not in the registry", async () => {
    const item = await resolveItem(baseUrl, "definitely-not-real")
    expect(item).toBeNull()
  })
})
