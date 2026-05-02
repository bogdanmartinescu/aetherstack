"use client"

import { CodeBlock } from "@/components/code-block"
import { DocTabs } from "@/components/doc-tabs"

function Step({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
        {number}
      </div>
      <div className="flex-1 pb-8">
        <h3 className="mb-3 text-base font-semibold text-foreground">{title}</h3>
        {children}
      </div>
    </div>
  )
}

function FrameworkBadge({ name, emoji }: { name: string; emoji: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-2.5 py-1 text-sm font-medium text-foreground">
      <span>{emoji}</span>
      {name}
    </span>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">{children}</h2>
  )
}

// ─── Framework-specific install guides ───────────────────────────────────────

const nextjsAppRouterSteps = (
  <div className="space-y-0">
    <Step number={1} title="Create a new Next.js project (skip if you have one)">
      <CodeBlock
        code={`npx create-next-app@latest my-app --typescript --tailwind --eslint --app
cd my-app`}
        filename="terminal"
      />
      <p className="mt-3 text-sm text-muted-foreground">
        Make sure to select <strong>TypeScript</strong>, <strong>Tailwind CSS</strong>, and <strong>App Router</strong> when prompted.
      </p>
    </Step>

    <Step number={2} title="Install Aether UI dependencies">
      <CodeBlock
        code={`npm install @aetherstack/utils class-variance-authority tailwind-merge clsx
npm install @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-tabs
npm install @radix-ui/react-tooltip @radix-ui/react-select @radix-ui/react-checkbox
npm install @radix-ui/react-radio-group @radix-ui/react-switch @radix-ui/react-label
npm install lucide-react tailwindcss-animate`}
        filename="terminal"
      />
      <p className="mt-3 text-sm text-muted-foreground">
        Or with pnpm:
      </p>
      <CodeBlock
        code={`pnpm add @aetherstack/utils class-variance-authority tailwind-merge clsx
pnpm add @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-tabs
pnpm add @radix-ui/react-tooltip @radix-ui/react-select @radix-ui/react-checkbox
pnpm add @radix-ui/react-radio-group @radix-ui/react-switch @radix-ui/react-label
pnpm add lucide-react tailwindcss-animate`}
        filename="terminal"
      />
    </Step>

    <Step number={3} title="Configure tailwind.config.ts">
      <CodeBlock
        code={`import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"
import animatePlugin from "tailwindcss-animate"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
      },
    },
  },
  plugins: [animatePlugin],
}

export default config`}
        filename="tailwind.config.ts"
      />
    </Step>

    <Step number={4} title="Add CSS variables to globals.css">
      <CodeBlock
        code={`@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 274 66% 19%;
    --card: 0 0% 100%;
    --card-foreground: 274 66% 19%;
    --popover: 0 0% 100%;
    --popover-foreground: 274 66% 19%;
    --primary: 269 74% 57%;
    --primary-foreground: 0 0% 100%;
    --secondary: 0 0% 96%;
    --secondary-foreground: 272 57% 32%;
    --muted: 0 0% 96%;
    --muted-foreground: 0 0% 45%;
    --accent: 0 0% 96%;
    --accent-foreground: 272 57% 32%;
    --destructive: 0 72% 51%;
    --destructive-foreground: 0 0% 100%;
    --border: 0 0% 90%;
    --input: 0 0% 90%;
    --ring: 269 74% 57%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 274 66% 4%;
    --foreground: 0 0% 98%;
    --card: 272 57% 9%;
    --card-foreground: 0 0% 98%;
    --popover: 272 57% 9%;
    --popover-foreground: 0 0% 98%;
    --primary: 267 84% 65%;
    --primary-foreground: 274 66% 4%;
    --secondary: 0 0% 15%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 15%;
    --muted-foreground: 0 0% 64%;
    --accent: 0 0% 15%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 274 66% 4%;
    --border: 0 0% 15%;
    --input: 0 0% 15%;
    --ring: 267 84% 65%;
  }
}

@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground antialiased; }
}`}
        filename="src/app/globals.css"
      />
    </Step>

    <Step number={5} title="Set up fonts in layout.tsx">
      <CodeBlock
        code={`import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={\`\${fontSans.variable} \${fontMono.variable} font-sans\`}>
        {children}
      </body>
    </html>
  )
}`}
        filename="src/app/layout.tsx"
      />
    </Step>

    <Step number={6} title="Create the cn utility">
      <CodeBlock
        code={`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
        filename="src/lib/utils.ts"
      />
      <p className="mt-2 text-sm text-muted-foreground">
        If using <code className="rounded bg-muted px-1 font-mono text-xs">@aetherstack/utils</code>, this is already included — import{" "}
        <code className="rounded bg-muted px-1 font-mono text-xs">cn</code> from there instead.
      </p>
    </Step>

    <Step number={7} title="Add your first component">
      <CodeBlock
        code={`# Copy the Button component into your project
npx aether-ui add button`}
        filename="terminal"
      />
      <p className="mt-3 text-sm text-muted-foreground">
        The CLI writes the component source directly to{" "}
        <code className="rounded bg-muted px-1 font-mono text-xs">src/components/ui/button.tsx</code>.
        You own the code — edit it freely.
      </p>
    </Step>
  </div>
)

const nextjsPagesRouterSteps = (
  <div className="space-y-0">
    <Step number={1} title="Create a new Next.js project (skip if you have one)">
      <CodeBlock
        code={`npx create-next-app@latest my-app --typescript --tailwind --eslint
cd my-app`}
        filename="terminal"
      />
      <p className="mt-3 text-sm text-muted-foreground">
        Select <strong>TypeScript</strong>, <strong>Tailwind CSS</strong>. Do <strong>not</strong> enable App Router.
      </p>
    </Step>

    <Step number={2} title="Install Aether UI dependencies">
      <CodeBlock
        code={`npm install @aetherstack/utils class-variance-authority tailwind-merge clsx \\
  @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-tabs \\
  @radix-ui/react-tooltip @radix-ui/react-select @radix-ui/react-checkbox \\
  @radix-ui/react-radio-group @radix-ui/react-switch @radix-ui/react-label \\
  lucide-react tailwindcss-animate`}
        filename="terminal"
      />
    </Step>

    <Step number={3} title="Configure tailwind.config.ts">
      <p className="mb-3 text-sm text-muted-foreground">
        Same configuration as App Router — see the Next.js App Router guide above (Step 3).
        The only difference is the content paths:
      </p>
      <CodeBlock
        code={`content: [
  "./pages/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}",
],`}
        filename="tailwind.config.ts (content array only)"
      />
    </Step>

    <Step number={4} title="Add CSS variables to styles/globals.css">
      <p className="mb-3 text-sm text-muted-foreground">
        Same CSS variable block as the App Router guide (Step 4) — paste it into{" "}
        <code className="rounded bg-muted px-1 font-mono text-xs">styles/globals.css</code>.
      </p>
    </Step>

    <Step number={5} title="Set up fonts in _document.tsx">
      <CodeBlock
        code={`import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}`}
        filename="pages/_document.tsx"
      />
    </Step>

    <Step number={6} title="Add components and use them">
      <CodeBlock
        code={`npx aether-ui add button
npx aether-ui add input`}
        filename="terminal"
      />
      <CodeBlock
        code={`import { Button } from "@/components/ui/button"

export default function Home() {
  return <Button>Hello Aether</Button>
}`}
        filename="pages/index.tsx"
      />
    </Step>
  </div>
)

const viteReactSteps = (
  <div className="space-y-0">
    <Step number={1} title="Create a new Vite + React project">
      <CodeBlock
        code={`npm create vite@latest my-app -- --template react-ts
cd my-app
npm install`}
        filename="terminal"
      />
    </Step>

    <Step number={2} title="Install Tailwind CSS">
      <CodeBlock
        code={`npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`}
        filename="terminal"
      />
    </Step>

    <Step number={3} title="Install Aether UI dependencies">
      <CodeBlock
        code={`npm install @aetherstack/utils class-variance-authority tailwind-merge clsx \\
  @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-tabs \\
  @radix-ui/react-tooltip @radix-ui/react-select @radix-ui/react-checkbox \\
  @radix-ui/react-radio-group @radix-ui/react-switch @radix-ui/react-label \\
  lucide-react tailwindcss-animate`}
        filename="terminal"
      />
    </Step>

    <Step number={4} title="Configure tailwind.config.js">
      <CodeBlock
        code={`/** @type {import('tailwindcss').Config} */
import animatePlugin from "tailwindcss-animate"
import { fontFamily } from "tailwindcss/defaultTheme"

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [animatePlugin],
}`}
        filename="tailwind.config.js"
      />
    </Step>

    <Step number={5} title="Add CSS variables and Tailwind directives to src/index.css">
      <p className="mb-3 text-sm text-muted-foreground">
        Replace the contents of <code className="rounded bg-muted px-1 font-mono text-xs">src/index.css</code>{" "}
        with the CSS variable block from the Next.js App Router guide (Step 4), then add:
      </p>
      <CodeBlock
        code={`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Set the font variable */
:root {
  --font-sans: "Inter", sans-serif;
}`}
        filename="src/index.css (add to top)"
      />
    </Step>

    <Step number={6} title="Path alias (optional but recommended)">
      <CodeBlock
        code={`import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})`}
        filename="vite.config.ts"
      />
      <CodeBlock
        code={`{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}`}
        filename="tsconfig.json (add to compilerOptions)"
      />
    </Step>

    <Step number={7} title="Add components">
      <CodeBlock
        code={`npx aether-ui add button input`}
        filename="terminal"
      />
    </Step>
  </div>
)

const remixSteps = (
  <div className="space-y-0">
    <Step number={1} title="Create a new Remix project">
      <CodeBlock
        code={`npx create-remix@latest my-app
cd my-app`}
        filename="terminal"
      />
    </Step>

    <Step number={2} title="Install Tailwind CSS">
      <CodeBlock
        code={`npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`}
        filename="terminal"
      />
      <p className="mt-3 text-sm text-muted-foreground">
        Add the Tailwind directives to <code className="rounded bg-muted px-1 font-mono text-xs">app/tailwind.css</code> and
        import it in <code className="rounded bg-muted px-1 font-mono text-xs">app/root.tsx</code>.
      </p>
    </Step>

    <Step number={3} title="Install Aether UI dependencies">
      <CodeBlock
        code={`npm install @aetherstack/utils class-variance-authority tailwind-merge clsx \\
  @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-tabs \\
  @radix-ui/react-tooltip @radix-ui/react-select @radix-ui/react-checkbox \\
  @radix-ui/react-radio-group @radix-ui/react-switch @radix-ui/react-label \\
  lucide-react tailwindcss-animate`}
        filename="terminal"
      />
    </Step>

    <Step number={4} title="Configure Tailwind (same as Vite/React)">
      <p className="text-sm text-muted-foreground">
        Use the same <code className="rounded bg-muted px-1 font-mono text-xs">tailwind.config.js</code> configuration
        from the Vite + React guide above (Step 4). Update the <code className="rounded bg-muted px-1 font-mono text-xs">content</code> array to:
      </p>
      <CodeBlock
        code={`content: ["./app/**/*.{ts,tsx}"],`}
        filename="tailwind.config.js (content array only)"
      />
    </Step>

    <Step number={5} title="Add CSS variables to app/tailwind.css">
      <p className="mb-3 text-sm text-muted-foreground">
        Paste the full <code className="rounded bg-muted px-1 font-mono text-xs">:root</code> / <code className="rounded bg-muted px-1 font-mono text-xs">.dark</code> CSS variable block
        from the Next.js App Router guide (Step 4) into <code className="rounded bg-muted px-1 font-mono text-xs">app/tailwind.css</code>.
      </p>
    </Step>

    <Step number={6} title="Import CSS in root.tsx">
      <CodeBlock
        code={`import type { LinksFunction } from "@remix-run/node"
import stylesheet from "~/tailwind.css?url"

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
]`}
        filename="app/root.tsx"
      />
    </Step>

    <Step number={7} title="Add components">
      <CodeBlock
        code={`npx aether-ui add button input`}
        filename="terminal"
      />
      <p className="mt-3 text-sm text-muted-foreground">
        Components using Radix overlays (Dialog, Sheet, Tooltip) work in Remix without
        any additional configuration — Radix uses portals and Remix handles hydration
        correctly.
      </p>
    </Step>
  </div>
)

const astroSteps = (
  <div className="space-y-0">
    <Step number={1} title="Create a new Astro project with React">
      <CodeBlock
        code={`npm create astro@latest my-app
cd my-app
npx astro add react tailwind`}
        filename="terminal"
      />
      <p className="mt-3 text-sm text-muted-forections">
        When prompted, accept adding the React and Tailwind integrations. Astro will configure both automatically.
      </p>
    </Step>

    <Step number={2} title="Install Aether UI dependencies">
      <CodeBlock
        code={`npm install @aetherstack/utils class-variance-authority tailwind-merge clsx \\
  @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-tabs \\
  @radix-ui/react-tooltip @radix-ui/react-select @radix-ui/react-checkbox \\
  @radix-ui/react-radio-group @radix-ui/react-switch @radix-ui/react-label \\
  lucide-react tailwindcss-animate`}
        filename="terminal"
      />
    </Step>

    <Step number={3} title="Configure tailwind.config.mjs">
      <p className="mb-3 text-sm text-muted-foreground">
        Astro generates a <code className="rounded bg-muted px-1 font-mono text-xs">tailwind.config.mjs</code>. Add the Aether UI color tokens and extend the config:
      </p>
      <CodeBlock
        code={`import { fontFamily } from "tailwindcss/defaultTheme"
import animatePlugin from "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,svelte,vue}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        // ... (same color config as the Next.js guide)
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: { sans: ["var(--font-sans)", ...fontFamily.sans] },
    },
  },
  plugins: [animatePlugin],
}`}
        filename="tailwind.config.mjs"
      />
    </Step>

    <Step number={4} title="Add CSS variables to src/styles/global.css">
      <p className="mb-3 text-sm text-muted-foreground">
        Paste the CSS variable block from Step 4 of the Next.js guide into your global stylesheet.
        Import it in your base layout.
      </p>
      <CodeBlock
        code={`---
import "../styles/global.css"
---
<html lang="en">
  <head><meta charset="UTF-8" /></head>
  <body><slot /></body>
</html>`}
        filename="src/layouts/Layout.astro"
      />
    </Step>

    <Step number={5} title="Use components with client:load directive">
      <CodeBlock
        code={`---
import { Button } from "../components/ui/button"
---

<!-- Static button - no JS needed -->
<Button>Hello</Button>

<!-- Interactive component - requires hydration -->
<Dialog client:load>
  ...
</Dialog>`}
        filename="src/pages/index.astro"
      />
      <p className="mt-3 text-sm text-muted-foreground">
        Purely visual components (Button, Badge, Card) work without hydration.
        Interactive Radix components (Dialog, Select, Tabs, etc.) require{" "}
        <code className="rounded bg-muted px-1 font-mono text-xs">client:load</code> or{" "}
        <code className="rounded bg-muted px-1 font-mono text-xs">client:visible</code>.
      </p>
    </Step>
  </div>
)

const tanstackStartSteps = (
  <div className="space-y-0">
    <Step number={1} title="Create a new TanStack Start project">
      <CodeBlock
        code={`npx create-tsrouter-app@latest my-app --framework react --tailwind
cd my-app
npm install`}
        filename="terminal"
      />
    </Step>

    <Step number={2} title="Install Aether UI dependencies">
      <CodeBlock
        code={`npm install @aetherstack/utils class-variance-authority tailwind-merge clsx \\
  @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-tabs \\
  @radix-ui/react-tooltip @radix-ui/react-select @radix-ui/react-checkbox \\
  @radix-ui/react-radio-group @radix-ui/react-switch @radix-ui/react-label \\
  lucide-react tailwindcss-animate`}
        filename="terminal"
      />
    </Step>

    <Step number={3} title="Configure Tailwind and CSS variables">
      <p className="mb-3 text-sm text-muted-foreground">
        TanStack Start uses Vite under the hood. Follow the same Tailwind configuration
        and CSS variable setup as the <strong>Vite + React</strong> guide above (Steps 4–5).
      </p>
    </Step>

    <Step number={4} title="Set up the cn utility">
      <CodeBlock
        code={`// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
        filename="src/lib/utils.ts"
      />
    </Step>

    <Step number={5} title="Add components and use them in routes">
      <CodeBlock
        code={`npx aether-ui add button badge card`}
        filename="terminal"
      />
      <CodeBlock
        code={`import { createFileRoute } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/")({
  component: () => (
    <main>
      <Button>Hello TanStack</Button>
    </main>
  ),
})`}
        filename="src/routes/index.tsx"
      />
    </Step>
  </div>
)

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InstallationPage() {
  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">
          Installation
        </h1>
        <p className="text-lg text-muted-foreground">
          Add Aether UI to any React project. Components are copied directly into your
          codebase — no wrapper library, no lock-in. You own the source.
        </p>
      </div>

      {/* Framework support */}
      <div className="mb-10 flex flex-wrap gap-2">
        <FrameworkBadge name="Next.js App Router" emoji="▲" />
        <FrameworkBadge name="Next.js Pages Router" emoji="▲" />
        <FrameworkBadge name="Vite + React" emoji="⚡" />
        <FrameworkBadge name="Remix" emoji="💿" />
        <FrameworkBadge name="Astro" emoji="🚀" />
        <FrameworkBadge name="TanStack Start" emoji="🔷" />
      </div>

      {/* Requirements */}
      <section className="mb-12">
        <SectionHeading>Requirements</SectionHeading>
        <ul className="space-y-2">
          {[
            "Node.js ≥ 18",
            "React ≥ 18",
            "TypeScript (strongly recommended — components are typed throughout)",
            "Tailwind CSS 3.x",
          ].map((req) => (
            <li key={req} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-0.5 text-primary">✓</span>
              {req}
            </li>
          ))}
        </ul>
      </section>

      {/* Framework-specific guides */}
      <section className="mb-12">
        <SectionHeading>Framework guides</SectionHeading>
        <DocTabs
          tabs={[
            { id: "nextjs-app", label: "Next.js App Router", content: nextjsAppRouterSteps },
            { id: "nextjs-pages", label: "Next.js Pages Router", content: nextjsPagesRouterSteps },
            { id: "vite", label: "Vite + React", content: viteReactSteps },
            { id: "remix", label: "Remix", content: remixSteps },
            { id: "astro", label: "Astro", content: astroSteps },
            { id: "tanstack", label: "TanStack Start", content: tanstackStartSteps },
          ]}
        />
      </section>

      {/* CLI reference */}
      <section className="mb-12">
        <SectionHeading>CLI reference</SectionHeading>
        <p className="mb-6 text-sm text-muted-foreground">
          The <code className="rounded bg-muted px-1 font-mono text-xs">aether-ui</code> CLI
          copies component source files into your project. No runtime dependency on Aether UI — you
          own the code.
        </p>
        <div className="space-y-4">
          <CodeBlock
            code={`# Initialize a project (creates aether.json config)
npx aether-ui init

# List available components
npx aether-ui list

# Add a single component
npx aether-ui add button

# Add multiple components at once
npx aether-ui add button badge card input

# Add to a specific directory
npx aether-ui add button --cwd /path/to/your/project`}
            filename="terminal"
          />
        </div>
        <div className="mt-6 rounded-lg border border-border bg-muted/50 p-4">
          <p className="text-sm font-medium text-foreground">aether.json</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Running <code className="rounded bg-muted px-1 font-mono text-xs">aether-ui init</code> creates
            a config file that tells the CLI where to install components and how your project is structured:
          </p>
          <CodeBlock
            code={`{
  "$schema": "https://aether-ui.dev/schema.json",
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}`}
            filename="aether.json"
          />
        </div>
      </section>

      {/* Dark mode */}
      <section className="mb-12">
        <SectionHeading>Dark mode</SectionHeading>
        <p className="mb-4 text-sm text-muted-foreground">
          Aether UI uses the <code className="rounded bg-muted px-1 font-mono text-xs">class</code> strategy
          for dark mode — add the <code className="rounded bg-muted px-1 font-mono text-xs">dark</code> class
          to the <code className="rounded bg-muted px-1 font-mono text-xs">html</code> element to activate dark mode.
        </p>
        <CodeBlock
          code={`// With next-themes (recommended for Next.js)
npm install next-themes`}
          filename="terminal"
        />
        <CodeBlock
          code={`import { ThemeProvider } from "next-themes"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}`}
          filename="src/app/layout.tsx"
        />
        <p className="mt-4 text-sm text-muted-foreground">
          For Vite/Remix/Astro, manually toggle the <code className="rounded bg-muted px-1 font-mono text-xs">dark</code> class
          on <code className="rounded bg-muted px-1 font-mono text-xs">document.documentElement</code> or use your framework&apos;s
          preferred theme management library.
        </p>
      </section>

      {/* TypeScript */}
      <section>
        <SectionHeading>TypeScript</SectionHeading>
        <p className="mb-4 text-sm text-muted-foreground">
          All components are fully typed. Props extend their corresponding HTML element types
          so standard HTML attributes (like <code className="rounded bg-muted px-1 font-mono text-xs">aria-*</code>,{" "}
          <code className="rounded bg-muted px-1 font-mono text-xs">data-*</code>,{" "}
          <code className="rounded bg-muted px-1 font-mono text-xs">onClick</code>, etc.) work as expected without
          any extra casting.
        </p>
        <CodeBlock
          code={`// All HTML button attributes are available
<Button
  type="submit"
  aria-label="Submit form"
  data-testid="submit-btn"
  onClick={(e) => handleSubmit(e.currentTarget)}
>
  Submit
</Button>

// TypeScript will catch invalid prop combinations
<Button variant="invalid" />
// ^ Type '"invalid"' is not assignable to type 'ButtonVariant'`}
          filename="example.tsx"
        />
      </section>
    </div>
  )
}
