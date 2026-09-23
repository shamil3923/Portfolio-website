"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import type { Project } from "@/lib/types";
import { Tag } from "./Tag";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

/** Featured project as an interactive case-study card with hover tilt. */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduce = useSafeReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.setProperty("--rx", `${(-py * 4).toFixed(2)}deg`);
    ref.current.style.setProperty("--ry", `${(px * 5).toFixed(2)}deg`);
    ref.current.style.setProperty("--mx", `${(px * 100 + 50).toFixed(1)}%`);
    ref.current.style.setProperty("--my", `${(py * 100 + 50).toFixed(1)}%`);
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--rx", "0deg");
    ref.current.style.setProperty("--ry", "0deg");
  };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
    >
      <Link
        ref={ref}
        href={`/projects/${project.slug}`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="card-surface grain group block h-full overflow-hidden p-7 transition-[transform,border-color] duration-300 hover:border-signal/30 sm:p-8"
        style={{
          transform:
            "rotateX(var(--rx,0)) rotateY(var(--ry,0))",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Spotlight following the cursor */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(380px circle at var(--mx,50%) var(--my,50%), rgba(232,176,75,0.08), transparent 65%)",
          }}
        />

        {/* Preview visual - full-bleed across the card's padding */}
        {project.image && (
          <div className="relative -mx-7 -mt-7 mb-7 overflow-hidden border-b border-bone/10 sm:-mx-8 sm:-mt-8 sm:mb-8">
            <div className="relative aspect-[16/9]">
              <Image
                src={project.image}
                alt={project.imageAlt ?? project.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            {/* Fade the image into the card surface */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-100/70 via-transparent to-transparent"
            />
          </div>
        )}

        <div className="relative flex items-center justify-between gap-3">
          <Tag accent>{project.domain}</Tag>
          <span className="font-mono text-xs text-bone-faint">{project.period}</span>
        </div>

        <h3 className="relative mt-6 font-display text-2xl leading-tight tracking-tight text-bone transition-colors group-hover:text-signal-soft sm:text-[1.7rem]">
          {project.title}
        </h3>

        <p className="relative mt-4 text-sm leading-relaxed text-bone-muted">
          {project.tagline}
        </p>

        <div className="relative mt-6 flex flex-wrap gap-2">
          {project.stack.slice(0, 5).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>

        <div className="relative mt-7 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-bone-muted transition-colors group-hover:text-signal">
          Read case study
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
