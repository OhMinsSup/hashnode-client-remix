import React from 'react';

import { cn } from '~/services/libs';
import styles from './styles.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  hiddenHeader?: boolean;
  hiddenFooter?: boolean;
  isCustomMain?: boolean;
}

export default function MainLayout({
  children,
  footer,
  header,
  hiddenHeader,
  hiddenFooter,
  isCustomMain,
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
    </div>
  );
}
