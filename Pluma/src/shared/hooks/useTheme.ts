/**
 * Hook for accessing theme values
 */

import { useColorScheme } from 'react-native';
import { theme, ColorScheme } from '../constants/theme';

export function useTheme() {
  const colorScheme = useColorScheme() as ColorScheme | null;
  const currentScheme = colorScheme ?? 'light';

  return {
    colors: theme[currentScheme],
    colorScheme: currentScheme,
    isDark: currentScheme === 'dark',
  };
}
