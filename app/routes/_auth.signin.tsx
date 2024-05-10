import { useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { SigninForm } from "~/components/auth/future/SigninForm";

export { meta } from "~/services/seo/auth/signin.meta";
export { action } from "~/.server/routes/auth/signin.action";

export default function Routes() {
  return <SigninForm />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <Routes />;
  } else if (error instanceof Error) {
    return <Routes />;
  }
  return <Routes />;
}
