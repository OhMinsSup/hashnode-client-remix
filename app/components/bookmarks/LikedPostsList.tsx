import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useFetcher, useLoaderData, useNavigation } from "@remix-run/react";
import { Virtuoso } from "react-virtuoso";
import PostsCard from "~/components/home/PostsCard";
import ReachedEnd from "~/components/shared/ReachedEnd";

import type { PostLikeRespSchema } from "~/api/schema/resp";
import type { DataLoader } from "~/routes/__app/__bookmarks/bookmarks";

const LikedPostsList = () => {
  const { posts } = useLoaderData<DataLoader>();

  const [items, setItems] = useState<Array<PostLikeRespSchema>>(
    posts.list ?? []
  );

  const navigation = useNavigation();
  const fetcher = useFetcher();

  const hasNextPage = useMemo(() => {
    if (fetcher.data) {
      return fetcher.data.posts?.pageInfo?.hasNextPage ?? false;
    }
    return posts?.pageInfo?.hasNextPage ?? false;
  }, [posts, fetcher.data]);

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
        Footer: (props) => {
          if (!hasNextPage) {
            return <ReachedEnd />;
          }
          return navigation.state === "loading" ? <>Loading more...</> : null;
        },
      }}
      overscan={5}
      itemContent={(_, data) => {
        return <PostsCard post={data} />;
      }}
    />
  );
};

export default LikedPostsList;
