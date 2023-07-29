import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { Logo } from "~/components/shared/future/Logo";
import { MainHeaderNavigation } from "~/components/shared/future/MainHeaderNavigation";
import { MainHeaderMenu } from "~/components/shared/future/MainHeaderMenu";
import { optimizeAnimation } from "~/utils/util";
import { useEventListener } from "~/libs/hooks/useEventListener";
import { getTargetElement, getWindowScrollTop } from "~/libs/browser-utils";

export default function MainHeader() {
  const ref = useRef<HTMLElement>(null);
  const [height, setHeight] = useState(0);
  const [marginTop, setMarginTop] = useState(0);
  const [, setOpen] = useState(false);

  const prevScrollTop = useRef(0);
  const direction = useRef<"UP" | "DOWN">("DOWN");
  const transitionPoint = useRef(0);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const scrollMethod = optimizeAnimation(() => {
    const scrollTop = getWindowScrollTop();
    const nextDirection = prevScrollTop.current > scrollTop ? "UP" : "DOWN";

    if (
      direction.current === "DOWN" &&
      nextDirection === "UP" &&
      transitionPoint.current - scrollTop < 0
    ) {
      transitionPoint.current = scrollTop;
    }

    if (
      direction.current === "UP" &&
      nextDirection === "DOWN" &&
      scrollTop - transitionPoint.current < -1 * height
    ) {
      transitionPoint.current = scrollTop + height;
    }

    setMarginTop(
      Math.min(0, -1 * height + transitionPoint.current - scrollTop)
    );

    direction.current = nextDirection;
    prevScrollTop.current = scrollTop;
  });

  useEventListener("scroll", scrollMethod);

  useEffect(() => {
    const $ele = getTargetElement(ref);
    if (!$ele) return;
    setHeight($ele.clientHeight);
  }, []);

  return (
    <header
      className={styles.root}
      style={{
        transform: `translateY(${marginTop}px)`,
      }}
      ref={ref}
    >
      <section aria-hidden="false" className="css-0"></section>
      <div className={styles.header}>
        <div className={styles.header__layout}>
          <div className={styles.header__layout__logo}>
            <Logo onOpen={onOpen} />
          </div>
          <div className={styles.header__layout__navigation}>
            <MainHeaderNavigation />
          </div>
          <div className={styles.header__layout__menu}>
            <MainHeaderMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
