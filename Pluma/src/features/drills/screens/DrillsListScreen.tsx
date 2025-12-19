/**
 * DrillsListScreen - Main drills browsing screen with grid/list toggle
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
import { Screen } from '../../../shared/components/layout/Screen';
import { SearchBar } from '../../../shared/components/ui/SearchBar';
import { DrillCard } from '../components/DrillCard';
import { DrillFilters } from '../components/DrillFilters';
import { useDrills } from '../hooks/useDrills';
import { useFilters } from '../hooks/useFilters';
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

export function DrillsListScreen({ navigation }: DrillsListScreenProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const { filters, updateFilter } = useFilters();
  const { data, isLoading, error } = useDrills(filters);

  const handleDrillPress = (id: string) => {
    navigation.navigate('DrillDetail', { drillId: id });
  };

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'list' ? 'grid' : 'list'));
  };

  const renderDrill = ({ item }: { item: Drill }) => (
    <View style={viewMode === 'grid' ? styles.gridItem : undefined}>
      <DrillCard
        drill={item}
        onPress={handleDrillPress}
        compact={viewMode === 'grid'}
      />
    </View>
  );

  return (
    <Screen edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Drills</Text>
        <Pressable onPress={toggleViewMode} style={styles.toggleButton}>
          {viewMode === 'list' ? (
            // Grid icon (4 squares)
            <View style={styles.gridIcon}>
              <View style={styles.gridSquare} />
              <View style={styles.gridSquare} />
              <View style={styles.gridSquare} />
              <View style={styles.gridSquare} />
            </View>
          ) : (
            // List icon (3 lines)
            <View style={styles.listIcon}>
              <View style={styles.listLine} />
              <View style={styles.listLine} />
              <View style={styles.listLine} />
            </View>
          )}
        </Pressable>
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
          key={viewMode}
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
    width: 18,
    height: 14,
    justifyContent: 'space-between',
  },
  listLine: {
    width: 18,
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
