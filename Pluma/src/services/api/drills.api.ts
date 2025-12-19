/**
 * Drills API service
 */

import { apiClient } from './client';
import type { Drill, Tag } from '../../types';

export interface DrillFilters {
  difficulty?: Drill['difficulty'];
  type?: Drill['type'];
  tags?: string[];
  search?: string;
}

interface DrillsResponse {
  drills: Drill[];
  total: number;
  page: number;
  pageSize: number;
}

export async function fetchDrills(filters?: DrillFilters): Promise<DrillsResponse> {
  const params = new URLSearchParams();

  if (filters?.difficulty) params.append('difficulty', filters.difficulty);
  if (filters?.type) params.append('type', filters.type);
  if (filters?.tags?.length) params.append('tags', filters.tags.join(','));
  if (filters?.search) params.append('search', filters.search);

  const query = params.toString();
  const endpoint = `/drills${query ? `?${query}` : ''}`;

  return apiClient.get<DrillsResponse>(endpoint);
}

export async function fetchDrillById(id: string): Promise<Drill> {
  return apiClient.get<Drill>(`/drills/${id}`);
}

export async function fetchDrillTags(): Promise<Tag[]> {
  return apiClient.get<Tag[]>('/drills/tags');
}
