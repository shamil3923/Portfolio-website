"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/content/profile";
import { stagger, fadeUp } from "@/lib/motion";

export function About() {
  return (
    <section id="about" className="container-editorial scroll-mt-24 py-24 sm:py-32">
      <SectionHeader
        index="01"
        eyebrow="Positioning"
        title="Research engineer meets product builder."
        description={profile.shortBio}
      />

      <div className="mt-16 grid gap-12 lg:grid-cols-12">
        {/* Positioning pillars */}
        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="lg:col-span-7 space-y-px overflow-hidden rounded-2xl border border-bone/10"
        >
          {profile.positioning.map((point, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              className="group flex gap-5 bg-ink-50/40 p-6 transition-colors hover:bg-ink-100/60 sm:p-7"
            >
              <span className="font-mono text-sm text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[0.97rem] leading-relaxed text-bone-muted transition-colors group-hover:text-bone">
                {point}
              </p>
            </motion.li>
          ))}
        </motion.ul>

        {/* Stat block — HUD-framed */}
        <div className="lg:col-span-5">
          <Reveal className="relative">
            <span className="absolute -left-1 -top-1 z-10 h-5 w-5 border-l-2 border-t-2 border-signal/60" />
            <span className="absolute -bottom-1 -right-1 z-10 h-5 w-5 border-b-2 border-r-2 border-signal/60" />
            <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-bone-faint">
              <span className="text-signal/70">{"// signal"}</span>
              <span>04 metrics</span>
            </div>
            <div className="hud-panel clip-notch grid grid-cols-2 gap-px">
              {profile.stats.map((stat) => (
                <div key={stat.label} className="bg-ink-50/40 p-6">
                  <div className="font-display text-3xl text-bone sm:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-bone-muted">{stat.label}</div>
                  {stat.note && (
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-bone-faint">
                      {stat.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-px">
            <div className="rounded-2xl border border-bone/10 bg-ink-50/40 p-6">
              <p className="label-mono mb-3">Currently</p>
              <p className="text-sm leading-relaxed text-bone-muted">
                Leading a final-year research project on hybrid LLM–HRM reasoning,
                while building agentic systems with FastAPI, Docker, AWS, and
                PostgreSQL.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
