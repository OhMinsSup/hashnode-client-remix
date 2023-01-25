import React, { useRef } from "react";
import { DismissButton, Overlay, usePopover } from "react-aria";

import type { AriaPopoverProps } from "react-aria";
import type { OverlayTriggerState } from "react-stately";

interface OverridablePopoverProps {
  popoverRef?: React.RefObject<Element>;
}

interface PopoverProps
  extends Omit<AriaPopoverProps, "popoverRef">,
    OverridablePopoverProps {
  children: React.ReactNode;
  state: OverlayTriggerState;
}

const Popover: React.FC<PopoverProps> = ({
  children,
  state,
  popoverRef: overridePopoverRef,
  offset = 8,
  ...props
}) => {
  const popoverRef = useRef<Element | null>(
    overridePopoverRef?.current ?? null
  );
  const { popoverProps, underlayProps, arrowProps, placement } = usePopover(
    {
      ...props,
      offset,
      popoverRef,
    },
    state
  );

  return (
    <Overlay>
      <div {...underlayProps} className="underlay" />
      {/* @ts-ignore */}
      <div {...popoverProps} ref={popoverRef} className="popover">
        <svg {...arrowProps} className="arrow" data-placement={placement}>
          <path d="M0 0,L6 6,L12 0" />
        </svg>
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
};

export default Popover;
