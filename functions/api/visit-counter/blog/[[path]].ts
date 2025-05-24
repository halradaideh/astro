/// <reference types="@cloudflare/workers-types" />
import type { Env, VisitCount } from '../../../types';

export const onRequest: PagesFunction<Env> = async (
  context: EventContext<Env, string, unknown>
) => {
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

  // Get the blog post path from the context params
  const path = `/blog/${context.params.path}`;

  // Get current count
  const currentCount = ((await env.VISIT_COUNTS.get(path, 'json')) as VisitCount) || { total: 0 };
  const newCount = { total: currentCount.total + 1 };

  // Update count
  await env.VISIT_COUNTS.put(path, JSON.stringify(newCount));

  return new Response(JSON.stringify(newCount), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    },
  });
};
