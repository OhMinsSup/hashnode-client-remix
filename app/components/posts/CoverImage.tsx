import React from "react";
import { LeftArrowIcon, TopDownArrowIcon, XIcon } from "../ui/Icon";

const CoverImage = () => {
  return (
    <div className="mb-5">
      <div
        data-id="cover-image"
        className="cover-wrapper post-cover"
        style={{
          backgroundImage:
            'url("https://cdn.hashnode.com/res/hashnode/image/upload/v1660746161870/wocOxH8FQ.png?w=1600&amp;h=840&amp;fit=crop&amp;crop=entropy&amp;auto=compress,format&amp;format=webp")',
        }}
      >
        <div className=" absolute top-0 right-0 m-5 flex flex-row items-center space-x-3">
          <button
            className="relative flex flex-row items-center justify-center rounded border border-transparent bg-white py-2 px-4 text-gray-700 opacity-70"
            data-id="secondary-cover-open"
            data-title="Go back to select image"
          >
            <LeftArrowIcon className="h-5 w-5 fill-current" />
          </button>
          <button
            className="relative flex flex-row items-center justify-center rounded border border-transparent bg-white py-2 px-4 text-gray-700 opacity-70"
            data-title="Move cover below article title"
          >
            <TopDownArrowIcon className="h-5 w-5 fill-current" />
          </button>
          <button
            className="relative flex flex-row items-center justify-center rounded border border-transparent bg-white py-2 px-4 text-gray-700 opacity-70"
            data-id="delete-cover"
            data-title="Remove cover"
          >
            <XIcon className="h-5 w-5 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoverImage;
