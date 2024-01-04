import { LRUCache } from "lru-cache";
import type { CacheEntry } from "@epic-web/cachified";

export const dataCache = new LRUCache<string, CacheEntry>({
  max: 1000,
});
