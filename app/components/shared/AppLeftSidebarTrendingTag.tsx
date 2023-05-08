import React from "react";
import { Link } from "@remix-run/react";
import { PAGE_ENDPOINTS } from "~/constants/constant";

interface AppLeftSidebarTrendingTagProps {
  id: number;
  name: string;
  count: number;
}

export default function AppLeftSidebarTrendingTag({
  id,
  name,
  count,
}: AppLeftSidebarTrendingTagProps) {
  return (
    <Link
      to={PAGE_ENDPOINTS.N.TAG(name)}
      className="trending-tag-item"
      aria-label={name}
    >
      <span className="mr-1 block flex-1 truncate">{name}</span>
      <span className=" rounded-full border px-2 py-1 text-xs font-bold leading-[1.25]">
        +{count}
      </span>
    </Link>
  );
}
