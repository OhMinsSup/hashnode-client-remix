import React from "react";
import { type LoaderFunction, json } from "@remix-run/cloudflare";

import type { LinksFunction } from "@remix-run/cloudflare";

// styles
import draftsStylesheetUrl from "../../styles/drafts.css";
import { Link } from "@remix-run/react";
import { CreateIcon } from "~/components/ui/Icon";
import { DraftItem } from "~/components/common";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: draftsStylesheetUrl }];
};

export default function Drafts() {
  return (
    <div className="relative col-span-7 min-w-0 pt-5 pb-5">
      <div className="drafts-info-box">
        <div className="text-area">
          <h1>Your Drafts</h1>
          <p>All your pending drafts are here</p>
        </div>
        <div className="right-area">
          <Link to="/">
            <CreateIcon className="mr-2 h-4 w-4 fill-current" />
            <span>Create New Draft</span>
          </Link>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border bg-white">
        <DraftItem />
        <DraftItem />
        <DraftItem />
        <DraftItem />
        <DraftItem />
        <DraftItem />
      </div>
    </div>
  );
}
