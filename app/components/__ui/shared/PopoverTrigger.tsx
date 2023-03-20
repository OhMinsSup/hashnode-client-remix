import React, { useRef } from "react";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";

import Button, { type ButtonProps } from "~/components/__ui/shared/Button";
import Popover from "~/components/__ui/shared/Popover";

import type { AriaPopoverProps } from "react-aria";
import type { OverlayTriggerProps } from "react-stately";

type ReactTag = keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;

interface PopoverTriggerProps
  extends Partial<AriaPopoverProps>,
    OverlayTriggerProps {
  label: React.ReactNode;
  children: any;
  eleAs?: ReactTag;
  eleProps?: React.DetailedHTMLProps<React.HTMLAttributes<any>, any>;
  triggerButtonProps?: ButtonProps;
}

const PopoverTrigger: React.FC<PopoverTriggerProps> = ({
  label,
  children,
  triggerButtonProps,
  eleAs,
  eleProps,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const state = useOverlayTriggerState(props);
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    ref
  );

  const Element = eleAs || "div";

  return (
    <>
      <Element {...eleProps}>
        <Button ref={ref} {...triggerButtonProps} {...triggerProps}>
          {label}
        </Button>
      </Element>
      {state.isOpen ? (
        <Popover {...props} triggerRef={ref} state={state}>
          {React.cloneElement(children, overlayProps)}
        </Popover>
      ) : null}
    </>
  );
};

export default PopoverTrigger;
