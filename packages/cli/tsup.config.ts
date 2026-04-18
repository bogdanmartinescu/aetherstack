import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs"],
  target: "node18",
  clean: true,
  // Bundle workspace packages inline rather than treating them as external.
  // Without this, tsup leaves @aetherstack/* as require() calls that resolve
  // to raw .ts source in node_modules — which Node can't execute at runtime.
  noExternal: [/^@aetherstack\//],
  banner: {
    js: "#!/usr/bin/env node",
  },
})
