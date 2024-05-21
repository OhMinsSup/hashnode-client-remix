import { isRouteErrorResponse, Outlet, useRouteError } from '@remix-run/react';

import { Aside } from '~/components/shared/future/Aside';
import { MainContent } from '~/components/shared/future/MainContent';
import { MainFooter } from '~/components/shared/future/MainFooter';
import { MainHeader } from '~/components/shared/future/MainHeader';
import { MainLayout } from '~/components/shared/future/MainLayout';

export default function Routes() {
  return (
    <MainLayout header={<MainHeader />} footer={<MainFooter />} hasScrollSensor>
      <MainContent aside={<Aside />} hasScrollSensor>
        <Outlet />
      </MainContent>
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
