import React, { useRef, useImperativeHandle } from "react";
import type { Argument } from "classnames";
import { type AriaButtonProps, useButton } from "react-aria";
import classNames from "classnames";

export interface ButtonProps extends AriaButtonProps<"button" | "a"> {
  className?: Argument;
  buttonRef?: any;
  style?: React.CSSProperties;
}

function Button(props: ButtonProps, forwardRef?: React.Ref<any>) {
  const { className, style, ...otherProps } = props;

  const ref = useRef<HTMLButtonElement | null>(null);

  const { buttonProps } = useButton(
    {
      type: "button",
      ...otherProps,
    },
    ref
  );

  useImperativeHandle(forwardRef, () => ref.current);

  return (
    <button
      ref={ref}
      className={classNames(className)}
      style={style}
      {...buttonProps}
    >
      {props.children}
    </button>
  );
}

export default React.forwardRef(Button);
