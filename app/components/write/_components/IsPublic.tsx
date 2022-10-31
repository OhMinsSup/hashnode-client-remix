import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Switch } from "@headlessui/react";

// types
import type { FormFieldValues } from "~/routes/create/story";

const IsPublic = () => {
  const { control } = useFormContext<FormFieldValues>();

  return (
    <div className="border-b py-8 px-5">
      <h3 className=" mb-3 text-lg font-bold text-gray-900">Post public</h3>
      <p className="mb-2 text-gray-500">
        Check whether the content of the post is public or not.
      </p>
      <div className="relative">
        <Controller
          name="isPublic"
          control={control}
          render={({ field }) => {
            return (
              <Switch
                checked={field.value}
                onChange={(value) => field.onChange(value)}
                className={`${
                  field.value ? "bg-blue-600" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    field.value ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            );
          }}
        />
      </div>
    </div>
  );
};

export default IsPublic;
