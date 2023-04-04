import React, { useCallback, useMemo, useRef, useState } from "react";
import classNames from "classnames";

// components
import { Link, useFetcher } from "@remix-run/react";
import { Icons } from "~/components/shared/Icons";
import { If, Else, Then } from "react-if";
import * as Popover from "@radix-ui/react-popover";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { useLayoutContext } from "~/context/useLayoutContext";
import { useForceUpdate } from "~/libs/hooks/useForceUpdate";
import { useOptionalSession } from "~/api/user/hooks/useSession";

function Header() {
  return (
    <header className="header__app">
      <Header.Desktop />
    </header>
  );
}

export default Header;

Header.Desktop = function HeaderDesktop() {
  return (
    <div className="header__desktop">
      <div className="header__desktop-container">
        <Header.Logo />
        <Header.Search />
        <Header.RightArea />
      </div>
    </div>
  );
};

Header.Logo = function HeaderLogo() {
  return (
    <div className="header__logo">
      <button
        aria-label="menu button"
        aira-haspopup="menu"
        aria-expanded={false}
        className="btn__menu-header"
      >
        <Icons.Menu className="icon__base fill-current" />
      </button>
      <span>
        <Link to={PAGE_ENDPOINTS.ROOT} className="header__logo-link">
          <Icons.Logo className="icon__logo" />
        </Link>
      </span>
    </div>
  );
};

Header.Search = function HeaderSearch() {
  const { search, changeSearchKeyword } = useLayoutContext();
  const isSearchActive = useMemo(() => !!search.keyword, [search.keyword]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    changeSearchKeyword({ keyword: formData.get("keyword")?.toString() || "" });
  };

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      changeSearchKeyword({ keyword: e.target.value });
    },
    [changeSearchKeyword]
  );

  return (
    <div className="header__search">
      <form method="get" onSubmit={onSubmit}>
        <span>
          <Icons.Search className="icon__sm fill-current" />
        </span>
        <input
          type="search"
          name="keyword"
          id="header__search-input"
          aria-label="search"
          aria-labelledby="header__search-info"
          value={search.keyword}
          onChange={onChange}
          placeholder="Search for tags, people, articles, and many more"
        />
        <span
          id="header__search-info"
          aria-labelledby="header__search-input"
          className={classNames({
            active: isSearchActive,
          })}
        >
          <If condition={isSearchActive}>
            <Then>
              <p>Press</p>
              <span>↵</span>
              <p>to see all results</p>
            </Then>
            <Else>
              <span className="slash">/</span>
            </Else>
          </If>
        </span>
      </form>
    </div>
  );
};

Header.RightArea = function HeaderRightArea() {
  const [toggle, setToggle] = useState(false);
  const forceUpdate = useForceUpdate();

  const $notify = useRef<HTMLDivElement | null>(null);
  const $menu = useRef<HTMLDivElement | null>(null);

  const onClick = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);

  return (
    <div className="header__right-area">
      <div className="btns-group__drafts">
        <div className="btn__drafts">
          <Link aria-label="move to draft page" to={PAGE_ENDPOINTS.DRAFT.ROOT}>
            <Icons.Pen className="icon__sm mr-2 fill-current" />
            <span>Write</span>
          </Link>
        </div>
      </div>
      <div className="header__subnavs">
        <button
          type="button"
          title={toggle ? "Toggle light mode" : "Toggle dark mode"}
          aria-label="Toggle theme"
          className="btn__theme"
          onClick={onClick}
        >
          <If condition={toggle}>
            <Then>
              <Icons.Sun className="icon__md stroke-current" />
            </Then>
            <Else>
              <Icons.Moon className="icon__md stroke-current" />
            </Else>
          </If>
        </button>
        <div
          className="notification"
          ref={(ref) => {
            if (!$notify.current) {
              $notify.current = ref;
              forceUpdate();
            }
          }}
        >
          <Popover.Root>
            <Popover.Trigger asChild>
              <button
                className="btn__notification"
                type="button"
                aria-label="Notifications"
              >
                <Icons.Notification className="icon__md stroke-current" />
                <span className="notification__count">1</span>
              </button>
            </Popover.Trigger>
            <Popover.Portal container={$notify.current}>
              <Popover.Content className="popover__notification" sideOffset={5}>
                <Header.Notification />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
        <div
          className="menu"
          ref={(ref) => {
            if (!$menu.current) {
              $menu.current = ref;
              forceUpdate();
            }
          }}
        >
          <Popover.Root>
            <Popover.Trigger asChild>
              <button
                className="btn__profile"
                type="button"
                aria-label="Profile Dropdown"
              >
                <div className="img__container">
                  <img src="/images/default_profile.png" alt="profile" />
                </div>
              </button>
            </Popover.Trigger>
            <Popover.Portal container={$menu.current}>
              <Popover.Content className="popover__menu" sideOffset={5}>
                <Header.MenuForUser />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </div>
    </div>
  );
};

Header.Notification = function HeaderNotification() {
  return (
    <div className="popover__notification-container">
      <div className="popover__notification-wrapper">
        <div className="icon-wrapper">
          <Icons.NotificationPlus className="h-12 w-12 fill-current" />
        </div>
        <h1 className="no-auth">
          Sign in to see notifications from your favorite tech writers!
        </h1>
        <p className="no-auth">
          Learn insights from developers and people in tech from around the
          world. Grow 1% every day.
        </p>
        <Link to={PAGE_ENDPOINTS.AUTH.SIGNIN} className="no-auth">
          <span>Let's start!</span>
        </Link>
      </div>
    </div>
  );
};

Header.MenuForUser = function HeaderMenuForUser() {
  const session = useOptionalSession();
  const fetcher = useFetcher();

  const onLogout = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      if (!session) {
        const error = new Error("Session is not exist");
        throw error;
      }

      const formData = new FormData();
      formData.append("type", "logout");
      fetcher.submit(formData, {
        method: "post",
        action: "/",
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
                <Link to="/" aria-label="User Profile" data-type="profile">
                  <div className="image-container">
                    <div className="image-wrapper">
                      <img src="/images/default_profile.png" alt="Profile" />
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
                <Link to="/" data-type="link" aria-label="Account Settings">
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
          <img src="/images/default_profile.png" alt="profile" />
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
};
