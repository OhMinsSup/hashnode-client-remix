import { useLayoutEffect } from "react";
import styles from "./styles.module.css";

// components
import { MenuLink } from "./MenuLink";
import { Logout } from "./Logout";
import { Link } from "@remix-run/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

// constants
import { ASSET_URL, PAGE_ENDPOINTS } from "~/constants/constant";

interface MainMenuUserProfileMenuProps {
  open: boolean;
  session: FetchRespSchema.UserResponse;
}

export default function MainMenuUserProfileMenu({
  open,
  session,
}: MainMenuUserProfileMenuProps) {
  useLayoutEffect(() => {
    const $content_wrapper = document.querySelector(
      "div[data-radix-popper-content-wrapper]"
    );
    // ele 자식요소의 data 속성에서 "data-navigation-user-menu"가 존재하는 경우
    const $navigation_user_menu = $content_wrapper?.querySelector(
      "div[data-navigation-user-menu]"
    );
    if (!$navigation_user_menu) return;
    // ele 자식요소의 data 속성에서 "data-navigation-user-menu"가 존재하는 경우
    const currentStyles = $navigation_user_menu.getAttribute("style");
    if (currentStyles) {
      $navigation_user_menu.setAttribute(
        "style",
        `outline: none; width: 280px; ${currentStyles} pointer-events: auto;`
      );
    }
  }, [open]);

  return (
    <>
      <DropdownMenu.Item>
        <Link
          aria-label="User Profile"
          to={PAGE_ENDPOINTS.USERS.ID(session.id)}
          className={styles.username_link}
        >
          <div className={styles.username_link_container}>
            <div className="flex gap-3">
              <div className="h-12 w-12 shrink-0 rounded-full">
                <div className={styles.thumbnail_container}>
                  <img
                    loading="lazy"
                    className="rounded-full"
                    src={
                      session?.userImage?.avatarUrl ?? ASSET_URL.DEFAULT_AVATAR
                    }
                    alt={session?.userProfile?.username ?? "profile"}
                  />
                </div>
              </div>
              <div className="flex min-w-0 flex-1 items-center justify-between">
                <div className="min-w-0">
                  <p
                    title={session?.userProfile?.username}
                    className={styles.username}
                  >
                    {session?.userProfile?.username}
                  </p>
                  <p
                    title={`@${session?.userProfile?.nickname}`}
                    className={styles.profile_name}
                  >
                    @{session?.userProfile?.nickname}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </DropdownMenu.Item>
      <DropdownMenu.Separator className={styles.separator} />
      <DropdownMenu.Item>
        <MenuLink
          to={PAGE_ENDPOINTS.WRITE.ROOT}
          text="My drafts"
          iconMd={
            <svg fill="none" viewBox="0 0 24 24" width="24" height="24">
              <path
                stroke="currentColor"
                d="M13.992 3.18V7a1 1 0 0 0 1 1h3.828m-4.828-4.82a2 2 0 0 0-.827-.18H8a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8.83a2 2 0 0 0-.18-.83m-4.828-4.82c.216.097.415.234.586.405l3.835 3.829A2 2 0 0 1 18.82 8M9 12h6m-6 4h4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></path>
            </svg>
          }
          iconSm={
            <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
              <path
                stroke="currentColor"
                d="M11.66 2.65v3.183a.834.834 0 0 0 .834.834h3.19M11.66 2.649a1.667 1.667 0 0 0-.69-.149H6.667a2.5 2.5 0 0 0-2.5 2.5v10a2.5 2.5 0 0 0 2.5 2.5h6.666a2.5 2.5 0 0 0 2.5-2.5V7.358c0-.241-.052-.476-.15-.691m-4.022-4.018c.18.082.345.196.488.338l3.195 3.191c.143.143.257.309.34.489M7.5 10h5m-5 3.333h3.333"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
              ></path>
            </svg>
          }
        />
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <MenuLink
          to={PAGE_ENDPOINTS.SETTINGS.ROOT}
          text="Account settings"
          iconMd={
            <svg fill="none" viewBox="0 0 24 24" width="24" height="24">
              <path
                stroke="currentColor"
                d="M5.927 19.516A6.997 6.997 0 0 1 12 16a6.997 6.997 0 0 1 6.073 3.516M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-6.667-2.222a3.333 3.333 0 1 1-6.666 0 3.333 3.333 0 0 1 6.666 0Z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></path>
            </svg>
          }
          iconSm={
            <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
              <path
                stroke="currentColor"
                d="M4.94 16.264a5.831 5.831 0 0 1 5.06-2.93 5.831 5.831 0 0 1 5.06 2.93M18.334 10a8.333 8.333 0 1 1-16.666 0 8.333 8.333 0 0 1 16.666 0Zm-5.555-1.852a2.778 2.778 0 1 1-5.556 0 2.778 2.778 0 0 1 5.556 0Z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
              ></path>
            </svg>
          }
        />
      </DropdownMenu.Item>
      <DropdownMenu.Separator className={styles.separator} />
      <DropdownMenu.Item>
        <Logout />
      </DropdownMenu.Item>
    </>
  );
}
