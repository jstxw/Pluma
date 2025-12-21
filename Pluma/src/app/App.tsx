/**
 * Pluma App Entry Point
 *
 * Main application component that sets up all providers and navigation.
 *
 * Provider Hierarchy:
 * 1. GestureHandlerRootView - Required for gesture-based interactions
 * 2. SafeAreaProvider - Safe area insets for notches and home indicators
 * 3. QueryProvider - React Query for server state management
 * 4. ThemeProvider - Theme context for colors and dark mode
 *
 * Navigation Hierarchy:
 * - RootNavigator contains NavigationContainer
 * - TabNavigator provides bottom tabs (Home, Drills, Shots)
 * - Each tab has its own stack navigator for drill/shot details
 */

import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider, useThemeContext } from './providers/ThemeProvider';
import { QueryProvider } from './providers/QueryProvider';
import { FavoritesProvider } from './providers/FavoritesProvider';
import { DrillTrackerProvider } from './providers/DrillTrackerProvider';
import { RootNavigator } from './navigation/RootNavigator';
import { useStatsStore } from '../state/statsStore';

/**
 * App content with theme-aware status bar
 *
 * Renders the status bar with appropriate style based on theme
 * and the root navigation structure.
 * Also initializes stats tracking on app start.
 */
function AppContent() {
  const { isDark } = useThemeContext();
  const setLastOpenedNow = useStatsStore((state) => state.setLastOpenedNow);

  // Update lastOpenedAt timestamp on every app start
  useEffect(() => {
    setLastOpenedNow();
  }, [setLastOpenedNow]);

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <RootNavigator />
    </>
  );
}

/**
 * Root App component
 *
 * Sets up all required providers in the correct order and renders
 * the main application content.
 */
export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <QueryProvider>
          <ThemeProvider>
            <FavoritesProvider>
              <DrillTrackerProvider>
                <AppContent />
              </DrillTrackerProvider>
            </FavoritesProvider>
          </ThemeProvider>
        </QueryProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
