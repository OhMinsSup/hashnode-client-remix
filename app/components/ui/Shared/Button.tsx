import React, { useRef } from "react";
import type { Argument } from "classnames";
import { type AriaButtonProps, useButton } from "react-aria";
import classNames from "classnames";

export interface ButtonProps extends AriaButtonProps<"button" | "a"> {
  className?: Argument;
  buttonRef?: any;
  style?: React.CSSProperties;
}

function Button(props: ButtonProps) {
  const { className, style, ...otherProps } = props;

  const ref = useRef<HTMLButtonElement | null>(props.buttonRef ?? null);

  const { buttonProps } = useButton(
    {
      ...otherProps,
      type: "button",
    },
    ref
  );

  return (
    <button
      className={classNames(className)}
      style={style}
      {...buttonProps}
      ref={ref}
    >
      {props.children}
    </button>
  );
}

export default Button;
