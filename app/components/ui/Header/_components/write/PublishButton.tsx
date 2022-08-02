import React, { useRef } from "react";
import { useButton } from "react-aria";

const PublishButton = () => {
  let btnRef = useRef<HTMLButtonElement | null>(null);
  const { buttonProps, isPressed } = useButton(
    {
      type: "button",
      elementType: "button",
      "aria-label": "post publish",
      onPressEnd(e) {
        (e.target as unknown as HTMLElement).blur();
      },
    },
    btnRef
  );

  return (
    <button
      ref={btnRef}
      {...buttonProps}
      className="ml-2 flex flex-row items-center justify-center rounded-full border border-blue-500 bg-blue-500 py-1 px-3 text-center text-lg font-semibold text-white outline-none hover:shadow-md"
    >
      <span>Publish</span>
    </button>
  );
};

export default PublishButton;
