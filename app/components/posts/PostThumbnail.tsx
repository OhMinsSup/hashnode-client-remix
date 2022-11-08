import React from "react";
import type { Nullable } from "~/api/schema/api";

interface PostThumbnailProps {
  source?: Nullable<string>;
}

const PostThumbnail: React.FC<PostThumbnailProps> = ({ source }) => {
  return (
    <div className="relative">
      <img src={source ?? undefined} alt="" />
    </div>
  );
};

export default PostThumbnail;
