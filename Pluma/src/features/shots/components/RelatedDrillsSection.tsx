/**
 * RelatedDrillsSection - Preview section showing related drills on ShotDetailScreen
 *
 * Displays up to 3 drill cards with a "See More" button if more drills exist.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrillCard } from '../../drills/components/DrillCard';
import { colors } from '../../../shared/constants/theme';
import { spacing, borderRadius } from '../../../shared/constants/spacing';
import { typography } from '../../../shared/constants/typography';
import type { Drill } from '../../../types';

const MAX_PREVIEW_DRILLS = 3;

interface RelatedDrillsSectionProps {
  drills: Drill[];
  onDrillPress: (drillId: string) => void;
  onSeeMore: () => void;
  shotName: string;
}

export function RelatedDrillsSection({
  drills,
  onDrillPress,
  onSeeMore,
  shotName,
}: RelatedDrillsSectionProps) {
  if (drills.length === 0) {
    return null;
  }

  const previewDrills = drills.slice(0, MAX_PREVIEW_DRILLS);
  const hasMoreDrills = drills.length > MAX_PREVIEW_DRILLS;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Popular Drills for This Shot</Text>

      <View style={styles.drillsList}>
        {previewDrills.map((drill) => (
          <DrillCard key={drill.id} drill={drill} onPress={onDrillPress} />
        ))}
      </View>

      {hasMoreDrills && (
        <TouchableOpacity
          style={styles.seeMoreButton}
          onPress={onSeeMore}
          activeOpacity={0.8}
        >
          <Text style={styles.seeMoreText}>See More</Text>
          <Text style={styles.seeMoreArrow}>→</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.primaryText,
    marginBottom: spacing.lg,
  },
  drillsList: {
    gap: spacing.base,
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.button,
    marginTop: spacing.base,
    gap: spacing.sm,
  },
  seeMoreText: {
    ...typography.button,
    color: colors.white,
  },
  seeMoreArrow: {
    fontSize: 18,
    color: colors.white,
  },
});
