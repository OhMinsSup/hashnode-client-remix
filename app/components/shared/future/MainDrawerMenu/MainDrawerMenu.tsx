import React, { useState } from "react";
import styles from "./styles.module.css";
import * as Dialog from "@radix-ui/react-dialog";
import { Icons } from "~/components/shared/Icons";
import { Link, NavLink, useLocation } from "@remix-run/react";
import { NAVIGATION_ITEMS, PAGE_ENDPOINTS } from "~/constants/constant";
import classNames from "classnames";
import { useOptionalSession } from "~/services/hooks/useSession";

export default function MainDrawerMenu() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className={styles.btn_menu}>
          <Icons.V2.Menu />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={classNames(
            styles.overlay,
            "radix-state-open:duration-200 radix-state-open:ease-in radix-state-open:animate-in radix-state-open:fade-in-0 radix-state-closed:duration-200 radix-state-closed:animate-out radix-state-closed:fade-out-0 radix-state-closed:ease-out"
          )}
        />
        <Dialog.Content
          className={classNames(
            styles.content,
            "radix-state-open:duration-200 radix-state-open:ease-in radix-state-open:animate-in radix-state-open:slide-in-from-left radix-state-closed:duration-200 radix-state-closed:animate-out radix-state-closed:slide-out-to-left radix-state-closed:ease-out"
          )}
        >
          <div className={styles.container}>
            <Link
              to={PAGE_ENDPOINTS.ROOT}
              aria-label="Hashnode Logo"
              className={styles.logo}
            >
              <Icons.V2.WhiteLogo className={styles.logo_white} />
              <Icons.V2.DarkLogo className={styles.logo_dark} />
            </Link>
            <Dialog.Close asChild>
              <button className={styles.btn_close} aria-label="Close">
                <Icons.V2.X />
              </button>
            </Dialog.Close>
          </div>
          <nav className="py-4 px-3">
            <ul>
              {NAVIGATION_ITEMS.filter((item) =>
                item.position.includes("top")
              ).map((item) => (
                <MainDrawerMenu.Item
                  key={item.id}
                  to={item.href}
                  text={item.title}
                  applyActiveLinks={item.applyActiveLinks}
                />
              ))}
            </ul>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface MainDrawerMenuItemProps {
  to: string;
  text: string;
  applyActiveLinks?: string[];
  end?: boolean;
}

MainDrawerMenu.Item = function MainDrawerMenuItem(
  props: MainDrawerMenuItemProps
) {
  const { to, text, applyActiveLinks, ...resetProps } = props;

  const location = useLocation();
  const session = useOptionalSession();
  if (!session && to === PAGE_ENDPOINTS.USERS.ROOT) {
    return null;
  }

  return (
    <li>
      <NavLink
        aria-label={text}
        to={to}
        end
        className={({ isActive }) => {
          return classNames(styles.nav_link, {
            [styles.nav_link_active]:
              isActive || applyActiveLinks?.includes(location.pathname),
          });
        }}
        {...resetProps}
      >
        {text}
      </NavLink>
    </li>
  );
};
