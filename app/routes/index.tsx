import React from "react";
import { type LoaderFunction, json } from "@remix-run/cloudflare";
import classnames from "classnames";

// api
import { getTagListApi } from "~/api/tags";
import { getPostsListApi } from "~/api/posts/posts";

// components
import { Tab } from "@headlessui/react";
import { RootTemplate } from "~/components/posts";
import { FeaturedList, PersonalizedList, RecentList } from "~/components/posts";
import {
  FeaturedOutline,
  PersonalizedIcon,
  RecentIcon,
} from "~/components/ui/Icon";
import { parseUrlParams } from "~/utils/util";

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

  return json({
    trendingTag: trendingTag.result?.result,
    posts: posts.result?.result,
  });
};

export default function Index() {
  return (
    <RootTemplate>
      <div className="relative col-span-7 min-w-0 pt-5 pb-24">
        <div className="overflow-hidden rounded-lg border bg-white">
          <Tab.Group>
            <div className="relative z-20 flex max-w-[100vw] flex-row justify-between border-b px-5 pt-2 font-medium text-gray-600">
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
          </Tab.Group>
        </div>
      </div>
    </RootTemplate>
  );
}
