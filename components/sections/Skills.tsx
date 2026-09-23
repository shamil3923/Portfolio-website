"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SkillSphere } from "@/components/ui/SkillSphere";
import { skills } from "@/content/skills";

const total = skills.reduce((n, c) => n + c.skills.length, 0);

export function Skills() {
  return (
    <section id="skills" className="container-editorial scroll-mt-24 py-24 sm:py-32">
      <SectionHeader
        index="04"
        eyebrow="Stack"
        title="The tools behind the systems."
        description="Organized by where they sit in the build - from agent orchestration down to the infrastructure that runs it. Filter by layer, or spin the whole stack."
      />

      <Reveal className="mt-14">
        <SkillSphere />
      </Reveal>

      <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint">
        {total} tools · {skills.length} layers
      </p>
    </section>
  );
}
