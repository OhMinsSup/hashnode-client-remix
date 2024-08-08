import { isRouteErrorResponse, Outlet, useRouteError } from '@remix-run/react';

import { ProfileLayout } from '~/components/profile/future/ProfileLayout';
import { MainHeader } from '~/components/shared/future/MainHeader';
import { MainLayout } from '~/components/shared/future/MainLayout';

export default function Routes() {
  return (
    <MainLayout
      header={<MainHeader />}
      isCustomMain
      hiddenFooter
      hasScrollSensor
    >
      <ProfileLayout>
        <Outlet />
      </ProfileLayout>
    </MainLayout>
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
