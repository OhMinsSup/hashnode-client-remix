import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";

// hooks
import { useActionData } from "@remix-run/react";
import { getTargetElement } from "~/libs/browser-utils";
import { cn } from "~/utils/util";

// types
import type { ActionData } from "~/routes/_auth.signin";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  name: string;
}

export default function Input({ id, name, ...otherProps }: InputProps) {
  const $ipt = useRef<HTMLInputElement | null>(null);
  const data = useActionData<ActionData>();

  const error = data?.errors?.[name];

  useEffect(() => {
    const $el = getTargetElement($ipt);
    if (error && $el) {
      $el.focus();
    }
  }, [error]);

  return (
    <input
      {...otherProps}
      ref={$ipt}
      id={id}
      name={name}
      className={cn(styles.input, otherProps.className)}
    />
  );
}
