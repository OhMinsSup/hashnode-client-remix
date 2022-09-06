import { useLoaderData } from "@remix-run/react";
import React, { useCallback } from "react";
import { Virtuoso } from "react-virtuoso";
import { PostItem } from "../common";

const PersonalizedList = () => {
  const { personalizedPosts } = useLoaderData<{ personalizedPosts: any[] }>();

  const loadMore = useCallback(() => {
    return console.log("load more");
  }, []);

  return (
    <Virtuoso
      useWindowScroll
      style={{ height: "100%" }}
      data={personalizedPosts}
      endReached={loadMore}
      components={{
        Footer: (props) => <>Loading....</>,
      }}
      overscan={5}
      itemContent={(index, data) => <PostItem key={index} />}
    />
  );
};

export default PersonalizedList;
