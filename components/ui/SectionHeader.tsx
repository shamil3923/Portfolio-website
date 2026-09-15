"use client";

import { motion } from "framer-motion";
import { maskRise, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

type SectionHeaderProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeaderProps) {
  const reduce = useSafeReducedMotion();

  return (
    <header
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <div
        className={cn(
          "mb-5 flex items-center gap-3",
          align === "center" && "justify-center",
        )}
      >
        <span className="font-mono text-sm text-signal">{index}</span>
        <span className="h-px w-8 bg-signal/40" />
        <span className="label-mono">{eyebrow}</span>
      </div>

      {/* The in-view trigger has to live on the *unclipped* h2. Put it on the
          masked span instead and `overflow-hidden` clips that span — parked at
          y:110% — to zero area, so it never intersects and never reveals. */}
      <motion.h2
        className="overflow-hidden font-display text-3xl leading-[1.05] tracking-tightest text-bone sm:text-4xl md:text-5xl"
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={viewportOnce}
      >
        {reduce ? (
          title
        ) : (
          <motion.span className="block" variants={maskRise}>
            {title}
          </motion.span>
        )}
      </motion.h2>

      {description && (
        <p className="mt-5 text-base leading-relaxed text-bone-muted sm:text-lg">
          {description}
        </p>
      )}
    </header>
  );
}
