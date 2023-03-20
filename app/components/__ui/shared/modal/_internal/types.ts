import type { Argument } from "classnames";

export interface OkButtonProps extends Record<string, any> {}

export interface CancelButtonProps extends Record<string, any> {}

export interface TitleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
  className?: Argument;
}

export interface FooterProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
  className?: Argument;
}

export interface ContentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
  className?: Argument;
}

export interface ModalFuncProps {
  // config
  className?: string;

  // boolean
  visible?: boolean;
  hiddenCancel?: boolean;
  hiddenOk?: boolean;
  hiddenClose?: boolean;
  emitEvent?: boolean;
  quitOnNullishReturnValue?: boolean;

  // func
  onOk?: (...args: any[]) => any;
  onCancel?: (...args: any[]) => any;
  afterClose?: () => void;

  // types
  type?:
    | "info"
    | "success"
    | "error"
    | "warn"
    | "warning"
    | "confirm"
    | "alert";

  // element
  okButtonProps?: OkButtonProps;
  cancelButtonProps?: CancelButtonProps;
  titleProps?: TitleProps;
  footerProps?: FooterProps;
  contentProps?: ContentProps;

  // components
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  title?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
}
