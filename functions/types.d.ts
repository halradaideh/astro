interface Env {
  LIKES: KVNamespace;
  VISIT_COUNTS: KVNamespace;
}

interface VisitCount {
  total: number;
}

interface LikeData {
  count: number;
  users: Array<{
    login: string;
    avatar_url: string;
  }>;
}

type Context = EventContext<Env, string, unknown>; 