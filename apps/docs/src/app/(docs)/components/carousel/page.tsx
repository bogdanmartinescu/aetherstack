import type { Metadata } from "next"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Carousel",
  description: "A touch-friendly slider built on Embla Carousel with prev/next navigation.",
}

const MANUAL_SOURCE = `"use client"

import * as React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]

// Full source: packages/ui/src/components/carousel.tsx`

export default function CarouselPage() {
  return (
    <ComponentPage
      name="Carousel"
      description="A touch-friendly slider built on Embla Carousel with prev/next navigation and full keyboard accessibility. Supports horizontal and vertical orientations and an optional external API handle."
      features={[
        "Horizontal and vertical orientations",
        "Keyboard accessible",
        "Prev/Next button controls",
        "Built on embla-carousel-react",
      ]}
      preview={
        <div className="w-full max-w-xs px-10">
          <Carousel>
            <CarouselContent>
              {[1, 2, 3].map((n) => (
                <CarouselItem key={n}>
                  <div className="flex h-32 items-center justify-center rounded-lg border border-border bg-muted text-2xl font-bold text-muted-foreground">
                    {n}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      }
      previewCode={`import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

export function CarouselDemo() {
  return (
    <div className="w-full max-w-xs px-10">
      <Carousel>
        <CarouselContent>
          {[1, 2, 3].map((n) => (
            <CarouselItem key={n}>
              <div className="flex h-32 items-center justify-center rounded-lg border bg-muted text-2xl font-bold">
                {n}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}`}
      cliInstall={`npx aether-ui add carousel`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install embla-carousel-react lucide-react`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Multi-item per view",
          description: "Show multiple slides at once using basis classes on CarouselItem.",
          preview: (
            <div className="w-full max-w-sm px-10">
              <Carousel>
                <CarouselContent>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <CarouselItem key={n} className="basis-1/3">
                      <div className="flex h-24 items-center justify-center rounded-lg border border-border bg-muted text-lg font-bold text-muted-foreground">
                        {n}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          ),
          code: `<Carousel>
  <CarouselContent>
    {items.map((item) => (
      <CarouselItem key={item.id} className="basis-1/3">
        <Card>{item.content}</Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
        },
        {
          title: "Loop mode",
          description: "Pass opts to Embla to enable infinite loop scrolling.",
          preview: (
            <div className="w-full max-w-xs px-10">
              <Carousel opts={{ loop: true }}>
                <CarouselContent>
                  {["A", "B", "C"].map((s) => (
                    <CarouselItem key={s}>
                      <div className="flex h-28 items-center justify-center rounded-lg border border-border bg-muted text-2xl font-bold text-muted-foreground">
                        {s}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          ),
          code: `<Carousel opts={{ loop: true }}>
  <CarouselContent>
    {slides.map((slide) => (
      <CarouselItem key={slide.id}>{slide.content}</CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
        },
      ]}
      props={[]}
      propGroups={[
        {
          title: "Carousel",
          props: [
            {
              name: "opts",
              type: "EmblaOptionsType",
              description: "Options passed directly to Embla Carousel (e.g. loop, align, skipSnaps).",
            },
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              default: '"horizontal"',
              description: "Scroll axis of the carousel.",
            },
            {
              name: "setApi",
              type: "(api: CarouselApi) => void",
              description: "Callback to receive the Embla API instance for programmatic control.",
            },
            {
              name: "plugins",
              type: "EmblaPluginType[]",
              description: "Embla plugins array (e.g. Autoplay).",
            },
          ],
        },
        {
          title: "CarouselItem",
          props: [
            {
              name: "className",
              type: "string",
              description: "Use basis-* classes (e.g. basis-1/3) to show multiple slides per view.",
            },
          ],
        },
        {
          title: "CarouselPrevious / CarouselNext",
          props: [
            {
              name: "variant",
              type: "ButtonVariant",
              default: '"outline"',
              description: "Button variant passed to the underlying Button component.",
            },
            {
              name: "size",
              type: "ButtonSize",
              default: '"icon"',
              description: "Button size passed to the underlying Button component.",
            },
          ],
        },
      ]}
      a11yNotes={[
        "The root Carousel element has role='region' and aria-roledescription='carousel'.",
        "Each CarouselItem has role='group' and aria-roledescription='slide'.",
        "CarouselPrevious and CarouselNext contain sr-only text for screen reader announcement.",
        "Arrow key navigation (left/right) is handled via onKeyDownCapture on the root element.",
      ]}
    />
  )
}
