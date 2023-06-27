import React from "react";
import styles from "./styles.module.css";
import { ASSET_URL } from "~/constants/constant";

interface AuthContentProps {
  children: React.ReactNode;
}

export default function AuthContent({ children }: AuthContentProps) {
  return (
    <div className={styles.root}>
      <div className={styles.root_container}>
        <div className={styles.left}>{children}</div>
        <div className={styles.right}>
          <div className={styles.right_container}>
            <section>
              <p className={styles.desc}>
                "It's amazing to see how fast devs go from 0 to Blog under a
                domain they own on Hashnode 🤯. It reminds me a lot of what
                Substack did for journalists."
              </p>
            </section>
            <div className={styles.profile}>
              <div className={styles.profile_image}>
                <img
                  loading="lazy"
                  src={ASSET_URL.DEFAULT_AVATAR}
                  alt="profile"
                />
              </div>
              <div className={styles.profile_info}>
                <p className=" font-medium">Guillermo Rauch</p>
                <p>CEO, Vercel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
