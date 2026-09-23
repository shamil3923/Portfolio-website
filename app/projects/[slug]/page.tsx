import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ChevronButton } from "@/components/ui/ChevronButton";
import { HudRing } from "@/components/ui/HudRing";
import { BracketFrame } from "@/components/ui/BracketFrame";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const hasLinks = Object.values(project.links).some(Boolean);

  // Previous / next project for HUD-style navigation (wraps around).
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <ScrollProgress />
      <main className="container-editorial py-16 sm:py-24">
        <Reveal>
          <ChevronButton href="/#work" direction="left">
            Back to work
          </ChevronButton>
        </Reveal>

        {/* Header */}
        <header className="mt-10 max-w-3xl">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <Tag accent>{project.domain}</Tag>
              <span className="font-mono text-xs text-bone-faint">{project.type}</span>
              <span className="font-mono text-xs text-bone-faint">· {project.period}</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tightest text-bone sm:text-5xl">
              {project.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-bone-muted">
              {project.tagline}
            </p>
          </Reveal>

          {(project.context || project.advisor) && (
            <Reveal delay={0.12}>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-bone-faint">
                {project.context && (
                  <span>
                    Context · <span className="text-bone">{project.context}</span>
                  </span>
                )}
                {project.advisor && (
                  <span>
                    Advisor · <span className="text-bone">{project.advisor}</span>
                  </span>
                )}
              </div>
            </Reveal>
          )}
        </header>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          {/* Main column */}
          <div className="space-y-12 lg:col-span-8">
            <Reveal as="section">
              <h2 className="label-mono mb-4">The problem</h2>
              <p className="text-lg leading-relaxed text-bone-muted">{project.problem}</p>
            </Reveal>

            <Reveal as="section">
              <h2 className="label-mono mb-4">What I built</h2>
              <p className="text-lg leading-relaxed text-bone-muted">{project.solution}</p>
            </Reveal>

            <Reveal as="section">
              <h2 className="label-mono mb-4">Engineering detail</h2>
              <ul className="space-y-3">
                {project.details.map((d, i) => (
                  <li key={i} className="flex gap-4 text-bone-muted">
                    <span className="mt-1 font-mono text-xs text-signal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {project.dataset && (
              <Reveal as="section">
                <h2 className="label-mono mb-4">Dataset & evaluation</h2>
                <p className="card-surface p-6 text-bone-muted">{project.dataset}</p>
              </Reveal>
            )}

            {project.caseStudy?.map((block) => (
              <Reveal as="section" key={block.heading}>
                <h2 className="font-display text-2xl text-bone">{block.heading}</h2>
                <p className="mt-4 text-lg leading-relaxed text-bone-muted">
                  {block.body}
                </p>
              </Reveal>
            ))}

            {/* Framed visual - scroll-tilt + marching-ants border. The image
                comes from `project.image`; projects without one keep the
                placeholder so the layout is never half-built. */}
            <section>
              <h2 className="label-mono mb-4">Preview</h2>
              {project.image ? (
                <BracketFrame caption="System architecture">
                  <Image
                    src={project.image}
                    alt={project.imageAlt ?? project.title}
                    width={1600}
                    height={900}
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    className="h-auto w-full"
                  />
                </BracketFrame>
              ) : (
                <BracketFrame caption="Screenshot coming soon">
                  <div className="grid aspect-[16/10] w-full place-items-center bg-[radial-gradient(circle_at_50%_40%,rgba(232,176,75,0.08),transparent_60%)]">
                    <div className="text-center">
                      <p className="font-display text-2xl text-bone/40">
                        {project.domain}
                      </p>
                      <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-bone-faint">
                        Add a wireframe / demo still
                      </p>
                    </div>
                  </div>
                </BracketFrame>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-16 space-y-8">
              <Reveal>
                <div className="hud-panel clip-notch p-6">
                  <HudRing items={project.stack} label="Built with" />
                </div>
              </Reveal>

              <Reveal delay={0.04}>
                <div className="card-surface p-6">
                  <h2 className="label-mono mb-4">Stack</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </div>
              </Reveal>

              {project.impact && (
                <Reveal delay={0.06}>
                  <div className="card-surface p-6">
                    <h2 className="label-mono mb-4">Why it matters</h2>
                    <p className="text-sm leading-relaxed text-bone-muted">
                      {project.impact}
                    </p>
                  </div>
                </Reveal>
              )}

              {/* The panel only exists when there is somewhere to go - an empty
                  "coming soon" card is worse than no card. */}
              {hasLinks && (
                <Reveal delay={0.1}>
                  <div className="card-surface p-6">
                    <h2 className="label-mono mb-4">Links</h2>
                    <ul className="space-y-2 text-sm">
                      {project.links.github && (
                        <li>
                          <a
                            className="text-bone transition-colors hover:text-signal-soft"
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            GitHub ↗
                          </a>
                        </li>
                      )}
                      {project.links.live && (
                        <li>
                          <a
                            className="text-bone transition-colors hover:text-signal-soft"
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Live ↗
                          </a>
                        </li>
                      )}
                      {project.links.paper && (
                        <li>
                          <a
                            className="text-bone transition-colors hover:text-signal-soft"
                            href={project.links.paper}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Paper ↗
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </Reveal>
              )}
            </div>
          </aside>
        </div>

        <nav
          aria-label="Project navigation"
          className="mt-20 border-t border-bone/10 pt-10"
        >
          <div className="flex items-center justify-center">
            <Link
              href="/#work"
              className="font-mono text-xs uppercase tracking-[0.2em] text-bone-muted transition-colors hover:text-signal"
            >
              All work
            </Link>
          </div>
          <div className="mt-6 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-faint">
                Previous
              </span>
              <ChevronButton href={`/projects/${prev.slug}`} direction="left">
                {prev.domain}
              </ChevronButton>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-faint">
                Next
              </span>
              <ChevronButton
                href={`/projects/${next.slug}`}
                direction="right"
                align="right"
              >
                {next.domain}
              </ChevronButton>
            </div>
          </div>
        </nav>
      </main>
    </>
  );
}
