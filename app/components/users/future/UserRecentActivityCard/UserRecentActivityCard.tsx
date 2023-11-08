import React from "react";
import styles from "./styles.module.css";

export default function UserRecentActivityCard() {
  return (
    <div className="flex flex-row">
      <div className={styles.timeline}>
        <p>Aug 27</p>
        <div className={styles.dashed}></div>
      </div>
      <div className="flex-1">
        <UserRecentActivityCard.Item />
        <UserRecentActivityCard.Item />
      </div>
    </div>
  );
}

UserRecentActivityCard.Item = function Item() {
  return (
    <div className={styles.item}>
      <div className={styles.category}>
        <span>Replied</span>
      </div>
      <div className={styles.text}>
        <a
          href="https://blog.bytescrum.com/mastering-python-operators-part-1#cllrv6r4o03qigpnv2z0whew1"
          target="_blank"
          rel="noopener"
        >
          Mastering Python Operators (Part 1)
        </a>
      </div>
    </div>
  );
};

UserRecentActivityCard.More = function More() {
  return (
    <div className="flex flex-row">
      <div className={styles.timeline}>
        <div className={styles.dashed}></div>
      </div>
      <div className="flex-1">
        <div className="border-b">
          <button type="button" className={styles.btn_more}>
            <svg viewBox="0 0 512 512">
              <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216zm-207.5 86.6l115-115.1c4.7-4.7 4.7-12.3 0-17l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L256 303l-99.5-99.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l115 115.1c4.8 4.6 12.4 4.6 17.1-.1z"></path>
            </svg>
            <span>Show more</span>
          </button>
        </div>
      </div>
    </div>
  );
};
