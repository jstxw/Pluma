/**
 * Hooks for fetching and managing drills data
 *
 * Uses mock data for development. Replace with API calls when backend is ready.
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { mockDrills, mockTags, getDrillById } from '../data/mockDrills';
import type {
  Drill,
  DrillFilters,
  UseDrillsResult,
  UseDrillResult,
  Tag,
} from '../types';
import type { DrillsResponse } from '../../../types';

// =============================================================================
// Query Keys
// =============================================================================

export const drillsKeys = {
  all: ['drills'] as const,
  lists: () => [...drillsKeys.all, 'list'] as const,
  list: (filters: DrillFilters) => [...drillsKeys.lists(), filters] as const,
  details: () => [...drillsKeys.all, 'detail'] as const,
  detail: (id: string) => [...drillsKeys.details(), id] as const,
  tags: () => [...drillsKeys.all, 'tags'] as const,
};

// =============================================================================
// Mock Data Fetchers (simulates API calls)
// =============================================================================

/**
 * Simulates fetching drills with filters
 * Adds artificial delay to mimic network latency
 */
async function fetchDrillsMock(filters?: DrillFilters): Promise<DrillsResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  let filteredDrills = [...mockDrills];

  // Apply search filter
  if (filters?.search && filters.search.trim()) {
    const query = filters.search.toLowerCase();
    filteredDrills = filteredDrills.filter(
      (drill) =>
        drill.title.toLowerCase().includes(query) ||
        drill.description.toLowerCase().includes(query)
    );
  }

  // Apply difficulty filter
  if (filters?.difficulty) {
    filteredDrills = filteredDrills.filter(
      (drill) => drill.difficulty === filters.difficulty
    );
  }

  // Apply type filter
  if (filters?.type) {
    filteredDrills = filteredDrills.filter(
      (drill) => drill.type === filters.type
    );
  }

  // Apply tags filter
  if (filters?.tags && filters.tags.length > 0) {
    filteredDrills = filteredDrills.filter((drill) =>
      filters.tags!.some((tagId) =>
        drill.tags.some((tag) => tag.id === tagId)
      )
    );
  }

  // Apply duration filters
  if (filters?.minDuration !== undefined) {
    filteredDrills = filteredDrills.filter(
      (drill) =>
        drill.estimatedDuration !== undefined &&
        drill.estimatedDuration >= filters.minDuration!
    );
  }

  if (filters?.maxDuration !== undefined) {
    filteredDrills = filteredDrills.filter(
      (drill) =>
        drill.estimatedDuration !== undefined &&
        drill.estimatedDuration <= filters.maxDuration!
    );
  }

  return {
    drills: filteredDrills,
    total: filteredDrills.length,
  };
}

/**
 * Simulates fetching a single drill by ID
 */
async function fetchDrillByIdMock(id: string): Promise<Drill | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  return getDrillById(id) ?? null;
}

/**
 * Simulates fetching all available tags
 */
async function fetchTagsMock(): Promise<Tag[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return mockTags;
}

// =============================================================================
// Hooks
// =============================================================================

/**
 * Hook for fetching drills with optional filters
 *
 * @param filters - Optional filters to apply
 * @returns Query result with drills data
 *
 * @example
 * ```tsx
 * const { data, isLoading, error, refetch } = useDrills({ difficulty: 'beginner' });
 * ```
 */
export function useDrills(filters?: DrillFilters): UseDrillsResult {
  const query = useQuery({
    queryKey: drillsKeys.list(filters ?? {}),
    queryFn: () => fetchDrillsMock(filters),
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
 * Hook for fetching a single drill by ID
 *
 * @param id - Drill ID to fetch
 * @returns Query result with drill data
 *
 * @example
 * ```tsx
 * const { data: drill, isLoading, error } = useDrill('drill-1');
 * ```
 */
export function useDrill(id: string): UseDrillResult {
  const query = useQuery({
    queryKey: drillsKeys.detail(id),
    queryFn: () => fetchDrillByIdMock(id),
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
 * Hook for fetching all available tags
 *
 * @returns Query result with tags data
 *
 * @example
 * ```tsx
 * const { data: tags, isLoading } = useDrillTags();
 * ```
 */
export function useDrillTags() {
  return useQuery({
    queryKey: drillsKeys.tags(),
    queryFn: fetchTagsMock,
    staleTime: 30 * 60 * 1000, // 30 minutes - tags rarely change
  });
}

/**
 * Hook for prefetching drill data
 * Useful for preloading drill details on hover or scroll
 *
 * @returns prefetch function
 *
 * @example
 * ```tsx
 * const { prefetchDrill } = usePrefetchDrill();
 * // On card hover:
 * prefetchDrill('drill-1');
 * ```
 */
export function usePrefetchDrill() {
  const queryClient = useQueryClient();

  const prefetchDrill = async (id: string) => {
    await queryClient.prefetchQuery({
      queryKey: drillsKeys.detail(id),
      queryFn: () => fetchDrillByIdMock(id),
      staleTime: 5 * 60 * 1000,
    });
  };

  return { prefetchDrill };
}

/**
 * Hook for invalidating drills cache
 * Useful after mutations
 *
 * @returns invalidate functions
 */
export function useInvalidateDrills() {
  const queryClient = useQueryClient();

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: drillsKeys.all });
  };

  const invalidateLists = () => {
    queryClient.invalidateQueries({ queryKey: drillsKeys.lists() });
  };

  const invalidateDrill = (id: string) => {
    queryClient.invalidateQueries({ queryKey: drillsKeys.detail(id) });
  };

  return { invalidateAll, invalidateLists, invalidateDrill };
}
