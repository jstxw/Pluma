Here’s a clean prompt you can paste into Claude. It tells it exactly what to build (minimal, non-distracting, “seamless”), and forces it to follow your design_instructions.md.

Claude prompt (copy/paste):

Implement a minimalist, seamless scroll indicator on the right-hand side of the app that reacts to user scrolling. Follow design_instructions.md exactly for spacing, colors, motion, and overall vibe.

Goal

Add a subtle vertical scroll bar/indicator that:

Appears only when the user scrolls (or is actively scrolling)

Is not distracting (low contrast, thin, minimal)

Smoothly reflects scroll progress and thumb position

Works on desktop + mobile (touch scrolling)

Does not shift layout or overlay important UI

Behavior spec

Default state: hidden (or near-invisible)

On scroll start / while scrolling: fade in quickly (e.g., 120–200ms)

While scrolling: thumb moves smoothly, progress is accurate

After scroll stops: fade out after a short delay (e.g., 600–1200ms)

Hover (desktop only): slightly more visible, but still minimal

Respect reduced motion: if prefers-reduced-motion, disable animated easing and use simple show/hide

Visual spec (minimal)

Position: fixed to right edge, vertically centered track

Track: very subtle (light opacity)

Thumb: slightly stronger than track but still soft

Rounded corners, small width (2–4px)

Padding from edge so it doesn’t look cramped (per design.md)

Use theme tokens from design.md (do NOT hardcode random colors)

Technical requirements

Create as a reusable component (e.g., ScrollIndicator.tsx)

Integrate globally (layout/root) so it works across pages

Calculate scroll progress using:

scrollTop, scrollHeight, clientHeight

Use requestAnimationFrame or throttling to keep it smooth

Clean up all listeners on unmount

Deliverables

The component code

Where you mounted it (file + exact placement)

Any small additions to design.md tokens if needed (only if missing)

A short explanation of how it works and how to tweak fade timing

Start implementing now and keep it consistent with the existing UI.
