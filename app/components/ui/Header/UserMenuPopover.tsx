import React from "react";

// components
import { Link } from "@remix-run/react";
import {
  TempIcon,
  UserIcon,
  BookmarkIcon,
  LogoutIcon,
} from "~/components/ui/Icon";

// constants
import { ASSET_URL } from "~/constants/constant";
import { useAuthStore } from "~/stores/useAuthStore";

const UserMenuPopover = () => {
  const { currentProfile } = useAuthStore();

  return (
    <div className="user-profile-popover">
      <div className="container">
        {currentProfile ? (
          <div className="wrapper">
            <div className="profile-menu">
              <section className="profile-section">
                <Link to="/" aria-label="User Profile" data-type="profile">
                  <div className="profile-popover-image-container">
                    <div>
                      <img
                        className="lazyload blur-up"
                        data-src={ASSET_URL.DEFAULT_AVATAR}
                        alt="Profile"
                      />
                    </div>
                  </div>
                  <div className="profile-popover-text-container">
                    <h2 title="OhMinSup">{currentProfile?.username}</h2>
                    <p>@{currentProfile?.profile?.name}</p>
                  </div>
                </Link>
                <hr className=" mx-6 h-[1px] flex-1" />
                {/* Header */}
                {/* Link */}
                <Link to="/" data-type="link" aria-label="My Drafts">
                  <TempIcon className="icon mr-2" />
                  <span>My Drafts</span>
                </Link>
                <Link to="/" data-type="link" aria-label="My Bookmarks">
                  <BookmarkIcon className="icon mr-2" />
                  <span>My Bookmarks</span>
                </Link>
                <Link to="/" data-type="link" aria-label="Account Settings">
                  <UserIcon className="icon mr-2" />
                  <span>Account Settings</span>
                </Link>
                <hr className=" mx-6 h-[1px] flex-1" />
                <Link to="/" data-type="logout" aria-label="Log Out">
                  <LogoutIcon className="icon mr-2" />
                  <span>Log out</span>
                </Link>
              </section>
            </div>
          </div>
        ) : (
          <div
            className="h-auto w-[16rem] p-6 md:w-[18rem]"
            style={{ lineHeight: "1.375" }}
          >
            <div className="mx-auto mb-5 block h-24 w-24">
              <img
                className="lazyload blur-up"
                data-src={ASSET_URL.DEFAULT_AVATAR}
                alt="Profile"
              />
            </div>
            <h1 className="mb-4 text-2xl font-extrabold text-gray-900">
              Sign up or log in to your Hashnode account.
            </h1>
            <p className="mb-4 text-base text-gray-700">
              Takes less than a few seconds.
            </p>
            <div className="css-o2d6zf">
              <Link
                to="/auth/signin"
                className="ml-2 flex flex-row items-center justify-center rounded-full border border-blue-500 bg-blue-500 py-1 px-3 text-center text-lg font-semibold text-white outline-none hover:shadow-md"
              >
                <span>Sign in</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenuPopover;
