import React from "react";
import classNames from "classnames";

// components
import { Dialog } from "@headlessui/react";

// utils
import { isThenable } from "~/utils/assertion";

// types
import type { ModalFuncProps } from "../_internal";
import type { PressEvent } from "@react-types/shared";

interface ConfirmDialogProps extends ModalFuncProps {
  afterClose?: () => void;
  close: (...args: any[]) => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
  const {
    onCancel,
    onOk,
    close,
    afterClose,

    visible,
    hiddenCancel = false,
    hiddenOk = false,
    hiddenClose = false,

    // pro
    className,

    // element
    okButtonProps,
    cancelButtonProps,
    titleProps,
    footerProps,
    contentProps,

    // components
    title,
    footer,
    header,
    okText,
    cancelText,
    content,
  } = props;

  const clickedRef = React.useRef<boolean>(false);
  const divRef = React.useRef<HTMLDivElement | null>(null);

  const onInternalClose = (...args: any[]) => {
    afterClose?.();

    close?.(...args);
  };

  const handlePromiseOnOk = (returnValueOfOnOk?: PromiseLike<any>) => {
    if (!isThenable(returnValueOfOnOk)) {
      return;
    }
    returnValueOfOnOk?.then(
      (...args: any[]) => {
        onInternalClose(...args);
        clickedRef.current = false;
      },
      (e: Error) => {
        // Emit error when catch promise reject
        // eslint-disable-next-line no-console
        console.error(e);
        // See: https://github.com/ant-design/ant-design/issues/6183
        clickedRef.current = false;
      }
    );
  };

  const onClick = (
    e: PressEvent,
    actionFn?: (...args: any[]) => any | PromiseLike<any>
  ) => {
    if (clickedRef.current) return;

    clickedRef.current = true;
    if (!actionFn) {
      onInternalClose();
      return;
    }
    let returnValueOfOnOk;
    if (props.emitEvent) {
      returnValueOfOnOk = actionFn(e);
      if (props.quitOnNullishReturnValue && !isThenable(returnValueOfOnOk)) {
        clickedRef.current = false;
        onInternalClose(e);
        return;
      }
    } else if (actionFn.length) {
      returnValueOfOnOk = actionFn(close);
      clickedRef.current = false;
    } else {
      returnValueOfOnOk = actionFn();
      if (!returnValueOfOnOk) {
        onInternalClose();
        return;
      }
    }
    handlePromiseOnOk(returnValueOfOnOk);
  };

  const onClose = () => {
    close?.({ triggerCancel: true });
  };

  const onClickCancle = (e: any) => {
    onClick(e, onCancel);
  };

  const onClickOk = (e: any) => {
    onClick(e, onOk);
  };

  if (!visible) return null;

  return (
    <Dialog open={visible} onClose={onClose}>
      <div
        role="alert"
        aria-label="팝업"
        className={classNames("default-popup-layer", className)}
      >
        <div className="dim"></div>
        <div className="popup-container" ref={divRef}>
          <>
            {header ? (
              header
            ) : (
              <div
                aria-label="dialog title"
                className={classNames(
                  "popup-title-area",
                  titleProps?.className
                )}
              >
                <Dialog.Title as="h1">{title}</Dialog.Title>
                {!hiddenClose && (
                  <div className="right-area">
                    <button
                      type="button"
                      onClick={onClose}
                      className="btn-layer-close"
                      aria-label="닫기 버튼"
                    />
                  </div>
                )}
              </div>
            )}
          </>

          <div
            aria-label="dialog content"
            className={classNames("popup-cont", contentProps?.className)}
          >
            {content}
          </div>
          <>
            {footer ? (
              footer
            ) : (
              <div
                aria-label="dialog footer"
                className={classNames("popup-btn-area", footerProps?.className)}
              >
                {!hiddenOk && (
                  <button
                    type="button"
                    aria-label="확인 버튼"
                    onClick={onClickOk}
                    className={"btn btn-lg btn-primary"}
                    {...okButtonProps}
                  >
                    {okText ?? "확인"}
                  </button>
                )}
                {!hiddenCancel && (
                  <button
                    type="button"
                    aria-label="취소 버튼"
                    onClick={onClickCancle}
                    className={`btn btn-lg btn-white`}
                    {...cancelButtonProps}
                  >
                    {cancelText ?? "취소"}
                  </button>
                )}
              </div>
            )}
          </>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
