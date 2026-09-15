"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { profile } from "@/content/profile";
import { getProject } from "@/content/projects";

// Code-split the interactive viz.
const ReasoningPipeline = dynamic(
  () =>
    import("@/components/three/ReasoningPipeline").then((m) => m.ReasoningPipeline),
  {
    ssr: false,
    loading: () => (
      <div className="card-surface grid h-64 place-items-center">
        <span className="label-mono animate-pulse">Loading pipeline…</span>
      </div>
    ),
  },
);

const research = getProject("hybrid-llm-hrm-reasoning");

export function Research() {
  return (
    <section
      id="research"
      className="relative scroll-mt-24 border-y border-bone/10 bg-ink-50/30 py-24 sm:py-32"
    >
      <div className="container-editorial">
        <SectionHeader
          index="03"
          eyebrow="Research focus"
          title="Making multi-step reasoning auditable."
          description="My final-year project asks whether a language model and a Hierarchical Reasoning Model can be composed so that every step of a math solution is decodable and verifiable — not just the final answer."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Sticky context column */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <Reveal>
              <div className="space-y-6">
                {research && (
                  <div className="card-surface p-6">
                    <p className="label-mono mb-3">The project</p>
                    <p className="text-sm leading-relaxed text-bone-muted">
                      {research.problem}
                    </p>
                    <dl className="mt-5 space-y-2 border-t border-bone/10 pt-5 text-sm">
                      <div className="flex justify-between gap-3">
                        <dt className="text-bone-faint">Context</dt>
                        <dd className="text-right text-bone">{research.context}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-bone-faint">Advisor</dt>
                        <dd className="text-right text-bone">{research.advisor}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-bone-faint">Status</dt>
                        <dd className="text-right text-signal-soft">{research.period}</dd>
                      </div>
                    </dl>
                    <Link
                      href={`/projects/${research.slug}`}
                      className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-signal hover:text-signal-soft"
                    >
                      Full case study →
                    </Link>
                  </div>
                )}

                <div>
                  <p className="label-mono mb-3">Research interests</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.researchInterests.map((r) => (
                      <Tag key={r}>{r}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Interactive pipeline */}
          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <ReasoningPipeline />
              <p className="mt-4 text-center font-mono text-[11px] text-bone-faint sm:text-left">
                Tap or hover a stage to inspect it · auto-advances when idle
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
