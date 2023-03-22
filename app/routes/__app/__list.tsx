import React from "react";

// remix
import { json } from "@remix-run/cloudflare";

// provider
import { ListProvider } from "~/context/useListContext";
import { Outlet } from "@remix-run/react";
import TabRoutesPosts from "~/components/home/TabRoutesPosts";

// styles
import homeListStyle from "~/styles/routes/home-list.css";

import type { LinksFunction, LoaderArgs } from "@remix-run/cloudflare";

export const loader = async ({ request }: LoaderArgs) => {
  return json({});
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: homeListStyle }];
};

export default function IndexPage() {
  return (
    <ListProvider>
      <div className="main__list-container">
        <div className="main__list-container__tabs">
          <TabRoutesPosts>
            <Outlet />
          </TabRoutesPosts>
        </div>
      </div>
    </ListProvider>
  );
}
