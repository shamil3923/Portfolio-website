"use client";

import { motion } from "framer-motion";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { HeroPortrait } from "@/components/ui/HeroPortrait";
import { profile } from "@/content/profile";
import { maskRise, fadeUp, ease } from "@/lib/motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

const [primaryRole, focusLine] = profile.headline.split("|").map((s) => s.trim());

export function Hero({ videoReady = false }: { videoReady?: boolean }) {
  const reduce = useSafeReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 sm:pt-20"
    >
      {/* Ambient 3D / fallback graph layer */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_92%)]">
          <HeroCanvas />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="container-editorial">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Text column */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="lg:col-span-7"
          >
            <motion.div
              variants={fadeUp}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-bone/10 bg-ink-50/60 px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              <span className="font-mono text-xs text-bone-muted">
                {profile.location} · Open to research &amp; engineering roles
              </span>
            </motion.div>

            <h1 className="font-display text-[2.5rem] leading-[1.02] tracking-tightest text-bone sm:text-6xl lg:text-[4.2rem]">
              <span className="block overflow-hidden">
                {reduce ? (
                  <span className="block">{profile.name}</span>
                ) : (
                  <motion.span className="block" variants={maskRise}>
                    {profile.name}
                  </motion.span>
                )}
              </span>
              <span className="mt-2 block overflow-hidden">
                {reduce ? (
                  <span className="block text-bone-muted">{primaryRole}</span>
                ) : (
                  <motion.span
                    className="block bg-gradient-to-r from-signal-soft via-signal to-signal-deep bg-clip-text text-transparent"
                    variants={maskRise}
                  >
                    {primaryRole}
                  </motion.span>
                )}
              </span>
            </h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-xl text-base leading-relaxed text-bone-muted sm:text-lg"
            >
              {focusLine}. I build agentic systems and ship them to production —
              and I research interpretable reasoning at the model level.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.02]"
              >
                View selected work
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#research"
                className="inline-flex items-center gap-2 rounded-full border border-bone/15 px-6 py-3 text-sm text-bone transition-colors hover:border-signal/40 hover:text-signal-soft"
              >
                Explore the research
              </a>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-bone-muted underline-offset-4 transition-colors hover:text-bone hover:underline"
              >
                Résumé ↗
              </a>
            </motion.div>
          </motion.div>

          {/* Portrait column — primary visual identity */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="lg:col-span-5"
          >
            <HeroPortrait videoReady={videoReady} />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease }}
        >
          <span className="label-mono">Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-signal/60 to-transparent" />
        </motion.div>
      )}
    </section>
  );
}
