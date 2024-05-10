import React from 'react';

import { cn } from '~/services/libs';
import styles from './styles.module.css';

interface BodyProps {
  children: React.ReactNode;
}

export default function Body({ children }: BodyProps) {
  return <body className={cn(styles.root)}>{children}</body>;
}
