"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import type { ReactNode } from "react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

/**
 * Bracket-corner frame with a marching-ants dashed border and an optional
 * scroll-linked 3D perspective tilt - the two signature treatments from the
 * reference's framed screenshot ("Click for see wireframe"), in amber.
 */
export function BracketFrame({
  children,
  caption,
  tilt = true,
}: {
  children: ReactNode;
  caption?: string;
  tilt?: boolean;
}) {
  const reduce = useSafeReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  // Enters tilted in 3D, settles flat as it reaches center - the page-tilt feel.
  const rx = useSpring(useTransform(scrollYProgress, [0, 1], [12, 0]), {
    stiffness: 90,
    damping: 22,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.4, 1]);

  const useTilt = tilt && !reduce;

  return (
    <div ref={ref} className="relative" style={{ perspective: 1200 }}>
      <motion.div
        style={
          useTilt
            ? { rotateX: rx, opacity, transformStyle: "preserve-3d" }
            : undefined
        }
        className="relative p-3"
      >
        {/* Marching-ants animated border */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
        >
          <motion.rect
            x="1"
            y="1"
            width="99%"
            height="99%"
            fill="none"
            stroke="#E8B04B"
            strokeOpacity="0.45"
            strokeWidth="1"
            strokeDasharray="8 6"
            animate={reduce ? undefined : { strokeDashoffset: [0, -28] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {/* Corner brackets */}
        <span className="absolute -left-1 -top-1 h-6 w-6 border-l-2 border-t-2 border-signal" />
        <span className="absolute -right-1 -top-1 h-6 w-6 border-r-2 border-t-2 border-signal" />
        <span className="absolute -bottom-1 -left-1 h-6 w-6 border-b-2 border-l-2 border-signal" />
        <span className="absolute -bottom-1 -right-1 h-6 w-6 border-b-2 border-r-2 border-signal" />

        <div className="relative overflow-hidden rounded-md bg-ink-100/60">
          {children}
        </div>
      </motion.div>

      {caption && (
        <p className="mt-3 text-center font-mono text-xs uppercase tracking-[0.2em] text-signal/80">
          {caption}
        </p>
      )}
    </div>
  );
}
