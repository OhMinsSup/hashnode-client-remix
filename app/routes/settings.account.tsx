import React, { useCallback } from "react";
import { json } from "@remix-run/cloudflare";

// api
import { deleteUserApi } from "~/api/user/user";

// hooks
import { useOptionalSession } from "~/api/user/hooks/useSession";
import { useFetcher } from "@remix-run/react";

// types
import type { ActionArgs } from "@remix-run/cloudflare";
import { HTTPErrorWrapper } from "~/api/validation/common";

export const action = async (args: ActionArgs) => {
  try {
    try {
      switch (args.request.method) {
        case "DELETE":
          await deleteUserApi(args);
          break;
        default:
          throw new Response("Method not allowed", { status: 405 });
      }
      return json({ ok: true });
    } catch (error) {
      throw json(error);
    }
  } catch (error) {
    const error_http = await HTTPErrorWrapper(error);
    if (error_http) {
      return json(error_http.errors, {
        status: error_http.statusCode,
      });
    }
    throw json(error);
  }
};

export default function Account() {
  const session = useOptionalSession();
  const fetcher = useFetcher();

  const onDeleteAccount = useCallback(() => {
    const confirmDelete = confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      fetcher.submit({
        method: "delete",
        action: "/settings/account",
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
