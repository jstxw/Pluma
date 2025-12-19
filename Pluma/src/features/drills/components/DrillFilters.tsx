/**
 * DrillFilters component for filtering drills
 *
 * Includes filters for:
 * - Difficulty levels (beginner, intermediate, advanced)
 * - Drill types (shot, footwork, rally)
 * - Training focus tags (speed, conditioning, accuracy, etc.)
 * - Duration ranges (quick, 15 min, 20 min, 30+ min)
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
const TYPES = ['shot', 'footwork', 'rally'] as const;

// Training focus tags from mockDrills
const TRAINING_FOCUS_TAGS = [
  { id: 'tag-speed', label: 'Speed' },
  { id: 'tag-conditioning', label: 'Conditioning' },
  { id: 'tag-accuracy', label: 'Accuracy' },
  { id: 'tag-power', label: 'Power' },
  { id: 'tag-consistency', label: 'Consistency' },
  { id: 'tag-reaction', label: 'Reaction' },
  { id: 'tag-control', label: 'Control' },
] as const;

// Duration filter options
const DURATION_OPTIONS = [
  { label: '≤10 min', min: undefined, max: 10 },
  { label: '15 min', min: 11, max: 15 },
  { label: '20 min', min: 16, max: 20 },
  { label: '25 min', min: 21, max: 25 },
  { label: '30+ min', min: 26, max: undefined },
] as const;

export function DrillFilters({ filters, onFilterChange }: DrillFiltersProps) {
  // Check if a tag is selected
  const isTagSelected = (tagId: string) => {
    return filters.tags?.includes(tagId) ?? false;
  };

  // Toggle a tag filter
  const toggleTag = (tagId: string) => {
    const currentTags = filters.tags ?? [];
    const hasTag = currentTags.includes(tagId);
    const newTags = hasTag
      ? currentTags.filter((id) => id !== tagId)
      : [...currentTags, tagId];
    onFilterChange('tags', newTags.length > 0 ? newTags : undefined);
  };

  // Check if a duration filter is selected
  const isDurationSelected = (min?: number, max?: number) => {
    return filters.minDuration === min && filters.maxDuration === max;
  };

  // Toggle duration filter
  const toggleDuration = (min?: number, max?: number) => {
    if (isDurationSelected(min, max)) {
      onFilterChange('minDuration', undefined);
      onFilterChange('maxDuration', undefined);
    } else {
      onFilterChange('minDuration', min);
      onFilterChange('maxDuration', max);
    }
  };

  // Check if any filters are active
  const hasNoFilters =
    !filters.difficulty &&
    !filters.type &&
    (!filters.tags || filters.tags.length === 0) &&
    filters.minDuration === undefined &&
    filters.maxDuration === undefined;

  // Clear all filters
  const clearAllFilters = () => {
    onFilterChange('difficulty', undefined);
    onFilterChange('type', undefined);
    onFilterChange('tags', undefined);
    onFilterChange('minDuration', undefined);
    onFilterChange('maxDuration', undefined);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* All / Clear filter */}
        <Pill
          label="All"
          selected={hasNoFilters}
          onPress={clearAllFilters}
        />

        {/* Difficulty filters */}
        {DIFFICULTIES.map((difficulty) => (
          <Pill
            key={difficulty}
            label={difficulty}
            selected={filters.difficulty === difficulty}
            onPress={() =>
              onFilterChange(
                'difficulty',
                filters.difficulty === difficulty ? undefined : difficulty
              )
            }
          />
        ))}

        {/* Type filters */}
        {TYPES.map((type) => (
          <Pill
            key={type}
            label={type}
            selected={filters.type === type}
            onPress={() =>
              onFilterChange('type', filters.type === type ? undefined : type)
            }
          />
        ))}

        {/* Training focus tags */}
        {TRAINING_FOCUS_TAGS.map((tag) => (
          <Pill
            key={tag.id}
            label={tag.label}
            selected={isTagSelected(tag.id)}
            onPress={() => toggleTag(tag.id)}
          />
        ))}

        {/* Duration filters */}
        {DURATION_OPTIONS.map((duration) => (
          <Pill
            key={duration.label}
            label={duration.label}
            selected={isDurationSelected(duration.min, duration.max)}
            onPress={() => toggleDuration(duration.min, duration.max)}
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
