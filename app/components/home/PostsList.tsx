import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useFetcher, useLoaderData, useNavigation } from "@remix-run/react";
import { Virtuoso } from "react-virtuoso";
import PostsCard from "~/components/home/PostsCard";

import type { PostDetailRespSchema } from "~/api/schema/resp";
import type { DataLoader } from "~/routes/__app/__list/index";

const PostsList = () => {
  const { posts } = useLoaderData<DataLoader>();
  const navigation = useNavigation();
  const fetcher = useFetcher<DataLoader>();

  const [items, setItems] = useState<PostDetailRespSchema[]>(posts?.list ?? []);
  const totalCount = useMemo(() => posts?.totalCount ?? 0, [posts]);
  const intialItemCount = useMemo(() => {
    const currentItemCount = posts.list?.length ?? 0;
    return currentItemCount < 25 ? currentItemCount : 25;
  }, [posts]);

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
      totalCount={totalCount}
      initialItemCount={intialItemCount}
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
