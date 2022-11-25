import React, { useMemo } from "react";
import { Link } from "@remix-run/react";
import { ClientOnly } from "remix-utils";
import { ToastViewer } from "~/components/ui/Editor";

// types
import type { Nullable } from "~/api/schema/api";

interface PostWriterFooterProps {
  avatarUrl?: Nullable<string>;
  username?: Nullable<string>;
  bio?: Nullable<string>;
}

const PostWriterFooter: React.FC<PostWriterFooterProps> = ({
  avatarUrl,
  username,
  bio,
}) => {
  const url = useMemo(() => {
    if (!avatarUrl) {
      return "https://cdn.hashnode.com/res/hashnode/image/upload/v1643707955500/qDAyv6PK_.png";
    }
    return avatarUrl;
  }, [avatarUrl]);

  return (
    <div className=" mb-5 mt-10 border-t border-b py-10">
      <div className="flex w-full flex-row items-start">
        <div className="mr-5">
          <Link
            className="flex h-20 w-20 overflow-hidden rounded-full border md:h-24 md:w-24"
            to="/"
          >
            <img src={url} alt="" />
          </Link>
        </div>
        <div className="flex-1">
          <div className="flex w-full flex-row flex-wrap items-start">
            <div className="w-full md:w-auto md:flex-1">
              <h3 className=" mb-1 text-sm font-semibold uppercase tracking-wider	text-gray-500">
                Written by
              </h3>
              <h1 className="text-2xl font-bold md:mb-5">
                <Link to="/">{username}</Link>
              </h1>
            </div>
          </div>
          <div className="max-w-[65ch] break-words text-base text-gray-600">
            <ClientOnly fallback={<>Loading....</>}>
              {() => <ToastViewer initialValue={bio ?? ""} />}
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostWriterFooter;
