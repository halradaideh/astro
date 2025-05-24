import type { PageView, PageReaction, StatsResponse } from './types';

// Cloudflare Worker configuration
export const WORKER_URL = 'https://blog-worker.radaideh.info';

// Generate a session token
function generateSessionToken(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return btoa(`${timestamp}:${random}`);
}

// Get or create session token
function getSessionToken(): string {
  const tokenKey = 'blog_session_token';
  let token = localStorage.getItem(tokenKey);

  if (!token) {
    token = generateSessionToken();
    localStorage.setItem(tokenKey, token);
  }

  return token;
}

// API endpoints
export const API_ENDPOINTS = {
  stats: `${WORKER_URL}/api/stats`,
  views: `${WORKER_URL}/api/views`,
  reactions: `${WORKER_URL}/api/reactions`,
} as const;

// Fetch wrapper with error handling and security
export async function fetchWorker<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    // Get current page URL for verification
    const currentPage = window.location.href;
    const sessionToken = getSessionToken();

    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-Session-Token': sessionToken,
        'X-Page-URL': currentPage,
        'X-Request-Time': Date.now().toString(),
        ...options.headers,
      },
      // Ensure credentials are included
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Worker fetch error:', error);
    throw error;
  }
}

// KV interaction methods with rate limiting and validation
export const KVClient = {
  // Increment page view counter
  async incrementView(path: string): Promise<PageView> {
    // Ensure path matches current page
    if (!path.startsWith('/') || path.includes('..')) {
      throw new Error('Invalid path');
    }

    return fetchWorker<PageView>(API_ENDPOINTS.views, {
      method: 'POST',
      body: JSON.stringify({
        path,
        timestamp: Date.now(),
      }),
    });
  },

  // Get page views
  async getViews(path: string): Promise<PageView> {
    if (!path.startsWith('/') || path.includes('..')) {
      throw new Error('Invalid path');
    }
    return fetchWorker<PageView>(`${API_ENDPOINTS.views}/${encodeURIComponent(path)}`);
  },

  // Add reaction to page
  async addReaction(path: string, reaction: string): Promise<PageReaction> {
    // Validate reaction emoji
    const validReactions = ['👍', '👎', '❤️', '🎉', '🤔', '👏'];
    if (!validReactions.includes(reaction)) {
      throw new Error('Invalid reaction');
    }

    return fetchWorker<PageReaction>(API_ENDPOINTS.reactions, {
      method: 'POST',
      body: JSON.stringify({
        path,
        reaction,
        timestamp: Date.now(),
      }),
    });
  },

  // Get page reactions
  async getReactions(path: string): Promise<PageReaction> {
    if (!path.startsWith('/') || path.includes('..')) {
      throw new Error('Invalid path');
    }
    return fetchWorker<PageReaction>(`${API_ENDPOINTS.reactions}/${encodeURIComponent(path)}`);
  },

  // Get overall stats
  async getStats(): Promise<StatsResponse> {
    return fetchWorker<StatsResponse>(API_ENDPOINTS.stats);
  },
};
