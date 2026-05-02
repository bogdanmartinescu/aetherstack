import type { Metadata } from "next"
import { UserProfilePage } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"
import { Button } from "@aetherstack/ui"

export const metadata: Metadata = {
  title: "User Profile Page",
  description: "A user profile block with avatar, bio, stats row, and optional tabs.",
}

export default function UserProfilePageDoc() {
  return (
    <BlockPage
      name="User Profile Page"
      category="User & content"
      description="A user profile block with a cover banner, avatar, bio, location/website/email meta, a stats row, and tabbed content sections. Actions slot accepts any buttons."
      cliInstall="npx aether-ui add user-profile-page"
      previewScale={0.75}
      previewHeight="560px"
      importCode={`import { UserProfilePage } from "@aetherstack/blocks"`}
      usageCode={`import { UserProfilePage } from "@aetherstack/blocks"
import { Button } from "@aetherstack/ui"

export default function ProfilePage() {
  return (
    <UserProfilePage
      user={{
        name: "Alice Johnson",
        username: "alicejohnson",
        email: "alice@example.com",
        bio: "Frontend engineer building open-source tools.",
        role: "Member",
        location: "San Francisco, CA",
        joinedAt: "January 2024",
      }}
      stats={[
        { label: "Projects", value: 12 },
        { label: "Followers", value: 340 },
        { label: "Following", value: 91 },
      ]}
      tabs={[
        { label: "Projects", content: <div>Projects content</div> },
        { label: "Activity", content: <div>Activity content</div> },
      ]}
      actions={<Button variant="outline" size="sm">Edit profile</Button>}
    />
  )
}`}
      preview={
        <UserProfilePage
          user={{
            name: "Alice Johnson",
            username: "alicejohnson",
            email: "alice@example.com",
            bio: "Frontend engineer building open-source tools for the modern web. Previously at Vercel and Linear.",
            role: "Member",
            location: "San Francisco, CA",
            website: "https://alicejohnson.dev",
            joinedAt: "January 2024",
          }}
          stats={[
            { label: "Projects", value: 12 },
            { label: "Followers", value: 340 },
            { label: "Following", value: 91 },
          ]}
          tabs={[
            { label: "Projects", content: <div className="py-4 text-sm text-muted-foreground">Projects will appear here.</div> },
            { label: "Activity", content: <div className="py-4 text-sm text-muted-foreground">Recent activity will appear here.</div> },
          ]}
          actions={
            <>
              <Button variant="outline" size="sm">Message</Button>
              <Button size="sm">Follow</Button>
            </>
          }
        />
      }
      props={[
        { name: "user", type: "UserProfileUser", required: true, description: "User data. Fields: name, username, email, bio, avatarUrl, role, location, website, joinedAt." },
        { name: "stats", type: "{ label: string; value: string | number }[]", description: "Stat items displayed in the stats row." },
        { name: "tabs", type: "{ label: string; content: ReactNode }[]", description: "Tab sections below the stats row." },
        { name: "actions", type: "ReactNode", description: "Action buttons rendered to the right of the avatar." },
        { name: "className", type: "string", description: "Additional classes on the root element." },
      ]}
      a11yNotes={[
        "Avatar image includes alt set to the user name.",
        "Website and email links are properly labelled anchor elements.",
        "Tabs use the Radix UI Tabs primitive — keyboard-navigable.",
      ]}
    />
  )
}
