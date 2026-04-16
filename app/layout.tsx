import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ChatsProvider } from "@/lib/chat-store/chats/provider"
import { ChatSessionProvider } from "@/lib/chat-store/session/provider"
import { ModelProvider } from "@/lib/model-store/provider"
import { TanstackQueryProvider } from "@/lib/tanstack-query/tanstack-query-provider"
import { UserPreferencesProvider } from "@/lib/user-preference-store/provider"
import { UserProvider } from "@/lib/user-store/provider"
import { getUserProfile } from "@/lib/user/api"
import { ThemeProvider } from "next-themes"
import Script from "next/script"
import { LayoutClient } from "./layout-client"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://nottoai.com"),
  title: {
    default:
      "NottoAI — One Chat, Every AI Model | GPT-5.4, Claude, Gemini & More",
    template: "%s | NottoAI",
  },
  description:
    "Access GPT-5.4, Claude Opus, Gemini Pro, DeepSeek, Grok and 16+ AI models in one place. Stop paying for multiple AI subscriptions. Start free.",
  keywords: [
    "AI chat",
    "ChatGPT alternative",
    "Claude",
    "Gemini",
    "GPT-5.4",
    "AI models",
    "multi-model AI",
    "AI subscription",
    "DeepSeek",
    "Grok",
    "AI assistant",
    "NottoAI",
  ],
  openGraph: {
    title: "NottoAI — One Chat, Every AI Model",
    description:
      "Access GPT-5.4, Claude, Gemini, DeepSeek, Grok and 16+ AI models in one place. Start free with 100 credits.",
    url: "https://nottoai.com",
    siteName: "NottoAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NottoAI — One Chat, Every AI Model",
    description:
      "Access 16+ AI models in one place. Stop paying for multiple subscriptions.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isDev = process.env.NODE_ENV === "development"
  const isOfficialDeployment = process.env.ZOLA_OFFICIAL === "true"
  const userProfile = await getUserProfile()

  return (
    <html lang="en" suppressHydrationWarning>
      <Script
        defer
        data-domain="nottoai.com"
        src="https://app.pageview.app/js/script.js"
      />
      {isOfficialDeployment ? (
        <Script
          defer
          src="https://assets.onedollarstats.com/stonks.js"
          {...(isDev ? { "data-debug": "nottoai.com" } : {})}
        />
      ) : null}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
        >
          <TanstackQueryProvider>
            <LayoutClient />
            <UserProvider initialUser={userProfile}>
              <ModelProvider>
                <ChatsProvider userId={userProfile?.id}>
                  <ChatSessionProvider>
                    <UserPreferencesProvider
                      userId={userProfile?.id}
                      initialPreferences={userProfile?.preferences}
                    >
                      <TooltipProvider
                        delayDuration={200}
                        skipDelayDuration={500}
                      >
                        <ThemeProvider
                          attribute="class"
                          defaultTheme="light"
                          enableSystem
                          disableTransitionOnChange
                        >
                          <SidebarProvider defaultOpen>
                            <Toaster position="top-center" />
                            {children}
                          </SidebarProvider>
                        </ThemeProvider>
                      </TooltipProvider>
                    </UserPreferencesProvider>
                  </ChatSessionProvider>
                </ChatsProvider>
              </ModelProvider>
            </UserProvider>
          </TanstackQueryProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
