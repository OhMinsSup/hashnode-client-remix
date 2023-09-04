import React from "react";
import styles from "./styles.module.css";

export default function NotificationsCard() {
  return (
    <div>
      <a
        className="flex flex-col"
        href="https://drafts.dev/how-to-exit-vim-ckdrbtn32006tgws1fksfhapm#ckdre1u9m00chgws1a7ji0mvj"
        target="_blank"
        rel="noreferrer"
      >
        <div className={styles.root}>
          <div className="flex w-[calc(100%-32px)]">
            <div className={styles.card_icon}>
              <svg fill="none" viewBox="0 0 24 24" width="24" height="24">
                <path
                  fill="currentColor"
                  d="M5.106 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788a9.753 9.753 0 0 1-10.749 2.064.315.315 0 0 0-.174-.026l-4.158.694a1.25 1.25 0 0 1-1.438-1.44l.696-4.15a.314.314 0 0 0-.026-.174 9.753 9.753 0 0 1 2.06-10.756ZM9 9.75a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5H9Zm0 3.5a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5H9Z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <div className="mb-2">
                <img
                  loading="lazy"
                  src="https://cdn.hashnode.com/res/hashnode/image/upload/btykyxbdenmjjvbdfmff/1460197751.png?w=70&amp;h=70&amp;fit=crop&amp;crop=faces&amp;auto=compress,format&amp;format=webp&amp;auto=compress,format&amp;format=webp"
                  width="70"
                  height="70"
                  className={styles.card_image}
                  alt=""
                />
              </div>
              <p className="text-slate-600 dark:text-slate-300 ">
                <span className={styles.card_text1}>j</span> commented on your
                article{" "}
                <span className={styles.card_text1}>‘How to Exit Vim?’</span>
              </p>
              <p className={styles.card_desc}>
                the joke in the picture was already there in 2007 when I learned
                vim https://i.imgur.com/M5wl14r.png also don't forget
                :%s/&lt;pattern_to_searc
              </p>
              <p className={styles.card_date}>12 Aug 2020, 10:07 pm</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-8">
            <div className={styles.card_unread}></div>
          </div>
        </div>
        <div
          role="separator"
          aria-orientation="horizontal"
          className={styles.card_div}
        ></div>
      </a>
    </div>
  );
}
