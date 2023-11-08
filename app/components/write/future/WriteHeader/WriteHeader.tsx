import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { cn, optimizeAnimation } from "~/utils/util";
import { getTargetElement, getWindowScrollTop } from "~/libs/browser-utils";
import { useEventListener } from "~/libs/hooks/useEventListener";

interface WriteHeaderProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export default function WriteHeader({ left, right }: WriteHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prevScrollTop = useRef(0);
  const [translateY, setTranslateY] = useState(0);
  const [height, setHeight] = useState(0);

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
    <div
      className={cn(translateY === 0 ? styles.root : styles.rootFixed)}
      ref={ref}
    >
      <div className={styles.wrapper}>
        <div className={styles.left}>{left}</div>
        <div className={styles.right}>{right}</div>
      </div>
    </div>
  );
}
