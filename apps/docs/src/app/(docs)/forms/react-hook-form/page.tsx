import type { Metadata } from "next"
import Link from "next/link"
import { CodeBlock, InlineCode } from "@/components/code-block"
import {
  BugReportDemo,
  InputDemo,
  TextareaDemo,
  SelectDemo,
  CheckboxDemo,
  RadioGroupDemo,
  SwitchDemo,
  ArrayFieldsDemo,
} from "./demos"

export const metadata: Metadata = {
  title: "React Hook Form",
  description: "Build forms in React using React Hook Form and Zod.",
}

// ── Prose helpers ──────────────────────────────────────────────────────────────

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-12 mb-4 scroll-mt-20 text-xl font-bold tracking-tight text-foreground">
      {children}
    </h2>
  )
}

function H3({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="mt-8 mb-3 scroll-mt-20 text-base font-semibold text-foreground">
      {children}
    </h3>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="leading-7 text-muted-foreground [&+p]:mt-4">{children}</p>
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
      <strong className="font-medium text-foreground">Note: </strong>
      {children}
    </div>
  )
}

function DemoWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 flex items-center justify-center rounded-xl border border-border bg-muted/20 p-6 sm:p-10">
      {children}
    </div>
  )
}

// ── On-this-page items ─────────────────────────────────────────────────────────

const ON_THIS_PAGE = [
  { label: "Demo", href: "#demo" },
  { label: "Installation", href: "#installation" },
  { label: "Approach", href: "#approach" },
  { label: "Anatomy", href: "#anatomy" },
  { label: "Create a schema", href: "#create-schema" },
  { label: "Set up useForm", href: "#setup-useform" },
  { label: "Build the form", href: "#build-form" },
  { label: "Validation", href: "#validation" },
  { label: "Validation modes", href: "#validation-modes" },
  { label: "Displaying errors", href: "#displaying-errors" },
  { label: "Input", href: "#field-input" },
  { label: "Textarea", href: "#field-textarea" },
  { label: "Select", href: "#field-select" },
  { label: "Checkbox", href: "#field-checkbox" },
  { label: "Radio Group", href: "#field-radio" },
  { label: "Switch", href: "#field-switch" },
  { label: "Resetting", href: "#resetting" },
  { label: "Array fields", href: "#array-fields" },
]

// ─────────────────────────────────────────────────────────────────────────────

export default function ReactHookFormPage() {
  return (
    <div className="flex gap-10">
      {/* ── Main content ── */}
      <div className="min-w-0 flex-1">
        <div className="mb-8">
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">Forms</p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">React Hook Form</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Build forms in React using{" "}
            <a href="https://react-hook-form.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              React Hook Form
            </a>{" "}
            and{" "}
            <a href="https://zod.dev" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              Zod
            </a>
            .
          </p>
          <p className="mt-3 leading-7 text-muted-foreground">
            In this guide we cover building forms with the Aether UI primitives (
            <InlineCode>Input</InlineCode>, <InlineCode>Select</InlineCode>,{" "}
            <InlineCode>Checkbox</InlineCode>, <InlineCode>Switch</InlineCode>, and more),
            schema validation with Zod, error display, validation modes, and dynamic array fields.
          </p>
        </div>

        {/* ── Demo ── */}
        <H2 id="demo">Demo</H2>
        <P>
          We are going to build the following form. It has a text input and a textarea with a
          character counter. On submit, the form data is validated against a Zod schema and errors
          are displayed next to each field.
        </P>
        <Note>
          Browser-native validation is disabled with <InlineCode>noValidate</InlineCode> on the{" "}
          <InlineCode>{"<form>"}</InlineCode> element so that custom Zod errors always show.
        </Note>
        <DemoWrapper>
          <BugReportDemo />
        </DemoWrapper>

        {/* ── Installation ── */}
        <H2 id="installation">Installation</H2>
        <P>Install React Hook Form, Zod, and the official resolver:</P>
        <CodeBlock
          className="my-4"
          filename="terminal"
          code="pnpm add react-hook-form zod @hookform/resolvers"
        />

        {/* ── Approach ── */}
        <H2 id="approach">Approach</H2>
        <P>
          This guide uses React Hook Form{"'"}s <InlineCode>useForm</InlineCode> hook for form
          state and{" "}
          <InlineCode>{"<Controller />"}</InlineCode> for Radix UI components that don{"'"}t
          expose a native DOM input (Select, Switch, Checkbox, RadioGroup). Simple inputs and
          textareas use the <InlineCode>register</InlineCode> API.
        </P>
        <ul className="my-4 ml-6 list-disc space-y-1.5 text-sm leading-7 text-muted-foreground">
          <li><InlineCode>useForm</InlineCode> — manages form state (values, errors, submission)</li>
          <li><InlineCode>zodResolver</InlineCode> — wires Zod schema validation into the form</li>
          <li><InlineCode>register</InlineCode> — connects native inputs to the form state</li>
          <li><InlineCode>{"<Controller />"}</InlineCode> — connects Radix UI components to the form state</li>
          <li><InlineCode>useFieldArray</InlineCode> — manages dynamic array fields</li>
        </ul>

        {/* ── Anatomy ── */}
        <H2 id="anatomy">Anatomy</H2>
        <P>
          The pattern for every field is: wrap the control in a <InlineCode>{"<div>"}</InlineCode>,
          add a <InlineCode>{"<Label>"}</InlineCode>, render the input, then conditionally render
          an error message beneath it.
        </P>
        <CodeBlock
          className="my-4"
          filename="form.tsx"
          code={`<div className="space-y-1.5">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    aria-invalid={!!errors.email}
    {...register("email")}
  />
  {errors.email && (
    <p className="text-xs text-destructive">{errors.email.message}</p>
  )}
</div>`}
        />
        <P>
          For Radix UI components, swap <InlineCode>register</InlineCode> for{" "}
          <InlineCode>{"<Controller />"}</InlineCode>:
        </P>
        <CodeBlock
          className="my-4"
          filename="form.tsx"
          code={`<Controller
  name="language"
  control={control}
  render={({ field, fieldState }) => (
    <Select value={field.value} onValueChange={field.onChange}>
      <SelectTrigger aria-invalid={fieldState.invalid}>
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
      </SelectContent>
    </Select>
  )}
/>`}
        />

        {/* ── Step by step ── */}
        <H2 id="create-schema">Step 1 — Create a form schema</H2>
        <P>
          Define the shape and validation rules for your form using Zod. The inferred type becomes
          your form{"'"}s values type.
        </P>
        <CodeBlock
          className="my-4"
          filename="form.tsx"
          code={`import { z } from "zod"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(60, "Bug title must be at most 60 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(300, "Description must be at most 300 characters."),
})

type FormValues = z.infer<typeof formSchema>`}
        />

        <H2 id="setup-useform">Step 2 — Set up useForm</H2>
        <P>
          Pass your schema to <InlineCode>zodResolver</InlineCode> and set optional default values.
        </P>
        <CodeBlock
          className="my-4"
          filename="form.tsx"
          code={`import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export function BugReportForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", description: "" },
  })

  function onSubmit(data: FormValues) {
    // data is fully typed and validated
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* fields go here */}
    </form>
  )
}`}
        />

        <H2 id="build-form">Step 3 — Build the form</H2>
        <P>
          Spread <InlineCode>{`register("fieldName")`}</InlineCode> onto each native input, add{" "}
          <InlineCode>aria-invalid</InlineCode> when there{"'"}s an error, and render the error
          message beneath.
        </P>
        <CodeBlock
          className="my-4"
          filename="form.tsx"
          code={`"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button, Input, Label, Textarea } from "@aetherstack/ui"

const formSchema = z.object({
  title: z.string().min(5, "At least 5 characters.").max(60),
  description: z.string().min(20, "At least 20 characters.").max(300),
})

export function BugReportForm() {
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } =
    useForm({ resolver: zodResolver(formSchema), defaultValues: { title: "", description: "" } })

  const desc = watch("description", "")

  return (
    <form id="bug-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="title">Bug Title</Label>
        <Input id="title" aria-invalid={!!errors.title} {...register("title")} />
        {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="desc">Description</Label>
          <span className="text-xs text-muted-foreground">{desc.length}/300</span>
        </div>
        <Textarea id="desc" rows={4} aria-invalid={!!errors.description} {...register("description")} />
        {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => reset()}>Reset</Button>
        <Button type="submit" form="bug-form" disabled={isSubmitting}>Submit</Button>
      </div>
    </form>
  )
}`}
        />

        {/* ── Validation ── */}
        <H2 id="validation">Validation</H2>
        <H3 id="validation-modes">Validation modes</H3>
        <P>
          Pass the <InlineCode>mode</InlineCode> option to <InlineCode>useForm</InlineCode> to
          control when validation runs.
        </P>
        <CodeBlock
          className="my-4"
          filename="form.tsx"
          code={`const form = useForm({
  resolver: zodResolver(formSchema),
  mode: "onBlur", // validate when the user leaves a field
})`}
        />
        <div className="my-4 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/60">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium text-foreground">Mode</th>
                <th className="px-4 py-2.5 text-left font-medium text-foreground">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["onSubmit", "Validates only on submit (default). Best UX — no red errors while typing."],
                ["onBlur", "Validates when the user leaves a field."],
                ["onChange", "Validates on every keystroke. Useful for real-time feedback."],
                ["onTouched", "Validates on first blur, then on every change."],
                ["all", "Validates on both blur and change."],
              ].map(([mode, desc]) => (
                <tr key={mode}>
                  <td className="px-4 py-2.5 font-mono text-xs text-foreground">{`"${mode}"`}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <H3 id="displaying-errors">Displaying errors</H3>
        <P>
          Read error messages from <InlineCode>formState.errors</InlineCode>. Always set{" "}
          <InlineCode>aria-invalid</InlineCode> on the control so assistive technology announces
          the invalid state.
        </P>
        <CodeBlock
          className="my-4"
          filename="form.tsx"
          code={`const { formState: { errors } } = useForm(...)

// In JSX:
<Input
  aria-invalid={!!errors.email}
  {...register("email")}
/>
{errors.email && (
  <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
)}`}
        />

        {/* ── Field types ── */}
        <H2 id="field-input">Input</H2>
        <P>
          Spread <InlineCode>{`register("name")`}</InlineCode> directly onto{" "}
          <InlineCode>{"<Input />"}</InlineCode>. Add <InlineCode>aria-invalid</InlineCode> when
          the field has an error.
        </P>
        <DemoWrapper>
          <InputDemo />
        </DemoWrapper>
        <CodeBlock
          className="my-4"
          filename="form.tsx"
          code={`<div className="space-y-1.5">
  <Label htmlFor="username">Username</Label>
  <Input
    id="username"
    aria-invalid={!!errors.username}
    {...register("username")}
  />
  {errors.username && (
    <p className="text-xs text-destructive">{errors.username.message}</p>
  )}
</div>`}
        />

        <H2 id="field-textarea">Textarea</H2>
        <P>
          Same pattern as <InlineCode>{"<Input />"}</InlineCode> — spread{" "}
          <InlineCode>register</InlineCode> and add <InlineCode>aria-invalid</InlineCode>.
          Use <InlineCode>watch</InlineCode> to drive a live character counter without triggering
          re-validation.
        </P>
        <DemoWrapper>
          <TextareaDemo />
        </DemoWrapper>
        <CodeBlock
          className="my-4"
          filename="form.tsx"
          code={`const about = watch("about", "")

<div className="space-y-1.5">
  <div className="flex items-center justify-between">
    <Label htmlFor="about">Bio</Label>
    <span className="text-xs text-muted-foreground">{about.length}/300</span>
  </div>
  <Textarea
    id="about"
    rows={4}
    aria-invalid={!!errors.about}
    {...register("about")}
  />
</div>`}
        />

        <H2 id="field-select">Select</H2>
        <P>
          Radix UI{"'"}s <InlineCode>{"<Select />"}</InlineCode> manages its own state, so it
          needs <InlineCode>{"<Controller />"}</InlineCode>. Use <InlineCode>field.value</InlineCode>{" "}
          and <InlineCode>field.onChange</InlineCode>, and set{" "}
          <InlineCode>aria-invalid</InlineCode> on the <InlineCode>{"<SelectTrigger />"}</InlineCode>.
        </P>
        <DemoWrapper>
          <SelectDemo />
        </DemoWrapper>
        <CodeBlock
          className="my-4"
          filename="form.tsx"
          code={`<Controller
  name="language"
  control={control}
  render={({ field, fieldState }) => (
    <Select value={field.value} onValueChange={field.onChange}>
      <SelectTrigger aria-invalid={fieldState.invalid}>
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="es">Spanish</SelectItem>
      </SelectContent>
    </Select>
  )}
/>`}
        />

        <H2 id="field-checkbox">Checkbox</H2>
        <P>
          For multi-select checkboxes, use <InlineCode>{"<Controller />"}</InlineCode> and manage
          an array of selected IDs in <InlineCode>field.value</InlineCode>.
        </P>
        <DemoWrapper>
          <CheckboxDemo />
        </DemoWrapper>
        <CodeBlock
          className="my-4"
          filename="form.tsx"
          code={`<Controller
  name="notifications"
  control={control}
  render={({ field, fieldState }) => (
    <>
      {ITEMS.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <Checkbox
            id={item.id}
            aria-invalid={fieldState.invalid}
            checked={field.value.includes(item.id)}
            onCheckedChange={(checked) => {
              const next = checked
                ? [...field.value, item.id]
                : field.value.filter((v) => v !== item.id)
              field.onChange(next)
            }}
          />
          <Label htmlFor={item.id}>{item.label}</Label>
        </div>
      ))}
    </>
  )}
/>`}
        />

        <H2 id="field-radio">Radio Group</H2>
        <P>
          Use <InlineCode>field.value</InlineCode> and <InlineCode>field.onValueChange</InlineCode>{" "}
          on <InlineCode>{"<RadioGroup />"}</InlineCode>. Set{" "}
          <InlineCode>aria-invalid</InlineCode> on each <InlineCode>{"<RadioGroupItem />"}</InlineCode>.
        </P>
        <DemoWrapper>
          <RadioGroupDemo />
        </DemoWrapper>
        <CodeBlock
          className="my-4"
          filename="form.tsx"
          code={`<Controller
  name="plan"
  control={control}
  render={({ field, fieldState }) => (
    <RadioGroup value={field.value} onValueChange={field.onChange}>
      {PLANS.map((plan) => (
        <label key={plan.id} htmlFor={plan.id} className="flex items-start gap-3 ...">
          <RadioGroupItem
            value={plan.id}
            id={plan.id}
            aria-invalid={fieldState.invalid}
          />
          <div>
            <p>{plan.title}</p>
            <p>{plan.description}</p>
          </div>
        </label>
      ))}
    </RadioGroup>
  )}
/>`}
        />

        <H2 id="field-switch">Switch</H2>
        <P>
          Use <InlineCode>field.value</InlineCode> and <InlineCode>field.onChange</InlineCode> on{" "}
          <InlineCode>{"<Switch />"}</InlineCode> via <InlineCode>{"<Controller />"}</InlineCode>.
          Wrap the label and switch in a flex row so the label is on the left and the toggle is on
          the right.
        </P>
        <DemoWrapper>
          <SwitchDemo />
        </DemoWrapper>
        <CodeBlock
          className="my-4"
          filename="form.tsx"
          code={`<Controller
  name="twoFactor"
  control={control}
  render={({ field }) => (
    <div className="flex items-center justify-between gap-4">
      <Label htmlFor="two-factor">Multi-factor authentication</Label>
      <Switch
        id="two-factor"
        checked={field.value}
        onCheckedChange={field.onChange}
      />
    </div>
  )}
/>`}
        />

        {/* ── Resetting ── */}
        <H2 id="resetting">Resetting the form</H2>
        <P>
          Call <InlineCode>form.reset()</InlineCode> to clear all values back to their defaults and
          clear all validation errors. Optionally pass new default values.
        </P>
        <CodeBlock
          className="my-4"
          filename="form.tsx"
          code={`// Reset to original defaults
<Button type="button" variant="outline" onClick={() => reset()}>
  Reset
</Button>

// Reset to new values (e.g. after a successful save)
reset({ username: "new-default" })`}
        />

        {/* ── Array fields ── */}
        <H2 id="array-fields">Array fields</H2>
        <P>
          Use <InlineCode>useFieldArray</InlineCode> to manage a dynamic list of fields — for
          example a list of email addresses. It provides <InlineCode>fields</InlineCode>,{" "}
          <InlineCode>append</InlineCode>, and <InlineCode>remove</InlineCode>.
        </P>
        <DemoWrapper>
          <ArrayFieldsDemo />
        </DemoWrapper>

        <H3 id="array-setup">Set up useFieldArray</H3>
        <CodeBlock
          className="my-4"
          filename="form.tsx"
          code={`import { useFieldArray } from "react-hook-form"

const { fields, append, remove } = useFieldArray({
  control,
  name: "emails",
})`}
        />

        <H3 id="array-render">Render array items</H3>
        <P>
          Map over <InlineCode>fields</InlineCode> and use{" "}
          <InlineCode>{"<Controller />"}</InlineCode> for each item. Always use{" "}
          <InlineCode>field.id</InlineCode> as the React key — not the array index — to prevent
          stale state bugs when items are removed.
        </P>
        <CodeBlock
          className="my-4"
          filename="form.tsx"
          code={`{fields.map((field, index) => (
  <Controller
    key={field.id}   // ← use field.id, not index
    name={\`emails.\${index}.address\`}
    control={control}
    render={({ field: f, fieldState }) => (
      <div className="flex gap-2">
        <Input {...f} type="email" aria-invalid={fieldState.invalid} />
        {fields.length > 1 && (
          <Button type="button" variant="outline" size="icon" onClick={() => remove(index)}>
            <XIcon />
          </Button>
        )}
      </div>
    )}
  />
))}`}
        />

        <H3 id="array-append">Adding items</H3>
        <CodeBlock
          className="my-4"
          filename="form.tsx"
          code={`<Button
  type="button"
  variant="outline"
  onClick={() => append({ address: "" })}
  disabled={fields.length >= 5}
>
  Add Email Address
</Button>`}
        />

        <H3 id="array-validation">Array validation schema</H3>
        <CodeBlock
          className="my-4"
          filename="form.tsx"
          code={`const formSchema = z.object({
  emails: z
    .array(
      z.object({
        address: z.string().email("Enter a valid email address."),
      })
    )
    .min(1, "Add at least one email address.")
    .max(5, "You can add up to 5 email addresses."),
})`}
        />

        {/* ── Next steps ── */}
        <div className="mt-16 border-t border-border pt-8">
          <p className="text-sm font-medium text-foreground">Continue reading</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Link
              href="/patterns/login-form"
              className="group rounded-lg border border-border p-4 transition-colors hover:bg-muted/40"
            >
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Login Form →</p>
              <p className="mt-1 text-xs text-muted-foreground">Email + password with remember-me and Zod validation.</p>
            </Link>
            <Link
              href="/patterns/signup-form"
              className="group rounded-lg border border-border p-4 transition-colors hover:bg-muted/40"
            >
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Sign Up Form →</p>
              <p className="mt-1 text-xs text-muted-foreground">Registration with password strength meter and cross-field validation.</p>
            </Link>
            <Link
              href="/patterns/profile-form"
              className="group rounded-lg border border-border p-4 transition-colors hover:bg-muted/40"
            >
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Profile Settings Form →</p>
              <p className="mt-1 text-xs text-muted-foreground">Multi-section form with Select, Switch, and dirty detection.</p>
            </Link>
            <Link
              href="/patterns/contact-form"
              className="group rounded-lg border border-border p-4 transition-colors hover:bg-muted/40"
            >
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Contact Form →</p>
              <p className="mt-1 text-xs text-muted-foreground">Contact form with post-submit success state.</p>
            </Link>
          </div>
        </div>
      </div>

      {/* ── On this page ── */}
      <aside className="hidden w-48 shrink-0 xl:block">
        <div className="sticky top-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            On this page
          </p>
          <nav className="space-y-1">
            {ON_THIS_PAGE.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  )
}
