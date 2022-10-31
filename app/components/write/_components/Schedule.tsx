import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Switch } from "@headlessui/react";

// types
import type { FormFieldValues } from "~/routes/create/story";

const Schedule = () => {
  const { control } = useFormContext<FormFieldValues>();

  return (
    <div className="border-b py-8 px-5">
      <h3 className=" mb-3 text-lg font-bold text-gray-900">
        Schedule your article
      </h3>
      <p className="mb-2 text-gray-500">
        Select a publishing date/time (Based on your local time zone)
      </p>
      <div className="relative">\</div>
    </div>
  );
};

export default Schedule;
