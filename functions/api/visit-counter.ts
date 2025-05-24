/// <reference types="@cloudflare/workers-types" />
import type { Env, VisitCount } from '../types';

export const onRequest: PagesFunction<Env> = async (context: EventContext<Env, string, unknown>) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // Get current count
  const currentCount = (await env.VISIT_COUNTS.get(path, 'json') as VisitCount) || { total: 0 };
  const newCount = { total: currentCount.total + 1 };

  // Update count
  await env.VISIT_COUNTS.put(path, JSON.stringify(newCount));

  return new Response(JSON.stringify(newCount), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
