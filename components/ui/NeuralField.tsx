"use client";

import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

/**
 * Ambient neural-network field rendered behind the hero portrait.
 *
 * Pure SVG (no three.js, no extra deps): a faint blue circuit grid,
 * slowly breathing connection lines, pulsing nodes, and a handful of
 * amber "signals" travelling along edges — the same reasoning-propagation
 * metaphor as the R3F hero scene, at a fraction of the cost.
 *
 * Deterministic coordinates → identical on server and client, and the
 * whole thing collapses to a still frame under prefers-reduced-motion.
 */

const NEURAL = "#4D8DF0";
const SIGNAL = "#E8B04B";

/** Layout in a 0–100 square viewBox (rendered with `slice`). */
const NODES: [number, number][] = [
  [8, 22],
  [24, 10],
  [18, 44],
  [38, 30],
  [50, 14],
  [46, 58],
  [66, 26],
  [84, 16],
  [78, 50],
  [58, 76],
  [34, 70],
  [90, 70],
  [10, 78],
  [70, 92],
  [26, 92],
  [94, 38],
];

const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 4],
  [2, 3],
  [3, 4],
  [3, 5],
  [4, 6],
  [6, 7],
  [6, 8],
  [5, 9],
  [8, 11],
  [7, 15],
  [9, 13],
  [2, 12],
  [10, 5],
  [10, 12],
  [12, 14],
  [9, 10],
  [8, 15],
  [11, 13],
  [14, 9],
];

/** Edges that carry a travelling amber signal. */
const SIGNAL_EDGES = [2, 6, 9, 15, 19];

export function NeuralField({ className }: { className?: string }) {
  const reduce = useSafeReducedMotion();

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        {/* Faint blue circuit grid. */}
        <pattern id="nf-grid" width="8" height="8" patternUnits="userSpaceOnUse">
          <path
            d="M 8 0 L 0 0 0 8"
            fill="none"
            stroke={NEURAL}
            strokeOpacity="0.22"
            strokeWidth="0.25"
          />
        </pattern>
        {/* Fade the whole field out towards the edges. */}
        <radialGradient id="nf-mask-grad">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="65%" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.05" />
        </radialGradient>
        <mask id="nf-mask">
          <rect width="100" height="100" fill="url(#nf-mask-grad)" />
        </mask>
      </defs>

      <g mask="url(#nf-mask)">
        <rect width="100" height="100" fill="url(#nf-grid)" />

        {/* Connection lines — slow dash drift + breathing opacity. */}
        <g strokeWidth="0.3" strokeLinecap="round">
          {EDGES.map(([a, b], i) => (
            <motion.line
              key={`e-${i}`}
              x1={NODES[a][0]}
              y1={NODES[a][1]}
              x2={NODES[b][0]}
              y2={NODES[b][1]}
              stroke={NEURAL}
              strokeDasharray="1.5 3"
              initial={{ strokeOpacity: 0.4 }}
              animate={
                reduce
                  ? undefined
                  : { strokeDashoffset: [0, -18], strokeOpacity: [0.25, 0.7, 0.25] }
              }
              transition={{
                duration: 14 + (i % 5) * 3,
                repeat: Infinity,
                ease: "linear",
                delay: (i % 7) * 0.4,
              }}
            />
          ))}
        </g>

        {/* Nodes — gentle staggered pulse. */}
        <g>
          {NODES.map(([x, y], i) => {
            const accent = i % 5 === 0;
            return (
              <motion.circle
                key={`n-${i}`}
                cx={x}
                cy={y}
                r={accent ? 1 : 0.65}
                fill={accent ? SIGNAL : NEURAL}
                initial={{ opacity: 0.55 }}
                animate={reduce ? undefined : { opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 6 + (i % 4) * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i % 6) * 0.7,
                }}
              />
            );
          })}
        </g>

        {/* Travelling signals along a few edges. */}
        {!reduce &&
          SIGNAL_EDGES.map((edgeIndex, i) => {
            const [a, b] = EDGES[edgeIndex];
            return (
              <motion.circle
                key={`s-${i}`}
                r="0.7"
                fill={SIGNAL}
                initial={{ cx: NODES[a][0], cy: NODES[a][1], opacity: 0 }}
                animate={{
                  cx: [NODES[a][0], NODES[b][0]],
                  cy: [NODES[a][1], NODES[b][1]],
                  opacity: [0, 0.95, 0],
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 1.6,
                  repeatDelay: 2,
                }}
              />
            );
          })}
      </g>
    </svg>
  );
}
