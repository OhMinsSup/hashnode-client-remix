import React from "react";

const PostTitle = () => {
  return (
    <div className="mb-5 break-words text-gray-900 px-4 mt-6 text-3xl font-extrabold text-center xl:text-5xl xl:px-20 lg:px-8 md:px-5 md:mt-10 md:text-4xl">
      <h1
        data-query="post-title"
        style={{
          lineHeight: "1.375",
        }}
      >
        Remix Vs Next.js
      </h1>
    </div>
  );
};

export default PostTitle;
