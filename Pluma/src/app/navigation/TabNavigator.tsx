/**
 * Bottom Tab Navigator
 *
 * Navigation Rules (from ARCHITECTURE.md):
 * - Tabs always visible at top-level screens
 * - Tapping active tab scrolls to top (via ScrollToTop)
 * - Tapping inactive tab resets that stack to root
 * - Tab state is preserved when switching
 *
 * Animations (from DESIGN_INSTRUCTIONS.md):
 * - Smooth transition between states (200ms)
 * - Slight scale animation on tap (0.95 → 1.0)
 * - Stack transitions: slide from right
 */

import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { EventArg } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';

import { HomeScreen } from '../../features/home/screens/HomeScreen';
import { DrillsListScreen } from '../../features/drills/screens/DrillsListScreen';
import { DrillDetailScreen } from '../../features/drills/screens/DrillDetailScreen';
import { ShotsListScreen } from '../../features/shots/screens/ShotsListScreen';
import { ShotDetailScreen } from '../../features/shots/screens/ShotDetailScreen';
import { RelatedDrillsScreen } from '../../features/shots/screens/RelatedDrillsScreen';
import { TrainingScreen } from '../../features/training/screens/TrainingScreen';

import { colors } from '../../shared/constants/theme';
import { borderRadius } from '../../shared/constants/spacing';
import type {
  TabParamList,
  HomeStackParamList,
  DrillsStackParamList,
  ShotsStackParamList,
  TrainingStackParamList,
} from './types';

const Tab = createBottomTabNavigator<TabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const DrillsStack = createNativeStackNavigator<DrillsStackParamList>();
const ShotsStack = createNativeStackNavigator<ShotsStackParamList>();
const TrainingStack = createNativeStackNavigator<TrainingStackParamList>();

/**
 * Home Stack Navigator
 */
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

/**
 * Drills Stack Navigator
 */
function DrillsStackNavigator() {
  return (
    <DrillsStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <DrillsStack.Screen name="DrillsList" component={DrillsListScreen} />
      <DrillsStack.Screen name="DrillDetail" component={DrillDetailScreen} />
    </DrillsStack.Navigator>
  );
}

/**
 * Shots Stack Navigator
 */
function ShotsStackNavigator() {
  return (
    <ShotsStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <ShotsStack.Screen name="ShotsList" component={ShotsListScreen} />
      <ShotsStack.Screen name="ShotDetail" component={ShotDetailScreen} />
      <ShotsStack.Screen name="RelatedDrills" component={RelatedDrillsScreen} />
    </ShotsStack.Navigator>
  );
}

/**
 * Training Stack Navigator
 */
function TrainingStackNavigator() {
  return (
    <TrainingStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <TrainingStack.Screen name="Training" component={TrainingScreen} />
    </TrainingStack.Navigator>
  );
}

/**
 * Animated Tab icon component - Home (house shape)
 * Smooth transition between states (200ms)
 */
function HomeIcon({ focused }: { focused: boolean; color: string; size: number }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(focused ? 1 : 0.5);

  useEffect(() => {
    opacity.value = withTiming(focused ? 1 : 0.5, {
      duration: 200,
      easing: Easing.out(Easing.ease),
    });
    // Slight bounce when becoming focused
    if (focused) {
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    }
  }, [focused, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.iconContainer, animatedStyle]}>
      {/* Roof */}
      <View
        style={[
          styles.homeRoof,
          { borderBottomColor: colors.white },
        ]}
      />
      {/* Body */}
      <View
        style={[
          styles.homeBody,
          {
            borderColor: colors.white,
            backgroundColor: focused ? colors.white : 'transparent',
          },
        ]}
      />
    </Animated.View>
  );
}

/**
 * Animated Tab icon component - Drills (list icon)
 * Smooth transition between states (200ms)
 */
function DrillsIcon({ focused }: { focused: boolean; color: string; size: number }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(focused ? 1 : 0.5);

  useEffect(() => {
    opacity.value = withTiming(focused ? 1 : 0.5, {
      duration: 200,
      easing: Easing.out(Easing.ease),
    });
    if (focused) {
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    }
  }, [focused, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.listIconContainer, animatedStyle]}>
      <View style={[styles.listLine, { backgroundColor: colors.white }]} />
      <View style={[styles.listLine, { backgroundColor: colors.white }]} />
      <View style={[styles.listLine, { backgroundColor: colors.white }]} />
    </Animated.View>
  );
}

/**
 * Animated Tab icon component - Shots (target/crosshair icon)
 * Smooth transition between states (200ms)
 */
function ShotsIcon({ focused }: { focused: boolean; color: string; size: number }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(focused ? 1 : 0.5);

  useEffect(() => {
    opacity.value = withTiming(focused ? 1 : 0.5, {
      duration: 200,
      easing: Easing.out(Easing.ease),
    });
    if (focused) {
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    }
  }, [focused, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.iconContainer, animatedStyle]}>
      <View
        style={[
          styles.targetOuter,
          { borderColor: colors.white },
        ]}
      />
      <View
        style={[
          styles.targetInner,
          {
            borderColor: colors.white,
            backgroundColor: focused ? colors.white : 'transparent',
          },
        ]}
      />
    </Animated.View>
  );
}

/**
 * Animated Tab icon component - Training (dumbbell icon)
 * Smooth transition between states (200ms)
 */
function TrainingIcon({ focused }: { focused: boolean; color: string; size: number }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(focused ? 1 : 0.5);

  useEffect(() => {
    opacity.value = withTiming(focused ? 1 : 0.5, {
      duration: 200,
      easing: Easing.out(Easing.ease),
    });
    if (focused) {
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    }
  }, [focused, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.trainingIconContainer, animatedStyle]}>
      {/* Left weight */}
      <View
        style={[
          styles.trainingWeight,
          { backgroundColor: focused ? colors.white : 'transparent', borderColor: colors.white },
        ]}
      />
      {/* Bar */}
      <View style={[styles.trainingBar, { backgroundColor: colors.white }]} />
      {/* Right weight */}
      <View
        style={[
          styles.trainingWeight,
          { backgroundColor: focused ? colors.white : 'transparent', borderColor: colors.white },
        ]}
      />
    </Animated.View>
  );
}

/**
 * Tab Navigator component
 *
 * Implements the navigation rules:
 * - Tabs always visible at top-level screens
 * - Tab state preserved when switching (default behavior)
 * - Tapping inactive tab resets that stack to root (via popToTop listener)
 */
export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
      screenListeners={({ navigation, route }) => ({
        // Reset stack to root when tapping an inactive tab
        tabPress: (e: EventArg<'tabPress', true, undefined>) => {
          const state = navigation.getState();
          const currentRoute = state.routes[state.index];

          // If this tab is already focused
          if (currentRoute.key === route.key) {
            // Scroll to top behavior is handled by useScrollToTop in each screen
            // No need to prevent default, just let it scroll
          } else {
            // When switching to a new tab, reset that stack to root
            // This ensures fresh navigation state for the new tab
            const tabState = route.state;
            if (tabState && tabState.index > 0) {
              navigation.reset({
                index: 0,
                routes: [{ name: route.name }],
              });
            }
          }
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="DrillsTab"
        component={DrillsStackNavigator}
        options={{
          tabBarLabel: 'Drills',
          tabBarIcon: DrillsIcon,
        }}
      />
      <Tab.Screen
        name="ShotsTab"
        component={ShotsStackNavigator}
        options={{
          tabBarLabel: 'Shots',
          tabBarIcon: ShotsIcon,
        }}
      />
      <Tab.Screen
        name="TrainingTab"
        component={TrainingStackNavigator}
        options={{
          tabBarLabel: 'Training',
          tabBarIcon: TrainingIcon,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  // Tab bar: Fixed bottom, rounded top corners, #1A1A1A background
  tabBar: {
    backgroundColor: colors.accentDark,
    borderTopLeftRadius: borderRadius.bottomNav, // 32px
    borderTopRightRadius: borderRadius.bottomNav, // 32px
    height: 80,
    paddingTop: 8,
    paddingBottom: 20,
    position: 'absolute',
    borderTopWidth: 0,
    // Shadow for elevation
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },

  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
  },

  // Icon container
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Home icon styles
  homeRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },

  homeBody: {
    width: 14,
    height: 10,
    borderWidth: 2,
    borderTopWidth: 0,
  },

  // List icon styles (for Drills)
  listIconContainer: {
    width: 20,
    height: 16,
    justifyContent: 'space-between',
  },

  listLine: {
    height: 2,
    borderRadius: 1,
  },

  // Target icon styles (for Shots)
  targetOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    position: 'absolute',
  },

  targetInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 2,
  },

  // Training icon styles (dumbbell)
  trainingIconContainer: {
    width: 24,
    height: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  trainingWeight: {
    width: 6,
    height: 14,
    borderRadius: 2,
    borderWidth: 2,
  },

  trainingBar: {
    width: 10,
    height: 3,
    borderRadius: 1,
  },
});
