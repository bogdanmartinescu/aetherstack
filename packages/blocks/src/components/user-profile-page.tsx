"use client"

import * as React from "react"
import { MapPin, Globe, Calendar, Mail } from "lucide-react"
import { cn } from "@aetherstack/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@aetherstack/ui"

export interface UserProfileUser {
  name: string
  username?: string
  email?: string
  bio?: string
  avatarUrl?: string
  role?: string
  location?: string
  website?: string
  joinedAt?: string
}

export interface UserProfileStat {
  label: string
  value: string | number
}

export interface UserProfileTab {
  label: string
  content: React.ReactNode
}

export interface UserProfilePageProps {
  user: UserProfileUser
  stats?: UserProfileStat[]
  tabs?: UserProfileTab[]
  actions?: React.ReactNode
  className?: string
}

export function UserProfilePage({
  user,
  stats = [],
  tabs = [],
  actions,
  className,
}: UserProfilePageProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className={cn("w-full", className)}>
      {/* Cover / header */}
      <div className="h-32 rounded-xl bg-muted sm:h-48" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="-mt-12 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
          {/* Avatar */}
          <Avatar className="h-24 w-24 ring-4 ring-background sm:h-32 sm:w-32">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
          </Avatar>

          {/* Actions */}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>

        {/* Profile info */}
        <div className="mt-4 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold text-foreground sm:text-2xl">{user.name}</h1>
            {user.role && (
              <Badge variant="secondary">{user.role}</Badge>
            )}
          </div>
          {user.username && (
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          )}
          {user.bio && (
            <p className="max-w-2xl text-sm text-foreground">{user.bio}</p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap gap-4">
            {user.location && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                {user.location}
              </span>
            )}
            {user.website && (
              <a
                href={user.website}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe className="h-3.5 w-3.5" aria-hidden />
                {user.website.replace(/^https?:\/\//, "")}
              </a>
            )}
            {user.email && (
              <a
                href={`mailto:${user.email}`}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden />
                {user.email}
              </a>
            )}
            {user.joinedAt && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" aria-hidden />
                Joined {user.joinedAt}
              </span>
            )}
          </div>
        </div>

        {/* Stats row */}
        {stats.length > 0 && (
          <>
            <Separator className="my-6" />
            <div className="flex flex-wrap gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Tabs */}
        {tabs.length > 0 && (
          <>
            <Separator className="my-6" />
            <Tabs defaultValue={tabs[0]?.label ?? ""} className="w-full">
              <TabsList>
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.label} value={tab.label}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {tabs.map((tab) => (
                <TabsContent key={tab.label} value={tab.label} className="mt-6">
                  {tab.content}
                </TabsContent>
              ))}
            </Tabs>
          </>
        )}
      </div>
    </div>
  )
}
