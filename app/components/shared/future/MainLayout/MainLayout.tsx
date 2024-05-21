import { useRef } from 'react';

import { ClientOnly } from '~/components/shared/future/ClientOnly';
import { useEventListener } from '~/libs/hooks/useEventListener';
import { cn, optimizeAnimation } from '~/services/libs';
import styles from './styles.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  hiddenHeader?: boolean;
  hiddenFooter?: boolean;
  isCustomMain?: boolean;
  hasScrollSensor?: boolean;
}

function ScrollSensor() {
  const cachedScroll = useRef(0);

  useEventListener(
    'scroll',
    optimizeAnimation(() => {
      // 스크롤이 다운되면 header 태그의 "transform" 속성을 이용해서 화면에서 사라지게 만들고, 스크롤이 올라가면 다시 나타나게 만든다.
      // 마지막으로 스크롤이 최상단에 도달하면 header 태그의 "transform" 속성을 초기화한다.

      const header = document.querySelector('header');
      if (!header) {
        return;
      }

      // CSS transition 속성 추가
      header.style.transition = 'transform 0.3s ease';

      const currentScroll = window.scrollY;
      const isScrollDown = currentScroll > cachedScroll.current;
      const isScrollTop = currentScroll === 0;

      if (isScrollDown) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }

      if (isScrollTop) {
        header.style.transform = '';
      }

      cachedScroll.current = currentScroll;
    }),
    {
      passive: true,
    },
  );

  return null;
}

export default function MainLayout({
  children,
  footer,
  header,
  hiddenHeader,
  hiddenFooter,
  isCustomMain,
  hasScrollSensor,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen">
      {hiddenHeader ? null : (
        <header className={styles.header}>{header}</header>
      )}
      {isCustomMain ? (
        <>{children}</>
      ) : (
        <main className={styles.main}>{children}</main>
      )}
      {hiddenFooter ? null : (
        <nav
          className={cn(
            styles.nav,
            'bg-slate-50 dark:border-slate-950 dark:bg-slate-950 dark:text-white',
          )}
        >
          {footer}
        </nav>
      )}
      {hasScrollSensor ? (
        <ClientOnly>
          <ScrollSensor />
        </ClientOnly>
      ) : null}
    </div>
  );
}
