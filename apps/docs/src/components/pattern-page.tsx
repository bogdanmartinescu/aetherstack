import type { ReactNode } from "react"
import { CodeBlock } from "./code-block"

export interface PatternPropDef {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

export interface PatternPageProps {
  name: string
  description: string
  packageName?: string
  preview: ReactNode
  importCode: string
  usageCode: string
  props: PatternPropDef[]
  a11yNotes?: string[]
  cliInstall?: string
}

export function PatternPage({
  name,
  description,
  packageName = "@aetherstack/patterns",
  preview,
  importCode,
  usageCode,
  props,
  a11yNotes,
  cliInstall,
}: PatternPageProps) {
  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">{name}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>

      {/* Preview */}
      <section className="mb-10">
        <div className="overflow-hidden rounded-lg border border-border">
          <div className="flex min-h-[180px] items-center justify-center bg-background/60 p-8">
            {preview}
          </div>
          <div className="border-t border-border bg-muted/50 px-4 py-3">
            <p className="font-mono text-xs text-muted-foreground">
              import {"{"} {name.replace(/\s/g, "")} {"}"} from &quot;{packageName}&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Installation */}
      {cliInstall && (
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
          <CodeBlock code={cliInstall} filename="terminal" />
        </section>
      )}

      {/* Import */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Import</h2>
        <CodeBlock code={importCode} filename="import.tsx" />
      </section>

      {/* Usage */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename={`${name.toLowerCase().replace(/\s/g, "-")}.tsx`} />
      </section>

      {/* Props */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <div className="overflow-hidden rounded-lg border border-border text-sm">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left font-medium text-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {props.map((p) => (
                <tr key={p.name} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-2.5 font-mono text-xs text-foreground">
                    {p.name}
                    {p.required && <span className="ml-0.5 text-destructive">*</span>}
                  </td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{p.type}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{p.default ?? "—"}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          <span className="text-destructive">*</span> Required
        </p>
      </section>

      {/* A11y */}
      {a11yNotes && a11yNotes.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
          <ul className="space-y-2">
            {a11yNotes.map((n) => (
              <li key={n} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-0.5 shrink-0 text-primary">→</span>
                {n}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
