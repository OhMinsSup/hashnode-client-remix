import React from "react";

const Description = () => {
  return (
    <div className="border-b py-8 px-5">
      <h3 className=" mb-3 text-lg font-bold text-gray-900">Description</h3>
      <div className="relative">
        <textarea
          maxLength={156}
          className="focus:shadow-outline h-24 w-full rounded-lg border px-3 py-2 text-base text-gray-700 placeholder-gray-400"
          placeholder="Enter meta description…"
          style={{
            height: "58px !important",
          }}
        />
      </div>
    </div>
  );
};

export default Description;
