import { isRouteErrorResponse, useRouteError } from '@remix-run/react';

import { ProfileInfoBox } from '~/components/profile/future/ProfileInfoBox';

export { loader } from '~/.server/routes/profile/profile.$username.loader';

export default function Routes() {
  return (
    <>
      <div className="grid xl:grid-cols-12 2xl:grid-cols-10">
        <ProfileInfoBox />
      </div>
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
