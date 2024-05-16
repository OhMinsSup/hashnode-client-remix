import { isRouteErrorResponse, useRouteError } from '@remix-run/react';

export { meta } from '~/services/seo/settings/settings-developer.meta';

export default function Routes() {
  return <>Developer Settings</>;
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