import React from "react";

// types
import type { ActionFunction } from "@remix-run/cloudflare";

export const action: ActionFunction = async ({ request }) => {};

export default function DraftPage() {
  return <>Draft</>;
}

export function CatchBoundary() {
  return <DraftPage />;
}
