/**
 * Color palette based on DESIGN_INSTRUCTIONS.md
 */

/**
 * Primary Colors
 */
export const colors = {
  // Primary Colors
  background: '#FFFFFF',
  primaryText: '#000000',
  secondaryText: '#666666',
  accentDark: '#1A1A1A',

  // Interactive Elements
  selectedPill: '#1A1A1A',
  unselectedPill: '#F5F5F5',
  iconButton: '#1A1A1A',

  // Status Elements
  starRating: '#FFD700',
  favoriteHeart: '#FFFFFF',

  // Semantic aliases
  white: '#FFFFFF',
  black: '#000000',
  gray: '#666666',
  lightGray: '#F5F5F5',
  nearBlack: '#1A1A1A',
} as const;

/**
 * Light theme colors
 */
export const lightTheme = {
  text: colors.primaryText,
  background: colors.background,
  tint: colors.accentDark,
  icon: colors.gray,
  tabIconDefault: colors.gray,
  tabIconSelected: colors.accentDark,
  card: colors.white,
  border: colors.lightGray,
} as const;

/**
 * Dark theme colors
 */
export const darkTheme = {
  text: '#ECEDEE',
  background: '#151718',
  tint: colors.white,
  icon: '#9BA1A6',
  tabIconDefault: '#9BA1A6',
  tabIconSelected: colors.white,
  card: '#1C1C1E',
  border: '#38383A',
} as const;

/**
 * Combined theme object
 */
export const theme = {
  colors,
  light: lightTheme,
  dark: darkTheme,
} as const;

// Type exports
export type Colors = typeof colors;
export type LightTheme = typeof lightTheme;
export type DarkTheme = typeof darkTheme;
export type Theme = typeof theme;
export type ColorScheme = 'light' | 'dark';
