import React from "react";
import { Link } from "@remix-run/react";
import styles from "./styles.module.css";

interface MenuLinkProps {
  to: string;
  iconSm: React.ReactNode;
  iconMd: React.ReactNode;
  text: string;
}

export default function MenuLink({ to, iconSm, iconMd, text }: MenuLinkProps) {
  return (
    <Link to={to} className={styles.item_link}>
      <div className={styles.item_link_container}>
        <div className="flex min-w-0 items-center gap-2">
          <div className={styles.icon}>{iconSm}</div>
          <div className={styles.icon_md}>{iconMd}</div>
          <span title={text} className={styles.text}>
            {text}
          </span>
        </div>
      </div>
    </Link>
  );
}
