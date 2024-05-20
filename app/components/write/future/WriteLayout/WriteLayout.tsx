import React from 'react';

import { useWriteContext } from '~/components/write/context/useWriteContext';
import { PreviewDraft } from '~/components/write/future/PreviewDraft';
import { cn } from '~/services/libs';
import styles from './styles.module.css';

interface WriteLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function WriteLayout({ children, sidebar }: WriteLayoutProps) {
  const { isSideOpen, isPreviewDraftOpen } = useWriteContext();
  return (
    <div className={styles.root}>
      <div
        className={cn(
          isSideOpen ? styles.container : styles.container_without_sidebar,
        )}
      >
        <div
          className={cn(isSideOpen ? styles.sidebar : styles.sidebar_hidden)}
        >
          {sidebar}
        </div>
        {isPreviewDraftOpen ? <PreviewDraft /> : null}
        <div
          className={cn(isSideOpen ? styles.content : styles.content_hidden)}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
