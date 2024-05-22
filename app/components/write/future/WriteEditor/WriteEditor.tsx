import React from 'react';

import styles from './styles.module.css';

interface WriteEditorProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export default function WriteEditor({ header, children }: WriteEditorProps) {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.editor_container}>
          <div>{header}</div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
