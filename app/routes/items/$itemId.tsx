import React from "react";
import { PostThumbnail, PostTitle } from "~/components/posts";
import { Header } from "~/components/ui/Header";

const StoriesDetail = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-zinc-800">
      <Header />
      <div className="relative z-40">
        <main className="pb-24">
          <article>
            {/* Wrapper */}
            <div className="lg:max-w-5xl md:max-w-3xl sm:max-w-[640px] w-full mx-auto relative z-40 grid grid-cols-8">
              {/* Content */}
              <div className="col-span-1 lg:col-span-6 lg:col-start-2">
                {/* Thumbnail */}
                <PostThumbnail />
                <PostTitle />
                내용
              </div>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
};

export default StoriesDetail;
