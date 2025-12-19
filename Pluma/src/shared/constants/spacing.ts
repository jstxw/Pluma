/**
 * Spacing system based on DESIGN_INSTRUCTIONS.md
 * Uses a 4px grid system
 */

/**
 * Base spacing scale (4px increments)
 */
export const spacing = {
  /** 4px */
  xs: 4,
  /** 8px */
  sm: 8,
  /** 12px */
  md: 12,
  /** 16px */
  base: 16,
  /** 20px */
  lg: 20,
  /** 24px */
  xl: 24,
  /** 32px */
  '2xl': 32,
  /** 40px */
  '3xl': 40,
} as const;

/**
 * Screen margins
 * - Left/Right: 20px
 * - Top: Safe area + 16px
 * - Bottom: Safe area + 24px
 */
export const screenMargins = {
  horizontal: 20,
  top: 16,
  bottom: 24,
} as const;

/**
 * Component spacing
 */
export const componentSpacing = {
  /** Between major sections: 32-40px */
  betweenSections: 32,
  betweenSectionsLarge: 40,
  /** Between cards: 16-20px */
  betweenCards: 16,
  betweenCardsLarge: 20,
  /** Within cards: 16px padding */
  withinCards: 16,
  /** Search bar margin: 20px horizontal, 16px vertical */
  searchBarHorizontal: 20,
  searchBarVertical: 16,
} as const;

/**
 * Card dimensions
 */
export const cardDimensions = {
  /** Large destination card: Full width - 40px, ~400px height */
  largeCardHeight: 400,
  largeCardMargin: 40,
  /** Tour card: Full width - 40px, ~200px height */
  tourCardHeight: 200,
  tourCardMargin: 40,
  /** Tour card in horizontal scroll: 320px width */
  horizontalScrollCardWidth: 320,
} as const;

/**
 * Border radius values
 * - 24px for cards (soft, approachable feel)
 * - 20-28px for buttons
 * - 32px for bottom navigation top corners
 */
export const borderRadius = {
  /** Small elements */
  sm: 12,
  /** Medium elements */
  md: 16,
  /** Buttons (20-28px range) */
  button: 24,
  buttonSmall: 20,
  buttonLarge: 28,
  /** Cards */
  card: 24,
  /** Bottom navigation */
  bottomNav: 32,
  /** Full round (for pills, icons) */
  full: 9999,
} as const;

// Type exports
export type Spacing = typeof spacing;
export type ScreenMargins = typeof screenMargins;
export type ComponentSpacing = typeof componentSpacing;
export type CardDimensions = typeof cardDimensions;
export type BorderRadius = typeof borderRadius;
