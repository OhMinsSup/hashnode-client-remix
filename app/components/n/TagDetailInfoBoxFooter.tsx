import React from "react";

// hooks
import { useLoaderData } from "@remix-run/react";

// utils
import { numberToEnglishUnit } from "~/utils/util";

// components
import { Icons } from "~/components/shared/Icons";

// types
import type { nTagLoader } from "~/routes/_n.n.$tag";

export default function TagDetailInfoBoxFooter() {
  const { tagInfo } = useLoaderData<nTagLoader>();
  return (
    <div className="tag-detail-info-box__footer">
      <div className="count-container">
        <div className="count-item">
          <Icons.Users className="icon__base mr-2 fill-current" />
          <span>{numberToEnglishUnit(tagInfo.followCount)} Followers</span>
        </div>
        <span className="mx-4 block text-slate-400">·</span>
        <div className="count-item">
          <Icons.Article className="icon__base mr-2 fill-current" />
          <span>{numberToEnglishUnit(tagInfo.postCount)} Articles</span>
        </div>
      </div>
      <div className="meta-container"></div>
    </div>
  );
}
