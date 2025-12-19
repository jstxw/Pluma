/**
 * React Query Provider
 *
 * Provides React Query client for server state management.
 * Configures caching, refetching, and error handling defaults.
 */

import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * Query client configuration
 *
 * Default options:
 * - staleTime: 5 minutes - data is fresh for 5 minutes before refetch
 * - gcTime: 10 minutes - unused data is garbage collected after 10 minutes
 * - retry: 2 - retry failed requests twice
 * - refetchOnWindowFocus: false - don't refetch on app focus (mobile)
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is fresh for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Garbage collect unused data after 10 minutes
      gcTime: 10 * 60 * 1000,
      // Retry failed requests twice
      retry: 2,
      // Don't refetch when app comes to foreground
      refetchOnWindowFocus: false,
      // Don't refetch on mount if data is fresh
      refetchOnMount: false,
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
    },
  },
});

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * Query Provider component
 *
 * Wraps the app and provides React Query client for data fetching.
 * Use useQuery and useMutation hooks to interact with the cache.
 *
 * @example
 * ```tsx
 * // In a component
 * const { data, isLoading } = useQuery({
 *   queryKey: ['drills'],
 *   queryFn: fetchDrills,
 * });
 * ```
 */
export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

/**
 * Export query client for use outside of React components
 * (e.g., for prefetching or cache manipulation)
 */
export { queryClient };
