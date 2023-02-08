import React from "react";
import {
  type LoaderFunction,
  json,
  type LinksFunction,
} from "@remix-run/cloudflare";
import classnames from "classnames";

// api
import { getTagListApi } from "~/api/tags/tags";
import { getPostsListApi, getTopPostsApi } from "~/api/posts/posts";

// components
import { Tab } from "@headlessui/react";
import { FeaturedList, PersonalizedList, RecentList } from "~/components/posts";
import {
  FeaturedOutline,
  PersonalizedIcon,
  RecentIcon,
} from "~/components/ui/Icon";
import { parseUrlParams } from "~/utils/util";

import homeStylesheetUrl from "../../styles/home.css";
import TabPostList from "~/components/ui/main/TabPostList";
import { ListProvider } from "~/context/useListContext";

export const loader: LoaderFunction = async ({ request }) => {
  const params = parseUrlParams(request.url);

  let cursor = undefined;
  if (params.cursor) {
    cursor = parseInt(params.cursor);
  }

  let limit = 25;
  if (params.limit) {
    limit = parseInt(params.limit);
  }

  const trendingTag = await getTagListApi({
    type: "popular",
    limit: 6,
  });

  const posts = await getPostsListApi({
    cursor,
    limit,
  });

  const topPosts = await getTopPostsApi({
    duration: 7,
  });

  return json({
    trendingTag: trendingTag.result?.result,
    posts: posts.result?.result,
    topPosts,
  });
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: homeStylesheetUrl }];
};

export default function Index() {
  return (
    <div className="home-container">
      {/* Trending Users List */}
      <div className="tab-container">
        <ListProvider>
          <TabPostList />
        </ListProvider>
        {/* <Tab.Group defaultIndex={0}>
          <div className="tab-content">
            <Tab.List className="flex flex-row items-center overflow-auto">
              <Tab
                className={({ selected }) =>
                  classnames(
                    "mr-2 flex flex-row flex-nowrap items-center rounded-t border-b-2 px-2 py-3 font-semibold",
                    {
                      "border-b-blue-500 text-blue-500": selected,
                      "border-transparent": !selected,
                    }
                  )
                }
              >
                <PersonalizedIcon className="mr-2 h-5 w-5 fill-current" />
                <span className="whitespace-nowrap">Personalized</span>
              </Tab>
              <Tab
                className={({ selected }) =>
                  classnames(
                    "mr-2 flex flex-row flex-nowrap items-center rounded-t border-b-2 px-2 py-3 font-semibold",
                    {
                      "border-b-blue-500 text-blue-500": selected,
                      "border-transparent": !selected,
                    }
                  )
                }
              >
                <FeaturedOutline className="mr-2 h-5 w-5 fill-current" />
                <span className="whitespace-nowrap">Featured</span>
              </Tab>
              <Tab
                className={({ selected }) =>
                  classnames(
                    "mr-2 flex flex-row flex-nowrap items-center rounded-t border-b-2 px-2 py-3 font-semibold",
                    {
                      "border-b-blue-500 text-blue-500": selected,
                      "border-transparent": !selected,
                    }
                  )
                }
              >
                <RecentIcon className="mr-2 h-5 w-5 fill-current" />
                <span className="whitespace-nowrap">Recent</span>
              </Tab>
            </Tab.List>
            <div className="flex flex-row items-center"></div>
          </div>
          <Tab.Panels>
            <Tab.Panel>
              <PersonalizedList />
            </Tab.Panel>
            <Tab.Panel>
              <FeaturedList />
            </Tab.Panel>
            <Tab.Panel>
              <RecentList />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group> */}
      </div>
    </div>
  );
}
