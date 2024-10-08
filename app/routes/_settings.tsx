// components
import { isRouteErrorResponse, Outlet, useRouteError } from '@remix-run/react';

import { SettingLayout } from '~/components/settings/future/SettingLayout';
import { MainHeader } from '~/components/shared/future/MainHeader';
import { MainLayout } from '~/components/shared/future/MainLayout';

export { loader } from '~/.server/routes/settings/settings-layout.loader';

export default function Routes() {
  return (
    <MainLayout header={<MainHeader />} isCustomMain hiddenFooter>
      <SettingLayout>
        <Outlet />
      </SettingLayout>
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
