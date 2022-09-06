import React from "react";
import { PostItem } from "../common";

const RecentList = () => {
  return (
    <div>
      {Array.from({ length: 10 }, (_, i) => (
        <PostItem key={i} />
      ))}
    </div>
  );
};

export default RecentList;
