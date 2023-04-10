import { Link } from "@remix-run/react";
import React from "react";
import ExploreTredingTagItem from "~/components/explore/ExploreTredingTagItem";
import NewlyAddedTags from "~/components/explore/NewlyAddedTags";

export default function Page() {
  return (
    <div className="explore-trending-tags">
      <div className="title-wrapper">
        <h2>Trending Posts</h2>
        <Link to="/explore/posts" className="see-all-link">
          See all Posts
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
