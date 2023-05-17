import React, { useCallback } from "react";

// components
import ExploreTredingTagItem from "~/components/explore/ExploreTredingTagItem";
import NewlyAddedTags from "~/components/explore/NewlyAddedTags";
import { Icons } from "~/components/shared/Icons";

// hooks
import { Link, useSearchParams } from "@remix-run/react";

// styles
import homeExploreBlogsStyle from "~/styles/routes/home-explore-blogs.css";

// types
import type { LinksFunction } from "@remix-run/cloudflare";
import { ASSET_URL } from "~/constants/constant";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: homeExploreBlogsStyle,
    },
  ];
};

export default function Page() {
  const [searchParams, setSearchParams] = useSearchParams();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      console.log(e.target.value);
      setSearchParams({
        ...searchParams,
        category: e.target.value,
      });
    },
    [searchParams, setSearchParams]
  );

  return (
    <div className="explore-trending-blog">
      <div className="title-wrapper">
        <div>
          <h2>Trending & Popular Blogs</h2>
          <p>
            Blogs that are loved by the developer community. Updated every hour.
          </p>
        </div>
        <div className="select-filter">
          <select
            onChange={onChange}
            value={searchParams.get("category") || "all"}
          >
            <option value="week">This week</option>
            <option value="month">This month</option>
            <option value="year">This year</option>
            <option value="all">All time</option>
          </select>
          <span>
            <Icons.ArrowDown className="icon__sm fill-current" />
          </span>
        </div>
      </div>
      <div className="content-wrapper">
        {/*  */}
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
        {/*  */}
      </div>
    </div>
  );
}
