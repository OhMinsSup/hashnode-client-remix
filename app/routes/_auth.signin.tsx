// components
import { SigninProvider } from "~/components/auth/context/signin";
import {
  useRouteError,
  isRouteErrorResponse,
  useLoaderData,
} from "@remix-run/react";
import { SigninForm } from "~/components/auth/future/SigninForm";
import { json } from "@remix-run/cloudflare";
import { isEmpty } from "~/utils/assertion";
import { PAGE_ENDPOINTS } from "~/constants/constant";

// types
import type { ErrorState } from "services/app/server";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const redirectType = searchParams.get("redirectType");
  const cookieValue = await context.services.server.getSignupValidate(request);
  const isValidate =
    cookieValue && redirectType ? redirectType === "register" : false;
  return json(
    {
      email: isValidate ? cookieValue : null,
    },
    isValidate
      ? undefined
      : {
          headers: {
            "Set-Cookie": `${context.services.server.signupValidateName}=; Path=${PAGE_ENDPOINTS.AUTH.SIGNIN}; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`,
          },
        }
  );
};

export type RoutesData = typeof loader;

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const redirectType = searchParams.get("redirectType");
  const cookieValue = await context.services.server.getSignupValidate(request);
  const isValidate =
    cookieValue && redirectType ? redirectType === "register" : false;

  if (isValidate) {
    const response = await context.api.auth.signupWithAuth(request);
    if (response instanceof Response) return response;
    return json(response);
  }
  const response = await context.api.auth.signinWithAuth(request);
  if (response instanceof Response) return response;
  return json(response);
};

export type ActionData = ErrorState | null;

export default function Routes() {
  const data = useLoaderData<RoutesData>();
  return (
    <SigninProvider isStep3={!isEmpty(data?.email)}>
      <SigninForm />
    </SigninProvider>
  );
}

export function ErrorBoundary() {
  let error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <Routes />;
  } else if (error instanceof Error) {
    return <Routes />;
  }
  return <Routes />;
}
