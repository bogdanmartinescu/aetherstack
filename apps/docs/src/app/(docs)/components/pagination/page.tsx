import type { Metadata } from "next"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Pagination",
  description: "Navigation controls for moving through paginated content. Renders semantic <nav> and <a> elements.",
}

const MANUAL_SOURCE = `import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
  ),
)

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn("", className)} {...props} />,
)

type PaginationLinkProps = { isActive?: boolean } & React.ComponentProps<"a">

function PaginationLink({ className, isActive, ...props }: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({ variant: isActive ? "outline" : "ghost", size: "icon" }),
        className,
      )}
      {...props}
    />
  )
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Go to previous page" className={cn("gap-1 pl-2.5", className)} {...props}>
      <ChevronLeftIcon className="h-4 w-4" />
      <span>Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Go to next page" className={cn("gap-1 pr-2.5", className)} {...props}>
      <span>Next</span>
      <ChevronRightIcon className="h-4 w-4" />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span aria-hidden className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>
      <MoreHorizontalIcon className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}`

export default function PaginationPage() {
  return (
    <ComponentPage
      name="Pagination"
      description="Navigation controls for moving through multi-page content. Renders a semantic <nav> with <a> links — no JavaScript required for basic usage."
      features={[
        "Renders semantic <nav role='navigation'> and <a> elements",
        "PaginationLink marks the active page with aria-current='page'",
        "PaginationPrevious and PaginationNext have built-in aria-labels",
        "PaginationEllipsis is aria-hidden with a screen-reader-only label",
        "Unstyled <a> links — works with any router (href, Link, etc.)",
        "No JavaScript required — fully functional with plain href attributes",
      ]}
      preview={
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">5</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      }
      previewCode={`import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"

export function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}`}
      cliInstall={`npx aether-ui add pagination`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install lucide-react`,
          filename: "terminal",
        },
        {
          title: "Add the Button component (used for buttonVariants)",
          code: `npx aether-ui add button`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Basic",
          description: "5 pages with the current page highlighted using isActive.",
          preview: (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
          code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="/posts?page=2" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/posts?page=1">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/posts?page=2">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/posts?page=3" isActive>3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/posts?page=4">4</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/posts?page=5">5</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="/posts?page=4" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
        },
        {
          title: "With ellipsis",
          description: "Use PaginationEllipsis to indicate hidden page ranges for large page counts.",
          preview: (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">8</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>9</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">10</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">24</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
          code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="/posts?page=8" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/posts?page=1">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/posts?page=8">8</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/posts?page=9" isActive>9</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/posts?page=10">10</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/posts?page=24">24</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="/posts?page=10" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
        },
      ]}
      props={[
        {
          name: "isActive",
          type: "boolean",
          default: "false",
          description: "Marks this link as the current page — applies outline style and sets aria-current='page'.",
        },
        {
          name: "href",
          type: "string",
          description: "The URL this pagination link points to.",
        },
      ]}
      propGroups={[
        {
          title: "PaginationPrevious / PaginationNext",
          props: [
            {
              name: "href",
              type: "string",
              description: "URL for the previous or next page.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional class names merged onto the link.",
            },
          ],
        },
        {
          title: "PaginationEllipsis",
          props: [
            {
              name: "className",
              type: "string",
              description: "Additional class names for the ellipsis span.",
            },
          ],
        },
      ]}
      a11yNotes={[
        "Wrapped in <nav role='navigation' aria-label='pagination'> for screen reader landmark navigation.",
        "Active page link has aria-current='page' — screen readers announce it as the current page.",
        "PaginationPrevious has aria-label='Go to previous page'; PaginationNext has 'Go to next page'.",
        "PaginationEllipsis is aria-hidden with a visually hidden 'More pages' span for screen readers.",
        "Use real href values — not # — so keyboard users and screen readers can navigate correctly.",
      ]}
    />
  )
}
