import type { Metadata } from "next"
import { LoginBlock } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "Login",
  description: "Centered login card with email, password, remember-me, and forgot-password link.",
}

export default function LoginBlockPage() {
  return (
    <BlockPage
      name="Login"
      category="Auth"
      description="A centered login card with email, password, remember-me checkbox, and forgot-password link. Includes inline field validation. Optionally renders a split-panel layout with a custom left side."
      cliInstall="npx aether-ui add login-block"
      previewHeight="480px"
      importCode={`import { LoginBlock } from "@aetherstack/blocks"`}
      usageCode={`import { LoginBlock } from "@aetherstack/blocks"

export default function LoginPage() {
  return (
    <LoginBlock
      appName="Acme"
      tagline="Welcome back — sign in to continue."
      onSubmit={async ({ email, password }) => {
        await signIn(email, password)
      }}
      signUpHref="/signup"
      forgotPasswordHref="/forgot-password"
    />
  )
}`}
      preview={
        <LoginBlock
          appName="Acme"
          tagline="Welcome back — sign in to continue."
        />
      }
      props={[
        { name: "appName", type: "string", default: '"Aether UI"', description: "Product name displayed above the form." },
        { name: "tagline", type: "string", description: "Short tagline displayed below the app name." },
        { name: "onSubmit", type: "(values: { email, password, remember }) => void", description: "Called with validated form data on submit." },
        { name: "signUpHref", type: "string", default: '"/signup"', description: "URL for the sign-up link." },
        { name: "forgotPasswordHref", type: "string", default: '"/forgot-password"', description: "URL for the forgot-password link." },
        { name: "panel", type: "ReactNode", description: "Optional content to show in the left panel of a split-screen layout." },
        { name: "className", type: "string", description: "Additional classes on the root wrapper." },
      ]}
      a11yNotes={[
        "All form fields are labelled via visible labels and htmlFor/id associations.",
        "Inline validation errors are rendered adjacent to each field with role=\"alert\" to announce changes.",
        "The remember-me checkbox uses the Checkbox primitive which has proper aria-checked state.",
      ]}
    />
  )
}
