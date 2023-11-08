import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { Logo } from "~/components/shared/future/Logo";
import { MainHeaderNavigation } from "~/components/shared/future/MainHeaderNavigation";
import { MainHeaderMenu } from "~/components/shared/future/MainHeaderMenu";
import { optimizeAnimation } from "~/utils/util";
import { useEventListener } from "~/libs/hooks/useEventListener";
import { getTargetElement, getWindowScrollTop } from "~/libs/browser-utils";

interface MainHeaderProps {
  disableScroll?: boolean;
}

export default function MainHeader({ disableScroll }: MainHeaderProps) {
  const ref = useRef<HTMLElement>(null);
  const [translateY, setTranslateY] = useState(0);
  const [, setOpen] = useState(false);
  const [height, setHeight] = useState(0);

  const prevScrollTop = useRef(0);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const scrollMethod = optimizeAnimation(() => {
    const scrollTop = getWindowScrollTop();

    // 현재 스크롤이 내려가는지 올라가는지 판단
    const isScrollDown = scrollTop > prevScrollTop.current;

    // 스크롤이 내려가는 경우
    if (isScrollDown) {
      // 헤더가 사라지는 경우
      if (scrollTop > height) {
        setTranslateY(-height);
      } else {
        setTranslateY(-scrollTop);
      }
    } else {
      // 스크롤이 올라가는 경우
      setTranslateY(0);
    }

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
        ...(disableScroll
          ? {
              position: "relative",
            }
          : { transform: `translateY(${translateY}px)` }),
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
            {disableScroll ? null : <MainHeaderNavigation />}
          </div>
          <div className={styles.header__layout__menu}>
            <MainHeaderMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
