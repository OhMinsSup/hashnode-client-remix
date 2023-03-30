import { Link } from "@remix-run/react";
import React from "react";
import ExploreTredingTagItem from "~/components/__main/ExploreTredingTagItem";
import NewlyAddedTags from "~/components/__main/NewlyAddedTags";

export default function Page() {
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
}
