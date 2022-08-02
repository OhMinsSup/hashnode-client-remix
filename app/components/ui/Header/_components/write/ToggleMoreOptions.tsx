import React, { useRef } from "react";
import { useButton } from "react-aria";
import { DownArrow } from "~/components/ui/Icon";

const ToggleMoreOptions = () => {
  let btnRef = useRef<HTMLButtonElement | null>(null);
  const { buttonProps, isPressed } = useButton(
    {
      type: "button",
      elementType: "button",
      "aria-label": "Toggle more options",
      onPressEnd(e) {
        (e.target as unknown as HTMLElement).blur();
      },
    },
    btnRef
  );

  return (
    <div className="relative">
      <button
        ref={btnRef}
        className="inline-flex h-full flex-row items-center justify-center rounded-full border border-transparent px-3 py-1 text-base font-medium text-gray-700 outline-none hover:bg-gray-200"
        {...buttonProps}
      >
        <DownArrow className="h-5 w-5 fill-current" />
      </button>
    </div>
  );
};

export default ToggleMoreOptions;
