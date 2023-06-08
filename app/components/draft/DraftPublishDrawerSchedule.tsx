import React, { useCallback, useMemo } from "react";
import { Icons } from "~/components/shared/Icons";

// hooks
import { useFormContext, useController } from "react-hook-form";

// types
import type { FormFieldValues } from "~/routes/_draft";

export default function DraftPublishDrawerSchedule() {
  const { setValue, control } = useFormContext<FormFieldValues>();

  const { field } = useController({
    name: "publishingDate",
    control,
  });

  const onRemoveSchedule = useCallback(() => {
    setValue("publishingDate", undefined, {
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [setValue]);

  const onSetSchedule = useCallback(() => {
    setValue("publishingDate", new Date(), {
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [setValue]);

  const value = useMemo(() => {
    if (!field.value) {
      return undefined;
    }
    if (field.value instanceof Date) {
      const offset = field.value.getTimezoneOffset() * 60000;
      const isoString = new Date(field.value.getTime() - offset).toISOString();
      return isoString.substring(0, isoString.indexOf("T") + 6);
    }
    return undefined;
  }, [field.value]);

  const min = useMemo(() => {
    const offset = new Date().getTimezoneOffset() * 60000;
    const isoString = new Date(new Date().getTime() - offset).toISOString();
    return isoString.substring(0, isoString.indexOf("T") + 6);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateTime = e.target.value;
    if (!dateTime) {
      field.onChange(undefined);
      return;
    }
    const date = new Date(dateTime);
    field.onChange(date);
  };

  return (
    <>
      <h3 className="title mb-3">SCHEDULE YOUR ARTICLE</h3>
      <p className="desc">
        Select a publishing date/time (Based on your local time zone)
      </p>
      <div className="mb-3">
        {field.value ? (
          <>
            <div className="flex w-full flex-row items-center justify-between rounded-lg border bg-gray-50 p-4 text-base text-gray-900 outline-none">
              <input
                type="datetime-local"
                className="flex-1 bg-gray-50"
                name={field.name}
                ref={field.ref}
                value={value}
                onChange={onChange}
                min={min}
                onBlur={field.onBlur}
              />
            </div>
            <button
              type="button"
              className="schedule__button-close"
              onClick={onRemoveSchedule}
            >
              Cancel scheduling
            </button>
          </>
        ) : (
          <button
            type="button"
            className="schedule__button"
            onClick={onSetSchedule}
          >
            <Icons.Schedule className="icon__base mr-2 fill-current" />
            <span>Select a date</span>
          </button>
        )}
      </div>
    </>
  );
}
