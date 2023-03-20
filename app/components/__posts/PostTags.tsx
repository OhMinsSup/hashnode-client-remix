import { Link } from "@remix-run/react";
import React from "react";

// types
import type { TagSchema } from "~/api/schema/tag";

interface PostTagsProps {
  tags: Pick<TagSchema, "id" | "name">[];
}

const PostTags: React.FC<PostTagsProps> = ({ tags }) => {
  return (
    <div className="mb-5 flex w-full flex-row flex-wrap md:mb-0">
      {tags.map((tag) => (
        <Link
          to="/"
          className=" mr-3 mb-2 rounded-lg border bg-gray-100 py-1 px-2 text-base font-medium text-gray-700"
          key={`post-detail-tag-${tag.id}`}
        >
          <span>{tag.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default PostTags;
