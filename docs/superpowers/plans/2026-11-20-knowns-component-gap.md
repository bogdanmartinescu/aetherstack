# Knowns Component Gap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Knowns UI components Aether does not already ship, and close the few real behavior gaps on components Aether already has, with tests, docs, and registry entries.

**Architecture:** New primitives live in `packages/ui` and compose existing Aether primitives (Button, Input, RadioGroup, Checkbox, Slider, StatusDot). Two product compositions, Question Card and Filter Chips, live in `packages/patterns` because they combine several primitives. Nothing in this plan is a block. Do not add npm dependencies. Match the behavior specified in each task. Do not copy source, CSS, or logo artwork from https://ui.knowns.dev.

**Tech Stack:** React 18, TypeScript (`exactOptionalPropertyTypes` is on for `packages/ui`), Tailwind tokens from `@aetherstack/tailwind-config`, Vitest + Testing Library, Radix primitives already in `@aetherstack/ui`, lucide-react 0.441 inside `packages/ui` (use `Eye`, `EyeOff`, `X`, `Minus`, `Check`, `LoaderCircle` — those names exist).

**Read before coding:** `docs/architecture/engineering-standards.md`, `CLAUDE.md`, and `.cursor/skills/add-registry-item/SKILL.md`.

**Commits:** Each task ends with a commit step. Create that commit only when the user has asked you to commit in the session. Otherwise leave the working tree dirty and continue.

**Order:** Do the tasks in order. They share `packages/ui/src/index.ts`, `packages/ui/package.json`, `packages/ui/tsup.config.ts`, `registry/public/registry.json`, `apps/docs/src/lib/registry-source.ts`, and the docs nav. Do not run two tasks at once.

---

## Comparison

Source of truth for "what Knowns has": https://ui.knowns.dev/docs/group/components (76 pages, fetched 2026-11-20). Aether inventory: `packages/ui/src/components`, `packages/patterns/src/components`, `packages/blocks/src/components`.

### Already covered — do not rebuild

| Knowns                                               | Aether                                                                             |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Button                                               | `packages/ui/src/components/button.tsx` (loading, press, xs, quiet, icons)         |
| Context Menu                                         | `context-menu.tsx`                                                                 |
| Toggle Group                                         | `toggle-group.tsx`                                                                 |
| Input, including prefix/suffix                       | `input.tsx` + `input-group.tsx`                                                    |
| Select                                               | `select.tsx`                                                                       |
| Combobox                                             | `combobox.tsx`                                                                     |
| Radio Group                                          | `radio-group.tsx`                                                                  |
| Switch                                               | `switch.tsx`                                                                       |
| Calendar                                             | `calendar.tsx` (react-day-picker)                                                  |
| Date Range Picker                                    | `packages/patterns/src/components/date-range-picker.tsx`                           |
| OTP Input                                            | `input-otp.tsx`                                                                    |
| File Drop rows                                       | `FileDropzone` plus `UploadProgress` / `UploadProgressItem`. Do not merge them.    |
| Dropdown, Menu                                       | `dropdown-menu.tsx`                                                                |
| User Menu                                            | `packages/patterns/src/components/profile-dropdown.tsx`                            |
| Dialog, Sheet, Drawer, Popover, Tooltip, Hover Card  | matching files in `packages/ui`                                                    |
| Toast                                                | `toast.tsx` and `sonner.tsx`                                                       |
| Command Menu                                         | `command-palette.tsx`                                                              |
| Data Table                                           | `data-table.tsx`                                                                   |
| Sortable                                             | `sortable-list.tsx`                                                                |
| Carousel, Card, Kbd, Separator, Resizable, Accordion | matching files                                                                     |
| Empty                                                | `empty-state.tsx`                                                                  |
| Code Block                                           | `packages/ui/src/components/ai/code-block.tsx`                                     |
| Alert, Spinner                                       | `alert.tsx`, `spinner.tsx`                                                         |
| Chart                                                | `chart.tsx` (Recharts). Do not rewrite it as hand-rolled SVG.                      |
| Token Stream                                         | `StreamingText`                                                                    |
| Shimmer text                                         | `ThinkingIndicator`                                                                |
| Theme light/dark/system                              | `ThemeSwitcher` in `packages/patterns`. Do not add a View Transition theme toggle. |

### Partial — extend, do not replace

| Knowns behavior                                     | Aether today                                                                         | Task |
| --------------------------------------------------- | ------------------------------------------------------------------------------------ | ---- |
| Slider range (two thumbs)                           | Radix range is supported by the primitive, but `slider.tsx` always renders one thumb | 16   |
| Textarea counter, announced near the limit          | Plain `<textarea>`                                                                   | 17   |
| Removable badge and +N group                        | `Badge` variants only                                                                | 18   |
| Checkbox indeterminate icon and select-all group    | `checked="indeterminate"` renders the check icon; no group                           | 19   |
| Avatar status dot                                   | Image, fallback, group overflow. No status                                           | 2    |
| Date field that understands "tomorrow" / "next fri" | Button + calendar popover only                                                       | 20   |
| Progress ring                                       | Bar only                                                                             | 9    |

### Missing — build

| Knowns                                                                   | Layer    | Task  |
| ------------------------------------------------------------------------ | -------- | ----- |
| Status Dot                                                               | ui       | 1     |
| Tag and TagGroup                                                         | ui       | 3     |
| Priority Bars                                                            | ui       | 4     |
| Segmented Control                                                        | ui       | 5     |
| Social Button                                                            | ui       | 6     |
| Password Field                                                           | ui       | 7     |
| Password Strength                                                        | ui       | 8     |
| Animated Number (also covers Knowns Number Ticker — build one component) | ui       | 10    |
| Uptime Bar                                                               | ui       | 11    |
| Heatmap                                                                  | ui       | 12    |
| Timeline Scrubber                                                        | ui       | 13    |
| Time Slots                                                               | ui       | 14    |
| Floating Dock, pinned corners only                                       | ui       | 15    |
| Question Card                                                            | patterns | 21    |
| Filter Chips                                                             | patterns | 22    |
| Shine Border, Parallax Card, Fan Stack                                   | ui       | 23–25 |

### Out of scope

- **Custom Cursor.** It hides the real pointer. Skip it.
- **Emoji Lens.** Marked Pro on Knowns. Skip it.
- **Pro variants** of Chart and Floating Dock (drag-and-snap media dock). Skip them.
- **Gradient Text, Decode Text, Word Rotate, Typewriter.** Decorative headline motion. `StreamingText` and `AnimatedNumber` cover the product cases. Skip the rest.
- **Skeleton shared light sweep and content-shaped presets.** `Skeleton` and `LoadingState` already cover loading placeholders.
- **A second chart implementation.**
- **Rewriting Button, Combobox, Calendar, or ThemeSwitcher.**

---

## Wiring recipe

Do this for every new public component. Task 1 spells it out in full. Later tasks give the exact strings and say "wire it".

1. Export the component and its prop types from the package barrel.
   - UI barrel: `packages/ui/src/index.ts`, insert the export **above** the `export * from "./components/ai"` line.
   - Patterns barrel: `packages/patterns/src/index.ts`, insert **above** `export * from "./components/ai"`.
2. UI only: add a subpath export in **both** the top-level `"exports"` and `publishConfig.exports` of `packages/ui/package.json`.
3. UI only: add the file to the `entry` array in `packages/ui/tsup.config.ts`. Patterns: add the file to `packages/patterns/tsup.config.ts` `entry`.
4. Add a registry item to `registry/public/registry.json` with an `ai` block. CI rejects items without one.
5. Run `pnpm --filter @aetherstack/scripts build-registry`.
6. Add a source export to `apps/docs/src/lib/registry-source.ts` using the new `apps/registry-public/public/r/<slug>.json`.
7. Add the docs page, a sidebar link, and an overview card.
8. Add the name to the package README list. Do not hand-edit `llms.txt`.

Registry item shape:

```json
{
  "name": "status-dot",
  "type": "registry:ui",
  "title": "Status Dot",
  "description": "One sentence.",
  "author": "aetherstack",
  "dependencies": ["@aetherstack/utils"],
  "registryDependencies": [],
  "files": [
    {
      "path": "packages/ui/src/components/status-dot.tsx",
      "type": "registry:ui",
      "target": "components/ui/status-dot.tsx"
    }
  ],
  "ai": {
    "intent": "When to reach for it.",
    "prompts": ["phrase an agent might use"],
    "composition": [],
    "slots": []
  }
}
```

Patterns use `"type": "registry:pattern"` and `"target": "components/patterns/<slug>.tsx"`.

UI package subpath, top-level `exports`:

```json
"./status-dot": "./src/components/status-dot.tsx"
```

`publishConfig.exports`:

```json
"./status-dot": {
  "import": "./dist/status-dot.mjs",
  "require": "./dist/status-dot.js",
  "types": "./dist/status-dot.d.ts"
}
```

Docs source helper (`apps/docs/src/lib/registry-source.ts`):

```tsx
import statusDot from "../../../registry-public/public/r/status-dot.json"

export const STATUS_DOT_SOURCE = toManualSource(statusDot)
```

`toManualSource` already exists in that file. Import the JSON only after `build-registry` has written it.

Sidebar: insert the link in **alphabetical** order inside the matching group of `apps/docs/src/components/docs-sidebar.tsx`. Component links go in the `"Components"` group. Pattern links go in the `"Patterns"` group.

Overview cards:

- `apps/docs/src/app/(docs)/components/page.tsx` — add to the category named in the task.
- `apps/docs/src/app/(docs)/patterns/page.tsx` — add to the category named in the task.

Docs page for a primitive:

```tsx
"use client"

import { StatusDot } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"
import { STATUS_DOT_SOURCE } from "@/lib/registry-source"

export default function StatusDotPage() {
  return (
    <ComponentPage
      name="Status Dot"
      description="A coloured dot for idle, busy, blocked, failed, and finished."
      features={["Five statuses", "Spoken label", "Pulse only while busy"]}
      preview={<StatusDot status="busy" />}
      previewCode={`import { StatusDot } from "@/components/ui/status-dot"\n\n<StatusDot status="busy" />`}
      cliInstall="npx aether-ui add status-dot"
      manualInstallCode={STATUS_DOT_SOURCE}
      props={[
        {
          name: "status",
          type: '"idle" | "busy" | "blocked" | "failed" | "finished"',
          default: "—",
          description: "Which state to show.",
        },
        {
          name: "label",
          type: "string",
          default: "—",
          description: "Spoken name. Defaults to the status.",
        },
        {
          name: "pulse",
          type: "boolean",
          default: "true when busy",
          description: "Pulse the dot. Off under reduced motion via motion-safe.",
        },
      ]}
      a11yNotes={[
        "The dot is an image with an accessible name.",
        "Busy pulses with motion-safe so reduced motion stays still.",
      ]}
    />
  )
}
```

Pattern pages use `PatternPage` from `@/components/pattern-page` and are **server** components (no `"use client"`) unless the preview needs `useState`. Question Card and Filter Chips need `"use client"` because their demos are interactive. Follow `apps/docs/src/app/(docs)/patterns/empty-state/page.tsx` for the prop names if `PatternPage` differs from the template in the skill.

Constraints for every component:

- Token classes (`bg-primary`, `bg-muted`, `border-border`, `text-destructive`). `amber-500` and `emerald-500` are already used in this repo for warning and success; they are allowed for status tones.
- Every `<button>` sets `type="button"`.
- Do not pass an explicit `undefined` to an optional prop. Spread conditionally.
- New files that use `useState`, `useEffect`, or `useId` start with `"use client"`.
- Pure modules (`date-phrase.ts`) do not get `"use client"`.
- Tests assert roles, names, and callback arguments. Do not snapshot class strings except where a task names a specific class.

Test command shape:

```bash
pnpm --filter @aetherstack/ui exec vitest run src/__tests__/status-dot.test.tsx
```

Expected failure before the implementation exists: Vitest cannot resolve the module. Expected success after: all tests in that file pass.

---

## Task 1: Status Dot

**Files:**

- Create: `packages/ui/src/components/status-dot.tsx`
- Create: `packages/ui/src/__tests__/status-dot.test.tsx`
- Create: `apps/docs/src/app/(docs)/components/status-dot/page.tsx`
- Modify: `packages/ui/src/index.ts`
- Modify: `packages/ui/package.json`
- Modify: `packages/ui/tsup.config.ts`
- Modify: `packages/ui/README.md` (add StatusDot to the component list)
- Modify: `registry/public/registry.json`
- Modify: `apps/docs/src/lib/registry-source.ts`
- Modify: `apps/docs/src/components/docs-sidebar.tsx`
- Modify: `apps/docs/src/app/(docs)/components/page.tsx` (category `"Display"`)

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { StatusDot } from "../components/status-dot"

describe("StatusDot", () => {
  it("exposes the default spoken label for the status", () => {
    render(<StatusDot status="busy" />)
    expect(screen.getByRole("img", { name: "Busy" })).toBeInTheDocument()
  })

  it("uses a custom label when one is passed", () => {
    render(<StatusDot status="failed" label="Deploy failed" />)
    expect(screen.getByRole("img", { name: "Deploy failed" })).toBeInTheDocument()
  })

  it("pulses only while busy, unless pulse is forced off", () => {
    const { rerender } = render(<StatusDot status="busy" />)
    expect(screen.getByRole("img", { name: "Busy" }).firstElementChild).toHaveClass(
      "motion-safe:animate-pulse",
    )
    rerender(<StatusDot status="idle" />)
    expect(screen.getByRole("img", { name: "Idle" }).firstElementChild).not.toHaveClass(
      "motion-safe:animate-pulse",
    )
    rerender(<StatusDot status="busy" pulse={false} />)
    expect(screen.getByRole("img", { name: "Busy" }).firstElementChild).not.toHaveClass(
      "motion-safe:animate-pulse",
    )
  })
})
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `pnpm --filter @aetherstack/ui exec vitest run src/__tests__/status-dot.test.tsx`

Expected: FAIL, cannot resolve `../components/status-dot`.

- [ ] **Step 3: Implement**

```tsx
import { cn } from "@aetherstack/utils"

const LABELS = {
  idle: "Idle",
  busy: "Busy",
  blocked: "Blocked",
  failed: "Failed",
  finished: "Finished",
} as const

const TONES = {
  idle: "bg-muted-foreground",
  busy: "bg-primary",
  blocked: "bg-amber-500",
  failed: "bg-destructive",
  finished: "bg-emerald-500",
} as const

export type StatusDotStatus = keyof typeof LABELS

export interface StatusDotProps {
  status: StatusDotStatus
  label?: string
  pulse?: boolean
  className?: string
}

export function StatusDot({ status, label, pulse, className }: StatusDotProps) {
  const text = label ?? LABELS[status]
  const shouldPulse = pulse ?? status === "busy"
  return (
    <span role="img" aria-label={text} className={cn("inline-flex", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "h-2 w-2 rounded-full",
          TONES[status],
          shouldPulse && "motion-safe:animate-pulse",
        )}
      />
    </span>
  )
}
```

- [ ] **Step 4: Run the test and confirm it passes**

Run: `pnpm --filter @aetherstack/ui exec vitest run src/__tests__/status-dot.test.tsx`

Expected: 3 passed.

- [ ] **Step 5: Wire it**

Barrel, above the AI export:

```tsx
export { StatusDot } from "./components/status-dot"
export type { StatusDotProps, StatusDotStatus } from "./components/status-dot"
```

`tsup.config.ts` entry: `"src/components/status-dot.tsx"`.

`package.json` exports as in the wiring recipe, slug `status-dot`.

Registry item: name `status-dot`, title `Status Dot`, description `Coloured status dot with a spoken label.`, dependencies `["@aetherstack/utils"]`, registryDependencies `[]`, ai intent `Show whether a person, service, or job is idle, busy, blocked, failed, or finished.`, prompts `["add a status dot", "show if a user is online", "add a presence indicator"]`, composition `["avatar"]`, slots `[]`.

Then:

```bash
pnpm --filter @aetherstack/scripts build-registry
```

Add `STATUS_DOT_SOURCE` to `registry-source.ts`. Create the docs page from the recipe (it is already filled in for this component). Sidebar, in the Components group, after Spinner and before Switch:

```tsx
{ label: "Status Dot", href: "/components/status-dot" },
```

Overview, category Display, after Spinner:

```tsx
{ name: "Status Dot", href: "/components/status-dot", description: "Coloured dot for idle, busy, blocked, failed, and finished." },
```

README: add `StatusDot` to the component list paragraph.

- [ ] **Step 6: Commit**

```bash
git add packages/ui/src/components/status-dot.tsx packages/ui/src/__tests__/status-dot.test.tsx packages/ui/src/index.ts packages/ui/package.json packages/ui/tsup.config.ts packages/ui/README.md registry/public/registry.json apps/registry-public/public apps/docs/src/lib/registry-source.ts apps/docs/src/components/docs-sidebar.tsx "apps/docs/src/app/(docs)/components/page.tsx" "apps/docs/src/app/(docs)/components/status-dot/page.tsx"
git commit -m "$(cat <<'EOF'
Add a status dot primitive with spoken labels.

EOF
)"
```

---

## Task 2: Avatar status

Depends on Task 1. Extend `Avatar`. Do not create a new registry item; `build-registry` refreshes `avatar.json` because the file is already registered.

**Files:**

- Modify: `packages/ui/src/components/avatar.tsx`
- Create: `packages/ui/src/__tests__/avatar-status.test.tsx`
- Modify: `apps/docs/src/app/(docs)/components/avatar/page.tsx` (add the `status` prop row and a preview)

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Avatar, AvatarFallback } from "../components/avatar"

describe("Avatar status", () => {
  it("renders a status dot when status is set", () => {
    render(
      <Avatar status="busy">
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>,
    )
    expect(screen.getByRole("img", { name: "Busy" })).toBeInTheDocument()
    expect(screen.getByText("AM")).toBeInTheDocument()
  })

  it("renders no status dot by default", () => {
    render(
      <Avatar>
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>,
    )
    expect(screen.queryByRole("img")).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run it**

Run: `pnpm --filter @aetherstack/ui exec vitest run src/__tests__/avatar-status.test.tsx`

Expected: FAIL, `status` is not a valid prop (the test fails typecheck or the dot is missing). Vitest does not typecheck, so this fails on the missing dot / the prop is ignored and the query returns null.

- [ ] **Step 3: Implement**

In `avatar.tsx`, import `StatusDot` and `StatusDotStatus` from `./status-dot`. Add `status?: StatusDotStatus` to the `Avatar` props by extending the Radix props:

```tsx
type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
  status?: StatusDotStatus
}
```

Destructure `status` and `children`. After `{children}`, render:

```tsx
{
  status ? (
    <span className="absolute bottom-0 right-0 translate-x-0.5 translate-y-0.5">
      <StatusDot status={status} />
    </span>
  ) : null
}
```

The root already has `relative`.

- [ ] **Step 4: Run avatar tests**

Run: `pnpm --filter @aetherstack/ui exec vitest run src/__tests__/avatar-status.test.tsx src/__tests__/primitives.test.tsx src/__tests__/primitives-ux.test.tsx`

Expected: the new tests pass and the existing avatar tests still pass.

- [ ] **Step 5: Docs**

On the avatar docs page, add a prop row `status` type `StatusDotStatus` description `Shows a StatusDot on the corner.` and a preview `<Avatar status="finished"><AvatarFallback>AM</AvatarFallback></Avatar>`. Rebuild the registry so the installed source matches:

```bash
pnpm --filter @aetherstack/scripts build-registry
```

- [ ] **Step 6: Commit**

```bash
git commit -m "$(cat <<'EOF'
Show a status dot on Avatar.

EOF
)"
```

---

## Task 3: Tag and TagGroup

**Files:**

- Create: `packages/ui/src/components/tag.tsx`
- Create: `packages/ui/src/__tests__/tag.test.tsx`
- Create: `apps/docs/src/app/(docs)/components/tag/page.tsx`
- Wire as slug `tag`, sidebar label `Tag` after Tabs and before Textarea, overview category Display.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Tag, TagGroup } from "../components/tag"

const items = [
  { id: "bug", label: "Bug" },
  { id: "docs", label: "Docs" },
  { id: "ui", label: "UI" },
] as const

describe("Tag", () => {
  it("removes itself through the named button", async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(<Tag label="Beta" onRemove={onRemove} />)
    await user.click(screen.getByRole("button", { name: "Remove Beta" }))
    expect(onRemove).toHaveBeenCalledOnce()
  })
})

describe("TagGroup", () => {
  it("moves roving focus with the arrow keys and does not move focus on mount", async () => {
    const user = userEvent.setup()
    render(<TagGroup label="Labels" items={items} />)
    const bug = screen.getByRole("button", { name: "Bug" })
    expect(bug).toHaveAttribute("tabindex", "0")
    expect(screen.getByRole("button", { name: "Docs" })).toHaveAttribute("tabindex", "-1")
    expect(bug).not.toHaveFocus()
    bug.focus()
    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("button", { name: "Docs" })).toHaveFocus()
    await user.keyboard("{ArrowLeft}")
    expect(bug).toHaveFocus()
  })

  it("replaces the selection in single mode", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <TagGroup
        label="Labels"
        items={items}
        selection="single"
        value={["bug"]}
        onValueChange={onValueChange}
      />,
    )
    await user.click(screen.getByRole("button", { name: "Docs" }))
    expect(onValueChange).toHaveBeenCalledWith(["docs"])
  })

  it("toggles membership in multiple mode", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <TagGroup
        label="Labels"
        items={items}
        selection="multiple"
        value={["bug"]}
        onValueChange={onValueChange}
      />,
    )
    await user.click(screen.getByRole("button", { name: "Docs" }))
    expect(onValueChange).toHaveBeenCalledWith(["bug", "docs"])
    await user.click(screen.getByRole("button", { name: "Bug" }))
    expect(onValueChange).toHaveBeenCalledWith([])
  })
})
```

- [ ] **Step 2: Run it and confirm failure**

Run: `pnpm --filter @aetherstack/ui exec vitest run src/__tests__/tag.test.tsx`

- [ ] **Step 3: Implement**

`"use client"`. Export `Tag`, `TagProps`, `TagGroup`, `TagGroupProps`, `TagItem`.

`Tag` renders the label as text, and a `type="button"` with `aria-label={`Remove ${label}`}` and an `X` icon only when `onRemove` is passed.

`TagGroup` props:

```tsx
export interface TagItem {
  id: string
  label: string
}

export interface TagGroupProps {
  label: string
  items: readonly TagItem[]
  selection?: "single" | "multiple"
  value?: readonly string[]
  onValueChange?: (value: string[]) => void
  className?: string
}
```

Render a `role="group"` `aria-label={label}`. Each item is a `type="button"` with `aria-pressed={value?.includes(item.id) ?? false}`. `tabIndex` is `0` for index 0 and `-1` for the rest. Track `active` in state. On ArrowRight / ArrowLeft, update `active` with wrap, set a `moved` ref to true, and focus that button in an effect only when `moved.current` is true (so mount does not steal focus). Home and End jump to the ends.

On click, when `selection` is `"single"`, call `onValueChange([id])`. When `"multiple"`, add the id if missing and remove it if present, keeping the previous order and appending new ids. When `selection` is omitted, click does not call `onValueChange`.

- [ ] **Step 4: Run the test**

Expected: 4 passed.

- [ ] **Step 5: Wire it**

Registry description `Selectable and removable chips with roving focus.` Dependencies `["@aetherstack/utils", "lucide-react"]`. ai intent `Filter or label a collection with quiet chips the user can select or remove.` prompts `["add tags", "add removable chips", "add a tag group"]`.

Docs props: `label`, `items`, `selection`, `value`, `onValueChange` for the group, and `label` / `onRemove` for `Tag`. Preview a `TagGroup` with the three items from the test and one removable `Tag`.

- [ ] **Step 6: Commit** with message `Add Tag and TagGroup with roving focus.`

---

## Task 4: Priority Bars

**Files:** `packages/ui/src/components/priority-bars.tsx`, `packages/ui/src/__tests__/priority-bars.test.tsx`, docs page `priority-bars`, sidebar `Priority Bars` between Popover and Progress, overview category Display.

- [ ] **Step 1: Failing test**

```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { PriorityBars } from "../components/priority-bars"

describe("PriorityBars", () => {
  it("speaks the priority and fills that many bars", () => {
    const { rerender } = render(<PriorityBars priority="low" />)
    const img = screen.getByRole("img", { name: "Low priority" })
    expect(img.querySelectorAll('[data-filled="true"]')).toHaveLength(1)
    rerender(<PriorityBars priority="high" />)
    expect(
      screen.getByRole("img", { name: "High priority" }).querySelectorAll('[data-filled="true"]'),
    ).toHaveLength(3)
  })

  it("uses an urgent mark instead of bars", () => {
    render(<PriorityBars priority="urgent" />)
    const img = screen.getByRole("img", { name: "Urgent priority" })
    expect(img.querySelectorAll('[data-filled="true"]')).toHaveLength(0)
    expect(img).toHaveAttribute("data-urgent", "true")
  })

  it("is decorative when asked, with no image role", () => {
    render(<PriorityBars priority="medium" decorative />)
    expect(screen.queryByRole("img")).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run and confirm failure**

- [ ] **Step 3: Implement**

No `"use client"` (no state). `priority: "none" | "low" | "medium" | "high" | "urgent"`. Filled counts: none 0, low 1, medium 2, high 3. Urgent renders a rounded square with `!` and `data-urgent="true"` and no `data-filled` bars. Other priorities render three bars, the first N with `data-filled="true"` and `bg-primary`, the rest `bg-muted`. Labels: `No priority`, `Low priority`, `Medium priority`, `High priority`, `Urgent priority`. `decorative` sets `aria-hidden` and omits `role`. Otherwise `role="img"` and `aria-label`.

- [ ] **Step 4: Tests pass (3)**

- [ ] **Step 5: Wire** slug `priority-bars`. Dependencies `["@aetherstack/utils"]`. ai intent `Show low, medium, high, or urgent priority beside a row.` prompts `["add a priority indicator", "show task priority"]`.

- [ ] **Step 6: Commit** `Add priority bars with a spoken label.`

---

## Task 5: Segmented Control

This is not Toggle Group. Toggle Group stays as it is. Segmented Control is a single-select radio group with a thumb behind the selected segment.

**Files:** `packages/ui/src/components/segmented-control.tsx`, test, docs `segmented-control`, sidebar between Scroll Area and Select, overview category Actions.

- [ ] **Step 1: Failing test**

```tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SegmentedControl } from "../components/segmented-control"

const options = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
]

describe("SegmentedControl", () => {
  it("exposes a radio for each option and checks the value", () => {
    render(<SegmentedControl aria-label="Range" options={options} value="week" />)
    expect(screen.getByRole("radio", { name: "Week" })).toBeChecked()
    expect(screen.getByRole("radio", { name: "Day" })).not.toBeChecked()
    expect(screen.getByTestId("segment-thumb")).toHaveAttribute("data-index", "1")
  })

  it("selects the next option from the keyboard", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <SegmentedControl
        aria-label="Range"
        options={options}
        defaultValue="day"
        onValueChange={onValueChange}
      />,
    )
    await user.click(screen.getByRole("radio", { name: "Day" }))
    await user.keyboard("{ArrowRight}")
    expect(onValueChange).toHaveBeenCalledWith("week")
  })

  it("does not select a disabled option", () => {
    render(
      <SegmentedControl
        aria-label="Range"
        options={[...options.slice(0, 2), { value: "month", label: "Month", disabled: true }]}
        value="day"
      />,
    )
    expect(screen.getByRole("radio", { name: "Month" })).toBeDisabled()
  })
})
```

- [ ] **Step 2: Run and confirm failure**

- [ ] **Step 3: Implement**

`"use client"`. Import `RadioGroup` and `RadioGroupItem` from `./radio-group`.

```tsx
export interface SegmentedOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SegmentedControlProps {
  options: readonly SegmentedOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  "aria-label": string
  className?: string
}
```

Spread `{...(value !== undefined ? { value } : {})}` and the same for `defaultValue` onto `RadioGroup`. `onValueChange` only when defined. The group is `relative inline-grid` with `gridTemplateColumns: repeat(options.length, minmax(0, 1fr))`. The thumb is a `span` with `data-testid="segment-thumb"` and `data-index` set to the index of `value ?? defaultValue`, or `"0"` when neither is set. Place it `absolute inset-y-1 left-1` with width `calc((100% - 0.5rem) / ${options.length})` and `translateX(calc(${index} * 100%))`, `bg-background`, `pointer-events-none`, `motion-safe:transition-transform`. Each option is a `RadioGroupItem` with `className` that shows no default radio circle (`aspect-auto h-8 w-auto rounded-md`) and the label as children. Pass `disabled` only when `option.disabled` is true.

- [ ] **Step 4: Tests pass (3).** If Radix arrow-key selection does not call `onValueChange` under jsdom, keep the test and fix the component by handling ArrowRight/ArrowLeft on the group: preventDefault and call `onValueChange` with the next enabled option. Do not delete the test.

- [ ] **Step 5: Wire** slug `segmented-control`, registryDependencies `["radio-group"]`, npm dependencies `["@aetherstack/utils"]`. ai intent `Pick one of a few options with a sliding thumb.` prompts `["add a segmented control", "add a day week month switch"]`.

- [ ] **Step 6: Commit** `Add a segmented control.`

---

## Task 6: Social Button

Six providers, not 24. Glyphs are a letter in a rounded square that we author. Do not paste trademark logo paths.

**Files:** `packages/ui/src/components/social-button.tsx`, test, docs `social-button`, sidebar after Slider and before Sonner, overview category Actions.

- [ ] **Step 1: Failing test**

```tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SocialButton } from "../components/social-button"

describe("SocialButton", () => {
  it("names the verb and the provider", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<SocialButton provider="google" verb="Sign up" onClick={onClick} />)
    await user.click(screen.getByRole("button", { name: "Sign up with Google" }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it("uses an accessible name when there is no visible text", () => {
    render(<SocialButton provider="github" variant="icon" />)
    expect(screen.getByRole("button", { name: "Sign in with GitHub" })).toBeInTheDocument()
  })

  it("stays busy without submitting", () => {
    render(<SocialButton provider="apple" loading />)
    const button = screen.getByRole("button", { name: "Sign in with Apple" })
    expect(button).toHaveAttribute("aria-busy", "true")
    expect(button).toHaveAttribute("type", "button")
  })

  it("marks the brand variant", () => {
    render(<SocialButton provider="microsoft" variant="brand" />)
    expect(screen.getByRole("button", { name: "Sign in with Microsoft" })).toHaveAttribute(
      "data-provider",
      "microsoft",
    )
  })
})
```

- [ ] **Step 2: Run and confirm failure**

- [ ] **Step 3: Implement**

`"use client"` only if you need state. Prefer no state: compose `Button` from `./button`.

```tsx
export const SOCIAL_PROVIDERS = {
  google: "Google",
  apple: "Apple",
  microsoft: "Microsoft",
  github: "GitHub",
  gitlab: "GitLab",
  slack: "Slack",
} as const

export type SocialProvider = keyof typeof SOCIAL_PROVIDERS

export interface SocialButtonProps {
  provider: SocialProvider
  verb?: "Sign in" | "Sign up" | "Continue"
  variant?: "outline" | "brand" | "icon"
  loading?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
}
```

`verb` defaults to `"Sign in"`. `variant` defaults to `"outline"`. Visible name is `` `${verb} with ${SOCIAL_PROVIDERS[provider]}` ``. Icon variant passes that string as `aria-label` and `size="icon"` and does not render the text. Other variants render a glyph plus the text. Glyph is `<span aria-hidden="true">{SOCIAL_PROVIDERS[provider][0]}</span>`. Map `outline` to Button `variant="outline"`, `brand` and `icon` to Button `variant="outline"` as well, and set `data-provider={provider}` on the Button via a wrapper... Button may not forward `data-provider` if it isn't in its props. It spreads `...props` onto the DOM, so pass `data-provider={provider}`. Pass `loading` through. Do not pass `onClick` when it is undefined.

- [ ] **Step 4: Tests pass (4)**

- [ ] **Step 5: Wire** slug `social-button`, registryDependencies `["button"]`, dependencies `["@aetherstack/utils"]`. ai intent `Start a sign-in or sign-up with a named provider.` prompts `["add a Google sign in button", "add social login"]`.

- [ ] **Step 6: Commit** `Add a social sign-in button.`

---

## Task 7: Password Field

**Files:** `packages/ui/src/components/password-field.tsx`, test, docs `password-field`, sidebar after Pagination and before Popover, overview category Forms.

- [ ] **Step 1: Failing test**

```tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { PasswordField } from "../components/password-field"

describe("PasswordField", () => {
  it("toggles visibility and presses the toggle", async () => {
    const user = userEvent.setup()
    render(<PasswordField label="Password" autoComplete="current-password" />)
    const input = screen.getByLabelText("Password")
    expect(input).toHaveAttribute("type", "password")
    expect(input).toHaveAttribute("autocomplete", "current-password")
    await user.click(screen.getByRole("button", { name: "Show password" }))
    expect(input).toHaveAttribute("type", "text")
    expect(screen.getByRole("button", { name: "Hide password" })).toHaveAttribute(
      "aria-pressed",
      "true",
    )
  })

  it("warns when Caps Lock is on", () => {
    render(<PasswordField label="Password" />)
    const input = screen.getByLabelText("Password")
    const event = new KeyboardEvent("keydown", { key: "A", bubbles: true, cancelable: true })
    vi.spyOn(event, "getModifierState").mockImplementation((key) => key === "CapsLock")
    input.dispatchEvent(event)
    expect(screen.getByRole("status")).toHaveTextContent("Caps Lock is on")
  })
})
```

- [ ] **Step 2: Run and confirm failure**

- [ ] **Step 3: Implement**

`"use client"`. Props: `label` (default `"Password"`), `autoComplete` (`"current-password" | "new-password"`, default `"current-password"`), plus `value`, `defaultValue`, `onChange`, `disabled`, `name`, `id`, `className`. Use `useId()` for the input id and the status id.

Input `type` is `revealed ? "text" : "password"`. Internal `revealed` state. Toggle button `aria-pressed={revealed}` and `aria-label` `revealed ? "Hide password" : "Show password"`. Icons `EyeOff` when revealed, `Eye` when hidden.

On keydown and keyup, if `event.getModifierState("CapsLock")`, set caps state true, else false. When true, render `<p role="status" id={statusId}>Caps Lock is on</p>` and set the input `aria-describedby` to that id. When false, render nothing and do not set `aria-describedby`.

- [ ] **Step 4: Tests pass (2).** If the Caps Lock test never sees the warning, the native event is not reaching React: handle `keydown` through the input's React `onKeyDown` and read `getModifierState` from that event. Do not drop the warning or the test. Also run `src/__tests__/primitives.test.tsx` if you touched `input.tsx` (you should not).

- [ ] **Step 5: Wire** slug `password-field`, registryDependencies `["input", "button"]` if you import those files, otherwise only the npm deps you actually import. ai intent `Collect a password with a show/hide toggle and a Caps Lock warning.` prompts `["add a password field", "add a show password toggle"]`.

- [ ] **Step 6: Commit** `Add a password field with Caps Lock warning.`

---

## Task 8: Password Strength

Pure helpers and the meter live in one file so the registry installs one module.

**Files:** `packages/ui/src/components/password-strength.tsx`, test, docs `password-strength`, sidebar after Password Field, overview category Forms.

- [ ] **Step 1: Failing test**

```tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  checkPassword,
  generatePassword,
  scorePassword,
  PasswordStrength,
} from "../components/password-strength"

describe("password helpers", () => {
  it("scores by length and character classes", () => {
    expect(scorePassword("")).toBe(0)
    expect(scorePassword("short")).toBe(1)
    expect(scorePassword("abcdefgh")).toBe(2)
    expect(scorePassword("Abcdefg1")).toBe(3)
    expect(scorePassword("Abcdefghij1!")).toBe(4)
  })

  it("checks each rule", () => {
    expect(checkPassword("abc")).toEqual({
      length: false,
      lowercase: true,
      uppercase: false,
      number: false,
      symbol: false,
    })
  })

  it("generates a password that meets every rule", () => {
    const password = generatePassword(12, () => 0)
    expect(password).toHaveLength(12)
    expect(checkPassword(password)).toEqual({
      length: true,
      lowercase: true,
      uppercase: true,
      number: true,
      symbol: true,
    })
  })
})

describe("PasswordStrength", () => {
  it("exposes the score and generates into the callback", async () => {
    const user = userEvent.setup()
    const onPasswordChange = vi.fn()
    render(<PasswordStrength password="short" onPasswordChange={onPasswordChange} />)
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuenow", "1")
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuemax", "4")
    await user.click(screen.getByRole("button", { name: "Generate password" }))
    const next = onPasswordChange.mock.calls[0]?.[0] as string
    expect(checkPassword(next).length).toBe(true)
  })
})
```

- [ ] **Step 2: Run and confirm failure**

- [ ] **Step 3: Implement**

Scoring, locked to the tests:

- `0` when `password.length === 0`
- classes are lowercase, uppercase, digit, symbol (`/[^A-Za-z0-9]/`)
- `1` when length is under 8
- `2` when length is at least 8 and fewer than 3 classes
- `3` when length is at least 8 and at least 3 classes, but not the top band
- `4` when length is at least 12 and all 4 classes match

`checkPassword` returns `{ length, lowercase, uppercase, number, symbol }` where `length` means `password.length >= 8`.

`generatePassword(length = 16, random = Math.random)` picks one char from each of `abcdefghijkmnopqrstuvwxyz`, `ABCDEFGHJKLMNPQRSTUVWXYZ`, `23456789`, `!@#$%*`, fills the rest from the concatenation, then Fisher-Yates shuffles with `random`. `pick` uses `set[Math.min(set.length - 1, Math.floor(random() * set.length))]`.

`PasswordStrength` is `"use client"`. Props: `password: string`, `onPasswordChange?: (next: string) => void`. `role="meter"` with `aria-valuemin={0}` `aria-valuemax={4}` `aria-valuenow={score}` `aria-valuetext` of `Empty | Weak | Fair | Good | Strong` for scores 0–4. A list of the five rule labels (`At least 8 characters`, `Lowercase letter`, `Uppercase letter`, `Number`, `Symbol`) with `data-met="true" | "false"`. Generate button calls `onPasswordChange?.(generatePassword())` only when the callback was passed.

- [ ] **Step 4: Tests pass (4)**

- [ ] **Step 5: Wire** slug `password-strength`, registryDependencies `["button"]` if the generate control uses Button. ai intent `Show how strong a password is and generate one that passes the rules.` prompts `["add a password strength meter", "generate a strong password"]`.

- [ ] **Step 6: Commit** `Add password scoring and a strength meter.`

---

## Task 9: Progress ring

Add `ProgressRing` to `packages/ui/src/components/progress.tsx`. The file is already a registry item. Export the new component from `packages/ui/src/index.ts` next to `Progress`. No new package subpath (it ships with `./progress`).

- [ ] **Step 1: Failing test** in `packages/ui/src/__tests__/progress-ring.test.tsx`

```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ProgressRing } from "../components/progress"

describe("ProgressRing", () => {
  it("exposes a determinate value", () => {
    render(<ProgressRing value={25} aria-label="Upload" />)
    const bar = screen.getByRole("progressbar", { name: "Upload" })
    expect(bar).toHaveAttribute("aria-valuenow", "25")
    expect(bar).toHaveAttribute("aria-valuemax", "100")
  })

  it("omits the value while indeterminate", () => {
    render(<ProgressRing indeterminate aria-label="Loading" />)
    expect(screen.getByRole("progressbar", { name: "Loading" })).not.toHaveAttribute(
      "aria-valuenow",
    )
  })
})
```

- [ ] **Step 2: Run and confirm failure**

- [ ] **Step 3: Implement**

```tsx
export interface ProgressRingProps {
  value?: number
  max?: number
  indeterminate?: boolean
  "aria-label": string
  className?: string
}
```

Render an `svg` with `role="progressbar"`, `aria-label`, `aria-valuemin={0}`, `aria-valuemax={max}` (default 100). Set `aria-valuenow` only when `indeterminate` is not true and `value` is a number, clamped to 0..max. Two circles: a track `stroke-muted` and an indicator `stroke-primary` whose `strokeDashoffset` reflects the percent. Indeterminate adds `motion-safe:animate-spin` on the svg and no dash offset math. `viewBox="0 0 36 36"`, size `h-10 w-10`.

- [ ] **Step 4: Tests pass.** Run the existing progress tests too: `src/__tests__/primitives-ux.test.tsx`.

- [ ] **Step 5: Docs**

Add a `ProgressRing` example and prop rows to `apps/docs/src/app/(docs)/components/progress/page.tsx`. Rebuild the registry.

- [ ] **Step 6: Commit** `Add a progress ring beside the progress bar.`

---

## Task 10: Animated Number

One component covers Knowns "Animated Number" and "Number Ticker". The accessible text is always the final formatted value.

**Files:** `packages/ui/src/components/animated-number.tsx`, test, docs `animated-number`, sidebar between Alert Dialog and Aspect Ratio, overview category Display.

- [ ] **Step 1: Failing test**

```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { AnimatedNumber } from "../components/animated-number"

describe("AnimatedNumber", () => {
  it("formats currency", () => {
    render(
      <AnimatedNumber
        value={48210}
        format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
      />,
    )
    expect(screen.getByText("$48,210")).toBeInTheDocument()
  })

  it("formats percents", () => {
    render(<AnimatedNumber value={0.125} format={{ style: "percent", maximumFractionDigits: 1 }} />)
    expect(screen.getByText("12.5%")).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run and confirm failure**

- [ ] **Step 3: Implement**

`"use client"` if you animate with state; a pure render does not need it. Format with `new Intl.NumberFormat(locale ?? "en-US", format).format(value)`. Render that string as the text content of a `span`. You may add an `aria-hidden` digit roll, but the string returned by `Intl` must be what `getByText` finds, with no duplicate visible copies. Default `format` is `{ maximumFractionDigits: 0 }`.

- [ ] **Step 4: Tests pass (2)**

- [ ] **Step 5: Wire** slug `animated-number`. Dependencies `["@aetherstack/utils"]` only if you import `cn`. ai intent `Show a formatted number for money, percents, and live metrics.` prompts `["add an animated number", "roll a metric up to its value", "add a number ticker"]`.

- [ ] **Step 6: Commit** `Add an animated number that stays readable.`

---

## Task 11: Uptime Bar

**Files:** `packages/ui/src/components/uptime-bar.tsx`, test, docs `uptime-bar`, sidebar after Tooltip and before Visually Hidden, overview category Display.

- [ ] **Step 1: Failing test**

```tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { UptimeBar } from "../components/uptime-bar"

const days = [
  { id: "1", label: "Mon", status: "up" as const },
  { id: "2", label: "Tue", status: "up" as const },
  { id: "3", label: "Wed", status: "up" as const },
  { id: "4", label: "Thu", status: "down" as const },
  { id: "5", label: "Fri", status: "unknown" as const },
]

describe("UptimeBar", () => {
  it("summarises uptime without counting unknown days", () => {
    render(<UptimeBar days={days} />)
    expect(screen.getByRole("listbox")).toHaveAccessibleName(/75%/)
  })

  it("uses one tab stop and arrow keys between days", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<UptimeBar days={days} onSelect={onSelect} />)
    await user.tab()
    expect(screen.getByRole("option", { name: "Mon, up" })).toHaveFocus()
    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("option", { name: "Tue, up" })).toHaveFocus()
    await user.keyboard("{Enter}")
    expect(onSelect).toHaveBeenCalledWith("2")
  })
})
```

- [ ] **Step 2: Run and confirm failure**

- [ ] **Step 3: Implement**

`"use client"`.

```tsx
export type UptimeStatus = "up" | "degraded" | "down" | "unknown"

export interface UptimeDay {
  id: string
  label: string
  status: UptimeStatus
}
```

Percent is `Math.round((up / known) * 100)` where `known` excludes `"unknown"`. Zero known days renders `0%`. `role="listbox"` `aria-label={`${percent}% uptime`}`. Each day is `role="option"` with accessible name `` `${label}, ${status}` ``. Only the active index has `tabIndex={0}`; the rest `-1`. ArrowRight, ArrowLeft, Home, and End move it, then focus it. Enter and Space call `onSelect(id)`when`onSelect`is defined. Do not call it for other keys. Tones: up`bg-emerald-500`, degraded `bg-amber-500`, down `bg-destructive`, unknown `bg-muted`.

- [ ] **Step 4: Tests pass (2)**

- [ ] **Step 5: Wire** slug `uptime-bar`. ai intent `Show day-by-day uptime for one service and the percent that excludes days with no data.` prompts `["add an uptime bar", "show service uptime"]`.

- [ ] **Step 6: Commit** `Add an uptime bar with keyboard day inspection.`

---

## Task 12: Heatmap

**Files:** `packages/ui/src/components/heatmap.tsx`, test, docs `heatmap`, sidebar between Dropdown Menu and Hover Card, overview category Display.

- [ ] **Step 1: Failing test**

```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Heatmap } from "../components/heatmap"

describe("Heatmap", () => {
  it("names the focused cell and moves with the arrows", async () => {
    const user = userEvent.setup()
    render(
      <Heatmap
        aria-label="Deploys"
        rowLabels={["Mon", "Tue"]}
        columnLabels={["9am", "10am"]}
        values={[
          [0.2, 0.8],
          [1, 0],
        ]}
      />,
    )
    await user.tab()
    expect(screen.getByRole("gridcell", { name: "Mon, 9am, 0.2" })).toHaveFocus()
    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("gridcell", { name: "Mon, 10am, 0.8" })).toHaveFocus()
    await user.keyboard("{ArrowDown}")
    expect(screen.getByRole("gridcell", { name: "Tue, 10am, 0" })).toHaveFocus()
  })

  it("rejects a values grid that does not match the labels", () => {
    expect(() =>
      render(
        <Heatmap
          aria-label="Deploys"
          rowLabels={["Mon"]}
          columnLabels={["9am"]}
          values={[[1, 2]]}
        />,
      ),
    ).toThrow(/values/)
  })
})
```

- [ ] **Step 2: Run and confirm failure**

- [ ] **Step 3: Implement**

`"use client"`. Props: `aria-label`, `rowLabels: readonly string[]`, `columnLabels: readonly string[]`, `values: readonly (readonly number[])[]`. Throw `Error("Heatmap values must match row and column labels")` when the outer length differs from `rowLabels.length` or any row length differs from `columnLabels.length`.

`role="grid"` `aria-label={aria-label}`. One `role="row"` per row label. Cells are `role="gridcell"` buttons (`type="button"`) or divs with `tabIndex`. Accessible name `` `${row}, ${column}, ${clamped}` `` where clamped is `Math.min(1, Math.max(0, value))` and formatted with `Number(clamped.toFixed(2))` then `String` so `0.2` stays `"0.2"` and `1` stays `"1"` and `0` stays `"0"`. Use `String(Number(clamped.toFixed(2)))` which yields `"0.2"`, `"0.8"`, `"1"`, `"0"`.

Only the active cell has `tabIndex={0}`. Arrows move within bounds and do not wrap. Focus the cell after a move, not on mount. Cell background: `color-mix(in srgb, hsl(var(--primary)) ${Math.round(clamped * 100)}%, hsl(var(--muted)))`.

- [ ] **Step 4: Tests pass (2)**

- [ ] **Step 5: Wire** slug `heatmap`. ai intent `Show a grid of values, such as weekday by hour, with keyboard inspection.` prompts `["add a heatmap", "show activity by hour"]`.

- [ ] **Step 6: Commit** `Add a keyboard-operable heatmap.`

---

## Task 13: Timeline Scrubber

Use a native range input. Do not rebuild dragging on top of Slider.

**Files:** `packages/ui/src/components/timeline-scrubber.tsx`, test, docs `timeline-scrubber`, sidebar after Textarea and before Toast, overview category Display.

- [ ] **Step 1: Failing test**

```tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { TimelineScrubber } from "../components/timeline-scrubber"

describe("TimelineScrubber", () => {
  it("reports the new value and shows it", () => {
    const onValueChange = vi.fn()
    render(
      <TimelineScrubber
        label="Position"
        min={0}
        max={10}
        step={1}
        value={3}
        onValueChange={onValueChange}
      />,
    )
    expect(screen.getByRole("slider", { name: "Position" })).toHaveAttribute("aria-valuenow", "3")
    fireEvent.change(screen.getByRole("slider", { name: "Position" }), { target: { value: "4" } })
    expect(onValueChange).toHaveBeenCalledWith(4)
    expect(screen.getByText("3")).toBeInTheDocument()
  })
})
```

The visible text stays `"3"` because the component is controlled. That is the assertion.

- [ ] **Step 2: Run and confirm failure**

- [ ] **Step 3: Implement**

```tsx
export interface TimelineScrubberProps {
  label: string
  min: number
  max: number
  step?: number
  value: number
  onValueChange: (value: number) => void
  className?: string
}
```

Render the current `value` as text and an `<input type="range" aria-label={label} min max step value onChange>`. `step` defaults to `1`. `onChange` calls `onValueChange(Number(event.target.value))`.

- [ ] **Step 4: Test passes**

- [ ] **Step 5: Wire** slug `timeline-scrubber`. ai intent `Move one marker along a time range.` prompts `["add a timeline scrubber", "scrub a recording"]`.

- [ ] **Step 6: Commit** `Add a timeline scrubber.`

---

## Task 14: Time Slots

**Files:** `packages/ui/src/components/time-slots.tsx`, test, docs `time-slots`, sidebar between Textarea and Timeline Scrubber, overview category Forms.

- [ ] **Step 1: Failing test**

```tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TimeSlots } from "../components/time-slots"

const slots = [
  { id: "a", label: "09:00" },
  { id: "b", label: "09:30", disabled: true },
]

describe("TimeSlots", () => {
  it("shows the time zone and confirms the chosen slot", async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()
    render(<TimeSlots timeZoneLabel="Europe/Bucharest" slots={slots} onConfirm={onConfirm} />)
    expect(screen.getByText("Europe/Bucharest")).toBeInTheDocument()
    expect(screen.getByRole("radio", { name: "09:30" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "Confirm" })).toBeDisabled()
    await user.click(screen.getByRole("radio", { name: "09:00" }))
    expect(screen.getByRole("button", { name: "Confirm" })).toBeEnabled()
    await user.click(screen.getByRole("button", { name: "Confirm" }))
    expect(onConfirm).toHaveBeenCalledWith("a")
  })
})
```

- [ ] **Step 2: Run and confirm failure**

- [ ] **Step 3: Implement**

`"use client"`. Use `RadioGroup` / `RadioGroupItem`.

```tsx
export interface TimeSlot {
  id: string
  label: string
  disabled?: boolean
}

export interface TimeSlotsProps {
  timeZoneLabel: string
  slots: readonly TimeSlot[]
  value?: string
  onValueChange?: (id: string) => void
  onConfirm?: (id: string) => void
  confirmLabel?: string
}
```

Uncontrolled selection lives in state when `value` is undefined. Controlled mode uses `value`. Confirm label defaults to `"Confirm"`. The button is disabled when no slot is selected. `onConfirm` receives the selected id. Disabled slots pass `disabled` to the radio. Render `timeZoneLabel` as text. `aria-label` on the radio group: `"Times"`.

- [ ] **Step 4: Test passes**

- [ ] **Step 5: Wire** slug `time-slots`, registryDependencies `["radio-group", "button"]`. ai intent `Pick one bookable time and confirm it.` prompts `["add time slots", "add a booking time picker"]`.

- [ ] **Step 6: Commit** `Add bookable time slots.`

---

## Task 15: Floating Dock

Pinned corners only. No dragging.

**Files:** `packages/ui/src/components/floating-dock.tsx`, test, docs `floating-dock`, sidebar between Dropdown Menu and Heatmap, overview category Overlays.

- [ ] **Step 1: Failing test**

```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { FloatingDock } from "../components/floating-dock"

describe("FloatingDock", () => {
  it("pins to the bottom-right of the viewport by default", () => {
    render(
      <FloatingDock>
        <p>Call</p>
      </FloatingDock>,
    )
    const dock = screen.getByRole("region", { name: "Dock" })
    expect(dock).toHaveAttribute("data-corner", "bottom-right")
    expect(dock).toHaveClass("fixed")
    expect(screen.getByText("Call")).toBeInTheDocument()
  })

  it("anchors inside a parent when contained", () => {
    render(
      <FloatingDock corner="top-left" contained label="Player">
        <p>Track</p>
      </FloatingDock>,
    )
    const dock = screen.getByRole("region", { name: "Player" })
    expect(dock).toHaveAttribute("data-corner", "top-left")
    expect(dock).toHaveClass("absolute")
    expect(dock).not.toHaveClass("fixed")
  })
})
```

- [ ] **Step 2: Run and confirm failure**

- [ ] **Step 3: Implement**

```tsx
export type FloatingDockCorner = "top-left" | "top-right" | "bottom-left" | "bottom-right"

export interface FloatingDockProps {
  corner?: FloatingDockCorner
  contained?: boolean
  label?: string
  children: React.ReactNode
  className?: string
}
```

`corner` defaults to `"bottom-right"`. `label` defaults to `"Dock"`. `role="region"` `aria-label={label}` `data-corner={corner}`. `fixed` unless `contained`, then `absolute`. Corner classes: `top-left` → `top-4 left-4`, `top-right` → `top-4 right-4`, `bottom-left` → `bottom-4 left-4`, `bottom-right` → `bottom-4 right-4`. Also add `pb-[env(safe-area-inset-bottom)]` and `pr-[env(safe-area-inset-right)]` so the device safe area stays clear. Surface: `rounded-lg border border-border bg-card shadow-lg`.

- [ ] **Step 4: Tests pass (2)**

- [ ] **Step 5: Wire** slug `floating-dock`. ai intent `Pin a small panel to a corner of the screen or a parent.` prompts `["add a floating dock", "pin a player to the corner"]`.

- [ ] **Step 6: Commit** `Add a corner-pinned floating dock.`

---

## Task 16: Slider range

`packages/ui/src/components/slider.tsx` already has `"use client"` and always renders one thumb. Existing tests pass `defaultValue={[50]}` and expect one slider. Keep that.

- [ ] **Step 1: Failing test** in `packages/ui/src/__tests__/slider-range.test.tsx`

```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Slider } from "../components/slider"

describe("Slider range", () => {
  it("renders one thumb per value", () => {
    render(<Slider value={[20, 80]} />)
    expect(screen.getAllByRole("slider")).toHaveLength(2)
  })

  it("still renders one thumb for a single value", () => {
    render(<Slider defaultValue={[50]} />)
    expect(screen.getAllByRole("slider")).toHaveLength(1)
  })
})
```

- [ ] **Step 2: Run and confirm the first test fails** (one thumb today)

- [ ] **Step 3: Implement**

Pull `value` and `defaultValue` out of props. `const current = value ?? defaultValue ?? [0]`. Map `current` to one `SliderPrimitive.Thumb` each, `key={index}`. Pass `value` and `defaultValue` back to the root only when they are not `undefined`:

```tsx
{...(value !== undefined ? { value } : {})}
{...(defaultValue !== undefined ? { defaultValue } : {})}
```

- [ ] **Step 4: Run** `src/__tests__/slider-range.test.tsx` and the Slider block in `src/__tests__/primitives.test.tsx`. Both pass.

- [ ] **Step 5: Mention the range in the slider docs props.** Rebuild the registry.

- [ ] **Step 6: Commit** `Render a slider thumb for each value.`

---

## Task 17: Textarea count

Keep the existing single-element markup when `showCount` is not set, so current tests keep finding the textarea.

- [ ] **Step 1: Failing test** in `packages/ui/src/__tests__/textarea-count.test.tsx`

```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Textarea } from "../components/textarea"

describe("Textarea count", () => {
  it("announces the count only when 20 or fewer characters remain", () => {
    const { rerender } = render(
      <Textarea showCount maxLength={100} value={"a".repeat(90)} onChange={() => {}} />,
    )
    expect(screen.getByText("90 / 100")).toHaveAttribute("aria-live", "polite")
    rerender(<Textarea showCount maxLength={100} value="hello" onChange={() => {}} />)
    expect(screen.getByText("5 / 100")).toHaveAttribute("aria-live", "off")
  })

  it("counts words when asked", () => {
    render(<Textarea showCount countBy="words" value="one two three" onChange={() => {}} />)
    expect(screen.getByText("3 words")).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run and confirm failure**

- [ ] **Step 3: Implement**

Extend `TextareaProps` with `showCount?: boolean` and `countBy?: "characters" | "words"`. Default `countBy` is `"characters"`. When `showCount` is false or omitted, return the existing textarea unchanged.

When `showCount` is true, wrap the textarea and a `<p>` in a `div`. Character mode with `maxLength` prints `` `${length} / ${maxLength}` `` and sets `aria-live` to `"polite"` when `maxLength - length <= 20`, otherwise `"off"`. Word mode prints `` `${count} words` `` where count is `value.trim().length === 0 ? 0 : value.trim().split(/\s+/).length`, and `aria-live` is `"off"`. Read the string from `props.value` when it is a string; otherwise from `props.defaultValue` when it is a string; otherwise `"0 / …"` or `"0 words"`. Point `aria-describedby` at the counter id via `useId`. The file needs `"use client"` once it calls `useId`. Add that directive. Re-run the existing textarea tests.

- [ ] **Step 4: Tests pass**, including `primitives.test.tsx` textarea block.

- [ ] **Step 5: Add the two props to the textarea docs page.** Rebuild the registry.

- [ ] **Step 6: Commit** `Announce the textarea count near its limit.`

---

## Task 18: Removable badge and BadgeGroup

Existing badge tests expect `container.firstChild` to carry `bg-primary`. Keep the root element as that styled node.

- [ ] **Step 1: Failing test** in `packages/ui/src/__tests__/badge-group.test.tsx`

```tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Badge, BadgeGroup } from "../components/badge"

describe("Badge remove", () => {
  it("removes a string badge by name", async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(<Badge onRemove={onRemove}>Beta</Badge>)
    await user.click(screen.getByRole("button", { name: "Remove Beta" }))
    expect(onRemove).toHaveBeenCalledOnce()
  })
})

describe("BadgeGroup", () => {
  it("collapses overflow into a labelled count", () => {
    render(
      <BadgeGroup max={2}>
        <Badge>One</Badge>
        <Badge>Two</Badge>
        <Badge>Three</Badge>
      </BadgeGroup>,
    )
    expect(screen.getByText("One")).toBeInTheDocument()
    expect(screen.queryByText("Three")).not.toBeInTheDocument()
    expect(screen.getByText("+1")).toHaveAttribute("aria-label", "1 more")
  })
})
```

- [ ] **Step 2: Run and confirm failure**

- [ ] **Step 3: Implement**

Add `onRemove?: () => void` to `BadgeProps`. When it is set and `children` is a string, render a `type="button"` `aria-label={`Remove ${children}`}` inside the badge. When `children` is not a string, `aria-label` is `"Remove badge"`. Import `X` from `lucide-react`.

Export `BadgeGroup({ children, max, className })`. `max` defaults to `Number.POSITIVE_INFINITY`. `React.Children.toArray`, show `slice(0, max)`, and if more remain render `<Badge variant="secondary" aria-label={`${hidden} more`}>+{hidden}</Badge>`.

- [ ] **Step 4: Run the new file and the Badge block in `primitives.test.tsx`.**

- [ ] **Step 5: Export `BadgeGroup` from the barrel.** Update the badge docs page. Rebuild the registry. No new registry item.

- [ ] **Step 6: Commit** `Let badges be removed and grouped with overflow.`

---

## Task 19: Checkbox indeterminate icon and CheckboxGroup

- [ ] **Step 1: Failing test** in `packages/ui/src/__tests__/checkbox-group.test.tsx`

```tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Checkbox } from "../components/checkbox"
import { CheckboxGroup } from "../components/checkbox-group"

describe("Checkbox indeterminate", () => {
  it("marks a mixed checkbox", () => {
    render(<Checkbox checked="indeterminate" aria-label="All rows" />)
    expect(screen.getByRole("checkbox", { name: "All rows" })).toHaveAttribute(
      "aria-checked",
      "mixed",
    )
  })
})

describe("CheckboxGroup", () => {
  it("selects every option from a mixed select-all", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <CheckboxGroup
        label="Fruits"
        selectAll
        options={[
          { value: "a", label: "Apple" },
          { value: "b", label: "Banana" },
        ]}
        value={["a"]}
        onValueChange={onValueChange}
      />,
    )
    expect(screen.getByRole("checkbox", { name: "Select all" })).toHaveAttribute(
      "aria-checked",
      "mixed",
    )
    await user.click(screen.getByRole("checkbox", { name: "Select all" }))
    expect(onValueChange).toHaveBeenCalledWith(["a", "b"])
  })

  it("clears every option when all are selected", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <CheckboxGroup
        label="Fruits"
        selectAll
        options={[
          { value: "a", label: "Apple" },
          { value: "b", label: "Banana" },
        ]}
        value={["a", "b"]}
        onValueChange={onValueChange}
      />,
    )
    await user.click(screen.getByRole("checkbox", { name: "Select all" }))
    expect(onValueChange).toHaveBeenCalledWith([])
  })
})
```

- [ ] **Step 2: Run and confirm the group file fails to resolve.** The indeterminate assertion may already pass because Radix sets `aria-checked="mixed"`. Keep it.

- [ ] **Step 3: Implement**

In `checkbox.tsx`, import `Minus` from `lucide-react`. Inside the indicator, render `<Minus data-icon="minus" />` when `checked === "indeterminate"`, otherwise `<Check />`.

Create `packages/ui/src/components/checkbox-group.tsx` with `"use client"`.

```tsx
export interface CheckboxGroupOption {
  value: string
  label: string
}

export interface CheckboxGroupProps {
  label: string
  options: readonly CheckboxGroupOption[]
  value: readonly string[]
  onValueChange: (value: string[]) => void
  selectAll?: boolean
}
```

`role="group"` `aria-label={label}`. Select-all checkbox name `"Select all"`. Its checked state is `true` when every option value is included, `false` when `value.length === 0`, and `"indeterminate"` otherwise. Clicking it calls `onValueChange(allValues)` unless already all selected, in which case it calls `onValueChange([])`. Each option is a checkbox with accessible name `option.label`. Clicking a checked option removes it; clicking an unchecked option appends it.

- [ ] **Step 4: Tests pass.** Run the Checkbox block in `primitives.test.tsx` as well.

- [ ] **Step 5: Wire** `checkbox-group` as its own registry item, registryDependencies `["checkbox"]`, tsup entry, package subpath, barrel export, sidebar `Checkbox Group` after Checkbox, overview category Forms. Mention the indeterminate icon on the existing checkbox docs page.

- [ ] **Step 6: Commit** `Add a checkbox group with select-all.`

---

## Task 20: Date phrases

A small parser, then an optional text field on the existing DatePicker. Unsupported phrases return null. Do not add a date library.

**Files:**

- Create: `packages/ui/src/components/date-phrase.ts`
- Create: `packages/ui/src/__tests__/date-phrase.test.tsx`
- Modify: `packages/ui/src/components/date-picker.tsx`
- Modify: the date picker docs page

- [ ] **Step 1: Failing test**

```tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { parseDatePhrase } from "../components/date-phrase"
import { DatePicker } from "../components/date-picker"

const now = new Date(2026, 10, 20, 9, 0, 0)

describe("parseDatePhrase", () => {
  it("parses the supported phrases", () => {
    expect(parseDatePhrase("2026-11-21", now)?.getDate()).toBe(21)
    expect(parseDatePhrase("today", now)?.getDate()).toBe(20)
    expect(parseDatePhrase("tomorrow", now)?.getDate()).toBe(21)
    expect(parseDatePhrase("in 3 days", now)?.getDate()).toBe(23)
    expect(parseDatePhrase("next fri", now)?.getDate()).toBe(27)
    expect(parseDatePhrase("3pm", now)?.getHours()).toBe(15)
    expect(parseDatePhrase("nope", now)).toBeNull()
  })
})

describe("DatePicker phrases", () => {
  it("emits a date when the phrase completes", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<DatePicker allowPhrase now={now} onValueChange={onValueChange} />)
    await user.type(screen.getByRole("textbox", { name: "Type a date" }), "tomorrow")
    const last = onValueChange.mock.calls.at(-1)?.[0] as Date
    expect(last.getFullYear()).toBe(2026)
    expect(last.getMonth()).toBe(10)
    expect(last.getDate()).toBe(21)
  })
})
```

- [ ] **Step 2: Run and confirm failure**

- [ ] **Step 3: Implement `parseDatePhrase(input: string, now: Date): Date | null`**

Trim and lowercase. Supported forms only:

- `YYYY-MM-DD` → `new Date(year, monthIndex, day)` at local midnight. Invalid calendar dates (month 13, 31 Feb) return null. Check by reading the constructed date back.
- `today` → local midnight of `now`
- `tomorrow` → plus one day
- `in N day` or `in N days` → plus N days
- `next sun|mon|tue|wed|thu|fri|sat` → the next such weekday, at least 7 days ahead when today is that weekday. Friday 20 Nov 2026 plus 7 is Friday 27 Nov 2026.
- `Hpm`, `Ham`, `H:MMam`, `H:MMpm` → that time on `now`'s local date. `12am` is 0, `12pm` is 12.

Anything else, including empty string, returns null. No `"use client"`.

- [ ] **Step 4: Implement the field**

Add optional `allowPhrase?: boolean` and `now?: Date` to `DatePickerProps`. When `allowPhrase` is not true, render exactly the component that exists today (no textbox). When it is true, render an input with `aria-label="Type a date"` above the existing button. Keep its text in state. On change, `const parsed = parseDatePhrase(text, now ?? new Date())`. Call `onValueChange` only when `parsed` is not null and `onValueChange` was passed. Re-export `parseDatePhrase` from `date-picker.tsx` and from `packages/ui/src/index.ts`.

- [ ] **Step 5: Tests pass.** Add a docs example `allowPhrase` on the date picker page. Rebuild the registry. If `date-picker` is missing from `registry/public/registry.json`, add an item for it (dependencies include `react-day-picker`, `lucide-react`, `@aetherstack/utils`; registryDependencies `["button", "calendar", "popover"]`) before building.

- [ ] **Step 6: Commit** `Parse a few date phrases in the date picker.`

---

## Task 21: Question Card

Pattern, not a primitive. It composes Input, Checkbox or RadioGroup, and Button.

**Files:**

- Create: `packages/patterns/src/components/question-card.tsx`
- Create: `packages/patterns/src/__tests__/question-card.test.tsx`
- Create: `apps/docs/src/app/(docs)/patterns/question-card/page.tsx`
- Modify: `packages/patterns/src/index.ts` (above the AI export)
- Modify: `packages/patterns/tsup.config.ts` entry
- Modify: `packages/patterns/README.md`
- Modify: registry, registry-source, sidebar Patterns group between Profile Dropdown and Search Input, patterns overview category `"Forms"`

- [ ] **Step 1: Failing test**

```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { QuestionCard } from "../components/question-card"

const single = {
  kind: "single" as const,
  prompt: "2 + 2",
  choices: [
    { id: "3", label: "3" },
    { id: "4", label: "4" },
  ],
  answer: "4",
  explanation: "Because arithmetic.",
}

describe("QuestionCard", () => {
  it("hides the verdict until the answer is checked", async () => {
    const user = userEvent.setup()
    render(<QuestionCard question={single} />)
    expect(screen.queryByRole("status")).not.toBeInTheDocument()
    await user.click(screen.getByRole("radio", { name: "4" }))
    await user.click(screen.getByRole("button", { name: "Check answer" }))
    const status = screen.getByRole("status")
    expect(status).toHaveTextContent("Correct")
    expect(status).toHaveTextContent("Because arithmetic.")
  })

  it("selects a choice with the number keys", async () => {
    const user = userEvent.setup()
    render(<QuestionCard question={single} />)
    screen.getByRole("group", { name: "2 + 2" }).focus()
    await user.keyboard("2{Enter}")
    expect(screen.getByRole("status")).toHaveTextContent("Correct")
  })

  it("marks a wrong choice incorrect", async () => {
    const user = userEvent.setup()
    render(<QuestionCard question={single} />)
    await user.click(screen.getByRole("radio", { name: "3" }))
    await user.click(screen.getByRole("button", { name: "Check answer" }))
    expect(screen.getByRole("status")).toHaveTextContent("Incorrect")
  })
})
```

- [ ] **Step 2: Run** `pnpm --filter @aetherstack/patterns exec vitest run src/__tests__/question-card.test.tsx` and confirm failure.

- [ ] **Step 3: Implement**

`"use client"`.

```tsx
export type Question =
  | {
      kind: "single"
      prompt: string
      choices: readonly { id: string; label: string }[]
      answer: string
      explanation: string
    }
  | {
      kind: "multiple"
      prompt: string
      choices: readonly { id: string; label: string }[]
      answer: readonly string[]
      explanation: string
    }
  | { kind: "boolean"; prompt: string; answer: boolean; explanation: string }
  | { kind: "text"; prompt: string; answer: string; explanation: string }

export interface QuestionCardProps {
  question: Question
}
```

Root `role="group"` `aria-label={question.prompt}` `tabIndex={0}`. Single: radios. Keys `1`–`9` select `choices[n - 1]` when that index exists, and `preventDefault`. Multiple: checkboxes, no number keys. Boolean: radios `Yes` (`true`) and `No` (`false`); keys `1` and `2` select them. Text: an input `aria-label="Answer"`. Enter on the group calls the same check as the button, and `preventDefault` so a parent form does not submit. Button text `Check answer`, `type="button"`.

Correctness: single id equality; multiple same members ignoring order and duplicates; boolean equality; text `input.trim() === answer`. After check, render `role="status"` containing `Correct` or `Incorrect` plus the explanation. Before check, do not render that status.

- [ ] **Step 4: Tests pass (3)**

- [ ] **Step 5: Wire** as a pattern. registryDependencies `["radio-group", "checkbox", "button", "input"]`. ai intent `Ask one question and reveal whether the answer was right.` prompts `["add a quiz question", "add a question card"]`. Pattern docs page can be a client page that renders `<QuestionCard question={...} />` inside `PatternPage`.

- [ ] **Step 6: Commit** `Add a question card pattern.`

---

## Task 22: Filter Chips

This is the menu-per-field bar. It does not filter a list. `FilterToolbar` / `FilterPill` stay as they are.

**Files:** `packages/patterns/src/components/filter-chips.tsx`, `packages/patterns/src/__tests__/filter-chips.test.tsx`, docs `apps/docs/src/app/(docs)/patterns/filter-chips/page.tsx`, sidebar `Filter Chips` in the Patterns group between File Dropzone and Filter Toolbar, overview category `"Toolbars"`.

- [ ] **Step 1: Failing test**

```tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { FilterChips } from "../components/filter-chips"

const fields = [
  {
    id: "status",
    label: "Status",
    options: [
      { value: "open", label: "Open" },
      { value: "closed", label: "Closed" },
    ],
  },
]

describe("FilterChips", () => {
  it("toggles an option without knowing about rows", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<FilterChips fields={fields} value={{}} onValueChange={onValueChange} />)
    await user.click(screen.getByRole("button", { name: "Status" }))
    await user.click(screen.getByRole("option", { name: "Open" }))
    expect(onValueChange).toHaveBeenCalledWith({ status: ["open"] })
  })

  it("summarises the selection and clears everything", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <FilterChips
        fields={fields}
        value={{ status: ["open", "closed"] }}
        onValueChange={onValueChange}
      />,
    )
    expect(screen.getByRole("button", { name: "Status: Open, Closed" })).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Clear all" }))
    expect(onValueChange).toHaveBeenCalledWith({})
  })
})
```

- [ ] **Step 2: Run and confirm failure**

- [ ] **Step 3: Implement**

`"use client"`.

```tsx
export interface FilterChipOption {
  value: string
  label: string
}

export interface FilterChipField {
  id: string
  label: string
  options: readonly FilterChipOption[]
}

export interface FilterChipsProps {
  fields: readonly FilterChipField[]
  value: Readonly<Record<string, readonly string[]>>
  onValueChange: (value: Record<string, string[]>) => void
}
```

One `type="button"` per field, `aria-expanded`, `aria-controls` an id. Its name is the field label when that field's array is missing or empty, otherwise `` `${label}: ${selected labels joined by ", "}` `` in option order. Clicking toggles a listbox (`role="listbox"` `aria-multiselectable="true"`) rendered inline, not in a portal. Options are `role="option"` `aria-selected`. Clicking an option adds or removes its value and calls `onValueChange` with a new object, copying the other fields. `Clear all` is rendered only when some field has a non-empty array, and it calls `onValueChange({})`.

- [ ] **Step 4: Tests pass (2)**

- [ ] **Step 5: Wire** as a pattern. registryDependencies `["button"]`. ai intent `Edit a set of filters and report the value. The caller filters the data.` prompts `["add filter chips", "add a filter bar"]`. tsup entry `"src/components/filter-chips.tsx"`.

- [ ] **Step 6: Commit** `Add controlled filter chips.`

---

## Task 23: Shine Border

Decorative. Still under reduced motion because the animation class is `motion-safe:`.

**Files:** `packages/ui/src/components/shine-border.tsx`, test, docs `shine-border`, sidebar after Sheet and before Sidebar, overview category Display. Also `packages/config-tailwind/index.ts`.

- [ ] **Step 1: Failing test**

```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ShineBorder } from "../components/shine-border"

describe("ShineBorder", () => {
  it("wraps its children and spins only in continuous mode", () => {
    const { rerender } = render(
      <ShineBorder>
        <p>Plan</p>
      </ShineBorder>,
    )
    expect(screen.getByText("Plan").parentElement).toHaveAttribute("data-mode", "continuous")
    expect(screen.getByText("Plan").parentElement).toHaveClass("motion-safe:animate-shine-spin")
    rerender(
      <ShineBorder mode="hover">
        <p>Plan</p>
      </ShineBorder>,
    )
    expect(screen.getByText("Plan").parentElement).toHaveAttribute("data-mode", "hover")
    expect(screen.getByText("Plan").parentElement).not.toHaveClass("motion-safe:animate-shine-spin")
  })
})
```

- [ ] **Step 2: Run and confirm failure**

- [ ] **Step 3: Implement**

Add to `packages/config-tailwind/index.ts` beside `button-sweep`:

```ts
"shine-spin": {
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
},
```

and animation `"shine-spin": "shine-spin 4s linear infinite"`.

Component:

```tsx
export interface ShineBorderProps {
  mode?: "continuous" | "hover" | "once"
  children: React.ReactNode
  className?: string
}
```

`mode` defaults to `"continuous"`. Root `data-mode={mode}` `relative overflow-hidden rounded-lg p-px`. Continuous mode adds `motion-safe:animate-shine-spin`. Hover and once do not. Render `children` inside.

- [ ] **Step 4: Test passes**

- [ ] **Step 5: Wire** slug `shine-border`. ai intent `Draw attention to one element with a moving border sheen.` prompts `["add a shine border", "highlight a featured card"]`.

- [ ] **Step 6: Commit** `Add a shine border.`

---

## Task 24: Parallax Card

The default test `matchMedia` in `packages/ui/src/__tests__/setup.ts` returns `matches: false`. A reduced-motion test must replace `window.matchMedia` and restore it.

- [ ] **Step 1: Failing test** in `packages/ui/src/__tests__/parallax-card.test.tsx`

```tsx
import { describe, it, expect, afterEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { ParallaxCard } from "../components/parallax-card"

const original = window.matchMedia

afterEach(() => {
  window.matchMedia = original
})

describe("ParallaxCard", () => {
  it("tilts while the pointer moves", () => {
    render(
      <ParallaxCard>
        <p>Card</p>
      </ParallaxCard>,
    )
    const card = screen.getByText("Card").parentElement as HTMLElement
    fireEvent.pointerMove(card, { clientX: 10, clientY: 10 })
    expect(card.style.transform).toContain("rotateX")
  })

  it("stays still when the user prefers reduced motion", () => {
    window.matchMedia = ((query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia
    render(
      <ParallaxCard>
        <p>Card</p>
      </ParallaxCard>,
    )
    const card = screen.getByText("Card").parentElement as HTMLElement
    fireEvent.pointerMove(card, { clientX: 10, clientY: 10 })
    expect(card.style.transform).toBe("")
  })
})
```

- [ ] **Step 2: Run and confirm failure**

- [ ] **Step 3: Implement**

`"use client"`. On pointer move, if `matchMedia("(pointer: coarse)").matches` or `matchMedia("(prefers-reduced-motion: reduce)").matches`, set `transform` to `""` and return. Otherwise set `transform` to `rotateX(2deg) rotateY(-2deg) scale(1.02)`. On pointer leave, clear `transform`. The tilting element is the parent of `children`.

- [ ] **Step 4: Tests pass (2)**

- [ ] **Step 5: Wire** slug `parallax-card`, sidebar between Pagination and Password Field, overview Display. ai intent `Tilt a card slightly toward the pointer.` prompts `["add a parallax card", "tilt a card toward the pointer"]`.

- [ ] **Step 6: Commit** `Add a parallax card that stays still for reduced motion.`

---

## Task 25: Fan Stack

- [ ] **Step 1: Failing test** in `packages/ui/src/__tests__/fan-stack.test.tsx`

```tsx
import { describe, it, expect, afterEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { FanStack } from "../components/fan-stack"

const original = window.matchMedia
afterEach(() => {
  window.matchMedia = original
})

describe("FanStack", () => {
  it("starts stacked and fans open on hover", () => {
    render(
      <FanStack>
        <p>One</p>
        <p>Two</p>
      </FanStack>,
    )
    const stack = screen.getByText("One").parentElement?.parentElement as HTMLElement
    expect(stack).toHaveAttribute("data-open", "false")
    fireEvent.mouseEnter(stack)
    expect(stack).toHaveAttribute("data-open", "true")
  })

  it("does not rotate cards under reduced motion", () => {
    window.matchMedia = ((query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia
    render(
      <FanStack>
        <p>One</p>
        <p>Two</p>
      </FanStack>,
    )
    const stack = screen.getByText("One").parentElement?.parentElement as HTMLElement
    fireEvent.mouseEnter(stack)
    expect(stack).toHaveAttribute("data-open", "true")
    expect(screen.getByText("One").parentElement).toHaveStyle({ transform: "none" })
  })
})
```

- [ ] **Step 2: Run and confirm failure**

- [ ] **Step 3: Implement**

`"use client"`. Props: `children`, `spread?: number` (default `8`). Root `data-open="false"` initially. `onMouseEnter` / `onFocus` set open true. `onMouseLeave` / `onBlur` set open false. `tabIndex={0}` so it can receive focus. Each child is wrapped in a `div`. When open and reduced motion does not match, that wrapper's transform is `rotate(${(index - (count - 1) / 2) * spread}deg)`. Otherwise `transform: "none"`.

- [ ] **Step 4: Tests pass (2)**

- [ ] **Step 5: Wire** slug `fan-stack`, sidebar between Dropdown Menu and Floating Dock, overview Display. ai intent `Fan a stack of cards open on hover or keyboard focus.` prompts `["add a fan stack", "fan out a stack of cards"]`.

- [ ] **Step 6: Commit** `Add a fan stack that opens on hover and focus.`

---

## Task 26: Verify and record the changeset

- [ ] **Step 1: Counts**

In `packages/ui/README.md`, set the "Components (N)" heading and the docs sentence "all N components" to the number of public primitives you can count from the component list you just edited, plus the 14 AI primitives where the README already separates them. Do the same for `packages/patterns/README.md`. In `apps/docs/src/app/(docs)/components/page.tsx`, set the metadata description's component count to the number of entries in the `components` array (excluding nothing; count every `items` entry). Do not invent a number.

- [ ] **Step 2: Full checks**

```bash
pnpm --filter @aetherstack/ui typecheck
pnpm --filter @aetherstack/ui test
pnpm --filter @aetherstack/patterns typecheck
pnpm --filter @aetherstack/patterns test
pnpm --filter @aetherstack/scripts build-registry
cd apps/docs && npx tsc --noEmit
cd apps/docs && pnpm build
```

Expected: typechecks clean, every test file passes, registry build writes the new `r/<slug>.json` files, docs typecheck clean, docs production build completes. `pnpm --filter docs lint` may still report the 7 pre-existing warnings in files this plan does not touch. New warnings in files this plan touches are failures; fix them.

- [ ] **Step 3: Changeset**

Create `.changeset/knowns-component-gap.md`:

```md
---
"@aetherstack/ui": minor
"@aetherstack/patterns": minor
"@aetherstack/tailwind-config": minor
---

Add the Knowns catalog pieces Aether did not already ship: status dot, tags, priority bars, segmented control, social button, password field and strength, progress ring, animated number, uptime bar, heatmap, timeline scrubber, time slots, floating dock, shine border, parallax card, fan stack, question card, and filter chips. Slider ranges, textarea counts, removable badges, checkbox select-all, avatar status, and a few date phrases land on the components that already existed.
```

Drop the `@aetherstack/tailwind-config` line if Task 23 did not change that package.

- [ ] **Step 4: Commit** only if the user asked: `Record the Knowns component gap work.`

---

## Plan review

- Every Knowns page is in "Already covered", "Partial", "Missing", or "Out of scope".
- Partial rows point at tasks 2, 9, 16, 17, 18, 19, 20.
- Missing rows point at tasks 1, 3–8, 10–15, 21–25.
- Number Ticker is Task 10, not a second component.
- Custom Cursor, Emoji Lens, Pro drag-dock, Pro chart, and the decorative text animations have no tasks.
- Tasks that share a file are ordered: StatusDot before Avatar, Progress ring before the final registry rebuild, date phrase before the DatePicker field.
