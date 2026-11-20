"use client"

import * as React from "react"
import { Button } from "@aetherstack/ui"
import {
  ArrowRight,
  Bell,
  ChevronDown,
  Download,
  Minus,
  Play,
  Plus,
  RefreshCw,
  Search,
  Send,
  Settings,
  Trash2,
} from "lucide-react"
import { ComponentPage } from "@/components/component-page"
import { BUTTON_SOURCE } from "@/lib/registry-source"

const STATES = [
  { state: "Hover", change: "Fill and text shift; ghost and quiet buttons brighten their text", timing: "150ms, ease-out" },
  { state: "Pressed", change: "Filled and chip buttons scale to 97%; link and quiet stay put", timing: "150ms, ease-out" },
  { state: "Keyboard focus", change: "A 2px ring in the --ring token appears around the button", timing: "Instant" },
  { state: "Loading", change: "A spinner replaces the leading icon and a soft band sweeps the label", timing: "1.6s loop" },
  { state: "Disabled", change: "Dims to 50%, keeps its resting colour, shows a not-allowed cursor", timing: "Instant" },
  { state: "Touch", change: "Grows one step taller on coarse pointers for a fair thumb target", timing: "—" },
  { state: "Reduced motion", change: "Press scale, spinner rotation and label sweep are off", timing: "0ms" },
] as const

function useFakeRun(duration = 2000) {
  const [running, setRunning] = React.useState(false)
  const timeout = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => () => {
    if (timeout.current) clearTimeout(timeout.current)
  }, [])

  function run() {
    setRunning(true)
    timeout.current = setTimeout(() => setRunning(false), duration)
  }

  return { running, run }
}

function LoadingDemo() {
  const agent = useFakeRun()
  const save = useFakeRun()
  const retry = useFakeRun()

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button icon={<Play />} loading={agent.running} onClick={agent.run}>
        {agent.running ? "Running…" : "Run agent"}
      </Button>
      <Button variant="outline" loading={save.running} onClick={save.run}>
        Save changes
      </Button>
      <Button
        variant="secondary"
        icon={<RefreshCw />}
        loading={retry.running}
        onClick={retry.run}
      >
        Retry run
      </Button>
    </div>
  )
}

function ZoomControls() {
  const [zoom, setZoom] = React.useState(100)
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-border p-1">
      <Button
        size="xs"
        variant="ghost"
        icon={<Minus />}
        aria-label="Zoom out"
        disabled={zoom <= 50}
        onClick={() => setZoom((z) => z - 10)}
      />
      <span className="w-12 text-center text-xs tabular-nums text-muted-foreground">{zoom}%</span>
      <Button
        size="xs"
        variant="ghost"
        icon={<Plus />}
        aria-label="Zoom in"
        disabled={zoom >= 200}
        onClick={() => setZoom((z) => z + 10)}
      />
    </div>
  )
}

function QuietDemo() {
  const [expanded, setExpanded] = React.useState(false)
  return (
    <div className="max-w-sm text-sm text-muted-foreground">
      <p>
        The agent reviewed 42 files and proposed 3 changes.
        {expanded && " Two touch the billing module; one updates a test fixture."}
      </p>
      <Button
        variant="quiet"
        size="sm"
        className="mt-1"
        iconRight={<ChevronDown className={expanded ? "rotate-180" : undefined} />}
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        {expanded ? "Show less" : "Show more"}
      </Button>
    </div>
  )
}

function StatesTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
            <th className="py-2 pr-4 font-medium">State</th>
            <th className="py-2 pr-4 font-medium">What changes</th>
            <th className="py-2 font-medium">Timing</th>
          </tr>
        </thead>
        <tbody>
          {STATES.map((row) => (
            <tr key={row.state} className="border-b border-border last:border-0">
              <td className="py-2 pr-4 font-medium text-foreground">{row.state}</td>
              <td className="py-2 pr-4 text-muted-foreground">{row.change}</td>
              <td className="whitespace-nowrap py-2 font-mono text-xs text-muted-foreground">
                {row.timing}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ButtonPage() {
  return (
    <ComponentPage
      name="Button"
      description="Calm at rest, clear about state, comfortable to press. Seven variants, four sizes, icon slots, and a loading state that keeps keyboard focus."
      features={[
        "7 variants: default, secondary, outline, ghost, destructive, link, quiet",
        "4 sizes (xs, sm, default, lg) plus matching square icon sizes",
        "icon / iconRight slots — an icon with no label becomes a square icon button automatically",
        "loading keeps the button focusable (aria-disabled + aria-busy), ignores clicks, and never submits a form",
        "Filled buttons press in to 97%; disabled buttons keep their colour and show a not-allowed cursor",
        "Grows one size step on touch screens (pointer: coarse) for a fair thumb target",
        "Every animation is off under prefers-reduced-motion",
        "asChild renders links and router anchors with the same icons, spinner, and states",
      ]}
      preview={
        <div className="flex flex-wrap items-center gap-3">
          <Button icon={<Play />}>Run agent</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline" iconRight={<ArrowRight />}>
            Continue
          </Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive" icon={<Trash2 />}>
            Delete
          </Button>
          <Button loading>Saving</Button>
        </div>
      }
      previewCode={`import { Play, ArrowRight, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button icon={<Play />}>Run agent</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline" iconRight={<ArrowRight />}>Continue</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive" icon={<Trash2 />}>Delete</Button>
      <Button loading>Saving</Button>
    </div>
  )
}`}
      cliInstall={`npx aether-ui add button`}
      manualInstallCode={BUTTON_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-slot class-variance-authority lucide-react`,
          filename: "terminal",
        },
        {
          title: "Add the loading sweep keyframe (skip if you use @aetherstack/tailwind-config)",
          code: `// tailwind.config.ts → theme.extend
keyframes: {
  "button-sweep": {
    from: { transform: "translateX(-100%)" },
    to: { transform: "translateX(200%)" },
  },
},
animation: {
  "button-sweep": "button-sweep 1.6s ease-in-out infinite",
},`,
          filename: "tailwind.config.ts",
        },
      ]}
      examples={[
        {
          title: "States",
          description:
            "Hover, press, tab to, and click the buttons above to feel each state. Nothing animates on first render.",
          preview: <StatesTable />,
          code: `// States are built in — no props needed beyond these:
<Button>Hover, press, or focus me</Button>
<Button loading>Saving</Button>
<Button disabled>Unavailable</Button>`,
        },
        {
          title: "Loading",
          description:
            "The spinner takes the leading icon's place and a band sweeps the label. The button stays focusable and ignores clicks, so focus is not lost when an async action starts.",
          preview: <LoadingDemo />,
          code: `const [running, setRunning] = React.useState(false)

<Button
  icon={<Play />}
  loading={running}
  onClick={async () => {
    setRunning(true)
    await runAgent()
    setRunning(false)
  }}
>
  {running ? "Running…" : "Run agent"}
</Button>`,
        },
        {
          title: "Variants",
          description: "Solid, tonal, hairline, text-only, destructive, link, and quiet.",
          preview: (
            <div className="flex flex-wrap items-center gap-3">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
              <Button variant="quiet">Quiet</Button>
            </div>
          ),
          code: `<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>
<Button variant="quiet">Quiet</Button>`,
        },
        {
          title: "Sizes",
          description:
            "32, 36, 40 and 44px tall — each one step taller on touch screens. xs is for dense clusters.",
          preview: (
            <div className="flex flex-wrap items-center gap-3">
              <Button size="xs">Extra small</Button>
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
            </div>
          ),
          code: `<Button size="xs">Extra small</Button>
<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>`,
        },
        {
          title: "With icons",
          description: "Pass icons through icon and iconRight — they are sized to the button automatically.",
          preview: (
            <div className="flex flex-wrap items-center gap-3">
              <Button icon={<Plus />}>New item</Button>
              <Button variant="outline" icon={<Download />}>
                Export
              </Button>
              <Button variant="secondary" iconRight={<Send />}>
                Send prompt
              </Button>
              <Button variant="ghost" iconRight={<ChevronDown />}>
                GPT-4o
              </Button>
            </div>
          ),
          code: `import { Plus, Download, Send, ChevronDown } from "lucide-react"

<Button icon={<Plus />}>New item</Button>
<Button variant="outline" icon={<Download />}>Export</Button>
<Button variant="secondary" iconRight={<Send />}>Send prompt</Button>
<Button variant="ghost" iconRight={<ChevronDown />}>GPT-4o</Button>`,
        },
        {
          title: "Icon-only",
          description:
            "An icon with no children makes the button square at its size. Always add an aria-label, and pair with a Tooltip.",
          preview: (
            <div className="flex flex-wrap items-center gap-3">
              <Button icon={<Search />} aria-label="Search" />
              <Button variant="outline" icon={<Settings />} aria-label="Settings" />
              <Button variant="ghost" icon={<Bell />} aria-label="Notifications" />
              <Button variant="secondary" size="sm" icon={<RefreshCw />} aria-label="Refresh" />
              <ZoomControls />
            </div>
          ),
          code: `<Button icon={<Search />} aria-label="Search" />
<Button variant="outline" icon={<Settings />} aria-label="Settings" />
<Button variant="ghost" icon={<Bell />} aria-label="Notifications" />

// Dense cluster
<Button size="xs" variant="ghost" icon={<Minus />} aria-label="Zoom out" />`,
        },
        {
          title: "Quiet inline actions",
          description: "For “Show more” and similar text actions: no chip, no press, only the text size.",
          preview: <QuietDemo />,
          code: `<Button
  variant="quiet"
  size="sm"
  iconRight={<ChevronDown />}
  aria-expanded={expanded}
  onClick={() => setExpanded((v) => !v)}
>
  {expanded ? "Show less" : "Show more"}
</Button>`,
        },
        {
          title: "Disabled",
          description: "Dims to half strength and keeps its resting colour on hover.",
          preview: (
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled>Default</Button>
              <Button variant="secondary" disabled>
                Secondary
              </Button>
              <Button variant="outline" disabled>
                Outline
              </Button>
            </div>
          ),
          code: `<Button disabled>Default</Button>
<Button variant="secondary" disabled>Secondary</Button>
<Button variant="outline" disabled>Outline</Button>`,
        },
        {
          title: "As link (asChild)",
          description:
            "Render a link or router anchor with the button look. Icons and the loading state work the same way.",
          preview: (
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild iconRight={<ArrowRight />}>
                <a href="#link-example">Open dashboard</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#link-example">Outline link</a>
              </Button>
            </div>
          ),
          code: `import Link from "next/link"

<Button asChild iconRight={<ArrowRight />}>
  <Link href="/dashboard">Open dashboard</Link>
</Button>`,
        },
      ]}
      props={[
        {
          name: "variant",
          type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link" | "quiet"',
          default: '"default"',
          description:
            "Visual style. quiet is for inline text actions — no chip, no press, only the text size.",
        },
        {
          name: "size",
          type: '"xs" | "sm" | "default" | "lg" | "icon-xs" | "icon-sm" | "icon" | "icon-lg"',
          default: '"default"',
          description:
            "32, 36, 40 or 44px tall, one step taller on touch screens. icon-* sizes are square; an icon with no children picks the matching one automatically.",
        },
        {
          name: "icon",
          type: "React.ReactNode",
          description: "Leading icon. Replaced by the spinner while loading.",
        },
        {
          name: "iconRight",
          type: "React.ReactNode",
          description: "Trailing icon. Hidden while loading.",
        },
        {
          name: "loading",
          type: "boolean",
          default: "false",
          description:
            "Shows a spinner and sweeps the label. Stays focusable, sets aria-busy and aria-disabled, ignores onClick, and never submits a form. With asChild, onClick is ignored but link navigation still happens.",
        },
        {
          name: "asChild",
          type: "boolean",
          default: "false",
          description:
            "Renders the child element (e.g. <a> or <Link>) as the root via Radix Slot, keeping icons and states.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Native disabled — removed from the tab order, dimmed, with a not-allowed cursor.",
        },
        {
          name: "...props",
          type: "React.ButtonHTMLAttributes<HTMLButtonElement>",
          description: "Everything a native button takes, including ref, type and aria-*.",
        },
      ]}
      a11yNotes={[
        "Icon-only buttons need an aria-label; pair them with a Tooltip so sighted users get the label too.",
        "loading uses aria-disabled instead of disabled, so a focused button keeps focus when an async action starts and screen readers hear it as busy.",
        "Focus ring uses the --ring token and appears instantly on keyboard focus (focus-visible) — it is never animated.",
        "Use disabled when an action is unavailable, loading when it is in progress. Disabled buttons leave the tab order; loading ones do not.",
        "Press scale, spinner rotation and the label sweep all stop under prefers-reduced-motion.",
        "With asChild and an <a>, screen readers announce a link, which is the correct semantics for navigation.",
      ]}
    />
  )
}
