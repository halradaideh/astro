// Cloudflare Worker configuration
export const WORKER_URL = 'https://blog-worker.radaideh.info';

// API endpoints
export const API_ENDPOINTS = {
  stats: `${WORKER_URL}/api/stats`,
  views: `${WORKER_URL}/api/views`,
  reactions: `${WORKER_URL}/api/reactions`,
} as const;

// Fetch wrapper with error handling
export async function fetchWorker<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Worker fetch error:', error);
    throw error;
  }
} 