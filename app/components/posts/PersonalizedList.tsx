import React, { useMemo } from "react";
import { Virtuoso } from "react-virtuoso";
import { PostItem } from "../common";

const PersonalizedList = () => {
  const originalList = useMemo(() => Array.from(Array(99999).keys()), []);

  return (
    <Virtuoso
      useWindowScroll
      style={{ height: "100%" }}
      data={originalList}
      itemContent={(index, data) => <PostItem key={index} />}
    />
  );
};

export default PersonalizedList;
