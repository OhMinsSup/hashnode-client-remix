import React from "react";
import styles from "./styles.module.css";
import { cn } from "~/utils/util";
import { isNull, isUndefined } from "~/utils/assertion";

interface BlockBoxProps {
  index: number;
  title: string;
  desciption?: string;
  linkText: string;
  link: string;
  children?: React.ReactNode;
}

export default function BlockBox({
  index,
  title,
  desciption,
  link,
  linkText,
  children,
}: BlockBoxProps) {
  return (
    <div className={cn(styles.root, index > 0 ? styles.col3 : undefined)}>
      <h2 className={styles.title}>{title}</h2>
      {isUndefined(children) || isNull(children) ? (
        <div className={styles.add}>
          <a href={link} aria-label="Add bio">
            <svg viewBox="0 0 384 512">
              <path d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path>
            </svg>
            <span>{linkText}</span>
          </a>
        </div>
      ) : (
        children
      )}
      {desciption && (
        <p className={styles.desc}>
          Your bio is empty. Tell the world who you are by writing a short
          description about you.
        </p>
      )}
    </div>
  );
}
