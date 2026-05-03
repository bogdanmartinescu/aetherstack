---
name: add-registry-item
description: >-
  Guides adding a new component, pattern, or block to the Aetherstack registry.
  Covers creating the docs page, updating the relevant package README, regenerating
  llms.txt, and confirming the sitemap stays up to date. Use when the user adds or
  asks to add a component, pattern, or block; says "add a new component/pattern/block";
  creates a file in packages/ui, packages/patterns, or packages/blocks; or asks how
  to wire up a new item so it appears in the docs, registry, and llms.txt.
---

# Adding a Registry Item

When a new component, pattern, or block is created, complete all steps in the same session:

1. Create the **docs page** in `apps/docs`
2. Update the **package README**
3. Register the item in **registry JSON**
4. Regenerate **`llms.txt`** (and per-item JSON) with `build-registry`
5. Verify the **sitemap** picks up the new route

---

## 1. Determine the layer

| Layer | Source package | Registry type | Docs path |
|-------|---------------|---------------|-----------|
| Primitive | `packages/ui/src/components/` | `registry:ui` | `apps/docs/src/app/(docs)/components/<slug>/page.tsx` |
| Pattern | `packages/patterns/src/components/` | `registry:pattern` | `apps/docs/src/app/(docs)/patterns/<slug>/page.tsx` |
| Block | `packages/blocks/src/components/` | `registry:block` | `apps/docs/src/app/(docs)/blocks/<slug>/page.tsx` |

The `<slug>` is the kebab-case name (e.g. `StatGroup` → `stat-group`).

---

## 2. Create the docs page

### Primitive template

```tsx
"use client"

import { MyComponent } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

const MANUAL_SOURCE = `// paste full component source here`

export default function MyComponentPage() {
  return (
    <ComponentPage
      name="My Component"
      description="One sentence: what it does and its key characteristics."
      features={["Feature 1", "Feature 2"]}
      preview={<MyComponent />}
      previewCode={`import { MyComponent } from "@/components/ui/my-component"\n\n<MyComponent />`}
      cliInstall={`npx aether-ui add my-component`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[{ title: "Install dependencies", code: `npm install <peer-deps>`, filename: "terminal" }]}
      examples={[
        { title: "Basic usage", description: "Short description.", preview: <MyComponent />, code: `<MyComponent />` },
      ]}
      props={[{ name: "propName", type: "string", default: '"default"', description: "What it controls." }]}
      a11yNotes={["Accessibility note.", "Keyboard behavior note."]}
    />
  )
}
```

> Primitive pages use `"use client"` because `ComponentPage` renders interactive previews.

### Pattern template

```tsx
import type { Metadata } from "next"
import { MyPattern } from "@aetherstack/patterns"
import { PatternPage } from "@/components/pattern-page"

export const metadata: Metadata = {
  title: "My Pattern",
  description: "One sentence: what the pattern does.",
}

export default function MyPatternPage() {
  return (
    <PatternPage
      name="My Pattern"
      description="Expanded description."
      cliInstall="npx aether-ui add my-pattern"
      importCode={`import { MyPattern } from "@aetherstack/patterns"`}
      usageCode={`import { MyPattern } from "@aetherstack/patterns"\n\n<MyPattern />`}
      preview={<MyPattern />}
      props={[
        { name: "propName", type: "string", required: true, description: "What it controls." },
        { name: "className", type: "string", description: "Additional classes on the root element." },
      ]}
      a11yNotes={["Accessibility note."]}
    />
  )
}
```

### Block template

```tsx
import type { Metadata } from "next"
import { MyBlock } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "My Block",
  description: "One sentence: what the block provides.",
}

export default function MyBlockPage() {
  return (
    <BlockPage
      name="My Block"
      category="Category"
      description="Expanded description."
      cliInstall="npx aether-ui add my-block"
      previewScale={0.5}
      previewHeight="460px"
      importCode={`import { MyBlock } from "@aetherstack/blocks"`}
      usageCode={`import { MyBlock } from "@aetherstack/blocks"\n\n<MyBlock />`}
      preview={<MyBlock />}
      props={[
        { name: "children", type: "ReactNode", required: true, description: "Page content." },
        { name: "className", type: "string", description: "Additional classes." },
      ]}
      a11yNotes={["Accessibility note."]}
    />
  )
}
```

---

## 3. Update the package README

| Layer | README |
|-------|--------|
| Primitive | `packages/ui/README.md` |
| Pattern | `packages/patterns/README.md` |
| Block | `packages/blocks/README.md` |

**Rules:**
- Add the new item to the correct category table
- Increment the total count in the heading (`"65 components"` → `"66 components"`)
- AI-native items (`@aetherstack/*/ai`) go in the AI-native section with their own sub-count

---

## 4. Register the item in registry JSON

Add an entry to `registry/public/registry.json`:

```json
{
  "name": "my-component",
  "type": "registry:ui",
  "title": "My Component",
  "description": "One sentence description.",
  "files": [
    { "path": "src/components/ui/my-component.tsx", "type": "registry:ui" }
  ],
  "dependencies": ["@radix-ui/react-slot"],
  "devDependencies": [],
  "registryDependencies": [],
  "ai": {
    "intent": "What the component is for and when to reach for it.",
    "prompts": ["Trigger phrase an AI might use to select this component"],
    "composition": ["Sub-components or elements"],
    "slots": ["Optional named slot names"]
  }
}
```

**`ai` block is mandatory** — CI rejects items without it.

---

## 5. Regenerate llms.txt and per-item JSON

Run:

```bash
pnpm --filter @aetherstack/scripts build-registry
```

This single command:
- Rebuilds `apps/registry-public/public/r/registry.json` (aggregate)
- Writes a per-item `<name>.json` for every registry entry
- **Regenerates `apps/registry-public/public/llms.txt`** — do NOT hand-edit this file

Commit all generated artefacts alongside the registry change.

---

## 6. Sitemap — no manual update needed

The sitemap at `apps/docs/src/app/sitemap.ts` auto-discovers pages by reading the filesystem:

```
apps/docs/src/app/(docs)/components/<slug>/page.tsx  →  /components/<slug>
apps/docs/src/app/(docs)/patterns/<slug>/page.tsx    →  /patterns/<slug>
apps/docs/src/app/(docs)/blocks/<slug>/page.tsx      →  /blocks/<slug>
```

Creating the docs page (step 2) is sufficient — the sitemap picks it up automatically at build time. **No manual edit required.**

The only time you need to touch `sitemap.ts` directly is when adding an entirely new top-level route (e.g. a new section like `/forms` or `/animations`). In that case, add a static entry to the `staticRoutes` array inside `sitemap.ts`.

---

## 7. Checklist

```
- [ ] Source file created in packages/<layer>/src/components/
- [ ] Exported from packages/<layer>/src/index.ts
- [ ] Docs page created at apps/docs/src/app/(docs)/<layer>/<slug>/page.tsx
- [ ] README updated: item added to table, count incremented
- [ ] Registry entry added to registry/public/registry.json (with ai block)
- [ ] pnpm --filter @aetherstack/scripts build-registry run
- [ ] Generated artefacts (llms.txt, registry JSON) committed
- [ ] Sitemap auto-updates — no action needed unless this is a new top-level section
```

---

## Reference

- `ComponentPage` props → `apps/docs/src/components/component-page.tsx`
- `PatternPage` props → `apps/docs/src/components/pattern-page.tsx`
- `BlockPage` props → `apps/docs/src/components/block-page.tsx`
- Primitive example → `apps/docs/src/app/(docs)/components/button/page.tsx`
- Pattern example → `apps/docs/src/app/(docs)/patterns/stat-group/page.tsx`
- Block example → `apps/docs/src/app/(docs)/blocks/dashboard-shell/page.tsx`
- Sitemap → `apps/docs/src/app/sitemap.ts`
- llms.txt build script → `tooling/scripts/src/build-registry.ts`
