import React from "react";
import { Link } from "@remix-run/react";
import ExploreTagItem from "~/components/explore/ExploreTagItem";
import NewlyAddedTagItem from "~/components/explore/NewlyAddedTagItem";
import ExploreBlogItem from "~/components/explore/ExploreBlogItem";
import { PAGE_ENDPOINTS } from "~/constants/constant";

// styles
import homeExploreTrendingsStyle from "~/styles/routes/home-explore-trendings.css";

import type { LinksFunction } from "@remix-run/cloudflare";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: homeExploreTrendingsStyle,
    },
  ];
};

export default function Page() {
  return (
    <>
      <div className="explore-trendings">
        <div className="title-wrapper">
          <h2>Trending Tags</h2>
          <Link to={PAGE_ENDPOINTS.EXPLORE.TAGS} className="see-all-link">
            See all tags
          </Link>
        </div>
        <div className="content-wrapper">
          <ExploreTagItem />
          <ExploreTagItem />
          <ExploreTagItem />
          <ExploreTagItem />
          <ExploreTagItem />
          <ExploreTagItem />
        </div>
        <div className="newly-added-tags-title">
          <h2>Newly Added Tags</h2>
        </div>
        <div className="newly-added-tags-content">
          <NewlyAddedTagItem />
          <NewlyAddedTagItem />
          <NewlyAddedTagItem />
          <NewlyAddedTagItem />
          <NewlyAddedTagItem />
          <NewlyAddedTagItem />
        </div>
      </div>
      <div className="explore-trendings mt-4">
        <div className="title-wrapper">
          <h2>Trending Tech Blogs</h2>
          <Link to={PAGE_ENDPOINTS.EXPLORE.BLOGS} className="see-all-link">
            See all blogs
          </Link>
        </div>
        <div className="content-wrapper">
          <ExploreBlogItem />
          <ExploreBlogItem />
          <ExploreBlogItem />
          <ExploreBlogItem />
          <ExploreBlogItem />
          <ExploreBlogItem />
        </div>
      </div>
    </>
  );
}
