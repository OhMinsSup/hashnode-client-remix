import React from "react";

// components
import { Outlet } from "@remix-run/react";

// remix
import { defer } from "@remix-run/cloudflare";

// types
import type { LoaderArgs } from "@remix-run/cloudflare";

export const loader = async (args: LoaderArgs) => {
  const id = args.params.itemId;

  if (!id) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  // 인티저 영어
  const itemId = parseInt(id, 10);
  if (isNaN(itemId)) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return defer({});
};

export type ItemRootLoaderData = typeof loader;

export default function Items() {
  return <Outlet />;
}
