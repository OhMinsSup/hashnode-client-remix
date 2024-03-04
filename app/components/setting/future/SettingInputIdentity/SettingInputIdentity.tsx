import React, { useRef, useEffect } from "react";
import classNames from "classnames";
import { getTargetElement } from "~/libs/browser-utils";
import { Icons } from "~/components/shared/Icons";
import { cn } from "~/utils/util";

type InputProps = React.HTMLProps<HTMLInputElement>;

type LabelProps = React.HTMLProps<HTMLLabelElement>;

type ErrorProps = React.HTMLProps<HTMLParagraphElement>;

interface SettingInputIdentityProps {
  text: string;
  desc: string;
  inputProps: InputProps;
  labelProps: LabelProps;
  errorProps?: ErrorProps;
  errorId?: string;
  errors?: string[] | undefined;
}

export default function SettingInputIdentity({
  labelProps,
  inputProps,
  errorProps,
  errorId,
  errors,
  text,
  desc,
}: SettingInputIdentityProps) {
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
      <small className="input-help">{desc}</small>
      <div className="relative">
        <input
          {...inputProps}
          ref={$ipt}
          className={classNames("input-text", inputProps.className, {
            error: Boolean(errors?.length),
          })}
        />
        <div className="z-100 absolute right-0 top-0 mr-4 mt-4"></div>
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
      </div>
    </>
  );
}
