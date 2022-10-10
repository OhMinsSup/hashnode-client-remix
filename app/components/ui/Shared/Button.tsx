import React, { type HTMLAttributes, useRef } from "react";
import { type AriaButtonProps, useButton } from "react-aria";

export interface ButtonProps
  extends Omit<AriaButtonProps<"button">, "type" | "elementType"> {
  title?: HTMLAttributes<HTMLButtonElement>["title"];
  className?: HTMLAttributes<HTMLButtonElement>["className"];
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  className,
  children,
  ...props
}) => {
  let btnRef = useRef<HTMLButtonElement | null>(null);

  const { buttonProps } = useButton(
    {
      type: "button",
      elementType: "button",
      ...props,
    },
    btnRef
  );

  return (
    <button className={className} title={title} ref={btnRef} {...buttonProps}>
      {children}
    </button>
  );
};

export default Button;
