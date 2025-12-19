/**
 * Favorites Provider
 *
 * Manages favorite drills state with AsyncStorage persistence.
 * Provides context for accessing and modifying favorites across the app.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from '../../services/storage/localStorage';

interface FavoritesContextType {
  /** Array of favorited drill IDs */
  favorites: string[];
  /** Whether favorites are still loading from storage */
  isLoading: boolean;
  /** Check if a drill is favorited */
  isFavorite: (drillId: string) => boolean;
  /** Toggle favorite status for a drill */
  toggleFavorite: (drillId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load favorites from storage on mount
  useEffect(() => {
    async function loadFavorites() {
      try {
        const storedFavorites = await getFavorites();
        setFavorites(storedFavorites);
      } catch (error) {
        console.error('Failed to load favorites:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadFavorites();
  }, []);

  const isFavorite = useCallback(
    (drillId: string) => favorites.includes(drillId),
    [favorites]
  );

  const toggleFavorite = useCallback(async (drillId: string) => {
    setFavorites((prev) => {
      const isCurrentlyFavorite = prev.includes(drillId);

      if (isCurrentlyFavorite) {
        // Remove from favorites
        removeFavorite(drillId);
        return prev.filter((id) => id !== drillId);
      } else {
        // Add to favorites
        addFavorite(drillId);
        return [...prev, drillId];
      }
    });
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isLoading,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

/**
 * Hook to access favorites context
 */
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
