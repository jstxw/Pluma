/**
 * Navigation type definitions for Pluma
 *
 * Navigation Hierarchy:
 * RootNavigator
 * └── TabNavigator (Bottom Tabs)
 *     ├── HomeStack
 *     │   └── HomeScreen
 *     ├── DrillsStack
 *     │   ├── DrillsListScreen
 *     │   └── DrillDetailScreen
 *     ├── ShotsStack
 *     │   ├── ShotsListScreen
 *     │   └── ShotDetailScreen
 *     └── TrainingStack
 *         └── TrainingScreen
 */

import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';

/**
 * Home Stack param list
 */
export type HomeStackParamList = {
  Home: undefined;
};

/**
 * Drills Stack param list
 */
export type DrillsStackParamList = {
  DrillsList: { tagFilter?: string } | undefined;
  DrillDetail: { drillId: string };
};

/**
 * Shots Stack param list
 */
export type ShotsStackParamList = {
  ShotsList: undefined;
  ShotDetail: { shotId: string };
  RelatedDrills: { shotId: string; shotName: string };
};

/**
 * Training Stack param list
 */
export type TrainingStackParamList = {
  Training: undefined;
};

/**
 * Tab Navigator param list
 */
export type TabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  DrillsTab: NavigatorScreenParams<DrillsStackParamList>;
  ShotsTab: NavigatorScreenParams<ShotsStackParamList>;
  TrainingTab: NavigatorScreenParams<TrainingStackParamList>;
};

/**
 * Root Navigator param list
 */
export type RootStackParamList = {
  Main: NavigatorScreenParams<TabParamList>;
};

/**
 * Screen props types for type-safe navigation
 */

// Home Stack screen props
export type HomeScreenProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'Home'>,
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'HomeTab'>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

// Drills Stack screen props
export type DrillsListScreenProps = CompositeScreenProps<
  NativeStackScreenProps<DrillsStackParamList, 'DrillsList'>,
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'DrillsTab'>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

export type DrillDetailScreenProps = CompositeScreenProps<
  NativeStackScreenProps<DrillsStackParamList, 'DrillDetail'>,
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'DrillsTab'>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

// Shots Stack screen props
export type ShotsListScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ShotsStackParamList, 'ShotsList'>,
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'ShotsTab'>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

export type ShotDetailScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ShotsStackParamList, 'ShotDetail'>,
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'ShotsTab'>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

export type RelatedDrillsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ShotsStackParamList, 'RelatedDrills'>,
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'ShotsTab'>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

// Training Stack screen props
export type TrainingScreenProps = CompositeScreenProps<
  NativeStackScreenProps<TrainingStackParamList, 'Training'>,
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'TrainingTab'>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

/**
 * Tab keys for navigation
 */
export type TabKey = 'HomeTab' | 'DrillsTab' | 'ShotsTab' | 'TrainingTab';

/**
 * Declare global navigation types for useNavigation hook
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
