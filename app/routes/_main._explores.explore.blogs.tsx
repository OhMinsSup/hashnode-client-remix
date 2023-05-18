import React, { useCallback } from "react";

// components
import ExploreBlogItem from "~/components/explore/ExploreBlogItem";
import { Icons } from "~/components/shared/Icons";

// hooks
import { useSearchParams } from "@remix-run/react";

// styles
import homeExploreBlogsStyle from "~/styles/routes/home-explore-blogs.css";

// types
import type { LinksFunction } from "@remix-run/cloudflare";

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
        <ExploreBlogItem />
        <ExploreBlogItem />
        <ExploreBlogItem />
        <ExploreBlogItem />
        <ExploreBlogItem />
      </div>
    </div>
  );
}
