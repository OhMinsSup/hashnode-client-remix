import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { SettingLayout } from "~/components/setting/future/SettingLayout";
import { AsideMenus } from "~/components/setting/future/AsideMenus";
import { MainHeader } from "~/components/shared/future/MainHeader";
import { settingsLayoutLoader } from "~/.server/routes/settings-layout/settings-layout-loader";

export const loader = settingsLayoutLoader;

export default function Routes() {
  return (
    <SettingLayout
      sidebar={<AsideMenus />}
      header={<MainHeader disableScroll />}
    >
      <Outlet />
    </SettingLayout>
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
