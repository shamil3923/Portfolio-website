"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * HUD-style notched button with chevron affordances (amber).
 * Borrowed from the reference's "« Previous project / Next project »" and
 * "Back to home" controls — rendered in the amber/graphite palette.
 *
 * Two-layer notch technique: clip-path strips real borders, so an outer
 * amber layer + inner ink layer fakes a 1px chamfered border.
 */
export function ChevronButton({
  href,
  children,
  direction = "right",
  align = "left",
  className,
}: {
  href: string;
  children: React.ReactNode;
  direction?: "left" | "right" | "none";
  align?: "left" | "right";
  className?: string;
}) {
  const Chevrons = (
    <span aria-hidden className="font-mono text-signal transition-transform duration-300">
      {direction === "left" ? "‹‹" : "››"}
    </span>
  );

  return (
    <Link
      href={href}
      className={cn(
        "group clip-notch inline-block bg-signal/40 p-px transition-[filter] duration-300 hover:[filter:drop-shadow(0_0_10px_rgba(232,176,75,0.35))]",
        className,
      )}
    >
      <span
        className={cn(
          "clip-notch flex items-center gap-3 bg-ink-50 px-6 py-3 font-mono text-sm uppercase tracking-wider text-bone transition-colors group-hover:bg-ink-100 group-hover:text-signal-soft",
          align === "right" && "flex-row-reverse",
        )}
      >
        {direction === "left" && (
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            {Chevrons}
          </span>
        )}
        {children}
        {direction === "right" && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {Chevrons}
          </span>
        )}
      </span>
    </Link>
  );
}
