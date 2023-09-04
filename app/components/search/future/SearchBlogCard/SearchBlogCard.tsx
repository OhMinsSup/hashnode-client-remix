import React from "react";
import styles from "./styles.module.css";

export default function SearchBlogCard() {
  return (
    <div className={styles.root}>
      <a
        target="_blank"
        className={styles.card_link}
        rel="noopener noreferrer"
        href="https://shubhdeepdsa.hashnode.dev"
      >
        <div className={styles.card_wrapper}>
          <img
            alt="React"
            src="https://cdn.hashnode.com/res/hashnode/image/upload/v1689873136037/X0HhjhZBk.png?w=240&amp;h=240&amp;fit=crop&amp;crop=faces&amp;auto=compress,format&amp;format=webp"
            decoding="async"
            data-nimg="fill"
            loading="lazy"
          />
        </div>
        <div className="flex-1">
          <h3 className={styles.card_name}>
            <span className="mr-1.5">React</span>
          </h3>
          <div className={styles.card_info}>
            <span className="font-medium">shubhdeep.dsa</span>
            <span className="font-normal">
              I am currently learning React. Sharing my knowledge with you
              guys🫡
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
