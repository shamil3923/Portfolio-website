"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { education } from "@/content/education";
import { profile } from "@/content/profile";

export function Education() {
  return (
    <section id="education" className="container-editorial scroll-mt-24 py-24 sm:py-32">
      <SectionHeader
        index="06"
        eyebrow="Education"
        title="Foundations."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {education.map((item, i) => (
          <Reveal key={item.institution} delay={i * 0.08}>
            <article className="card-surface h-full p-7 sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs text-bone-faint">{item.period}</span>
                {item.detail && <Tag accent>{item.detail}</Tag>}
              </div>

              <h3 className="mt-5 font-display text-xl leading-tight text-bone">
                {item.institution}
              </h3>
              <p className="mt-2 text-sm text-bone-muted">{item.qualification}</p>
              <p className="mt-1 font-mono text-xs text-bone-faint">{item.location}</p>

              {item.results && (
                <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-bone/10">
                  {item.results.map((r) => (
                    <div key={r.label} className="bg-ink-100/40 p-3 text-center">
                      <dt className="text-[11px] text-bone-faint">{r.label}</dt>
                      <dd className="mt-1 font-display text-xl text-signal-soft">
                        {r.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {item.coursework && (
                <div className="mt-6">
                  <p className="label-mono mb-3">Relevant coursework</p>
                  <div className="flex flex-wrap gap-2">
                    {item.coursework.map((c) => (
                      <Tag key={c}>{c}</Tag>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6">
        <div className="card-surface p-7 sm:p-8">
          <p className="label-mono mb-4">Certifications</p>
          <div className="flex flex-wrap gap-2">
            {profile.certifications.map((c) => (
              <Tag key={c}>{c}</Tag>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
