/**
 * SearchBar component following DESIGN_INSTRUCTIONS.md specifications
 *
 * Specs:
 * - Background: #F5F5F5
 * - Height: 48-52px
 * - Border Radius: 24-26px (fully rounded)
 * - Icon: Magnifying glass, 24px, left-aligned
 * - Placeholder: "Search", 16px, Gray
 * - Right Element: Filter/settings icon button
 *
 * Behavioral:
 * - Tap expands to focus state with keyboard
 * - Cancel button appears when active
 * - Smooth transition to dedicated search screen
 */

import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors } from '../../constants/theme';
import { spacing, borderRadius } from '../../constants/spacing';
import { fontSize, fontWeight } from '../../constants/typography';

/**
 * SearchBar props interface
 */
export interface SearchBarProps {
  /** Current search value */
  value: string;
  /** Called when text changes */
  onChangeText: (text: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Called when filter button is pressed */
  onFilterPress?: () => void;
  /** Called when search bar is focused */
  onFocus?: () => void;
  /** Called when search bar loses focus */
  onBlur?: () => void;
  /** Called when search is submitted */
  onSubmit?: () => void;
  /** Whether to show the filter button */
  showFilterButton?: boolean;
  /** Whether the search bar is in active/focused state */
  autoFocus?: boolean;
  /** Additional container styles */
  style?: ViewStyle;
  /** Additional TextInput props */
  textInputProps?: Omit<TextInputProps, 'value' | 'onChangeText' | 'placeholder'>;
}

/**
 * Search icon component (magnifying glass)
 */
function SearchIcon() {
  return (
    <View style={iconStyles.searchContainer}>
      {/* Circle */}
      <View style={iconStyles.searchCircle} />
      {/* Handle */}
      <View style={iconStyles.searchHandle} />
    </View>
  );
}

/**
 * Filter icon component (sliders)
 */
function FilterIcon() {
  return (
    <View style={iconStyles.filterContainer}>
      <View style={iconStyles.filterLine} />
      <View style={[iconStyles.filterLine, iconStyles.filterLineMiddle]} />
      <View style={iconStyles.filterLine} />
    </View>
  );
}

/**
 * SearchBar component
 */
export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search',
  onFilterPress,
  onFocus,
  onBlur,
  onSubmit,
  showFilterButton = true,
  autoFocus = false,
  style,
  textInputProps,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus?.();
    textInputProps?.onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur?.();
    textInputProps?.onBlur?.(e);
  };

  const handleContainerPress = () => {
    inputRef.current?.focus();
  };

  const handleFilterPressIn = () => {
    scale.value = withTiming(0.9, {
      duration: 100,
      easing: Easing.out(Easing.ease),
    });
  };

  const handleFilterPressOut = () => {
    scale.value = withTiming(1, {
      duration: 150,
      easing: Easing.out(Easing.ease),
    });
  };

  return (
    <Pressable
      style={[styles.container, isFocused && styles.containerFocused, style]}
      onPress={handleContainerPress}
    >
      {/* Search Icon */}
      <View style={styles.iconContainer}>
        <SearchIcon />
      </View>

      {/* Text Input */}
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        autoFocus={autoFocus}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        {...textInputProps}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      {/* Filter Button */}
      {showFilterButton && onFilterPress && (
        <Animated.View style={animatedStyle}>
          <Pressable
            style={styles.filterButton}
            onPress={onFilterPress}
            onPressIn={handleFilterPressIn}
            onPressOut={handleFilterPressOut}
          >
            <FilterIcon />
          </Pressable>
        </Animated.View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // Container: Background #F5F5F5, Height 48-52px, Border Radius 24-26px
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.unselectedPill, // #F5F5F5
    height: 52,
    borderRadius: 26, // Fully rounded
    paddingHorizontal: spacing.base, // 16px
  },

  containerFocused: {
    // Subtle border when focused
    borderWidth: 1,
    borderColor: colors.accentDark,
  },

  // Icon container
  iconContainer: {
    marginRight: spacing.md, // 12px
  },

  // Input: 16px, fills remaining space
  input: {
    flex: 1,
    fontSize: fontSize.body, // 16px
    fontWeight: fontWeight.regular,
    color: colors.primaryText,
    paddingVertical: 0, // Remove default padding
  },

  // Filter button
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accentDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm, // 8px
  },
});

// Icon styles
const iconStyles = StyleSheet.create({
  // Search icon (magnifying glass)
  searchContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.gray,
    position: 'absolute',
    top: 2,
    left: 2,
  },

  searchHandle: {
    width: 6,
    height: 2,
    backgroundColor: colors.gray,
    position: 'absolute',
    bottom: 4,
    right: 4,
    transform: [{ rotate: '45deg' }],
    borderRadius: 1,
  },

  // Filter icon (sliders)
  filterContainer: {
    width: 20,
    height: 16,
    justifyContent: 'space-between',
  },

  filterLine: {
    height: 2,
    backgroundColor: colors.white,
    borderRadius: 1,
  },

  filterLineMiddle: {
    marginHorizontal: 4,
  },
});
