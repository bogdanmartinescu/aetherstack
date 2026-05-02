import type { Metadata } from "next"
import { FooterSection } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "Footer Section",
  description: "A multi-column site footer with links, social icons, and copyright line.",
}

export default function FooterSectionPage() {
  return (
    <BlockPage
      name="Footer Section"
      category="App navigation"
      description="A multi-column site footer with brand tagline, link columns, social links, legal links, and a copyright line. Responsive grid that stacks on mobile."
      cliInstall="npx aether-ui add footer-section"
      previewScale={0.75}
      previewHeight="340px"
      importCode={`import { FooterSection } from "@aetherstack/blocks"`}
      usageCode={`import { FooterSection } from "@aetherstack/blocks"

export default function SiteFooter() {
  return (
    <FooterSection
      brand="Acme"
      tagline="Build beautiful products faster."
      columns={[
        {
          title: "Product",
          links: [
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About", href: "/about" },
            { label: "Blog", href: "/blog" },
          ],
        },
      ]}
      socialLinks={[
        { platform: "GitHub", href: "https://github.com" },
        { platform: "Twitter", href: "https://twitter.com" },
      ]}
      legalLinks={[
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ]}
    />
  )
}`}
      preview={
        <FooterSection
          brand="Acme"
          tagline="Build beautiful products faster."
          columns={[
            {
              title: "Product",
              links: [
                { label: "Features", href: "#" },
                { label: "Pricing", href: "#" },
                { label: "Changelog", href: "#" },
              ],
            },
            {
              title: "Developers",
              links: [
                { label: "Documentation", href: "#" },
                { label: "API Reference", href: "#" },
                { label: "GitHub", href: "#" },
              ],
            },
            {
              title: "Company",
              links: [
                { label: "About", href: "#" },
                { label: "Blog", href: "#" },
                { label: "Careers", href: "#" },
              ],
            },
          ]}
          socialLinks={[
            { platform: "GitHub", href: "#" },
            { platform: "Twitter", href: "#" },
            { platform: "LinkedIn", href: "#" },
          ]}
          legalLinks={[
            { label: "Privacy", href: "#" },
            { label: "Terms", href: "#" },
          ]}
          copyright="© 2026 Acme Inc. All rights reserved."
        />
      }
      props={[
        { name: "brand", type: "string", description: "Brand name displayed in the first column." },
        { name: "tagline", type: "string", description: "Short tagline below the brand name." },
        { name: "columns", type: "{ title: string; links: { label: string; href: string }[] }[]", description: "Link columns rendered after the brand column." },
        { name: "socialLinks", type: "{ platform: string; href: string; icon?: ReactNode }[]", description: "Social links in the brand column." },
        { name: "legalLinks", type: "{ label: string; href: string }[]", description: "Legal links in the bottom bar." },
        { name: "copyright", type: "string", description: "Copyright text. Defaults to '© {year} {brand}. All rights reserved.'." },
        { name: "className", type: "string", description: "Additional classes on the footer element." },
      ]}
      a11yNotes={[
        "Social links include aria-label set to the platform name for screen readers.",
        "The footer uses the semantic <footer> element.",
      ]}
    />
  )
}
