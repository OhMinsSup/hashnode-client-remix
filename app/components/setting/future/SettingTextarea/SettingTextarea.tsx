import React, { useMemo } from "react";
import classNames from "classnames";
import { ErrorMessage } from "~/components/shared/future/ErrorMessage";

import { useNavigation } from "@remix-run/react";
import { useSettingUserFormContext } from "~/components/setting/context/form";

import type { FieldPath } from "react-hook-form";
import type { FormFieldValues } from "~/services/validate/user-update-api.validate";

interface SettingTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  text: string;
  name: FieldPath<FormFieldValues>;
}

export default function SettingTextarea({
  text,
  id,
  name,
  className,
  ...otherPros
}: SettingTextareaProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useSettingUserFormContext();

  const navigation = useNavigation();

  const watchAvailableText = watch("availableText");

  const isSubmitting = useMemo(
    () => navigation.state === "submitting",
    [navigation.state]
  );

  const count = useMemo(() => {
    const length = watchAvailableText?.length ?? 0;
    return 140 - length;
  }, [watchAvailableText]);

  return (
    <>
      <label htmlFor={id} className="input-label">
        {text}
      </label>
      <textarea
        id={id}
        className={classNames("input-text min-h-30", className, {
          // @ts-ignore
          error: !!errors[name],
        })}
        {...otherPros}
        {...register(name)}
      />
      <ErrorMessage isSubmitting={isSubmitting} errors={errors} name={name} />
      {name === "availableText" && (
        <small className="ml-2 mt-1 block leading-tight text-slate-600">
          {count}/140
        </small>
      )}
    </>
  );
}
