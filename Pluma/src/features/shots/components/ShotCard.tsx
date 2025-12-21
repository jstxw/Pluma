/**
 * ShotCard component for displaying shot preview
 *
 * Uses animated Card component with:
 * - Press animation (scale 0.98)
 * - Animated favorite button with pulse effect
 * - Compact mode for grid layouts
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../../../shared/components/ui/Card';
import { Pill } from '../../../shared/components/ui/Pill';
import { colors } from '../../../shared/constants/theme';
import { spacing } from '../../../shared/constants/spacing';
import { typography } from '../../../shared/constants/typography';
import type { Shot } from '../../../types';

interface ShotCardProps {
  shot: Shot;
  onPress?: (id: string) => void;
  /** Compact mode for grid layout */
  compact?: boolean;
}

export function ShotCard({
  shot,
  onPress,
  compact = false,
}: ShotCardProps) {
  if (compact) {
    return (
      <Card
        onPress={() => onPress?.(shot.id)}
        style={styles.compactContainer}
      >
        <Card.Image 
          source={shot.imageUrl ? shot.imageUrl : undefined} 
          style={styles.compactImage}
          imageStyle={styles.compactImageInner}
        >
          {!shot.imageUrl && <View style={styles.imagePlaceholder} />}
        </Card.Image>
        <View style={styles.compactContent}>
          <Text style={styles.compactTitle} numberOfLines={2}>
            {shot.name}
          </Text>
          <Pill label={shot.difficulty} />
        </View>
      </Card>
    );
  }

  return (
    <Card onPress={() => onPress?.(shot.id)} style={styles.container}>
      <Card.Image source={shot.imageUrl ? shot.imageUrl : undefined}>
        {!shot.imageUrl && <View style={styles.imagePlaceholder} />}
      </Card.Image>
      <Card.Content>
        <Card.Title>{shot.name}</Card.Title>
        <Card.Subtitle>{shot.description}</Card.Subtitle>
        <View style={styles.tags}>
          <Pill label={shot.difficulty} />
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.base,
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  tags: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  // Compact styles for grid view
  compactContainer: {
    marginBottom: spacing.base,
  },
  compactImage: {
    height: 120,
  },
  compactImageInner: {
    borderRadius: 0,
  },
  compactContent: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  compactTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.primaryText,
    lineHeight: 20,
  },
});
