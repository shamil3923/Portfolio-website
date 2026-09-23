"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

/**
 * Interactive visualization of the hybrid LLM + HRM reasoning pipeline.
 * Built with SVG + Framer Motion (not 3D) so it stays crisp, legible,
 * fully keyboard-accessible, and excellent on mobile - where a labelled
 * pipeline matters more than a 3D flourish.
 *
 * A "signal" travels stage-to-stage; the active stage drives the detail panel.
 * Auto-advances, pauses on interaction, and is static under reduced-motion.
 */

type Stage = {
  id: string;
  step: string;
  title: string;
  io: string;
  detail: string;
};

const stages: Stage[] = [
  {
    id: "parse",
    step: "01",
    title: "LLM Parser",
    io: "Word problem → structured parse",
    detail:
      "An LLM reads the free-form math word problem and extracts entities, quantities, and the operations relating them - turning prose into a machine-readable parse.",
  },
  {
    id: "graph",
    step: "02",
    title: "Graph Bridge Encoder",
    io: "Parse → dependency graph",
    detail:
      "A graph attention encoder builds a dependency graph of sub-results with intermediate arithmetic traces - the contract that lets the HRM reason over structure rather than tokens.",
  },
  {
    id: "hrm",
    step: "03",
    title: "HRM Core · ACT halting",
    io: "Graph → step-wise reasoning",
    detail:
      "Hierarchical high-level and low-level transformer modules reason over the graph. Adaptive Computation Time decides when to halt, and a digit-head decoder emits intermediate values at each step.",
  },
  {
    id: "explain",
    step: "04",
    title: "LLM Explainer",
    io: "Trace → natural-language solution",
    detail:
      "An LLM verbalizes the decoded reasoning trace into a step-by-step explanation - so the answer arrives with an auditable justification, not just a number.",
  },
];

export function ReasoningPipeline() {
  const reduce = useSafeReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const interactedRef = useRef(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => {
      if (!interactedRef.current) {
        setActive((a) => (a + 1) % stages.length);
      }
    }, 2800);
    return () => clearInterval(t);
  }, [reduce, paused]);

  const select = (i: number) => {
    interactedRef.current = true;
    setActive(i);
  };

  return (
    <div
      className="card-surface grain overflow-hidden p-6 sm:p-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        interactedRef.current = false;
      }}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="label-mono">Reasoning pipeline</p>
        <p className="hidden font-mono text-xs text-bone-faint sm:block">
          GSM8K · interpretable trace
        </p>
      </div>

      {/* Stage rail */}
      <div
        className="grid gap-3 md:grid-cols-4"
        role="tablist"
        aria-label="Reasoning pipeline stages"
      >
        {stages.map((stage, i) => {
          const isActive = i === active;
          return (
            <div key={stage.id} className="relative">
              {/* Connector (desktop) */}
              {i < stages.length - 1 && (
                <div className="absolute right-[-10px] top-1/2 z-0 hidden h-px w-5 -translate-y-1/2 bg-bone/15 md:block">
                  {isActive && !reduce && (
                    <motion.span
                      layoutId="pipeline-flow"
                      className="absolute inset-0 bg-signal"
                      transition={{ type: "spring", stiffness: 200, damping: 24 }}
                    />
                  )}
                </div>
              )}

              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => select(i)}
                onFocus={() => select(i)}
                className={cn(
                  "relative z-10 flex w-full flex-col gap-2 rounded-xl border p-4 text-left transition-colors duration-300",
                  isActive
                    ? "border-signal/40 bg-signal/[0.08]"
                    : "border-bone/10 bg-ink-100/40 hover:border-bone/20",
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "font-mono text-xs",
                      isActive ? "text-signal" : "text-bone-faint",
                    )}
                  >
                    {stage.step}
                  </span>
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full transition-colors",
                      isActive
                        ? "bg-signal shadow-[0_0_12px_2px_rgba(232,176,75,0.5)]"
                        : "bg-bone/20",
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "text-sm font-medium leading-tight transition-colors",
                    isActive ? "text-bone" : "text-bone-muted",
                  )}
                >
                  {stage.title}
                </span>
                <span className="font-mono text-[10px] leading-tight text-bone-faint">
                  {stage.io}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Animated signal bar (mobile + ambient) */}
      <div className="relative mt-6 h-px w-full overflow-hidden bg-bone/10">
        <motion.span
          className="absolute top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-signal to-transparent"
          animate={reduce ? {} : { left: ["-25%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Detail panel */}
      <div className="mt-6 min-h-[88px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={stages[active].id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <h4 className="font-display text-lg text-bone">
              {stages[active].title}
            </h4>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-bone-muted">
              {stages[active].detail}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
