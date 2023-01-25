import React, { useRef } from "react";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";

import Button, { type ButtonProps } from "~/components/ui/shared/Button";
import Popover from "~/components/ui/shared/Popover";
import { When } from "react-if";

type ReactTag = keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;

interface PopoverTriggerProps {
  label: React.ReactNode;
  children: any;
  eleAs: ReactTag;
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

  const Element = eleAs || React.Fragment;

  return (
    <>
      <Element {...eleProps}>
        <Button {...triggerButtonProps} {...triggerProps} buttonRef={ref}>
          {label}
        </Button>
      </Element>
      <When condition={state.isOpen}>
        <Popover {...props} triggerRef={ref} state={state}>
          {React.cloneElement(children, overlayProps)}
        </Popover>
      </When>
    </>
  );
};

export default PopoverTrigger;
