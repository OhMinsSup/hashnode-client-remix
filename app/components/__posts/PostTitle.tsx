import React from "react";
import type { Nullable } from "~/api/schema/api";

interface PostTitleProps {
  title?: Nullable<string>;
}

const PostTitle: React.FC<PostTitleProps> = ({ title }) => {
  return (
    <div className="mb-5 mt-6 break-words px-4 text-center text-3xl font-extrabold text-gray-900 md:mt-10 md:px-5 md:text-4xl lg:px-8 xl:px-20 xl:text-5xl">
      <h1
        data-query="post-title"
        style={{
          lineHeight: "1.375",
        }}
      >
        {title}
      </h1>
    </div>
  );
};

export default PostTitle;
