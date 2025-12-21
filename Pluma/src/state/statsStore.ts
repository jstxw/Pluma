import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StatsState {
  // State
  drillsCompleted: number;
  lastOpenedAt: string;
  completedDates: string[]; // Array of ISO date strings (YYYY-MM-DD)
  hasHydrated: boolean;

  // Actions
  incrementDrillsCompleted: (by?: number) => void;
  logDrillForToday: () => void;
  setLastOpenedNow: () => void;
  resetStats: () => void;
  setHasHydrated: (state: boolean) => void;
}

const STORAGE_KEY = 'pluma_stats_v1';
const STORAGE_VERSION = 1;

export const useStatsStore = create<StatsState>()(
  persist(
    (set) => ({
      // Initial state
      drillsCompleted: 0,
      lastOpenedAt: new Date().toISOString(),
      completedDates: [],
      hasHydrated: false,

      // Actions
      incrementDrillsCompleted: (by = 1) =>
        set((state) => ({
          drillsCompleted: state.drillsCompleted + by,
        })),

      logDrillForToday: () =>
        set((state) => {
          const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
          
          // Only add if not already present
          if (!state.completedDates.includes(today)) {
            return {
              completedDates: [...state.completedDates, today],
            };
          }
          return state;
        }),

      setLastOpenedNow: () =>
        set({
          lastOpenedAt: new Date().toISOString(),
        }),

      resetStats: () =>
        set({
          drillsCompleted: 0,
          completedDates: [],
          lastOpenedAt: new Date().toISOString(),
        }),

      setHasHydrated: (state: boolean) =>
        set({
          hasHydrated: state,
        }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      version: STORAGE_VERSION,
      // Migration stub for future schema changes
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Example migration from v0 to v1
          // return { ...persistedState, newField: 'default' };
        }
        return persistedState;
      },
      onRehydrateStorage: () => (state) => {
        // Set hydration flag once storage is loaded
        state?.setHasHydrated(true);
      },
      // Only persist these fields (exclude hasHydrated)
      partialize: (state) => ({
        drillsCompleted: state.drillsCompleted,
        completedDates: state.completedDates,
        lastOpenedAt: state.lastOpenedAt,
      }),
    }
  )
);
