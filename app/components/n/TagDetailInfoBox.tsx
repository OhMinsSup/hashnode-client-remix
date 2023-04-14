import React from "react";

function TagDetailInfoBox() {
  return (
    <div className="tag-detail-info-box">
      <TagDetailInfoBox.Header />
      <TagDetailInfoBox.Body />
      <TagDetailInfoBox.Footer />
    </div>
  );
}

export default TagDetailInfoBox;

TagDetailInfoBox.Header = function TagDetailInfoBoxHeader() {
  return <div className="tag-detail-info-box__header">Header</div>;
};

TagDetailInfoBox.Body = function TagDetailInfoBoxBody() {
  return <div className="tag-detail-info-box__body">Body</div>;
};

TagDetailInfoBox.Footer = function TagDetailInfoBoxFooter() {
  return <div className="tag-detail-info-box__footer">Footer</div>;
};
