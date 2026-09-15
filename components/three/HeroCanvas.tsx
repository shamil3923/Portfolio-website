"use client";

import dynamic from "next/dynamic";
import { Component, Suspense, useEffect, useState, type ReactNode } from "react";

import { HeroFallback } from "./HeroFallback";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

// Lazy-load the 3D scene — never in the SSR bundle.
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

/** Coarse "is this a small / touch device" check. */
function useIsHeavyOk() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    setOk(mq.matches);
    const onChange = () => setOk(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return ok;
}

/**
 * Some browsers (hardware acceleration off, blocklisted GPUs, headless)
 * throw "Error creating WebGL context". Swallow it and show the SVG
 * fallback instead of crashing the hero.
 */
class WebGLBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function HeroCanvas() {
  const reduce = useSafeReducedMotion();
  const heavyOk = useIsHeavyOk();

  // Mobile / reduced-motion → static SVG only. Keeps the mobile
  // experience light and avoids loading three.js entirely.
  if (reduce || !heavyOk) {
    return <HeroFallback />;
  }

  return (
    <WebGLBoundary fallback={<HeroFallback />}>
      <Suspense fallback={<HeroFallback />}>
        <HeroScene />
      </Suspense>
    </WebGLBoundary>
  );
}
