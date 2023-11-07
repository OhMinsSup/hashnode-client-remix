import { useLocation } from "@remix-run/react";
import { removeTrailingSlash } from "~/utils/util";

export default function CanonicalLink({ origin }: { origin?: string }) {
  const { pathname } = useLocation();

  if (!origin) return null;

  const canonicalUrl = removeTrailingSlash(`${origin}${pathname}`);

  return <link rel="canonical" href={canonicalUrl} />;
}
