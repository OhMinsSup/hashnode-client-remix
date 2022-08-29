import React from "react";
import { Link } from "@remix-run/react";
import {
  BookIcon,
  BookmarkIcon,
  CommentIcon,
  FeaturedIcon,
  LikeIcon,
} from "~/components/ui/Icon";

function PostItem() {
  return (
    <div className="border-b px-5 py-5">
      {/* Header */}
      <div className="relative mb-2" data-header>
        <div className="flex flex-row items-center break-words">
          {/* Tumbnail */}
          <div className="relative mr-3 block rounded-full">
            <Link to="/" className=" relative z-10 block rounded-full border">
              <div className="h-full w-full">
                <div className="relative z-20 h-10 w-10 rounded-full bg-gray-100 xl:h-12 xl:w-12">
                  <img
                    alt="profile"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiqSizWZqSm1U1zNtLzzDJa5eHMlM20CS4Rg&usqp=CAU"
                    className="h-full w-full rounded-full"
                  />
                </div>
              </div>
            </Link>
          </div>
          {/* user info */}
          <div className="text-base">
            <div className="flex flex-row flex-wrap items-center">
              <Link to="/" className="font-semibold text-gray-900">
                Developer Avocado
              </Link>
            </div>
            <div className="hidden flex-row flex-wrap items-center text-gray-500 md:flex">
              <Link to="/">avocadev.hashnode.dev</Link>
              <span className="mx-2 block font-bold text-gray-400">·</span>
              <Link to="/" className="text-gray-500">
                Aug 24, 2022
              </Link>
            </div>
          </div>
        </div>
        <Link
          to="/"
          className="text- absolute top-0 right-0 m-0 flex-row items-center rounded-full border bg-emerald-50 px-2 py-1 text-xs font-bold uppercase text-amber-400 md:flex"
        >
          <FeaturedIcon className="mr-1 h-4 w-4 fill-current" />
          <span className="tracking-wide text-emerald-600">Featured</span>
        </Link>
      </div>
      {/* Header */}
      <div
        className="flex flex-row flex-wrap items-start md:flex-nowrap"
        data-content
      >
        {/* Text Content */}
        <div className="mb-3 w-full md:mb-0 md:flex-1 md:pr-5">
          {/* titme */}
          <h1
            className="mb-2 break-words font-sans text-xl font-bold text-gray-900"
            style={{ wordBreak: "break-word" }}
          >
            <Link to="/" className="block">
              Solve Problems like a Developer
            </Link>
          </h1>
          {/* created time */}
          <div className="mb-2 flex flex-row flex-wrap items-center">
            <Link
              to="/"
              className="mr-4 flex flex-row items-center font-medium text-gray-900"
            >
              <span className="text-blue-600">
                <BookIcon className="mr-2 h-4 w-4 fill-current" />
              </span>
              <span className="inline-flex">10 min read</span>
            </Link>
          </div>
          {/* html content */}
          <p
            style={{ wordBreak: "break-word", lineHeight: "1.375" }}
            className="break-words text-gray-600"
          >
            <Link to="/" className="block">
              What I'm going to tell you here is applicable not only in software
              development, technical writing, and design but also in life. “A
              problem well stated is a problem half solved.” A quote by John
              Dewe…
            </Link>
          </p>
        </div>
        {/* Image Content */}
        <div className="w-full flex-shrink-0 md:w-64">
          <Link
            to="/"
            aria-label="Solve Problems like a Developer"
            className="block w-full overflow-hidden rounded-xl border bg-gray-100"
          >
            <img
              src="https://velog.velcdn.com/images/sehyunny/post/9b55ba24-f26a-407b-be4f-484b7ddefd6f/image.jpeg"
              alt={"Solve Problems like a Developer"}
            />
          </Link>
        </div>
      </div>
      <div
        className="mt-3 flex flex-col-reverse flex-wrap items-center justify-between md:flex-row"
        data-footer
      >
        {/* right */}
        <div className="mt-3 flex w-full flex-row md:mt-0 md:flex-1">
          <div className="flex flex-1 flex-row md:flex-auto">
            {/* bookmark */}
            <div className="mr-3">
              <button
                type="button"
                className="flex  h-10 w-10 flex-row items-center justify-center rounded-full border border-transparent py-3 pt-1 text-center text-base font-medium text-gray-700 outline-none"
              >
                <BookmarkIcon className="h-5 w-5 flex-shrink fill-current" />
              </button>
            </div>
            {/* tags */}
            <div className="mr-2 flex flex-row items-center text-sm font-medium text-gray-600">
              <Link
                to="/"
                className="mr-1 block w-20 overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border px-2 py-1 text-center text-gray-500 sm:w-24 md:w-auto md:max-w-[8rem]"
                style={{ lineHeight: "1.625" }}
              >
                Beginner Developers
              </Link>
              <Link
                to="/"
                className="mr-1 block w-20 overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border px-2 py-1 text-center text-gray-500 sm:w-24 md:w-auto md:max-w-[8rem]"
                style={{ lineHeight: "1.625" }}
              >
                React
              </Link>
              <Link
                to="/"
                className="mr-1 block overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border px-2 py-1 text-center text-gray-500"
                style={{ lineHeight: "1.625" }}
              >
                +3
              </Link>
            </div>
          </div>
        </div>
        {/* left */}
        <div className="flex w-full flex-row items-center md:w-auto md:pl-0">
          <div className="flex flex-row flex-wrap items-center">
            {/* Like */}
            <Link
              to="/"
              className="inline-flex flex-row items-center justify-center rounded-full border border-transparent px-3 py-1 text-base font-medium text-gray-700 outline-none"
            >
              <LikeIcon className="mr-2 h-5 w-5 flex-shrink fill-current" />
              <span>66</span>
            </Link>
            {/* Comment */}
            <Link
              to="/"
              className="inline-flex flex-row items-center justify-center rounded-full border border-transparent px-3 py-1 text-base font-medium text-gray-700 outline-none"
            >
              <CommentIcon className="mr-2 h-5 w-5 flex-shrink fill-current" />
              <span>6</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostItem;

// padding-left: 0.75rem;
// padding-right: 0.75rem;
// padding-top: 0.25rem;
// padding-bottom: 0.25rem;
// font-size: 1rem;
// line-height: 1.625;
// font-weight: 500;
// --tw-text-opacity: 1;
// color: rgba(55, 65, 81, var(--tw-text-opacity));
// border-width: 1px;
// border-color: transparent;
// border-radius: 9999px;
// display: -webkit-box;
// display: -webkit-flex;
// display: -ms-flexbox;
// display: flex;
// -webkit-flex-direction: row;
// -ms-flex-direction: row;
// flex-direction: row;
// -webkit-align-items: center;
// -webkit-box-align: center;
// -ms-flex-align: center;
// align-items: center;
// display: inline-block;
// padding-left: 0.5rem;
// padding-right: 0.5rem;
// font-size: 0.875rem;
// line-height: 1.25rem;
// text-align: center;
// display: -webkit-inline-box;
// display: -webkit-inline-flex;
// display: -ms-inline-flexbox;
// display: inline-flex;
// -webkit-flex-direction: row;
// -ms-flex-direction: row;
// flex-direction: row;
// -webkit-align-items: center;
// -webkit-box-align: center;
// -ms-flex-align: center;
// align-items: center;
// -webkit-box-pack: center;
// -ms-flex-pack: center;
// -webkit-justify-content: center;
// justify-content: center;
// outline: 2px solid transparent!important;
// outline-offset: 2px!important;
