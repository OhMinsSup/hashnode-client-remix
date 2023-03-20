import React, { useCallback, useEffect, useState } from "react";
import { useFetcher, useLoaderData, useTransition } from "@remix-run/react";
import { Virtuoso } from "react-virtuoso";
import { PostItem } from "../common";

import type { PostLikeRespSchema } from "~/api/schema/resp";

const LikedPostList = () => {
  const { likePosts } = useLoaderData();

  const [items, setItems] = useState<Array<PostLikeRespSchema>>(
    likePosts?.list ?? []
  );

  const transition = useTransition();
  const fetcher = useFetcher();

  const loadMore = useCallback(
    (index: number) => {
      if (index <= 0) return;

      const lastItem = items.at(index);
      if (!lastItem) return;
      if (!lastItem.cursorId) return;

      if (fetcher.data) {
        const { likePosts } = fetcher.data;
        const { hasNextPage } = likePosts?.pageInfo ?? {};

        if (hasNextPage) {
          fetcher.load(`/bookmarks?cursor=${lastItem.cursorId}&limit=25`);
        }
      } else {
        fetcher.load(`/bookmarks?cursor=${lastItem.cursorId}&limit=25`);
      }
    },
    [fetcher, items]
  );

  useEffect(() => {
    if (fetcher.data) {
      const { likePosts } = fetcher.data;
      const nextItems = likePosts?.list ?? [];
      setItems((prevItems) => [...prevItems, ...nextItems]);
    }
  }, [fetcher.data]);

  return (
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
        return <PostItem post={data} />;
      }}
    />
  );
};

export default LikedPostList;
