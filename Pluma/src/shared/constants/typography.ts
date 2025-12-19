/**
 * Typography scale based on DESIGN_INSTRUCTIONS.md
 * Font Family: SF Pro Display (iOS Native) or similar sans-serif
 */

import { Platform, TextStyle } from 'react-native';

/**
 * Platform-specific font families
 */
export const fontFamily = Platform.select({
  ios: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },
  android: {
    regular: 'Roboto',
    medium: 'Roboto-Medium',
    semibold: 'Roboto-Medium',
    bold: 'Roboto-Bold',
  },
  default: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },
});

/**
 * Font sizes from design spec
 */
export const fontSize = {
  /** Caption: 14-15px */
  caption: 14,
  captionLarge: 15,
  /** Body Text: 16-17px */
  body: 16,
  bodyLarge: 17,
  /** Button Text: 16-18px */
  button: 17,
  buttonLarge: 18,
  /** H3 (Card Title): 24-26px */
  h3: 24,
  h3Large: 26,
  /** H2 (Section Title): 22-24px */
  h2: 22,
  h2Large: 24,
  /** H1 (Page Header): 32-34px */
  h1: 32,
  h1Large: 34,
} as const;

/**
 * Font weights
 */
export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

/**
 * Line heights
 */
export const lineHeight = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.5,
  loose: 1.75,
} as const;

/**
 * Typography presets matching DESIGN_INSTRUCTIONS.md hierarchy
 */
export const typography = {
  /** H1 (Page Header): 32-34px, Bold, Black */
  h1: {
    fontSize: fontSize.h1,
    fontWeight: fontWeight.bold,
    lineHeight: fontSize.h1 * lineHeight.tight,
  } as TextStyle,

  /** H2 (Section Title): 22-24px, Bold, Black */
  h2: {
    fontSize: fontSize.h2,
    fontWeight: fontWeight.bold,
    lineHeight: fontSize.h2 * lineHeight.tight,
  } as TextStyle,

  /** H3 (Card Title): 24-26px, Semibold */
  h3: {
    fontSize: fontSize.h3,
    fontWeight: fontWeight.semibold,
    lineHeight: fontSize.h3 * lineHeight.tight,
  } as TextStyle,

  /** Body Text: 16-17px, Regular */
  body: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.body * lineHeight.relaxed,
  } as TextStyle,

  /** Caption: 14-15px, Regular, Gray */
  caption: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.caption * lineHeight.normal,
  } as TextStyle,

  /** Button Text: 16-18px, Semibold */
  button: {
    fontSize: fontSize.button,
    fontWeight: fontWeight.semibold,
    lineHeight: fontSize.button * lineHeight.tight,
  } as TextStyle,

  /** Greeting: "Hello, [Name]" - 32px, Bold */
  greeting: {
    fontSize: fontSize.h1,
    fontWeight: fontWeight.bold,
    lineHeight: fontSize.h1 * lineHeight.tight,
  } as TextStyle,

  /** Welcome subtitle: 16px, Regular, Gray */
  welcomeSubtitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.body * lineHeight.normal,
  } as TextStyle,
} as const;

// Type exports
export type FontFamily = typeof fontFamily;
export type FontSize = typeof fontSize;
export type FontWeight = typeof fontWeight;
export type LineHeight = typeof lineHeight;
export type Typography = typeof typography;
