/**
 * Theme Provider
 *
 * Provides theme context to the app based on system color scheme.
 * Currently supports light and dark modes with themed colors.
 */

import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { colors, theme, ColorScheme } from '../../shared/constants/theme';

/**
 * Theme context value type
 */
interface ThemeContextType {
  /** Current color scheme */
  colorScheme: ColorScheme;
  /** Theme-specific colors */
  themeColors: typeof theme.light;
  /** Base color palette (always available) */
  colors: typeof colors;
  /** Whether dark mode is active */
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Theme Provider component
 *
 * Wraps the app and provides theme context based on system preferences.
 * Access theme values using the useThemeContext hook.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const colorScheme: ColorScheme = systemColorScheme ?? 'light';

  const value = useMemo<ThemeContextType>(
    () => ({
      colorScheme,
      themeColors: theme[colorScheme],
      colors,
      isDark: colorScheme === 'dark',
    }),
    [colorScheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 *
 * @returns Theme context with color scheme, colors, and dark mode flag
 * @throws Error if used outside of ThemeProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { colors, isDark, themeColors } = useThemeContext();
 *   return (
 *     <View style={{ backgroundColor: themeColors.background }}>
 *       <Text style={{ color: colors.primaryText }}>Hello</Text>
 *     </View>
 *   );
 * }
 * ```
 */
export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Hook to get a specific theme color
 *
 * @param colorName - Name of the theme color
 * @returns The color value for the current theme
 */
export function useThemeColor(
  colorName: keyof typeof theme.light
): string {
  const { themeColors } = useThemeContext();
  return themeColors[colorName];
}
