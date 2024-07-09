import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';

import type { RoutesLoaderData } from '~/.server/routes/profile/profile.$username.loader';

export { loader } from '~/.server/routes/profile/profile.$username.loader';

export default function Routes() {
  const data = useLoaderData<RoutesLoaderData>();
  return (
    <>
      <div className="grid">Profile</div>
      <div className="mb-5 grid">Profile</div>
      <div className="mb-5 grid">Profile</div>
      <div className="mb-20 grid">Profile</div>
    </>
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
