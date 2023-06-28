import React, { useMemo } from "react";
import classNames from "classnames";
import ErrorMessage from "../shared/ErrorMessage";

// hooks
import { useActionData, useNavigation } from "@remix-run/react";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  name: string;
  text: string;
}

export default function Input({ id, name, title, ...otherProps }: InputProps) {
  const navigation = useNavigation();
  const errors = useActionData();
  const error = errors?.[name];

  const isSubmitting = useMemo(
    () => navigation.state === "submitting",
    [navigation.state]
  );

  return (
    <div className="auth-form__form-item-inner mb-3">
      <label className="text-sm" htmlFor={id}>
        {title}
      </label>
      <input
        id={id}
        name={name}
        className={classNames("auth-form__input", otherProps?.className, {
          error: !!error,
        })}
        {...otherProps}
      />
      <ErrorMessage error={error} isSubmitting={isSubmitting} />
    </div>
  );
}
