#!/usr/bin/env tsx
/**
 * Draft and merge public registry items for source modules that are exported
 * but not yet installable. Dry-run by default; pass --write to update
 * registry/public/registry.json.
 *
 *   pnpm --filter @aetherstack/scripts register-missing -- --layer ui --exclude-ai
 *   pnpm --filter @aetherstack/scripts register-missing -- --layer ui --exclude-ai --write
 */
import { existsSync, readFileSync, writeFileSync, readdirSync, statSync } from "node:fs"
import { basename, dirname, join, relative, resolve } from "node:path"

const ROOT = resolve(__dirname, "../../../")

type Layer = "ui" | "patterns" | "blocks"

const LAYER_META: Record<
  Layer,
  { src: string; type: "registry:ui" | "registry:pattern" | "registry:block"; targetPrefix: string }
> = {
  ui: {
    src: "packages/ui/src/components",
    type: "registry:ui",
    targetPrefix: "components/ui/",
  },
  patterns: {
    src: "packages/patterns/src/components",
    type: "registry:pattern",
    targetPrefix: "components/patterns/",
  },
  blocks: {
    src: "packages/blocks/src/components",
    type: "registry:block",
    targetPrefix: "components/blocks/",
  },
}

/** Curated copy for the first UI completeness batch. Extend as more layers are registered. */
const UI_META: Record<
  string,
  { title: string; description: string; intent: string; prompts: string[] }
> = {
  alert: {
    title: "Alert",
    description: "Contextual feedback banner with severity variants.",
    intent: "Show inline status, warning, success, or error feedback",
    prompts: [
      "add an alert",
      "show a warning banner",
      "add a success message",
      "add an error alert",
    ],
  },
  "alert-dialog": {
    title: "Alert Dialog",
    description: "Blocking confirmation dialog for destructive actions.",
    intent: "Confirm a destructive or irreversible action before it runs",
    prompts: ["add a confirm dialog", "add a delete confirmation", "add an alert dialog"],
  },
  "aspect-ratio": {
    title: "Aspect Ratio",
    description: "Constrains content to a fixed width/height ratio.",
    intent: "Keep media or embeds at a consistent aspect ratio",
    prompts: ["add an aspect ratio box", "constrain an image to 16:9"],
  },
  "button-group": {
    title: "Button Group",
    description: "Segmented row of buttons with shared border treatment.",
    intent: "Group related actions in a connected button row",
    prompts: ["add a button group", "add segmented action buttons"],
  },
  carousel: {
    title: "Carousel",
    description: "Touch-friendly slider with previous and next controls.",
    intent: "Browse a horizontal set of slides or cards",
    prompts: ["add a carousel", "add an image slider", "add a product carousel"],
  },
  chart: {
    title: "Chart",
    description: "Recharts wrappers with token-based colors for bar, line, area, and pie charts.",
    intent: "Render a token-styled chart for dashboard metrics",
    prompts: ["add a chart", "add a bar chart", "add a line chart", "add a pie chart"],
  },
  collapsible: {
    title: "Collapsible",
    description: "Show and hide a content region with a trigger.",
    intent: "Expand or collapse a section of content",
    prompts: ["add a collapsible section", "add an expandable panel"],
  },
  "date-picker": {
    title: "Date Picker",
    description: "Date selection field composed from Calendar and Popover.",
    intent: "Let the user pick a single date from a calendar popover",
    prompts: ["add a date picker", "add a calendar input", "pick a date"],
  },
  drawer: {
    title: "Drawer",
    description: "Bottom-sheet drawer with drag-to-dismiss.",
    intent: "Present a mobile-friendly sheet that slides up from the bottom",
    prompts: ["add a drawer", "add a bottom sheet", "add a mobile drawer"],
  },
  "input-group": {
    title: "Input Group",
    description: "Input with left and right addon slots for icons and labels.",
    intent: "Compose an input with leading or trailing addons",
    prompts: ["add an input with an icon", "add an input group", "add a prefixed input"],
  },
  "input-otp": {
    title: "Input OTP",
    description: "One-time password input with individual digit slots.",
    intent: "Collect a one-time passcode one character at a time",
    prompts: ["add an OTP input", "add a verification code field", "add a PIN input"],
  },
  kbd: {
    title: "Kbd",
    description: "Keyboard key badge for shortcuts and hotkeys.",
    intent: "Display a keyboard shortcut as a key badge",
    prompts: ["add a keyboard shortcut badge", "show a hotkey", "add a kbd element"],
  },
  menubar: {
    title: "Menubar",
    description: "Horizontal application menu bar with nested menus.",
    intent: "Provide a desktop-style top menubar for application commands",
    prompts: ["add a menubar", "add an application menu", "add a File Edit menu"],
  },
  "navigation-menu": {
    title: "Navigation Menu",
    description: "Accessible site navigation with optional dropdown panels.",
    intent: "Build the primary site or product navigation",
    prompts: ["add a navigation menu", "add a navbar dropdown", "add site navigation"],
  },
  popover: {
    title: "Popover",
    description: "Floating overlay anchored to a trigger for detail panels.",
    intent: "Show anchored contextual content without blocking the page",
    prompts: ["add a popover", "add a floating panel", "add an anchored detail card"],
  },
  resizable: {
    title: "Resizable",
    description: "Draggable split-pane panels for adjustable layouts.",
    intent: "Let the user resize adjacent panels by dragging a handle",
    prompts: ["add resizable panels", "add a split pane", "add a draggable sidebar"],
  },
  sidebar: {
    title: "Sidebar",
    description: "Application sidebar with collapse, inset, and mobile sheet modes.",
    intent: "Provide the primary app navigation sidebar shell",
    prompts: ["add a sidebar", "add an app shell sidebar", "add a collapsible nav"],
  },
  sonner: {
    title: "Sonner",
    description: "Opinionated toast queue with promise support.",
    intent: "Show stacked toast notifications including promise states",
    prompts: ["add sonner toasts", "add a toast queue", "add promise toasts"],
  },
  spinner: {
    title: "Spinner",
    description: "Animated loading indicator with four sizes.",
    intent: "Indicate that a short action or region is loading",
    prompts: ["add a spinner", "add a loading indicator", "show a loading spinner"],
  },
  "visually-hidden": {
    title: "Visually Hidden",
    description: "Hides content visually while keeping it available to assistive technology.",
    intent: "Expose text to screen readers without showing it on screen",
    prompts: ["add visually hidden text", "add a screen reader only label"],
  },
  "attachment-chip": {
    title: "Attachment Chip",
    description: "Compact chip for a file or attachment in an AI prompt or message.",
    intent: "Show an attached file the user can remove or open",
    prompts: ["add an attachment chip", "show a file attachment", "add a prompt attachment"],
  },
  "chat-bubble": {
    title: "Chat Bubble",
    description: "Message bubble for user and assistant turns in a chat thread.",
    intent: "Render one chat message from the user or the assistant",
    prompts: ["add a chat bubble", "add a message bubble", "show an assistant message"],
  },
  "code-block": {
    title: "Code Block",
    description: "Syntax-ready code panel with copy support for AI responses.",
    intent: "Display a copyable code sample inside an AI answer",
    prompts: ["add a code block", "show AI generated code", "add a copyable code panel"],
  },
  "feedback-buttons": {
    title: "Feedback Buttons",
    description: "Thumbs-up and thumbs-down controls for rating an AI response.",
    intent: "Collect positive or negative feedback on a generated answer",
    prompts: ["add feedback buttons", "add thumbs up thumbs down", "rate an AI response"],
  },
  "markdown-renderer": {
    title: "Markdown Renderer",
    description: "Renders Markdown with token-styled code blocks for AI output.",
    intent: "Render assistant Markdown including fenced code",
    prompts: ["render markdown", "add a markdown renderer", "show AI markdown"],
  },
  "model-badge": {
    title: "Model Badge",
    description: "Small badge naming the model that produced a response.",
    intent: "Label which model generated the current answer",
    prompts: ["add a model badge", "show the model name", "label the LLM"],
  },
  "prompt-input": {
    title: "Prompt Input",
    description: "Composer for sending prompts with submit and stop controls.",
    intent: "Let the user type and send a prompt, or stop a generation",
    prompts: ["add a prompt input", "add a chat composer", "add send and stop buttons"],
  },
  "prompt-suggestion": {
    title: "Prompt Suggestion",
    description: "Clickable suggested prompt chip to seed a conversation.",
    intent: "Offer a one-click starter prompt",
    prompts: ["add prompt suggestions", "add starter prompts", "add suggestion chips"],
  },
  "reasoning-block": {
    title: "Reasoning Block",
    description: "Collapsible block for model reasoning or chain-of-thought text.",
    intent: "Show optional model reasoning the user can expand",
    prompts: ["add a reasoning block", "show chain of thought", "add collapsible thinking"],
  },
  "source-card": {
    title: "Source Card",
    description: "Citation card linking to a source used in an AI answer.",
    intent: "Cite a source URL or document next to generated text",
    prompts: ["add a source card", "show citations", "add a reference card"],
  },
  "streaming-text": {
    title: "Streaming Text",
    description: "Renders growing text from a string or async iterable stream.",
    intent: "Display token streaming assistant text as it arrives",
    prompts: ["add streaming text", "stream an AI answer", "type out the response"],
  },
  "thinking-indicator": {
    title: "Thinking Indicator",
    description: "Lightweight indicator that the model is still generating.",
    intent: "Show that the assistant is thinking or generating",
    prompts: ["add a thinking indicator", "show AI is thinking", "add a generating state"],
  },
  "token-counter": {
    title: "Token Counter",
    description: "Token usage readout with an optional progress meter.",
    intent: "Show how many tokens a prompt or response is using",
    prompts: ["add a token counter", "show token usage", "add a context meter"],
  },
  "tool-call-card": {
    title: "Tool Call Card",
    description: "Card for a tool invocation with status and expandable details.",
    intent: "Surface a tool call the model made and its result state",
    prompts: ["add a tool call card", "show tool use", "display a function call"],
  },
}

interface ManifestItem {
  name: string
  type: string
  title: string
  description: string
  author: string
  dependencies?: string[]
  registryDependencies?: string[]
  files: { path: string; type: string; target: string }[]
  ai: {
    intent: string
    prompts: string[]
    composition: string[]
    slots: string[]
  }
}

interface Manifest {
  $schema?: string
  name: string
  homepage?: string
  version?: string
  items: ManifestItem[]
}

function parseArgs(argv: string[]) {
  const layer = (argv.find((a) => a.startsWith("--layer="))?.slice(8) ??
    (argv.includes("--layer") ? argv[argv.indexOf("--layer") + 1] : "ui")) as Layer
  return {
    layer,
    excludeAi: argv.includes("--exclude-ai"),
    write: argv.includes("--write"),
    only: argv
      .find((a) => a.startsWith("--only="))
      ?.slice(7)
      ?.split(",")
      .filter(Boolean),
  }
}

function listModules(srcRoot: string): string[] {
  const out: string[] = []
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir).sort()) {
      const abs = join(dir, entry)
      if (statSync(abs).isDirectory()) walk(abs)
      else if (entry.endsWith(".tsx")) out.push(relative(ROOT, abs))
    }
  }
  walk(resolve(ROOT, srcRoot))
  return out
}

function moduleSlug(modulePath: string): string {
  return basename(modulePath, ".tsx")
}

function titleCase(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function collectImports(source: string): { spec: string; names: string[] }[] {
  const out: { spec: string; names: string[] }[] = []
  const re =
    /import\s+(?:type\s+)?(?:\{([^}]*)\}|[\w*]+(?:\s*,\s*\{([^}]*)\})?)\s+from\s+["']([^"']+)["']/g
  let match: RegExpExecArray | null
  while ((match = re.exec(source))) {
    const namesRaw = `${match[1] ?? ""},${match[2] ?? ""}`
    const names = namesRaw
      .split(",")
      .map((part) =>
        part
          .trim()
          .split(/\s+as\s+/i)[0]
          ?.trim(),
      )
      .filter((name): name is string => Boolean(name) && name !== "type")
    if (match[3]) out.push({ spec: match[3], names })
  }
  // Fallback for side-effect or atypical imports.
  const simple = /from\s+["']([^"']+)["']/g
  while ((match = simple.exec(source))) {
    if (match[1] && !out.some((entry) => entry.spec === match![1])) {
      out.push({ spec: match[1], names: [] })
    }
  }
  return out
}

function toKebabName(exportName: string): string {
  return exportName
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase()
}

function resolveLocalRegistryName(fromFile: string, spec: string, layer: Layer): string | null {
  if (!spec.startsWith(".")) return null
  const abs = resolve(dirname(resolve(ROOT, fromFile)), spec)
  const candidates = [`${abs}.tsx`, join(abs, "index.tsx")]
  for (const candidate of candidates) {
    if (!existsSync(candidate)) continue
    const rel = relative(ROOT, candidate)
    if (!rel.startsWith(LAYER_META[layer].src)) return null
    return moduleSlug(rel)
  }
  return null
}

function draftItem(modulePath: string, layer: Layer, registeredNames: Set<string>): ManifestItem {
  const slug = moduleSlug(modulePath)
  const meta = layer === "ui" ? UI_META[slug] : undefined
  const source = readFileSync(resolve(ROOT, modulePath), "utf-8")
  const imports = collectImports(source)
  const dependencies = new Set<string>()
  const registryDependencies = new Set<string>()

  for (const { spec, names } of imports) {
    if (spec === "react" || spec === "react-dom" || spec.startsWith("react/")) continue
    if (spec.startsWith(".")) {
      const local = resolveLocalRegistryName(modulePath, spec, layer)
      if (local && local !== slug) registryDependencies.add(local)
      continue
    }
    if (spec.startsWith("@/")) continue
    if (spec === "@aetherstack/ui" || spec.startsWith("@aetherstack/ui/")) {
      dependencies.add("@aetherstack/ui")
      if (spec.startsWith("@aetherstack/ui/")) {
        registryDependencies.add(spec.slice("@aetherstack/ui/".length))
      } else {
        for (const name of names) {
          // Skip obvious non-component exports.
          if (["cn"].includes(name)) continue
          registryDependencies.add(toKebabName(name))
        }
      }
      continue
    }
    if (spec === "@aetherstack/patterns" || spec.startsWith("@aetherstack/patterns/")) {
      dependencies.add("@aetherstack/patterns")
      if (spec.startsWith("@aetherstack/patterns/")) {
        registryDependencies.add(spec.slice("@aetherstack/patterns/".length))
      } else {
        for (const name of names) registryDependencies.add(toKebabName(name))
      }
      continue
    }
    const pkg = spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0]
    if (pkg) dependencies.add(pkg)
  }

  // Only keep registry deps that already exist or are being added in this pass.
  const filteredRegistryDeps = [...registryDependencies].filter((name) => registeredNames.has(name))

  const { type, targetPrefix } = LAYER_META[layer]
  const target = `${targetPrefix}${modulePath.includes("/ai/") ? `ai/${slug}` : slug}.tsx`

  return {
    name: slug,
    type,
    title: meta?.title ?? titleCase(slug),
    description: meta?.description ?? `${meta?.title ?? titleCase(slug)} component.`,
    author: "aetherstack",
    ...(dependencies.size > 0 ? { dependencies: [...dependencies].sort() } : {}),
    ...(filteredRegistryDeps.length > 0
      ? { registryDependencies: filteredRegistryDeps.sort() }
      : {}),
    files: [
      {
        path: modulePath,
        type,
        target,
      },
    ],
    ai: {
      intent: meta?.intent ?? `Use the ${meta?.title ?? titleCase(slug)} component.`,
      prompts: meta?.prompts ?? [`add a ${slug.replace(/-/g, " ")}`],
      composition: [],
      slots: [],
    },
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2))
  if (!LAYER_META[args.layer]) {
    console.error(`Unknown layer: ${args.layer}`)
    process.exit(1)
  }

  const manifestPath = resolve(ROOT, "registry/public/registry.json")
  const manifest = JSON.parse(readFileSync(manifestPath, "utf-8")) as Manifest
  const registeredPaths = new Set(
    manifest.items.flatMap((item) => item.files.map((file) => file.path)),
  )
  const registeredNames = new Set(manifest.items.map((item) => item.name))

  const modules = listModules(LAYER_META[args.layer].src).filter((modulePath) => {
    if (registeredPaths.has(modulePath)) return false
    if (args.excludeAi && modulePath.includes("/ai/")) return false
    if (args.only && !args.only.includes(moduleSlug(modulePath))) return false
    return true
  })

  if (modules.length === 0) {
    console.log("No missing modules matched.")
    return
  }

  // Names that will exist after this write, so intra-batch registryDependencies resolve.
  for (const modulePath of modules) registeredNames.add(moduleSlug(modulePath))

  const drafted = modules.map((modulePath) => draftItem(modulePath, args.layer, registeredNames))
  console.log(`Drafted ${drafted.length} ${args.layer} items:`)
  for (const item of drafted) {
    console.log(
      `  - ${item.name} deps=${(item.dependencies ?? []).join(",") || "—"} registryDeps=${(item.registryDependencies ?? []).join(",") || "—"}`,
    )
  }

  if (!args.write) {
    console.log("\nDry-run only. Re-run with --write to update registry/public/registry.json.")
    return
  }

  const byName = new Map(manifest.items.map((item) => [item.name, item]))
  for (const item of drafted) byName.set(item.name, item)
  manifest.items = [...byName.values()].sort((a, b) => a.name.localeCompare(b.name))
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(`\nWrote ${manifest.items.length} items to registry/public/registry.json`)
}

main()
