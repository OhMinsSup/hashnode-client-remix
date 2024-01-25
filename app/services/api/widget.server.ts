import { RESULT_CODE } from "~/constants/constant";
import type { HashnodeApiConstructorOptions } from "~/services/types";
import { isNullOrUndefined, isString } from "~/utils/assertion";
import { parseUrlParams } from "~/utils/util";

export class WidgetApiService {
  constructor(private readonly opts: HashnodeApiConstructorOptions) {}

  private get $server() {
    return this.opts.services.server;
  }

  private get $agent() {
    return this.opts.services.agent;
  }

  async getWidgetLikePostList(request: Request) {
    try {
      const cookie = this.$server.readHeaderCookie(request);
      const response = await this.$agent.getLikePostListHandler(
        {
          limit: 4,
        },
        {
          headers: {
            ...(cookie && {
              Cookie: cookie,
            }),
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.body;
      if (data.resultCode !== RESULT_CODE.OK) {
        return this.getDefaultPostList();
      }
      const result = data.result as FetchRespSchema.PostListResp;
      return {
        list: result.list,
        pageInfo: result.pageInfo,
        totalCount: result.totalCount,
      };
    } catch (error) {
      return this.getDefaultPostList();
    }
  }

  async getWidgetDraftPostList(request: Request) {
    try {
      const cookie = this.$server.readHeaderCookie(request);
      const response = await this.$agent.getDraftPostListHandler(
        {
          limit: 4,
        },
        {
          headers: {
            ...(cookie && {
              Cookie: cookie,
            }),
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.body;
      if (data.resultCode !== RESULT_CODE.OK) {
        return this.getDefaultPostList();
      }
      const result = data.result as FetchRespSchema.PostListResp;
      return {
        list: result.list,
        pageInfo: result.pageInfo,
        totalCount: result.totalCount,
      };
    } catch (error) {
      return this.getDefaultPostList();
    }
  }

  async getWidgetTrendingUserList(request: Request) {
    try {
      const cookie = this.$server.readHeaderCookie(request);
      const response = await this.$agent.getUserListHandler(
        {
          limit: 4,
        },
        {
          headers: {
            ...(cookie && {
              Cookie: cookie,
            }),
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.body;
      if (data.resultCode !== RESULT_CODE.OK) {
        return this.getDefaultPostList();
      }
      const result = data.result as FetchRespSchema.UserListResp;
      return {
        list: result.list,
        pageInfo: result.pageInfo,
        totalCount: result.totalCount,
      };
    } catch (error) {
      return this.getDefaultPostList();
    }
  }

  async getWidgetTrendingTagList(request: Request) {
    try {
      const cookie = this.$server.readHeaderCookie(request);
      const response = await this.$agent.getTagListHandler(
        {
          limit: 4,
          type: "popular",
        },
        {
          headers: {
            ...(cookie && {
              Cookie: cookie,
            }),
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.body;
      if (data.resultCode !== RESULT_CODE.OK) {
        return this.getDefaultPostList();
      }
      const result = data.result as FetchRespSchema.TagListResp;
      return {
        list: result.list,
        pageInfo: result.pageInfo,
        totalCount: result.totalCount,
      };
    } catch (error) {
      return this.getDefaultPostList();
    }
  }

  async getWidgetNotificationCount(request: Request) {
    try {
      const cookie = this.$server.readHeaderCookie(request);
      const response = await this.$agent.getNotificationCountHandler({
        headers: {
          ...(cookie && {
            Cookie: cookie,
          }),
          "Content-Type": "application/json",
        },
      });
      const data = await response.body;
      if (data.resultCode !== RESULT_CODE.OK) {
        return 0;
      }
      const result = data.result as number;
      return result;
    } catch (error) {
      return 0;
    }
  }

  async getWidgetTopPostList(request: Request, duration?: number | string) {
    try {
      const params = isNullOrUndefined(duration)
        ? parseUrlParams(request.url)
        : { duration: isString(duration) ? Number(duration) : duration };
      const cookie = this.$server.readHeaderCookie(request);
      const response = await this.$agent.getTopPostListHandler(params, {
        headers: {
          ...(cookie && {
            Cookie: cookie,
          }),
          "Content-Type": "application/json",
        },
      });
      const data = await response.body;
      if (data.resultCode !== RESULT_CODE.OK) {
        return this.getDefaultPostList();
      }
      const result = data.result as FetchRespSchema.GetTopPostsResp;
      return {
        list: result.posts,
        pageInfo: {
          endCursor: null,
          hasNextPage: false,
        },
        totalCount: result.posts.length,
      };
    } catch (error) {
      return this.getDefaultPostList();
    }
  }

  private getDefaultPostList() {
    return {
      list: [],
      pageInfo: {
        endCursor: null,
        hasNextPage: false,
      },
      totalCount: 0,
    };
  }
}
