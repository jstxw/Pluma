# design.md — Minimal Black & White UI (Drill Tracker App)

## 1) Design North Star

A calm, minimalist interface with **only black and white**. The UI should feel “quiet” and intentional:

- No gradients
- No bright accent colors
- No shadows that look “glowy”
- Motion is subtle and purposeful
- Every screen should feel like it has breathing room

**Primary goal:** make progress feel satisfying without being distracting.

---

## 2) Color System (Hard Rule: Black + White Only)

Use ONLY these colors (including alpha versions of them):

- `#000000` (Black)
- `#FFFFFF` (White)

Allowed:

- Black with opacity for muted elements (e.g., `rgba(255,255,255,0.6)` for text on black)
- White with opacity for dividers / inactive ring segments

Not allowed:

- Any other hex values (no grays like #111, no blues, no “almost black”)
- Any colored icons or images

**Background default:** black  
**Text default:** white

---

## 3) Typography

Use the platform default font (system font). No custom fonts.

### Type Scale (approx)

- **Display / Center number:** 44–56pt, weight 600–700
- **Primary label:** 16–18pt, weight 500–600
- **Secondary label:** 12–14pt, weight 400–500, opacity-based mute

### Text colors

- Primary text: `#FFFFFF`
- Secondary text: `rgba(255,255,255,0.65)`
- Tertiary/meta: `rgba(255,255,255,0.45)`

---

## 4) Spacing + Layout

Keep consistent spacing. Use an 8pt grid.

- Screen padding: 20–24
- Section spacing: 16–24
- Card spacing: 12–16
- Tap targets: minimum 44x44

Rounded corners should be **simple and consistent**:

- Small radius: 10–12
- Medium radius: 16
  Avoid extremely round “pill” shapes unless it’s a button.

---

## 5) Core Component: Circular Drill Tracker (Replaces Timer)

### What it is

A circular progress tracker similar to a fitness ring, but **monochrome** and **minimal**.

In the middle:

- Large number = drills completed (e.g., `23`)
- Label below = `drills` (or `completed`)
- Sub-label below that = `of 30` (total drills for the session/day)

Example center:

- `23`
- `drills`
- `of 30`

### Ring behavior

- The ring represents progress toward a target total (e.g., 30 drills).
- Progress is shown as a **white arc** over a **faint base ring**.

**Base ring:** white at ~15% opacity  
**Progress arc:** white at 100% opacity

No colors. No gradients.

### Ring styling rules

- Size: 220–280px diameter (responsive)
- Stroke width: 10–14
- Linecap: round
- Base ring: continuous circle (or segmented if you want the “format” feel)
- Progress ring: smooth arc

### Segmented format option (allowed)

If you want the “format” from the reference image (multiple arcs):

- Use **4 segments** max (keeps it clean)
- All segments are still monochrome:
  - Completed segments: white
  - Inactive segments: white at low opacity
- Do NOT assign different meaning via color
- Segment gaps should be consistent and minimal (small black breaks)

### Micro-interactions

- On load: progress arc animates from 0 to current value in ~600–900ms (ease-out)
- When completed drills increments: arc animates to new value in ~250–400ms

Animation must be subtle. No bounce.

### Accessibility

- The center number must be readable at a glance.
- Provide an accessibility label like:
  - “23 drills completed out of 30”

---

## 6) Supporting UI Near the Ring (Minimal)

Avoid clutter. Keep only what’s useful.

Recommended layout:

- Ring centered
- Below ring: one primary action button
- Optional: a tiny row of stats (monochrome icons optional)

### Stats row (optional)

If included, it must be extremely minimal:

- 2–3 items max (e.g., streak, minutes, sessions)
- Icons must be line icons in white (no fill, no colors)
- Use opacity to de-emphasize

---

## 7) Buttons

### Primary button

- Background: `#FFFFFF`
- Text: `#000000`
- Radius: 14–16
- Height: 48–54

### Secondary button

- Background: transparent
- Border: `rgba(255,255,255,0.35)` 1px
- Text: `#FFFFFF`

### Press states

- Primary pressed: reduce opacity slightly (e.g., 0.85)
- Secondary pressed: border opacity increases slightly

No ripples that feel flashy.

---

## 8) Cards / Lists (Drill Cards)

If you have a drill list screen:

- Background stays black
- Cards are either:
  1. Border-only (cleanest), or
  2. Very subtle white overlay using opacity

**Preferred:** border-only

- Card background: transparent
- Border: `rgba(255,255,255,0.18)` 1px
- Card padding: 14–16
- Title: white
- Meta: white at 60% opacity

No heavy shadows.

---

## 9) Icons

Use a single icon style set (line icons). Rules:

- White only
- Use opacity for inactive/secondary icons
- Avoid filled icons unless they are extremely simple

---

## 10) Images

If you must show diagrams/images:

- Only allow images that can work on black/white backgrounds
- Prefer transparent PNG or monochrome SVG
- Never introduce color images into the UI

If an image is not monochrome, do not display it by default.

---

## 11) States

### Empty state

If drills completed = 0:

- Ring progress = 0 (only faint base ring visible)
- Center text: `0` / `drills` / `of 30`
- Encourage action with one button: “Start drills”

### Completed state

If drills completed == total:

- Progress ring is full
- Subtle text: “Completed”
- Optional tiny celebratory micro-motion: a gentle fade-in of the word “Completed” (no confetti)

### Loading state

- Ring base visible
- Center text shows `—`
- Use a subtle spinner if needed (white, small)

---

## 12) Implementation Notes (So Claude Builds It Correctly)

- Use a vector-based ring (SVG or Canvas) so it scales cleanly.
- Keep all styling tokens centralized (colors, opacity, spacing).
- Ensure the ring is perfectly centered and never clipped.
- Support dynamic totals (e.g., 10, 30, 50).
- The center number must not shift when it changes (use tabular numbers if available, or fixed width alignment).

---

## 13) “Do Not” List

- Do not add any color accents
- Do not add gradients
- Do not add heavy shadows / glow
- Do not clutter the ring with labels around the circle
- Do not use multiple fonts
- Do not use busy backgrounds or textures

---

## 14) Acceptance Checklist

A build is considered correct if:

- The UI uses only black/white (+ opacity)
- The circular drill tracker is the main focal point
- The center displays drills completed and total clearly
- The ring progress updates smoothly
- The screen remains visually calm and uncluttered
