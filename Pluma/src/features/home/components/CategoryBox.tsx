/**
 * CategoryBox - Colorful category navigation box
 * Features:
 * Colored backgrounds
 * Title text
 * Optional decorative elements
 * Arrow button for navigation
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { colors } from '../../../shared/constants/theme';
import { spacing } from '../../../shared/constants/spacing';
import { typography } from '../../../shared/constants/typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_PADDING = spacing.xl * 2;
const GAP = spacing.sm;
const BOX_SIZE = (SCREEN_WIDTH - GRID_PADDING - GAP) / 2;

export interface CategoryBoxProps {
  title: string;
  backgroundColor: string;
  onPress?: () => void;
}

export function CategoryBox({ title, backgroundColor, onPress }: CategoryBoxProps) {
  return (
    <Pressable
      style={[styles.box, { backgroundColor }]}
      onPress={onPress}
      android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
    >
      {/* Title */}
      <Text style={styles.title} numberOfLines={2}>{title}</Text>

      {/* Decorative background circles */}
      <View style={styles.decorativeCircles}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
      </View>

      {/* Arrow button */}
      <View style={styles.arrowButton}>
        <Text style={styles.arrow}>↗</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: 32,
    padding: spacing.lg,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#000',
  },
  title: {
    ...typography.h3,
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
    lineHeight: 24,
    maxWidth: '80%',
  },
  decorativeCircles: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.15,
  },
  circle1: {
    width: 80,
    height: 80,
    backgroundColor: '#000',
    bottom: 20,
    right: -20,
  },
  circle2: {
    width: 100,
    height: 100,
    backgroundColor: '#000',
    top: 30,
    right: -30,
  },
  arrowButton: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 24,
    color: '#000',
    fontWeight: '700',
  },
});
