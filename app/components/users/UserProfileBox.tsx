import React from "react";
import { Link, useLoaderData } from "@remix-run/react";
import { PAGE_ENDPOINTS, ASSET_URL } from "~/constants/constant";
import { Icons } from "../shared/Icons";
import type { MainUserLoader } from "~/routes/_main._users.$username";

export default function UserProfileBox() {
  const { userInfo } = useLoaderData<MainUserLoader>();
  return (
    <div className="user-profile-box">
      <div className="user-profile-box__grid">
        <div className="user-profile-box__header">
          <div className="user-profile-box__header__box">
            <Link
              to={PAGE_ENDPOINTS.USERS.ID(userInfo?.username)}
              className="user-profile-box__header__thumbnail"
            >
              <div className="user-profile-box__header__thumbnail__container">
                <img src={ASSET_URL.DEFAULT_AVATAR} alt="" />
              </div>
            </Link>
            <div className="user-profile-box__header__info">
              <div className="user-profile-box__header__info__header">
                <div className="user-profile-box__header__info__header__left-area">
                  <div className="user-profile-box__left-area__profile">
                    <h1 className="css-1hkya5p">
                      <Link to={PAGE_ENDPOINTS.USERS.ID("username")}>
                        <span>{userInfo?.username}</span>
                      </Link>
                    </h1>
                  </div>
                  <p className="css-1qpfnvp">{userInfo?.profile?.tagline}</p>
                </div>
                <div className="user-profile-box__header__info__header__right-area">
                  <Link
                    to={PAGE_ENDPOINTS.SETTINGS.ROOT}
                    className="user-profile-box__right-area__edit-btn"
                  >
                    <Icons.Pen className="icon__sm mr-2 fill-current" />
                    <span>Edit</span>
                  </Link>
                </div>
              </div>
              <div className="user-profile-box__header__info__footer"></div>
            </div>
          </div>
        </div>
        <div className="user-profile-box__footer">
          <div className="user-profile-box__footer__empty"></div>
          <div className="user-profile-box__footer__join-date">
            <Icons.Calendar className="icon__sm mr-2 fill-current" />
            <span>
              {new Date(userInfo?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
