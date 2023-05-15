import React, { useMemo } from "react";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// hooks
import { Link, useLoaderData } from "@remix-run/react";

// types
import type { nTagLoader } from "~/routes/_n.n.$tag";

export default function TagDetailInfoBoxHeader() {
  const { tagInfo } = useLoaderData<nTagLoader>();

  const to = useMemo(() => {
    if (!tagInfo.name) return PAGE_ENDPOINTS.ROOT;
    return PAGE_ENDPOINTS.N.TAG(tagInfo.name);
  }, [tagInfo]);

  return (
    <div className="tag-detail-info-box__header">
      <Link to={to} className="image">
        <img
          src="https://cdn.hashnode.com/res/hashnode/image/upload/v1607082785538/EryuLRriM.png?w=100&h=100&fit=crop&crop=entropy&auto=compress,format&format=webp"
          alt={tagInfo.name}
        />
      </Link>
      <div className="leading-[1.375]">
        <h1>
          <Link to={to} aria-label={tagInfo.name}>
            {tagInfo.name}
          </Link>
        </h1>
        <p>
          <Link to={to} aria-label={tagInfo.name}>
            #{tagInfo.name}
          </Link>
        </p>
      </div>
    </div>
  );
}
