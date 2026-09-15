"use client";

import { useEffect, useState } from "react";

/**
 * A hydration-safe "does this user prefer reduced motion?".
 *
 * Why not framer-motion's `useReducedMotion()`:
 *
 *  1. It reads the media query during the *first* client render, while the
 *     server — which has no media query — always emits the full-motion markup.
 *     Any component that branches structurally on it (a plain <span> instead of
 *     a <motion.span>, a still instead of a <video>) then hydrates against
 *     different HTML: React error #418, followed by #423 as it throws the
 *     server markup away and re-renders the entire root on the client.
 *  2. It freezes the value in `useState`, so it never responds to the user
 *     changing the setting (framer's own source has a TODO about this).
 *
 * Starting at `false` and filling in after mount fixes both: the first client
 * render always matches the server, and the listener keeps it live. Nothing is
 * lost — no animation has started before mount, so reduced-motion users still
 * never see motion.
 */
export function useSafeReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduce;
}
