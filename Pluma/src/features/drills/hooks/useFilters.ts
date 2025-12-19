/**
 * Hook for managing drill filters state
 *
 * Provides filter state management with support for:
 * - Search queries
 * - Difficulty filtering
 * - Drill type filtering
 * - Tag-based filtering
 * - Duration range filtering
 */

import { useState, useCallback, useMemo } from 'react';
import type { DrillFilters, UseFiltersResult, Difficulty, DrillType } from '../types';

// =============================================================================
// Constants
// =============================================================================

const initialFilters: DrillFilters = {
  search: undefined,
  difficulty: undefined,
  type: undefined,
  tags: undefined,
  minDuration: undefined,
  maxDuration: undefined,
};

// =============================================================================
// Hook
// =============================================================================

/**
 * Hook for managing drill filter state
 *
 * @param defaultFilters - Optional initial filter values
 * @returns Filter state and update functions
 *
 * @example
 * ```tsx
 * const { filters, updateFilter, resetFilters, hasActiveFilters } = useFilters();
 *
 * // Update a single filter
 * updateFilter('difficulty', 'beginner');
 *
 * // Toggle a tag
 * toggleTag('tag-footwork');
 *
 * // Reset all filters
 * resetFilters();
 * ```
 */
export function useFilters(defaultFilters?: Partial<DrillFilters>): UseFiltersResult & {
  setFilters: React.Dispatch<React.SetStateAction<DrillFilters>>;
  toggleTag: (tagId: string) => void;
  setSearch: (search: string) => void;
  setDifficulty: (difficulty: Difficulty | undefined) => void;
  setType: (type: DrillType | undefined) => void;
  setDurationRange: (min?: number, max?: number) => void;
  activeFilterCount: number;
} {
  const [filters, setFilters] = useState<DrillFilters>({
    ...initialFilters,
    ...defaultFilters,
  });

  // Update a single filter by key
  const updateFilter = useCallback(
    <K extends keyof DrillFilters>(key: K, value: DrillFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Reset all filters to initial state
  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  // Toggle a tag in the tags array
  const toggleTag = useCallback((tagId: string) => {
    setFilters((prev) => {
      const currentTags = prev.tags ?? [];
      const hasTag = currentTags.includes(tagId);

      return {
        ...prev,
        tags: hasTag
          ? currentTags.filter((id) => id !== tagId)
          : [...currentTags, tagId],
      };
    });
  }, []);

  // Convenience setter for search
  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({
      ...prev,
      search: search.trim() || undefined,
    }));
  }, []);

  // Convenience setter for difficulty
  const setDifficulty = useCallback((difficulty: Difficulty | undefined) => {
    setFilters((prev) => ({ ...prev, difficulty }));
  }, []);

  // Convenience setter for type
  const setType = useCallback((type: DrillType | undefined) => {
    setFilters((prev) => ({ ...prev, type }));
  }, []);

  // Set duration range
  const setDurationRange = useCallback((min?: number, max?: number) => {
    setFilters((prev) => ({
      ...prev,
      minDuration: min,
      maxDuration: max,
    }));
  }, []);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return Boolean(
      filters.search ||
        filters.difficulty ||
        filters.type ||
        (filters.tags && filters.tags.length > 0) ||
        filters.minDuration !== undefined ||
        filters.maxDuration !== undefined
    );
  }, [filters]);

  // Count active filters (useful for badge display)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.difficulty) count++;
    if (filters.type) count++;
    if (filters.tags && filters.tags.length > 0) count += filters.tags.length;
    if (filters.minDuration !== undefined || filters.maxDuration !== undefined) count++;
    return count;
  }, [filters]);

  return {
    filters,
    setFilters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
    toggleTag,
    setSearch,
    setDifficulty,
    setType,
    setDurationRange,
    activeFilterCount,
  };
}

/**
 * Hook for managing a debounced search input
 * Useful for search-as-you-type functionality
 *
 * @param delay - Debounce delay in milliseconds (default: 300)
 * @returns Debounced search state and handlers
 *
 * @example
 * ```tsx
 * const { searchInput, debouncedSearch, setSearchInput, clearSearch } = useDebouncedSearch();
 *
 * <SearchBar
 *   value={searchInput}
 *   onChangeText={setSearchInput}
 *   onClear={clearSearch}
 * />
 *
 * // Use debouncedSearch in your query
 * const { data } = useDrills({ search: debouncedSearch });
 * ```
 */
export function useDebouncedSearch(delay = 300) {
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchInput(value);

      // Clear existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set new timeout
      const newTimeoutId = setTimeout(() => {
        setDebouncedSearch(value.trim());
      }, delay);

      setTimeoutId(newTimeoutId);
    },
    [delay, timeoutId]
  );

  const clearSearch = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setSearchInput('');
    setDebouncedSearch('');
  }, [timeoutId]);

  return {
    searchInput,
    debouncedSearch,
    setSearchInput: handleSearchChange,
    clearSearch,
  };
}
