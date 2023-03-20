import React from "react";
import { Link } from "@remix-run/react";

interface TagItemProps {
  id: number;
  name: string;
  count: number;
}

const TagItem: React.FC<TagItemProps> = ({ id, name, count }) => {
  return (
    <Link to="/" className="trending-tag-item" aria-label="Tag">
      <span>{name}</span>
      <span>+{count}</span>
    </Link>
  );
};

export default TagItem;
