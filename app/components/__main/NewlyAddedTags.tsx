import React from "react";
import NewlyAddedTagItem from "./NewlyAddedTagItem";

const NewlyAddedTags = () => {
  return (
    <>
      <div className="newly-added-tags-title">
        <h2>Newly Added Tags</h2>
      </div>
      <div className="newly-added-tags-content">
        <NewlyAddedTagItem />
        <NewlyAddedTagItem />
        <NewlyAddedTagItem />
        <NewlyAddedTagItem />
        <NewlyAddedTagItem />
        <NewlyAddedTagItem />
      </div>
    </>
  );
};

export default NewlyAddedTags;
