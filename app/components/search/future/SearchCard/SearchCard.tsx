import React from "react";
import styles from "./styles.module.css";

export default function SearchCard() {
  return (
    <div className={styles.root}>
      <a
        target="_blank"
        className={styles.card_link}
        rel="noopener noreferrer"
        href="https://sivalaxman8.hashnode.dev/react-performance-usecallback-vs-usememo-hooks"
      >
        <span className="w-full lg:mr-4 lg:flex-1 lg:mb-0">
          <div className="flex flex-row items-start mb-2 gap-3">
            <div className="flex items-center justify-center bg-slate-100 cursor-pointer relative w-10 h-10 rounded-full overflow-hidden">
              <img
                alt="sivalaxman"
                src="https://cdn.hashnode.com/res/hashnode/image/upload/v1693767362160/MAeagqvRX.jpg?w=240&amp;h=240&amp;fit=crop&amp;crop=faces&amp;auto=compress,format&amp;format=webp"
                decoding="async"
                data-nimg="fill"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col items-start text-sm">
              <p className={styles.card_name}>
                <span className="mr-1.5">sivalaxman</span>
              </p>
              <div className={styles.card_blog}>
                <span>sivalaxman8.hashnode.dev</span>
                <span className="inline-block mx-2 font-bold opacity-50">
                  ·
                </span>
                <span>4th Sep 2023</span>
              </div>
            </div>
          </div>
          <h3 className={styles.card_desc}>
            React Performance: useCallback vs. useMemo Hooks
          </h3>
          <div className={styles.card_div}></div>
        </span>
        <span className={styles.card_image}>
          <img
            alt="React Performance: useCallback vs. useMemo Hooks"
            src="https://cdn.hashnode.com/res/hashnode/image/upload/v1693764982168/2814774d-af9e-4b42-9638-3e1f6195c980.png?w=800&amp;h=420&amp;fit=crop&amp;crop=entropy&amp;auto=compress,format&amp;format=webp"
            width="800"
            height="420"
            decoding="async"
            data-nimg="1"
            loading="lazy"
          />
        </span>
      </a>
    </div>
  );
}
