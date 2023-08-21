import React, { useMemo } from "react";
import classNames from "classnames";
import ErrorMessage from "../shared/ErrorMessage";

import { useNavigation } from "@remix-run/react";
import { useFormContext } from "react-hook-form";

import type { FormFieldValues } from "services/validate/user-update-api.validate";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
  name: string;
}

export default function Input({
  text,
  id,
  name,
  className,
  ...otherPros
}: InputProps) {
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
      <ErrorMessage
        isSubmitting={isSubmitting}
        errors={formState.errors}
        name={name}
      />
    </>
  );
}
