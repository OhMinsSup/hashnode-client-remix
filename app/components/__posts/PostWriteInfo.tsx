import { Link } from "@remix-run/react";
import React, { useMemo } from "react";
import { FORMAT, getDateFormat } from "~/libs/date";
import { BookIcon } from "../__ui/Icon";

import type { Nullable } from "~/api/schema/api";

interface PostWriteInfoProps {
  avatarUrl?: Nullable<string>;
  username?: string;
  createdAt?: string;
}

const PostWriteInfo: React.FC<PostWriteInfoProps> = ({
  username,
  avatarUrl,
  createdAt,
}) => {
  const url = useMemo(() => {
    if (!avatarUrl) {
      return "https://cdn.hashnode.com/res/hashnode/image/upload/v1643707955500/qDAyv6PK_.png";
    }
    return avatarUrl;
  }, [avatarUrl]);

  return (
    <div className="relative mb-8 flex flex-row flex-wrap items-center justify-center px-4 md:mb-14 md:mt-[-1.75rem] md:text-lg">
      <div className="mb-5 flex w-full flex-row items-center justify-center md:mb-0 md:w-auto md:justify-start">
        <div className=" mr-2 h-10 w-10 overflow-hidden rounded-full bg-gray-200 md:mr-3 md:h-12 md:w-12">
          <Link to="/" className="relative block h-full w-full">
            <img className="w-full" src={url} alt="profile" />
          </Link>
        </div>
        <Link to="/" className="font-medium text-gray-900">
          <span>{username}</span>
        </Link>
      </div>
      <div className="mb-5 flex w-full flex-row items-center justify-center md:mb-0 md:w-auto md:justify-start">
        <span className="ml-3 mr-3 hidden font-bold text-gray-500 md:block">
          ·
        </span>
        <Link to="/" className="tooltip-handle text-gray-700">
          <span>{getDateFormat(createdAt, FORMAT.MMMM_D_YYYY)}</span>
        </Link>
        <span className=" ml-3 mr-3 font-bold text-gray-500 md:block">·</span>
        <p className="flex flex-row items-center text-gray-700">
          <BookIcon className=" mr-2 h-5 w-5 fill-current opacity-75" />
          <span>20 min read</span>
        </p>
      </div>
      <div className=" ml-4 rounded-lg border p-2">
        <div className="flex flex-row">
          <div className="relative">
            <button
              type="button"
              aria-label="Post actions dropdown"
              className="flex items-center rounded-full border border-transparent  px-2 py-1 text-sm  font-medium text-gray-500"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 512 512">
                <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216zm-207.5 86.6l115-115.1c4.7-4.7 4.7-12.3 0-17l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L256 303l-99.5-99.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l115 115.1c4.8 4.6 12.4 4.6 17.1-.1z"></path>
              </svg>
              <span className="ml-2">More</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostWriteInfo;
