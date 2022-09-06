import React from "react";

interface UploadPancelProps {}

const UploadPanel: React.FC<UploadPancelProps> = () => {
  return (
    <>
      <div className="mt-8 mb-4 flex flex-row justify-center">
        <label className=" cursor-pointer rounded-lg bg-blue-500 py-3 px-12 text-sm font-bold text-white">
          <span className="text-base font-semibold tracking-wide">
            Choose an image
          </span>
          <input type="file" id="inputUpload" hidden data-id="upload-cover" />
        </label>
      </div>
      <p className="text-center text-sm text-gray-600">
        Recommended dimension is 1600 x 840
      </p>
    </>
  );
};

export default UploadPanel;
