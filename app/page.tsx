import { existsSync } from "node:fs";
import path from "node:path";
import { Nav } from "@/components/ui/Nav";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Research } from "@/components/sections/Research";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { HERO_VIDEO_FILES } from "@/content/hero";

/**
 * Does the hero's looping portrait video actually exist? Checked here, on the
 * server at build time, so the client never renders a <video> pointing at a
 * file that isn't there — which is what would produce 404s in the console.
 * Drop the encoded files into /public and rebuild; nothing else to change.
 */
const heroVideoReady = HERO_VIDEO_FILES.some((file) =>
  existsSync(path.join(process.cwd(), "public", file)),
);

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero videoReady={heroVideoReady} />
        <About />
        <FeaturedProjects />
        <Research />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </main>
    </>
  );
}
