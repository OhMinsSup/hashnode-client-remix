import React, { useRef, useEffect } from "react";
import classNames from "classnames";
import { getTargetElement } from "~/libs/browser-utils";
import { Icons } from "~/components/shared/Icons";
import { cn } from "~/utils/util";

type InputProps = React.HTMLProps<HTMLInputElement>;

type LabelProps = React.HTMLProps<HTMLLabelElement>;

type ErrorProps = React.HTMLProps<HTMLParagraphElement>;

interface SettingInputProps {
  inputProps: InputProps;
  labelProps: LabelProps;
  errorProps?: ErrorProps;
  errorId?: string;
  errors?: string[] | undefined;
  text: string;
}

export default function SettingInput({
  labelProps,
  inputProps,
  errorProps,
  errorId,
  errors,
  text,
}: SettingInputProps) {
  const $ipt = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const $el = getTargetElement($ipt);
    if (errors && errors.length && $el) {
      $el.focus();
    }
  }, [errors]);

  return (
    <>
      <label
        {...labelProps}
        className={cn("input-label", labelProps.className)}
      >
        {text}
      </label>
      <input
        {...inputProps}
        ref={$ipt}
        className={classNames("input-text", inputProps.className, {
          error: Boolean(errors?.length),
        })}
      />
      {errorId &&
        errors?.map((error, index) => (
          <p
            {...errorProps}
            key={`error-${errorId}-${index}`}
            className={cn("error-message", errorProps?.className)}
            id={errorId}
          >
            <Icons.V2.Error />
            {error}
          </p>
        ))}
    </>
  );
}
