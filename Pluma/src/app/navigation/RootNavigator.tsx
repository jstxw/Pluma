/**
 * Root Navigator
 *
 * The top-level navigation container that wraps the entire app.
 * Provides the NavigationContainer and root stack navigator.
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Root Navigator component
 *
 * Wraps the app in NavigationContainer and provides the root stack.
 * The Main screen contains the TabNavigator which hosts all primary tabs.
 */
export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
