/**
 * Hooks for fetching and managing shots data
 *
 * Uses mock data for development. Replace with API calls when backend is ready.
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { mockShots, mockShotTags, getShotById } from '../data/mockShots';
import type {
  Shot,
  ShotFilters,
  UseShotsResult,
  UseShotResult,
  Tag,
} from '../types';
import type { ShotsResponse } from '../../../types';

// =============================================================================
// Query Keys
// =============================================================================

export const shotsKeys = {
  all: ['shots'] as const,
  lists: () => [...shotsKeys.all, 'list'] as const,
  list: (filters: ShotFilters) => [...shotsKeys.lists(), filters] as const,
  details: () => [...shotsKeys.all, 'detail'] as const,
  detail: (id: string) => [...shotsKeys.details(), id] as const,
  tags: () => [...shotsKeys.all, 'tags'] as const,
  relatedDrills: (shotId: string) => [...shotsKeys.all, 'relatedDrills', shotId] as const,
};

// =============================================================================
// Mock Data Fetchers (simulates API calls)
// =============================================================================

/**
 * Simulates fetching shots with filters
 * Adds artificial delay to mimic network latency
 */
async function fetchShotsMock(filters?: ShotFilters): Promise<ShotsResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  let filteredShots = [...mockShots];

  // Apply search filter
  if (filters?.search && filters.search.trim()) {
    const query = filters.search.toLowerCase();
    filteredShots = filteredShots.filter(
      (shot) =>
        shot.name.toLowerCase().includes(query) ||
        shot.description.toLowerCase().includes(query)
    );
  }

  // Apply difficulty filter
  if (filters?.difficulty) {
    filteredShots = filteredShots.filter(
      (shot) => shot.difficulty === filters.difficulty
    );
  }

  // Apply category filter (by tag category)
  if (filters?.category) {
    filteredShots = filteredShots.filter((shot) =>
      shot.tags.some(
        (tag) =>
          tag.category === 'shot_category' &&
          tag.id === filters.category
      )
    );
  }

  // Apply tags filter
  if (filters?.tags && filters.tags.length > 0) {
    filteredShots = filteredShots.filter((shot) =>
      filters.tags!.some((tagId) =>
        shot.tags.some((tag) => tag.id === tagId)
      )
    );
  }

  return {
    shots: filteredShots,
    total: filteredShots.length,
  };
}

/**
 * Simulates fetching a single shot by ID
 */
async function fetchShotByIdMock(id: string): Promise<Shot | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  return getShotById(id) ?? null;
}

/**
 * Simulates fetching all available tags for shots
 */
async function fetchShotTagsMock(): Promise<Tag[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return mockShotTags;
}

// =============================================================================
// Hooks
// =============================================================================

/**
 * Hook for fetching shots with optional filters
 *
 * @param filters - Optional filters to apply
 * @returns Query result with shots data
 *
 * @example
 * ```tsx
 * const { data, isLoading, error, refetch } = useShots({ difficulty: 'beginner' });
 * ```
 */
export function useShots(filters?: ShotFilters): UseShotsResult {
  const query = useQuery({
    queryKey: shotsKeys.list(filters ?? {}),
    queryFn: () => fetchShotsMock(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

/**
 * Hook for fetching a single shot by ID
 *
 * @param id - Shot ID to fetch
 * @returns Query result with shot data
 *
 * @example
 * ```tsx
 * const { data: shot, isLoading, error } = useShot('shot-1');
 * ```
 */
export function useShot(id: string): UseShotResult {
  const query = useQuery({
    queryKey: shotsKeys.detail(id),
    queryFn: () => fetchShotByIdMock(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  return {
    data: query.data ?? undefined,
    isLoading: query.isLoading,
    error: query.error,
  };
}

/**
 * Hook for fetching all available tags for shots
 *
 * @returns Query result with tags data
 *
 * @example
 * ```tsx
 * const { data: tags, isLoading } = useShotTags();
 * ```
 */
export function useShotTags() {
  return useQuery({
    queryKey: shotsKeys.tags(),
    queryFn: fetchShotTagsMock,
    staleTime: 30 * 60 * 1000, // 30 minutes - tags rarely change
  });
}

/**
 * Hook for fetching related drill IDs for a shot
 *
 * @param shotId - Shot ID to get related drills for
 * @returns Query result with related drill IDs
 *
 * @example
 * ```tsx
 * const { data: drillIds } = useRelatedDrills('shot-1');
 * ```
 */
export function useRelatedDrills(shotId: string) {
  return useQuery({
    queryKey: shotsKeys.relatedDrills(shotId),
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const shot = getShotById(shotId);
      return shot?.relatedDrills ?? [];
    },
    enabled: !!shotId,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for prefetching shot data
 * Useful for preloading shot details on hover or scroll
 *
 * @returns prefetch function
 *
 * @example
 * ```tsx
 * const { prefetchShot } = usePrefetchShot();
 * // On card hover:
 * prefetchShot('shot-1');
 * ```
 */
export function usePrefetchShot() {
  const queryClient = useQueryClient();

  const prefetchShot = async (id: string) => {
    await queryClient.prefetchQuery({
      queryKey: shotsKeys.detail(id),
      queryFn: () => fetchShotByIdMock(id),
      staleTime: 5 * 60 * 1000,
    });
  };

  return { prefetchShot };
}

/**
 * Hook for invalidating shots cache
 * Useful after mutations
 *
 * @returns invalidate functions
 */
export function useInvalidateShots() {
  const queryClient = useQueryClient();

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: shotsKeys.all });
  };

  const invalidateLists = () => {
    queryClient.invalidateQueries({ queryKey: shotsKeys.lists() });
  };

  const invalidateShot = (id: string) => {
    queryClient.invalidateQueries({ queryKey: shotsKeys.detail(id) });
  };

  return { invalidateAll, invalidateLists, invalidateShot };
}
