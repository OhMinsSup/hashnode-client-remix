import React from "react";
import {
  type LoaderFunction,
  json,
  type LinksFunction,
} from "@remix-run/cloudflare";

// provider
import TabPostList from "~/components/__ui/main/TabPostList";
import { ListProvider } from "~/context/useListContext";
import { Outlet } from "@remix-run/react";

// styles
import homeStylesheetUrl from "~/styles/home.css";

export const loader: LoaderFunction = async ({ request }) => {
  return json({});
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: homeStylesheetUrl }];
};

export default function IndexPage() {
  return (
    <ListProvider>
      <div className="home-container">
        <div className="tab-container">
          <TabPostList>
            <Outlet />
          </TabPostList>
        </div>
      </div>
    </ListProvider>
  );
}
