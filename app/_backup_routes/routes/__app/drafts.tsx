import React, { useCallback, useEffect, useState } from "react";
import {
  Link,
  useFetcher,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import { type LoaderFunction, json } from "@remix-run/cloudflare";

import type { LinksFunction } from "@remix-run/cloudflare";

// api
import { getDraftsListApi } from "~/api/drafts/drafts";

// styles
import draftsStylesheetUrl from "../../styles/drafts.css";

// utils
import { parseUrlParams } from "~/utils/util";

// components
import { CreateIcon } from "~/components/__ui/Icon";
import { DraftItem } from "~/components/common";
import { Virtuoso } from "react-virtuoso";

// types
import type { DraftSchema } from "~/api/schema/draft";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: draftsStylesheetUrl }];
};

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

  const drafts = await getDraftsListApi({
    cursor,
    limit,
  });

  return json({
    drafts: drafts.result?.result,
  });
};

export default function Drafts() {
  const { drafts } = useLoaderData();

  const [items, setItems] = useState<DraftSchema[]>(drafts?.list ?? []);

  const transition = useTransition();
  const fetcher = useFetcher();

  const loadMore = useCallback(
    (index: number) => {
      if (index <= 0) return;

      const lastItem = items.at(index);
      if (!lastItem) return;

      if (fetcher.data) {
        const { posts } = fetcher.data;
        const { hasNextPage } = posts?.pageInfo ?? {};
        if (hasNextPage) {
          fetcher.load(`/drafts?cursor=${lastItem.id}&limit=25`);
        }
      } else {
        fetcher.load(`/drafts?cursor=${lastItem.id}&limit=25`);
      }
    },
    [fetcher, items]
  );

  useEffect(() => {
    if (fetcher.data) {
      const { drafts } = fetcher.data;
      const nextItems = drafts?.list ?? [];
      setItems((prevItems) => [...prevItems, ...nextItems]);
    }
  }, [fetcher.data]);

  return (
    <div className="relative col-span-7 min-w-0 pt-5 pb-5">
      <div className="drafts-info-box">
        <div className="text-area">
          <h1>Your Drafts</h1>
          <p>All your pending drafts are here</p>
        </div>
        <div className="right-area">
          <Link to="/">
            <CreateIcon className="mr-2 h-4 w-4 fill-current" />
            <span>Create New Draft</span>
          </Link>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border bg-white">
        <Virtuoso
          useWindowScroll
          style={{ height: "100%" }}
          data={items}
          endReached={loadMore}
          components={{
            Footer: (props) =>
              transition.state === "loading" ? <>Loading more...</> : null,
          }}
          overscan={5}
          itemContent={(_, data) => {
            return <DraftItem draft={data} />;
          }}
        />
      </div>
    </div>
  );
}
