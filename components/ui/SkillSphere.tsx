"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { skills } from "@/content/skills";
import type { SkillItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

/**
 * Skills constellation — a draggable sphere of skill tags.
 *
 * Tags are laid out on a Fibonacci sphere (even spacing, no clumping),
 * projected by hand each frame so near tags read larger and brighter than
 * far ones. It spins slowly on its own, takes a throw from the pointer and
 * keeps the momentum, and the category chips dim everything that doesn't
 * match.
 *
 * Renders as a plain wrapped list on the server and on narrow stages — which
 * is also the reduced-motion path, so the content is always readable without
 * the animation.
 */

/** Type size per weight, in rem. */
const FONT: Record<number, number> = { 3: 0.88, 2: 0.7, 1: 0.58 };

/** Category tones — a gold-to-bone ramp, so the section stays black + gold. */
const TONES: Record<string, string> = {
  "agentic-ai": "#E8B04B",
  "ml-dl": "#F0C778",
  backend: "#C9924A",
  "data-cloud": "#DAD8D0",
  programming: "#EDEDE8",
  tools: "#8F918B",
};
const DEFAULT_TONE = "#A7A9A3";

/** Below this stage width the longest labels are wider than the sphere. */
const FLAT_BELOW = 560;

type Tag = {
  id: string;
  name: string;
  weight: number;
  cat: string;
  tone: string;
};

function normalize(item: SkillItem): { name: string; weight: number } {
  return typeof item === "string" ? { name: item, weight: 2 } : item;
}

const TAGS: Tag[] = skills.flatMap((category) =>
  category.skills.map((item) => {
    const { name, weight } = normalize(item);
    return {
      id: `${category.id}:${name}`,
      name,
      weight,
      cat: category.id,
      tone: TONES[category.id] ?? DEFAULT_TONE,
    };
  }),
);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export function SkillSphere() {
  const reduce = useSafeReducedMotion();
  const [filter, setFilter] = useState<string>("all");
  // Flat on the server and on the first client render — no hydration mismatch.
  // The effect below promotes it to the sphere when there's room for one.
  const [spinning, setSpinning] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const cloud = useRef({
    rx: 200,
    ry: 200,
    maxHalf: 110,
    angleX: -0.25,
    angleY: 0,
    velX: 0.0012,
    velY: 0.0028,
    dragging: false,
    lastX: 0,
    lastY: 0,
    onScreen: true,
    points: [] as { x: number; y: number; z: number }[],
  });

  /** Fibonacci sphere — even spacing, computed once. */
  useEffect(() => {
    const n = TAGS.length;
    cloud.current.points = TAGS.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / n);
      const theta = Math.sqrt(n * Math.PI) * phi;
      return {
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
      };
    });
  }, []);

  /** Is there room for a ball here at all? */
  const decide = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    setSpinning(stage.clientWidth >= FLAT_BELOW && !reduce);
  }, [reduce]);

  /**
   * Radius. Must run *after* the stage has switched to its fixed sphere
   * height — in flat layout the stage is only as tall as the wrapped list,
   * which would pin the radius to its floor.
   */
  const sizeCloud = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const els = tagRefs.current.filter(Boolean) as HTMLSpanElement[];
    const c = cloud.current;
    c.maxHalf = Math.max(60, ...els.map((el) => el.offsetWidth / 2));

    const r = stage.getBoundingClientRect();
    // Perspective pushes projected points past the raw radius; clamping to
    // 1.2r on both axes is what stops the sphere getting clipped.
    const K = 1.2;
    const OVAL = 1.18; // a little wider than tall
    const roomX = (r.width / 2 - c.maxHalf - 8) / (K * OVAL);
    const roomY = (r.height / 2 - 16) / K;
    const rad = Math.max(110, Math.min(r.width * 0.36, roomX, roomY));
    c.rx = rad * OVAL;
    c.ry = rad;
  }, []);

  useEffect(() => {
    decide();
    const onResize = () => decide();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [decide]);

  useEffect(() => {
    if (!spinning) return;
    sizeCloud();
    const onResize = () => sizeCloud();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [spinning, sizeCloud]);

  /** Pause the loop while the section is off screen. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const io = new IntersectionObserver(
      ([e]) => {
        cloud.current.onScreen = e.isIntersecting;
      },
      { rootMargin: "15% 0px" },
    );
    io.observe(stage);
    return () => io.disconnect();
  }, []);

  /** The render loop — writes transforms straight to the DOM, never state. */
  useEffect(() => {
    if (!spinning) return;
    const stage = stageRef.current;
    if (!stage) return;

    let frame = 0;
    const render = () => {
      frame = requestAnimationFrame(render);
      const c = cloud.current;
      if (!c.onScreen) return;

      const cx = stage.clientWidth / 2;
      const cy = stage.clientHeight / 2;
      // Short focal length = strong near/far size difference, which is what
      // makes the eye read a sphere rather than a flat scatter.
      const fov = c.rx * 1.9;

      if (!c.dragging) {
        c.angleY += c.velY;
        c.angleX += c.velX;
        c.velY = lerp(c.velY, 0.0028, 0.02);
        c.velX = lerp(c.velX, 0.0012, 0.02);
      }

      const cosY = Math.cos(c.angleY);
      const sinY = Math.sin(c.angleY);
      const cosX = Math.cos(c.angleX);
      const sinX = Math.sin(c.angleX);

      for (let i = 0; i < c.points.length; i++) {
        const el = tagRefs.current[i];
        const p = c.points[i];
        if (!el || !p) continue;

        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        const X = x1 * c.rx;
        const Y = y2 * c.ry;
        const Z = z2 * c.rx;
        const scale = fov / (fov + Z);

        el.style.left = `${cx + X * scale}px`;
        el.style.top = `${cy + Y * scale}px`;
        el.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        el.style.zIndex = String(Math.round(scale * 200));
        if (!el.classList.contains("is-dim")) {
          const depth = clamp01((scale - 0.5) / 0.85);
          el.style.opacity = (0.12 + 0.88 * depth * depth).toFixed(3);
        }
      }
    };

    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, [spinning]);

  /** Clear inline positioning when dropping back to the flat list. */
  useEffect(() => {
    if (spinning) return;
    for (const el of tagRefs.current) {
      if (el) el.style.cssText = "";
    }
  }, [spinning]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!spinning) return;
    const c = cloud.current;
    c.dragging = true;
    c.lastX = e.clientX;
    c.lastY = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const c = cloud.current;
    if (!c.dragging) return;
    const dx = e.clientX - c.lastX;
    const dy = e.clientY - c.lastY;
    c.lastX = e.clientX;
    c.lastY = e.clientY;
    c.angleY += dx * 0.005;
    c.angleX -= dy * 0.005;
    c.velY = dx * 0.0016;
    c.velX = -dy * 0.0016;
  };

  const stopDrag = () => {
    cloud.current.dragging = false;
  };

  return (
    <div>
      {/* Category filters */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <FilterChip
          label="All"
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        {skills.map((category) => (
          <FilterChip
            key={category.id}
            label={category.shortName ?? category.name}
            tone={TONES[category.id] ?? DEFAULT_TONE}
            active={filter === category.id}
            onClick={() => setFilter(category.id)}
          />
        ))}
      </div>

      {/* The stage */}
      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onPointerLeave={stopDrag}
        className={cn(
          "relative select-none",
          spinning
            ? "h-[min(620px,68vh)] cursor-grab overflow-clip active:cursor-grabbing"
            : "h-auto",
        )}
      >
        {/* Soft amber core behind the ball */}
        {spinning && (
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/[0.07] blur-[80px]"
          />
        )}

        <div
          className={cn(
            spinning
              ? "absolute inset-0"
              : "flex flex-wrap justify-center gap-x-4 gap-y-2",
          )}
        >
          {TAGS.map((tag, i) => {
            const matches = filter === "all" || tag.cat === filter;
            return (
              <span
                key={tag.id}
                ref={(el) => {
                  tagRefs.current[i] = el;
                }}
                data-cat={tag.cat}
                className={cn(
                  "skill-tag",
                  spinning && "absolute left-0 top-0 whitespace-nowrap",
                  !matches && "is-dim",
                  matches && filter !== "all" && "is-match",
                )}
                style={{ color: tag.tone, fontSize: `${FONT[tag.weight] ?? FONT[2]}rem` }}
              >
                {tag.name}
              </span>
            );
          })}
        </div>
      </div>

      {spinning && (
        <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-bone-faint">
          Drag to spin
        </p>
      )}
    </div>
  );
}

function FilterChip({
  label,
  tone,
  active,
  onClick,
}: {
  label: string;
  tone?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-300",
        active
          ? "border-signal bg-signal text-ink"
          : "border-bone/15 bg-ink-50/60 text-bone-muted hover:border-signal/40 hover:text-bone",
      )}
    >
      {tone && (
        <span
          aria-hidden
          className="block h-[7px] w-[7px] rounded-full"
          style={{ background: active ? "#0A0B0D" : tone }}
        />
      )}
      {label}
    </button>
  );
}
