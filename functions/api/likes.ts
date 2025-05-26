/// <reference types="@cloudflare/workers-types" />
import type { Env, LikeData } from '../types';

interface GitHubUserResponse {
  login: string;
  avatar_url: string;
}

async function getGitHubUser(token: string): Promise<{ login: string; avatar_url: string } | null> {
  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as GitHubUserResponse;
    return {
      login: data.login,
      avatar_url: data.avatar_url,
    };
  } catch {
    return null;
  }
}

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigins = [
    'https://blog.radaideh.info',
    'https://blog-radaideh-info.pages.dev',
    'http://localhost:4321',
  ];
  const allowedOrigin = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

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

    // Verify KV namespace binding
    if (!env.LIKES) {
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable', count: 0, users: [] }),
        {
          status: 503,
          headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders(origin),
          },
        }
      );
    }

    // Extract path from URL pathname (everything after /api/likes)
    const apiPath = '/api/likes';
    const fullPath = url.pathname;

    if (!fullPath.startsWith(apiPath)) {
      return new Response(JSON.stringify({ error: 'Invalid API path', count: 0, users: [] }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders(origin),
        },
      });
    }

    const path = fullPath.substring(apiPath.length) || '/';

    // Get current likes
    let currentLikes: LikeData;
    try {
      const storedLikes = await env.LIKES.get(path, 'json');
      currentLikes = (storedLikes as LikeData) || { count: 0, users: [] };
    } catch (error) {
      console.error('Error reading likes from KV:', error);
      currentLikes = { count: 0, users: [] };
    }

    if (request.method === 'POST') {
      const cookie = request.headers.get('cookie') || '';
      const token = cookie
        .split(';')
        .find((c) => c.trim().startsWith('gh_token='))
        ?.split('=')[1];

      if (!token) {
        return new Response(JSON.stringify({ error: 'Unauthorized', count: 0, users: [] }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders(origin),
          },
        });
      }

      const user = await getGitHubUser(token);
      if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized', count: 0, users: [] }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders(origin),
          },
        });
      }

      const userIndex = currentLikes.users.findIndex((u) => u.login === user.login);
      if (userIndex === -1) {
        // Add like
        currentLikes.users.push(user);
        currentLikes.count++;
      } else {
        // Remove like
        currentLikes.users.splice(userIndex, 1);
        currentLikes.count--;
      }

      try {
        await env.LIKES.put(path, JSON.stringify(currentLikes));
      } catch (error) {
        console.error('Error writing likes to KV:', error);
        // Continue with response even if write failed
      }
    }

    return new Response(JSON.stringify(currentLikes), {
      headers: {
        'Content-Type': 'application/json',
        ...getCorsHeaders(origin),
      },
    });
  } catch (error) {
    console.error('Likes API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(JSON.stringify({ error: errorMessage, count: 0, users: [] }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...getCorsHeaders(null),
      },
    });
  }
};
