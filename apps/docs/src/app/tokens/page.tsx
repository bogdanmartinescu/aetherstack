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
  description: "Aether UI design token reference — colors, typography, spacing, radius, shadows, and motion.",
}

// ─── Section wrapper ────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
      {children}
    </section>
  )
}

function TokenLabel({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-xs font-medium text-foreground">{name}</span>
      <span className="font-mono text-xs text-muted-foreground">{value}</span>
    </div>
  )
}

// ─── Color palette ──────────────────────────────────────────────────────────

type PaletteFamily = Record<string | number, string>

function PaletteRow({ name, family }: { name: string; family: PaletteFamily }) {
  const steps = Object.entries(family)
  return (
    <div className="mb-4">
      <p className="mb-2 font-mono text-sm font-medium capitalize text-foreground">{name}</p>
      <div className="flex gap-1 flex-wrap">
        {steps.map(([step, hsl]) => (
          <div key={step} className="flex flex-col items-center gap-1">
            <div
              className="h-10 w-10 rounded-md border border-border"
              style={{ background: `hsl(${hsl})` }}
              title={`${name}[${step}]: hsl(${hsl})`}
            />
            <span className="font-mono text-[10px] text-muted-foreground">{step}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Semantic tokens ─────────────────────────────────────────────────────────

function SemanticRow({ name, lightVal, darkVal }: { name: string; lightVal: string; darkVal: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-border py-2 last:border-0">
      <span className="font-mono text-xs text-foreground">{name}</span>
      <div className="flex items-center gap-2">
        <div
          className="h-6 w-6 rounded border border-border"
          style={{ background: `hsl(${lightVal})` }}
        />
        <span className="font-mono text-xs text-muted-foreground w-36 truncate">{lightVal}</span>
      </div>
      <div className="flex items-center gap-2">
        <div
          className="h-6 w-6 rounded border border-border"
          style={{ background: `hsl(${darkVal})` }}
        />
        <span className="font-mono text-xs text-muted-foreground w-36 truncate">{darkVal}</span>
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function TokensPage() {
  const paletteEntries = Object.entries(palette) as [string, PaletteFamily][]
  const semanticEntries = Object.keys(semanticColors.light) as Array<
    keyof typeof semanticColors.light
  >

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      {/* Header */}
      <div className="mb-16">
        <div className="mb-4 inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          Phase 2 · Token System
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
          Design Tokens
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Aether UI&apos;s token system defines the complete visual language — colors, typography,
          spacing, radius, shadows, and motion. All values live in{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm text-foreground">
            @aetherstack/tokens
          </code>{" "}
          and are consumed by Tailwind via CSS variables.
        </p>
      </div>

      {/* Color palette */}
      <Section title="Color Palette">
        <p className="mb-6 text-sm text-muted-foreground">
          Raw HSL values (without the <code className="font-mono">hsl()</code> wrapper) for direct
          use as CSS variable values. Scale: 0&ndash;950.
        </p>
        {paletteEntries.map(([name, family]) => (
          <PaletteRow key={name} name={name} family={family} />
        ))}
      </Section>

      {/* Semantic tokens */}
      <Section title="Semantic Tokens">
        <p className="mb-4 text-sm text-muted-foreground">
          CSS variable contract consumed by all components. Light and dark values are set via{" "}
          <code className="font-mono">:root</code> and{" "}
          <code className="font-mono">.dark</code>.
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-border bg-muted px-4 py-2">
            <span className="font-mono text-xs font-semibold text-muted-foreground">Variable</span>
            <span className="font-mono text-xs font-semibold text-muted-foreground w-44">Light</span>
            <span className="font-mono text-xs font-semibold text-muted-foreground w-44">Dark</span>
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

      {/* Typography */}
      <Section title="Typography">
        <div className="mb-8">
          <h3 className="mb-4 text-base font-semibold text-foreground">Font Sizes</h3>
          <div className="space-y-3">
            {(Object.entries(fontSizes) as [string, [string, { lineHeight: string }]][]).map(
              ([name, [size, { lineHeight }]]) => (
                <div key={name} className="flex items-baseline gap-4 border-b border-border pb-3 last:border-0">
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
          <h3 className="mb-4 text-base font-semibold text-foreground">Font Weights</h3>
          <div className="flex flex-wrap gap-6">
            {(Object.entries(fontWeights) as [string, string][]).map(([name, weight]) => (
              <div key={name} className="flex flex-col gap-1">
                <span
                  className="text-2xl text-foreground"
                  style={{ fontWeight: weight }}
                >
                  Ag
                </span>
                <TokenLabel name={name} value={weight} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Spacing */}
      <Section title="Spacing">
        <p className="mb-4 text-sm text-muted-foreground">
          Mirrors the Tailwind default spacing scale. Available for non-Tailwind contexts such as
          email or native rendering.
        </p>
        <div className="flex flex-wrap items-end gap-2">
          {(Object.entries(spacing) as [string, string][])
            .filter(([, v]) => v !== "0px" && v !== "1px")
            .slice(0, 20)
            .map(([key, value]) => (
              <div key={key} className="flex flex-col items-center gap-1">
                <div
                  className="bg-primary/20 border border-primary/40 rounded"
                  style={{ width: value, height: "1rem", minWidth: "2px" }}
                />
                <TokenLabel name={String(key)} value={value} />
              </div>
            ))}
        </div>
      </Section>

      {/* Radius */}
      <Section title="Border Radius">
        <p className="mb-4 text-sm text-muted-foreground">
          Derived relative to <code className="font-mono">--radius</code> (default:{" "}
          <code className="font-mono">{baseRadius}</code>) so the entire scale shifts
          proportionally when a theme overrides the base value.
        </p>
        <div className="flex flex-wrap gap-6">
          {(Object.entries(radius) as [string, string][]).map(([name, value]) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div
                className="h-12 w-12 bg-primary/20 border border-primary/40"
                style={{ borderRadius: value }}
              />
              <TokenLabel name={name} value={value} />
            </div>
          ))}
        </div>
      </Section>

      {/* Shadows */}
      <Section title="Shadows">
        <div className="flex flex-wrap gap-8">
          {(Object.entries(shadows) as [string, string][]).map(([name, value]) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div
                className="h-12 w-24 rounded-md bg-card border border-border"
                style={{ boxShadow: value }}
              />
              <TokenLabel name={name} value={value} />
            </div>
          ))}
        </div>
      </Section>

      {/* Motion */}
      <Section title="Motion">
        <div className="mb-8">
          <h3 className="mb-4 text-base font-semibold text-foreground">Durations</h3>
          <div className="flex flex-wrap gap-6">
            {(Object.entries(durations) as [string, string][]).map(([name, value]) => (
              <div key={name} className="rounded-lg border border-border bg-muted/50 px-4 py-3">
                <TokenLabel name={name} value={value} />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 text-base font-semibold text-foreground">Easings</h3>
          <div className="flex flex-wrap gap-4">
            {(Object.entries(easings) as [string, string][]).map(([name, value]) => (
              <div key={name} className="rounded-lg border border-border bg-muted/50 px-4 py-3">
                <TokenLabel name={name} value={value} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-base font-semibold text-foreground">Transitions</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Pre-composed shorthand values for common transition properties. Use these in
            components instead of hand-writing multi-property transition strings.
          </p>
          <div className="rounded-lg border border-border overflow-hidden">
            {(Object.entries(transitions) as [string, string][]).map(([name, value]) => (
              <div
                key={name}
                className="grid grid-cols-[5rem_1fr] gap-4 border-b border-border px-4 py-2 last:border-0"
              >
                <span className="font-mono text-xs font-medium text-foreground self-center">{name}</span>
                <span className="font-mono text-xs text-muted-foreground break-all">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </main>
  )
}
