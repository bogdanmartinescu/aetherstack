import { SocialButton } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"
import { SOCIAL_BUTTON_SOURCE } from "@/lib/registry-source"

export default function SocialButtonPage() {
  return (
    <ComponentPage
      name="Social Button"
      description="Sign in or sign up with a named provider."
      features={[
        "Six providers: Google, Apple, Microsoft, GitHub, GitLab, Slack",
        "Verb presets for sign-in, sign-up, or continue flows",
        "Outline, brand marker, and icon-only layouts",
        "Loading state without accidental form submit",
      ]}
      preview={<SocialButton provider="google" variant="outline" />}
      previewCode={`import { SocialButton } from "@/components/ui/social-button"

export function SocialButtonDemo() {
  return <SocialButton provider="google" variant="outline" />
}`}
      cliInstall="npx aether-ui add social-button"
      manualInstallCode={SOCIAL_BUTTON_SOURCE}
      manualSteps={[
        {
          title: "Add the button registry dependency",
          code: "npx aether-ui add button",
          filename: "terminal",
        },
      ]}
      examples={[]}
      props={[
        {
          name: "provider",
          type: "SocialProvider",
          required: true,
          description: "OAuth provider key (google, apple, microsoft, github, gitlab, slack).",
        },
        {
          name: "verb",
          type: '"Sign in" | "Sign up" | "Continue"',
          default: '"Sign in"',
          description: "Leading phrase in the button label.",
        },
        {
          name: "variant",
          type: '"outline" | "brand" | "icon"',
          default: '"outline"',
          description: "Outline shows glyph and label; icon is glyph-only with aria-label.",
        },
        {
          name: "loading",
          type: "boolean",
          description: "Shows busy state and blocks clicks.",
        },
        {
          name: "onClick",
          type: "(event: React.MouseEvent<HTMLButtonElement>) => void",
          description: "Called when the button is pressed.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes on the underlying button.",
        },
      ]}
      a11yNotes={[
        "Icon variant exposes the full “{verb} with {Provider}” string as aria-label.",
        'type="button" is always set so loading does not submit parent forms.',
      ]}
    />
  )
}
