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
        <h1 className="text-foreground mb-3 text-4xl font-bold tracking-tight">Form Field</h1>
        <p className="text-muted-foreground text-lg">
          A composable form field that wires a Label, control, helper text, and error message
          together via React context. The{" "}
          <code className="bg-muted rounded px-1 font-mono text-sm">useFormField</code> hook
          provides the field ID and error state to any child component.
        </p>
      </div>

      {/* Preview */}
      <section className="mb-10">
        <div className="border-border overflow-hidden rounded-lg border">
          <div className="bg-background/60 flex min-h-[220px] items-center justify-center p-8">
            <FormFieldPreview />
          </div>
          <div className="border-border bg-muted/50 border-t px-4 py-3">
            <p className="text-muted-foreground font-mono text-xs">
              import {"{"} FormField, FormLabel, FormControl, FormDescription, FormMessage {"}"}{" "}
              from &quot;@aetherstack/patterns&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="mb-10">
        <h2 className="text-foreground mb-4 text-2xl font-semibold tracking-tight">Installation</h2>
        <CodeBlock code={`npx aether-ui add form-field`} filename="terminal" />
      </section>

      {/* Usage */}
      <section className="mb-10">
        <h2 className="text-foreground mb-4 text-2xl font-semibold tracking-tight">Usage</h2>
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
        <h2 className="text-foreground mb-4 text-2xl font-semibold tracking-tight">Props</h2>
        <div className="border-border overflow-hidden rounded-lg border text-sm">
          <table className="w-full">
            <thead className="border-border bg-muted/50 border-b">
              <tr>
                {["Component", "Prop", "Type", "Description"].map((h) => (
                  <th key={h} className="text-foreground px-4 py-2.5 text-left font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {[
                [
                  "FormField",
                  "name",
                  "string",
                  "Used to generate stable IDs for label/input association.",
                ],
                [
                  "FormField",
                  "id",
                  "string",
                  "Explicit ID override. Auto-generated from name if omitted.",
                ],
                [
                  "FormField",
                  "error",
                  "string",
                  "Error message. When set, label turns red and FormMessage shows it.",
                ],
                ["FormField", "required", "boolean", "Adds a red asterisk to the label."],
                [
                  "FormLabel",
                  "—",
                  "LabelProps",
                  "Forwards all Label props. htmlFor is set automatically.",
                ],
                [
                  "FormControl",
                  "children",
                  "ReactElement",
                  "Single child element that receives the id and aria-describedby.",
                ],
                [
                  "FormDescription",
                  "—",
                  "HTMLParagraphElement props",
                  "Helper text below the control.",
                ],
                [
                  "FormMessage",
                  "children",
                  "ReactNode",
                  "Shown when FormField has an error. Falls back to children.",
                ],
              ].map(([comp, prop, type, desc]) => (
                <tr key={`${comp}-${prop}`} className="hover:bg-muted/20 transition-colors">
                  <td className="text-primary px-4 py-2.5 font-mono text-xs">{comp}</td>
                  <td className="text-foreground px-4 py-2.5 font-mono text-xs">{prop}</td>
                  <td className="text-muted-foreground px-4 py-2.5 font-mono text-xs">{type}</td>
                  <td className="text-muted-foreground px-4 py-2.5 text-xs">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* A11y */}
      <section>
        <h2 className="text-foreground mb-4 text-2xl font-semibold tracking-tight">
          Accessibility
        </h2>
        <ul className="space-y-2">
          {[
            "FormLabel sets htmlFor to the field ID automatically — no manual wiring needed.",
            "FormControl adds aria-describedby pointing to the description and/or error message.",
            'FormControl adds aria-invalid="true" when an error is present.',
            'FormMessage renders with role="alert" to announce errors to screen readers.',
            "Required fields show a visual asterisk (aria-hidden) — combine with required on the native input for full a11y.",
          ].map((n) => (
            <li key={n} className="text-muted-foreground flex items-start gap-2 text-sm">
              <span className="text-primary mt-0.5 shrink-0">→</span>
              {n}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
