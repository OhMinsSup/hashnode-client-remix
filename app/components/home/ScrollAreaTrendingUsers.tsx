import React, { Suspense } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Await } from "react-router";
import { useLoaderData } from "@remix-run/react";
import type { LoaderData } from "~/routes/__app/__list";

const ScrollAreaTrendingUsers = () => {
  const data = useLoaderData<LoaderData>();

  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport>
        <div className="trending-users-scroll-area">
          <div className="trending-users-scroll-area__container">
            <Suspense
              fallback={
                <>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <ScrollAreaTrendingUsers.Skeleton key={index} />
                  ))}
                </>
              }
            >
              <Await
                resolve={data.getAricleCircle}
                errorElement={<>Error loading package location!</>}
              >
                {(data) => {
                  const circles = data.result?.result?.circles ?? [];
                  return (
                    <>
                      {circles.map((circle: any) => (
                        <ScrollAreaTrendingUsers.AricleCircle key={circle.id} />
                      ))}
                    </>
                  );
                }}
              </Await>
            </Suspense>
          </div>
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="ScrollAreaCorner" />
    </ScrollArea.Root>
  );
};

export default ScrollAreaTrendingUsers;

ScrollAreaTrendingUsers.AricleCircle = function AricleCircle() {
  return (
    <div className="user-container">
      <div className="thumbnail-container">
        <div className="h-full w-full">
          <div className="thumbnail">
            <img src="/images/default_profile.png" alt="thumbnail" />
          </div>
        </div>
      </div>
    </div>
  );
};
ScrollAreaTrendingUsers.Skeleton = function Skeleton() {
  return (
    <div className="user-container">
      <div className="thumbnail-container">
        <div className="h-full w-full">
          <div className="thumbnail">
            <img src="/images/default_profile.png" alt="thumbnail" />
          </div>
        </div>
      </div>
    </div>
  );
};
