import React, { Suspense } from "react";
import { Await, useLoaderData } from "@remix-run/react";
import type { HomeLoader } from "~/routes/_main";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import AppRightSidebarContentBox from "./AppRightSidebarContentBox";
import AppRightWidgetBookmark from "./AppRightWidgetBookmark";

export default function AppRightWidgetForBookmarks() {
  const data = useLoaderData<HomeLoader>();

  return (
    <Suspense fallback={<>Loading package location...</>}>
      <Await
        resolve={data.bookmarks}
        errorElement={<>Error loading package location!</>}
      >
        {(data) => {
          const bookmarks = data.json?.result ?? [];
          return (
            <AppRightSidebarContentBox
              title="Bookmarks"
              to={PAGE_ENDPOINTS.BOOKMARKS.ROOT}
            >
              {bookmarks.map((item, index) => (
                <AppRightWidgetBookmark
                  key={`widget-bookmark-${item.id}`}
                  bookmark={item}
                  index={index}
                />
              ))}
            </AppRightSidebarContentBox>
          );
        }}
      </Await>
    </Suspense>
  );
}
