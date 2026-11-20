import type { Metadata } from "next"
import type { ReactNode } from "react"
import {
  palette,
  semanticColors,
  spacing,
  fontSizes,
  fontWeights,
  radius,
  baseRadius,
  shadows,
  durations,
  easings,
  transitions,
} from "@aetherstack/tokens"

export const metadata: Metadata = {
  title: "Tokens",
  description:
    "Aether UI design token reference — colors, typography, spacing, radius, shadows, and motion.",
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="text-foreground mb-6 text-2xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  )
}

function TokenLabel({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-foreground font-mono text-xs font-medium">{name}</span>
      <span className="text-muted-foreground font-mono text-xs">{value}</span>
    </div>
  )
}

type PaletteFamily = Record<string | number, string>

function PaletteRow({ name, family }: { name: string; family: PaletteFamily }) {
  const steps = Object.entries(family)
  return (
    <div className="mb-4">
      <p className="text-foreground mb-2 font-mono text-sm font-medium capitalize">{name}</p>
      <div className="flex flex-wrap gap-1">
        {steps.map(([step, hsl]) => (
          <div key={step} className="flex flex-col items-center gap-1">
            <div
              className="border-border h-10 w-10 rounded-md border"
              style={{ background: `hsl(${hsl})` }}
              title={`${name}[${step}]: hsl(${hsl})`}
            />
            <span className="text-muted-foreground font-mono text-[10px]">{step}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SemanticRow({
  name,
  lightVal,
  darkVal,
}: {
  name: string
  lightVal: string
  darkVal: string
}) {
  return (
    <div className="border-border grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b py-2 last:border-0">
      <span className="text-foreground font-mono text-xs">{name}</span>
      <div className="flex items-center gap-2">
        <div
          className="border-border h-6 w-6 rounded border"
          style={{ background: `hsl(${lightVal})` }}
        />
        <span className="text-muted-foreground w-36 truncate font-mono text-xs">{lightVal}</span>
      </div>
      <div className="flex items-center gap-2">
        <div
          className="border-border h-6 w-6 rounded border"
          style={{ background: `hsl(${darkVal})` }}
        />
        <span className="text-muted-foreground w-36 truncate font-mono text-xs">{darkVal}</span>
      </div>
    </div>
  )
}

export default function TokensPage() {
  const paletteEntries = Object.entries(palette) as [string, PaletteFamily][]
  const semanticEntries = Object.keys(semanticColors.light) as Array<
    keyof typeof semanticColors.light
  >

  return (
    <div className="max-w-3xl">
      <div className="mb-12">
        <h1 className="text-foreground mb-3 text-4xl font-bold tracking-tight">Design Tokens</h1>
        <p className="text-muted-foreground text-lg">
          Aether UI&apos;s token system defines the complete visual language — colors, typography,
          spacing, radius, shadows, and motion. All values live in{" "}
          <code className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-sm">
            @aetherstack/tokens
          </code>{" "}
          and are consumed by Tailwind CSS via CSS variables.
        </p>
      </div>

      <Section title="Color Palette">
        <p className="text-muted-foreground mb-6 text-sm">
          Raw HSL values (without the <code className="font-mono">hsl()</code> wrapper). Scale:
          0–950.
        </p>
        {paletteEntries.map(([name, family]) => (
          <PaletteRow key={name} name={name} family={family} />
        ))}
      </Section>

      <Section title="Semantic Tokens">
        <p className="text-muted-foreground mb-4 text-sm">
          CSS variable contract consumed by all components. Light and dark values are set via{" "}
          <code className="font-mono">:root</code> and <code className="font-mono">.dark</code>.
        </p>
        <div className="border-border overflow-hidden rounded-lg border">
          <div className="border-border bg-muted grid grid-cols-[1fr_auto_auto] gap-4 border-b px-4 py-2">
            <span className="text-muted-foreground font-mono text-xs font-semibold">Variable</span>
            <span className="text-muted-foreground w-44 font-mono text-xs font-semibold">
              Light
            </span>
            <span className="text-muted-foreground w-44 font-mono text-xs font-semibold">Dark</span>
          </div>
          <div className="px-4">
            {semanticEntries.map((key) => (
              <SemanticRow
                key={key}
                name={key}
                lightVal={semanticColors.light[key]}
                darkVal={semanticColors.dark[key]}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section title="Typography">
        <div className="mb-8">
          <h3 className="text-foreground mb-4 text-base font-semibold">Font Sizes</h3>
          <div className="space-y-3">
            {(Object.entries(fontSizes) as [string, [string, { lineHeight: string }]][]).map(
              ([name, [size, { lineHeight }]]) => (
                <div
                  key={name}
                  className="border-border flex items-baseline gap-4 border-b pb-3 last:border-0"
                >
                  <span
                    className="text-foreground font-medium"
                    style={{ fontSize: size, lineHeight }}
                  >
                    Aa
                  </span>
                  <TokenLabel name={name} value={`${size} / lh ${lineHeight}`} />
                </div>
              ),
            )}
          </div>
        </div>
        <div>
          <h3 className="text-foreground mb-4 text-base font-semibold">Font Weights</h3>
          <div className="flex flex-wrap gap-6">
            {(Object.entries(fontWeights) as [string, string][]).map(([name, weight]) => (
              <div key={name} className="flex flex-col gap-1">
                <span className="text-foreground text-2xl" style={{ fontWeight: weight }}>
                  Ag
                </span>
                <TokenLabel name={name} value={weight} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Spacing">
        <p className="text-muted-foreground mb-4 text-sm">
          Mirrors the Tailwind default spacing scale.
        </p>
        <div className="flex flex-wrap items-end gap-2">
          {(Object.entries(spacing) as [string, string][])
            .filter(([, v]) => v !== "0px" && v !== "1px")
            .slice(0, 20)
            .map(([key, value]) => (
              <div key={key} className="flex flex-col items-center gap-1">
                <div
                  className="bg-primary/20 border-primary/40 rounded border"
                  style={{ width: value, height: "1rem", minWidth: "2px" }}
                />
                <TokenLabel name={String(key)} value={value} />
              </div>
            ))}
        </div>
      </Section>

      <Section title="Border Radius">
        <p className="text-muted-foreground mb-4 text-sm">
          Derived relative to <code className="font-mono">--radius</code> (default:{" "}
          <code className="font-mono">{baseRadius}</code>).
        </p>
        <div className="flex flex-wrap gap-6">
          {(Object.entries(radius) as [string, string][]).map(([name, value]) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div
                className="bg-primary/20 border-primary/40 h-12 w-12 border"
                style={{ borderRadius: value }}
              />
              <TokenLabel name={name} value={value} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Shadows">
        <div className="flex flex-wrap gap-8">
          {(Object.entries(shadows) as [string, string][]).map(([name, value]) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div
                className="bg-card border-border h-12 w-24 rounded-md border"
                style={{ boxShadow: value }}
              />
              <TokenLabel name={name} value={value} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Motion">
        <div className="mb-8">
          <h3 className="text-foreground mb-4 text-base font-semibold">Durations</h3>
          <div className="flex flex-wrap gap-4">
            {(Object.entries(durations) as [string, string][]).map(([name, value]) => (
              <div key={name} className="border-border bg-muted/50 rounded-lg border px-4 py-3">
                <TokenLabel name={name} value={value} />
              </div>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-foreground mb-4 text-base font-semibold">Easings</h3>
          <div className="flex flex-wrap gap-4">
            {(Object.entries(easings) as [string, string][]).map(([name, value]) => (
              <div key={name} className="border-border bg-muted/50 rounded-lg border px-4 py-3">
                <TokenLabel name={name} value={value} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-foreground mb-4 text-base font-semibold">Transitions</h3>
          <div className="border-border overflow-hidden rounded-lg border">
            {(Object.entries(transitions) as [string, string][]).map(([name, value]) => (
              <div
                key={name}
                className="border-border grid grid-cols-[5rem_1fr] gap-4 border-b px-4 py-2 last:border-0"
              >
                <span className="text-foreground self-center font-mono text-xs font-medium">
                  {name}
                </span>
                <span className="text-muted-foreground break-all font-mono text-xs">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}
