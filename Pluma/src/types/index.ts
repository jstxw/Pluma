/**
 * Global Type Definitions for Pluma
 *
 * Core data models based on ARCHITECTURE.md specifications.
 * These types are shared across features and should be imported from here.
 */

// =============================================================================
// Enums and Union Types
// =============================================================================

/**
 * Difficulty levels for drills and shots
 */
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

/**
 * Types of drills available
 */
export type DrillType = 'shot' | 'footwork' | 'combination';

/**
 * Categories for organizing tags
 */
export type TagCategory =
  | 'skill_level'
  | 'drill_type'
  | 'shot_category'
  | 'court_position'
  | 'training_focus';

// =============================================================================
// Tag Model
// =============================================================================

/**
 * Tag for categorizing drills and shots
 *
 * @example
 * ```ts
 * const tag: Tag = {
 *   id: 'tag-1',
 *   name: 'Forehand',
 *   category: 'shot_category',
 * };
 * ```
 */
export interface Tag {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Category for grouping tags */
  category: TagCategory;
}

// =============================================================================
// Instruction Model
// =============================================================================

/**
 * Single instruction step within a drill
 *
 * @example
 * ```ts
 * const instruction: Instruction = {
 *   id: 'inst-1',
 *   order: 1,
 *   text: 'Start in ready position at the center of the court',
 *   imageUrl: 'https://example.com/ready-position.jpg',
 * };
 * ```
 */
export interface Instruction {
  /** Unique identifier */
  id: string;
  /** Display order (1-indexed) */
  order: number;
  /** Instruction text */
  text: string;
  /** Optional image URL for visual reference */
  imageUrl?: string;
  /** Optional video URL for demonstration */
  videoUrl?: string;
}

// =============================================================================
// Drill Model
// =============================================================================

/**
 * Complete drill definition
 *
 * @example
 * ```ts
 * const drill: Drill = {
 *   id: 'drill-1',
 *   title: 'Shadow Footwork',
 *   description: 'Practice court coverage without a shuttlecock',
 *   instructions: [...],
 *   tags: [...],
 *   difficulty: 'beginner',
 *   type: 'footwork',
 *   estimatedDuration: 15,
 *   createdAt: new Date(),
 *   updatedAt: new Date(),
 * };
 * ```
 */
export interface Drill {
  /** Unique identifier */
  id: string;
  /** Drill title */
  title: string;
  /** Brief description of the drill */
  description: string;
  /** Ordered list of instructions */
  instructions: Instruction[];
  /** Associated tags for filtering */
  tags: Tag[];
  /** Skill level required */
  difficulty: Difficulty;
  /** Type of drill */
  type: DrillType;
  /** Estimated duration in minutes */
  estimatedDuration?: number;
  /** Cover image URL */
  imageUrl?: string;
  /** Demonstration video URL */
  videoUrl?: string;
  /** When the drill was created */
  createdAt: Date;
  /** When the drill was last updated */
  updatedAt: Date;
}

// =============================================================================
// TechniqueStep Model
// =============================================================================

/**
 * Single technique step within a shot
 *
 * @example
 * ```ts
 * const step: TechniqueStep = {
 *   id: 'step-1',
 *   order: 1,
 *   title: 'Grip',
 *   description: 'Hold the racket with a relaxed forehand grip',
 *   keyPoints: ['V-shape between thumb and index finger', 'Relaxed grip pressure'],
 *   commonMistakes: ['Gripping too tightly', 'Wrong grip angle'],
 * };
 * ```
 */
export interface TechniqueStep {
  /** Unique identifier */
  id: string;
  /** Display order (1-indexed) */
  order: number;
  /** Step title */
  title: string;
  /** Detailed description */
  description: string;
  /** Key points to remember */
  keyPoints: string[];
  /** Common mistakes to avoid */
  commonMistakes?: string[];
  /** Optional image URL for visual reference */
  imageUrl?: string;
  /** Optional video URL for demonstration */
  videoUrl?: string;
}

// =============================================================================
// Shot Model
// =============================================================================

/**
 * Complete shot definition
 *
 * @example
 * ```ts
 * const shot: Shot = {
 *   id: 'shot-1',
 *   name: 'Clear',
 *   description: 'A high, deep shot to the back of the court',
 *   technique: [...],
 *   tags: [...],
 *   difficulty: 'beginner',
 *   relatedDrills: ['drill-1', 'drill-2'],
 * };
 * ```
 */
export interface Shot {
  /** Unique identifier */
  id: string;
  /** Shot name */
  name: string;
  /** Brief description of the shot */
  description: string;
  /** Ordered list of technique steps */
  technique: TechniqueStep[];
  /** Associated tags for filtering */
  tags: Tag[];
  /** Skill level required */
  difficulty: Difficulty;
  /** IDs of related drills that practice this shot */
  relatedDrills?: string[];
  /** Cover image URL */
  imageUrl?: string;
  /** Demonstration video URL */
  videoUrl?: string;
}

// =============================================================================
// API Response Types
// =============================================================================

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  /** Response data */
  data: T;
  /** Success status */
  success: boolean;
  /** Optional error message */
  error?: string;
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> {
  /** Array of items */
  items: T[];
  /** Total number of items */
  total: number;
  /** Current page (1-indexed) */
  page: number;
  /** Items per page */
  pageSize: number;
  /** Whether there are more pages */
  hasMore: boolean;
}

/**
 * Drills list API response
 */
export interface DrillsResponse {
  /** Array of drills */
  drills: Drill[];
  /** Total count */
  total: number;
}

/**
 * Shots list API response
 */
export interface ShotsResponse {
  /** Array of shots */
  shots: Shot[];
  /** Total count */
  total: number;
}

// =============================================================================
// Filter Types
// =============================================================================

/**
 * Base filter options
 */
export interface BaseFilters {
  /** Search query */
  search?: string;
  /** Difficulty filter */
  difficulty?: Difficulty;
  /** Tag IDs to filter by */
  tags?: string[];
}

// =============================================================================
// User Preferences Types
// =============================================================================

/**
 * User preferences stored locally
 */
export interface UserPreferences {
  /** IDs of favorited drills */
  favoriteDrills: string[];
  /** IDs of favorited shots */
  favoriteShots: string[];
  /** IDs of completed drills */
  completedDrills: string[];
  /** Last selected filters */
  lastFilters?: BaseFilters;
}

// =============================================================================
// Utility Types
// =============================================================================

/**
 * Make specific properties optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make specific properties required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Extract ID type from an entity
 */
export type EntityId = string;
