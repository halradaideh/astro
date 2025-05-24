export interface PageView {
  path: string;
  count: number;
  lastUpdated: string;
}

export interface PageReaction {
  path: string;
  reactions: {
    [key: string]: number; // 👍, 👎, ❤️, etc.
  };
  lastUpdated: string;
}

export interface StatsResponse {
  totalViews: number;
  uniquePaths: number;
  topPages: PageView[];
}
