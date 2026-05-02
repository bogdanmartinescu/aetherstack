import type { Metadata } from "next"
import { AspectRatio } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Aspect Ratio",
  description: "Constrains content to a given width/height ratio using Radix UI.",
}

const MANUAL_SOURCE = `import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = AspectRatioPrimitive.Root
AspectRatio.displayName = "AspectRatio"

export { AspectRatio }`

export default function AspectRatioPage() {
  return (
    <ComponentPage
      name="Aspect Ratio"
      description="Constrains content to a given width/height ratio using Radix UI. Useful for images, videos, and embed containers that must maintain a consistent shape across viewports."
      radixSource="https://www.radix-ui.com/primitives/docs/components/aspect-ratio"
      features={[
        "Wraps any content in a fixed ratio container",
        "Accepts any valid CSS ratio (16/9, 4/3, 1, etc.)",
        "Uses Radix UI AspectRatio primitive",
      ]}
      preview={
        <div className="w-full max-w-sm">
          <AspectRatio ratio={16 / 9}>
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted text-muted-foreground text-sm font-medium">
              16:9
            </div>
          </AspectRatio>
        </div>
      }
      previewCode={`import { AspectRatio } from "@/components/ui/aspect-ratio"

export function AspectRatioDemo() {
  return (
    <div className="w-full max-w-sm">
      <AspectRatio ratio={16 / 9}>
        <img
          src="/placeholder.jpg"
          alt="placeholder"
          className="h-full w-full rounded-lg object-cover"
        />
      </AspectRatio>
    </div>
  )
}`}
      cliInstall={`npx aether-ui add aspect-ratio`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-aspect-ratio`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Image with 16:9 ratio",
          description: "Use AspectRatio to constrain an image to a specific ratio without layout shift.",
          preview: (
            <div className="w-full max-w-xs">
              <AspectRatio ratio={16 / 9}>
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 text-primary text-sm font-medium">
                  16 : 9
                </div>
              </AspectRatio>
            </div>
          ),
          code: `<AspectRatio ratio={16 / 9}>
  <img src="/hero.jpg" alt="hero" className="h-full w-full object-cover rounded-lg" />
</AspectRatio>`,
        },
        {
          title: "Square (1:1)",
          description: "Use ratio={1} for square thumbnails and avatar containers.",
          preview: (
            <div className="w-32">
              <AspectRatio ratio={1}>
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted text-muted-foreground text-sm font-medium">
                  1:1
                </div>
              </AspectRatio>
            </div>
          ),
          code: `<div className="w-32">
  <AspectRatio ratio={1}>
    <img src="/avatar.jpg" alt="avatar" className="h-full w-full rounded-lg object-cover" />
  </AspectRatio>
</div>`,
        },
        {
          title: "4:3 classic",
          description: "Traditional photo and presentation aspect ratio.",
          preview: (
            <div className="w-full max-w-xs">
              <AspectRatio ratio={4 / 3}>
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted text-muted-foreground text-sm font-medium">
                  4:3
                </div>
              </AspectRatio>
            </div>
          ),
          code: `<AspectRatio ratio={4 / 3}>
  <img src="/photo.jpg" alt="photo" className="h-full w-full object-cover rounded-lg" />
</AspectRatio>`,
        },
      ]}
      props={[
        {
          name: "ratio",
          type: "number",
          default: "1",
          description: "The desired width/height ratio. Pass a fraction like 16/9 or a decimal like 1.78.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional Tailwind classes for the container element.",
        },
      ]}
      a11yNotes={[
        "AspectRatio is a layout utility — it has no implicit ARIA role.",
        "Ensure child images have meaningful alt text; the ratio wrapper itself is transparent to assistive technology.",
        "Do not use for decorative images that should be hidden from screen readers — add aria-hidden to the image instead.",
      ]}
    />
  )
}
