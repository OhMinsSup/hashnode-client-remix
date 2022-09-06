import React, { useRef } from "react";
import { type AriaButtonProps, useButton } from "react-aria";

interface ActionButtonProps
  extends Omit<AriaButtonProps<"button">, "type" | "elementType"> {
  icon: React.ReactNode;
  text: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  text,
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
    <button
      className="mr-2 flex flex-row items-center justify-center rounded-full border border-gray-200 px-3 py-1 text-center text-sm font-medium text-gray-700 outline-none"
      ref={btnRef}
      {...buttonProps}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default ActionButton;
