/**
 * Drill Tracker Provider
 *
 * Manages drill completion tracking state globally.
 * Tracks which drills have been logged as completed today.
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import { useStatsStore } from '../../state/statsStore';

interface DrillTrackerContextType {
  /** Number of drills completed */
  completedCount: number;
  /** Set of completed drill IDs (to prevent double-logging same drill) */
  completedDrillIds: Set<string>;
  /** Log a drill as completed */
  logDrill: (drillId: string) => void;
  /** Check if a drill has been logged */
  isDrillLogged: (drillId: string) => boolean;
  /** Reset the tracker (for new day/session) */
  resetTracker: () => void;
}

const DrillTrackerContext = createContext<DrillTrackerContextType | undefined>(undefined);

interface DrillTrackerProviderProps {
  children: React.ReactNode;
}

export function DrillTrackerProvider({ children }: DrillTrackerProviderProps) {
  const [completedDrillIds, setCompletedDrillIds] = useState<Set<string>>(new Set());
  const incrementDrillsCompleted = useStatsStore((state) => state.incrementDrillsCompleted);
  const logDrillForToday = useStatsStore((state) => state.logDrillForToday);

  const completedCount = completedDrillIds.size;

  const isDrillLogged = useCallback(
    (drillId: string) => completedDrillIds.has(drillId),
    [completedDrillIds]
  );

  const logDrill = useCallback((drillId: string) => {
    setCompletedDrillIds((prev) => {
      if (prev.has(drillId)) {
        return prev; // Already logged
      }
      const newSet = new Set(prev);
      newSet.add(drillId);
      
      // Increment persistent stats count
      incrementDrillsCompleted(1);
      
      // Log today's date for calendar
      logDrillForToday();
      
      return newSet;
    });
  }, [incrementDrillsCompleted, logDrillForToday]);

  const resetTracker = useCallback(() => {
    setCompletedDrillIds(new Set());
  }, []);

  return (
    <DrillTrackerContext.Provider
      value={{
        completedCount,
        completedDrillIds,
        logDrill,
        isDrillLogged,
        resetTracker,
      }}
    >
      {children}
    </DrillTrackerContext.Provider>
  );
}

/**
 * Hook to access drill tracker context
 */
export function useDrillTracker() {
  const context = useContext(DrillTrackerContext);
  if (context === undefined) {
    throw new Error('useDrillTracker must be used within a DrillTrackerProvider');
  }
  return context;
}
