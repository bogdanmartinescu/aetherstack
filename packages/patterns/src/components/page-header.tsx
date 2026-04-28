import * as React from "react"
import { cn } from "@aetherstack/utils"

// ── Breadcrumb ────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-2", className)}>
      <ol className="flex flex-wrap items-center gap-x-1.5 text-sm text-muted-foreground">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <React.Fragment key={i}>
              <li>
                {item.href && !isLast ? (
                  <a
                    href={item.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={cn(isLast && "text-foreground font-medium")}
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true" className="select-none">
                  /
                </li>
              )}
            </React.Fragment>
          )
        })}
      </ol>
    </nav>
  )
}

// ── PageHeader ─────────────────────────────────────────────────────────────────

export interface PageHeaderProps {
  title: string
  description?: string
  breadcrumb?: BreadcrumbItem[]
  /** Right-aligned slot for primary actions (buttons, menus, etc.) */
  actions?: React.ReactNode
  className?: string
}

export function PageHeader({
  title,
  description,
  breadcrumb,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-6", className)}>
      {breadcrumb && breadcrumb.length > 0 && (
        <Breadcrumb items={breadcrumb} />
      )}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}
