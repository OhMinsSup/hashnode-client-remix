import React, { useMemo } from "react";
import classNames from "classnames";
import { ErrorMessage } from "~/components/shared/future/ErrorMessage";

import { useNavigation } from "@remix-run/react";
import { useSettingUserFormContext } from "~/components/setting/context/form";

import type { FieldPath } from "react-hook-form";
import type { FormFieldValues } from "~/services/validate/user-update-api.validate";

interface SettingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
  name: FieldPath<FormFieldValues>;
}

export default function SettingInput({
  text,
  id,
  name,
  className,
  ...otherPros
}: SettingInputProps) {
  const {
    register,
    formState: { errors },
  } = useSettingUserFormContext();

  const navigation = useNavigation();

  const isSubmitting = useMemo(
    () => navigation.state === "submitting",
    [navigation.state]
  );

  return (
    <>
      <label htmlFor={id} className="input-label">
        {text}
      </label>
      <input
        id={id}
        className={classNames("input-text", className, {
          // @ts-ignore
          error: !!errors[name],
        })}
        {...otherPros}
        {...register(name)}
      />
      <ErrorMessage isSubmitting={isSubmitting} errors={errors} name={name} />
    </>
  );
}
