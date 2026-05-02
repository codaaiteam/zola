"use client"

import { ZolaFaviconIcon } from "@/components/icons/zola"
import { AppleLogo, Desktop, DeviceMobile } from "@phosphor-icons/react"
import Link from "next/link"

const DOWNLOAD_URL =
  "https://downloads.nottoai.com/NottoAI.dmg"

export default function DownloadPage() {
  return (
    <div className="bg-background flex min-h-dvh flex-col items-center justify-center px-4 py-16">
      <Link href="/" className="mb-8 inline-flex items-center gap-2">
        <ZolaFaviconIcon className="size-10" />
        <span className="text-2xl font-semibold">Notto</span>
        <span className="text-2xl font-normal opacity-80">AI</span>
      </Link>

      <h1 className="mb-3 text-center text-4xl font-bold tracking-tight">
        Download NottoAI
      </h1>
      <p className="text-muted-foreground mb-12 max-w-md text-center text-lg">
        Chat with the best AI models. Available on Mac, with iOS coming soon.
      </p>

      <div className="grid w-full max-w-2xl gap-6 md:grid-cols-2">
        {/* Mac App */}
        <div className="border-border bg-card flex flex-col items-center rounded-2xl border p-8 shadow-sm">
          <Desktop size={48} className="text-foreground mb-4" />
          <h2 className="mb-1 text-xl font-semibold">Mac App</h2>
          <p className="text-muted-foreground mb-1 text-sm">
            macOS 10.15 or later
          </p>
          <p className="text-muted-foreground mb-6 text-xs">
            AppleLogo Silicon (M1+) &middot; 3 MB
          </p>
          <a
            href={DOWNLOAD_URL}
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors"
          >
            <AppleLogo size={18} weight="fill" />
            Download for Mac
          </a>
        </div>

        {/* iOS App */}
        <div className="border-border bg-card flex flex-col items-center rounded-2xl border p-8 shadow-sm opacity-60">
          <DeviceMobile size={48} className="text-foreground mb-4" />
          <h2 className="mb-1 text-xl font-semibold">iOS App</h2>
          <p className="text-muted-foreground mb-1 text-sm">
            iPhone &amp; iPad
          </p>
          <p className="text-muted-foreground mb-6 text-xs">Coming Soon</p>
          <button
            disabled
            className="bg-muted text-muted-foreground inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium"
          >
            <AppleLogo size={18} weight="fill" />
            App Store
          </button>
        </div>
      </div>

      <p className="text-muted-foreground mt-8 text-center text-xs">
        NottoAI is also available on the{" "}
        <Link href="/" className="text-primary hover:underline">
          web
        </Link>
        . No download required.
      </p>
    </div>
  )
}
