# Q&A (FAQ) Accordion — Design Spec (Pill Cards)

## Goal

Create a Question & Answer section where each **question is a pill-shaped header**. When a user taps/clicks the header, the **answer expands/collapses** underneath it. The header has a **down chevron on the far right** that rotates when opened.

---

## Layout

- Vertical list of accordion items
- Each item = **Header (always visible)** + **Answer (collapsible)**
- Spacing:
  - Item gap: 12–16px
  - Section padding: 16–24px

---

## Header (Question Row)

**Shape**

- Rounded “pill” container (very high radius)
  - `border-radius: 9999px`

**Size**

- Height: 54–64px (comfortable tap target)
- Horizontal padding: 16–20px

**Content**

- Left: optional indicator (dot or check icon) OR nothing (keep space consistent)
- Middle: **Question text**
- Right-most: **Chevron down** icon (mandatory)
  - Chevron stays aligned to the far right (no drifting)

**Typography**

- Question text: medium/semi-bold
- Keep to 1 line if possible; allow 2 lines with truncation rules if needed

**States**

- Default (Collapsed):
  - Light background or subtle gray
  - Question text: normal contrast
  - Chevron: pointing down
- Active (Expanded):
  - Darker / emphasized background (or inverted scheme)
  - Question text: higher contrast
  - Chevron: rotated 180° (points up)
- Pressed:
  - Slight scale (0.98) or darker shade for 80–120ms

---

## Answer (Dropdown Content)

**Container**

- Appears directly under its header
- Width matches header
- Top margin: 8–10px
- Rounded corners: 16–20px (does NOT need to be full pill)
- Padding: 14–18px

**Typography**

- Answer text: regular weight
- Line height: 1.4–1.6
- Support optional bullet lists

**Behavior**

- Only expand the clicked item
- Optional: allow multiple open OR enforce single-open (pick one)
  - Recommended: single-open for cleaner UX

---

## Animation

- Expand/collapse:
  - Duration: 200–260ms
  - Easing: ease-out
  - Animate height + opacity (or maxHeight + opacity)
- Chevron rotation:
  - Duration: 150–200ms
  - Rotate 0° → 180° when expanded

---

## Accessibility

- Header must be a button element
- Tap target ≥ 44px height
- Keyboard:
  - Enter/Space toggles
  - Focus ring visible
- Screen readers:
  - `aria-expanded={true|false}`
  - `aria-controls="answer-id"`
  - Answer region: `role="region"` with matching id

---

## Data Model

Represent items as:

- `id` (string/number)
- `question` (string)
- `answer` (string or rich content)

Example:

- Q: “How do I choose drills?”
- A: “Use level + goal filters, then rotate focus weekly
