import React from "react";
import { Link } from "@remix-run/react";
import ExploreTagItem from "./ExploreTagItem";
import NewlyAddedTags from "./NewlyAddedTags";

const ExploreTrendingTags = () => {
  return (
    <div className="explore-trending-tags">
      <div className="title-wrapper">
        <h2>Trending Tags</h2>
        <Link to="/explore/tags" className="see-all-link">
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
      <NewlyAddedTags />
    </div>
  );
};

export default ExploreTrendingTags;
