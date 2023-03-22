import React from "react";

// remix
import { defer } from "@remix-run/cloudflare";

// provider
import { ListProvider } from "~/context/useListContext";
import { Outlet } from "@remix-run/react";
import TabRoutesPosts from "~/components/home/TabRoutesPosts";
import ScrollAreaTrendingUsers from "~/components/home/ScrollAreaTrendingUsers";

// styles
import homeListStyle from "~/styles/routes/home-list.css";

import type { LinksFunction, LoaderArgs } from "@remix-run/cloudflare";
import { getAritcleCirclesApi } from "~/api/widget/widget";

export const loader = (args: LoaderArgs) => {
  const getAricleCirclePromise = getAritcleCirclesApi(undefined, args);
  return defer({
    getAricleCircle: getAricleCirclePromise,
  });
};

export type LoaderData = ReturnType<typeof loader>;

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: homeListStyle }];
};

export default function IndexPage() {
  return (
    <ListProvider>
      <div className="main__list-container">
        <div className="main__list-container__trending-users">
          <ScrollAreaTrendingUsers />
        </div>
        <div className="main__list-container__tabs">
          <TabRoutesPosts>
            <Outlet />
          </TabRoutesPosts>
        </div>
      </div>
    </ListProvider>
  );
}
