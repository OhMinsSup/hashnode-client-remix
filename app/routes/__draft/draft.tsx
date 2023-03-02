import React from "react";

// types
import type { ActionFunction } from "@remix-run/cloudflare";
import DraftEditor from "~/components/draft/DraftEditor";

export const action: ActionFunction = async ({ request }) => {};

export default function DraftPage() {
  return (
    <>
      <DraftEditor />
    </>
  );
}

export function CatchBoundary() {
  return <DraftPage />;
}
