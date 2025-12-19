/**
 * ShotsListScreen - Main shots browsing screen
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
import { ShotCard } from '../components/ShotCard';
import { useShots } from '../hooks/useShots';
import { colors } from '../../../shared/constants/theme';
import { spacing, borderRadius } from '../../../shared/constants/spacing';
import { typography } from '../../../shared/constants/typography';
import type { Shot } from '../../../types';

type ViewMode = 'list' | 'grid';

interface ShotsListScreenProps {
  navigation: {
    navigate: (screen: string, params?: { shotId: string }) => void;
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

export function ShotsListScreen({ navigation }: ShotsListScreenProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading, error } = useShots();

  const handleShotPress = (id: string) => {
    navigation.navigate('ShotDetail', { shotId: id });
  };

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'list' ? 'grid' : 'list'));
  };

  const renderShot = ({ item }: { item: Shot }) => (
    <View style={viewMode === 'grid' ? styles.gridItem : undefined}>
      <ShotCard shot={item} onPress={handleShotPress} compact={viewMode === 'grid'} />
    </View>
  );

  return (
    <Screen edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Shots</Text>
        <ViewToggleButton viewMode={viewMode} onToggle={toggleViewMode} />
      </View>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search shots..."
        style={styles.searchBar}
      />

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.accentDark} />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Failed to load shots</Text>
        </View>
      ) : (
        <FlatList
          key={viewMode}
          data={data?.shots || []}
          renderItem={renderShot}
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
