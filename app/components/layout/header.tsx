"use client"

import { HistoryTrigger } from "@/app/components/history/history-trigger"
import { AppInfoTrigger } from "@/app/components/layout/app-info/app-info-trigger"
import { ButtonNewChat } from "@/app/components/layout/button-new-chat"
import { UserMenu } from "@/app/components/layout/user-menu"
import { useBreakpoint } from "@/app/hooks/use-breakpoint"
import { useTauri } from "@/app/hooks/use-tauri"
import { ZolaFaviconIcon } from "@/components/icons/zola"
import { APP_NAME } from "@/lib/config"
import { useUserPreferences } from "@/lib/user-preference-store/provider"
import { useUser } from "@/lib/user-store/provider"
import { DownloadSimple, Moon, Sun } from "@phosphor-icons/react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useEffect, useState } from "react"
import { CreditsDisplay } from "./credits-display"
import { DialogPublish } from "./dialog-publish"
import { HeaderSidebarTrigger } from "./header-sidebar-trigger"

export function Header({ hasSidebar }: { hasSidebar: boolean }) {
  const isMobile = useBreakpoint(768)
  const isTauri = useTauri()
  const { user } = useUser()
  const { preferences } = useUserPreferences()
  const isMultiModelEnabled = preferences.multiModelEnabled

  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isLoggedIn = !!user

  return (
    <header
      className="h-app-header pointer-events-none fixed top-0 right-0 left-0 z-50"
      {...(isTauri ? { "data-tauri-drag-region": true } : {})}
    >
      <div className={`relative mx-auto flex h-full max-w-full items-center justify-between bg-transparent px-4 sm:px-6 lg:bg-transparent lg:px-8 ${isTauri && !hasSidebar ? "pl-20" : ""}`}>
        <div className="flex flex-1 items-center justify-between">
          <div className="-ml-0.5 flex flex-1 items-center gap-2 lg:-ml-2.5">
            <div className="flex flex-1 items-center gap-2">
              {!hasSidebar && (
                <Link
                  href="/"
                  className="pointer-events-auto inline-flex items-center gap-1.5 text-base font-medium tracking-tight"
                >
                  <ZolaFaviconIcon className="size-7" />
                  <span className="font-medium">Notto</span>
                  <span className="font-normal opacity-80">AI</span>
                </Link>
              )}
              {hasSidebar && isMobile && <HeaderSidebarTrigger />}
            </div>
          </div>
          <div />
          <div className="pointer-events-auto flex flex-1 items-center justify-end gap-2">
            {isLoggedIn && <CreditsDisplay />}
            {isLoggedIn && !isMultiModelEnabled && <DialogPublish />}
            {isLoggedIn && <ButtonNewChat />}
            {isLoggedIn && !hasSidebar && <HistoryTrigger hasSidebar={hasSidebar} />}
            <Link
              href="/download"
              className="hover:bg-muted text-foreground inline-flex size-9 items-center justify-center rounded-md transition-colors"
              aria-label="Download App"
            >
              <DownloadSimple size={18} />
            </Link>
            <button
              type="button"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="hover:bg-muted text-foreground inline-flex size-9 items-center justify-center rounded-md transition-colors"
              aria-label="Toggle theme"
            >
              {mounted && resolvedTheme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
