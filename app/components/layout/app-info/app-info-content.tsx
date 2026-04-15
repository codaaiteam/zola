export function AppInfoContent() {
  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        <span className="font-semibold tracking-[-0.02em]">Notto<span className="relative">AI<svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 24 6" fill="none"><path d="M1 4.5C4 1.5 8 1 12 3s8 1.5 11-1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="text-emerald-500" /></svg></span></span> — AI chat with 16+ models.
        <br />
        GPT-5.4, Claude, Gemini, Grok, DeepSeek and more, all in one place.
      </p>
      <p className="text-muted-foreground text-sm">
        Questions? Contact{" "}
        <a
          href="mailto:support@nottoai.com"
          className="underline"
        >
          support@nottoai.com
        </a>
      </p>
    </div>
  )
}
