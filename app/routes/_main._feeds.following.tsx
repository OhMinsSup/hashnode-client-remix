import { isRouteErrorResponse, useRouteError } from '@remix-run/react';

import { PostCard } from '~/components/shared/future/PostCard';

export default function Routes() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* {Array.from({ length: 10 }).map((_, i) => (
        <PostCard key={i} />
      ))} */}
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <Routes />;
  } else if (error instanceof Error) {
    return <Routes />;
  } else {
    return <Routes />;
  }
}
