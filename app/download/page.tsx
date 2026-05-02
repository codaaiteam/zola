"use client"

import { Button } from "@/components/ui/button"
import { ZolaFaviconIcon } from "@/components/icons/zola"
import { AppleLogo, Desktop, DeviceMobile } from "@phosphor-icons/react"
import Link from "next/link"

const DOWNLOAD_URL =
  "https://downloads.nottoai.com/NottoAI.dmg"

export default function DownloadPage() {
  return (
    <div className="bg-background min-h-screen w-screen">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-base font-medium tracking-tight"
          >
            <ZolaFaviconIcon className="size-7" />
            <span className="font-medium">Notto</span>
            <span className="font-normal opacity-80">AI</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/pricing">
              <Button variant="ghost" size="sm">
                Pricing
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">
                Back to Chat
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-12 text-center">
          <h1 className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
            Download NottoAI
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Chat with the best AI models. Available on Mac, with iOS coming soon.
          </p>
        </div>

        {/* Download Cards */}
        <div className="mx-auto grid max-w-2xl gap-8 md:grid-cols-2">
          {/* Mac App */}
          <div className="relative flex flex-col items-center rounded-2xl border-2 border-[#10B981] p-8 shadow-lg shadow-[#10B981]/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#10B981] px-3 py-0.5 text-xs font-medium text-white">
              Available Now
            </div>
            <Desktop size={48} className="text-foreground mb-4" />
            <h2 className="text-foreground mb-1 text-xl font-semibold">Mac App</h2>
            <p className="text-muted-foreground mb-1 text-sm">
              macOS 10.15 or later
            </p>
            <p className="text-muted-foreground mb-6 text-xs">
              Apple Silicon (M1+) &middot; 3 MB
            </p>
            <a
              href={DOWNLOAD_URL}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#10B981] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0ea572]"
            >
              <AppleLogo size={18} weight="fill" />
              Download for Mac
            </a>
          </div>

          {/* iOS App */}
          <div className="border-border flex flex-col items-center rounded-2xl border p-8 opacity-60">
            <DeviceMobile size={48} className="text-foreground mb-4" />
            <h2 className="text-foreground mb-1 text-xl font-semibold">iOS App</h2>
            <p className="text-muted-foreground mb-1 text-sm">
              iPhone &amp; iPad
            </p>
            <p className="text-muted-foreground mb-6 text-xs">Coming Soon</p>
            <Button
              disabled
              variant="outline"
              className="w-full cursor-not-allowed gap-2"
            >
              <AppleLogo size={18} weight="fill" />
              App Store
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <h2 className="text-foreground mb-8 text-center text-2xl font-semibold">
            Why the Desktop App?
          </h2>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { title: "Lightweight", desc: "Only 3 MB. Built with native WebKit, not Electron." },
              { title: "Fast Launch", desc: "Opens instantly. No browser tabs needed." },
              { title: "Native Experience", desc: "Menu bar shortcuts, window management, and offline detection." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border p-4 text-center">
                <div className="text-foreground text-sm font-medium">{item.title}</div>
                <div className="text-muted-foreground mt-1 text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Web alternative */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-[#10B981]/30 bg-[#10B981]/5 px-6 py-3 text-sm font-medium text-[#10B981] transition-all hover:border-[#10B981]/50 hover:bg-[#10B981]/10"
          >
            Or use NottoAI on the web — no download required
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </main>
    </div>
  )
}
