"use client"

import { ZolaFaviconIcon } from "@/components/icons/zola"
import { AppleLogo, Desktop, DeviceMobile } from "@phosphor-icons/react"
import Link from "next/link"

const DOWNLOAD_URL =
  "https://downloads.nottoai.com/NottoAI.dmg"

export default function DownloadPage() {
  return (
    <div className="min-h-screen w-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-base font-medium tracking-tight"
          >
            <ZolaFaviconIcon className="size-7" />
            <span className="font-medium text-white">Notto</span>
            <span className="font-normal text-white/60">AI</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/pricing"
              className="rounded-md px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Pricing
            </Link>
            <Link
              href="/"
              className="rounded-md px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Back to Chat
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Download NottoAI
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            Chat with the best AI models. Available on Mac, with iOS coming soon.
          </p>
        </div>

        {/* Download Cards */}
        <div className="mx-auto grid max-w-2xl gap-8 md:grid-cols-2">
          {/* Mac App */}
          <div className="relative flex flex-col items-center rounded-2xl border-2 border-[#10B981] bg-zinc-900 p-8 shadow-lg shadow-[#10B981]/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#10B981] px-3 py-0.5 text-xs font-medium text-white">
              Available Now
            </div>
            <Desktop size={48} className="mb-4 text-white" />
            <h2 className="mb-1 text-xl font-semibold">Mac App</h2>
            <p className="mb-1 text-sm text-zinc-400">
              macOS 10.15 or later
            </p>
            <p className="mb-6 text-xs text-zinc-500">
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
          <div className="flex flex-col items-center rounded-2xl border border-zinc-800 bg-zinc-900 p-8 opacity-50">
            <DeviceMobile size={48} className="mb-4 text-white" />
            <h2 className="mb-1 text-xl font-semibold">iOS App</h2>
            <p className="mb-1 text-sm text-zinc-400">
              iPhone &amp; iPad
            </p>
            <p className="mb-6 text-xs text-zinc-500">Coming Soon</p>
            <button
              disabled
              className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-6 py-3 text-sm font-medium text-zinc-500"
            >
              <AppleLogo size={18} weight="fill" />
              App Store
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <h2 className="mb-8 text-center text-2xl font-semibold">
            Why the Desktop App?
          </h2>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { title: "Lightweight", desc: "Only 3 MB. Built with native WebKit, not Electron." },
              { title: "Fast Launch", desc: "Opens instantly. No browser tabs needed." },
              { title: "Native Experience", desc: "Menu bar shortcuts, window management, and offline detection." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center">
                <div className="text-sm font-medium text-white">{item.title}</div>
                <div className="mt-1 text-xs text-zinc-500">{item.desc}</div>
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
