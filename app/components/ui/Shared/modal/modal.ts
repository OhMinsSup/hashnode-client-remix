import {
  confirm,
  withConfirm,
  withError,
  withInfo,
  withSuccess,
  withWarn,
  withAlert,
  withLoading,
  destroyFns,
} from "./_internal";
import { ConfirmDialog } from "./_components";
import type { ModalStaticFunctions } from "./_internal/confirm";
import type { ModalFuncProps } from "./_internal/types";

type ModalType = typeof ConfirmDialog &
  ModalStaticFunctions & {
    destroyAll: () => void;
  };

const Modal = ConfirmDialog as ModalType;

Modal.info = function infoFn(props?: ModalFuncProps) {
  return confirm(withInfo(props ?? {}));
};

Modal.success = function successFn(props?: ModalFuncProps) {
  return confirm(withSuccess(props ?? {}));
};

Modal.error = function errorFn(props?: ModalFuncProps) {
  return confirm(withError(props ?? {}));
};

Modal.warning = function modalWarn(props?: ModalFuncProps) {
  return confirm(withWarn(props ?? {}));
};
Modal.warn = function modalWarn(props?: ModalFuncProps) {
  return confirm(withWarn(props ?? {}));
};

Modal.confirm = function confirmFn(props?: ModalFuncProps) {
  return confirm(withConfirm(props ?? {}));
};

Modal.alert = function alertFn(props?: ModalFuncProps) {
  return confirm(withAlert(props ?? {}));
};

Modal.destroyAll = function destroyAllFn() {
  while (destroyFns.length) {
    const close = destroyFns.pop();
    if (close) close();
  }
};

export default Modal;
