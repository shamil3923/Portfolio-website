# Assets

## The hero portrait

The hero visual is `components/ui/HeroPortrait.tsx`. Everything about the subject
lives in one constant, `HERO_PORTRAIT` in `content/hero.ts` (it sits in
`/content` rather than in the component so the server can read it too):

```ts
export const HERO_PORTRAIT = {
  src: "/profile-hero.jpg", // path under /public - the only thing to change
  width: 980,             // the file's real pixel width…
  height: 1225,           // …and height. The frame takes its aspect ratio
                          // from these, so the photo is never cropped,
                          // never stretched, and never shifts layout.
  alt: `${profile.name} - AI/ML Engineer`,
  objectPosition: "50% 50%", // where the subject sits in the frame
  cutout: false,          // true if `src` is a transparent background-removed PNG
  focal: "50% 27%",       // the point the blend vignette keeps clear (the face)
};
```

**To swap the photo:** drop the file in `public/`, then update `src` and the
real `width`/`height`. Nudge `objectPosition` / `focal` if the face sits off
centre. Nothing else needs to change.

- `profile-hero.jpg` - the photo currently used in the hero: a 4:5 portrait
  crop of `FDL00230.jpg`, cut at full resolution so it stays sharp on retina.
  To re-crop from the original after choosing a different frame:
  ```bash
  sips -c 1225 980 --cropOffset 140 728 public/FDL00230.jpg \
    --out public/profile-hero.jpg -s format jpeg -s formatOptions 88
  ```
  (`--cropOffset` takes Y then X.) Crop rather than relying on CSS `object-fit`:
  `next/image` resizes the *whole* file to the rendered width, so a CSS crop
  throws away resolution.
- `FDL00230.jpg` - the full-frame original, kept for re-cropping.
- `profile.jpeg` - the previous hero photo.
- `profile-cutout.png` - a background-removed transparent version. To use it
  instead, set `src: "/profile-cutout.png"` **and** `cutout: true`; the figure
  is then composited directly onto the neural field with no vignette.
  To regenerate one after swapping the source photo:
  ```bash
  python3 -m venv /tmp/bgvenv && /tmp/bgvenv/bin/pip install "rembg[cpu]" onnxruntime pillow
  /tmp/bgvenv/bin/python -c "from rembg import remove, new_session; from PIL import Image; \
  remove(Image.open('public/profile.jpeg').convert('RGBA'), session=new_session('u2net_human_seg'), \
  alpha_matting=True, alpha_matting_erode_size=12).save('public/profile-cutout.png')"
  ```

## Résumé

- `MRM_Shamil_AI.pdf` - the public résumé, served at `/MRM_Shamil_AI.pdf` and
  referenced by `profile.resumeUrl` in `content/profile.ts`. Replace the file
  in place to publish a new version.

## The looping portrait video

The hero card plays a looping video of the subject when one is present, and
falls back to `profile-hero.jpg` when it isn't - so the site is complete either
way. `app/page.tsx` checks for the files on the server at build time, which is
why a missing clip produces no 404 and no console error.

**To turn it on:** put `profile-hero.webm` and `profile-hero.mp4` in this folder
and rebuild. Nothing in the code needs to change.

### 1. Generate the motion

This step needs an image-to-video model - Runway Gen-4, Kling, Google Veo,
Hailuo/MiniMax, or Sora. Upload `profile-hero.jpg` (already cropped to the exact
4:5 framing the card uses) as the first frame and ask for 5–8 seconds:

> Animate this portrait as a subtle, photorealistic looping video. Keep the
> exact same person, face, hairstyle, beard, skin tone, navy suit, white shirt,
> patterned tie and wristwatch, and keep the existing pose and framing. Natural
> slow breathing with small chest and shoulder movement. Subtle head motion.
> Natural eye blinks. The right hand, which is holding the suit jacket lapel,
> slowly adjusts the jacket once during the clip, then returns. A small natural
> movement of the opposite shoulder. Calm, confident, professional expression -
> no talking, no smiling changes, no gestures, no walking. Locked-off camera,
> as in a professional portrait video. Very subtle light movement on the
> background foliage. Photorealistic, no morphing, no identity drift.

Generate a few takes and pick the one where the face and hands stay stable -
identity drift in the hands is the usual failure.

### 2. Close the loop

Most models don't return a seamless loop. This cross-dissolves the last 0.5s
into the first, turning an 8s take into a 7.5s clean loop:

```bash
ffmpeg -y -i raw.mp4 -filter_complex "\
[0:v]trim=0:7.5,setpts=PTS-STARTPTS[body];\
[0:v]trim=7.5:8,setpts=PTS-STARTPTS[tail];\
[body]split[b1][b2];\
[b1]trim=0:0.5,setpts=PTS-STARTPTS[head];\
[b2]trim=0.5:7.5,setpts=PTS-STARTPTS[mid];\
[tail][head]blend=all_expr='A*(1-(T/0.5))+B*(T/0.5)'[cross];\
[mid][cross]concat=n=2:v=1[v]" -map "[v]" -an loop.mp4
```

### 3. Encode for the web

Note the **1080×1350** target: it's the same 4:5 as the card, and both
dimensions are even, which H.264's `yuv420p` requires.

```bash
# MP4 (H.264) - the fallback every browser plays
ffmpeg -y -i loop.mp4 \
  -vf "scale=1080:1350:force_original_aspect_ratio=increase,crop=1080:1350,format=yuv420p" \
  -c:v libx264 -crf 23 -preset slow -an -movflags +faststart \
  public/profile-hero.mp4

# WebM (VP9) - smaller, tried first
ffmpeg -y -i public/profile-hero.mp4 \
  -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 -an \
  public/profile-hero.webm
```

Aim for under ~3 MB each; raise `-crf` if they come out heavier. There is no
audio track by design - the card is muted and autoplaying, which is what lets
it play without a user gesture.

### If your clip isn't 4:5

Set `video.fit: "contain"` in `content/hero.ts` so nothing gets cropped, or
re-crop the clip. `"cover"` is the default and crops nothing while the clip
matches the card.

## Project preview images

`public/projects/*.jpg` - one architecture diagram per project, referenced by
`image` in `content/projects.ts` and rendered in three places: the featured
card thumbnail, the compact "More projects" thumbnail, and the framed Preview
on the case-study page. The filename matches the project `slug`.

They are 1600px-wide JPEGs (~200–250 KB each), downscaled from the 2816px
originals. To add or replace one, drop the source anywhere and run:

```bash
sips -s format jpeg -s formatOptions 80 -Z 1600 <source>.jpeg \
  --out public/projects/<slug>.jpg
```

then set `image: "/projects/<slug>.jpg"` and a descriptive `imageAlt` on that
project. A project without an `image` falls back to the placeholder frame, so
the layout is never half-built.

## Still placeholders - replace before launch

- `og.png` - a 1200×630 social-share image. Referenced in `app/layout.tsx` metadata.

Until this exists, link previews will have no image.
