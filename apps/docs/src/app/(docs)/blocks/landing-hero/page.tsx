import type { Metadata } from "next"
import { LandingHero } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "Landing Hero",
  description: "A hero section with headline, subheading, dual CTAs, and optional media slot.",
}

export default function LandingHeroPage() {
  return (
    <BlockPage
      name="Landing Hero"
      category="Marketing"
      description="A hero section with headline, subheading, dual CTAs, and an optional media slot. Supports an eyebrow badge, large responsive typography, and side-by-side CTA buttons."
      cliInstall="npx aether-ui add landing-hero"
      previewScale={0.75}
      previewHeight="420px"
      importCode={`import { LandingHero } from "@aetherstack/blocks"`}
      usageCode={`import { LandingHero } from "@aetherstack/blocks"

export default function HeroPage() {
  return (
    <LandingHero
      eyebrow="Now in public beta"
      headline="Build faster with Aether UI"
      subheading="Token-driven, accessible, open-code components for React and Next.js."
      primaryCta={{ label: "Get started", href: "/docs" }}
      secondaryCta={{ label: "View on GitHub", href: "https://github.com" }}
    />
  )
}`}
      preview={
        <LandingHero
          eyebrow="Now in public beta"
          headline="Build faster with Aether UI"
          subheading="Token-driven, accessible, open-code components for React and Next.js. Ship production-ready interfaces in minutes."
          primaryCta={{ label: "Get started free", href: "#" }}
          secondaryCta={{ label: "View on GitHub", href: "#" }}
        />
      }
      props={[
        { name: "headline", type: "string", required: true, description: "The primary heading text." },
        { name: "eyebrow", type: "string", description: "Small badge label shown above the headline." },
        { name: "subheading", type: "string", description: "Supporting paragraph below the headline." },
        { name: "primaryCta", type: "{ label: string; href: string }", description: "Primary call-to-action button." },
        { name: "secondaryCta", type: "{ label: string; href: string }", description: "Secondary outline CTA button." },
        { name: "media", type: "ReactNode", description: "Optional media element (image, video, screenshot) below the CTAs." },
        { name: "className", type: "string", description: "Additional classes on the section wrapper." },
      ]}
      a11yNotes={[
        "The headline renders as an <h1> — do not nest this inside another page <h1>.",
        "CTA links use <a> via Button asChild — include meaningful link text.",
        "The eyebrow badge is decorative; the heading provides the primary context.",
      ]}
    />
  )
}
