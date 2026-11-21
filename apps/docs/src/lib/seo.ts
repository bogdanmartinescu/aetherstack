/**
 * Central SEO helpers for the documentation site.
 *
 * Every indexable route gets a unique title, description, canonical URL and
 * social preview from here. Registry-backed pages (components, patterns, blocks)
 * derive their text from the canonical registry manifest, so the metadata cannot
 * drift from what the registry actually ships.
 */
import type { Metadata } from "next"
import registry from "../../../../registry/public/registry.json"

export const SITE_URL = "https://aether-ui.dev"
export const SITE_NAME = "Aether UI"
export const GITHUB_URL = "https://github.com/bogdanmartinescu/aetherstack"
export const OG_IMAGE_URL = `${SITE_URL}/og.png`
export const OG_IMAGE_ALT = "Aether UI: open-code React components for SaaS and AI products"

const MAX_DESCRIPTION = 160

interface RegistryEntry {
  name: string
  type: string
  title: string
  description: string
}

export type RegistryItemType = "registry:ui" | "registry:pattern" | "registry:block"

const ITEMS = (registry as { items: RegistryEntry[] }).items

const SECTIONS: Record<RegistryItemType, { path: string; heading: string; kind: string }> = {
  "registry:ui": { path: "components", heading: "Components", kind: "component" },
  "registry:pattern": { path: "patterns", heading: "Patterns", kind: "pattern" },
  "registry:block": { path: "blocks", heading: "Blocks", kind: "block" },
}

function withSlashes(path: string): string {
  const trimmed = path.replace(/^\/+|\/+$/g, "")
  return trimmed === "" ? "/" : `/${trimmed}/`
}

/** Cut text at a word boundary so it fits `max` characters. */
function clamp(text: string, max: number): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(" ")
  return `${(lastSpace > 40 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:—-]+$/, "")}…`
}

export interface PageSeo {
  /** Page title. The site name is appended unless already present. */
  title: string
  description: string
  /** Route path, for example `/components/button`. */
  path: string
  noindex?: boolean
}

export function pageMetadata({ title, description, path, noindex = false }: PageSeo): Metadata {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`
  const url = `${SITE_URL}${withSlashes(path)}`
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      title: fullTitle,
      description,
      url,
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: OG_IMAGE_ALT }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE_URL],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}

function findItem(type: RegistryItemType, name: string): RegistryEntry {
  const item = ITEMS.find((entry) => entry.type === type && entry.name === name)
  if (!item) {
    throw new Error(`SEO: registry item ${type}/${name} not found in registry/public/registry.json`)
  }
  return item
}

function itemDescription(item: RegistryEntry): string {
  const base = item.description.trim().replace(/[.\s]+$/, "")
  const install = `npx @aetherstack/cli add ${item.name}`
  const candidates = [
    `${base}. Open-code React source for your Tailwind project: install it with ${install}.`,
    `${base}. Add it with ${install}.`,
  ]
  const fit = candidates.find((text) => text.length <= MAX_DESCRIPTION)
  if (fit) return fit
  const tail = ` Add it with ${install}.`
  return `${clamp(base, MAX_DESCRIPTION - tail.length - 1)}.${tail}`
}

export function itemPath(type: RegistryItemType, name: string): string {
  return `/${SECTIONS[type].path}/${name}/`
}

export function itemMetadata(type: RegistryItemType, name: string): Metadata {
  const item = findItem(type, name)
  const { kind } = SECTIONS[type]
  return pageMetadata({
    title: `React ${item.title} ${kind}`,
    description: itemDescription(item),
    path: itemPath(type, name),
  })
}

export interface Crumb {
  name: string
  path: string
}

export function breadcrumbJsonLd(crumbs: Crumb[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${withSlashes(crumb.path)}`,
    })),
  }
}

export function itemBreadcrumbs(type: RegistryItemType, name: string): Record<string, unknown> {
  const item = findItem(type, name)
  const section = SECTIONS[type]
  return breadcrumbJsonLd([
    { name: SITE_NAME, path: "/" },
    { name: section.heading, path: `/${section.path}/` },
    { name: item.title, path: itemPath(type, name) },
  ])
}

export function pageBreadcrumbs(section: "patterns" | "forms", title: string, path: string) {
  const heading = section === "patterns" ? "Patterns" : "Forms"
  return breadcrumbJsonLd([
    { name: SITE_NAME, path: "/" },
    { name: heading, path: `/${section}/` },
    { name: title, path },
  ])
}
