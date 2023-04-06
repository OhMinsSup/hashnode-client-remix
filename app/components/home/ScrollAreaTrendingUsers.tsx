import React, { Suspense, useId, useMemo } from "react";

// components
// import * as ScrollArea from "@radix-ui/react-scroll-area";

// types
import { Await } from "@remix-run/react";

// hooks
import { useLoaderData } from "@remix-run/react";

// types
import type { LoaderData } from "~/routes/__app/__list";

interface ScrollAreaTrendingUsersProps {}

function ScrollAreaTrendingUsers(_props: ScrollAreaTrendingUsersProps) {
  const data = useLoaderData<LoaderData>();

  // return (
  //   <ScrollArea.Root>
  //     <ScrollArea.Viewport>
  //       <div className="trending-users-scroll-area">
  //         <div className="trending-users-scroll-area__container">
  //           <Suspense fallback={<ScrollAreaTrendingUsers.SkeletonGroup />}>
  //             <Await
  //               resolve={data.getAricleCircle}
  //               errorElement={<>Error loading package location!</>}
  //             >
  //               {(data) => (
  //                 <ScrollAreaTrendingUsers.AricleCircleList data={data} />
  //               )}
  //             </Await>
  //           </Suspense>
  //         </div>
  //       </div>
  //     </ScrollArea.Viewport>
  //     <ScrollArea.Scrollbar orientation="vertical">
  //       <ScrollArea.Thumb className="ScrollAreaThumb" />
  //     </ScrollArea.Scrollbar>
  //     <ScrollArea.Corner className="ScrollAreaCorner" />
  //   </ScrollArea.Root>
  // );

  return (
    <div className="trending-users-scroll-area">
      <div className="trending-users-scroll-area__container">
        <Suspense fallback={<ScrollAreaTrendingUsers.SkeletonGroup />}>
          <Await
            resolve={data.getAricleCircle}
            errorElement={<>Error loading package location!</>}
          >
            {(data) => <ScrollAreaTrendingUsers.AricleCircleList data={data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

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

ScrollAreaTrendingUsers.AricleCircleList = function AricleCircleList({
  data,
}: Record<string, any>) {
  const circles = useMemo(() => {
    return data.result?.result?.circles ?? [];
  }, [data]);

  return (
    <>
      {circles.map((circle: any) => (
        <ScrollAreaTrendingUsers.AricleCircle
          key={`aricle-circle-${circle.id}`}
        />
      ))}
    </>
  );
};

ScrollAreaTrendingUsers.SkeletonGroup = function SkeletonGroup() {
  const id = useId();

  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <ScrollAreaTrendingUsers.Skeleton
          key={`ScrollAreaTrendingUsers-${index}-${id}`}
        />
      ))}
    </>
  );
};

ScrollAreaTrendingUsers.Skeleton = function Skeleton() {
  return (
    <div className="user-container">
      <div className="thumbnail-container">
        <div className="h-full w-full">
          <div className="thumbnail">
            <img
              src="/images/default_profile.png"
              alt="thumbnail"
              className="scale-110 blur-2xl grayscale duration-700 ease-in-out group-hover:opacity-75"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
