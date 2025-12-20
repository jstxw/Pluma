/**
 * DrillCard component for displaying drill preview
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
import type { Drill } from '../../../types';

interface DrillCardProps {
  drill: Drill;
  onPress?: (id: string) => void;
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
  /** Compact mode for grid layout */
  compact?: boolean;
}

export function DrillCard({
  drill,
  onPress,
  onFavorite,
  isFavorited = false,
  compact = false,
}: DrillCardProps) {
  if (compact) {
    return (
      <Card
        onPress={() => onPress?.(drill.id)}
        style={styles.compactContainer}
      >
        <Card.Image style={styles.compactImage}>
          <View style={styles.imagePlaceholder} />
          {onFavorite && (
            <Card.Favorite
              isFavorited={isFavorited}
              onPress={() => onFavorite(drill.id)}
              style={styles.compactFavoriteButton}
            />
          )}
        </Card.Image>
        <View style={styles.compactContent}>
          <Text style={styles.compactTitle} numberOfLines={2}>
            {drill.title}
          </Text>
          <Pill label={drill.difficulty} />
        </View>
      </Card>
    );
  }

  return (
    <Card onPress={() => onPress?.(drill.id)} style={styles.container}>
      <Card.Image>
        {/* Image placeholder - will be replaced with actual image component */}
        <View style={styles.imagePlaceholder} />
        {onFavorite && (
          <Card.Favorite
            isFavorited={isFavorited}
            onPress={() => onFavorite(drill.id)}
            style={styles.favoriteButton}
          />
        )}
      </Card.Image>
      <Card.Content>
        <Card.Title>{drill.title}</Card.Title>
        <Card.Subtitle>{drill.description}</Card.Subtitle>
        <View style={styles.tags}>
          <Pill label={drill.difficulty} />
          <Pill label={drill.type} />
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
  favoriteButton: {
    top: spacing.base,
    right: spacing.base,
  },
  tags: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  // Compact styles for grid view
  compactContainer: {
    marginBottom: spacing.base,
    height: 220, // Fixed height for uniform card sizes
  },
  compactImage: {
    height: 120,
  },
  compactFavoriteButton: {
    top: spacing.sm,
    right: spacing.sm,
  },
  compactContent: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.sm,
    justifyContent: 'flex-end', // Push content to bottom
  },
  compactTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.primaryText,
    lineHeight: 20,
  },
});
