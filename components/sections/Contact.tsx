"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/content/profile";
import { social } from "@/content/social";
import { maskRise, viewportOnce } from "@/lib/motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

export function Contact() {
  const reduce = useSafeReducedMotion();

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-bone/10 py-24 sm:py-32"
    >
      {/* Ambient amber wash echoing the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-signal/[0.06] blur-[120px]"
      />

      <div className="container-editorial">
        <div className="max-w-3xl">
          <p className="label-mono mb-5 flex items-center gap-3">
            <span className="font-mono text-sm text-signal">07</span>
            <span className="h-px w-8 bg-signal/40" />
            Contact
          </p>
          <h2 className="overflow-hidden font-display text-4xl leading-[1.03] tracking-tightest text-bone sm:text-6xl">
            {reduce ? (
              "Let's build something that reasons."
            ) : (
              <motion.span
                className="block"
                variants={maskRise}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
              >
                Let&rsquo;s build something that reasons.
              </motion.span>
            )}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-bone-muted sm:text-lg">
            Open to research collaborations, AI/ML engineering roles, and
            ambitious product builds. The fastest way to reach me is email.
          </p>

          <Reveal delay={0.1} className="mt-10">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-3 font-display text-2xl text-bone transition-colors hover:text-signal-soft sm:text-3xl"
            >
              {profile.email}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>

        {/* Links + meta */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-bone/10 sm:grid-cols-3">
          {social.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex flex-col gap-1 bg-ink-50/40 p-6 transition-colors hover:bg-ink-100/60"
            >
              <span className="label-mono">{link.label}</span>
              <span className="text-bone transition-colors group-hover:text-signal-soft">
                {link.handle} ↗
              </span>
            </a>
          ))}
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <Reveal>
            <p className="label-mono mb-3">Languages</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-bone-muted">
              {profile.languages.map((l) => (
                <li key={l.name}>
                  {l.name}
                  <span className="text-bone-faint"> · {l.level}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="label-mono mb-3">Involvement</p>
            <ul className="space-y-1 text-sm text-bone-muted">
              {profile.involvement.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <footer className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-bone/10 pt-8 text-sm text-bone-faint sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with Next.js,
            Three.js & Framer Motion.
          </p>
          <p className="font-mono text-xs">{profile.location}</p>
        </footer>
      </div>
    </section>
  );
}
