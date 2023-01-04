import React, { useEffect } from "react";
import { useFormContext, useController, useWatch } from "react-hook-form";
import { Switch } from "@headlessui/react";
import { Transition, useWriteContext } from "~/stores/useWirteContext";

// types
import type { FormFieldValues } from "~/routes/create";

const IsPublic = () => {
  const { control } = useFormContext<FormFieldValues>();

  const { field, formState } = useController<FormFieldValues, "isPublic">({
    name: "isPublic",
    control,
  });

  const watchIsPublic = useWatch<FormFieldValues, "isPublic">({
    name: "isPublic",
  });

  const { setTransition } = useWriteContext();

  useEffect(() => {
    if (!formState.dirtyFields.isPublic) return;
    setTransition(Transition.UPDATING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchIsPublic, formState.dirtyFields.isPublic]);

  return (
    <div className="border-b py-8 px-5">
      <h3 className=" mb-3 text-lg font-bold text-gray-900">Post public</h3>
      <p className="mb-2 text-gray-500">
        Check whether the content of the post is public or not.
      </p>
      <div className="relative">
        <Switch
          checked={field.value}
          onChange={(checked: boolean) => field.onChange(checked)}
          className={`${
            watchIsPublic ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              watchIsPublic ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>
    </div>
  );
};

export default IsPublic;
