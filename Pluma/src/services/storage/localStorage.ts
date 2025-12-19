/**
 * Local storage service using AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  FAVORITES: '@pluma/favorites',
  FILTER_PREFERENCES: '@pluma/filter_preferences',
  COMPLETED_DRILLS: '@pluma/completed_drills',
  USER_SETTINGS: '@pluma/user_settings',
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

async function getItem<T>(key: StorageKey): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error reading ${key} from storage:`, error);
    return null;
  }
}

async function setItem<T>(key: StorageKey, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to storage:`, error);
  }
}

async function removeItem(key: StorageKey): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from storage:`, error);
  }
}

// Favorites
export async function getFavorites(): Promise<string[]> {
  return (await getItem<string[]>(STORAGE_KEYS.FAVORITES)) || [];
}

export async function addFavorite(drillId: string): Promise<void> {
  const favorites = await getFavorites();
  if (!favorites.includes(drillId)) {
    await setItem(STORAGE_KEYS.FAVORITES, [...favorites, drillId]);
  }
}

export async function removeFavorite(drillId: string): Promise<void> {
  const favorites = await getFavorites();
  await setItem(
    STORAGE_KEYS.FAVORITES,
    favorites.filter((id) => id !== drillId)
  );
}

export async function isFavorite(drillId: string): Promise<boolean> {
  const favorites = await getFavorites();
  return favorites.includes(drillId);
}

// Completed Drills
export async function getCompletedDrills(): Promise<string[]> {
  return (await getItem<string[]>(STORAGE_KEYS.COMPLETED_DRILLS)) || [];
}

export async function markDrillCompleted(drillId: string): Promise<void> {
  const completed = await getCompletedDrills();
  if (!completed.includes(drillId)) {
    await setItem(STORAGE_KEYS.COMPLETED_DRILLS, [...completed, drillId]);
  }
}

export { STORAGE_KEYS };
