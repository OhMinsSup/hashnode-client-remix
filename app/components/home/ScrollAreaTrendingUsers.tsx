import React, { Suspense, useId, useMemo } from "react";

// types
import { Await, Link } from "@remix-run/react";

// hooks
import { useLoaderData } from "@remix-run/react";

// types
import type { MainFeedsLoader } from "~/routes/_main._feeds";
import type { GetAritcleCirclesRespSchema } from "~/api/schema/resp";

interface ScrollAreaTrendingUsersProps {}

function ScrollAreaTrendingUsers(_props: ScrollAreaTrendingUsersProps) {
  const data = useLoaderData<MainFeedsLoader>();

  return (
    <div className="trending-users-scroll-area">
      <div className="trending-users-scroll-area__container">
        <Suspense fallback={<ScrollAreaTrendingUsers.SkeletonGroup />}>
          <Await
            resolve={data.getAricleCircle}
            errorElement={<>Error loading package location!</>}
          >
            {(data) => (
              <ScrollAreaTrendingUsers.AricleCircleList
                data={data.json?.result}
              />
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ScrollAreaTrendingUsers;

interface AricleCircleListProps {
  data: GetAritcleCirclesRespSchema;
}

ScrollAreaTrendingUsers.AricleCircleList = function AricleCircleList({
  data,
}: AricleCircleListProps) {
  const circles = useMemo(() => {
    return data?.circles ?? [];
  }, [data]);

  return (
    <>
      {circles.map((circle) => (
        <ScrollAreaTrendingUsers.AricleCircle
          key={`aricle-circle-${circle.id}`}
          circle={circle}
        />
      ))}
    </>
  );
};

interface AricleCircleProps {
  circle: GetAritcleCirclesRespSchema["circles"][0];
}

ScrollAreaTrendingUsers.AricleCircle = function AricleCircle({
  circle,
}: AricleCircleProps) {
  return (
    <div className="user-container">
      <Link to="/" className="thumbnail-container">
        <div className="h-full w-full hover:cursor-pointer hover:opacity-80">
          <div className="thumbnail">
            <img
              src={circle.profile.avatarUrl ?? "/images/default_profile.png"}
              alt="circle-profile"
            />
          </div>
        </div>
      </Link>
    </div>
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
