import styles from "./styles.module.css";
import { Link } from "@remix-run/react";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { MainDrawerMenu } from "~/components/shared/future/MainDrawerMenu";
import { Theme, useTheme } from "~/context/useThemeContext";
import { Icons } from "../../Icons";

export default function Logo() {
  const [theme] = useTheme();
  return (
    <>
      <MainDrawerMenu />
      <span data-state="closed">
        <Link
          className={styles.logo}
          aria-label="Hashnode Logo"
          to={PAGE_ENDPOINTS.ROOT}
        >
          <Icons.V2.MobileLogo className={styles.logo_mobile} />
          <Icons.V2.Logo
            className={styles.logo_desktop}
            isDark={theme === Theme.DARK}
          />
        </Link>
      </span>
    </>
  );
}
