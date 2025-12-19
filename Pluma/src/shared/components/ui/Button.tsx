/**
 * Button component following DESIGN_INSTRUCTIONS.md specifications
 *
 * Primary CTA:
 * - Background: #1A1A1A
 * - Text: White, 18px, Semibold
 * - Border Radius: 28px
 * - Height: 56px
 * - Press scale: 0.95
 * - Disabled: 40% opacity
 *
 * Secondary Button:
 * - Background: rgba(0,0,0,0.5)
 * - Text: White, 16px, Medium
 * - Border Radius: 24px
 * - Padding: 12px 20px
 * - Press scale: 0.96
 */

import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors } from '../../constants/theme';
import { spacing, borderRadius } from '../../constants/spacing';
import { fontSize, fontWeight } from '../../constants/typography';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * Button variants
 */
export type ButtonVariant = 'primary' | 'secondary';

/**
 * Button props interface
 */
export interface ButtonProps {
  /** Button variant - primary (dark) or secondary (semi-transparent) */
  variant: ButtonVariant;
  /** Button label text */
  children: React.ReactNode;
  /** Press handler */
  onPress: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in loading state */
  loading?: boolean;
  /** Optional right icon (for secondary buttons with arrows) */
  rightIcon?: React.ReactNode;
  /** Whether button should take full width */
  fullWidth?: boolean;
  /** Additional container styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

/**
 * Button component with Primary and Secondary variants
 */
export function Button({
  variant,
  children,
  onPress,
  disabled = false,
  loading = false,
  rightIcon,
  fullWidth = false,
  style,
  textStyle,
}: ButtonProps) {
  const scale = useSharedValue(1);

  const isDisabled = disabled || loading;

  // Animation config based on variant
  const pressScale = variant === 'primary' ? 0.95 : 0.96;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!isDisabled) {
      scale.value = withTiming(pressScale, {
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

  const buttonStyles = [
    styles.base,
    variant === 'primary' ? styles.primary : styles.secondary,
    fullWidth && styles.fullWidth,
    isDisabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    variant === 'primary' ? styles.primaryText : styles.secondaryText,
    textStyle,
  ];

  return (
    <AnimatedPressable
      style={[buttonStyles, animatedStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} size="small" />
      ) : (
        <View style={styles.content}>
          <Text style={textStyles}>{children}</Text>
          {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
        </View>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  // Primary CTA: Height 56px, Border Radius 28px
  primary: {
    backgroundColor: colors.accentDark,
    height: 56,
    borderRadius: borderRadius.buttonLarge, // 28px
    paddingHorizontal: spacing.xl, // 24px
  },

  // Secondary: Border Radius 24px, Padding 12px 20px
  secondary: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: borderRadius.button, // 24px
    paddingVertical: spacing.md, // 12px
    paddingHorizontal: spacing.lg, // 20px
  },

  fullWidth: {
    width: '100%',
  },

  // Disabled: 40% opacity
  disabled: {
    opacity: 0.4,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: colors.white,
  },

  // Primary text: 18px, Semibold
  primaryText: {
    fontSize: fontSize.buttonLarge, // 18px
    fontWeight: fontWeight.semibold,
  },

  // Secondary text: 16px, Medium
  secondaryText: {
    fontSize: fontSize.body, // 16px
    fontWeight: fontWeight.medium,
  },

  iconContainer: {
    marginLeft: spacing.sm, // 8px
  },
});
