import React, { useCallback, useState } from "react";
import styles from "./styles.module.css";
import { Logo } from "~/components/shared/future/Logo";
import { MainHeaderNavigation } from "~/components/shared/future/MainHeaderNavigation";
import { MainHeaderMenu } from "~/components/shared/future/MainHeaderMenu";

export default function MainHeader() {
  const [, setOpen] = useState(false);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <header className={styles.root}>
      <section aria-hidden="false" className="css-0"></section>
      <div className={styles.header}>
        <div className={styles.header__layout}>
          <div className={styles.header__layout__logo}>
            <Logo onOpen={onOpen} />
          </div>
          <div className={styles.header__layout__navigation}>
            <MainHeaderNavigation />
          </div>
          <div className={styles.header__layout__menu}>
            <MainHeaderMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
