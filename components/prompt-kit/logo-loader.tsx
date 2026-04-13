"use client"

import { motion } from "framer-motion"

/**
 * NottoAI logo loader — breathing + slow rotation animation
 * Uses the simplified favicon pattern (6 circles, no center)
 */
export function LogoLoader({ size = 28 }: { size?: number }) {
  const cx = 40
  const cy = 40
  const r = 15
  const d = 13

  const circles = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 * Math.PI) / 180
    return {
      cx: cx + d * Math.cos(angle),
      cy: cy + d * Math.sin(angle),
    }
  })

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      animate={{
        rotate: 360,
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        rotate: {
          duration: 8,
          ease: "linear",
          repeat: Infinity,
        },
        opacity: {
          duration: 2.4,
          ease: "easeInOut",
          repeat: Infinity,
        },
      }}
    >
      <defs>
        <linearGradient id="loader-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
      {circles.map((c, i) => (
        <circle
          key={i}
          cx={c.cx}
          cy={c.cy}
          r={r}
          stroke="url(#loader-grad)"
          strokeWidth={2.8}
          fill="none"
        />
      ))}
    </motion.svg>
  )
}
