import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "~/utils/utils";
import { Icons } from "~/components/shared/Icons";
import styles from "./styles.module.css";
import { NavLink } from "@remix-run/react";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { AsideChangelog } from "~/components/shared/future/AsideChangelog";
import { AsideDraft } from "~/components/shared/future/AsideDraft";
import { AsideTrendingArticle } from "~/components/shared/future/AsideTrendingArticle";
import { AsideBookmark } from "~/components/shared/future/AsideBookmark";
import { AsideFooter } from "~/components/shared/future/AsideFooter";

export default function MainFooter() {
  return (
    <nav className={styles.root}>
      <div className="relative w-max">
        <NavLink
          aria-label="My Feed"
          className={({ isActive }) => {
            return cn(styles.item, isActive ? styles.active : "");
          }}
          to={PAGE_ENDPOINTS.ROOT}
        >
          <Icons.V2.MyFeedFooter />
        </NavLink>
      </div>
      <div className="relative w-max">
        <NavLink
          aria-label="Bookmarks"
          className={({ isActive }) => {
            return cn(styles.item, isActive ? styles.active : "");
          }}
          to={PAGE_ENDPOINTS.BOOKMARKS.ROOT}
        >
          <Icons.V2.BookmarkFooter />
        </NavLink>
      </div>
      <div className="relative w-max">
        <NavLink
          aria-label="Search"
          className={({ isActive }) => {
            return cn(styles.item, isActive ? styles.active : "");
          }}
          to="/search"
        >
          <Icons.V2.SearchFooter />
        </NavLink>
      </div>
      <div className="relative w-max">
        <NavLink
          aria-label="Notifications"
          to="/notifications"
          className={({ isActive }) => {
            return cn(styles.item, isActive ? styles.active : "");
          }}
        >
          <Icons.V2.NotificationsFooter />
        </NavLink>
      </div>
      <div className="relative w-max">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              type="button"
              className={styles.item}
              aria-label="Open sidebar"
            >
              <Icons.V2.SidebarFooter />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay
              className={cn(
                styles.dialog_overlay,
                "radix-state-open:duration-200 radix-state-open:ease-in radix-state-open:animate-in radix-state-open:fade-in-0 radix-state-closed:duration-200 radix-state-closed:animate-out radix-state-closed:fade-out-0 radix-state-closed:ease-out"
              )}
            />
            <Dialog.Content
              className={cn(
                styles.dialog_content,
                "radix-state-open:duration-200 radix-state-open:ease-in radix-state-open:animate-in radix-state-open:slide-in-from-right radix-state-closed:duration-200 radix-state-closed:animate-out radix-state-closed:slide-out-to-right radix-state-closed:ease-out"
              )}
            >
              <div className="absolute top-6 left-3">
                <Dialog.Close asChild>
                  <button className={styles.dialog_close} aria-label="Close">
                    <Icons.V2.X />
                  </button>
                </Dialog.Close>
              </div>
              <div className={styles.dialog_body}>
                <AsideChangelog />
                <AsideDraft />
                <AsideTrendingArticle />
                <AsideBookmark />
                <AsideFooter />
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </nav>
  );
}
