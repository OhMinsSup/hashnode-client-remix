import React from "react";
import { XIcon } from "../ui/Icon";

interface CoverImageProps {
  src: string;
  onRemove: () => void;
}

const CoverImage: React.FC<CoverImageProps> = ({ src, onRemove }) => {
  return (
    <div className="mb-5">
      <div
        data-id="cover-image"
        className="cover-wrapper post-cover"
        style={{
          backgroundImage: `url("${src}")`,
        }}
      >
        <div className=" absolute top-0 right-0 m-5 flex flex-row items-center space-x-3">
          <button
            className="relative flex flex-row items-center justify-center rounded border border-transparent bg-white py-2 px-4 text-gray-700 opacity-70"
            data-id="delete-cover"
            data-title="Remove cover"
            onClick={onRemove}
          >
            <XIcon className="h-5 w-5 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoverImage;
