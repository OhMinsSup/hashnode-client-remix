import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { cn } from "~/utils/util";
import { Icons } from "~/components/shared/Icons";
import { getTargetElement } from "~/libs/browser-utils";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  name: string;
  errorId?: string;
  errors?: string[] | undefined;
}

export default function Input({
  id,
  name,
  errors,
  errorId,
  ...otherProps
}: InputProps) {
  const $ipt = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const $el = getTargetElement($ipt);
    if (errors && errors.length && $el) {
      $el.focus();
    }
  }, [errors]);

  return (
    <>
      <input
        {...otherProps}
        ref={$ipt}
        id={id}
        name={name}
        className={cn(styles.input, otherProps.className)}
      />
      {errors?.map((error, index) => (
        <p key={`error-${name}-${index}`} className={styles.error} id={errorId}>
          <Icons.V2.Error />
          {error}
        </p>
      ))}
    </>
  );
}
