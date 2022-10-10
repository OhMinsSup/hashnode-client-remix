import { isEmpty } from "~/utils/assertion";
import type * as React from "react";
import * as ReactDOM from "react-dom";

type CreateRoot = (container: ContainerType) => any;

const MARK = "__app_container_react_root__";

// ========================== Render ==========================
type ContainerType = (Element | DocumentFragment) & {
  [MARK]?: any;
};

// 컴파일러가 모듈 사용을 검색하지 않도록 합니다.
const fullClone = {
  ...ReactDOM,
} as typeof ReactDOM & {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?: {
    usingClientEntryPoint?: boolean;
  };
  createRoot?: CreateRoot;
};

const { version, render: reactRender, unmountComponentAtNode } = fullClone;

let createRoot: CreateRoot;
try {
  const mainVersion = Number((version || "").split(".")[0]);
  if (mainVersion >= 18) {
    // @ts-ignore
    ({ createRoot } = fullClone);
  }
} catch (e) {
  // Do nothing;
}

// render

function modernRender(node: React.ReactElement, container: ContainerType) {
  const root = container[MARK] || createRoot(container);

  root.render(node);

  container[MARK] = root;
}

function legacyRender(node: React.ReactElement, container: ContainerType) {
  reactRender(node, container);
}

export function render(node: React.ReactElement, container: ContainerType) {
  if (!isEmpty(createRoot)) {
    modernRender(node, container);
    return;
  }

  legacyRender(node, container);
}

// umount
async function modernUnmount(container: ContainerType) {
  // Delay to unmount to avoid React 18 sync warning
  return Promise.resolve().then(() => {
    container[MARK]?.unmount();

    delete container[MARK];
  });
}

function legacyUnmount(container: ContainerType) {
  unmountComponentAtNode(container);
}

export async function unmount(container: ContainerType) {
  if (createRoot !== undefined) {
    // Delay to unmount to avoid React 18 sync warning
    return modernUnmount(container);
  }

  legacyUnmount(container);
}
