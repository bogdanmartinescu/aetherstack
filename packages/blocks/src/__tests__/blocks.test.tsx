import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { DashboardShell, LoginBlock, SignupBlock } from "../index"
import { AppHeader } from "../components/app-header"
import { MarketingNavbar } from "../components/marketing-navbar"
import { FooterSection } from "../components/footer-section"
import { LandingHero } from "../components/landing-hero"
import { FeaturesSection } from "../components/features-section"
import { CTASection } from "../components/cta-section"
import { FAQSection } from "../components/faq-section"
import { TestimonialsSection } from "../components/testimonials-section"
import { LogoCloud } from "../components/logo-cloud"
import { StatsSection } from "../components/stats-section"
import { PricingComparison } from "../components/pricing-comparison"
import { UserProfilePage } from "../components/user-profile-page"
import { ErrorPage } from "../components/error-page"
import { WaitlistBlock } from "../components/waitlist-block"
import { ChangelogBlock } from "../components/changelog-block"
import { ChatLayout } from "../components/ai/chat-layout"
import { ChatSidebar } from "../components/ai/chat-sidebar"
import { AIAssistantPanel } from "../components/ai/ai-assistant-panel"
import { AgentWorkspace } from "../components/ai/agent-workspace"
import { AIOnboarding } from "../components/ai/ai-onboarding"
import { CompareOutput } from "../components/ai/compare-output"
import { AISettings } from "../components/ai/ai-settings"
import { PromptLibraryPage } from "../components/ai/prompt-library-page"
import { AIUsageDashboard } from "../components/ai/ai-usage-dashboard"

// ── DashboardShell ────────────────────────────────────────────────────────────

describe("DashboardShell", () => {
  it("renders default app name and nav", () => {
    render(
      <DashboardShell>
        <p>content</p>
      </DashboardShell>,
    )
    expect(screen.getByText("Acme")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /^Dashboard$/ })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /Users/ })).toBeInTheDocument()
    expect(screen.getByText("content")).toBeInTheDocument()
  })

  it("renders custom appName", () => {
    render(
      <DashboardShell appName="Aether">
        <p>x</p>
      </DashboardShell>,
    )
    expect(screen.getByText("Aether")).toBeInTheDocument()
  })

  it("renders custom navGroups, marks active item with aria-current", () => {
    render(
      <DashboardShell
        navGroups={[
          {
            items: [
              { label: "Home", href: "/", active: true },
              { label: "Settings", href: "/settings" },
            ],
          },
        ]}
      >
        <p>x</p>
      </DashboardShell>,
    )
    const home = screen.getByRole("link", { name: /home/i })
    expect(home).toHaveAttribute("aria-current", "page")
    const settings = screen.getByRole("link", { name: /settings/i })
    expect(settings).not.toHaveAttribute("aria-current")
  })

  it("renders nav badges", () => {
    render(
      <DashboardShell
        navGroups={[
          { items: [{ label: "Inbox", href: "/inbox", badge: 12 }] },
        ]}
      >
        <p>x</p>
      </DashboardShell>,
    )
    expect(screen.getByText("12")).toBeInTheDocument()
  })

  it("renders user details and headerActions", () => {
    render(
      <DashboardShell
        userName="Bogdan M"
        userEmail="b@example.com"
        headerActions={<button>Action</button>}
      >
        <p>x</p>
      </DashboardShell>,
    )
    expect(screen.getByText("Bogdan M")).toBeInTheDocument()
    expect(screen.getByText("b@example.com")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /action/i })).toBeInTheDocument()
  })

  it("toggles sidebar collapsed state when the toggle is clicked", async () => {
    const user = userEvent.setup()
    render(
      <DashboardShell appName="Acme">
        <p>x</p>
      </DashboardShell>,
    )
    expect(screen.getByText("Acme")).toBeInTheDocument()
    const toggle = screen.getByRole("button", { name: /collapse sidebar/i })
    await user.click(toggle)
    expect(screen.queryByText("Acme")).not.toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /expand sidebar/i }),
    ).toBeInTheDocument()
  })

  it("renders ReactNode pageTitle as-is (no breadcrumb)", () => {
    render(
      <DashboardShell pageTitle={<span data-testid="custom-title">Custom</span>}>
        <p>x</p>
      </DashboardShell>,
    )
    expect(screen.getByTestId("custom-title")).toBeInTheDocument()
  })
})

// ── LoginBlock ────────────────────────────────────────────────────────────────

describe("LoginBlock", () => {
  it("renders the default heading and copy", () => {
    render(<LoginBlock />)
    expect(screen.getByRole("heading", { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument()
  })

  it("renders email, password, and remember-me controls", () => {
    render(<LoginBlock />)
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(
      screen.getByLabelText(/remember me for 30 days/i),
    ).toBeInTheDocument()
  })

  it("shows email and password validation errors when fields are empty", async () => {
    const user = userEvent.setup()
    render(<LoginBlock />)

    await user.click(screen.getByRole("button", { name: /sign in/i }))

    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/password is required/i)).toBeInTheDocument()
  })

  it("shows email format error when email is invalid", async () => {
    const user = userEvent.setup()
    render(<LoginBlock />)

    await user.type(screen.getByLabelText(/email address/i), "not-an-email")
    await user.type(screen.getByLabelText(/^password$/i), "longpassword")
    await user.click(screen.getByRole("button", { name: /sign in/i }))

    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument()
  })

  it("shows password length error for short passwords", async () => {
    const user = userEvent.setup()
    render(<LoginBlock />)

    await user.type(screen.getByLabelText(/email address/i), "valid@example.com")
    await user.type(screen.getByLabelText(/^password$/i), "short")
    await user.click(screen.getByRole("button", { name: /sign in/i }))

    expect(
      screen.getByText(/at least 8 characters/i),
    ).toBeInTheDocument()
  })

  it("calls onSubmit with valid values", async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<LoginBlock onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/email address/i), "valid@example.com")
    await user.type(screen.getByLabelText(/^password$/i), "longpassword")
    await user.click(screen.getByRole("button", { name: /sign in/i }))

    expect(onSubmit).toHaveBeenCalledWith({
      email: "valid@example.com",
      password: "longpassword",
      remember: false,
    })
  })

  it("renders a panel layout when the panel prop is provided", () => {
    render(<LoginBlock panel={<div data-testid="panel-content">side</div>} />)
    expect(screen.getByTestId("panel-content")).toBeInTheDocument()
  })

  it("uses custom signUpHref and forgotPasswordHref", () => {
    render(<LoginBlock signUpHref="/join" forgotPasswordHref="/recover" />)
    expect(screen.getByRole("link", { name: /sign up/i })).toHaveAttribute(
      "href",
      "/join",
    )
    expect(
      screen.getByRole("link", { name: /forgot password/i }),
    ).toHaveAttribute("href", "/recover")
  })
})

// ── SignupBlock ───────────────────────────────────────────────────────────────

describe("SignupBlock", () => {
  it("renders the default heading", () => {
    render(<SignupBlock />)
    expect(
      screen.getByRole("heading", { name: /create account/i }),
    ).toBeInTheDocument()
  })

  it("renders name, email, and password fields", () => {
    render(<SignupBlock />)
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
  })

  it("shows all three required-field errors when submitted empty", async () => {
    const user = userEvent.setup()
    render(<SignupBlock />)
    await user.click(screen.getByRole("button", { name: /create account/i }))

    expect(screen.getByText(/full name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/password is required/i)).toBeInTheDocument()
  })

  it("rejects whitespace-only name", async () => {
    const user = userEvent.setup()
    render(<SignupBlock />)
    await user.type(screen.getByLabelText(/full name/i), "   ")
    await user.type(screen.getByLabelText(/email address/i), "v@e.com")
    await user.type(screen.getByLabelText(/^password$/i), "longpassword")
    await user.click(screen.getByRole("button", { name: /create account/i }))

    expect(screen.getByText(/full name is required/i)).toBeInTheDocument()
  })

  it("shows email format error for invalid email", async () => {
    const user = userEvent.setup()
    render(<SignupBlock />)
    await user.type(screen.getByLabelText(/full name/i), "Alex")
    await user.type(screen.getByLabelText(/email address/i), "bad")
    await user.type(screen.getByLabelText(/^password$/i), "longpassword")
    await user.click(screen.getByRole("button", { name: /create account/i }))

    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument()
  })

  it("shows password length error for short password", async () => {
    const user = userEvent.setup()
    render(<SignupBlock />)
    await user.type(screen.getByLabelText(/full name/i), "Alex")
    await user.type(screen.getByLabelText(/email address/i), "v@e.com")
    await user.type(screen.getByLabelText(/^password$/i), "short")
    await user.click(screen.getByRole("button", { name: /create account/i }))

    expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument()
  })

  it("calls onSubmit with valid values", async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<SignupBlock onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/full name/i), "Alex Johnson")
    await user.type(screen.getByLabelText(/email address/i), "alex@example.com")
    await user.type(screen.getByLabelText(/^password$/i), "longpassword")
    await user.click(screen.getByRole("button", { name: /create account/i }))

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Alex Johnson",
      email: "alex@example.com",
      password: "longpassword",
    })
  })

  it("renders custom termsHref, privacyHref, signInHref", () => {
    render(
      <SignupBlock
        termsHref="/terms-of-service"
        privacyHref="/privacy-policy"
        signInHref="/login-page"
      />,
    )
    expect(screen.getByRole("link", { name: /terms/i })).toHaveAttribute(
      "href",
      "/terms-of-service",
    )
    expect(
      screen.getByRole("link", { name: /privacy policy/i }),
    ).toHaveAttribute("href", "/privacy-policy")
    expect(screen.getByRole("link", { name: /sign in/i })).toHaveAttribute(
      "href",
      "/login-page",
    )
  })
})

// ── Marketing / Utility Blocks ────────────────────────────────────────────────

describe("AppHeader", () => {
  it("renders without crash", () => {
    const { container } = render(<AppHeader />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders brand logo when provided", () => {
    render(<AppHeader logo={<span>Aether UI</span>} />)
    expect(screen.getByText("Aether UI")).toBeInTheDocument()
  })

  it("renders nav items", () => {
    render(
      <AppHeader
        navItems={[
          { label: "Home", href: "/" },
          { label: "Docs", href: "/docs" },
        ]}
      />,
    )
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Docs" })).toBeInTheDocument()
  })
})

describe("MarketingNavbar", () => {
  it("renders without crash", () => {
    const { container } = render(<MarketingNavbar />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders nav links", () => {
    render(
      <MarketingNavbar
        navItems={[
          { label: "Pricing", href: "/pricing" },
          { label: "Blog", href: "/blog" },
        ]}
      />,
    )
    expect(screen.getByRole("link", { name: "Pricing" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Blog" })).toBeInTheDocument()
  })
})

describe("FooterSection", () => {
  it("renders without crash", () => {
    const { container } = render(<FooterSection />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders column titles", () => {
    render(
      <FooterSection
        columns={[
          { title: "Product", links: [{ label: "Features", href: "/features" }] },
          { title: "Company", links: [{ label: "About", href: "/about" }] },
        ]}
      />,
    )
    expect(screen.getByText("Product")).toBeInTheDocument()
    expect(screen.getByText("Company")).toBeInTheDocument()
  })

  it("renders copyright text", () => {
    render(<FooterSection copyright="© 2024 Aether UI" />)
    expect(screen.getByText("© 2024 Aether UI")).toBeInTheDocument()
  })
})

describe("LandingHero", () => {
  it("renders headline", () => {
    render(<LandingHero headline="Build faster products" />)
    expect(screen.getByText("Build faster products")).toBeInTheDocument()
  })

  it("renders subheading", () => {
    render(<LandingHero headline="Headline" subheading="A great subheading" />)
    expect(screen.getByText("A great subheading")).toBeInTheDocument()
  })

  it("renders primary CTA link", () => {
    render(
      <LandingHero
        headline="Start building"
        primaryCta={{ label: "Get started", href: "/start" }}
      />,
    )
    expect(screen.getByRole("link", { name: "Get started" })).toHaveAttribute(
      "href",
      "/start",
    )
  })
})

describe("FeaturesSection", () => {
  const features = [
    { title: "Fast", description: "Blazing fast performance" },
    { title: "Accessible", description: "Built for everyone" },
  ]

  it("renders feature titles", () => {
    render(<FeaturesSection features={features} />)
    expect(screen.getByText("Fast")).toBeInTheDocument()
    expect(screen.getByText("Accessible")).toBeInTheDocument()
  })

  it("renders feature descriptions", () => {
    render(<FeaturesSection features={features} />)
    expect(screen.getByText("Blazing fast performance")).toBeInTheDocument()
  })
})

describe("CTASection", () => {
  it("renders headline", () => {
    render(<CTASection headline="Ready to get started?" />)
    expect(screen.getByText("Ready to get started?")).toBeInTheDocument()
  })

  it("renders primary CTA", () => {
    render(
      <CTASection
        headline="Start now"
        primaryCta={{ label: "Sign up free", href: "/signup" }}
      />,
    )
    expect(screen.getByRole("link", { name: "Sign up free" })).toBeInTheDocument()
  })
})

describe("FAQSection", () => {
  const items = [
    { question: "What is this?", answer: "A design system" },
    { question: "How does it work?", answer: "Install and use" },
  ]

  it("renders questions", () => {
    render(<FAQSection items={items} />)
    expect(screen.getByText("What is this?")).toBeInTheDocument()
    expect(screen.getByText("How does it work?")).toBeInTheDocument()
  })
})

describe("TestimonialsSection", () => {
  const testimonials = [
    { id: "1", quote: "Amazing product!", author: "Alice", role: "CEO" },
    { id: "2", quote: "Highly recommend.", author: "Bob", role: "CTO" },
  ]

  it("renders testimonial quotes", () => {
    render(<TestimonialsSection testimonials={testimonials} />)
    expect(screen.getByText(/Amazing product!/)).toBeInTheDocument()
    expect(screen.getByText(/Highly recommend\./)).toBeInTheDocument()
  })

  it("renders author names", () => {
    render(<TestimonialsSection testimonials={testimonials} />)
    expect(screen.getByText("Alice")).toBeInTheDocument()
    expect(screen.getByText("Bob")).toBeInTheDocument()
  })
})

describe("LogoCloud", () => {
  it("renders without crash", () => {
    const { container } = render(<LogoCloud logos={[]} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders headline when provided", () => {
    render(<LogoCloud logos={[]} headline="Trusted by industry leaders" />)
    expect(screen.getByText("Trusted by industry leaders")).toBeInTheDocument()
  })

  it("renders logo names", () => {
    render(
      <LogoCloud
        logos={[
          { name: "Acme Corp" },
          { name: "Globex" },
        ]}
      />,
    )
    expect(screen.getByText("Acme Corp")).toBeInTheDocument()
    expect(screen.getByText("Globex")).toBeInTheDocument()
  })
})

describe("StatsSection", () => {
  it("renders without crash", () => {
    const { container } = render(<StatsSection stats={[]} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders stat values and labels", () => {
    render(
      <StatsSection
        stats={[
          { value: "10k+", label: "Users" },
          { value: "99.9%", label: "Uptime" },
        ]}
      />,
    )
    expect(screen.getByText("10k+")).toBeInTheDocument()
    expect(screen.getByText("Users")).toBeInTheDocument()
    expect(screen.getByText("99.9%")).toBeInTheDocument()
  })
})

describe("PricingComparison", () => {
  it("renders without crash", () => {
    const { container } = render(
      <PricingComparison
        tiers={[{ id: "free", name: "Free", price: "$0" }]}
        features={[{ id: "f1", name: "Unlimited users", tiers: { free: true } }]}
      />,
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders tier names", () => {
    render(
      <PricingComparison
        tiers={[
          { id: "free", name: "Free", price: "$0" },
          { id: "pro", name: "Pro", price: "$19" },
        ]}
        features={[]}
      />,
    )
    expect(screen.getByText("Free")).toBeInTheDocument()
    expect(screen.getByText("Pro")).toBeInTheDocument()
  })
})

describe("UserProfilePage", () => {
  it("renders user name", () => {
    render(
      <UserProfilePage
        user={{ id: "1", name: "Alice Johnson", email: "alice@example.com" }}
      />,
    )
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument()
  })

  it("renders user email", () => {
    render(
      <UserProfilePage
        user={{ id: "1", name: "Alice", email: "alice@example.com" }}
      />,
    )
    expect(screen.getByText("alice@example.com")).toBeInTheDocument()
  })
})

describe("ErrorPage", () => {
  it("renders default 404 status code", () => {
    render(<ErrorPage />)
    expect(screen.getByText("404")).toBeInTheDocument()
  })

  it("renders custom headline", () => {
    render(<ErrorPage headline="This page does not exist" />)
    expect(screen.getByText("This page does not exist")).toBeInTheDocument()
  })

  it("renders back link", () => {
    render(<ErrorPage backHref="/home" />)
    expect(screen.getByRole("link")).toHaveAttribute("href", "/home")
  })
})

describe("WaitlistBlock", () => {
  it("renders without crash", () => {
    const { container } = render(<WaitlistBlock />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders email input", () => {
    render(<WaitlistBlock />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("renders submit button", () => {
    render(<WaitlistBlock />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("calls onSubmit with email", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<WaitlistBlock onSubmit={onSubmit} />)
    await user.type(screen.getByRole("textbox"), "test@example.com")
    await user.click(screen.getByRole("button"))
    expect(onSubmit).toHaveBeenCalledWith("test@example.com")
  })
})

describe("ChangelogBlock", () => {
  it("renders without crash", () => {
    const { container } = render(<ChangelogBlock entries={[]} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders version and date", () => {
    render(
      <ChangelogBlock
        entries={[
          {
            id: "1",
            title: "Release",
            version: "v1.2.0",
            date: "2024-01-15",
            changes: [{ type: "added", items: ["New feature"] }],
          },
        ]}
      />,
    )
    expect(screen.getByText("v1.2.0")).toBeInTheDocument()
    expect(screen.getByText("New feature")).toBeInTheDocument()
  })
})

// ── AI Blocks ─────────────────────────────────────────────────────────────────

describe("ChatLayout", () => {
  it("renders children (main content area)", () => {
    render(<ChatLayout><p>Chat content</p></ChatLayout>)
    expect(screen.getByText("Chat content")).toBeInTheDocument()
  })

  it("renders sidebar when provided", () => {
    render(
      <ChatLayout sidebar={<nav>Sidebar nav</nav>}>
        <p>Main</p>
      </ChatLayout>,
    )
    expect(screen.getByText("Sidebar nav")).toBeInTheDocument()
  })

  it("renders footer when provided", () => {
    render(
      <ChatLayout footer={<div>Input area</div>}>
        <p>Main</p>
      </ChatLayout>,
    )
    expect(screen.getByText("Input area")).toBeInTheDocument()
  })
})

describe("ChatSidebar", () => {
  it("renders new chat button", () => {
    render(<ChatSidebar />)
    expect(screen.getByRole("button", { name: /new chat/i })).toBeInTheDocument()
  })

  it("renders conversations list", () => {
    render(
      <ChatSidebar
        conversations={[
          { id: "1", title: "First conversation" },
          { id: "2", title: "Second conversation" },
        ]}
      />,
    )
    expect(screen.getByText("First conversation")).toBeInTheDocument()
    expect(screen.getByText("Second conversation")).toBeInTheDocument()
  })

  it("calls onNewChat when new chat button is clicked", async () => {
    const user = userEvent.setup()
    const onNewChat = vi.fn()
    render(<ChatSidebar onNewChat={onNewChat} />)
    await user.click(screen.getByRole("button", { name: /new chat/i }))
    expect(onNewChat).toHaveBeenCalledOnce()
  })
})

describe("AIAssistantPanel", () => {
  it("renders children when open", () => {
    render(
      <AIAssistantPanel open>
        <p>Assistant content</p>
      </AIAssistantPanel>,
    )
    expect(screen.getByText("Assistant content")).toBeInTheDocument()
  })

  it("renders title when provided", () => {
    render(<AIAssistantPanel open title="AI Assistant" />)
    expect(screen.getByText("AI Assistant")).toBeInTheDocument()
  })
})

describe("AgentWorkspace", () => {
  it("renders without crash", () => {
    const { container } = render(<AgentWorkspace />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders task description when provided", () => {
    render(<AgentWorkspace task="Summarize the document" />)
    expect(screen.getByText("Summarize the document")).toBeInTheDocument()
  })

  it("renders steps with tool names", () => {
    render(
      <AgentWorkspace
        steps={[
          { id: "1", toolName: "read_file", status: "done" },
          { id: "2", toolName: "summarize", status: "running" },
        ]}
      />,
    )
    expect(screen.getByText("read_file")).toBeInTheDocument()
    expect(screen.getByText("summarize")).toBeInTheDocument()
  })
})

describe("AIOnboarding", () => {
  it("renders without crash", () => {
    const { container } = render(<AIOnboarding />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders first step heading", () => {
    render(<AIOnboarding />)
    expect(screen.getByRole("heading")).toBeInTheDocument()
  })
})

describe("CompareOutput", () => {
  it("renders without crash", () => {
    const { container } = render(<CompareOutput outputs={[]} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders both output columns", () => {
    render(
      <CompareOutput
        outputs={[
          { model: "GPT-4o", content: "Response A" },
          { model: "Claude", content: "Response B" },
        ]}
      />,
    )
    expect(screen.getByText("Response A")).toBeInTheDocument()
    expect(screen.getByText("Response B")).toBeInTheDocument()
  })
})

describe("AISettings", () => {
  it("renders without crash", () => {
    const { container } = render(<AISettings />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders temperature section", () => {
    render(<AISettings />)
    expect(screen.getByText(/temperature/i)).toBeInTheDocument()
  })
})

describe("PromptLibraryPage", () => {
  it("renders without crash", () => {
    const { container } = render(<PromptLibraryPage prompts={[]} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders search input", () => {
    render(<PromptLibraryPage prompts={[]} />)
    expect(screen.getByPlaceholderText(/search prompts/i)).toBeInTheDocument()
  })

  it("renders prompt titles when prompts are provided", () => {
    render(
      <PromptLibraryPage
        prompts={[
          { id: "1", title: "Summarize text", content: "Summarize:", category: "Writing" },
        ]}
      />,
    )
    expect(screen.getByText("Summarize text")).toBeInTheDocument()
  })
})

describe("AIUsageDashboard", () => {
  it("renders without crash", () => {
    const { container } = render(<AIUsageDashboard />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders stats when stats prop is provided", () => {
    render(
      <AIUsageDashboard
        stats={{ totalRequests: 1200, totalTokens: 450000, estimatedCost: 0.9, period: "30d" }}
      />,
    )
    expect(screen.getByText("Total tokens")).toBeInTheDocument()
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0)
  })
})
