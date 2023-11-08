import React, { useMemo } from "react";
import classNames from "classnames";
import { ErrorMessage } from "~/components/shared/future/ErrorMessage";

import { useNavigation } from "@remix-run/react";
import { useFormContext } from "react-hook-form";

import type { FieldPath } from "react-hook-form";
import type { FormFieldValues } from "services/validate/user-update-api.validate";

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
  const { register, formState, watch } = useFormContext<FormFieldValues>();

  const navigation = useNavigation();

  const watchAvailableText = watch("availableText");

  const isSubmitting = useMemo(
    () => navigation.state === "submitting",
    [navigation.state]
  );

  return (
    <>
      <label htmlFor={id} className="input-label">
        {text}
      </label>
      <textarea
        id={id}
        className={classNames("input-text min-h-30", className, {
          // @ts-ignore
          error: !!formState.errors[name],
        })}
        {...otherPros}
        {...register(name)}
      />
      <ErrorMessage
        isSubmitting={isSubmitting}
        errors={formState.errors}
        name={name}
      />
      {name === "availableText" && (
        <small className="ml-2 mt-1 block leading-tight text-slate-600">
          {watchAvailableText?.length ?? 0}/140
        </small>
      )}
    </>
  );
}
