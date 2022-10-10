import { ConfirmDialog } from "../_components";

// utils
import { destroyFns } from "./destroyFns";
import { isFunction } from "~/utils/assertion";
import {
  unmount as reactUnmount,
  render as reactRender,
} from "~/libs/react-utils";

// types
import type { ModalFuncProps } from "./types";

type ConfigUpdate =
  | ModalFuncProps
  | ((prevConfig: ModalFuncProps) => ModalFuncProps);

export type ModalFunc = (props?: ModalFuncProps) => {
  destroy: () => void;
  update: (configUpdate: ConfigUpdate) => void;
};

export type ModalStaticFunctions = Record<
  NonNullable<ModalFuncProps["type"]>,
  ModalFunc
>;

export default function confirm(config: ModalFuncProps) {
  // 다른 노드를 담는 임시 컨테이너 역할을 하는 특수 목적의 노드
  // 가상의 노드 객체로서, 메모리상에서만 존재. parentNode 프로퍼티는 항상 null이다.
  const container = document.createDocumentFragment();

  let currentConfig = { ...config, close, visible: true } as any;

  function destroy(...args: any[]) {
    const triggerCancel = args.some((param) => param && param.triggerCancel);
    if (config.onCancel && triggerCancel) {
      config.onCancel(...args);
    }
    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
    reactUnmount(container);
  }

  function render({ okText, cancelText, ...props }: any) {
    // 동기화 렌더링은 React 이벤트를 차단

    setTimeout(() => {
      reactRender(
        <ConfirmDialog {...props} okText={okText} cancelText={cancelText} />,
        container
      );
    });
  }

  function close(...args: any[]) {
    currentConfig = {
      ...currentConfig,
      visible: false,
      afterClose: () => {
        if (isFunction(config.afterClose)) {
          config.afterClose();
        }
        // @ts-ignore
        destroy.apply(this, args);
      },
    };
    render(currentConfig);
  }

  function update(configUpdate: ConfigUpdate) {
    if (isFunction(configUpdate)) {
      currentConfig = configUpdate(currentConfig);
    } else {
      currentConfig = {
        ...currentConfig,
        ...configUpdate,
      };
    }
    render(currentConfig);
  }

  render(currentConfig);

  destroyFns.push(close);

  return {
    destroy: close,
    update,
  };
}

export function withWarn(props: ModalFuncProps): ModalFuncProps {
  return {
    hiddenCancel: false,
    ...props,
    type: "warning",
  };
}

export function withInfo(props: ModalFuncProps): ModalFuncProps {
  return {
    hiddenCancel: false,
    ...props,
    type: "info",
  };
}

export function withSuccess(props: ModalFuncProps): ModalFuncProps {
  return {
    hiddenCancel: false,
    ...props,
    type: "success",
  };
}

export function withError(props: ModalFuncProps): ModalFuncProps {
  return {
    hiddenCancel: false,
    ...props,
    type: "error",
  };
}

export function withConfirm(props: ModalFuncProps): ModalFuncProps {
  return {
    hiddenCancel: true,
    ...props,
    type: "confirm",
  };
}

export function withAlert(props: ModalFuncProps): ModalFuncProps {
  return {
    hiddenCancel: false,
    hiddenClose: true,
    hiddenOk: true,
    ...props,
    type: "alert",
  };
}
