/**
 * Hook for safe area insets
 */

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { screenMargins } from '../constants/spacing';

export function useSafeArea() {
  const insets = useSafeAreaInsets();

  return {
    insets,
    paddingTop: insets.top + screenMargins.top,
    paddingBottom: insets.bottom + screenMargins.bottom,
    paddingHorizontal: screenMargins.horizontal,
  };
}
