import { Link } from "@remix-run/react";
import React, { useMemo } from "react";
import { PAGE_ENDPOINTS } from "~/constants/constant";

const RightTagTrendingItem = () => {
  const to = useMemo(() => {
    return PAGE_ENDPOINTS.N.TAG("tagName");
  }, []);
  return (
    <div>
      <div className="right-tag-trending__item">
        <div className="right-tag-trending__item-img">
          <Link to={to} className="right-tag-trending__item-img-container">
            <img
              src="https://cdn.hashnode.com/res/hashnode/image/upload/v1607082785538/EryuLRriM.png?w=100&h=100&fit=crop&crop=entropy&auto=compress,format&format=webp"
              alt=""
            />
          </Link>
        </div>
        <div className="right-tag-trending__item-content">
          <h3 className="right-tag-trending__item-title">
            <Link to={to} aria-label="Tag name">
              #javascript
            </Link>
          </h3>
          <Link
            to={to}
            aria-label="Total articles count"
            className="right-tag-trending__item-count"
          >
            + 347 articles this week
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RightTagTrendingItem;
