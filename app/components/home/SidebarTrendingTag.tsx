import React from "react";
import { Link } from "@remix-run/react";

interface SidebarTrendingTagProps {
  id: number;
  name: string;
  count: number;
}

function SidebarTrendingTag({ id, name, count }: SidebarTrendingTagProps) {
  return (
    <Link to="/" className="trending-tag-item" aria-label="Tag">
      <span className="mr-1 block flex-1 truncate">{name}</span>
      <span className=" rounded-full border py-1 px-2 text-xs font-bold leading-[1.25]">
        +{count}
      </span>
    </Link>
  );
}

export default SidebarTrendingTag;

SidebarTrendingTag.Skeleton = function SidebarTrendingTagSkeleton() {
  return (
    <Link to="/" className="trending-tag-item animate-pulse" aria-label="Tag">
      <span className="mr-1 block h-4 flex-1 truncate rounded bg-gray-200" />
      <span className="h-4 rounded-full border bg-gray-200 py-1 px-2 text-xs font-bold leading-[1.25]" />
    </Link>
  );
};