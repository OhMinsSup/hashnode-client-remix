import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useFetcher, useLoaderData, useNavigation } from "@remix-run/react";
import { Virtuoso } from "react-virtuoso";
import PostsCard from "~/components/home/PostsCard";
import ReachedEnd from "~/components/shared/ReachedEnd";

import type { PostDetailRespSchema } from "~/api/schema/resp";
import type { DataLoader } from "~/routes/__app/__list/index";

const _PAGE_SIZE = 25;

const PostsList = () => {
  const { posts } = useLoaderData<DataLoader>();
  const navigation = useNavigation();
  const fetcher = useFetcher<DataLoader>();

  const [items, setItems] = useState<PostDetailRespSchema[]>(posts?.list ?? []);

  const totalCount = useMemo(() => posts?.totalCount ?? 0, [posts]);

  // const intialItemCount = useMemo(() => {
  //   const currentItemCount = posts.list?.length ?? 0;
  //   // return currentItemCount < 25 ? currentItemCount : 25;
  //   return currentItemCount < _PAGE_SIZE ? currentItemCount : _PAGE_SIZE;
  // }, [posts]);

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

      if (fetcher.data) {
        const { posts } = fetcher.data;
        const { hasNextPage } = posts?.pageInfo ?? {};
        if (hasNextPage) {
          fetcher.load(`?index&cursor=${lastItem.id}&limit=${_PAGE_SIZE}`);
        }
      } else {
        fetcher.load(`?index&cursor=${lastItem.id}&limit=${_PAGE_SIZE}`);
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
      useWindowScroll={true}
      style={{ height: "100%" }}
      data={items}
      totalCount={totalCount}
      // initialItemCount={intialItemCount}
      endReached={loadMore}
      components={{
        Footer: (props) => {
          if (!hasNextPage) {
            return <ReachedEnd />;
          }
          return navigation.state === "loading" ? (
            <>Loading more...</>
          ) : (
            <div></div>
          );
        },
      }}
      overscan={5}
      itemContent={(_, data) => {
        return <PostsCard post={data} />;
      }}
    />
  );
};

export default PostsList;
