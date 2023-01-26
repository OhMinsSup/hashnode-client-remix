import React, { useRef } from "react";
import { useDialog } from "react-aria";
import classNames from "classnames";

// types
import type { AriaDialogProps } from "react-aria";
import type { Argument } from "classnames";

interface SimepleDialogProps extends AriaDialogProps {
  title?: string;
  className?: Argument;
  children: any;
}

export const SimpleDialog: React.FC<SimepleDialogProps> = ({
  children,
  title,
  className,
  ...props
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div {...dialogProps} ref={ref} className={classNames(className)}>
      {title && <h3 {...titleProps}>{title}</h3>}
      {children}
    </div>
  );
};
