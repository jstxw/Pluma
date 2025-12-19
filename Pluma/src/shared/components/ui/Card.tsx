/**
 * Card component following DESIGN_INSTRUCTIONS.md specifications
 *
 * Base Card:
 * - Border Radius: 24px
 * - Tap scale: 0.98
 * - Shadow for depth
 *
 * Large Destination Card:
 * - Full card image with gradient overlay
 * - Gradient: transparent (top) to 60% black (bottom)
 * - Content area: bottom 120px
 * - Heart icon: top right, 40px from top, 32px from right
 *
 * Supports composition pattern with Card.Image, Card.Content, etc.
 */

import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/theme';
import { spacing, borderRadius, componentSpacing } from '../../constants/spacing';
import { fontSize, fontWeight } from '../../constants/typography';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * Card variant types
 */
export type CardVariant = 'default' | 'large' | 'horizontal';

/**
 * Base Card props interface
 */
export interface CardProps {
  /** Card variant */
  variant?: CardVariant;
  /** Card content */
  children: React.ReactNode;
  /** Press handler */
  onPress?: () => void;
  /** Whether the card is disabled */
  disabled?: boolean;
  /** Additional container styles */
  style?: ViewStyle;
}

/**
 * Card Image props
 */
export interface CardImageProps {
  /** Image source */
  source?: ImageSourcePropType;
  /** Whether to show gradient overlay */
  showGradient?: boolean;
  /** Custom aspect ratio (default: 16/10 for large cards) */
  aspectRatio?: number;
  /** Children to render over the image */
  children?: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

/**
 * Card Content props
 */
export interface CardContentProps {
  /** Content children */
  children: React.ReactNode;
  /** Whether content overlays the image (for large cards) */
  overlay?: boolean;
  /** Additional styles */
  style?: ViewStyle;
}

/**
 * Card Title props
 */
export interface CardTitleProps {
  /** Title text */
  children: React.ReactNode;
  /** Whether text should be white (for overlay) */
  light?: boolean;
  /** Additional styles */
  style?: TextStyle;
}

/**
 * Card Subtitle props
 */
export interface CardSubtitleProps {
  /** Subtitle text */
  children: React.ReactNode;
  /** Whether text should be light colored (for overlay) */
  light?: boolean;
  /** Additional styles */
  style?: TextStyle;
}

/**
 * Favorite Button props
 */
export interface CardFavoriteProps {
  /** Whether currently favorited */
  isFavorited?: boolean;
  /** Press handler */
  onPress?: () => void;
  /** Additional styles */
  style?: ViewStyle;
}

/**
 * Base Card component with press animation
 */
export function Card({
  variant = 'default',
  children,
  onPress,
  disabled = false,
  style,
}: CardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!disabled && onPress) {
      // Card tap scale: 0.98
      scale.value = withTiming(0.98, {
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

  const containerStyles = [
    styles.container,
    variant === 'large' && styles.large,
    variant === 'horizontal' && styles.horizontal,
    style,
  ];

  if (onPress) {
    return (
      <AnimatedPressable
        style={[containerStyles, animatedStyle]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
      >
        {children}
      </AnimatedPressable>
    );
  }

  return <View style={containerStyles}>{children}</View>;
}

/**
 * Card Image component with optional gradient overlay
 */
function CardImage({
  source,
  showGradient = false,
  aspectRatio = 16 / 10,
  children,
  style,
}: CardImageProps) {
  const imageStyles = [styles.image, { aspectRatio }, style];

  // If no source provided, show placeholder
  if (!source) {
    return (
      <View style={[imageStyles, styles.imagePlaceholder]}>
        {showGradient && (
          <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.6)']}
            style={styles.gradient}
          />
        )}
        {children}
      </View>
    );
  }

  return (
    <ImageBackground
      source={source}
      style={imageStyles}
      imageStyle={styles.imageInner}
    >
      {showGradient && (
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.6)']}
          style={styles.gradient}
        />
      )}
      {children}
    </ImageBackground>
  );
}

/**
 * Card Content component
 */
function CardContent({ children, overlay = false, style }: CardContentProps) {
  return (
    <View style={[styles.content, overlay && styles.contentOverlay, style]}>
      {children}
    </View>
  );
}

/**
 * Card Title component
 */
function CardTitle({ children, light = false, style }: CardTitleProps) {
  return (
    <Text style={[styles.title, light && styles.titleLight, style]}>
      {children}
    </Text>
  );
}

/**
 * Card Subtitle component
 */
function CardSubtitle({ children, light = false, style }: CardSubtitleProps) {
  return (
    <Text style={[styles.subtitle, light && styles.subtitleLight, style]}>
      {children}
    </Text>
  );
}

/**
 * Card Favorite button component
 * Position: top right, 40px from top, 32px from right
 *
 * Animation per DESIGN_INSTRUCTIONS.md:
 * - Tap: Scale pulse (1.0 → 1.2 → 1.0), 400ms
 * - Fill: Animate from outline to solid with color transition
 */
function CardFavorite({ isFavorited = false, onPress, style }: CardFavoriteProps) {
  const scale = useSharedValue(1);
  const fillProgress = useSharedValue(isFavorited ? 1 : 0);

  // Animate fill state changes
  React.useEffect(() => {
    fillProgress.value = withTiming(isFavorited ? 1 : 0, {
      duration: 200,
      easing: Easing.out(Easing.ease),
    });
  }, [isFavorited, fillProgress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedHeartStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      fillProgress.value,
      [0, 1],
      ['transparent', colors.white]
    ),
  }));

  const handlePress = () => {
    // Pulse animation on tap: 1.0 → 1.2 → 1.0, 400ms total
    scale.value = withTiming(1.2, { duration: 200, easing: Easing.out(Easing.ease) }, () => {
      scale.value = withTiming(1, { duration: 200, easing: Easing.out(Easing.ease) });
    });
    onPress?.();
  };

  return (
    <Pressable onPress={handlePress} style={[styles.favorite, style]}>
      <Animated.View style={[styles.favoriteInner, animatedStyle]}>
        <Animated.View style={[styles.heart, animatedHeartStyle]} />
      </Animated.View>
    </Pressable>
  );
}

// Attach compound components
Card.Image = CardImage;
Card.Content = CardContent;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Favorite = CardFavorite;

const styles = StyleSheet.create({
  // Base card: Border Radius 24px, shadow for depth
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.card, // 24px
    overflow: 'hidden',
    // Shadow for depth
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  // Large card variant
  large: {
    minHeight: 400,
  },

  // Horizontal scroll card: 320px width
  horizontal: {
    width: 320,
    borderRadius: 20,
  },

  // Image area
  image: {
    width: '100%',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },

  imageInner: {
    borderRadius: borderRadius.card,
  },

  imagePlaceholder: {
    backgroundColor: colors.lightGray,
  },

  // Gradient overlay: transparent to 60% black
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },

  // Content area
  content: {
    padding: componentSpacing.withinCards, // 16px
  },

  // Content overlay for large cards (bottom 120px)
  contentOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 120,
    paddingHorizontal: spacing.lg, // 20px
    paddingBottom: spacing.lg, // 20px
    paddingTop: spacing.base, // 16px
  },

  // Title: matches H3 (24-26px, Semibold)
  title: {
    fontSize: fontSize.h3, // 24px
    fontWeight: fontWeight.semibold,
    color: colors.primaryText,
  },

  titleLight: {
    color: colors.white,
  },

  // Subtitle: Caption style
  subtitle: {
    fontSize: fontSize.body, // 16px
    fontWeight: fontWeight.regular,
    color: colors.secondaryText,
    marginTop: spacing.xs, // 4px
  },

  subtitleLight: {
    color: 'rgba(255, 255, 255, 0.8)',
  },

  // Favorite button: top right, 40px from top, 32px from right
  favorite: {
    position: 'absolute',
    top: 40,
    right: 32,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  favoriteInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Heart icon: white outline, animated fill when active
  heart: {
    width: 20,
    height: 18,
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 4,
    transform: [{ rotate: '-45deg' }],
  },
});
