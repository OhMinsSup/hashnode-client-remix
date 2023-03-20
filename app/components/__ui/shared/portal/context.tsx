import React, { useRef } from "react";
import { createPortal } from "react-dom";

import { useIsomorphicLayoutEffect } from "react-use";
import { usePortalManager } from "../portal-manager/context";
import { useForceUpdate } from "~/libs/hooks/useForceUpdate";

import { isBrowser } from "~/libs/browser-utils";
import { createContext } from "~/libs/react-utils";

type PortalContext = HTMLDivElement | null;

const [PortalProvider, usePortalContext] = createContext<PortalContext>({
  strict: false,
  name: "PortalContext",
});

const PORTAL_CLASSNAME = "next-headless-portal-root";
const PORTAL_SELECTOR = ".next-headless-portal-root";

const Container: React.FC<{ zIndex: number; children: React.ReactNode }> = (
  props
) => (
  <div
    className="-portal-zIndex"
    style={{
      position: "absolute",
      zIndex: props.zIndex,
      top: 0,
      left: 0,
      right: 0,
    }}
  >
    {props.children}
  </div>
);

const DefaultPortal: React.FC<{
  appendToParentPortal?: boolean;
  children: React.ReactNode;
}> = (props) => {
  const { appendToParentPortal, children } = props;

  const tempNode = useRef<HTMLDivElement | null>(null);
  const portal = useRef<HTMLDivElement | null>(null);

  // dom을 강제로 렌더링하기 위해서 사용
  const forceUpdate = useForceUpdate();

  const parentPortal = usePortalContext();
  const manager = usePortalManager();

  useIsomorphicLayoutEffect(() => {
    if (!tempNode.current) return;

    const doc = tempNode.current?.ownerDocument; // 읽기 전용 속성 => node 의 최상위 document 객체를 반환
    const host = appendToParentPortal ? parentPortal ?? doc.body : doc.body;

    if (!host) return;

    portal.current = doc?.createElement("div");
    portal.current.className = PORTAL_CLASSNAME;

    host.appendChild(portal.current);
    // dom을 강제로 렌더링하기 위해서 사용
    forceUpdate();

    const portalNode = portal.current;
    return () => {
      if (host.contains(portalNode)) {
        host.removeChild(portalNode);
      }
    };
  }, []);

  const _children = manager?.zIndex ? (
    <Container zIndex={manager?.zIndex}>{children}</Container>
  ) : (
    children
  );

  return portal.current ? (
    createPortal(
      <PortalProvider value={portal.current}>{_children}</PortalProvider>,
      portal.current
    )
  ) : (
    <span ref={tempNode} />
  );
};

interface ContainerPortalProps {
  containerRef: React.RefObject<HTMLElement | null>;
  appendToParentPortal?: boolean;
  children: React.ReactNode;
}

const ContainerPortal: React.FC<ContainerPortalProps> = (props) => {
  const { children, containerRef, appendToParentPortal } = props;
  const containerEl = containerRef.current;
  const host = containerEl ?? (isBrowser ? document.body : undefined);

  const portal = React.useMemo(() => {
    // 읽기 전용 속성 => node 의 최상위 document 객체에서 새로운 element 생성
    const node = containerEl?.ownerDocument.createElement("div");
    if (node) node.className = PORTAL_CLASSNAME;
    return node;
  }, [containerEl]);

  // dom을 강제로 렌더링하기 위해서 사용
  const forceUpdate = useForceUpdate();

  // 컴포넌트 렌더링 - useLayoutEffect 실행 - 화면 업데이트 (서버 환경에서는 실행이 안됨 이때는 useEffect 사용)
  // 동기적으로 실행됨
  useIsomorphicLayoutEffect(() => {
    // dom을 강제로 렌더링하기 위해서 사용
    forceUpdate();
  }, []);

  // 컴포넌트 렌더링 - useLayoutEffect 실행 - 화면 업데이트 (서버 환경에서는 실행이 안됨 이때는 useEffect 사용)
  // 동기적으로 실행됨
  useIsomorphicLayoutEffect(() => {
    if (!portal || !host) return;
    host.appendChild(portal);
    return () => {
      host.removeChild(portal);
    };
  }, [portal, host]);

  if (host && portal) {
    return createPortal(
      <PortalProvider value={appendToParentPortal ? portal : null}>
        {children}
      </PortalProvider>,
      portal
    );
  }

  return null;
};

export interface PortalProps {
  /**
   * 포털이 연결될 구성요소에 대한 'ref' 속성을 지정 */
  containerRef?: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
  /**
   * appendToParentPortal "true"인 경우 중첩 portal를 추가 (상위 portal에 추가)
   * appendToParentPortal "false"인 경우 document.body에 추가 (중첩불가) */
  appendToParentPortal?: boolean;
}

export function Portal(props: PortalProps) {
  const { containerRef, ...rest } = props;
  return containerRef ? (
    <ContainerPortal containerRef={containerRef} {...rest} />
  ) : (
    <DefaultPortal {...rest} />
  );
}

Portal.defaultProps = {
  appendToParentPortal: true,
};

Portal.className = PORTAL_CLASSNAME;
Portal.selector = PORTAL_SELECTOR;
