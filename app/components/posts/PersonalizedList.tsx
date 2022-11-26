import { useFetcher, useLoaderData, useTransition } from "@remix-run/react";
import React, { useCallback, useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { PostItem } from "../common";

const PersonalizedList = () => {
  const { posts } = useLoaderData();

  const [items, setItems] = useState<any[]>(posts?.list ?? []);

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
          fetcher.load(`?index&cursor=${lastItem.id}&limit=3`);
        }
      } else {
        fetcher.load(`?index&cursor=${lastItem.id}&limit=3`);
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
          transition.state === "loading" ? (
            <>Loading more...</>
          ) : (
            <>Nothing to see here...</>
          ),
      }}
      overscan={5}
      itemContent={(index, data) => <PostItem key={index} title={data.title} />}
    />
  );
};

export default PersonalizedList;
