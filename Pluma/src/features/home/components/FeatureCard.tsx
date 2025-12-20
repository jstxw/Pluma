/**
 * FeatureCard - Promotional feature cards with icons
 *
 * Features:
 * - Customizable background colors
 * - Icon display
 * - Title and subtitle
 * - Optional badge
 * - Flexible sizing
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { colors } from '../../../shared/constants/theme';
import { spacing } from '../../../shared/constants/spacing';
import { typography } from '../../../shared/constants/typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface FeatureCardProps {
  title: string;
  subtitle?: string;
  icon: string; // Emoji or icon
  backgroundColor: string;
  badge?: string;
  fullWidth?: boolean;
  onPress?: () => void;
}

export function FeatureCard({
  title,
  subtitle,
  icon,
  backgroundColor,
  badge,
  fullWidth = false,
  onPress,
}: FeatureCardProps) {
  const cardWidth = fullWidth
    ? SCREEN_WIDTH - spacing.xl * 2
    : (SCREEN_WIDTH - spacing.xl * 2 - spacing.sm) / 2;

  return (
    <Pressable
      style={[
        styles.card,
        { backgroundColor, width: cardWidth },
        fullWidth && styles.cardFullWidth,
      ]}
      onPress={onPress}
      android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
    >
      {badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}

      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    padding: spacing.lg,
    minHeight: 200,
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#000',
    overflow: 'visible',
    position: 'relative',
  },
  cardFullWidth: {
    minHeight: 240,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: spacing.lg,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#000',
  },
  badgeText: {
    ...typography.caption,
    fontSize: 12,
    color: colors.white,
    fontWeight: '700',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
  },
  content: {
    gap: spacing.xs,
  },
  title: {
    ...typography.h3,
    fontSize: 24,
    color: '#000',
    fontWeight: '700',
    lineHeight: 30,
  },
  subtitle: {
    ...typography.body,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.6)',
    fontWeight: '500',
  },
});
