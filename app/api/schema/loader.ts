import type { AppAPI } from "./api";
import type { TagListRespSchema } from "./resp";

export interface RootLoaderData {
  trendingTag: AppAPI<TagListRespSchema>;
  simpleTrending: AppAPI<any>;
  personalizedPosts: any[];
}
