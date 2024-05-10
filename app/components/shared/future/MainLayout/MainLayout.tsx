import React from 'react';

import { cn } from '~/services/libs';
import styles from './styles.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  hiddenHeader?: boolean;
  hiddenFooter?: boolean;
}

export default function MainLayout({
  children,
  footer,
  header,
  hiddenHeader,
  hiddenFooter,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {hiddenHeader ? null : (
        <header className={styles.header}>{header}</header>
      )}
      <main className={styles.main}>{children}</main>
      {hiddenFooter ? null : (
        <nav
          className={cn(
            styles.nav,
            'bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-white',
          )}
        >
          {footer}
        </nav>
      )}
    </div>
  );
}
