/// <reference types="@cloudflare/workers-types" />

export interface Env {
  LIKES: KVNamespace;
  VISIT_COUNTS: KVNamespace;
}

export interface VisitCount {
  total: number;
}

export interface LikeData {
  count: number;
  users: Array<{
    login: string;
    avatar_url: string;
  }>;
}

export type Context = EventContext<Env, string, unknown>; 