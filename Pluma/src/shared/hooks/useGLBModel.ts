/**
 * useGLBModel - Hook for loading and managing GLB 3D models
 *
 * Handles:
 * - Asset loading with expo-asset
 * - Loading state management
 * - Error handling
 * - Cleanup on unmount
 */

import { useState, useEffect, useCallback } from 'react';
import { Asset } from 'expo-asset';

interface UseGLBModelResult {
  /** Local URI of the loaded model */
  modelUri: string | null;
  /** Whether the model is currently loading */
  isLoading: boolean;
  /** Error message if loading failed */
  error: string | null;
  /** Reload the model */
  reload: () => void;
}

/**
 * Hook to load a GLB model from a local asset or remote URL
 *
 * @param source - Either a require() for local asset or a URL string
 * @returns Object with modelUri, isLoading, error, and reload function
 *
 * @example
 * // Local asset
 * const { modelUri, isLoading } = useGLBModel(require('../../../assets/models/character.glb'));
 *
 * // Remote URL
 * const { modelUri, isLoading } = useGLBModel('https://example.com/model.glb');
 */
export function useGLBModel(source: number | string): UseGLBModelResult {
  const [modelUri, setModelUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadModel = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (typeof source === 'string') {
        // Remote URL - use directly
        setModelUri(source);
      } else {
        // Local asset - need to resolve URI
        const asset = Asset.fromModule(source);
        await asset.downloadAsync();

        if (asset.localUri) {
          setModelUri(asset.localUri);
        } else {
          throw new Error('Failed to get local URI for model');
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load model';
      setError(message);
      console.error('useGLBModel error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [source]);

  useEffect(() => {
    loadModel();
  }, [loadModel]);

  const reload = useCallback(() => {
    loadModel();
  }, [loadModel]);

  return {
    modelUri,
    isLoading,
    error,
    reload,
  };
}
