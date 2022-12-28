import React from "react";
import { Link } from "@remix-run/react";

interface TagItemProps {
  id: number;
  name: string;
  count: number;
}

const TagItem: React.FC<TagItemProps> = ({ id, name, count }) => {
  return (
    <Link
      to="/"
      className="item-center flex w-full flex-row rounded-lg p-2 text-sm text-gray-600"
    >
      <span className=" block flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {name}
      </span>
      <span
        title="460 new articles"
        className="rounded-full border bg-gray-100  py-1 px-2 text-xs font-bold text-gray-500"
      >
        +{count}
      </span>
    </Link>
  );
};

export default TagItem;
