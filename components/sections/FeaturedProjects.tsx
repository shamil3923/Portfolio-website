"use client";

import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Tag } from "@/components/ui/Tag";
import { featuredProjects, otherProjects } from "@/content/projects";

export function FeaturedProjects() {
  return (
    <section id="work" className="container-editorial scroll-mt-24 py-24 sm:py-32">
      <SectionHeader
        index="02"
        eyebrow="Selected work"
        title="Systems built to ship, not to demo."
        description="A mix of agentic AI, applied ML, and computer vision — each one a real engineering problem with a real solution. Open any card for the full case study."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {featuredProjects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      {/* Compact grid for the rest */}
      <Reveal className="mt-14">
        <div className="mb-6 flex items-center gap-3">
          <span className="label-mono">More projects</span>
          <span className="h-px flex-1 bg-bone/10" />
        </div>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-bone/10 sm:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="group flex h-full flex-col gap-3 bg-ink-50/40 p-6 transition-colors hover:bg-ink-100/60"
              >
                <div className="flex items-center justify-between">
                  <Tag>{project.domain}</Tag>
                  <span className="font-mono text-[10px] text-bone-faint">
                    {project.period}
                  </span>
                </div>
                <h3 className="font-display text-lg leading-tight text-bone transition-colors group-hover:text-signal-soft">
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed text-bone-muted">
                  {project.tagline}
                </p>
                <span className="mt-auto pt-2 font-mono text-[11px] uppercase tracking-wider text-bone-faint transition-colors group-hover:text-signal">
                  Case study →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
