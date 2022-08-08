import React, { type HTMLAttributes, useRef } from "react";
import { type AriaButtonProps, useButton } from "react-aria";

interface ButtonProps
  extends Omit<AriaButtonProps<"button">, "type" | "elementType"> {
  icon?: React.ReactNode;
  text?: string;
  title?: HTMLAttributes<HTMLButtonElement>["title"];
  className?: HTMLAttributes<HTMLButtonElement>["className"];
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  text,
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
      {icon}
      {text && <span>{text}</span>}
      {children}
    </button>
  );
};

export default Button;
