import type { Metadata } from "next"
import { MarketingNavbar } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "Marketing Navbar",
  description: "A sticky marketing site navigation with logo, links, and a CTA button.",
}

export default function MarketingNavbarPage() {
  return (
    <BlockPage
      name="Marketing Navbar"
      category="App navigation"
      description="A sticky marketing site navigation bar with logo, centred nav links, and a CTA button. Collapses to a hamburger sheet on mobile. Backdrop-blur applied on scroll."
      cliInstall="npx aether-ui add marketing-navbar"
      previewHeight="80px"
      importCode={`import { MarketingNavbar } from "@aetherstack/blocks"`}
      usageCode={`import { MarketingNavbar } from "@aetherstack/blocks"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarketingNavbar
        brand="Acme"
        navItems={[
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Blog", href: "/blog" },
        ]}
        cta={{ label: "Get started", href: "/signup" }}
      />
      {children}
    </>
  )
}`}
      preview={
        <MarketingNavbar
          brand="Acme"
          navItems={[
            { label: "Features", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "Changelog", href: "#" },
            { label: "Blog", href: "#" },
          ]}
          cta={{ label: "Get started", href: "#" }}
        />
      }
      props={[
        { name: "brand", type: "string", description: "Brand name text rendered next to the logo." },
        { name: "logo", type: "ReactNode", description: "Custom logo element." },
        { name: "navItems", type: "{ label: string; href: string }[]", description: "Navigation link items." },
        { name: "cta", type: "{ label: string; href: string; variant?: 'default' | 'outline' }", description: "Call-to-action button in the top right." },
        { name: "className", type: "string", description: "Additional classes on the header element." },
      ]}
      a11yNotes={[
        "Desktop nav is wrapped in <nav aria-label='Marketing navigation'>.",
        "Mobile sheet has its own <nav aria-label='Mobile marketing navigation'>.",
        "Hamburger button includes aria-label='Open menu'.",
      ]}
    />
  )
}
