export function AppInfoContent() {
  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        <span className="font-semibold tracking-[-0.02em]">Notto<span className="italic">AI</span></span> — AI chat with 16+ models.
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
