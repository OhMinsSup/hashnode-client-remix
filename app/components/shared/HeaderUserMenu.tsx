import React, { useCallback } from "react";
import { Link, useFetcher } from "@remix-run/react";

// hooks
import { useOptionalSession } from "~/api/user/hooks/useSession";

// constants
import { ASSET_URL, PAGE_ENDPOINTS } from "~/constants/constant";
import { Icons } from "./Icons";

export default function HeaderUserMenu() {
  const session = useOptionalSession();
  const fetcher = useFetcher();

  const onLogout = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      if (!session) {
        const error = new Error("Session is not exist");
        throw error;
      }
      fetcher.submit(null, {
        method: "POST",
        action: "/action/logout",
        replace: true,
      });
    },
    [fetcher, session]
  );

  if (session) {
    return (
      <div className="popover__menu-session">
        <div className="popover__menu-session-container">
          <div className="default-size">
            <div className="popover__menu-session-wrapper">
              <section className="session-menu">
                <Link
                  to={PAGE_ENDPOINTS.USERS.ID(session.username)}
                  aria-label="User Profile"
                  data-type="profile"
                >
                  <div className="image-container">
                    <div className="image-wrapper">
                      <img src={ASSET_URL.DEFAULT_AVATAR} alt="Profile" />
                    </div>
                  </div>
                  <div className="text-container">
                    <h2 title={session?.username}>{session?.username}</h2>
                    <p>@{session?.profile?.name}</p>
                  </div>
                </Link>
                <hr className=" mx-6 h-[1px] flex-1" />
                <Link
                  to={PAGE_ENDPOINTS.DRAFT.ROOT}
                  data-type="link"
                  aria-label="My Drafts"
                >
                  <Icons.MenuDraft className="icon__base mr-2 stroke-current" />
                  <span>My Drafts</span>
                </Link>
                <Link
                  to={PAGE_ENDPOINTS.BOOKMARKS.ROOT}
                  data-type="link"
                  aria-label="My Bookmarks"
                >
                  <Icons.MenuBookmark className="icon__base mr-2 fill-current" />
                  <span>My Bookmarks</span>
                </Link>
                <Link
                  to={PAGE_ENDPOINTS.SETTINGS.ROOT}
                  data-type="link"
                  aria-label="Account Settings"
                >
                  <Icons.MenuAccount className="icon__base mr-2 fill-current" />
                  <span>Account Settings</span>
                </Link>
                <hr className=" mx-6 h-[1px] flex-1" />
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  href="#"
                  data-type="logout"
                  aria-label="Log Out"
                  role="button"
                  onClick={onLogout}
                >
                  <Icons.MenuLogout className="icon__base mr-2 fill-current" />
                  <span>Log out</span>
                </a>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="popover__menu-container">
      <div className="popover__menu-wrapper">
        <div className="img-wrapper">
          <img src={ASSET_URL.DEFAULT_AVATAR} alt="profile" />
        </div>
        <h1 className="no-auth">Sign up or log in to your Hashnode account.</h1>
        <p className="no-auth">Takes less than a few seconds.</p>
        <div className="btns-groups">
          <Link to={PAGE_ENDPOINTS.AUTH.SIGNUP} className="base signup">
            <span>Sign up</span>
          </Link>
          <Link to={PAGE_ENDPOINTS.AUTH.SIGNIN} className="base signin">
            <span>Log in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
