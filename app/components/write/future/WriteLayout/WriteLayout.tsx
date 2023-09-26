import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { useWriteContext } from "~/context/useWriteContext";
import { cn } from "~/utils/util";
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
  const isMobile = useMediaQuery("(max-width: 768px)", hydrating);

  useEffect(() => {
    if (isMobile) setSideClose();
  }, [isMobile]);

  console.log("hydrating", hydrating);

  return (
    <div className={styles.root} data-hydrating-signal>
      <div
        className={cn(styles.left, {
          "!hidden": !isSideOpen,
        })}
      >
        {sidebar}
      </div>
      <div
        className={cn(isSideOpen ? styles.content : styles.content_type_02, {
          "!hidden": isMobile && isSideOpen,
        })}
      >
        {children}
      </div>
    </div>
  );
}
