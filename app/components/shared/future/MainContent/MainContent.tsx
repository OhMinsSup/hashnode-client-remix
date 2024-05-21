import { useRef } from 'react';

import { ClientOnly } from '~/components/shared/future/ClientOnly';
import { useEventListener } from '~/libs/hooks/useEventListener';
import { cn, optimizeAnimation } from '~/services/libs';
import styles from './styles.module.css';

interface MainContentProps {
  children: React.ReactNode;
  aside?: React.ReactNode;
  hasScrollSensor?: boolean;
}

function ScrollSensor() {
  const cachedScroll = useRef(0);

  useEventListener(
    'scroll',
    optimizeAnimation(() => {
      // 스크롤이 되면서 스크롤의 위치가 -2000px 이하면 top에 해당 스크롤의 위치값을 넣어주고 position을 sticky로 변하고 -2000px 이상이면 position을 relative, top을 0으로 변하게 한다.
      const aside = document.querySelector('aside');
      if (!aside) {
        return;
      }

      const currentScroll = window.scrollY;
      const isScrollTop = currentScroll > 2000;

      if (isScrollTop) {
        aside.setAttribute('style', 'position: sticky; top: 0;');
      } else {
        aside.setAttribute(
          'style',
          'position: relative; top: 0; height: 100%;',
        );
      }

      cachedScroll.current = currentScroll;
    }),
    {
      passive: true,
    },
  );

  return null;
}

export default function MainContent({
  children,
  aside,
  hasScrollSensor,
}: MainContentProps) {
  return (
    <>
      <div className={cn(styles.root)}>{children}</div>
      <aside
        className={cn(styles.aside)}
        style={{ top: 0, position: 'relative', height: '100%' }}
      >
        {aside}
      </aside>
      {hasScrollSensor && (
        <ClientOnly>
          <ScrollSensor />
        </ClientOnly>
      )}
    </>
  );
}
