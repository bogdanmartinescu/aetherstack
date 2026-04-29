import { copyFileSync, existsSync } from "node:fs"
import { resolve } from "node:path"
import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs"],
  target: "node18",
  clean: true,
  sourcemap: true,
  banner: {
    js: "#!/usr/bin/env node",
  },
  async onSuccess() {
    // Bundle the public registry.json alongside the server so it works
    // out-of-the-box without requiring an AETHER_REGISTRY_URL env var.
    const src = resolve(__dirname, "../../apps/registry-public/public/r/registry.json")
    const dest = resolve(__dirname, "dist/registry.json")
    if (existsSync(src)) {
      copyFileSync(src, dest)
    }
  },
})
