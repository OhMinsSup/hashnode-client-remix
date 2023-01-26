import React, { useEffect, useRef } from "react";
import { DismissButton, Overlay, usePopover } from "react-aria";
import { useForceUpdate } from "~/libs/hooks/useForceUpdate";

import type { AriaPopoverProps } from "react-aria";
import type { OverlayTriggerState } from "react-stately";

export interface OverridablePopoverProps {
  popoverRef?: React.RefObject<Element>;
}

export interface PopoverProps
  extends Omit<AriaPopoverProps, "popoverRef">,
    OverridablePopoverProps {
  children: React.ReactNode;
  state: OverlayTriggerState;
}

const Popover: React.FC<PopoverProps> = ({
  children,
  state,
  offset = 8,
  ...props
}) => {
  const forceUpdate = useForceUpdate();
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      offset,
      popoverRef,
    },
    state
  );

  console.log("Popover", typeof window);

  console.log("Popover::popoverRef", popoverProps);

  useEffect(() => {
    // BUG: Force update to reposition popover when it opens.
    // This is a workaround for a bug in react-aria where the popover
    // doesn't reposition when it opens.
    timeoutId.current = setTimeout(() => {
      forceUpdate();
    }, 16);

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [state.isOpen]);

  return (
    <Overlay>
      <div {...underlayProps} className="underlay" />
      <div ref={popoverRef} {...popoverProps} className="popover">
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
};

export default Popover;
