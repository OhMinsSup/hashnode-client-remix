import React, { useCallback, useEffect, useState } from "react";
import { useFetcher, useLoaderData, useNavigation } from "@remix-run/react";
import { Virtuoso } from "react-virtuoso";
import PostsCard from "~/components/home/PostsCard";

import type { PostDetailRespSchema } from "~/api/schema/resp";

const PostsList = () => {
  const { posts } = useLoaderData();

  const [items, setItems] = useState<PostDetailRespSchema[]>(posts?.list ?? []);

  const navigation = useNavigation();
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
          fetcher.load(`?index&cursor=${lastItem.id}&limit=25`);
        }
      } else {
        fetcher.load(`?index&cursor=${lastItem.id}&limit=25`);
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
          navigation.state === "loading" ? <>Loading more...</> : null,
      }}
      overscan={5}
      itemContent={(_, data) => {
        return <PostsCard post={data} />;
      }}
    />
  );
};

export default PostsList;
