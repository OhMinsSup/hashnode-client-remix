import React, { useCallback, useEffect, useState } from "react";
import { useFetcher, useLoaderData, useNavigation } from "@remix-run/react";
import { Virtuoso } from "react-virtuoso";
import PostsCard from "~/components/home/PostsCard";

import type { PostLikeRespSchema } from "~/api/schema/resp";
import type { DataLoader } from "~/routes/__app/__bookmarks/bookmarks";

const LikedPostsList = () => {
  const { posts } = useLoaderData<DataLoader>();

  const [items, setItems] = useState<Array<PostLikeRespSchema>>(
    posts.list ?? []
  );

  const transition = useNavigation();
  const fetcher = useFetcher();

  const loadMore = useCallback(
    (index: number) => {
      if (index <= 0) return;

      const lastItem = items.at(index);
      if (!lastItem) return;
      if (!lastItem.cursorId) return;

      if (fetcher.data) {
        const { posts } = fetcher.data;
        const { hasNextPage } = posts?.pageInfo ?? {};

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
      const { posts } = fetcher.data;
      const nextItems = posts?.list ?? [];
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
        return <PostsCard post={data} />;
      }}
    />
  );
};

export default LikedPostsList;
