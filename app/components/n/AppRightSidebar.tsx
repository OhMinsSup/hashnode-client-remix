import React, { Suspense } from "react";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

import { useLoaderData, Await } from "@remix-run/react";
import AppRightSidebarContentBox from "~/components/shared/AppRightSidebarContentBox";
import RightTagTrendingItem from "./RightTagTrendingItem";

import type { nLoader } from "~/routes/_n.n";

export default function AppRightSidebar() {
  const data = useLoaderData<nLoader>();
  return (
    <aside className="main__right-sidebar">
      <div className="right-sidebar__container">
        <AppRightSidebarContentBox title="About this tag">
          <div className="box__about-tag">
            <p>
              Python is an interpreted, object-oriented, high-level programming
              language with dynamic semantics. Its high-level built-in data
              structures, combined with dynamic typing and dynamic binding, make
              it very attractive for Rapid Application Development, as well as
              for use as a scripting or glue language to connect existing
              components together.
            </p>
          </div>
        </AppRightSidebarContentBox>
        <Suspense fallback={<>Loading package location...</>}>
          <Await resolve={data.trendingTagsWeek}>
            {(data: any) => (
              <AppRightSidebarContentBox
                title="Trending Weekly"
                to={PAGE_ENDPOINTS.EXPLORE.TAGS}
                toText="All tags"
              >
                <div>
                  {(data.json.result?.list ?? []).map((tag: any) => (
                    <RightTagTrendingItem
                      key={`trending-weekly-n-tags-${tag.id}`}
                      tag={tag}
                    />
                  ))}
                </div>
              </AppRightSidebarContentBox>
            )}
          </Await>
        </Suspense>
        <Suspense fallback={<>Loading package location...</>}>
          <Await resolve={data.trendingTagsAll}>
            {(data: any) => (
              <AppRightSidebarContentBox
                title="Trending All-time"
                toText="All tags"
                to={PAGE_ENDPOINTS.EXPLORE.TAGS}
              >
                <div>
                  {(data.json.result?.list ?? []).map((tag: any) => (
                    <RightTagTrendingItem
                      key={`trending-allTime-n-tags-${tag.id}`}
                      tag={tag}
                    />
                  ))}
                </div>
              </AppRightSidebarContentBox>
            )}
          </Await>
        </Suspense>
      </div>
    </aside>
  );
}
