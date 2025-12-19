/**
 * API client configuration
 */

// Using fetch instead of axios for lighter bundle size
const API_BASE_URL = process.env.API_BASE_URL || 'https://api.pluma.app';
const DEFAULT_TIMEOUT = 10000;

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> {
  const { method = 'GET', headers = {}, body, timeout = DEFAULT_TIMEOUT } = config;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status,
        data
      );
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof ApiError) throw error;
    throw new ApiError(
      error instanceof Error ? error.message : 'Unknown error',
      0
    );
  }
}

export const apiClient = {
  get: <T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>) =>
    request<T>(endpoint, { ...config, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, config?: Omit<RequestConfig, 'method'>) =>
    request<T>(endpoint, { ...config, method: 'POST', body }),

  put: <T>(endpoint: string, body?: unknown, config?: Omit<RequestConfig, 'method'>) =>
    request<T>(endpoint, { ...config, method: 'PUT', body }),

  delete: <T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>) =>
    request<T>(endpoint, { ...config, method: 'DELETE' }),
};

export { ApiError };
