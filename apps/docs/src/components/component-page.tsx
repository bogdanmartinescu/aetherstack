import type { ReactNode } from "react"
import { DocTabs } from "./doc-tabs"
import { CodeBlock } from "./code-block"
import type { PropDef } from "./props-table"
import { PropsTable } from "./props-table"

export interface UsageExample {
  title: string
  description?: string
  preview: ReactNode
  code: string
}

export interface ComponentPageProps {
  name: string
  description: string
  radixSource?: string
  /** Short list of features */
  features?: string[]
  /** Component preview for the hero section */
  preview: ReactNode
  /** Code for the hero preview */
  previewCode: string
  /** Steps for CLI install */
  cliInstall: string
  /** Full source code of the component file (manual install) */
  manualInstallCode: string
  /** Additional manual steps */
  manualSteps?: { title: string; code: string; filename?: string }[]
  /** Usage examples */
  examples: UsageExample[]
  /** Props definitions */
  props: PropDef[]
  /** Additional prop groups (e.g. sub-components) */
  propGroups?: { title: string; props: PropDef[] }[]
  /** Accessibility notes */
  a11yNotes?: string[]
}

export function ComponentPage({
  name,
  description,
  radixSource,
  features,
  preview,
  previewCode,
  cliInstall,
  manualInstallCode,
  manualSteps,
  examples,
  props,
  propGroups,
  a11yNotes,
}: ComponentPageProps) {
  return (
    <div className="max-w-3xl">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="mb-10">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">{name}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
        {radixSource && (
          <p className="mt-2 text-sm text-muted-foreground">
            Built on{" "}
            <a
              href={radixSource}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              Radix UI
            </a>
            .
          </p>
        )}
        {features && features.length > 0 && (
          <ul className="mt-4 space-y-1">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-0.5 text-primary">✓</span>
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── Top-level tabs: Preview | Installation ───────────────────── */}
      <DocTabs
        tabs={[
          {
            id: "preview",
            label: "Preview",
            content: (
              <div className="space-y-4">
                {/* Hero preview */}
                <div className="rounded-lg border border-border bg-card overflow-hidden">
                  <div className="flex min-h-[180px] items-center justify-center bg-background/60 p-8">
                    {preview}
                  </div>
                  <div className="border-t border-border bg-muted/50 px-4 py-3">
                    <p className="font-mono text-xs text-muted-foreground">
                      import {"{"} {name} {"}"} from &quot;@aetherstack/ui&quot;
                    </p>
                  </div>
                </div>

                {/* Hero code */}
                <CodeBlock code={previewCode} filename={`${name.toLowerCase()}.tsx`} />
              </div>
            ),
          },
          {
            id: "installation",
            label: "Installation",
            content: (
              <DocTabs
                tabs={[
                  {
                    id: "cli",
                    label: "CLI",
                    content: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Run the Aether UI CLI to add this component directly to your project.
                          The CLI copies the component source into your codebase — you own the code.
                        </p>
                        <CodeBlock code={cliInstall} filename="terminal" />
                      </div>
                    ),
                  },
                  {
                    id: "manual",
                    label: "Manual",
                    content: (
                      <div className="space-y-6">
                        <div>
                          <h3 className="mb-2 text-sm font-medium text-foreground">
                            1. Copy the component source
                          </h3>
                          <p className="mb-3 text-sm text-muted-foreground">
                            Create{" "}
                            <code className="rounded bg-muted px-1 font-mono text-xs">
                              components/ui/{name.toLowerCase()}.tsx
                            </code>{" "}
                            in your project and paste the following:
                          </p>
                          <CodeBlock
                            code={manualInstallCode}
                            filename={`components/ui/${name.toLowerCase()}.tsx`}
                          />
                        </div>
                        {manualSteps?.map((step, i) => (
                          <div key={i}>
                            <h3 className="mb-2 text-sm font-medium text-foreground">
                              {i + 2}. {step.title}
                            </h3>
                            <CodeBlock code={step.code} filename={step.filename} />
                          </div>
                        ))}
                      </div>
                    ),
                  },
                ]}
              />
            ),
          },
        ]}
      />

      {/* ── Usage examples ──────────────────────────────────────────────── */}
      {examples.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
            Usage
          </h2>
          <div className="space-y-10">
            {examples.map((ex) => (
              <div key={ex.title}>
                <h3 className="mb-1 text-base font-semibold text-foreground">{ex.title}</h3>
                {ex.description && (
                  <p className="mb-4 text-sm text-muted-foreground">{ex.description}</p>
                )}
                <DocTabs
                  tabs={[
                    {
                      id: "preview",
                      label: "Preview",
                      content: (
                        <div className="flex flex-wrap items-center justify-center gap-3 rounded-lg border border-border bg-background p-8">
                          {ex.preview}
                        </div>
                      ),
                    },
                    {
                      id: "code",
                      label: "Code",
                      content: <CodeBlock code={ex.code} />,
                    },
                  ]}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Props ────────────────────────────────────────────────────────── */}
      <section className="mt-14">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={props} />
        {propGroups?.map((group) => (
          <div key={group.title} className="mt-8">
            <h3 className="mb-4 text-base font-semibold text-foreground">{group.title}</h3>
            <PropsTable props={group.props} />
          </div>
        ))}
        <p className="mt-3 text-xs text-muted-foreground">
          <span className="text-destructive">*</span> Required props
        </p>
      </section>

      {/* ── Accessibility ────────────────────────────────────────────────── */}
      {a11yNotes && a11yNotes.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">
            Accessibility
          </h2>
          <ul className="space-y-2">
            {a11yNotes.map((note) => (
              <li key={note} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-0.5 shrink-0 text-primary">→</span>
                {note}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
