import React from "react";
import styles from "./styles.module.css";

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
  return (
    <>
      <div className="sm:hidden flex flex-row justify-between w-full items-start">
        <div className="relative flex items-center w-[64px] h-[64px] rounded-full overflow-visible ">
          <img
            alt="hackathon"
            src="https://cdn.hashnode.com/res/hashnode/image/upload/v1690883253640/dce6d784-5d60-483d-9292-afa1f701fbd0.png?w=200&amp;h=200&amp;fit=crop&amp;crop=entropy&amp;auto=compress,format&amp;format=webp"
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
          <span>278 followers</span>
          <span className="block font-bold">·</span>
          <span>696 articles</span>
        </div>
      </div>
    </>
  );
};

TagBoxWithHashnodeList.Desktop = function TagBoxWithHashnodeListDesktop() {
  return (
    <>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col justify-start gap-0.5">
          <div className={styles.tag}>hackathon</div>
          <div className="flex-row gap-2 hidden sm:flex">
            <div className={styles.tag_info}>
              <span className="z-10">#hackathon</span>
              <span className="font-bold hidden sm:block">·</span>
            </div>
            <div className={styles.tag_info}>
              <span>278 followers</span>
              <span className="block font-bold">·</span>
              <span>696 articles</span>
            </div>
          </div>
          <div className="block sm:hidden">
            <div className={styles.tag_info}>
              <span className="z-10">#hackathon</span>
              <span className="font-bold hidden sm:block">·</span>
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
          <div className="relative flex items-center w-[64px] h-[64px] rounded-full overflow-visible ">
            <img
              alt="hackathon"
              src="https://cdn.hashnode.com/res/hashnode/image/upload/v1690883253640/dce6d784-5d60-483d-9292-afa1f701fbd0.png?w=200&amp;h=200&amp;fit=crop&amp;crop=entropy&amp;auto=compress,format&amp;format=webp"
              className="object-cover rounded-full w-12 h-12"
            />
            <TagBoxWithHashnodeList.TagsBoxIcon />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2  items-center z-10 ">
        <div className="flex flex-row gap-2 align-middle z-10">
          <button className={styles.btn_follow}>
            <span className="font-medium text-sm">Follow tag</span>
          </button>
          <a
            className={styles.link_write}
            href="/draft?new=true&amp;tag=eyJfaWQiOiI1Njc0NDcyMDk1OGVmMTM4NzliOTQ3ZDQiLCJuYW1lIjoiaGFja2F0aG9uIiwic2x1ZyI6ImhhY2thdGhvbiJ9"
          >
            <span className="font-medium text-sm">Write an article</span>
          </a>
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
