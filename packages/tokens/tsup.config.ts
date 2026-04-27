import { defineConfig } from "tsup"

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/colors.ts",
    "src/motion.ts",
    "src/radius.ts",
    "src/shadows.ts",
    "src/spacing.ts",
    "src/typography.ts",
  ],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  external: [],
})
