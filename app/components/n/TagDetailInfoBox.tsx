import React from "react";

import TagDetailInfoBoxHeader from "./TagDetailInfoBoxHeader";
import TagDetailInfoBoxBody from "./TagDetailInfoBoxBody";
import TagDetailInfoBoxFooter from "./TagDetailInfoBoxFooter";

export default function TagDetailInfoBox() {
  return (
    <div className="tag-detail-info-box">
      <TagDetailInfoBoxHeader />
      <TagDetailInfoBoxBody />
      <TagDetailInfoBoxFooter />
    </div>
  );
}
