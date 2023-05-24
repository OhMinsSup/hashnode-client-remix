import React, { useCallback } from "react";
import { redirect } from "@remix-run/cloudflare";
import { actionErrorWrapper } from "~/api/validation/errorWrapper";

// hooks
import { useOptionalSession } from "~/api/user/hooks/useSession";
import {
  isRouteErrorResponse,
  useFetcher,
  useRouteError,
} from "@remix-run/react";

// constants
import { PAGE_ENDPOINTS, RESULT_CODE, STATUS_CODE } from "~/constants/constant";

// types
import type { ActionArgs, V2_MetaFunction } from "@remix-run/cloudflare";

export const meta: V2_MetaFunction = ({ matches }) => {
  const Seo = {
    title: "Account Settings — Hashnode",
  };
  const rootMeta =
    // @ts-ignore
    matches.filter((match) => match.id === "root")?.at(0)?.meta ?? [];
  const rootMetas = rootMeta.filter(
    // @ts-ignore
    (meta) =>
      meta.name !== "description" &&
      meta.name !== "og:title" &&
      meta.name !== "og:description" &&
      meta.name !== "twitter:title" &&
      meta.name !== "twitter:description" &&
      !("title" in meta)
  );
  return [
    ...rootMetas,
    {
      title: Seo.title,
    },
    {
      name: "og:title",
      content: Seo.title,
    },
    {
      name: "twitter:title",
      content: Seo.title,
    },
  ];
};

export const action = async ({ context, request }: ActionArgs) => {
  return actionErrorWrapper(async () => {
    const { json } = await context.api.user.deleteUser(request);
    if (json.resultCode !== RESULT_CODE.OK) {
      return redirect(PAGE_ENDPOINTS.SETTINGS.ACCOUNT, {
        status: STATUS_CODE.BAD_REQUEST,
      });
    }
    return redirect(PAGE_ENDPOINTS.ROOT, {
      headers: context.api.auth.getClearAuthHeaders(),
    });
  });
};

export default function Account() {
  const session = useOptionalSession();
  const fetcher = useFetcher();

  const onDeleteAccount = useCallback(() => {
    const confirmDelete = confirm(
      "Are you sure you want to delete your account?"
    );

    if (confirmDelete) {
      fetcher.submit(null, {
        method: "DELETE",
        action: "/settings/account",
        replace: true,
      });
    }
  }, [fetcher]);

  return (
    <>
      <div className="content">
        <h2 className="mb-4 text-xl font-semibold text-red-600">
          Delete account
        </h2>
        <p className="mb-2">
          Your Hashnode account administers these blogs:
          <strong> {session?.username}.hashnode.dev</strong>
        </p>
        <p className="mb-10">
          Your personal data will be deleted permanently when you delete your
          account on Hashnode. This action is irreversible.{" "}
        </p>
        <button
          type="button"
          onClick={onDeleteAccount}
          className="btn-transparent bg-red-600 !text-white hover:bg-red-600"
        >
          Delete your account
        </button>
      </div>
      <div className="h-screen" />
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
