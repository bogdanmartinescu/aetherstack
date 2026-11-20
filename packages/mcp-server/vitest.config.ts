import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/__tests__/**/*.test.ts"],
    // pack-smoke builds dist/; stdio depends on that artifact
    fileParallelism: false,
  },
})
