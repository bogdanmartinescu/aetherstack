import { cn } from "@aetherstack/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@aetherstack/ui"

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface FAQSectionProps {
  eyebrow?: string
  headline?: string
  subheading?: string
  items: FAQItem[]
  className?: string
}

export function FAQSection({
  eyebrow,
  headline,
  subheading,
  items,
  className,
}: FAQSectionProps) {
  const hasSplitLayout = Boolean(headline || eyebrow || subheading)

  return (
    <section className={cn("w-full py-16 px-4", className)}>
      <div className="mx-auto max-w-6xl">
        {hasSplitLayout ? (
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: heading text */}
            <div className="lg:pt-2">
              {eyebrow && (
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                  {eyebrow}
                </p>
              )}
              {headline && (
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {headline}
                </h2>
              )}
              {subheading && (
                <p className="mt-4 text-base text-muted-foreground">{subheading}</p>
              )}
            </div>

            {/* Right: accordion */}
            <Accordion type="single" collapsible className="w-full">
              {items.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="text-left text-sm font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl">
            <Accordion type="single" collapsible className="w-full">
              {items.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="text-left text-sm font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </section>
  )
}
