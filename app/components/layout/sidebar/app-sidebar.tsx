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
import { useChats } from "@/lib/chat-store/chats/provider"
import {
  ChatTeardropText,
  CrownSimple,
  Compass,
  Envelope,
  MagnifyingGlass,
  Megaphone,
  NotePencilIcon,
  X,
} from "@phosphor-icons/react"
import { Pin } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { FeedbackForm } from "@/components/common/feedback-form"
import { useUser } from "@/lib/user-store/provider"
import { HistoryTrigger } from "../../history/history-trigger"
import { SidebarList } from "./sidebar-list"
import { SidebarProject } from "./sidebar-project"

export function AppSidebar() {
  const isMobile = useBreakpoint(768)
  const { setOpenMobile } = useSidebar()
  const { chats, pinnedChats, isLoading } = useChats()
  const { user } = useUser()
  const [showFeedback, setShowFeedback] = useState(false)
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
      collapsible="offcanvas"
      variant="sidebar"
      className="border-border/40 border-r bg-transparent"
    >
      <SidebarHeader className="h-14 pl-3">
        <div className="flex justify-between">
          {isMobile ? (
            <button
              type="button"
              onClick={() => setOpenMobile(false)}
              className="text-muted-foreground hover:text-foreground hover:bg-muted inline-flex size-9 items-center justify-center rounded-md bg-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <X size={24} />
            </button>
          ) : (
            <div className="h-full" />
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="border-border/40 border-t">
        <ScrollArea className="flex h-full px-3 [&>div>div]:!block">
          <div className="mt-3 mb-5 flex w-full flex-col items-start gap-0">
            <button
              className="hover:bg-accent/80 hover:text-foreground text-primary group/new-chat relative inline-flex w-full items-center rounded-md bg-transparent px-2 py-2 text-sm transition-colors"
              type="button"
              onClick={() => router.push("/")}
            >
              <div className="flex items-center gap-2">
                <NotePencilIcon size={20} />
                New Chat
              </div>
              <div className="text-muted-foreground ml-auto text-xs opacity-0 duration-150 group-hover/new-chat:opacity-100">
                ⌘⇧U
              </div>
            </button>
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
          </div>
          {/* Navigation Links */}
          <div className="mb-3 flex w-full flex-col items-start gap-0">
            <Link
              href="/pricing"
              className="hover:bg-accent/80 hover:text-foreground text-primary group/nav relative inline-flex w-full items-center rounded-md bg-transparent px-2 py-2 text-sm transition-colors"
            >
              <div className="flex items-center gap-2">
                <CrownSimple size={20} />
                Upgrade Plan
              </div>
            </Link>
            <Link
              href="/"
              className="hover:bg-accent/80 hover:text-foreground text-primary group/nav relative inline-flex w-full items-center rounded-md bg-transparent px-2 py-2 text-sm transition-colors"
            >
              <div className="flex items-center gap-2">
                <Compass size={20} />
                Explore Models
              </div>
            </Link>
          </div>
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
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="border-border/40 mb-2 border-t p-3">
        <Link
          href="/pricing"
          className="hover:bg-muted text-sidebar-foreground flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors"
        >
          <CrownSimple size={16} />
          <span>Pricing</span>
        </Link>
        <button
          type="button"
          onClick={() => setShowFeedback(true)}
          className="hover:bg-muted text-sidebar-foreground flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors"
        >
          <Megaphone size={16} />
          <span>Feedback</span>
        </button>

        {/* Feedback dialog */}
        {showFeedback && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowFeedback(false)}>
            <div
              className="bg-popover w-full max-w-sm rounded-xl border shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <FeedbackForm authUserId={user?.id} onClose={() => setShowFeedback(false)} />
            </div>
          </div>
        )}
        <a
          href="mailto:contact@nottoai.com"
          className="hover:bg-muted text-sidebar-foreground flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors"
        >
          <Envelope size={16} />
          <span>Contact</span>
        </a>
      </SidebarFooter>
    </Sidebar>
  )
}
