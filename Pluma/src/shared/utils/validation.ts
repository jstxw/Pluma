/**
 * Validation utilities
 */

export function isValidId(id: unknown): id is string {
  return typeof id === 'string' && id.length > 0;
}

export function isValidUrl(url: unknown): url is string {
  if (typeof url !== 'string') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isNonEmptyArray<T>(arr: unknown): arr is T[] {
  return Array.isArray(arr) && arr.length > 0;
}
