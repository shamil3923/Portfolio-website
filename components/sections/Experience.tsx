"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { experience } from "@/content/experience";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="container-editorial scroll-mt-24 py-24 sm:py-32">
      <SectionHeader
        index="05"
        eyebrow="Experience"
        title="Six months shipping production AI."
        description="An AI/ML engineering internship where research-grade ideas met deadlines, deployments, and real users."
      />

      <div ref={ref} className="relative mt-16 pl-8 sm:pl-10">
        {/* Timeline rail */}
        <div className="absolute left-[6px] top-2 h-full w-px bg-bone/10 sm:left-[10px]">
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute inset-0 origin-top bg-gradient-to-b from-signal to-signal-deep"
          />
        </div>

        {experience.map((job, i) => (
          <motion.article
            key={job.company}
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative pb-12 last:pb-0"
          >
            {/* Node */}
            <span className="absolute -left-[30px] top-1.5 grid h-4 w-4 place-items-center rounded-full border border-signal/50 bg-ink sm:-left-[34px]">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            </span>

            <motion.div variants={fadeUp} className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-2xl text-bone">{job.role}</h3>
              <span className="font-mono text-xs text-bone-faint">{job.period}</span>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-1 text-signal-soft">
              {job.company}
              <span className="text-bone-faint"> · {job.location}</span>
            </motion.p>

            <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-sm leading-relaxed text-bone-muted">
              {job.summary}
            </motion.p>

            <motion.ul variants={stagger} className="mt-5 space-y-2.5">
              {job.highlights.map((h, hi) => (
                <motion.li
                  key={hi}
                  variants={fadeUp}
                  className="flex gap-3 text-sm leading-relaxed text-bone-muted"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal/60" />
                  {h}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
              {job.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </motion.div>
            {i < experience.length - 1 && <div className="mt-2" />}
          </motion.article>
        ))}
      </div>
    </section>
  );
}
