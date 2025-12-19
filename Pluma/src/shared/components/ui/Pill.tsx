/**
 * Pill/Tag component - minimal and subtle
 *
 * Default State:
 * - Background: #F5F5F5
 * - Text: #000000
 * - Border Radius: 12px
 * - Padding: 4px 8px
 * - Font: 12px, Medium, Capitalized
 *
 * Selected State:
 * - Background: #1A1A1A
 * - Text: #FFFFFF
 *
 * Behavioral:
 * - Selected animation: 150ms
 * - Press scale: 0.96
 */

import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  Easing,
} from 'react-native-reanimated';
import { colors } from '../../constants/theme';
import { spacing, borderRadius } from '../../constants/spacing';
import { fontSize, fontWeight } from '../../constants/typography';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * Pill props interface
 */
export interface PillProps {
  /** Label text to display */
  label: string;
  /** Whether the pill is currently selected */
  selected?: boolean;
  /** Press handler */
  onPress?: () => void;
  /** Whether the pill is disabled */
  disabled?: boolean;
  /** Additional container styles */
  style?: ViewStyle;
}

/**
 * Category Pill component with selected/default states
 */
export function Pill({
  label,
  selected = false,
  onPress,
  disabled = false,
  style,
}: PillProps) {
  const scale = useSharedValue(1);
  const progress = useSharedValue(selected ? 1 : 0);

  // Update animation when selected state changes
  React.useEffect(() => {
    progress.value = withTiming(selected ? 1 : 0, {
      duration: 150,
      easing: Easing.out(Easing.ease),
    });
  }, [selected, progress]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.unselectedPill, colors.selectedPill]
    ),
    transform: [{ scale: scale.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      [colors.primaryText, colors.white]
    ),
  }));

  const handlePressIn = () => {
    if (!disabled) {
      scale.value = withTiming(0.96, {
        duration: 100,
        easing: Easing.out(Easing.ease),
      });
    }
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, {
      duration: 150,
      easing: Easing.out(Easing.ease),
    });
  };

  return (
    <AnimatedPressable
      style={[styles.container, animatedContainerStyle, style]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Animated.Text style={[styles.label, animatedTextStyle]}>
        {label}
      </Animated.Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  // Minimal pill: small padding, rounded corners
  container: {
    borderRadius: borderRadius.sm, // 12px
    paddingVertical: spacing.xs, // 4px
    paddingHorizontal: spacing.sm, // 8px
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Small, subtle text
  label: {
    fontSize: fontSize.caption, // 12px
    fontWeight: fontWeight.medium,
    textTransform: 'capitalize',
  },
});
