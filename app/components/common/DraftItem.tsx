import { TrashIcon } from "@heroicons/react/solid";
import { Link } from "@remix-run/react";
import React from "react";

function DraftItem() {
  return (
    <div className="draft-item">
      <div className="image-area">
        <Link to="/">
          <span>No cover</span>
        </Link>
      </div>
      <div className="content-area">
        <h1>
          <Link to="/">DraftItem</Link>
        </h1>
        <p>DraftItem</p>
        <p>DraftItem</p>
        <Link to="/">
          <span>Last updated:</span>
          <em>December 26, 2022</em>
        </Link>
      </div>
      <div className="btn-area">
        <button type="button" className="btn-edit">
          <span>Edit</span>
        </button>
        <button type="button" className="btn-remove">
          <TrashIcon className="h-4 w-4 fill-current opacity-75" />
        </button>
      </div>
    </div>
  );
}

export default DraftItem;
