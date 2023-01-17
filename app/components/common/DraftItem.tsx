import { TrashIcon } from "@heroicons/react/solid";
import { Link } from "@remix-run/react";
import React from "react";
import type { DraftSchema } from "~/api/schema/draft";
import { getDateFormat } from "~/libs/date";

interface DraftItemProps {
  draft: DraftSchema;
}

function DraftItem({ draft }: DraftItemProps) {
  return (
    <div className="draft-item">
      <div className="image-area">
        <Link to="/">
          <span>No cover</span>
        </Link>
      </div>
      <div className="content-area">
        <h1>
          <Link to="/">{draft.title || "No Title"}</Link>
          <p>{draft.content ? draft.description : "Empty Draft"}</p>
        </h1>
        <Link to="/">
          <span>Last updated:</span>
          <em>{getDateFormat(draft.updatedAt)}</em>
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
