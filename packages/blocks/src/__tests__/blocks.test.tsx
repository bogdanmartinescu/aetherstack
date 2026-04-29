import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { DashboardShell, LoginBlock, SignupBlock } from "../index"

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
