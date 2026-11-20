import { Star } from "lucide-react"
import { cn } from "@aetherstack/utils"
import { Avatar, AvatarFallback, AvatarImage, Card, CardContent } from "@aetherstack/ui"

export interface Testimonial {
  id: string
  quote: string
  author: string
  role?: string
  company?: string
  avatarUrl?: string
  rating?: number
}

export interface TestimonialsSectionProps {
  eyebrow?: string
  headline?: string
  testimonials: Testimonial[]
  cols?: 2 | 3
  className?: string
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating ? "fill-primary text-primary" : "fill-muted text-muted",
          )}
          aria-hidden
        />
      ))}
    </div>
  )
}

export function TestimonialsSection({
  eyebrow,
  headline,
  testimonials,
  cols = 3,
  className,
}: TestimonialsSectionProps) {
  return (
    <section className={cn("w-full px-4 py-16", className)}>
      {(eyebrow || headline) && (
        <div className="mx-auto mb-12 max-w-2xl text-center">
          {eyebrow && (
            <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
              {eyebrow}
            </p>
          )}
          {headline && (
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              {headline}
            </h2>
          )}
        </div>
      )}

      <div
        className={cn(
          "mx-auto grid max-w-6xl gap-6",
          cols === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {testimonials.map((t) => (
          <Card key={t.id} className="border-border bg-card flex flex-col">
            <CardContent className="flex flex-1 flex-col gap-4 pt-6">
              {t.rating !== undefined && <StarRating rating={t.rating} />}
              <blockquote className="text-foreground flex-1 text-sm leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={t.avatarUrl} alt={t.author} />
                  <AvatarFallback>
                    {t.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-foreground text-sm font-semibold">{t.author}</p>
                  {(t.role || t.company) && (
                    <p className="text-muted-foreground text-xs">
                      {[t.role, t.company].filter(Boolean).join(", ")}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
