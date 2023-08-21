import React, { useMemo } from "react";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "../shared/ErrorMessage";

import { useNavigation } from "@remix-run/react";

import type { FormFieldValues } from "services/validate/user-update-api.validate";

interface InputIdentityProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
  desc: string;
  name: string;
}

export default function InputIdentity({
  text,
  id,
  className,
  desc,
  name,
  ...otherPros
}: InputIdentityProps) {
  const { register, formState } = useFormContext<FormFieldValues>();

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
            error: !!formState.errors[name],
          })}
          {...otherPros}
          // @ts-ignore
          {...register(name)}
        />
        <div className="z-100 absolute right-0 top-0 mr-4 mt-4"></div>
        <ErrorMessage
          isSubmitting={isSubmitting}
          errors={formState.errors}
          name={name}
        />
      </div>
    </>
  );
}
