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
    const data = await response.json() as GitHubUserResponse;
    return {
      login: data.login,
      avatar_url: data.avatar_url,
    };
  } catch {
    return null;
  }
}

export const onRequest: PagesFunction<Env> = async (context: EventContext<Env, string, unknown>) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // Get current likes
  const currentLikes = (await env.LIKES.get(path, 'json') as LikeData) || { count: 0, users: [] };

  if (request.method === 'POST') {
    const cookie = request.headers.get('cookie') || '';
    const token = cookie.split(';').find(c => c.trim().startsWith('gh_token='))?.split('=')[1];

    if (!token) {
      return new Response('Unauthorized', { status: 401 });
    }

    const user = await getGitHubUser(token);
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const userIndex = currentLikes.users.findIndex(u => u.login === user.login);
    if (userIndex === -1) {
      // Add like
      currentLikes.users.push(user);
      currentLikes.count++;
    } else {
      // Remove like
      currentLikes.users.splice(userIndex, 1);
      currentLikes.count--;
    }

    await env.LIKES.put(path, JSON.stringify(currentLikes));
  }

  return new Response(JSON.stringify(currentLikes), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
