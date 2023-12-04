import React, { useMemo } from "react";
import classNames from "classnames";
import { ErrorMessage } from "~/components/shared/future/ErrorMessage";

import { useNavigation } from "@remix-run/react";
import { useSettingUserFormContext } from "~/components/setting/context/form";

import type { FieldPath } from "react-hook-form";
import type { FormFieldValues } from "~/services/validate/user-update-api.validate";

interface SettingInputIdentityProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
  desc: string;
  name: FieldPath<FormFieldValues>;
}

export default function SettingInputIdentity({
  text,
  id,
  className,
  desc,
  name,
  ...otherPros
}: SettingInputIdentityProps) {
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
      <small className="input-help">{desc}</small>
      <div className="relative">
        <input
          id={id}
          className={classNames("input-text", className, {
            // @ts-ignore
            error: !!errors[name],
          })}
          {...otherPros}
          {...register(name)}
        />
        <div className="z-100 absolute right-0 top-0 mr-4 mt-4"></div>
        <ErrorMessage isSubmitting={isSubmitting} errors={errors} name={name} />
      </div>
    </>
  );
}
