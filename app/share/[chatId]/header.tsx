import { ZolaFaviconIcon } from "@/components/icons/zola"
import { APP_NAME } from "@/lib/config"
import Link from "next/link"
import React from "react"

export function Header() {
  return (
    <header className="h-app-header fixed top-0 right-0 left-0 z-50">
      <div className="h-app-header top-app-header bg-background pointer-events-none absolute left-0 z-50 mx-auto w-full to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] lg:hidden"></div>
      <div className="bg-background relative mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:bg-transparent lg:px-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-base font-medium tracking-tight">
          <ZolaFaviconIcon className="size-7" />
          <span className="font-semibold tracking-[-0.02em]">Notto</span>
          <span className="font-semibold italic tracking-[-0.02em]">AI</span>
        </Link>
      </div>
    </header>
  )
}
