import React from "react";
import { useFormContext } from "react-hook-form";

// types
import type { FormFieldValues } from "~/routes/create/story";

const Description = () => {
  const { register } = useFormContext<FormFieldValues>();
  return (
    <div className="border-b py-8 px-5">
      <h3 className=" mb-3 text-lg font-bold text-gray-900">Description</h3>
      <p className="mb-2 text-gray-500">
        The SEO Description will be used in place of your Subtitle on search
        engine results pages. Good SEO descriptions utilize keywords, summarize
        the article and are between 140-156 characters long.
      </p>
      <div className="relative">
        <textarea
          maxLength={156}
          className="focus:shadow-outline h-24 w-full rounded-lg border px-3 py-2 text-base text-gray-700 placeholder-gray-400"
          placeholder="Enter meta description…"
          style={{
            height: "58px !important",
          }}
          {...register("description")}
        />
      </div>
    </div>
  );
};

export default Description;
