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
  useEventListener(
    'scroll',
    optimizeAnimation(() => {
      const aside = document.querySelector('aside');
      if (!aside) {
        return;
      }

      const element = aside.querySelector('div[id="main-aside"]');
      if (!element) {
        return;
      }

      const elementHeight = element.clientHeight;

      // 현재 스크롤의 위치가 elementHeight보다 큰지 확인
      const isScrollTop = window.scrollY > elementHeight;
      if (isScrollTop) {
        const height = elementHeight - window.innerHeight;
        aside.setAttribute('style', `top: -${height}px; position: sticky;`);
      } else {
        aside.setAttribute('style', 'position: relative; height: 100%;');
      }
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
      <div className={cn(styles.root, 'h-full')}>{children}</div>
      <aside
        className={cn(styles.aside)}
        style={{ position: 'relative', height: '100%' }}
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
