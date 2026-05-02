import type { Metadata } from "next"
import { FeaturesSection } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "Features Section",
  description: "A features showcase with icon, title, and description per feature in a grid.",
}

export default function FeaturesSectionPage() {
  return (
    <BlockPage
      name="Features Section"
      category="Marketing"
      description="A features showcase with optional eyebrow, headline, and subheading, followed by a responsive card grid. Each card supports an icon, title, and description. Supports 2, 3, or 4 column layouts and a list variant."
      cliInstall="npx aether-ui add features-section"
      previewScale={0.7}
      previewHeight="520px"
      importCode={`import { FeaturesSection } from "@aetherstack/blocks"`}
      usageCode={`import { FeaturesSection } from "@aetherstack/blocks"

export default function FeaturesPage() {
  return (
    <FeaturesSection
      eyebrow="Features"
      headline="Everything you need"
      subheading="Ship production-ready interfaces without starting from scratch."
      cols={3}
      features={[
        { title: "Open code", description: "Copy components directly into your project — you own the source." },
        { title: "Token-driven", description: "Every visual value is a CSS custom property you can override." },
        { title: "Accessible", description: "Built on Radix UI primitives with WCAG 2.1 AA compliance." },
      ]}
    />
  )
}`}
      preview={
        <FeaturesSection
          eyebrow="Features"
          headline="Everything you need to ship"
          subheading="Production-ready components, tokens, patterns, and blocks — all in one system."
          cols={3}
          features={[
            { title: "Open code", description: "Copy components directly into your project. You own and control every file." },
            { title: "Token-driven", description: "Every visual value is a CSS custom property. Override anything without forking." },
            { title: "Accessible", description: "Built on Radix UI primitives with WCAG 2.1 AA compliance out of the box." },
            { title: "Dark mode", description: "Light and dark themes via CSS variables. Respects system preference automatically." },
            { title: "TypeScript", description: "Fully typed props and exported interfaces for every component." },
            { title: "CLI installer", description: "One command to add any component, pattern, or block to your project." },
          ]}
        />
      }
      props={[
        { name: "features", type: "{ icon?: ReactNode; title: string; description: string }[]", required: true, description: "Array of feature items to display." },
        { name: "eyebrow", type: "string", description: "Small uppercase label above the headline." },
        { name: "headline", type: "string", description: "Section heading." },
        { name: "subheading", type: "string", description: "Supporting paragraph below the headline." },
        { name: "cols", type: "2 | 3 | 4", default: "3", description: "Grid column count." },
        { name: "layout", type: "'grid' | 'list'", default: "'grid'", description: "Card grid or alternating list layout." },
        { name: "className", type: "string", description: "Additional classes on the section wrapper." },
      ]}
      a11yNotes={[
        "Feature icons are decorative; the title and description carry the meaning.",
        "Uses semantic <section> element for landmark navigation.",
      ]}
    />
  )
}
