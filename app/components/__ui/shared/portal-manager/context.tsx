import React from "react";
import { createContext } from "~/libs/react-utils";

interface PortalManagerContext {
  zIndex?: number;
}

const [PortalManagerContextProvider, usePortalManager] =
  createContext<PortalManagerContext | null>({
    strict: false,
    name: "PortalManagerContext",
  });

export interface PortalManagerProps {
  children?: React.ReactNode;
  // 여러 요소가 있는 경우 포털 관리자에 z-인덱스를 적용
  zIndex?: number;
}

export function PortalManager(props: PortalManagerProps) {
  const { children, zIndex } = props;
  return (
    <PortalManagerContextProvider value={{ zIndex }}>
      {children}
    </PortalManagerContextProvider>
  );
}

export { usePortalManager };
