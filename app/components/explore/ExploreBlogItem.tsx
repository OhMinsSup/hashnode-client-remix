import React from "react";
import { Icons } from "../shared/Icons";
import { Link } from "@remix-run/react";
import { ASSET_URL } from "~/constants/constant";

export default function ExploreBlogItem() {
  return (
    <div className="explore-blog">
      <div className="explore-blog-container">
        <div className="explore-blog-wrapper">
          <div className="explore-blog-inner-wrapper">
            <div className="ranking">#1</div>
            <div className="content">
              <div className="blog-profile">
                <div className="blog-profile_left">
                  <div className="blog-image">
                    <Link to="/">
                      <div className="h-full w-full">
                        <div className="image-wrapper">
                          <img src={ASSET_URL.DEFAULT_AVATAR} alt="" />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="blog-title">
                    <h3>
                      <Link to="/">apt-get ops</Link>
                    </h3>
                    <Link className="desc" to="/">
                      aptgetops.tech
                    </Link>
                  </div>
                </div>
                <div className="blog-profile_right">
                  <button
                    type="button"
                    aria-label="Follow blog"
                    className="btn-follow"
                  >
                    <Icons.Plus className="icon__sm fill-current" />
                    <span>Follow</span>
                  </button>
                </div>
              </div>
              <div className="blog-histories">
                <div className=" mt-2 text-sm">
                  <Link to="/" className="blog-histories-item">
                    <span className="time">9 May, 2023</span>
                    <span className="title">
                      Increase Infrastructure Visibility Using DataDog
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
