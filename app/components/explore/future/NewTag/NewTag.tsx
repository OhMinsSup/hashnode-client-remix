import React from "react";
import styles from "./syles.module.css";
import { Icons } from "~/components/shared/Icons";

export default function NewTag() {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className="mr-2">
          <a className={styles.image} href="#">
            <img
              src="https://cdn.hashnode.com/res/hashnode/image/upload/v1644902300094/qI9DIT5tW.png?auto=compress"
              alt=""
            />
          </a>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>
            <a href="/n/programming-blogs" aria-label="Tag name">
              Programming Blogs
            </a>
          </h3>
        </div>

        <button
          type="button"
          aria-label="Follow Tag"
          className={styles.btn_base}
        >
          <Icons.V2.ExploreAdd />
          {/* <Icons.V2.ExploreCheck /> */}
        </button>
      </div>
    </div>
  );
}
