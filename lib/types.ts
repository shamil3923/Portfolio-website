/**
 * Centralized content types.
 * All portfolio content is typed-data-driven - edit files in /content,
 * never hardcode content into JSX.
 */

export type ProjectLinks = {
  github?: string;
  live?: string;
  paper?: string;
  demo?: string;
};

export type CaseStudyBlock = {
  heading: string;
  body: string;
};

export type Project = {
  /** URL-safe identifier used for /projects/[slug] */
  slug: string;
  title: string;
  /** One-line positioning shown on cards */
  tagline: string;
  type: string;
  period: string;
  context?: string;
  advisor?: string;
  /** The problem being solved */
  problem: string;
  /** What was built, one paragraph */
  solution: string;
  /** Engineering detail bullets */
  details: string[];
  /** Dataset / evaluation note, if any */
  dataset?: string;
  stack: string[];
  /** Outcome / why it matters */
  impact?: string;
  featured: boolean;
  links: ProjectLinks;
  /** Optional richer case-study sections for detail pages */
  caseStudy?: CaseStudyBlock[];
  /**
   * Preview visual: a path under /public (e.g. "/projects/slug.jpg").
   * Rendered as the card thumbnail and as the case-study preview.
   */
  image?: string;
  /** Alt text for `image`. Falls back to the project title. */
  imageAlt?: string;
  /** Short accent label, e.g. "Research" / "Agentic AI" */
  domain: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export type EducationItem = {
  institution: string;
  qualification: string;
  period: string;
  location: string;
  detail?: string;
  coursework?: string[];
  results?: { label: string; value: string }[];
};

/**
 * A skill is either a plain name (normal prominence) or a name with an
 * explicit weight. Weight drives type size in the skills sphere:
 * 3 = headline capability, 2 = solid, 1 = supporting. Plain strings are 2.
 */
export type SkillItem = string | { name: string; weight: 1 | 2 | 3 };

export type SkillCategory = {
  name: string;
  /** kebab id for keys */
  id: string;
  /** Short label used on the skills-sphere filter chips. */
  shortName?: string;
  skills: SkillItem[];
};

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export type Stat = {
  value: string;
  label: string;
  /** mark approximate / placeholder metrics */
  note?: string;
};

export type Profile = {
  name: string;
  headline: string;
  shortBio: string;
  location: string;
  email: string;
  phone: string;
  resumeUrl: string;
  domain: string;
  positioning: string[];
  stats: Stat[];
  researchInterests: string[];
  languages: { name: string; level: string }[];
  involvement: string[];
  certifications: string[];
};
