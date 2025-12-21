/**
 * RelatedDrillsScreen - Shows all related drills for a specific shot
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Screen } from '../../../shared/components/layout/Screen';
import { DrillCard } from '../../drills/components/DrillCard';
import { useDrillsByIds } from '../../drills/hooks/useDrills';
import { useShot } from '../hooks/useShots';
import { colors } from '../../../shared/constants/theme';
import { spacing } from '../../../shared/constants/spacing';
import { typography } from '../../../shared/constants/typography';
import type { RelatedDrillsScreenProps } from '../../../app/navigation/types';
import type { Drill } from '../../../types';

export function RelatedDrillsScreen({ route, navigation }: RelatedDrillsScreenProps) {
  const { shotId, shotName } = route.params;
  const { data: shot } = useShot(shotId);
  const drillIds = shot?.relatedDrills ?? [];
  const { data: drills, isLoading, error } = useDrillsByIds(drillIds);

  const handleDrillPress = (drillId: string) => {
    navigation.navigate('DrillsTab', {
      screen: 'DrillDetail',
      params: { drillId },
    });
  };

  const renderDrill = ({ item }: { item: Drill }) => (
    <DrillCard drill={item} onPress={handleDrillPress} />
  );

  return (
    <Screen edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>
          Drills for {shotName}
        </Text>
      </View>

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.accentDark} />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Failed to load drills</Text>
        </View>
      ) : drills && drills.length > 0 ? (
        <FlatList
          data={drills}
          renderItem={renderDrill}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>No related drills found</Text>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 24,
    color: colors.primaryText,
  },
  title: {
    ...typography.h2,
    color: colors.primaryText,
    flex: 1,
  },
  list: {
    paddingBottom: spacing['3xl'],
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
  emptyText: {
    ...typography.body,
    color: colors.secondaryText,
  },
});
