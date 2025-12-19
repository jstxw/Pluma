/**
 * DrillsListScreen - Main drills browsing screen
 *
 * Supports list and grid view modes with toggle button
 */

import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Screen } from '../../../shared/components/layout/Screen';
import { SearchBar } from '../../../shared/components/ui/SearchBar';
import { DrillCard } from '../components/DrillCard';
import { DrillFilters } from '../components/DrillFilters';
import { useDrills } from '../hooks/useDrills';
import { useFilters } from '../hooks/useFilters';
import { useFavorites } from '../../../app/providers/FavoritesProvider';
import { colors } from '../../../shared/constants/theme';
import { spacing, borderRadius } from '../../../shared/constants/spacing';
import { typography } from '../../../shared/constants/typography';
import type { Drill } from '../../../types';

type ViewMode = 'list' | 'grid';

interface DrillsListScreenProps {
  navigation: {
    navigate: (screen: string, params?: { drillId: string }) => void;
  };
}

/**
 * View toggle button component with animation
 */
function ViewToggleButton({
  viewMode,
  onToggle,
}: {
  viewMode: ViewMode;
  onToggle: () => void;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.9, { duration: 100, easing: Easing.out(Easing.ease) });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 150, easing: Easing.out(Easing.ease) });
  };

  return (
    <Pressable
      onPress={onToggle}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.toggleButton, animatedStyle]}>
        {viewMode === 'list' ? (
          // Grid icon (4 squares)
          <View style={styles.iconContainer}>
            <View style={styles.gridIcon}>
              <View style={styles.gridSquare} />
              <View style={styles.gridSquare} />
              <View style={styles.gridSquare} />
              <View style={styles.gridSquare} />
            </View>
          </View>
        ) : (
          // List icon (3 lines)
          <View style={styles.iconContainer}>
            <View style={styles.listIcon}>
              <View style={styles.listLine} />
              <View style={styles.listLine} />
              <View style={styles.listLine} />
            </View>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

export function DrillsListScreen({ navigation }: DrillsListScreenProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const { filters, updateFilter } = useFilters();
  const { data, isLoading, error } = useDrills(filters);
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleDrillPress = (id: string) => {
    navigation.navigate('DrillDetail', { drillId: id });
  };

  const handleFavoritePress = (id: string) => {
    toggleFavorite(id);
  };

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'list' ? 'grid' : 'list'));
  };

  const renderDrill = ({ item, index }: { item: Drill; index: number }) => (
    <View style={viewMode === 'grid' ? styles.gridItem : undefined}>
      <DrillCard
        drill={item}
        onPress={handleDrillPress}
        onFavorite={handleFavoritePress}
        isFavorited={isFavorite(item.id)}
        compact={viewMode === 'grid'}
      />
    </View>
  );

  return (
    <Screen edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Drills</Text>
        <ViewToggleButton viewMode={viewMode} onToggle={toggleViewMode} />
      </View>
      <SearchBar
        value={filters.search || ''}
        onChangeText={(text) => updateFilter('search', text)}
        placeholder="Search drills..."
        style={styles.searchBar}
      />
      <DrillFilters filters={filters} onFilterChange={updateFilter} />

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.accentDark} />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Failed to load drills</Text>
        </View>
      ) : (
        <FlatList
          key={viewMode} // Force re-render when switching modes
          data={data?.drills || []}
          renderItem={renderDrill}
          keyExtractor={(item) => item.id}
          numColumns={viewMode === 'grid' ? 2 : 1}
          contentContainerStyle={styles.list}
          columnWrapperStyle={viewMode === 'grid' ? styles.gridRow : undefined}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  title: {
    ...typography.h1,
    color: colors.primaryText,
  },
  toggleButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridIcon: {
    width: 20,
    height: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  gridSquare: {
    width: 8,
    height: 8,
    backgroundColor: colors.accentDark,
    borderRadius: 2,
  },
  listIcon: {
    width: 20,
    height: 16,
    justifyContent: 'space-between',
  },
  listLine: {
    width: 20,
    height: 3,
    backgroundColor: colors.accentDark,
    borderRadius: 1.5,
  },
  searchBar: {
    marginBottom: spacing.base,
  },
  list: {
    paddingBottom: spacing['3xl'],
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...typography.body,
    color: colors.secondaryText,
  },
});
