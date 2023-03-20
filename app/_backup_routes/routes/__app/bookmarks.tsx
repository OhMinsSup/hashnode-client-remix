import React from "react";
import { type LoaderFunction, json } from "@remix-run/cloudflare";

import { parseUrlParams } from "~/utils/util";
import { getPostsLikeListApi } from "~/api/posts/posts";
import { applyAuth } from "~/libs/server/applyAuth";
import cookies from "cookie";
import LikedPostList from "~/components/__posts/LikedPostList";

// styles
import bookmarksStylesheetUrl from "../../styles/bookmarks.css";

// error
import { HTTPError } from "ky";

// constants
import { STATUS_CODE } from "~/constants/constant";

// types
import type { LinksFunction } from "@remix-run/cloudflare";
import type { PostLikeListRespSchema } from "~/api/schema/resp";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: bookmarksStylesheetUrl }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const token = applyAuth(request);

  let list: PostLikeListRespSchema | null = null;
  let isLoggedIn = false;

  if (token) {
    const params = parseUrlParams(request.url);

    let cursor = undefined;
    if (params.cursor) {
      cursor = parseInt(params.cursor);
    }

    let limit = 25;
    if (params.limit) {
      limit = parseInt(params.limit);
    }

    try {
      const posts = await getPostsLikeListApi(
        {
          cursor,
          limit,
        },
        {
          hooks: {
            beforeRequest: [
              (request) => {
                request.headers.set(
                  "Cookie",
                  cookies.serialize("access_token", token)
                );
                return request;
              },
            ],
          },
        }
      );
      list = posts.result?.result ?? null;
      isLoggedIn = true;
    } catch (error) {
      list = null;
      if (error instanceof HTTPError) {
        const resp = error.response;

        const checkStatusCode = [
          STATUS_CODE.FORBIDDEN,
          STATUS_CODE.UNAUTHORIZED,
        ] as number[];

        if (checkStatusCode.includes(resp.status)) {
          isLoggedIn = false;
        } else {
          isLoggedIn = true;
        }
      } else {
        isLoggedIn = true;
      }
    }
  }

  return json({
    likePosts: list,
    isLoggedIn,
  });
};

export default function Bookmarks() {
  return (
    <div className="relative col-span-7 min-w-0 pt-5 pb-5">
      <div className="bookmarks-info-box">
        <h1>Bookmarks</h1>
        <p>All articles you have bookmarked on Hashnode</p>
      </div>
      <div className="overflow-hidden rounded-lg border bg-white">
        <LikedPostList />
      </div>
    </div>
  );
}
