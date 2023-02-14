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
import { ASSET_URL, PAGE_ENDPOINTS } from "~/constants/constant";
import { useAuthContext } from "~/stores/useAuthContext";

const UserMenuPopover = () => {
  const { currentProfile } = useAuthContext();

  if (!currentProfile) {
    return null;
  }

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
                      <img src={ASSET_URL.DEFAULT_AVATAR} alt="Profile" />
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
          <div className="default-wrapper">
            <div className="profile-menu">
              <img src={ASSET_URL.DEFAULT_AVATAR} alt="Profile" />
            </div>
            <h1>Sign up or log in to your Hashnode account.</h1>
            <p>Takes less than a few seconds.</p>
            <div className="auth-wrapper">
              <Link
                to={PAGE_ENDPOINTS.AUTH.SIGNUP}
                className="signup-link"
                aria-label="Sign up"
              >
                <span>Sign Up</span>
              </Link>
              <Link
                to={PAGE_ENDPOINTS.AUTH.SIGNIN}
                className="signin-link"
                aria-label="Log in"
              >
                <span>Log in</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenuPopover;
