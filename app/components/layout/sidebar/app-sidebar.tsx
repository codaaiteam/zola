"use client"

import { groupChatsByDate } from "@/app/components/history/utils"
import { useBreakpoint } from "@/app/hooks/use-breakpoint"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ZolaFaviconIcon } from "@/components/icons/zola"
import { useChats } from "@/lib/chat-store/chats/provider"
import {
  ChatTeardropText,
  CrownSimple,
  Compass,
  Envelope,
  MagnifyingGlass,
  Megaphone,
  Moon,
  NotePencilIcon,
  SidebarSimpleIcon,
  Sun,
  X,
} from "@phosphor-icons/react"
import { Pin } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { FeedbackForm } from "@/components/common/feedback-form"
import { useUser } from "@/lib/user-store/provider"
import { HistoryTrigger } from "../../history/history-trigger"
import { SidebarList } from "./sidebar-list"
import { SidebarProject } from "./sidebar-project"

export function AppSidebar() {
  const isMobile = useBreakpoint(768)
  const { setOpenMobile, toggleSidebar, state } = useSidebar()
  const isCollapsed = state === "collapsed"
  const { chats, pinnedChats, isLoading } = useChats()
  const { user } = useUser()
  const [showFeedback, setShowFeedback] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const params = useParams<{ chatId: string }>()
  const currentChatId = params.chatId

  const groupedChats = useMemo(() => {
    const result = groupChatsByDate(chats, "")
    return result
  }, [chats])
  const hasChats = chats.length > 0
  const router = useRouter()

  return (
    <Sidebar
      collapsible={isMobile ? "offcanvas" : "icon"}
      variant="sidebar"
      className="border-border/40 border-r bg-transparent"
    >
      <SidebarHeader className={isCollapsed ? "px-1 py-3" : "px-3 py-3"}>
        <div className={`flex items-center ${isCollapsed ? "flex-col" : "justify-between"}`}>
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={toggleSidebar}
                  className="group/logo hover:bg-muted relative inline-flex size-9 items-center justify-center rounded-md transition-colors"
                >
                  <ZolaFaviconIcon className="size-7 shrink-0 transition-opacity group-hover/logo:opacity-0" />
                  <SidebarSimpleIcon
                    size={20}
                    className="absolute opacity-0 transition-opacity group-hover/logo:opacity-100"
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Expand sidebar</TooltipContent>
            </Tooltip>
          ) : (
            <>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-md px-1 py-1 text-base font-medium tracking-tight transition-colors"
              >
                <ZolaFaviconIcon className="size-7 shrink-0" />
                <span className="font-medium">Notto</span>
                <span className="font-normal opacity-80">AI</span>
              </Link>
              {isMobile ? (
                <button
                  type="button"
                  onClick={() => setOpenMobile(false)}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted inline-flex size-9 items-center justify-center rounded-md bg-transparent transition-colors"
                >
                  <X size={20} />
                </button>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={toggleSidebar}
                      className="text-muted-foreground hover:text-foreground hover:bg-muted inline-flex size-9 items-center justify-center rounded-md transition-colors"
                    >
                      <SidebarSimpleIcon size={20} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Collapse sidebar</TooltipContent>
                </Tooltip>
              )}
            </>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="border-border/40 border-t">
        <ScrollArea className={`flex h-full ${isCollapsed ? "px-1" : "px-3"} [&>div>div]:!block`}>
          <div className="mt-3 mb-5 flex w-full flex-col items-start gap-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="hover:bg-accent/80 hover:text-foreground text-primary group/new-chat relative inline-flex w-full items-center justify-center rounded-md bg-transparent px-2 py-2 text-sm transition-colors"
                  type="button"
                  onClick={() => router.push("/")}
                >
                  <div className="flex items-center gap-2">
                    <NotePencilIcon size={20} className="shrink-0" />
                    {!isCollapsed && "New Chat"}
                  </div>
                  {!isCollapsed && (
                    <div className="text-muted-foreground ml-auto text-xs opacity-0 duration-150 group-hover/new-chat:opacity-100">
                      ⌘⇧U
                    </div>
                  )}
                </button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">New Chat</TooltipContent>
              )}
            </Tooltip>
            {!isCollapsed && (
              <HistoryTrigger
                hasSidebar={false}
                classNameTrigger="bg-transparent hover:bg-accent/80 hover:text-foreground text-primary relative inline-flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors group/search"
                icon={<MagnifyingGlass size={24} className="mr-2" />}
                label={
                  <div className="flex w-full items-center gap-2">
                    <span>Search</span>
                    <div className="text-muted-foreground ml-auto text-xs opacity-0 duration-150 group-hover/search:opacity-100">
                      ⌘+K
                    </div>
                  </div>
                }
                hasPopover={false}
              />
            )}
            {isCollapsed && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="hover:bg-accent/80 hover:text-foreground text-primary inline-flex w-full items-center justify-center rounded-md bg-transparent px-2 py-2 text-sm transition-colors"
                    type="button"
                    onClick={() => {
                      // Open search via keyboard shortcut simulation
                      const event = new KeyboardEvent("keydown", {
                        key: "k",
                        metaKey: true,
                        bubbles: true,
                      })
                      document.dispatchEvent(event)
                    }}
                  >
                    <MagnifyingGlass size={20} className="shrink-0" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">Search</TooltipContent>
              </Tooltip>
            )}
          </div>
          {/* Navigation Links */}
          <div className="mb-3 flex w-full flex-col items-start gap-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/pricing"
                  className="hover:bg-accent/80 hover:text-foreground text-primary group/nav relative inline-flex w-full items-center rounded-md bg-transparent px-2 py-2 text-sm transition-colors"
                >
                  <div className={`flex items-center ${isCollapsed ? "justify-center w-full" : "gap-2"}`}>
                    <CrownSimple size={20} className="shrink-0" />
                    {!isCollapsed && "Upgrade Plan"}
                  </div>
                </Link>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">Upgrade Plan</TooltipContent>
              )}
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className="hover:bg-accent/80 hover:text-foreground text-primary group/nav relative inline-flex w-full items-center rounded-md bg-transparent px-2 py-2 text-sm transition-colors"
                >
                  <div className={`flex items-center ${isCollapsed ? "justify-center w-full" : "gap-2"}`}>
                    <Compass size={20} className="shrink-0" />
                    {!isCollapsed && "Explore Models"}
                  </div>
                </Link>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">Explore Models</TooltipContent>
              )}
            </Tooltip>
          </div>
          {!isCollapsed && (
            <>
              <SidebarProject />
              {isLoading ? (
                <div className="h-full" />
              ) : hasChats ? (
                <div className="space-y-5">
                  {pinnedChats.length > 0 && (
                    <div className="space-y-5">
                      <SidebarList
                        key="pinned"
                        title="Pinned"
                        icon={<Pin className="size-3" />}
                        items={pinnedChats}
                        currentChatId={currentChatId}
                      />
                    </div>
                  )}
                  {groupedChats?.map((group) => (
                    <SidebarList
                      key={group.name}
                      title={group.name}
                      items={group.chats}
                      currentChatId={currentChatId}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex h-[calc(100vh-160px)] flex-col items-center justify-center">
                  <ChatTeardropText
                    size={24}
                    className="text-muted-foreground mb-1 opacity-40"
                  />
                  <div className="text-muted-foreground text-center">
                    <p className="mb-1 text-base font-medium">No chats yet</p>
                    <p className="text-sm opacity-70">Start a new conversation</p>
                  </div>
                </div>
              )}
            </>
          )}
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className={`border-border/40 mb-2 border-t ${isCollapsed ? "p-1" : "p-3"}`}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className={`hover:bg-muted text-sidebar-foreground flex w-full items-center rounded-md text-sm transition-colors ${isCollapsed ? "justify-center px-0 py-2" : "gap-2 px-2 py-1.5"}`}
            >
              {mounted && resolvedTheme === "dark" ? (
                <Sun size={16} className="shrink-0" />
              ) : (
                <Moon size={16} className="shrink-0" />
              )}
              {!isCollapsed && (
                <span>{mounted && resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              )}
            </button>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right">
              {mounted && resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
            </TooltipContent>
          )}
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/pricing"
              className={`hover:bg-muted text-sidebar-foreground flex items-center rounded-md text-sm transition-colors ${isCollapsed ? "justify-center px-0 py-2" : "gap-2 px-2 py-1.5"}`}
            >
              <CrownSimple size={16} className="shrink-0" />
              {!isCollapsed && <span>Pricing</span>}
            </Link>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right">Pricing</TooltipContent>
          )}
        </Tooltip>
        <div className="relative">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => setShowFeedback(!showFeedback)}
                className={`hover:bg-muted text-sidebar-foreground flex w-full items-center rounded-md text-sm transition-colors ${isCollapsed ? "justify-center px-0 py-2" : "gap-2 px-2 py-1.5"}`}
              >
                <Megaphone size={16} className="shrink-0" />
                {!isCollapsed && <span>Feedback</span>}
              </button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">Feedback</TooltipContent>
            )}
          </Tooltip>

          {showFeedback && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowFeedback(false)} />
              <div className="absolute bottom-0 left-full z-50 ml-2 w-80 rounded-xl border bg-popover shadow-lg">
                <FeedbackForm authUserId={user?.id} onClose={() => setShowFeedback(false)} />
              </div>
            </>
          )}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="mailto:contact@nottoai.com"
              className={`hover:bg-muted text-sidebar-foreground flex items-center rounded-md text-sm transition-colors ${isCollapsed ? "justify-center px-0 py-2" : "gap-2 px-2 py-1.5"}`}
            >
              <Envelope size={16} className="shrink-0" />
              {!isCollapsed && <span>Contact</span>}
            </a>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right">Contact</TooltipContent>
          )}
        </Tooltip>
      </SidebarFooter>
    </Sidebar>
  )
}
