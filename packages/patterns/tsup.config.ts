import { defineConfig } from "tsup"

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/components/activity-feed.tsx",
    "src/components/color-picker.tsx",
    "src/components/command-palette.tsx",
    "src/components/data-table.tsx",
    "src/components/empty-state.tsx",
    "src/components/error-state.tsx",
    "src/components/file-dropzone.tsx",
    "src/components/form-field.tsx",
    "src/components/kanban.tsx",
    "src/components/loading-state.tsx",
    "src/components/metric-card.tsx",
    "src/components/nav.tsx",
    "src/components/page-header.tsx",
    "src/components/section-header.tsx",
    "src/components/stat-group.tsx",
    "src/components/stepper.tsx",
    "src/components/table-toolbar.tsx",
  ],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  external: [
    "react",
    "react-dom",
    "@aetherstack/ui",
    "@aetherstack/utils",
    "cmdk",
    "lucide-react",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
  ],
  esbuildOptions(options) {
    options.jsx = "automatic"
  },
})
