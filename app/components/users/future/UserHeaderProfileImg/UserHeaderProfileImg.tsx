import React from "react";
import styles from "./styles.module.css";

export default function UserHeaderProfileImg() {
  return (
    <a href="/@veloss990" className={styles.root}>
      <div className={styles.image}>
        <img
          alt="OhMinSup's photo"
          src="https://cdn.hashnode.com/res/hashnode/image/upload/v1659089761812/fsOct5gl6.png"
          decoding="async"
          className="rounded-full"
        />
      </div>
    </a>
  );
}
