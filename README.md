# Mohamed Shamil - Portfolio

A premium, interactive portfolio for an AI/ML engineer - "research engineer meets product builder." Dark editorial theme, one R3F 3D hero scene, one interactive reasoning-pipeline visualization, and fully typed, data-driven content.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (custom graphite + amber/blue design tokens)
- **Framer Motion** (reveals, transitions, scroll-linked timeline)
- **React Three Fiber / three.js** (lazy-loaded hero scene only)
- Deployment-ready for **Vercel**

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint
```

## Where to edit content

All content is centralized and typed - you never touch JSX to change copy.

| File | What it holds |
| --- | --- |
| `content/profile.ts` | Name, headline, bio, location, email/phone, résumé URL, stats, research interests, languages, involvement |
| `content/projects.ts` | All projects. `featured: true` → big case-study card + appears first. Every project gets a `/projects/[slug]` page automatically |
| `content/experience.ts` | Work experience / internships |
| `content/education.ts` | Degrees and results |
| `content/skills.ts` | Skill categories |
| `content/social.ts` | GitHub / LinkedIn / email links |
| `lib/types.ts` | The shape of all the above (edit here to add fields) |

Adding a project = add one object to `content/projects.ts`. The home grid and its detail route are generated from the data.

## Design system

- **Base:** layered near-black graphite (`ink` scale), faint grid + radial glow + grain - never flat.
- **Accent:** a warm amber/copper (`signal`) for state, focus and signal, paired with a cool network blue (`neural`) used only for the neural-graph layers behind the hero portrait. Two accents, strictly separated roles.
- **Type:** Fraunces (display serif) · Inter (sans) · JetBrains Mono (labels/metadata) - an editorial "lab notebook" pairing.
- **Layout:** 1240px editorial grid, asymmetric columns, numbered sections (01–07), layered cards with real depth.
- **Motion:** masked text rises, staggered scroll reveals, hover tilt + cursor spotlight on project cards, scroll-linked experience timeline, a drag-to-spin skills constellation. All gated by `prefers-reduced-motion`.
- **3D:** one R3F neural/agent graph behind the hero (blue edges + amber signals), lazy-loaded, desktop-only; static SVG fallback on mobile / reduced-motion / no-WebGL. The research pipeline is interactive SVG (crisp, accessible, mobile-first) rather than 3D - by design.
- **Hero portrait:** `components/ui/HeroPortrait.tsx` - the subject in a glassmorphism frame with pointer tilt, layered parallax, cursor-following glow, a slow float, a drifting key light and a light sweep, over an animated SVG neural field. Plays a looping portrait video when `public/profile-hero.{webm,mp4}` exist and falls back to the still otherwise; `app/page.tsx` checks for them server-side so a missing clip never 404s. Configured by `HERO_PORTRAIT` in `content/hero.ts` - see `public/README-assets.md`.

## File structure

```
app/
  layout.tsx              # fonts, SEO/OG metadata, skip link
  page.tsx                # home composition
  not-found.tsx
  globals.css             # design tokens, base, components
  projects/[slug]/page.tsx# generated case-study routes (SSG)
components/
  sections/               # Hero, About, FeaturedProjects, Research, Skills, Experience, Education, Contact
  ui/                     # Nav, ScrollProgress, Reveal, SectionHeader, Tag, ProjectCard,
                          # HeroPortrait (hero visual), NeuralField (animated SVG graph),
                          # SkillSphere (draggable tag constellation)
  three/                  # HeroCanvas (lazy wrapper + WebGL boundary), HeroScene (R3F), HeroFallback (SVG), ReasoningPipeline
content/                  # hero, profile, projects, experience, education, skills, social
lib/                      # types, motion variants, utils, useSafeReducedMotion
public/                   # resume.pdf + og.png go here (see README-assets.md)
```


