import { copyFileSync, existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { defineConfig } from "tsup"

const CANONICAL = resolve(__dirname, "../../registry/public/registry.json")
const GENERATED = resolve(__dirname, "../../apps/registry-public/public/r/registry.json")

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs"],
  target: "node18",
  clean: true,
  sourcemap: true,
  // Bundle workspace packages inline (same as CLI). Without this, Node tries to
  // execute @aetherstack/registry-schema's raw .ts export and crashes at runtime.
  noExternal: [/^@aetherstack\//],
  // Shebang comes from the `#!/usr/bin/env node` line in src/index.ts.
  // Do not also set `banner.js` — a duplicated shebang crashes `node dist/index.js`.
  async onSuccess() {
    // Bundle the public registry alongside the server so it works out of the
    // box without AETHER_REGISTRY_URL. Prefer the canonical registry source;
    // fall back to the generated public artefact.
    const src = [CANONICAL, GENERATED].find((path) => existsSync(path))
    if (!src) {
      throw new Error(
        `MCP build failed: no registry found at ${CANONICAL} or ${GENERATED}. ` +
          "Run the registry build first.",
      )
    }

    const raw = JSON.parse(readFileSync(src, "utf-8")) as { items?: unknown[] }
    const count = Array.isArray(raw.items) ? raw.items.length : 0
    if (count === 0) {
      throw new Error(`MCP build failed: registry at ${src} has no items.`)
    }

    const dest = resolve(__dirname, "dist/registry.json")
    copyFileSync(src, dest)
    // eslint-disable-next-line no-console
    console.log(`Bundled registry (${count} items) from ${src} → dist/registry.json`)
  },
})
