import React from "react";
import { PostItem } from "../common";

const FeaturedList = () => {
  return (
    <div>
      {" "}
      {Array.from({ length: 10 }, (_, i) => (
        <PostItem key={i} />
      ))}
    </div>
  );
};

export default FeaturedList;
