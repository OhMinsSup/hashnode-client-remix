import React from "react";
import styles from "./styles.module.css";
import { AuthContent } from "../AuthContent";
import { ASSET_URL } from "~/constants/constant";

interface AuthLayoutProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export default function AuthLayout({ children, header }: AuthLayoutProps) {
  return (
    <div className={styles.root}>
      <section>
        <header className={styles.header}>{header}</header>
        <div className={styles.content}>
          <AuthContent>{children}</AuthContent>
        </div>
      </section>
      <div className={styles.other}>
        <section>
          <p className="mb-5 font-semibold italic">
            You can start a blog in just a few seconds using Hashnode and then
            you can move that to your own domain if you get one later. They will
            even help distribute your articles on their platform. By far the
            best place to create a blog, imho.
          </p>
        </section>
        <div className="flex">
          <div className="mr-3 flex-shrink-0 rounded-full">
            <img
              loading="lazy"
              className="h-10 w-10"
              src={ASSET_URL.DEFAULT_AVATAR}
              alt="profile"
            />
          </div>
          <div>
            <p className="font-bold">Quincy Larson</p>
            <p className={styles.p}>Founder, freeCodeCamp</p>
          </div>
        </div>
      </div>
    </div>
  );
}
