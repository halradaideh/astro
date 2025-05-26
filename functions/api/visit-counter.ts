/// <reference types="@cloudflare/workers-types" />
import type { Env, VisitCount } from '../types';

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://blog.radaideh.info',
  'https://blog-radaideh-info.pages.dev',
  'http://localhost:4321',
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

export const onRequest: PagesFunction<Env> = async (
  context: EventContext<Env, string, unknown>
) => {
  try {
    const { request, env } = context;
    const origin = request.headers.get('origin');
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: getCorsHeaders(origin),
      });
    }

    // Only allow GET and POST methods
    if (!['GET', 'POST'].includes(request.method)) {
      return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          Allow: 'GET, POST, OPTIONS',
          ...getCorsHeaders(origin),
        },
      });
    }

    // Verify KV namespace binding
    if (!env.VISIT_COUNTS) {
      return new Response(JSON.stringify({ error: 'Service temporarily unavailable' }), {
        status: 503,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(origin),
        },
      });
    }

    // Extract path from URL pathname (everything after /api/visit-counter)
    const apiPath = '/api/visit-counter';
    const fullPath = url.pathname;

    if (!fullPath.startsWith(apiPath)) {
      return new Response(JSON.stringify({ error: 'Invalid API path' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(origin),
        },
      });
    }

    const path = fullPath.substring(apiPath.length) || '/';
    console.log('Processing visit count for path:', path);

    // Get current count
    let currentCount: VisitCount;
    try {
      const storedCount = await env.VISIT_COUNTS.get(path, 'json');
      currentCount = (storedCount as VisitCount) || { total: 0 };
      console.log('Current count:', currentCount);
    } catch (error) {
      console.error('Error reading from KV:', error);
      currentCount = { total: 0 };
    }

    // For POST requests, increment the counter
    if (request.method === 'POST') {
      const newCount = { total: currentCount.total + 1 };
      console.log('New count:', newCount);

      try {
        await env.VISIT_COUNTS.put(path, JSON.stringify(newCount));
        currentCount = newCount;
      } catch (error) {
        console.error('Error writing to KV:', error);
        // Return current count even if increment failed
      }
    }

    return new Response(JSON.stringify(currentCount), {
      headers: {
        'Content-Type': 'application/json',
        ...getCorsHeaders(origin),
      },
    });
  } catch (error) {
    console.error('Visit counter error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(JSON.stringify({ error: errorMessage, total: 0 }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...getCorsHeaders(null),
      },
    });
  }
};
