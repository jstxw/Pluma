/**
 * Drill Feature Type Definitions
 *
 * Re-exports core types from global types and defines
 * feature-specific types for the drills module.
 */

// =============================================================================
// Re-exports from Global Types
// =============================================================================

export type {
  Drill,
  Instruction,
  Tag,
  Difficulty,
  DrillType,
  TagCategory,
  DrillsResponse,
} from '../../../types';

// =============================================================================
// Filter Types
// =============================================================================

/**
 * Drill-specific filter options
 */
export interface DrillFilters {
  /** Search query for title/description */
  search?: string;
  /** Filter by difficulty level */
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  /** Filter by drill type */
  type?: 'shot' | 'footwork' | 'rally';
  /** Filter by tag IDs */
  tags?: string[];
  /** Filter by minimum duration (minutes) */
  minDuration?: number;
  /** Filter by maximum duration (minutes) */
  maxDuration?: number;
}

// =============================================================================
// State Types
// =============================================================================

/**
 * Drills feature state
 */
export interface DrillsState {
  /** List of drills */
  drills: import('../../../types').Drill[];
  /** Current filters */
  filters: DrillFilters;
  /** Loading state */
  isLoading: boolean;
  /** Error message if any */
  error: string | null;
  /** Currently selected drill ID */
  selectedDrillId: string | null;
}

// =============================================================================
// Action Types
// =============================================================================

/**
 * Drills action types for state management
 */
export type DrillsAction =
  | { type: 'SET_DRILLS'; payload: import('../../../types').Drill[] }
  | { type: 'SET_FILTERS'; payload: Partial<DrillFilters> }
  | { type: 'RESET_FILTERS' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SELECT_DRILL'; payload: string | null };

// =============================================================================
// Hook Return Types
// =============================================================================

/**
 * Return type for useDrills hook
 */
export interface UseDrillsResult {
  /** Drills data */
  data: import('../../../types').DrillsResponse | undefined;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Refetch function */
  refetch: () => void;
}

/**
 * Return type for useDrill hook (single drill)
 */
export interface UseDrillResult {
  /** Drill data */
  data: import('../../../types').Drill | undefined;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
}

/**
 * Return type for useFilters hook
 */
export interface UseFiltersResult {
  /** Current filters */
  filters: DrillFilters;
  /** Update a single filter */
  updateFilter: <K extends keyof DrillFilters>(
    key: K,
    value: DrillFilters[K]
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
 * DrillCard component props
 */
export interface DrillCardProps {
  /** Drill data */
  drill: import('../../../types').Drill;
  /** Press handler */
  onPress: (id: string) => void;
  /** Whether the drill is favorited */
  isFavorited?: boolean;
  /** Favorite toggle handler */
  onFavoritePress?: (id: string) => void;
}

/**
 * DrillFilters component props
 */
export interface DrillFiltersProps {
  /** Current filters */
  filters: DrillFilters;
  /** Filter change handler */
  onFilterChange: <K extends keyof DrillFilters>(
    key: K,
    value: DrillFilters[K]
  ) => void;
}

/**
 * InstructionList component props
 */
export interface InstructionListProps {
  /** List of instructions */
  instructions: import('../../../types').Instruction[];
  /** Whether to show step numbers */
  showNumbers?: boolean;
}
