import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { Logo } from "~/components/shared/future/Logo";
import { MainHeaderNavigation } from "~/components/shared/future/MainHeaderNavigation";
import { MainHeaderMenu } from "~/components/shared/future/MainHeaderMenu";
import { optimizeAnimation } from "~/utils/util";
import { useEventListener } from "~/libs/hooks/useEventListener";
import { getTargetElement, getWindowScrollTop } from "~/libs/browser-utils";
import { useMemoizedFn } from "~/libs/hooks/useMemoizedFn";

interface MainHeaderProps {
  disableScroll?: boolean;
}

export default function MainHeader({ disableScroll }: MainHeaderProps) {
  const ref = useRef<HTMLElement>(null);
  const [translateY, setTranslateY] = useState(0);
  const [height, setHeight] = useState(0);

  const prevScrollTop = useRef(0);

  const scrollMethod = useMemoizedFn(
    optimizeAnimation(() => {
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
        // 애니메이션처럼 점점 보이게 하는 경우
        setTranslateY((old) => {
          if (old >= 0) return 0;
          const x = height / 10;
          return old + x;
        });
      }

      prevScrollTop.current = scrollTop;
    })
  );

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
      <div className={styles.header}>
        <div className={styles.header__layout}>
          <div className={styles.header__layout__logo}>
            <Logo />
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
