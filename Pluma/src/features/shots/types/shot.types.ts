/**
 * Shot Feature Type Definitions
 *
 * Re-exports core types from global types and defines
 * feature-specific types for the shots module.
 */

// =============================================================================
// Re-exports from Global Types
// =============================================================================

export type {
  Shot,
  TechniqueStep,
  Tag,
  Difficulty,
  TagCategory,
  ShotsResponse,
} from '../../../types';

// =============================================================================
// Filter Types
// =============================================================================

/**
 * Shot-specific filter options
 */
export interface ShotFilters {
  /** Search query for name/description */
  search?: string;
  /** Filter by difficulty level */
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  /** Filter by tag IDs */
  tags?: string[];
  /** Filter by shot category (forehand, backhand, etc.) */
  category?: string;
}

// =============================================================================
// State Types
// =============================================================================

/**
 * Shots feature state
 */
export interface ShotsState {
  /** List of shots */
  shots: import('../../../types').Shot[];
  /** Current filters */
  filters: ShotFilters;
  /** Loading state */
  isLoading: boolean;
  /** Error message if any */
  error: string | null;
  /** Currently selected shot ID */
  selectedShotId: string | null;
}

// =============================================================================
// Action Types
// =============================================================================

/**
 * Shots action types for state management
 */
export type ShotsAction =
  | { type: 'SET_SHOTS'; payload: import('../../../types').Shot[] }
  | { type: 'SET_FILTERS'; payload: Partial<ShotFilters> }
  | { type: 'RESET_FILTERS' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SELECT_SHOT'; payload: string | null };

// =============================================================================
// Hook Return Types
// =============================================================================

/**
 * Return type for useShots hook
 */
export interface UseShotsResult {
  /** Shots data */
  data: import('../../../types').ShotsResponse | undefined;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Refetch function */
  refetch: () => void;
}

/**
 * Return type for useShot hook (single shot)
 */
export interface UseShotResult {
  /** Shot data */
  data: import('../../../types').Shot | undefined;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
}

/**
 * Return type for useShotFilters hook
 */
export interface UseShotFiltersResult {
  /** Current filters */
  filters: ShotFilters;
  /** Update a single filter */
  updateFilter: <K extends keyof ShotFilters>(
    key: K,
    value: ShotFilters[K]
  ) => void;
  /** Reset all filters */
  resetFilters: () => void;
  /** Check if any filters are active */
  hasActiveFilters: boolean;
}

// =============================================================================
// Component Props Types
// =============================================================================

/**
 * ShotCard component props
 */
export interface ShotCardProps {
  /** Shot data */
  shot: import('../../../types').Shot;
  /** Press handler */
  onPress: (id: string) => void;
  /** Whether the shot is favorited */
  isFavorited?: boolean;
  /** Favorite toggle handler */
  onFavoritePress?: (id: string) => void;
}

/**
 * ShotFilters component props
 */
export interface ShotFiltersComponentProps {
  /** Current filters */
  filters: ShotFilters;
  /** Filter change handler */
  onFilterChange: <K extends keyof ShotFilters>(
    key: K,
    value: ShotFilters[K]
  ) => void;
}

/**
 * TechniqueStepList component props
 */
export interface TechniqueStepListProps {
  /** List of technique steps */
  steps: import('../../../types').TechniqueStep[];
  /** Whether to show step numbers */
  showNumbers?: boolean;
  /** Whether to show common mistakes */
  showMistakes?: boolean;
}

/**
 * TechniqueStepCard component props
 */
export interface TechniqueStepCardProps {
  /** Technique step data */
  step: import('../../../types').TechniqueStep;
  /** Step number to display */
  stepNumber: number;
  /** Whether to show common mistakes */
  showMistakes?: boolean;
}

// =============================================================================
// Related Drills Types
// =============================================================================

/**
 * Props for RelatedDrills component
 */
export interface RelatedDrillsProps {
  /** Array of related drill IDs */
  drillIds: string[];
  /** Handler when a drill is pressed */
  onDrillPress: (drillId: string) => void;
}
