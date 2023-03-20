import React from "react";
import { Link } from "@remix-run/react";
import ExploreTredingTagItem from "./ExploreTredingTagItem";
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
        <ExploreTredingTagItem />
        <ExploreTredingTagItem />
        <ExploreTredingTagItem />
        <ExploreTredingTagItem />
        <ExploreTredingTagItem />
        <ExploreTredingTagItem />
      </div>
      <NewlyAddedTags />
    </div>
  );
};

export default ExploreTrendingTags;
