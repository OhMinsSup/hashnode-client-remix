import React, { useRef, useEffect } from "react";
import classNames from "classnames";
import { getTargetElement } from "~/libs/browser-utils";
import { Icons } from "~/components/shared/Icons";
import { cn } from "~/utils/util";

type TextareaProps = React.HTMLProps<HTMLTextAreaElement>;

type LabelProps = React.HTMLProps<HTMLLabelElement>;

type ErrorProps = React.HTMLProps<HTMLParagraphElement>;

interface SettingTextareaProps {
  textareaProps: TextareaProps;
  labelProps: LabelProps;
  errorProps?: ErrorProps;
  errorId?: string;
  errors?: string[] | undefined;
  text: string;
  count?: number;
}

const MAX_LENGTH = 140;

export default function SettingTextarea({
  labelProps,
  textareaProps,
  errorProps,
  errorId,
  errors,
  text,
  count,
}: SettingTextareaProps) {
  const $txt = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const $el = getTargetElement($txt);
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
      <textarea
        {...textareaProps}
        ref={$txt}
        className={classNames("input-text min-h-30", textareaProps.className, {
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
      {textareaProps.name === "availableText" && (
        <small className="ml-2 mt-1 block leading-tight text-slate-600">
          {count}/{MAX_LENGTH}
        </small>
      )}
    </>
  );
}
