import type { Metadata } from "next"
import { SignupBlock } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign-up form with name, email, and password fields and inline validation.",
}

export default function SignupBlockPage() {
  return (
    <BlockPage
      name="Sign Up"
      category="Auth"
      description="A centered sign-up form with full name, email, and password fields. Includes inline validation, a terms/privacy footer, and a link back to the login page."
      cliInstall="npx aether-ui add signup-block"
      previewHeight="520px"
      importCode={`import { SignupBlock } from "@aetherstack/blocks"`}
      usageCode={`import { SignupBlock } from "@aetherstack/blocks"

export default function SignupPage() {
  return (
    <SignupBlock
      appName="Acme"
      tagline="Create your account to get started."
      onSubmit={async ({ name, email, password }) => {
        await createAccount({ name, email, password })
      }}
      signInHref="/login"
      termsHref="/terms"
      privacyHref="/privacy"
    />
  )
}`}
      preview={
        <SignupBlock
          appName="Acme"
          tagline="Create your account to get started."
        />
      }
      props={[
        { name: "appName", type: "string", default: '"Aether UI"', description: "Product name displayed above the form." },
        { name: "tagline", type: "string", description: "Short tagline below the app name." },
        { name: "onSubmit", type: "(values: { name, email, password }) => void", description: "Called with validated form data on submit." },
        { name: "signInHref", type: "string", default: '"/login"', description: "URL for the existing account sign-in link." },
        { name: "termsHref", type: "string", default: '"/terms"', description: "URL for the terms of service link in the footer." },
        { name: "privacyHref", type: "string", default: '"/privacy"', description: "URL for the privacy policy link in the footer." },
        { name: "className", type: "string", description: "Additional classes on the root wrapper." },
      ]}
      a11yNotes={[
        "All form fields are labelled via visible labels and htmlFor/id associations.",
        "Inline validation errors are rendered adjacent to each field.",
        "The password field uses type=\"password\" for native browser masking.",
        "Terms and privacy links open in the same tab by default — set target=\"_blank\" if needed.",
      ]}
    />
  )
}
