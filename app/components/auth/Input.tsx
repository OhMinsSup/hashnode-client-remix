import React, { useMemo } from "react";
import classNames from "classnames";

// hooks
import { useActionData, useNavigation } from "@remix-run/react";
import ErrorMessage from "../shared/ErrorMessage";

// types
import type { SignupAction } from "~/routes/_auth.signup";
import type { SigninAction } from "~/routes/_auth.signin";

type ActionData = SignupAction | SigninAction;

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  name: string;
  text: string;
}

export default function Input({ id, name, title, ...otherProps }: InputProps) {
  const navigation = useNavigation();
  const errors = useActionData<ActionData>();

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
        {...otherProps}
        className={classNames("auth-form__input", otherProps?.className, {
          error: !!errors?.[name],
        })}
      />
      <ErrorMessage error={errors?.[name]} isSubmitting={isSubmitting} />
    </div>
  );
}
