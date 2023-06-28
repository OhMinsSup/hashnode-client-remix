import React, { useEffect, useMemo, useRef } from "react";
import styles from "./styles.module.css";

// hooks
import { useActionData, useNavigation } from "@remix-run/react";
import { ErrorMessage } from "../ErrorMessage";
import { getTargetElement } from "~/libs/browser-utils";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  name: string;
}

export default function Input({ id, name, ...otherProps }: InputProps) {
  const $ipt = useRef<HTMLInputElement | null>(null);
  const navigation = useNavigation();
  const errors = useActionData();
  const error = errors?.[name];

  const isSubmitting = useMemo(
    () => navigation.state === "submitting",
    [navigation.state]
  );

  useEffect(() => {
    const $el = getTargetElement($ipt);
    if (error && $el) {
      $el.focus();
    }
  }, [error]);

  return (
    <>
      <input
        ref={$ipt}
        id={id}
        name={name}
        className={styles.root}
        {...otherProps}
      />
      <ErrorMessage error={error} isSubmitting={isSubmitting} />
    </>
  );
}
