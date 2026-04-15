"use client"

import { HistoryTrigger } from "@/app/components/history/history-trigger"
import { AppInfoTrigger } from "@/app/components/layout/app-info/app-info-trigger"
import { ButtonNewChat } from "@/app/components/layout/button-new-chat"
import { UserMenu } from "@/app/components/layout/user-menu"
import { useBreakpoint } from "@/app/hooks/use-breakpoint"
import { ZolaFaviconIcon } from "@/components/icons/zola"
import { APP_NAME } from "@/lib/config"
import { useUserPreferences } from "@/lib/user-preference-store/provider"
import { useUser } from "@/lib/user-store/provider"
import Link from "next/link"
import { CreditsDisplay } from "./credits-display"
import { DialogPublish } from "./dialog-publish"
import { HeaderSidebarTrigger } from "./header-sidebar-trigger"

export function Header({ hasSidebar }: { hasSidebar: boolean }) {
  const isMobile = useBreakpoint(768)
  const { user } = useUser()
  const { preferences } = useUserPreferences()
  const isMultiModelEnabled = preferences.multiModelEnabled

  const isLoggedIn = !!user

  return (
    <header className="h-app-header pointer-events-none fixed top-0 right-0 left-0 z-50">
      <div className="relative mx-auto flex h-full max-w-full items-center justify-between bg-transparent px-4 sm:px-6 lg:bg-transparent lg:px-8">
        <div className="flex flex-1 items-center justify-between">
          <div className="-ml-0.5 flex flex-1 items-center gap-2 lg:-ml-2.5">
            <div className="flex flex-1 items-center gap-2">
              <Link
                href="/"
                className="pointer-events-auto inline-flex items-center gap-1.5 text-base font-medium tracking-tight"
              >
                <ZolaFaviconIcon className="size-7" />
                <span className="font-semibold tracking-[-0.01em]">Notto</span>
                <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text font-semibold tracking-[-0.01em] text-transparent">AI</span>
              </Link>
              {hasSidebar && isMobile && <HeaderSidebarTrigger />}
            </div>
          </div>
          <div />
          <div className="pointer-events-auto flex flex-1 items-center justify-end gap-2">
            {isLoggedIn && <CreditsDisplay />}
            {isLoggedIn && !isMultiModelEnabled && <DialogPublish />}
            {isLoggedIn && <ButtonNewChat />}
            {isLoggedIn && !hasSidebar && <HistoryTrigger hasSidebar={hasSidebar} />}
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
