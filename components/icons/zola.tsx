import * as React from "react"
import type { SVGProps } from "react"

/**
 * NottoAI Logo — Flower of Life geometric pattern
 * 6 outer circles + center, mint-green gradient (#6EE7B7 → #10B981)
 */
export function ZolaIcon(props: SVGProps<SVGSVGElement>) {
  const cx = 40
  const cy = 40
  const r = 14
  const d = 14

  const circles = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 * Math.PI) / 180
    return {
      cx: cx + d * Math.cos(angle),
      cy: cy + d * Math.sin(angle),
    }
  })

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={80}
      height={80}
      viewBox="0 0 80 80"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient id="nottoai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke="url(#nottoai-grad)"
        strokeWidth={1.6}
        fill="none"
      />
      {circles.map((c, i) => (
        <circle
          key={i}
          cx={c.cx}
          cy={c.cy}
          r={r}
          stroke="url(#nottoai-grad)"
          strokeWidth={1.6}
          fill="none"
        />
      ))}
    </svg>
  )
}

/**
 * NottoAI Favicon — Simplified version for small sizes
 * 6 circles only, no center circle, thicker stroke
 */
export function ZolaFaviconIcon(props: SVGProps<SVGSVGElement>) {
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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={80}
      height={80}
      viewBox="0 0 80 80"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient id="nottoai-fav" x1="0%" y1="0%" x2="100%" y2="100%">
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
          stroke="url(#nottoai-fav)"
          strokeWidth={2.8}
          fill="none"
        />
      ))}
    </svg>
  )
}
