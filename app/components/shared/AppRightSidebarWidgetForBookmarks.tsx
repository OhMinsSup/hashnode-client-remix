import React, { Suspense } from "react";

// remix
import { Await, useLoaderData } from "@remix-run/react";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// components
import AppRightSidebarContentBox from "./AppRightSidebarContentBox";
import AppRightSidebarWidgetBookmark from "./AppRightSidebarWidgetBookmark";

// types
import type { Loader } from "~/routes/_main";

export default function AppRightSidebarWidgetForBookmarks() {
  const data = useLoaderData<Loader>();

  return (
    <Suspense fallback={<>Loading package location...</>}>
      <Await
        resolve={data.bookmarks}
        errorElement={<>Error loading package location!</>}
      >
        {(data) => {
          // @ts-ignore
          const bookmarks = data.json?.result ?? [];
          return (
            <AppRightSidebarContentBox
              title="Bookmarks"
              to={PAGE_ENDPOINTS.BOOKMARKS.ROOT}
            >
              {/* @ts-ignore */}
              {bookmarks.map((item, index) => (
                <AppRightSidebarWidgetBookmark
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
