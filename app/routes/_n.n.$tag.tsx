import React from "react";
import { json } from "@remix-run/cloudflare";

// types
import type { LoaderArgs } from "@remix-run/cloudflare";

export const loader = async (args: LoaderArgs) => {
  return json({});
};

export type DataLoader = typeof loader;

export default function Bookmarks() {
  return <>Tags</>;
}
