import { isRouteErrorResponse, useRouteError } from '@remix-run/react';

export default function Routes() {
  return <>asdasdasd</>;
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
