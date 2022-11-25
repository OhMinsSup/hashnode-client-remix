import React from "react";
import Image from "remix-image";
import type { Nullable } from "~/api/schema/api";

interface PostThumbnailProps {
  source?: Nullable<string>;
}

const PostThumbnail: React.FC<PostThumbnailProps> = ({ source }) => {
  return (
    <div className="relative">
      <Image
        className="w-full"
        src={source ?? undefined}
        loaderUrl="/api/image"
        alt="post thumbnail"
      />
      {/* <img className="w-full" src={source ?? undefined} alt="post thumbnail" /> */}
    </div>
  );
};

export default PostThumbnail;
