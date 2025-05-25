/// <reference types="@cloudflare/workers-types" />
import type { Env } from '../types';

interface HealthResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  version: string;
  uptime: number;
  services: {
    kv: boolean;
    env: boolean;
  };
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const startTime = Date.now();

  if (request.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    // Check KV availability
    let kvHealthy = false;
    try {
      await env.VISIT_COUNTS?.get('health-check');
      kvHealthy = true;
    } catch {
      kvHealthy = false;
    }

    // Check if required KV namespaces are available
    const envHealthy = !!(env.VISIT_COUNTS && env.LIKES);

    const health: HealthResponse = {
      status: kvHealthy && envHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      uptime: Date.now() - startTime,
      services: {
        kv: kvHealthy,
        env: envHealthy,
      },
    };

    const status = health.status === 'healthy' ? 200 : 503;

    return new Response(JSON.stringify(health, null, 2), {
      status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 'unhealthy',
        error: 'Health check failed',
        timestamp: new Date().toISOString(),
      }),
      {
        status: 503,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      }
    );
  }
};
