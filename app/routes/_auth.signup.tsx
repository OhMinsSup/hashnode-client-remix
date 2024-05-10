import {
  useRouteError,
  isRouteErrorResponse,
  useLoaderData,
} from "@remix-run/react";
import { type RoutesLoaderData } from "~/.server/routes/auth/signup.loader";
import { SignupForm } from "~/components/auth/future/SignupForm";

export { action } from "~/.server/routes/auth/signup.action";
export { meta } from "~/services/seo/auth/signup.meta";
export { loader } from "~/.server/routes/auth/signup.loader";

export default function Routes() {
  const { email } = useLoaderData<RoutesLoaderData>();
  return <SignupForm email={email} />;
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
