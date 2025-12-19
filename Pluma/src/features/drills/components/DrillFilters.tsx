/**
 * DrillFilters component for filtering drills
 */

import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Pill } from '../../../shared/components/ui/Pill';
import { spacing } from '../../../shared/constants/spacing';
import type { DrillFilters as DrillFiltersType } from '../types/drill.types';

interface DrillFiltersProps {
  filters: DrillFiltersType;
  onFilterChange: <K extends keyof DrillFiltersType>(
    key: K,
    value: DrillFiltersType[K]
  ) => void;
}

const DIFFICULTIES = ['beginner', 'intermediate', 'advanced'] as const;
const TYPES = ['shot', 'footwork', 'combination'] as const;

export function DrillFilters({ filters, onFilterChange }: DrillFiltersProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Pill
          label="All"
          selected={!filters.difficulty && !filters.type}
          onPress={() => {
            onFilterChange('difficulty', undefined);
            onFilterChange('type', undefined);
          }}
        />
        {DIFFICULTIES.map((difficulty) => (
          <Pill
            key={difficulty}
            label={difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            selected={filters.difficulty === difficulty}
            onPress={() =>
              onFilterChange(
                'difficulty',
                filters.difficulty === difficulty ? undefined : difficulty
              )
            }
          />
        ))}
        {TYPES.map((type) => (
          <Pill
            key={type}
            label={type.charAt(0).toUpperCase() + type.slice(1)}
            selected={filters.type === type}
            onPress={() =>
              onFilterChange('type', filters.type === type ? undefined : type)
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.base,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
});
