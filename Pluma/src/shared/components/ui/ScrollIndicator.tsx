/**
 * ScrollIndicator - Minimalist scroll indicator component
 *
 * A subtle vertical scroll bar that:
 * - Appears only when scrolling (fades in quickly: 150ms)
 * - Fades out after scroll stops (800ms delay)
 * - Shows accurate scroll progress
 * - Uses theme tokens for styling
 *
 * Usage:
 *   <ScrollIndicatorContainer>
 *     <FlatList onScroll={...} />
 *   </ScrollIndicatorContainer>
 *
 * Or use the hook directly:
 *   const { scrollHandler, scrollIndicatorProps } = useScrollIndicator();
 *   <View>
 *     <FlatList onScroll={scrollHandler} />
 *     <ScrollIndicator {...scrollIndicatorProps} />
 *   </View>
 */

import React, { useCallback, useRef } from 'react';
import { StyleSheet, View, LayoutChangeEvent } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  runOnJS,
  SharedValue,
} from 'react-native-reanimated';
import { colors } from '../../constants/theme';
import { spacing } from '../../constants/spacing';

// Animation timing constants (easily adjustable)
const FADE_IN_DURATION = 150; // ms - quick fade in on scroll start
const FADE_OUT_DELAY = 1500; // ms - delay before fading out
const FADE_OUT_DURATION = 300; // ms - fade out duration

// Visual constants
const INDICATOR_WIDTH = 4; // px - thin and minimal
const INDICATOR_MIN_HEIGHT = 40; // px - minimum thumb height
const INDICATOR_PADDING = 0; // px - flush with screen edge (no space)
const TRACK_OPACITY = 0.15; // very subtle track
const THUMB_OPACITY = 0.5; // slightly stronger thumb

interface ScrollIndicatorProps {
  /** Current scroll position (0-1) */
  scrollProgress: SharedValue<number>;
  /** Whether scrolling is active */
  isScrolling: SharedValue<boolean>;
  /** Height of the visible container */
  containerHeight: number;
  /** Total scrollable content height */
  contentHeight: number;
  /** Whether to show the indicator (hide if content fits) */
  visible?: boolean;
}

/**
 * ScrollIndicator component
 * Renders the track and thumb for scroll indication
 */
export function ScrollIndicator({
  scrollProgress,
  isScrolling,
  containerHeight,
  contentHeight,
  visible = true,
}: ScrollIndicatorProps) {
  // Calculate thumb height based on visible ratio
  const visibleRatio = containerHeight / contentHeight;
  const thumbHeight = Math.max(
    INDICATOR_MIN_HEIGHT,
    containerHeight * visibleRatio
  );

  // Track height (accounting for minimal vertical padding)
  const verticalPadding = spacing.sm; // 8px from top/bottom
  const trackHeight = containerHeight - verticalPadding * 2;
  const maxThumbOffset = trackHeight - thumbHeight;

  // Animated opacity - fade in/out based on scroll activity
  const animatedOpacity = useAnimatedStyle(() => {
    return {
      opacity: isScrolling.value
        ? withTiming(1, {
            duration: FADE_IN_DURATION,
            easing: Easing.out(Easing.ease),
          })
        : withDelay(
            FADE_OUT_DELAY,
            withTiming(0, {
              duration: FADE_OUT_DURATION,
              easing: Easing.in(Easing.ease),
            })
          ),
    };
  });

  // Animated thumb position
  const animatedThumbStyle = useAnimatedStyle(() => {
    const offset = scrollProgress.value * maxThumbOffset;
    return {
      transform: [{ translateY: offset }],
    };
  });

  // Don't render if content fits in container
  if (!visible || contentHeight <= containerHeight) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { height: trackHeight },
        animatedOpacity,
      ]}
      pointerEvents="none"
    >
      {/* Track */}
      <View style={styles.track} />

      {/* Thumb */}
      <Animated.View
        style={[
          styles.thumb,
          { height: thumbHeight },
          animatedThumbStyle,
        ]}
      />
    </Animated.View>
  );
}

/**
 * Hook for managing scroll indicator state
 * Returns scroll handler and props for ScrollIndicator
 */
export function useScrollIndicator() {
  const scrollProgress = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const containerHeight = useSharedValue(0);
  const contentHeight = useSharedValue(0);

  // Track scroll timeout for fade-out
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearScrollTimeout = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
  }, []);

  const setScrollInactive = useCallback(() => {
    isScrolling.value = false;
  }, [isScrolling]);

  // Handle scroll events
  const handleScroll = useCallback(
    (event: { nativeEvent: { contentOffset: { y: number }; contentSize: { height: number }; layoutMeasurement: { height: number } } }) => {
      'worklet';
      const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

      // Update dimensions
      containerHeight.value = layoutMeasurement.height;
      contentHeight.value = contentSize.height;

      // Calculate scroll progress (0-1)
      const maxScroll = contentSize.height - layoutMeasurement.height;
      if (maxScroll > 0) {
        scrollProgress.value = Math.min(1, Math.max(0, contentOffset.y / maxScroll));
      }

      // Set scrolling active
      isScrolling.value = true;

      // Clear previous timeout and set new one for fade-out
      runOnJS(clearScrollTimeout)();
      runOnJS(setTimeout)(() => {
        runOnJS(setScrollInactive)();
      }, 100);
    },
    [scrollProgress, isScrolling, containerHeight, contentHeight, clearScrollTimeout, setScrollInactive]
  );

  return {
    scrollProgress,
    isScrolling,
    containerHeight: containerHeight.value,
    contentHeight: contentHeight.value,
    handleScroll,
  };
}

interface ScrollIndicatorContainerProps {
  children: React.ReactNode;
  /** Container height - required for proper indicator sizing */
  height?: number;
}

/**
 * Container component that wraps scrollable content and adds indicator
 * Use this for simple integration with ScrollView or FlatList
 */
export function ScrollIndicatorContainer({
  children,
  height,
}: ScrollIndicatorContainerProps) {
  const scrollProgress = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const [dimensions, setDimensions] = React.useState({
    containerHeight: 0,
    contentHeight: 0,
  });

  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    // Extract value immediately to avoid synthetic event pooling issues
    const height = event.nativeEvent.layout.height;
    setDimensions((prev) => ({
      ...prev,
      containerHeight: height,
    }));
  }, []);

  const handleContentSizeChange = useCallback(
    (_width: number, contentHeight: number) => {
      setDimensions((prev) => ({
        ...prev,
        contentHeight,
      }));
    },
    []
  );

  const handleScroll = useCallback(
    (event: { nativeEvent: { contentOffset: { y: number }; contentSize: { height: number }; layoutMeasurement: { height: number } } }) => {
      // Extract values immediately to avoid synthetic event pooling issues
      const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
      const offsetY = contentOffset.y;
      const contentSizeHeight = contentSize.height;
      const layoutHeight = layoutMeasurement.height;

      // Calculate scroll progress (0-1)
      const maxScroll = contentSizeHeight - layoutHeight;
      if (maxScroll > 0) {
        scrollProgress.value = Math.min(1, Math.max(0, offsetY / maxScroll));
      }

      // Set scrolling active
      isScrolling.value = true;

      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set timeout for fade-out
      scrollTimeoutRef.current = setTimeout(() => {
        isScrolling.value = false;
      }, 100);
    },
    [scrollProgress, isScrolling]
  );

  // Clone children and inject scroll handlers
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<{
        onScroll?: typeof handleScroll;
        onContentSizeChange?: typeof handleContentSizeChange;
        scrollEventThrottle?: number;
      }>, {
        onScroll: handleScroll,
        onContentSizeChange: handleContentSizeChange,
        scrollEventThrottle: 16,
      });
    }
    return child;
  });

  return (
    <View style={[styles.wrapper, height ? { height } : { flex: 1 }]} onLayout={handleLayout}>
      {enhancedChildren}
      <ScrollIndicator
        scrollProgress={scrollProgress}
        isScrolling={isScrolling}
        containerHeight={dimensions.containerHeight}
        contentHeight={dimensions.contentHeight}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  container: {
    position: 'absolute',
    right: 0,
    top: spacing.sm, // Minimal top padding (8px)
    width: INDICATOR_WIDTH,
    justifyContent: 'flex-start',
  },
  track: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.accentDark,
    opacity: TRACK_OPACITY,
    borderRadius: INDICATOR_WIDTH / 2,
  },
  thumb: {
    width: INDICATOR_WIDTH,
    backgroundColor: colors.accentDark,
    opacity: THUMB_OPACITY,
    borderRadius: INDICATOR_WIDTH / 2,
  },
});
