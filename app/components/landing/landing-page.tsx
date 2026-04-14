"use client"

import Link from "next/link"
import { ZolaFaviconIcon } from "@/components/icons/zola"
import { SignInButton } from "@clerk/nextjs"
import { motion, useInView, useScroll, useTransform } from "motion/react"
import { useRef, useEffect, useState, type ReactNode, type SVGProps } from "react"
import {
  Zap,
  KeyRound,
  Globe,
  FileUp,
  MessageSquareText,
  ArrowLeftRight,
} from "lucide-react"
import OpenAIIcon from "@/components/icons/openai"
import AnthropicIcon from "@/components/icons/anthropic"
import GeminiIcon from "@/components/icons/gemini"
import DeepSeekIcon from "@/components/icons/deepseek"
import GrokIcon from "@/components/icons/grok"
import PerplexityIcon from "@/components/icons/perplexity"
import XaiIcon from "@/components/icons/xai"
import MetaIcon from "@/components/icons/meta"

/* ─── Data ─── */

const MODEL_LOGOS: { icon: (p: SVGProps<SVGSVGElement>) => ReactNode; name: string; label: string }[] = [
  { icon: OpenAIIcon, name: "OpenAI", label: "GPT-5.4" },
  { icon: AnthropicIcon, name: "Anthropic", label: "Claude" },
  { icon: GeminiIcon, name: "Google", label: "Gemini" },
  { icon: DeepSeekIcon, name: "DeepSeek", label: "DeepSeek" },
  { icon: GrokIcon, name: "xAI", label: "Grok" },
  { icon: PerplexityIcon, name: "Perplexity", label: "Perplexity" },
  { icon: MetaIcon, name: "Meta", label: "Llama" },
]

const WHY_BETTER = [
  { us: "All 16+ models in one place", them: "One model per $20/mo subscription" },
  { us: "Switch models mid-conversation", them: "Copy-paste between tabs" },
  { us: "Compare answers from different AIs", them: "Guess which AI is better" },
  { us: "One bill, all models included", them: "4+ separate subscriptions" },
]

const STEPS = [
  { num: "1", title: "Ask anything", desc: "Type your question. NottoAI works with every AI model." },
  { num: "2", title: "Switch models instantly", desc: "Try GPT-5.4, then Claude, then Gemini — one click." },
  { num: "3", title: "Get better answers", desc: "Different models excel at different tasks. Use the best one." },
]

const FEATURES = [
  { icon: Zap, iconColor: "text-emerald-500", title: "All Models, One Price", description: "GPT-5.4, Claude, Gemini, Grok, DeepSeek — 16+ models, zero separate subscriptions." },
  { icon: KeyRound, iconColor: "text-violet-500", title: "Bring Your Own Keys", description: "Use your own API keys. AES-256 encrypted, never stored in plain text." },
  { icon: Globe, iconColor: "text-cyan-500", title: "Web Search Built In", description: "Real-time answers with integrated web search. No tab switching." },
  { icon: FileUp, iconColor: "text-amber-500", title: "File Uploads", description: "Upload images, PDFs, documents. Analyze any file with any model." },
  { icon: MessageSquareText, iconColor: "text-blue-500", title: "Conversation History", description: "All chats saved and searchable. Pick up where you left off." },
  { icon: ArrowLeftRight, iconColor: "text-rose-500", title: "Switch Mid-Chat", description: "Start with GPT, continue with Claude, compare with Gemini — same thread." },
]

const MODELS_GRID = [
  { icon: OpenAIIcon, name: "GPT-5.4 Nano", tag: "Fast", color: "text-blue-600 bg-blue-50" },
  { icon: OpenAIIcon, name: "GPT-5.4", tag: "Smart", color: "text-blue-600 bg-blue-50" },
  { icon: OpenAIIcon, name: "GPT-5.4 Pro", tag: "Best", color: "text-violet-600 bg-violet-50" },
  { icon: OpenAIIcon, name: "O4 Mini", tag: "Reasoning", color: "text-orange-600 bg-orange-50" },
  { icon: AnthropicIcon, name: "Claude Sonnet", tag: "Writing", color: "text-amber-600 bg-amber-50" },
  { icon: AnthropicIcon, name: "Claude Opus", tag: "Premium", color: "text-violet-600 bg-violet-50" },
  { icon: GeminiIcon, name: "Gemini Pro", tag: "Research", color: "text-cyan-600 bg-cyan-50" },
  { icon: GrokIcon, name: "Grok 4.20", tag: "Creative", color: "text-rose-600 bg-rose-50" },
  { icon: DeepSeekIcon, name: "DeepSeek V3", tag: "Free", color: "text-emerald-600 bg-emerald-50" },
  { icon: DeepSeekIcon, name: "DeepSeek R1", tag: "Free", color: "text-emerald-600 bg-emerald-50" },
  { icon: PerplexityIcon, name: "Sonar Pro", tag: "Search", color: "text-teal-600 bg-teal-50" },
  { icon: MetaIcon, name: "Llama 3.3", tag: "Free", color: "text-emerald-600 bg-emerald-50" },
]

/* ─── Animation helpers ─── */

function FadeIn({ children, delay = 0, y = 30, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

function StaggerWrap({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={{ visible: { transition: { staggerChildren: 0.08 } }, hidden: {} }} className={className}>
      {children}
    </motion.div>
  )
}

const staggerChild = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.max(1, Math.ceil(value / 60))
    const timer = setInterval(() => {
      start += step
      if (start >= value) { setCount(value); clearInterval(timer) } else { setCount(start) }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])
  return <span ref={ref} className="tabular-nums">{count.toLocaleString()}{suffix}</span>
}

/* Word-by-word reveal */
function TextReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.4, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="mr-[0.28em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

/* Auto-cycling model demo in the chat mockup */
const DEMO_MODELS = [
  { icon: OpenAIIcon, label: "GPT-5.4", response: "React excels with its massive ecosystem and job market. Vue offers a gentler learning curve with built-in state management." },
  { icon: AnthropicIcon, label: "Claude", response: "For a SaaS project, React gives you more hiring options and community support. Vue shines for smaller teams wanting faster development." },
  { icon: GeminiIcon, label: "Gemini", response: "React: 40% market share, JSX flexibility, Next.js ecosystem. Vue: simpler mental model, official router + Pinia, great DX." },
]

function ChatDemo() {
  const [activeModel, setActiveModel] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const interval = setInterval(() => {
      setIsTyping(true)
      setTimeout(() => {
        setActiveModel((prev) => (prev + 1) % DEMO_MODELS.length)
        setIsTyping(false)
      }, 600)
    }, 4000)
    return () => clearInterval(interval)
  }, [inView])

  const model = DEMO_MODELS[activeModel]

  return (
    <div ref={ref} className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-2 border-b border-zinc-100 bg-zinc-50/80 px-5 py-3.5">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28CA41]" />
        <span className="ml-3 text-xs font-medium text-zinc-400">NottoAI</span>
      </div>
      <div className="flex flex-col gap-6 p-8 sm:p-12">
        {/* User message */}
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white">U</div>
          <div className="rounded-2xl rounded-tl-sm bg-zinc-100 px-5 py-3"><p className="text-sm text-zinc-700">Compare React vs Vue for a new SaaS project</p></div>
        </div>
        {/* AI response — animates on model switch */}
        <div className="flex items-start gap-3">
          <motion.div
            key={activeModel}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500"
          >
            <model.icon className="h-5 w-5 invert" />
          </motion.div>
          <div className="max-w-xl rounded-2xl rounded-tl-sm border border-zinc-100 bg-white px-5 py-3 shadow-sm">
            {isTyping ? (
              <div className="flex items-center gap-1 py-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-300" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-300" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-300" style={{ animationDelay: "300ms" }} />
              </div>
            ) : (
              <motion.p
                key={activeModel}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-sm leading-relaxed text-zinc-600"
              >
                {model.response}
              </motion.p>
            )}
          </div>
        </div>
        {/* Model chips — active one highlights */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
          {DEMO_MODELS.map(({ icon: Icon, label }, i) => (
            <motion.button
              key={label}
              onClick={() => { setIsTyping(true); setTimeout(() => { setActiveModel(i); setIsTyping(false) }, 400) }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition-all ${
                i === activeModel
                  ? "border-2 border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-500/10"
                  : "border border-zinc-200 bg-white text-zinc-500 hover:border-emerald-300 hover:bg-emerald-50/50 hover:text-emerald-600"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />{label}
            </motion.button>
          ))}
          {MODEL_LOGOS.slice(3, 6).map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-2 text-xs text-zinc-400">
              <Icon className="h-3.5 w-3.5" />{label}
            </div>
          ))}
          <span className="rounded-full border border-dashed border-zinc-300 bg-white px-3.5 py-2 text-xs text-zinc-400">+8 more</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Page ─── */

export function LandingPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white text-zinc-900">
      {/* Glassmorphic nav */}
      <header className="sticky top-0 z-20 border-b border-white/20 bg-white/60 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
          <Link href="/" className="inline-flex items-center gap-1.5 text-base font-medium tracking-tight">
            <ZolaFaviconIcon className="size-7" />
            <span className="font-semibold">Notto</span>
            <span className="font-normal opacity-50">AI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="hidden text-sm text-zinc-500 transition-colors hover:text-zinc-900 sm:inline">
              Pricing
            </Link>
            <SignInButton mode="modal">
              <button className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-50 hover:shadow-sm">
                Sign In
              </button>
            </SignInButton>
            <SignInButton mode="modal">
              <button className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-zinc-800 hover:shadow-md">
                Get Started Free
              </button>
            </SignInButton>
          </div>
        </div>
      </header>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative overflow-hidden">
        {/* Clean radial glow — Stripe/OpenAI style */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(16,185,129,0.12), transparent 60%), radial-gradient(ellipse 60% 40% at 25% 10%, rgba(16,185,129,0.06), transparent), radial-gradient(ellipse 60% 40% at 75% 5%, rgba(16,185,129,0.05), transparent)",
          }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative mx-auto max-w-7xl px-6 pb-20 pt-24 text-center sm:pt-32 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-5 py-2 shadow-sm backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" /></span>
            <span className="text-xs font-semibold tracking-wide text-emerald-700">16+ AI Models — One Subscription</span>
          </motion.div>

          {/* Cinematic headline */}
          <h1 className="mx-auto max-w-5xl text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[1.02] tracking-[-0.04em] text-zinc-900">
            <TextReveal text="Use GPT-5.4, Claude & Gemini" delay={0.2} />
            <br />
            <TextReveal text="in One Chat" delay={0.7} className="text-emerald-500" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-zinc-500 sm:text-xl"
          >
            <span className="font-semibold text-zinc-800">Pay once. Use every AI model.</span>
            <br />
            <span className="font-medium text-emerald-600">Save $50+ every month</span> vs separate tools.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <SignInButton mode="modal">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-zinc-900 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-zinc-900/20">
                <span className="relative z-10">Start Using All Models Now</span>
                <motion.span className="relative z-10" animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>→</motion.span>
                <span className="absolute inset-0 -z-0 bg-gradient-to-r from-emerald-600 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.button>
            </SignInButton>
            <Link href="/pricing" className="inline-flex items-center rounded-full border border-zinc-200 bg-white/60 px-8 py-4 text-base font-medium text-zinc-700 backdrop-blur-sm transition-all hover:bg-white hover:shadow-md">
              View Pricing
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-6 flex flex-col items-center gap-1.5">
            <p className="text-sm text-zinc-400">No credit card required · 500 free credits included</p>
            <p className="text-xs font-semibold text-zinc-500">Join 10,000+ users saving $50+/month</p>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ Stats ═══ */}
      <section className="border-y border-zinc-100 bg-zinc-50/60 py-10">
        <StaggerWrap className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-12 px-6 sm:gap-20">
          {[
            { value: 16, suffix: "+", label: "AI Models" },
            { value: 10000, suffix: "+", label: "Users" },
            { value: 50, suffix: "+", label: "Saved Monthly", prefix: "$" },
          ].map((s) => (
            <motion.div key={s.label} variants={staggerChild} className="text-center">
              <div className="text-3xl font-bold text-zinc-900 sm:text-4xl">{s.prefix}<Counter value={s.value} suffix={s.suffix} /></div>
              <p className="mt-1 text-sm text-zinc-500">{s.label}</p>
            </motion.div>
          ))}
        </StaggerWrap>
      </section>

      {/* ═══ Logo marquee ═══ */}
      <section className="overflow-hidden border-b border-zinc-100 bg-white py-12">
        <FadeIn><p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">Powered by the best AI models</p></FadeIn>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white to-transparent" />
          <motion.div className="flex w-max gap-6" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
            {[...MODEL_LOGOS, ...MODEL_LOGOS].map(({ icon: Icon, label }, i) => (
              <div key={`${label}-${i}`} className="flex shrink-0 items-center gap-3 rounded-2xl border border-zinc-100 bg-white px-5 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all hover:border-emerald-200 hover:shadow-md">
                <Icon className="h-7 w-7" />
                <span className="text-sm font-medium text-zinc-600">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ How it works ═══ */}
      <section className="relative overflow-hidden bg-zinc-950 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-12">
          <FadeIn>
            <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">How it works</p>
            <h2 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">Three Steps to<br /><span className="text-emerald-400">Better AI Answers</span></h2>
          </FadeIn>
          <StaggerWrap className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-3">
            {STEPS.map((step) => (
              <motion.div key={step.num} variants={staggerChild} className="group text-center">
                <motion.div whileHover={{ scale: 1.1, rotate: 6 }} className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-2xl font-bold text-emerald-400 backdrop-blur-sm transition-colors group-hover:bg-emerald-500/20">
                  {step.num}
                </motion.div>
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{step.desc}</p>
              </motion.div>
            ))}
          </StaggerWrap>
        </div>
      </section>

      {/* ═══ Chat mockup — auto-switching models ═══ */}
      <section className="bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <FadeIn>
            <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">See it in action</p>
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">Same Question, Different Models</h2>
          </FadeIn>
          <FadeIn y={40}>
            <ChatDemo />
          </FadeIn>
        </div>
      </section>

      {/* ═══ Why Better ═══ */}
      <section className="border-t border-zinc-100">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12">
          <FadeIn>
            <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600">Why switch</p>
            <h2 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">Why NottoAI is Better<br /><span className="text-emerald-500">Than ChatGPT</span></h2>
            <p className="mx-auto mb-16 mt-4 max-w-lg text-center text-lg text-zinc-500">ChatGPT gives you one model. We give you all of them.</p>
          </FadeIn>
          <FadeIn y={20}>
            <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-zinc-200 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
              <div className="grid grid-cols-2 border-b border-zinc-100 bg-zinc-50/80">
                <div className="px-6 py-4 text-sm font-bold text-emerald-600">✓ NottoAI</div>
                <div className="border-l border-zinc-100 px-6 py-4 text-sm font-bold text-zinc-400">✕ Individual Subscriptions</div>
              </div>
              {WHY_BETTER.map((row, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="grid grid-cols-2 border-b border-zinc-50 last:border-0 transition-colors hover:bg-emerald-50/40">
                  <div className="flex items-center gap-2.5 px-6 py-4"><span className="text-emerald-500">✓</span><span className="text-sm font-medium text-zinc-700">{row.us}</span></div>
                  <div className="flex items-center gap-2.5 border-l border-zinc-100 px-6 py-4"><span className="text-red-400">✕</span><span className="text-sm text-zinc-400">{row.them}</span></div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ Bento features ═══ */}
      <section className="border-t border-zinc-100 bg-zinc-50/50">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12">
          <FadeIn>
            <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">Features</p>
            <h2 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">Everything You Need</h2>
            <p className="mx-auto mb-16 mt-4 max-w-lg text-center text-lg text-zinc-500">Built for people who use AI every day</p>
          </FadeIn>
          <StaggerWrap className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feat) => {
              const Icon = feat.icon
              return (
                <motion.div key={feat.title} variants={staggerChild} whileHover={{ y: -4 }} className="group rounded-2xl border border-zinc-200/80 bg-white p-7 shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all hover:border-emerald-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                  <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 transition-colors group-hover:bg-emerald-50`}>
                    <Icon className={`h-5 w-5 ${feat.iconColor} transition-colors group-hover:text-emerald-500`} strokeWidth={2} />
                  </div>
                  <h3 className="mb-1.5 text-base font-semibold tracking-tight">{feat.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-500">{feat.description}</p>
                </motion.div>
              )
            })}
          </StaggerWrap>
        </div>
      </section>

      {/* ═══ Comparison ═══ */}
      <section className="border-t border-zinc-100">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12">
          <FadeIn>
            <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">Pricing</p>
            <h2 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">Stop Paying for Multiple<br />Subscriptions</h2>
            <p className="mx-auto mb-16 mt-4 max-w-lg text-center text-lg text-zinc-500">One plan that gives you everything</p>
          </FadeIn>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            <FadeIn y={20}>
              <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
                <h3 className="mb-5 text-lg font-bold text-red-500">Pay for 4 Tools Separately</h3>
                <ul className="space-y-3">
                  {["ChatGPT Plus — $20/mo", "Claude Pro — $20/mo", "Gemini Advanced — $20/mo", "Perplexity Pro — $20/mo"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-zinc-500"><span className="text-red-400">✕</span>{item}</li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-zinc-100 pt-5">
                  <p className="text-xs text-zinc-400">$20 × 4 tools =</p>
                  <span className="text-3xl font-bold text-red-500">$80+<span className="text-lg font-normal text-zinc-400">/mo</span></span>
                  <p className="mt-1 text-xs text-zinc-400">4 apps · 4 logins · 4 bills</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn y={20} delay={0.15}>
              <div className="relative rounded-3xl border-2 border-emerald-500 bg-gradient-to-b from-emerald-50/50 to-white p-8 shadow-[0_12px_40px_rgba(16,185,129,0.12)]">
                <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-xs font-bold text-white shadow-lg shadow-emerald-500/30">BEST VALUE</motion.div>
                <h3 className="mb-5 text-lg font-bold text-emerald-600">All Models. One Subscription.</h3>
                <ul className="space-y-3">
                  {["All 16+ AI models included", "100,000 credits / month", "Compare answers from different AIs", "One login · one bill · zero hassle"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-zinc-700"><span className="text-emerald-500">✓</span>{item}</li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-emerald-200 pt-5">
                  <span className="text-3xl font-bold text-emerald-600">$99.90<span className="text-lg font-normal text-zinc-400">/mo</span></span>
                  <p className="mt-1 text-xs font-medium text-emerald-600">Better answers + less hassle + save time</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ Model grid ═══ */}
      <section className="border-t border-zinc-100 bg-zinc-50/50">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12">
          <FadeIn>
            <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">Models</p>
            <h2 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">All the Models You Need</h2>
            <p className="mx-auto mb-16 mt-4 max-w-lg text-center text-lg text-zinc-500">Switch between models instantly — pick the right one for every task</p>
          </FadeIn>
          <StaggerWrap className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {MODELS_GRID.map(({ icon: Icon, name, tag, color }) => (
              <motion.div key={name} variants={staggerChild} whileHover={{ y: -3, scale: 1.02 }} className="group flex items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all hover:border-emerald-200 hover:shadow-md">
                <Icon className="h-8 w-8 shrink-0" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-zinc-800">{name}</p>
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${color}`}>{tag}</span>
                </div>
              </motion.div>
            ))}
          </StaggerWrap>
        </div>
      </section>

      {/* ═══ Final CTA ═══ */}
      <section className="relative overflow-hidden border-t border-zinc-100">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(16,185,129,0.08), transparent 60%)" }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-32 text-center lg:px-12">
          <FadeIn>
            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">Ready to Use Every AI Model?</h2>
            <p className="mx-auto mt-6 max-w-md text-lg text-zinc-500">Join 10,000+ users who switched to NottoAI.</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-10 flex flex-col items-center gap-4">
              <SignInButton mode="modal">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-zinc-900 px-10 py-5 text-lg font-semibold text-white shadow-xl shadow-zinc-900/20">
                  <span className="relative z-10">Start Using All Models Now</span>
                  <motion.span className="relative z-10" animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>→</motion.span>
                  <span className="absolute inset-0 -z-0 bg-gradient-to-r from-emerald-600 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.button>
              </SignInButton>
              <p className="text-sm text-zinc-400">No credit card required · 500 free credits included</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="border-t border-zinc-100 bg-zinc-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row lg:px-12">
          <div className="flex items-center gap-2">
            <ZolaFaviconIcon className="size-5" />
            <span className="text-sm font-medium text-zinc-400">© 2026 NottoAI</span>
          </div>
          <div className="flex gap-6">
            <Link href="/pricing" className="text-sm text-zinc-400 hover:text-zinc-600">Pricing</Link>
            <Link href="/privacy" className="text-sm text-zinc-400 hover:text-zinc-600">Privacy</Link>
            <Link href="/terms" className="text-sm text-zinc-400 hover:text-zinc-600">Terms</Link>
            <a href="mailto:contact@nottoai.com" className="text-sm text-zinc-400 hover:text-zinc-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
