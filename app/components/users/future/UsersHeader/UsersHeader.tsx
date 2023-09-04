import React from "react";
import styles from "./styles.module.css";
import { UserHeaderProfileImg } from "../UserHeaderProfileImg";
import { UserHeaderProfileInfo } from "../UserHeaderProfileInfo";

export default function UsersHeader() {
  return (
    <div className="grid">
      <div>
        <div className={styles.content}>
          <UserHeaderProfileImg />
          <UserHeaderProfileInfo />
        </div>
      </div>
      <div className={styles.footer}></div>
    </div>
  );
}
