import { Link } from "@remix-run/react";
import React from "react";

const ExploreTredingTagItem = () => {
  return (
    <div className="explore-tag-item">
      <div className="tag">
        <div className="profile">
          <Link to="/">
            <img
              data-sizes="auto"
              loading="lazy"
              src="https://cdn.hashnode.com/res/hashnode/image/upload/v1607082785538/EryuLRriM.png?w=200&amp;h=200&amp;fit=crop&amp;crop=faces&amp;auto=compress,format&amp;format=webp"
              data-src="https://cdn.hashnode.com/res/hashnode/image/upload/v1607082785538/EryuLRriM.png?w=200&amp;h=200&amp;fit=crop&amp;crop=faces&amp;auto=compress,format&amp;format=webp"
              width="200"
              height="200"
              alt="JavaScript"
              className="lazyload"
            />
          </Link>
        </div>
        <div className="content">
          <h3>
            <Link to="/">JavaScript</Link>
          </h3>
          <Link
            aria-label="Total articles count"
            to="/"
            className="description"
          >
            306 articles this week
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExploreTredingTagItem;
