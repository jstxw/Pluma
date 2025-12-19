/**
 * Custom ScrollView with consistent styling
 */

import React from 'react';
import {
  ScrollView as RNScrollView,
  StyleSheet,
  ViewStyle,
  RefreshControl,
} from 'react-native';
import { colors } from '../../constants/theme';
import { spacing } from '../../constants/spacing';

interface ScrollViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  refreshing?: boolean;
  onRefresh?: () => void;
  showsVerticalScrollIndicator?: boolean;
}

export function ScrollView({
  children,
  style,
  contentContainerStyle,
  refreshing = false,
  onRefresh,
  showsVerticalScrollIndicator = false,
}: ScrollViewProps) {
  return (
    <RNScrollView
      style={[styles.container, style]}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
    >
      {children}
    </RNScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing['2xl'],
  },
});
