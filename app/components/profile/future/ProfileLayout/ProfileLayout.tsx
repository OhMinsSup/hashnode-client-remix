import React from 'react';

import styles from './styles.module.css';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <main className={styles.root}>
      <main
        itemScope
        itemType="https://schema.org/ProfilePage"
        itemProp="mainEntity"
        className={styles.container}
      >
        {children}
      </main>
    </main>
  );
}
