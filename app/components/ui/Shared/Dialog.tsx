import React, { useRef } from "react";
import { useDialog } from "react-aria";
import classNames from "classnames";

// types
import type { AriaDialogProps } from "react-aria";
import type { Argument } from "classnames";

interface SimepleDialogProps extends AriaDialogProps {
  className?: Argument;
  children: any;
}

export const SimpleDialog: React.FC<SimepleDialogProps> = ({
  children,
  className,
  ...props
}) => {
  console.log("SimpleDialog");
  const ref = useRef<HTMLDivElement | null>(null);
  const { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div {...dialogProps} ref={ref} className={classNames(className)}>
      {React.cloneElement(children, titleProps)}
    </div>
  );
};
