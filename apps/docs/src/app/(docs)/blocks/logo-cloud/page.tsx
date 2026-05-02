import type { Metadata } from "next"
import { LogoCloud } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "Logo Cloud",
  description: "A partner/trusted-by logo grid with optional greyscale filter.",
}

export default function LogoCloudPage() {
  return (
    <BlockPage
      name="Logo Cloud"
      category="Marketing"
      description="A partner or trusted-by logo grid with an optional headline and configurable greyscale filter. Logos can be images, custom icon nodes, or plain text names."
      cliInstall="npx aether-ui add logo-cloud"
      previewHeight="180px"
      importCode={`import { LogoCloud } from "@aetherstack/blocks"`}
      usageCode={`import { LogoCloud } from "@aetherstack/blocks"

export default function TrustedBy() {
  return (
    <LogoCloud
      headline="Trusted by teams at"
      grayscale
      logos={[
        { name: "Vercel" },
        { name: "Stripe" },
        { name: "Linear" },
        { name: "Notion" },
        { name: "Figma" },
        { name: "Supabase" },
      ]}
    />
  )
}`}
      preview={
        <LogoCloud
          headline="Trusted by teams at"
          grayscale
          logos={[
            { name: "Vercel" },
            { name: "Stripe" },
            { name: "Linear" },
            { name: "Notion" },
            { name: "Figma" },
            { name: "Supabase" },
          ]}
        />
      }
      props={[
        { name: "logos", type: "{ name: string; src?: string; icon?: ReactNode; href?: string }[]", required: true, description: "Logo items. Use src for images, icon for custom SVGs, or omit both for text-only display." },
        { name: "headline", type: "string", description: "Optional label above the logo grid." },
        { name: "grayscale", type: "boolean", default: "true", description: "Apply greyscale filter with hover to full colour." },
        { name: "className", type: "string", description: "Additional classes on the section wrapper." },
      ]}
      a11yNotes={[
        "Logo images include an alt attribute set to the logo name.",
        "Logo links include aria-label set to the logo name.",
        "Text-only logos are visible to all users without requiring image support.",
      ]}
    />
  )
}
