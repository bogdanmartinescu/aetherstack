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
        <h1 className="text-foreground mb-3 text-4xl font-bold tracking-tight">{name}</h1>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>

      {/* Preview */}
      <section className="mb-10">
        <div className="border-border overflow-hidden rounded-lg border">
          <div className="bg-background/60 flex min-h-[180px] items-center justify-center p-8">
            {preview}
          </div>
          <div className="border-border bg-muted/50 border-t px-4 py-3">
            <p className="text-muted-foreground font-mono text-xs">
              import {"{"} {name.replace(/\s/g, "")} {"}"} from &quot;{packageName}&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Installation */}
      {cliInstall && (
        <section className="mb-10">
          <h2 className="text-foreground mb-4 text-2xl font-semibold tracking-tight">
            Installation
          </h2>
          <CodeBlock code={cliInstall} filename="terminal" />
        </section>
      )}

      {/* Import */}
      <section className="mb-10">
        <h2 className="text-foreground mb-4 text-2xl font-semibold tracking-tight">Import</h2>
        <CodeBlock code={importCode} filename="import.tsx" />
      </section>

      {/* Usage */}
      <section className="mb-10">
        <h2 className="text-foreground mb-4 text-2xl font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageCode} filename={`${name.toLowerCase().replace(/\s/g, "-")}.tsx`} />
      </section>

      {/* Props */}
      <section className="mb-10">
        <h2 className="text-foreground mb-4 text-2xl font-semibold tracking-tight">Props</h2>
        <div className="border-border overflow-hidden rounded-lg border text-sm">
          <table className="w-full">
            <thead className="border-border bg-muted/50 border-b">
              <tr>
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <th key={h} className="text-foreground px-4 py-2.5 text-left font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {props.map((p) => (
                <tr key={p.name} className="hover:bg-muted/20 transition-colors">
                  <td className="text-foreground px-4 py-2.5 font-mono text-xs">
                    {p.name}
                    {p.required && <span className="text-destructive ml-0.5">*</span>}
                  </td>
                  <td className="text-muted-foreground px-4 py-2.5 font-mono text-xs">{p.type}</td>
                  <td className="text-muted-foreground px-4 py-2.5 font-mono text-xs">
                    {p.default ?? "—"}
                  </td>
                  <td className="text-muted-foreground px-4 py-2.5 text-xs">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground mt-2 text-xs">
          <span className="text-destructive">*</span> Required
        </p>
      </section>

      {/* A11y */}
      {a11yNotes && a11yNotes.length > 0 && (
        <section>
          <h2 className="text-foreground mb-4 text-2xl font-semibold tracking-tight">
            Accessibility
          </h2>
          <ul className="space-y-2">
            {a11yNotes.map((n) => (
              <li key={n} className="text-muted-foreground flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5 shrink-0">→</span>
                {n}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
