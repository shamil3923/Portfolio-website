import { profile } from "@/content/profile";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Hero portrait - the primary visual identity of the site.
 *
 * `width`/`height` are the still's real pixel dimensions: the card derives its
 * aspect ratio from them, so the subject is never cropped, never stretched, and
 * never causes layout shift.
 *
 * Lives in /content (not in the component) so the server can read it too -
 * app/page.tsx checks whether the video files actually exist before asking the
 * client to render a <video>, which is what keeps missing files from turning
 * into 404s in the console.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const HERO_PORTRAIT = {
  /** The still. Poster for the video, and the fallback whenever it can't play. */
  src: "/profile-hero.jpg",
  /** The still's real pixel size - drives the card's aspect ratio. */
  width: 980,
  height: 1225,
  alt: `${profile.name} - AI/ML Engineer`,
  /** Where the subject sits inside the frame. */
  objectPosition: "50% 50%",
  /**
   * Set true when `src` is a background-removed transparent PNG: the figure is
   * then composited straight onto the neural field and the photo-blending
   * vignette is skipped. Leave false for a normal photo.
   */
  cutout: false,
  /** Focal point kept clear of the vignette (the face). */
  focal: "50% 27%",

  /**
   * The looping portrait video. Drop the encoded files at these paths under
   * /public and the card plays them instead of the still - no code change
   * needed; app/page.tsx picks them up on the next build.
   *
   * The clip must be authored at the same 980×1225 (4:5) framing as `src`, so
   * `fit: "cover"` crops nothing. Switch to "contain" only if your clip came
   * back at a different aspect ratio and cover would cut the face or hands.
   */
  video: {
    webm: "/profile-hero.webm",
    mp4: "/profile-hero.mp4",
    fit: "cover" as "cover" | "contain",
  },
};

/** Filenames the server checks for, derived from the config above. */
export const HERO_VIDEO_FILES = [
  HERO_PORTRAIT.video.webm,
  HERO_PORTRAIT.video.mp4,
];
