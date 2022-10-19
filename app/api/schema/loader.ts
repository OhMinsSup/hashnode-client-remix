import type { AppAPI } from "./api";
import type { SimpleTrendingPostsRespSchema, TagListRespSchema } from "./resp";

export interface RootLoaderData {
  trendingTag: AppAPI<TagListRespSchema>;
  simpleTrending: AppAPI<SimpleTrendingPostsRespSchema>;
  personalizedPosts: any[];
}
