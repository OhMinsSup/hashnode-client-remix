import React from "react";
import styles from "./styles.module.css";
import { Link, useLoaderData, Form } from "@remix-run/react";
import { type RoutesLoaderData } from "~/server/routes/n-layout/n-layout-loader.server";
import { ASSET_URL, PAGE_ENDPOINTS } from "~/constants/constant";

interface TagBoxWithHashnodeListProps {
  children: React.ReactNode;
}

export default function TagBoxWithHashnodeList({
  children,
}: TagBoxWithHashnodeListProps) {
  return (
    <>
      <div className={styles.root}>
        <TagBoxWithHashnodeList.Mobile />
        <TagBoxWithHashnodeList.Desktop />
      </div>
      {children}
    </>
  );
}

TagBoxWithHashnodeList.Mobile = function TagBoxWithHashnodeListMobile() {
  const data = useLoaderData<RoutesLoaderData>();
  return (
    <>
      <div className="sm:hidden flex flex-row justify-between w-full items-start">
        <div className="relative flex items-center w-[64px] h-[64px] rounded-full overflow-visible ">
          <img
            alt={data?.result?.name}
            loading="lazy"
            src={ASSET_URL.SHAP}
            className="object-cover rounded-full w-12 h-12"
          />
          <TagBoxWithHashnodeList.TagsBoxIcon />
        </div>
        <div className="flex flex-row gap-2 justify-end z-10">
          <TagBoxWithHashnodeList.ShareLink />
          <TagBoxWithHashnodeList.RssLink />
        </div>
      </div>
      <div className="flex flex-row items-center w-full justify-between sm:hidden">
        <div className={styles.tag_info}>
          <span>{data?.result?.followCount} followers</span>
          <span className="block font-bold">·</span>
          <span>{data?.result?.postCount} articles</span>
        </div>
      </div>
    </>
  );
};

TagBoxWithHashnodeList.Desktop = function TagBoxWithHashnodeListDesktop() {
  const data = useLoaderData<RoutesLoaderData>();

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col justify-start gap-0.5">
          <div className={styles.tag}>{data?.result?.name}</div>
          <div className="flex-row gap-2 hidden sm:flex">
            <div className={styles.tag_info}>
              <span className="z-10">#{data?.result?.name}</span>
              <span className={styles.dot}>·</span>
            </div>
            <div className={styles.tag_info}>
              <span>{data?.result?.followCount} followers</span>
              <span className={styles.dot_2}>·</span>
              <span>{data?.result?.postCount} articles</span>
            </div>
          </div>
          <div className="block sm:hidden">
            <div className={styles.tag_info}>
              <span className="z-10">#{data?.result?.name}</span>
              <span className={styles.dot}>·</span>
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
          <div className="relative flex items-center w-[64px] h-[64px] rounded-full overflow-visible">
            <img
              alt={data?.result?.name}
              loading="lazy"
              src={ASSET_URL.SHAP}
              className="object-cover rounded-full w-12 h-12"
            />
            <TagBoxWithHashnodeList.TagsBoxIcon />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center z-10 ">
        <div className="flex flex-row gap-2 align-middle z-10">
          <Form method="post" navigate={false}>
            {data?.result?.isFollowing ? (
              <button type="submit" className={styles.btn_following}>
                <div className={styles.btn_following_wrapper}>
                  <svg fill="none" viewBox="0 0 16 16" width="16" height="16">
                    <path
                      stroke="currentColor"
                      d="M2.667 8.667 6 12l7.333-8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span>Following</span>
                </div>
              </button>
            ) : (
              <button type="submit" className={styles.btn_follow}>
                <span className="text-sm">Follow Tag</span>
              </button>
            )}
          </Form>
          <Link
            className={styles.link_write}
            to={{
              pathname: PAGE_ENDPOINTS.WRITE.ROOT,
              search: `?tag=${data?.result?.name}`,
            }}
          >
            <span className="text-sm">Write an article</span>
          </Link>
        </div>
        <div className="sm:flex hidden">
          <div className="flex flex-row gap-2 justify-end z-10">
            <TagBoxWithHashnodeList.ShareLink />
            <TagBoxWithHashnodeList.RssLink />
          </div>
        </div>
      </div>
    </>
  );
};

TagBoxWithHashnodeList.ShareLink = function ShareLink() {
  return (
    <button className={styles.btn_info}>
      <TagBoxWithHashnodeList.ShareLinkIcon />
    </button>
  );
};

TagBoxWithHashnodeList.RssLink = function RssLink() {
  return (
    <a target="_blank" href="/n/hackathon/rss">
      <button className={styles.btn_info}>
        <TagBoxWithHashnodeList.RssIcon />
      </button>
    </a>
  );
};

TagBoxWithHashnodeList.TagsBoxIcon = function TagsBoxIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="400"
      height="400"
      fill="none"
      className="absolute -top-[168px] -left-[176px] z-0"
    >
      <g className="dark:hidden block">
        <circle cx="200" cy="200" r="48" stroke="#E2E8F0cc"></circle>
        <circle cx="200" cy="200" r="72" stroke="#E2E8F0aa"></circle>
        <circle cx="200" cy="200" r="96" stroke="#E2E8F055"></circle>
        <circle cx="200" cy="200" r="120" stroke="#E2E8F033"></circle>
        <circle cx="200" cy="200" r="144" stroke="#E2E8F005"></circle>
      </g>
      <g className="hidden dark:block">
        <circle cx="200" cy="200" r="48" stroke="#334155cc"></circle>
        <circle cx="200" cy="200" r="72" stroke="#334155aa"></circle>
        <circle cx="200" cy="200" r="96" stroke="#33415555"></circle>
        <circle cx="200" cy="200" r="120" stroke="#33415533"></circle>
        <circle cx="200" cy="200" r="144" stroke="#33415505"></circle>
      </g>
    </svg>
  );
};

TagBoxWithHashnodeList.ShareLinkIcon = function ShareLinkIcon() {
  return (
    <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
      <path
        stroke="currentColor"
        d="M8.491 10.754a3.77 3.77 0 0 0 5.688.407L16.44 8.9a3.772 3.772 0 0 0-5.332-5.333L9.81 4.856m1.697 4.39a3.772 3.772 0 0 0-5.687-.408L3.56 11.101a3.771 3.771 0 0 0 5.332 5.333l1.29-1.29"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      ></path>
    </svg>
  );
};

TagBoxWithHashnodeList.RssIcon = function RssIcon() {
  return (
    <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
      <path
        stroke="currentColor"
        d="M3.333 3.333a13.333 13.333 0 0 1 13.334 13.334m-13.334-7.5a7.5 7.5 0 0 1 7.5 7.5m-7.5-.834a.833.833 0 0 1 1.667 0m-1.667 0a.833.833 0 0 0 1.667 0m-1.667 0H5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      ></path>
    </svg>
  );
};
