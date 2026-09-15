"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sections } from "@/lib/utils";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

const navItems = sections.filter((s) =>
  ["about", "work", "research", "experience", "contact"].includes(s.id),
);

export function Nav() {
  const [active, setActive] = useState<string>("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled
          ? "border-b border-bone/10 bg-ink/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="container-editorial flex h-16 items-center justify-between">
        <a
          href="#hero"
          className="group flex items-center gap-2 font-display text-lg tracking-tight text-bone"
          aria-label="Back to top"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md border border-signal/30 bg-signal/10 font-mono text-sm text-signal transition-colors group-hover:bg-signal/20">
            MS
          </span>
          <span className="hidden sm:inline">Shamil</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors",
                  active === item.id
                    ? "text-bone"
                    : "text-bone-muted hover:text-bone",
                )}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full border border-bone/10 bg-ink-100/70"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-signal/40 bg-signal/10 px-4 py-2 text-sm text-signal-soft transition-colors hover:bg-signal/20 sm:inline-block"
          >
            Resume
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-md border border-bone/10 text-bone md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <div className="space-y-1.5">
              <span
                className={cn(
                  "block h-px w-5 bg-bone transition-transform",
                  menuOpen && "translate-y-[3px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-5 bg-bone transition-transform",
                  menuOpen && "-translate-y-[3px] -rotate-45",
                )}
              />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-bone/10 bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <ul className="container-editorial flex flex-col gap-1 py-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-bone-muted hover:bg-ink-100/60 hover:text-bone"
                  >
                    <span className="font-mono text-xs text-signal">{item.index}</span>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block rounded-lg border border-signal/30 bg-signal/10 px-3 py-3 text-center text-signal-soft"
                >
                  Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
