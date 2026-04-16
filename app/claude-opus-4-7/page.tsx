"use client"

import Link from "next/link"
import { ZolaFaviconIcon } from "@/components/icons/zola"
import AnthropicIcon from "@/components/icons/anthropic"
import { SignInButton } from "@clerk/nextjs"
import { motion, useInView, useScroll, useTransform } from "motion/react"
import { useRef, useEffect, useState, type ReactNode } from "react"
import {
  Brain,
  Code2,
  Cpu,
  Gauge,
  Layers,
  Shield,
  Sparkles,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react"

/* ─── Animation helpers ─── */

function FadeIn({
  children,
  delay = 0,
  y = 30,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerWrap({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.08 } },
        hidden: {},
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const staggerChild = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

function Counter({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number
  suffix?: string
  prefix?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.max(1, Math.ceil(value / 60))
    const timer = setInterval(() => {
      start += step
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

function TextReveal({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mr-[0.28em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

/* ─── Animated benchmark bar ─── */

function BenchmarkBar({
  label,
  score,
  maxScore = 100,
  color,
  delay = 0,
}: {
  label: string
  score: number
  maxScore?: number
  color: string
  delay?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white">{label}</span>
        <span className="text-sm font-bold text-white">{score}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${(score / maxScore) * 100}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  )
}

/* ─── Data ─── */

const KEY_FEATURES = [
  {
    icon: Brain,
    title: "Advanced Reasoning",
    description:
      "Multi-step logical chains with dramatically improved accuracy. Solves complex problems that stumped previous models.",
    color: "text-violet-500",
    bgColor: "bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20",
  },
  {
    icon: Code2,
    title: "Elite Code Generation",
    description:
      "87.4% on SWE-Bench Verified. Fewer compilation errors, stronger contextual understanding of developer intent.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/20",
  },
  {
    icon: Workflow,
    title: "Agentic Workflows",
    description:
      "Built for autonomous multi-step tasks. Plan, execute, and self-correct across complex workflows without human intervention.",
    color: "text-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20",
  },
  {
    icon: Layers,
    title: "1M Token Context",
    description:
      "Process entire codebases, long documents, and complex conversations. Maintains coherence across massive inputs.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20",
  },
  {
    icon: Shield,
    title: "Enhanced Safety",
    description:
      "Constitutional AI improvements with better alignment. More reliable refusal of harmful requests while staying helpful.",
    color: "text-rose-500",
    bgColor: "bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20",
  },
  {
    icon: Gauge,
    title: "Faster Inference",
    description:
      "Optimized architecture delivers faster response times. Get premium intelligence without the wait.",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20",
  },
]

const BENCHMARKS = [
  { label: "SWE-Bench Verified", score: 87, color: "bg-gradient-to-r from-violet-500 to-violet-400" },
  { label: "GPQA Diamond", score: 83, color: "bg-gradient-to-r from-cyan-500 to-cyan-400" },
  { label: "MATH (Hard)", score: 91, color: "bg-gradient-to-r from-emerald-500 to-emerald-400" },
  { label: "HumanEval", score: 94, color: "bg-gradient-to-r from-amber-500 to-amber-400" },
  { label: "MMLU Pro", score: 88, color: "bg-gradient-to-r from-rose-500 to-rose-400" },
]

const COMPARISON = [
  { metric: "Coding (SWE-Bench)", opus47: "87.4%", gpt54: "78.2%", gemini: "74.1%" },
  { metric: "Reasoning (GPQA)", opus47: "83.1%", gpt54: "79.8%", gemini: "77.5%" },
  { metric: "Math (MATH Hard)", opus47: "91.2%", gpt54: "88.5%", gemini: "85.3%" },
  { metric: "Context Window", opus47: "1M tokens", gpt54: "128K", gemini: "2M tokens" },
  { metric: "Agent Tasks", opus47: "94.2%", gpt54: "87.1%", gemini: "82.6%" },
  { metric: "Code Debugging", opus47: "92.8%", gpt54: "85.3%", gemini: "81.7%" },
]

const USE_CASES = [
  {
    icon: Terminal,
    title: "Software Engineering",
    description:
      "Write, debug, and refactor production code. Understands full-stack architectures, handles complex migrations, and generates comprehensive test suites.",
  },
  {
    icon: Cpu,
    title: "Autonomous Agents",
    description:
      "Power long-running AI agents that plan, execute, and self-correct. Handle multi-step workflows with tool use across APIs and services.",
  },
  {
    icon: Sparkles,
    title: "Research & Analysis",
    description:
      "Analyze large datasets, synthesize research papers, and extract insights from complex documents with the 1M token context window.",
  },
  {
    icon: Zap,
    title: "Enterprise Automation",
    description:
      "Automate business workflows with reliable structured output. Process documents, generate reports, and integrate with existing systems.",
  },
]

const TIMELINE = [
  { version: "Opus 4.5", date: "Nov 2025", desc: "Breakthrough reasoning capabilities" },
  { version: "Opus 4.6", date: "Feb 2026", desc: "Enhanced coding & reliability" },
  { version: "Opus 4.7", date: "Q2/Q3 2026", desc: "Next-gen intelligence leap", current: true },
]

/* ─── Page ─── */

export default function ClaudeOpus47Page() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white">
      {/* ═══ Nav ═══ */}
      <header className="sticky top-0 z-20 border-b border-zinc-200/50 bg-white/60 backdrop-blur-xl dark:border-white/5 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-base font-medium tracking-tight"
          >
            <ZolaFaviconIcon className="size-7" />
            <span className="font-semibold">Notto</span>
            <span className="font-normal opacity-50">AI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/pricing"
              className="hidden text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white sm:inline"
            >
              Pricing
            </Link>
            <SignInButton mode="modal">
              <button className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-50 hover:shadow-sm dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white">
                Sign In
              </button>
            </SignInButton>
            <SignInButton mode="modal">
              <button className="rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500/25">
                Try Opus 4.7 Free
              </button>
            </SignInButton>
          </div>
        </div>
      </header>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative overflow-hidden">
        {/* Gradient backdrop */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(139,92,246,0.12), transparent 60%), radial-gradient(ellipse 60% 40% at 25% 10%, rgba(139,92,246,0.06), transparent), radial-gradient(ellipse 60% 40% at 75% 5%, rgba(6,182,212,0.05), transparent)",
          }}
        />
        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative mx-auto max-w-7xl px-6 pb-20 pt-24 text-center sm:pt-32 lg:px-12"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-violet-200 bg-violet-50/80 px-5 py-2 shadow-sm backdrop-blur-sm dark:border-violet-500/30 dark:bg-violet-500/10 dark:shadow-violet-500/5"
          >
            <AnthropicIcon className="h-4 w-4 text-violet-500 dark:text-violet-400" />
            <span className="text-xs font-semibold tracking-wide text-violet-600 dark:text-violet-300">
              Coming Q2/Q3 2026
            </span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="mx-auto max-w-5xl text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[1.02] tracking-[-0.04em]">
            <TextReveal text="Claude Opus 4.7" delay={0.2} />
            <br />
            <TextReveal
              text="The Intelligence Leap"
              delay={0.7}
              className="bg-gradient-to-r from-violet-500 via-cyan-500 to-violet-500 bg-clip-text text-transparent"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-500 sm:text-xl dark:text-zinc-400"
          >
            Anthropic&apos;s most powerful model yet.{" "}
            <span className="font-semibold text-zinc-800 dark:text-white">
              87.4% on SWE-Bench
            </span>
            , 1M token context, and built for autonomous agents.{" "}
            <span className="font-medium text-violet-600 dark:text-violet-400">
              Use it on NottoAI the day it launches.
            </span>
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <SignInButton mode="modal">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-violet-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-violet-600/20"
              >
                <span className="relative z-10">
                  Try Claude Opus Free on NottoAI
                </span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
                <span className="absolute inset-0 -z-0 bg-gradient-to-r from-cyan-500 to-violet-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.button>
            </SignInButton>
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-full border border-zinc-200 bg-white/60 px-8 py-4 text-base font-medium text-zinc-700 backdrop-blur-sm transition-all hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
            >
              View Pricing
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-6 text-sm text-zinc-400 dark:text-zinc-500"
          >
            No credit card required · Access all Claude models today
          </motion.p>
        </motion.div>
      </section>

      {/* ═══ Stats ═══ */}
      <section className="border-y border-zinc-100 bg-zinc-50/60 py-10 dark:border-white/5 dark:bg-zinc-900/50">
        <StaggerWrap className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-12 px-6 sm:gap-20">
          {[
            { value: 87, suffix: "%", label: "SWE-Bench Score" },
            { value: 1, suffix: "M", label: "Token Context" },
            { value: 94, suffix: "%", label: "Agent Task Success" },
            { value: 91, suffix: "%", label: "MATH Hard" },
          ].map((s) => (
            <motion.div
              key={s.label}
              variants={staggerChild}
              className="text-center"
            >
              <div className="text-3xl font-bold text-zinc-900 sm:text-4xl dark:text-white">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-1 text-sm text-zinc-500">{s.label}</p>
            </motion.div>
          ))}
        </StaggerWrap>
      </section>

      {/* ═══ Key Features ═══ */}
      <section className="border-b border-zinc-100 dark:border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12">
          <FadeIn>
            <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-500 dark:text-violet-400">
              Capabilities
            </p>
            <h2 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
              What Makes Opus 4.7
              <br />
              <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
                a Generational Leap
              </span>
            </h2>
            <p className="mx-auto mb-16 mt-4 max-w-lg text-center text-lg text-zinc-500 dark:text-zinc-400">
              Built on leaked benchmarks and internal architecture references
              from the Capiara source code exposure.
            </p>
          </FadeIn>
          <StaggerWrap className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {KEY_FEATURES.map((feat) => {
              const Icon = feat.icon
              return (
                <motion.div
                  key={feat.title}
                  variants={staggerChild}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl border border-zinc-200/80 bg-white p-7 shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all hover:border-violet-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:border-white/5 dark:bg-white/[0.02] dark:shadow-none dark:hover:border-violet-500/20 dark:hover:bg-white/[0.04]"
                >
                  <div
                    className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl border ${feat.bgColor}`}
                  >
                    <Icon className={`h-5 w-5 ${feat.color}`} strokeWidth={2} />
                  </div>
                  <h3 className="mb-1.5 text-base font-semibold tracking-tight">
                    {feat.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {feat.description}
                  </p>
                </motion.div>
              )
            })}
          </StaggerWrap>
        </div>
      </section>

      {/* ═══ Benchmarks (dark section) ═══ */}
      <section className="relative overflow-hidden bg-zinc-950 text-white">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139,92,246,0.08), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-12">
          <FadeIn>
            <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Performance
            </p>
            <h2 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
              Benchmark Scores
            </h2>
            <p className="mx-auto mb-16 mt-4 max-w-lg text-center text-lg text-zinc-400">
              Based on leaked internal benchmarks from Anthropic&apos;s Capiara
              documents. Final scores may vary at launch.
            </p>
          </FadeIn>
          <div className="mx-auto max-w-2xl space-y-6">
            {BENCHMARKS.map((b, i) => (
              <FadeIn key={b.label} delay={i * 0.1}>
                <BenchmarkBar
                  label={b.label}
                  score={b.score}
                  color={b.color}
                  delay={i * 0.15}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Model Comparison ═══ */}
      <section className="border-b border-zinc-100 dark:border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12">
          <FadeIn>
            <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-500 dark:text-violet-400">
              Comparison
            </p>
            <h2 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
              Opus 4.7 vs The Competition
            </h2>
            <p className="mx-auto mb-16 mt-4 max-w-lg text-center text-lg text-zinc-500 dark:text-zinc-400">
              How Opus 4.7 stacks up against GPT-5.4 and Gemini 3.1
            </p>
          </FadeIn>
          <FadeIn y={20}>
            <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-zinc-200 shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:border-white/10 dark:shadow-none">
              {/* Header */}
              <div className="grid grid-cols-4 border-b border-zinc-100 bg-zinc-50/80 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="px-6 py-4 text-sm font-medium text-zinc-400">
                  Metric
                </div>
                <div className="px-6 py-4 text-sm font-bold text-violet-600 dark:text-violet-400">
                  Opus 4.7
                </div>
                <div className="px-6 py-4 text-sm font-medium text-zinc-500">
                  GPT-5.4
                </div>
                <div className="px-6 py-4 text-sm font-medium text-zinc-500">
                  Gemini 3.1
                </div>
              </div>
              {/* Rows */}
              {COMPARISON.map((row, i) => (
                <motion.div
                  key={row.metric}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="grid grid-cols-4 border-b border-zinc-50 last:border-0 transition-colors hover:bg-violet-50/40 dark:border-white/5 dark:hover:bg-white/[0.02]"
                >
                  <div className="px-6 py-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {row.metric}
                  </div>
                  <div className="px-6 py-4 text-sm font-bold text-violet-600 dark:text-violet-300">
                    {row.opus47}
                  </div>
                  <div className="px-6 py-4 text-sm text-zinc-500">
                    {row.gpt54}
                  </div>
                  <div className="px-6 py-4 text-sm text-zinc-500">
                    {row.gemini}
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ Use Cases ═══ */}
      <section className="border-b border-zinc-100 bg-zinc-50/50 dark:border-white/5 dark:bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12">
          <FadeIn>
            <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
              Use Cases
            </p>
            <h2 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
              Built for Professionals
            </h2>
            <p className="mx-auto mb-16 mt-4 max-w-lg text-center text-lg text-zinc-500 dark:text-zinc-400">
              From coding to research, Opus 4.7 excels at the tasks that matter
              most.
            </p>
          </FadeIn>
          <StaggerWrap className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
            {USE_CASES.map((uc) => {
              const Icon = uc.icon
              return (
                <motion.div
                  key={uc.title}
                  variants={staggerChild}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl border border-zinc-200/80 bg-white p-8 shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all hover:border-cyan-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:border-white/5 dark:bg-white/[0.02] dark:shadow-none dark:hover:border-cyan-500/20 dark:hover:bg-white/[0.04]"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-200 bg-cyan-50 dark:border-cyan-500/20 dark:bg-cyan-500/10">
                    <Icon className="h-6 w-6 text-cyan-500 dark:text-cyan-400" strokeWidth={2} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">
                    {uc.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {uc.description}
                  </p>
                </motion.div>
              )
            })}
          </StaggerWrap>
        </div>
      </section>

      {/* ═══ Timeline ═══ */}
      <section className="border-b border-zinc-100 dark:border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12">
          <FadeIn>
            <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-500 dark:text-violet-400">
              Evolution
            </p>
            <h2 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
              The Opus Timeline
            </h2>
            <p className="mx-auto mb-16 mt-4 max-w-lg text-center text-lg text-zinc-500 dark:text-zinc-400">
              Each generation pushing the boundaries of what AI can do.
            </p>
          </FadeIn>
          <div className="mx-auto max-w-2xl">
            {TIMELINE.map((item, i) => (
              <FadeIn key={item.version} delay={i * 0.15}>
                <div className="flex gap-6 pb-10 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
                        item.current
                          ? "border-violet-400 bg-violet-100 shadow-lg shadow-violet-500/20 dark:border-violet-500 dark:bg-violet-500/20"
                          : "border-zinc-200 bg-zinc-100 dark:border-white/10 dark:bg-white/5"
                      }`}
                    >
                      <AnthropicIcon
                        className={`h-5 w-5 ${item.current ? "text-violet-600 dark:text-violet-400" : "text-zinc-400 dark:text-zinc-500"}`}
                      />
                    </div>
                    {i < TIMELINE.length - 1 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-zinc-200 to-transparent dark:from-white/10" />
                    )}
                  </div>
                  <div className="pb-4 pt-1">
                    <div className="flex items-center gap-3">
                      <h3
                        className={`text-lg font-bold ${item.current ? "text-violet-600 dark:text-violet-400" : ""}`}
                      >
                        {item.version}
                      </h3>
                      <span className="text-sm text-zinc-400 dark:text-zinc-500">{item.date}</span>
                      {item.current && (
                        <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] font-bold text-violet-600 dark:bg-violet-500/20 dark:text-violet-400">
                          UPCOMING
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(139,92,246,0.08), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-32 text-center lg:px-12">
          <FadeIn>
            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Ready for Opus 4.7?
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg text-zinc-500 dark:text-zinc-400">
              Start using Claude Opus on NottoAI today. When 4.7 launches,
              you&apos;ll have instant access — no extra cost.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-10 flex flex-col items-center gap-4">
              <SignInButton mode="modal">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-violet-600 px-10 py-5 text-lg font-semibold text-white shadow-xl shadow-violet-600/20"
                >
                  <span className="relative z-10">
                    Get Started Free on NottoAI
                  </span>
                  <motion.span
                    className="relative z-10"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    →
                  </motion.span>
                  <span className="absolute inset-0 -z-0 bg-gradient-to-r from-cyan-500 to-violet-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.button>
              </SignInButton>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                No credit card required · 100 free credits included
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="border-t border-zinc-100 bg-zinc-50 dark:border-white/5 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row lg:px-12">
          <div className="flex items-center gap-2">
            <ZolaFaviconIcon className="size-5" />
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
              © 2026 NottoAI
            </span>
          </div>
          <div className="flex gap-6">
            <Link
              href="/pricing"
              className="text-sm text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
            >
              Pricing
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
            >
              Terms
            </Link>
            <a
              href="mailto:contact@nottoai.com"
              className="text-sm text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
