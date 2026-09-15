/** Tiny className combiner (no extra deps). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export const sections = [
  { id: "hero", label: "Intro", index: "00" },
  { id: "about", label: "About", index: "01" },
  { id: "work", label: "Work", index: "02" },
  { id: "research", label: "Research", index: "03" },
  { id: "skills", label: "Stack", index: "04" },
  { id: "experience", label: "Experience", index: "05" },
  { id: "education", label: "Education", index: "06" },
  { id: "contact", label: "Contact", index: "07" },
] as const;
