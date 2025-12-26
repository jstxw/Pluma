/**
 * CircularDrillTracker - Minimal black & white circular progress tracker=
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const RING_SIZE = 250;
const STROKE_WIDTH = 12;
const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Colors (strict black & white only)
const COLORS = {
  background: '#000000',
  white: '#FFFFFF',
  baseRing: 'rgba(255, 255, 255, 0.15)',
  progressRing: '#FFFFFF', 
  secondaryText: 'rgba(255, 255, 255, 0.65)',
  tertiaryText: 'rgba(255, 255, 255, 0.45)',
};

interface CircularDrillTrackerProps {
  /** Number of drills completed */
  completed: number;
  /** Total drills target */
  total: number;
}

export function CircularDrillTracker({
  completed,
  total,
}: CircularDrillTrackerProps) {
  const progress = useSharedValue(0);
  const isComplete = completed >= total;

  // Calculate target progress (0 to 1)
  const targetProgress = total > 0 ? Math.min(completed / total, 1) : 0;

  // Animate progress on mount and when completed changes
  useEffect(() => {
    const duration = progress.value === 0 ? 800 : 350;

    progress.value = withTiming(targetProgress, {
      duration,
      easing: Easing.out(Easing.ease),
    });
  }, [targetProgress, progress]);

  // Animated props for progress ring
  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = CIRCUMFERENCE * (1 - progress.value);
    return {
      strokeDashoffset,
    };
  });

  return (
    <View style={styles.container}>
      {/* Ring Container */}
      <View style={styles.ringContainer}>
        <Svg width={RING_SIZE} height={RING_SIZE} style={styles.svg}>
          {/* Base ring - white at ~15% opacity */}
          <Circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RADIUS}
            stroke={COLORS.baseRing}
            strokeWidth={STROKE_WIDTH}
            fill="transparent"
          />
          {/* Progress ring - white at 100% */}
          <AnimatedCircle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RADIUS}
            stroke={COLORS.progressRing}
            strokeWidth={STROKE_WIDTH}
            fill="transparent"
            strokeDasharray={CIRCUMFERENCE}
            animatedProps={animatedProps}
            strokeLinecap="round"
            rotation="-90"
            origin={`${RING_SIZE / 2}, ${RING_SIZE / 2}`}
          />
        </Svg>

        {/* Center Content */}
        <View style={styles.centerContent}>
          <Text
            style={styles.completedNumber}
            accessibilityLabel={`${completed} drills completed out of ${total}`}
          >
            {completed}
          </Text>
          <Text style={styles.drillsLabel}>
            {isComplete ? 'Completed' : 'drills'}
          </Text>
          {!isComplete && (
            <Text style={styles.totalLabel}>of {total}</Text>
          )}
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 24,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  ringContainer: {
    width: RING_SIZE,
    height: RING_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
  },
  centerContent: {
    alignItems: 'center',
  },
  // Display number: 44-56pt, weight 600-700
  completedNumber: {
    fontSize: 52,
    fontWeight: '700',
    color: COLORS.white,
    fontVariant: ['tabular-nums'], // Fixed width alignment
  },
  // Primary label: 16-18pt, weight 500-600
  drillsLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: COLORS.secondaryText,
    marginTop: 4,
  },
  // Secondary label: 12-14pt, weight 400-500
  totalLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.tertiaryText,
    marginTop: 2,
  },
});
