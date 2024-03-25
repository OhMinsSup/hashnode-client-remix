import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { useWriteContext } from "~/context/useWriteContext";
import { cn } from "~/utils/utils";
import { useMediaQuery } from "~/libs/hooks/useMediaQuery";
import { useIsHydrating } from "~/libs/hooks/useIsHydrating";

interface WriteLayoutProps {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}

export default function WriteLayout({ children, sidebar }: WriteLayoutProps) {
  const { isSideOpen, setSideClose } = useWriteContext();

  const hydrating = useIsHydrating("[data-hydrating-signal]");

  // 768px 이하
  const isMobile = useMediaQuery("(max-width: 640px)", hydrating);

  useEffect(() => {
    if (isMobile) setSideClose();
  }, [isMobile]);

  return (
    <div
      className={cn(isSideOpen ? styles.root : styles.root_left_closed)}
      data-hydrating-signal
    >
      <div className={cn(isSideOpen ? styles.left : styles.left_closed)}>
        {sidebar}
      </div>
      <div
        className={cn(isSideOpen ? styles.content : styles.content_left_closed)}
      >
        {children}
      </div>
    </div>
  );
}
