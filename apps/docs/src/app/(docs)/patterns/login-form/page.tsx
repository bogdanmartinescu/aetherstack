import type { Metadata } from "next"
import { PatternPage } from "@/components/pattern-page"
import { LoginFormPreview } from "./preview"

export const metadata: Metadata = {
  title: "Login Form",
  description: "Sign-in form with email, password, and remember-me, validated with react-hook-form and Zod.",
}

const IMPORT_CODE = `import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button, Input, Label, Checkbox } from "@aetherstack/ui"
import { toast } from "@aetherstack/ui"`

const USAGE_CODE = `const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional(),
})

type FormValues = z.infer<typeof schema>

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormValues) {
    await signIn(data.email, data.password)
    toast({ variant: "success", title: "Signed in", description: \`Welcome back, \${data.email}\` })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
        {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="remember" {...register("remember")} />
        <Label htmlFor="remember" className="font-normal">Remember me</Label>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  )
}`

export default function LoginFormPage() {
  return (
    <PatternPage
      name="Login Form"
      description="Clean sign-in form with email, password, remember-me checkbox, and inline validation. Built with react-hook-form and Zod for type-safe schema validation — errors appear instantly on blur."
      preview={<LoginFormPreview />}
      importCode={IMPORT_CODE}
      usageCode={USAGE_CODE}
      props={[
        {
          name: "schema",
          type: "ZodObject",
          description: "Zod validation schema. Email must be a valid address; password requires minimum 8 characters.",
        },
        {
          name: "register",
          type: "UseFormRegister<FormValues>",
          description: "react-hook-form register function — wires native inputs to the form state.",
        },
        {
          name: "handleSubmit",
          type: "(handler) => FormEventHandler",
          description: "Wraps your submit handler to run validation first and only call your function when the form is valid.",
        },
        {
          name: "errors",
          type: "FieldErrors<FormValues>",
          description: "Validation error messages keyed by field name, displayed as red helper text beneath each input.",
        },
        {
          name: "isSubmitting",
          type: "boolean",
          description: "True while the submit handler is pending. Used to disable the submit button and show a loading label.",
        },
      ]}
      a11yNotes={[
        "All inputs have explicit <Label> elements connected via htmlFor/id pairs.",
        "aria-invalid is set on inputs that have validation errors.",
        "Error messages are rendered in <p> elements adjacent to the field — screen readers read them in context.",
        "The submit button is disabled while submitting to prevent duplicate submissions.",
        "noValidate on the form disables native browser validation so custom messages are always shown.",
      ]}
      cliInstall="pnpm add react-hook-form zod @hookform/resolvers"
    />
  )
}
