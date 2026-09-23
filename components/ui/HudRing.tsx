"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

/**
 * Rotating HUD ring - adapted from the reference's "Which language I used"
 * dial, recolored to amber. Cycles through a list (e.g. a project's stack)
 * in the center while concentric arcs and orbiting dots rotate.
 * Static under reduced-motion.
 */
export function HudRing({ items, label = "Stack" }: { items: string[]; label?: string }) {
  const reduce = useSafeReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || items.length < 2) return;
    const t = setInterval(() => setI((p) => (p + 1) % items.length), 2200);
    return () => clearInterval(t);
  }, [reduce, items.length]);

  const A = "#E8B04B";
  const dots = [0, 60, 120, 180, 240, 300];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[260px]">
      <svg viewBox="0 0 200 200" className="h-full w-full">
        {/* faint base rings */}
        <circle cx="100" cy="100" r="78" fill="none" stroke={A} strokeOpacity="0.12" />
        <circle cx="100" cy="100" r="58" fill="none" stroke={A} strokeOpacity="0.1" />
        <circle cx="100" cy="100" r="40" fill="none" stroke={A} strokeOpacity="0.16" />

        {/* outer dashed rotating ring */}
        <motion.circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke={A}
          strokeOpacity="0.3"
          strokeWidth="1"
          strokeDasharray="2 6"
          style={{ transformOrigin: "100px 100px" }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        {/* two bright arc segments (counter-rotating) */}
        <motion.g
          style={{ transformOrigin: "100px 100px" }}
          animate={reduce ? undefined : { rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <path
            d="M 100 22 A 78 78 0 0 1 165 60"
            fill="none"
            stroke={A}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 100 178 A 78 78 0 0 1 35 140"
            fill="none"
            stroke={A}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </motion.g>

        {/* orbiting dots */}
        <motion.g
          style={{ transformOrigin: "100px 100px" }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          {dots.map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <circle
                key={deg}
                cx={+(100 + Math.cos(rad) * 58).toFixed(4)}
                cy={+(100 + Math.sin(rad) * 58).toFixed(4)}
                r="2"
                fill={A}
                fillOpacity="0.8"
              />
            );
          })}
        </motion.g>

        {/* code brackets */}
        <text x="100" y="78" textAnchor="middle" fill={A} fontSize="11" fontFamily="monospace" fillOpacity="0.7">
          &lt;/&gt;
        </text>
      </svg>

      {/* center cycling label (HTML overlay for crisp text) */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="mb-1 font-mono text-[9px] uppercase tracking-[0.25em] text-bone-faint">
          {label}
        </span>
        <div className="h-7 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={items[i]}
              initial={reduce ? false : { y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? undefined : { y: -14, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="block font-display text-lg text-signal-soft"
            >
              {items[i]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
