import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { FormFieldPreview } from "./previews"

export const metadata: Metadata = {
  title: "Form Field",
  description: "Label + control + helper text + error message composition with context hook.",
}

export default function FormFieldPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-10">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">Form Field</h1>
        <p className="text-lg text-muted-foreground">
          A composable form field that wires a Label, control, helper text, and error message together via React context.
          The <code className="rounded bg-muted px-1 font-mono text-sm">useFormField</code> hook provides
          the field ID and error state to any child component.
        </p>
      </div>

      {/* Preview */}
      <section className="mb-10">
        <div className="overflow-hidden rounded-lg border border-border">
          <div className="flex min-h-[220px] items-center justify-center bg-background/60 p-8">
            <FormFieldPreview />
          </div>
          <div className="border-t border-border bg-muted/50 px-4 py-3">
            <p className="font-mono text-xs text-muted-foreground">
              import {"{"} FormField, FormLabel, FormControl, FormDescription, FormMessage {"}"} from &quot;@aetherstack/patterns&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={`npx aether-ui add form-field`} filename="terminal" />
      </section>

      {/* Usage */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock
          code={`import {
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@aetherstack/patterns"
import { Input } from "@aetherstack/ui"

// Basic field
<FormField name="email" required>
  <FormLabel>Email address</FormLabel>
  <FormControl>
    <Input type="email" placeholder="you@example.com" />
  </FormControl>
  <FormDescription>We'll send a confirmation to this address.</FormDescription>
</FormField>

// Field with error
<FormField name="email" error="Invalid email address">
  <FormLabel>Email address</FormLabel>
  <FormControl>
    <Input type="email" />
  </FormControl>
  <FormMessage />
</FormField>`}
          filename="form-field-usage.tsx"
        />
      </section>

      {/* Props */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <div className="overflow-hidden rounded-lg border border-border text-sm">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                {["Component", "Prop", "Type", "Description"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left font-medium text-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["FormField", "name", "string", "Used to generate stable IDs for label/input association."],
                ["FormField", "id", "string", "Explicit ID override. Auto-generated from name if omitted."],
                ["FormField", "error", "string", "Error message. When set, label turns red and FormMessage shows it."],
                ["FormField", "required", "boolean", "Adds a red asterisk to the label."],
                ["FormLabel", "—", "LabelProps", "Forwards all Label props. htmlFor is set automatically."],
                ["FormControl", "children", "ReactElement", "Single child element that receives the id and aria-describedby."],
                ["FormDescription", "—", "HTMLParagraphElement props", "Helper text below the control."],
                ["FormMessage", "children", "ReactNode", "Shown when FormField has an error. Falls back to children."],
              ].map(([comp, prop, type, desc]) => (
                <tr key={`${comp}-${prop}`} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-2.5 font-mono text-xs text-primary">{comp}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-foreground">{prop}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{type}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* A11y */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="space-y-2">
          {[
            "FormLabel sets htmlFor to the field ID automatically — no manual wiring needed.",
            "FormControl adds aria-describedby pointing to the description and/or error message.",
            "FormControl adds aria-invalid=\"true\" when an error is present.",
            "FormMessage renders with role=\"alert\" to announce errors to screen readers.",
            "Required fields show a visual asterisk (aria-hidden) — combine with required on the native input for full a11y.",
          ].map((n) => (
            <li key={n} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-0.5 shrink-0 text-primary">→</span>
              {n}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
