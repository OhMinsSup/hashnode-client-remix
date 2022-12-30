import React from "react";
import { Link } from "@remix-run/react";

const NewlyAddedTagItem = () => {
  return (
    <div className="newly-added-tag">
      <div className="newly-added-tag-wrapper">
        <div className="profile">
          <Link to="/">
            <img
              data-sizes="auto"
              loading="lazy"
              src="https://cdn.hashnode.com/res/hashnode/image/upload/v1654084159330/NJQudJIMu.png?w=200&amp;h=200&amp;fit=crop&amp;crop=faces&amp;auto=compress,format&amp;format=webp"
              data-src="https://cdn.hashnode.com/res/hashnode/image/upload/v1654084159330/NJQudJIMu.png?w=200&amp;h=200&amp;fit=crop&amp;crop=faces&amp;auto=compress,format&amp;format=webp"
              width="200"
              height="200"
              alt="Linode Hackathon"
              className="lazyload"
            />
          </Link>
        </div>
        <div className="content">
          <h3>
            <Link to="/">Linode Hackathon</Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default NewlyAddedTagItem;
