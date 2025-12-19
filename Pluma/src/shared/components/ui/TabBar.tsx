/**
 * TabBar component following DESIGN_INSTRUCTIONS.md specifications
 *
 * Navigation Bar (Bottom) Specs:
 * - Style: Fixed bottom bar with rounded top corners
 * - Background: #1A1A1A with slight transparency
 * - Height: 80px
 * - Border Radius: 32px (top corners)
 * - Icons: 24x24px, white
 * - Active State: White fill background on icon
 * - Layout: 4-5 icons evenly spaced
 *
 * Behavioral:
 * - Smooth transition between states (200ms)
 * - Slight scale animation on tap (0.95 → 1.0)
 * - Should not overlap with page content
 * - Maintains position during scroll (stays fixed)
 */

import React from 'react';
import { View, Pressable, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/theme';
import { spacing, borderRadius } from '../../constants/spacing';

/**
 * Tab item configuration
 */
export interface TabItem {
  /** Unique key for the tab */
  key: string;
  /** Tab label (for accessibility) */
  label: string;
  /** Icon render function */
  icon: (props: { focused: boolean; color: string; size: number }) => React.ReactNode;
}

/**
 * TabBar props interface
 */
export interface TabBarProps {
  /** Array of tab configurations */
  tabs: TabItem[];
  /** Currently active tab key */
  activeTab: string;
  /** Called when a tab is pressed */
  onTabPress: (key: string) => void;
  /** Additional container styles */
  style?: ViewStyle;
}

/**
 * Individual tab button props
 */
interface TabButtonProps {
  tab: TabItem;
  isActive: boolean;
  onPress: () => void;
}

/**
 * Individual tab button component with animations
 */
function TabButton({ tab, isActive, onPress }: TabButtonProps) {
  const scale = useSharedValue(1);
  const backgroundOpacity = useSharedValue(isActive ? 1 : 0);

  // Update background when active state changes
  React.useEffect(() => {
    backgroundOpacity.value = withTiming(isActive ? 1 : 0, {
      duration: 200,
      easing: Easing.out(Easing.ease),
    });
  }, [isActive, backgroundOpacity]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    opacity: backgroundOpacity.value,
  }));

  const handlePressIn = () => {
    // Scale animation on tap: 0.95
    scale.value = withTiming(0.95, {
      duration: 100,
      easing: Easing.out(Easing.ease),
    });
  };

  const handlePressOut = () => {
    // Scale back to 1.0 with ease-out
    scale.value = withTiming(1, {
      duration: 150,
      easing: Easing.out(Easing.ease),
    });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={tab.label}
    >
      <Animated.View style={[styles.tabButton, animatedContainerStyle]}>
        {/* Active state background */}
        <Animated.View style={[styles.activeBackground, animatedBackgroundStyle]} />

        {/* Icon */}
        <View style={styles.iconWrapper}>
          {tab.icon({
            focused: isActive,
            color: colors.white,
            size: 24,
          })}
        </View>
      </Animated.View>
    </Pressable>
  );
}

/**
 * Custom bottom TabBar component
 */
export function TabBar({ tabs, activeTab, onTabPress, style }: TabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(insets.bottom, spacing.lg) },
        style,
      ]}
    >
      <View style={styles.content}>
        {tabs.map((tab) => (
          <TabButton
            key={tab.key}
            tab={tab}
            isActive={activeTab === tab.key}
            onPress={() => onTabPress(tab.key)}
          />
        ))}
      </View>
    </View>
  );
}

/**
 * Default tab icons (simple shapes)
 * Replace with actual icons from @expo/vector-icons or custom SVGs
 */
export const TabIcons = {
  /**
   * Home icon (house shape)
   */
  Home: ({ focused, color }: { focused: boolean; color: string; size: number }) => (
    <View style={[tabIconStyles.homeContainer]}>
      {/* Roof */}
      <View
        style={[
          tabIconStyles.homeRoof,
          { borderBottomColor: color },
        ]}
      />
      {/* Body */}
      <View
        style={[
          tabIconStyles.homeBody,
          { borderColor: color },
          focused && { backgroundColor: color },
        ]}
      />
    </View>
  ),

  /**
   * List icon (three horizontal lines)
   */
  List: ({ focused, color }: { focused: boolean; color: string; size: number }) => (
    <View style={tabIconStyles.listContainer}>
      {[0, 1, 2].map((i) => (
        <View
          key={i}
          style={[
            tabIconStyles.listLine,
            { backgroundColor: color },
            focused && { height: 3 },
          ]}
        />
      ))}
    </View>
  ),

  /**
   * Grid icon (4 squares)
   */
  Grid: ({ focused, color }: { focused: boolean; color: string; size: number }) => (
    <View style={tabIconStyles.gridContainer}>
      {[0, 1, 2, 3].map((i) => (
        <View
          key={i}
          style={[
            tabIconStyles.gridDot,
            { backgroundColor: color },
            focused && { borderRadius: 3 },
          ]}
        />
      ))}
    </View>
  ),
};

const styles = StyleSheet.create({
  // Container: Fixed bottom, rounded top corners
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.accentDark, // #1A1A1A
    borderTopLeftRadius: borderRadius.bottomNav, // 32px
    borderTopRightRadius: borderRadius.bottomNav, // 32px
    // Slight transparency
    opacity: 0.98,
    // Shadow for elevation
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },

  // Content area: Height 80px, evenly spaced
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    paddingHorizontal: spacing.xl, // 24px
  },

  // Individual tab button
  tabButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Active state: White fill background on icon
  activeBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
  },

  // Icon wrapper
  iconWrapper: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Tab icon styles
const tabIconStyles = StyleSheet.create({
  // Home icon
  homeContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
  },

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

  // List icon
  listContainer: {
    width: 20,
    height: 16,
    justifyContent: 'space-between',
  },

  listLine: {
    height: 2,
    borderRadius: 1,
  },

  // Grid icon
  gridContainer: {
    width: 18,
    height: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },

  gridDot: {
    width: 7,
    height: 7,
    borderRadius: 2,
  },
});
