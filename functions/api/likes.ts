interface Env {
  LIKES: KVNamespace;
}

interface GitHubUser {
  login: string;
  avatar_url: string;
}

interface LikeData {
  count: number;
  users: GitHubUser[];
}

async function getGitHubUser(token: string): Promise<GitHubUser | null> {
  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Blog-Like-System'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      return {
        login: data.login,
        avatar_url: data.avatar_url
      };
    }
    return null;
  } catch {
    return null;
  }
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const path = url.pathname.replace('/api/likes', '');
  
  // Handle GET request
  if (context.request.method === 'GET') {
    const data = await context.env.LIKES.get(path, 'json') || { count: 0, users: [] };
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
  
  // Handle POST request (like/unlike)
  if (context.request.method === 'POST') {
    // Get GitHub token from cookie or header
    const token = context.request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return new Response('Unauthorized', { status: 401 });
    }
    
    // Get GitHub user
    const user = await getGitHubUser(token);
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }
    
    // Get current likes
    const currentData: LikeData = await context.env.LIKES.get(path, 'json') || { count: 0, users: [] };
    
    // Check if user has already liked
    const userIndex = currentData.users.findIndex(u => u.login === user.login);
    
    if (userIndex === -1) {
      // Add like
      currentData.users.push(user);
      currentData.count++;
    } else {
      // Remove like
      currentData.users.splice(userIndex, 1);
      currentData.count--;
    }
    
    // Update KV store
    await context.env.LIKES.put(path, JSON.stringify(currentData));
    
    return new Response(JSON.stringify(currentData), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
  
  return new Response('Method not allowed', { status: 405 });
}; 