import { cn } from '~/services/libs';
import styles from './styles.module.css';

interface MainContentProps {
  children: React.ReactNode;
  aside?: React.ReactNode;
}

export default function MainContent({ children, aside }: MainContentProps) {
  return (
    <>
      <div className={cn(styles.root)}>{children}</div>
      <aside
        className={cn(styles.aside)}
        style={{ top: 0, position: 'relative', height: '100%' }}
      >
        {aside}
      </aside>
    </>
  );
}
