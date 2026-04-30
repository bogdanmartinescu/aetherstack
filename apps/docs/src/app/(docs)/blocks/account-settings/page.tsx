import type { Metadata } from "next"
import { AccountSettings } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "Account Settings",
  description: "User profile form with avatar, display name, email, and bio fields.",
}

export default function AccountSettingsPage() {
  return (
    <BlockPage
      name="Account Settings"
      category="Settings"
      description="A self-contained user profile settings card with avatar display, display name, email, and bio fields. Handles async save state internally."
      cliInstall="npx aether-ui add account-settings"
      importCode={`import { AccountSettings } from "@aetherstack/blocks"`}
      usageCode={`import { AccountSettings } from "@aetherstack/blocks"

export default function SettingsPage() {
  return (
    <AccountSettings
      defaultValues={{
        name: "Alice Martin",
        email: "alice@example.com",
        bio: "Product designer & developer.",
      }}
      onSave={async (data) => {
        await fetch("/api/account", {
          method: "PATCH",
          body: JSON.stringify(data),
        })
      }}
    />
  )
}`}
      preview={
        <div className="flex items-start justify-center p-6">
          <AccountSettings
            defaultValues={{
              name: "Alice Martin",
              email: "alice@example.com",
              bio: "Product designer & open-source contributor.",
            }}
          />
        </div>
      }
      props={[
        { name: "defaultValues", type: "AccountSettingsData", description: "Initial form values: name, email, bio, avatarUrl." },
        { name: "onSave", type: "(data: AccountSettingsData) => void | Promise<void>", description: "Called with the form data on submit. May be async — the button shows a saving state while pending." },
        { name: "className", type: "string", description: "Additional classes on the wrapper card." },
      ]}
      a11yNotes={[
        "All inputs are associated with their labels via htmlFor/id pairs.",
        "The submit button is disabled while saving to prevent double-submission.",
        "Avatar upload button is marked disabled in demo mode to avoid misleading interaction.",
      ]}
    />
  )
}
