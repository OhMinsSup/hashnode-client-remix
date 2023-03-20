import React, { useEffect } from "react";
import { useFormContext, useController, useWatch } from "react-hook-form";
import { Switch } from "@headlessui/react";
import { Transition, useWriteContext } from "~/stores/useWirteContext";

// types
import type { FormFieldValues } from "~/routes/__draft";

const DisabledComment = () => {
  const { control } = useFormContext<FormFieldValues>();

  const { field, formState } = useController<
    FormFieldValues,
    "disabledComment"
  >({
    name: "disabledComment",
    control,
  });

  const watchDisabledComment = useWatch<FormFieldValues, "disabledComment">({
    name: "disabledComment",
  });

  const { setTransition } = useWriteContext();

  useEffect(() => {
    if (!formState.dirtyFields.disabledComment) return;
    setTransition(Transition.UPDATING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchDisabledComment, formState.dirtyFields.disabledComment]);

  return (
    <div className="border-b py-8 px-5">
      <h3 className=" mb-3 text-lg font-bold text-gray-900">
        Disable comments?
      </h3>
      <p className="mb-2 text-gray-500">
        This will hide the comments section below your article.
      </p>
      <div className="relative">
        <Switch
          checked={field.value}
          onChange={(checked: boolean) => field.onChange(checked)}
          className={`${
            watchDisabledComment ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              watchDisabledComment ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>
    </div>
  );
};

export default DisabledComment;
