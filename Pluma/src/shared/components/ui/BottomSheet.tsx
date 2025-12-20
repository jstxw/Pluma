/**
 * BottomSheet - Slide-up panel component
 *
 * Features:
 * - Slides up from bottom of screen
 * - Drag to dismiss
 * - Backdrop tap to dismiss
 * - Follows design system styling
 */

import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { colors } from '../../constants/theme';
import { spacing, borderRadius } from '../../constants/spacing';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_SHEET_HEIGHT = SCREEN_HEIGHT * 0.7;
const DRAG_THRESHOLD = 100;

interface BottomSheetProps {
  /** Whether the sheet is visible */
  visible: boolean;
  /** Called when sheet should be dismissed */
  onDismiss: () => void;
  /** Content to render inside the sheet */
  children: React.ReactNode;
  /** Optional custom height (default: 70% of screen) */
  height?: number;
}

export function BottomSheet({
  visible,
  onDismiss,
  children,
  height = MAX_SHEET_HEIGHT,
}: BottomSheetProps) {
  const translateY = useSharedValue(height);
  const backdropOpacity = useSharedValue(0);

  // Animate in/out when visibility changes
  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, { damping: 20, stiffness: 300 });
      backdropOpacity.value = withTiming(1, { duration: 200 });
    } else {
      translateY.value = withTiming(height, {
        duration: 250,
        easing: Easing.in(Easing.ease),
      });
      backdropOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible, height, translateY, backdropOpacity]);

  // Handle drag gesture
  const onPanGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const { translationY, state } = event.nativeEvent;

    if (state === State.ACTIVE) {
      // Only allow dragging down
      if (translationY > 0) {
        translateY.value = translationY;
      }
    } else if (state === State.END) {
      if (translationY > DRAG_THRESHOLD) {
        // Dismiss if dragged past threshold
        translateY.value = withTiming(height, {
          duration: 200,
          easing: Easing.in(Easing.ease),
        });
        backdropOpacity.value = withTiming(0, { duration: 200 });
        runOnJS(onDismiss)();
      } else {
        // Snap back
        translateY.value = withSpring(0, { damping: 20, stiffness: 300 });
      }
    }
  };

  // Animated styles
  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  if (!visible && translateY.value >= height) {
    return null;
  }

  return (
    <View style={styles.overlay} pointerEvents={visible ? 'auto' : 'none'}>
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
        <Pressable style={styles.backdropPressable} onPress={onDismiss} />
      </Animated.View>

      {/* Sheet */}
      <PanGestureHandler onGestureEvent={onPanGestureEvent}>
        <Animated.View style={[styles.sheet, { height }, sheetAnimatedStyle]}>
          {/* Handle */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* Content */}
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  backdropPressable: {
    flex: 1,
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.card,
    borderTopRightRadius: borderRadius.card,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 16,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.lightGray,
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['3xl'],
  },
});
