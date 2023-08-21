import React, { useCallback } from "react";
import { json } from "@remix-run/cloudflare";

// hooks
import { useOptionalSession } from "~/api/user/hooks/useSession";
import {
  isRouteErrorResponse,
  useFetcher,
  useRouteError,
} from "@remix-run/react";

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
  const response = await context.api.user.deleteByUser(request);
  if (response instanceof Response) return response;
  return json(response);
};

export default function Routes() {
  const session = useOptionalSession();
  const fetcher = useFetcher();

  const onDeleteAccount = useCallback(() => {
    const confirmDelete = confirm(
      "Are you sure you want to delete your account?"
    );

    if (confirmDelete) {
      fetcher.submit(null, {
        method: "DELETE",
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
    return <Routes />;
  } else if (error instanceof Error) {
    return <Routes />;
  } else {
    return <Routes />;
  }
}
