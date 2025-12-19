/**
 * Formatting utilities
 */

/**
 * Format duration in minutes to a readable string
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

/**
 * Format difficulty level with proper capitalization
 */
export function formatDifficulty(
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): string {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}

/**
 * Format drill type with proper labeling
 */
export function formatDrillType(type: 'shot' | 'footwork' | 'combination'): string {
  const labels: Record<string, string> = {
    shot: 'Shot Technique',
    footwork: 'Footwork',
    combination: 'Combination',
  };
  return labels[type] || type;
}

/**
 * Truncate text to a maximum length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

/**
 * Format a count with proper pluralization
 */
export function formatCount(count: number, singular: string, plural?: string): string {
  const pluralForm = plural || `${singular}s`;
  return `${count} ${count === 1 ? singular : pluralForm}`;
}
