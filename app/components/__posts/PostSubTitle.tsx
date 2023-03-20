import React from "react";

interface PostSubTitleProps {
  subTitle?: string;
}

const PostSubTitle: React.FC<PostSubTitleProps> = ({ subTitle }) => {
  return (
    <div className="px-4 text-center md:mb-14 md:px-5 lg:px-8">
      <h2 className="text-2xl text-gray-700 md:text-3xl">{subTitle}</h2>
    </div>
  );
};

export default PostSubTitle;
