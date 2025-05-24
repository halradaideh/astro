/// <reference types="@cloudflare/workers-types" />
import type { Env, VisitCount } from '../../../types';

export const onRequest: PagesFunction<Env> = async (
  context: EventContext<Env, string, unknown>
) => {
  try {
    const { request, env } = context;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // Only allow GET and POST methods
    if (!['GET', 'POST'].includes(request.method)) {
      return new Response('Method Not Allowed', {
        status: 405,
        headers: {
          Allow: 'GET, POST, OPTIONS',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Verify KV namespace binding
    if (!env.VISIT_COUNTS) {
      throw new Error('VISIT_COUNTS KV namespace is not bound');
    }

    // Get the blog post path from the context params
    if (!context.params.path) {
      throw new Error('Blog post path is missing from context params');
    }

    const path = `/blog/${context.params.path}`;
    console.log('Processing visit count for path:', path);

    // Get current count
    let currentCount: VisitCount;
    try {
      currentCount = ((await env.VISIT_COUNTS.get(path, 'json')) as VisitCount) || { total: 0 };
      console.log('Current count:', currentCount);
    } catch (error) {
      console.error('Error reading from KV:', error);
      currentCount = { total: 0 };
    }

    const newCount = { total: currentCount.total + 1 };
    console.log('New count:', newCount);

    // Update count
    try {
      await env.VISIT_COUNTS.put(path, JSON.stringify(newCount));
    } catch (error) {
      console.error('Error writing to KV:', error);
      throw error;
    }

    return new Response(JSON.stringify(newCount), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
    });
  } catch (error: unknown) {
    console.error('Visit counter error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
};
