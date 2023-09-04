import React from "react";
import styles from "./styles.module.css";

export default function SearchTagCard() {
  return (
    <div className={styles.root}>
      <a
        target="_blank"
        className={styles.card_link}
        rel="noopener"
        href="/n/reactjs"
      >
        <div className="flex-1">
          <h3 className={styles.card_name}>#reactjs</h3>
          <span className={styles.card_info}>
            21.6K Articles · 160.3K Followers
          </span>
        </div>
        <span className={styles.card_image}>
          <img
            alt="React"
            src="https://cdn.hashnode.com/res/hashnode/image/upload/v1513321478077/ByCWNxZMf.png?w=240&amp;h=240&amp;fit=crop&amp;crop=faces&amp;auto=compress,format&amp;format=webp"
            decoding="async"
            data-nimg="fill"
            loading="lazy"
          />
        </span>
      </a>
    </div>
  );
}
