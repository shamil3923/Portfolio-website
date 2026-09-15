"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { NeuralField } from "@/components/ui/NeuralField";
import { HERO_PORTRAIT } from "@/content/hero";
import { profile } from "@/content/profile";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

export { HERO_PORTRAIT };

/** Colour grade applied to the subject — identical for the video and the still,
 *  so swapping between them is invisible. */
const SUBJECT_GRADE = "[filter:saturate(0.55)_contrast(1.1)_brightness(0.9)]";

/** Fine-pointer check — pointer parallax/tilt is desktop-only. */
function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return fine;
}

function useParallax(mv: MotionValue<number>, amount: number) {
  return useTransform(mv, (v) => v * amount);
}

export function HeroPortrait({ videoReady = false }: { videoReady?: boolean }) {
  const reduce = useSafeReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);
  // Real footage only when the files exist, the user hasn't asked for reduced
  // motion, and playback hasn't errored. Otherwise: the still, exactly as before.
  const useVideo = videoReady && !reduce && !videoFailed;
  const fine = useFinePointer();
  const interactive = fine && !reduce;

  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  // Normalised pointer position within the card (-0.5 … 0.5).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  // Raw pixel position — drives the cursor-following glow.
  const gx = useMotionValue(0);
  const gy = useMotionValue(0);

  const spring = { stiffness: 120, damping: 20, mass: 0.6 };
  const px = useSpring(mx, spring);
  const py = useSpring(my, spring);

  // Small, restrained 3D tilt.
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), spring);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), spring);

  // Layered parallax: deeper layers move less than nearer ones.
  const glowX = useParallax(px, 26);
  const glowY = useParallax(py, 26);
  const fieldX = useParallax(px, 16);
  const fieldY = useParallax(py, 16);
  const imgX = useParallax(px, -12);
  const imgY = useParallax(py, -12);

  const cursorGlow = useMotionTemplate`radial-gradient(240px circle at ${gx}px ${gy}px, rgba(232,176,75,0.20), rgba(77,141,240,0.12) 45%, transparent 70%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    mx.set(x / r.width - 0.5);
    my.set(y / r.height - 0.5);
    gx.set(x);
    gy.set(y);
  };

  const onLeave = () => {
    setHovered(false);
    mx.set(0);
    my.set(0);
  };

  /* Only decode while the card is actually on screen, and never fight an
     autoplay policy that refused: a rejected play() leaves the poster up. */
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !useVideo) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [useVideo]);

  const aspect = `${HERO_PORTRAIT.width} / ${HERO_PORTRAIT.height}`;

  return (
    <div className="relative mx-auto w-full max-w-[420px] lg:max-w-[460px]">
      <div
        ref={stageRef}
        onMouseMove={onMove}
        onMouseEnter={() => interactive && setHovered(true)}
        onMouseLeave={onLeave}
        className="relative"
        style={{ perspective: 1200, aspectRatio: aspect }}
      >
        {/* ── Ambient glows behind the card (blue + gold) ── */}
        <motion.div
          aria-hidden
          style={{ x: interactive ? glowX : 0, y: interactive ? glowY : 0 }}
          className="pointer-events-none absolute inset-0"
        >
          <motion.span
            className="absolute -left-20 top-2 block h-64 w-64 rounded-full bg-neural/35 blur-[64px]"
            animate={reduce ? undefined : { opacity: [0.45, 0.8, 0.45], scale: [0.95, 1.06, 0.95] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute -right-16 bottom-4 block h-64 w-64 rounded-full bg-signal/30 blur-[64px]"
            animate={reduce ? undefined : { opacity: [0.75, 0.4, 0.75], scale: [1.05, 0.95, 1.05] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* ── Neural field around the frame ── */}
        <motion.div
          aria-hidden
          style={{ x: interactive ? fieldX : 0, y: interactive ? fieldY : 0 }}
          className="pointer-events-none absolute -inset-y-[16%] -inset-x-[26%]"
        >
          <NeuralField className="h-full w-full opacity-90" />
        </motion.div>

        {/* ── Tilt group ── */}
        <motion.div
          style={{
            rotateX: interactive ? rotateX : 0,
            rotateY: interactive ? rotateY : 0,
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-0"
        >
          {/* ── Slow float (vertical drift + a whisper of rotation) ── */}
          <motion.div
            className="group absolute inset-0"
            animate={reduce ? undefined : { y: [0, -10, 0], rotate: [-0.5, 0.5, -0.5] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Glassmorphism frame */}
            <div className="portrait-glass grain relative h-full w-full overflow-hidden rounded-[20px] transition-colors duration-500 group-hover:border-signal/30">
              {/* The subject — looping video when we have it, still otherwise.
                  Both sit in the same box with the same object-fit and grading,
                  so the card, borders and text stay aligned either way. */}
              <motion.div
                style={{ x: interactive ? imgX : 0, y: interactive ? imgY : 0 }}
                className="absolute inset-0"
              >
                <div
                  className={cn(
                    "relative h-full w-full",
                    // No CSS zoom on the subject while real footage is playing —
                    // the motion has to come from the video, not a fake push-in.
                    !useVideo &&
                      "transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.035]",
                  )}
                >
                  {useVideo ? (
                    <video
                      ref={videoRef}
                      poster={HERO_PORTRAIT.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      role="img"
                      aria-label={HERO_PORTRAIT.alt}
                      onError={() => setVideoFailed(true)}
                      style={{ objectPosition: HERO_PORTRAIT.objectPosition }}
                      className={cn(
                        "absolute inset-0 h-full w-full transition-[filter] duration-500 group-hover:brightness-110",
                        HERO_PORTRAIT.video.fit === "contain"
                          ? "object-contain"
                          : "object-cover",
                        SUBJECT_GRADE,
                      )}
                    >
                      <source src={HERO_PORTRAIT.video.webm} type="video/webm" />
                      <source src={HERO_PORTRAIT.video.mp4} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={HERO_PORTRAIT.src}
                      alt={HERO_PORTRAIT.alt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 460px, (min-width: 640px) 420px, 88vw"
                      style={{ objectPosition: HERO_PORTRAIT.objectPosition }}
                      className={cn(
                        "transition-[filter] duration-500 group-hover:brightness-110",
                        HERO_PORTRAIT.cutout
                          ? "object-contain [filter:drop-shadow(0_18px_28px_rgba(0,0,0,0.6))]"
                          : cn("object-cover", SUBJECT_GRADE),
                      )}
                    />
                  )}
                </div>
              </motion.div>

              {/* Cinematic key light drifting through the scene. Sits under the
                  vignettes and the bottom gradient, so it never touches the
                  name/role text and never blows out the face. */}
              {!reduce && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-3/4 mix-blend-soft-light [mask-image:linear-gradient(to_bottom,black,transparent)]"
                  style={{
                    background:
                      "radial-gradient(45% 40% at 50% 35%, rgba(240,199,120,0.5), transparent 70%)",
                  }}
                  animate={{
                    x: ["-14%", "16%", "-14%"],
                    opacity: [0.35, 0.6, 0.35],
                  }}
                  transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {/* Blend the photo's own background into the dark theme.
                  Skipped for a transparent cutout, which needs no vignette. */}
              {!HERO_PORTRAIT.cutout && (
                <>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `radial-gradient(100% 72% at ${HERO_PORTRAIT.focal}, transparent 14%, rgba(10,11,13,0.42) 50%, rgba(10,11,13,0.88) 82%, rgba(10,11,13,0.97) 100%)`,
                    }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(10,11,13,0.75),transparent_28%,transparent_72%,rgba(10,11,13,0.75))]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-ink/85 to-transparent"
                  />
                </>
              )}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/55 to-transparent"
              />
              {/* Gold/blue duotone wash — ties the photo to the palette */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neural/[0.14] via-transparent to-signal/14 mix-blend-overlay"
              />

              {/* Light sweep across the card */}
              {!reduce && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -inset-y-1/3 -left-1/2 w-1/3 rotate-[18deg] bg-gradient-to-r from-transparent via-bone/15 to-transparent blur-[6px]"
                  animate={{ x: ["0%", "480%"] }}
                  transition={{ duration: 4.2, repeat: Infinity, repeatDelay: 4.5, ease }}
                />
              )}

              {/* Cursor-following glow */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{ background: cursorGlow, opacity: hovered ? 1 : 0 }}
              />

              {/* HUD corner brackets — gold top, blue bottom */}
              <span className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-signal/60" />
              <span className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-signal/60" />
              <span className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-neural/55" />
              <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-neural/55" />

              {/* Caption */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <div>
                  <p className="font-display text-lg leading-none text-bone">
                    {profile.name}
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-signal-soft">
                    AI/ML Engineer
                  </p>
                </div>
                <span className="font-mono text-[10px] text-bone-faint">
                  {"// shamil.me"}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
