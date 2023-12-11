import React, { useCallback } from "react";
import styles from "./styles.module.css";
import { Link, useSubmit } from "@remix-run/react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { ASSET_URL, PAGE_ENDPOINTS } from "~/constants/constant";
import { useSession } from "~/services/hooks/useSession";
import { useWriteContext } from "~/context/useWriteContext";
import { MyDraftList } from "../MyDraftList";
import { PublishedList } from "../PublishedList";
import * as Separator from "@radix-ui/react-separator";

export default function WriteLeftSide() {
  return (
    <>
      <WriteLeftSide.Title />
      <WriteLeftSide.Search />
      <WriteLeftSide.NewDraft />
      <div className="px-4">
        <Separator.Root className="w-full border-b" />
      </div>
      <WriteLeftSide.List />
      <hr className={styles.left_side_divider} />
      <WriteLeftSide.Footer />
    </>
  );
}

WriteLeftSide.Title = function Item() {
  const { setSideClose } = useWriteContext();
  const session = useSession();

  const onClickClose = useCallback(() => {
    setSideClose();
  }, [setSideClose]);

  return (
    <div className={styles.title}>
      <div className="flex-1">
        <div className="grid items-center justify-center text-center h-full gap-2 w-full grid-cols-12">
          <div className="col-span-2">
            <div className="relative w-full h-8">
              <img
                alt={`${session.userProfile.username} team blog`}
                src={ASSET_URL.WRITE_TEAM_LOGO}
                decoding="async"
                data-nimg="fill"
                loading="lazy"
                className="w-full h-full object-contain text-transparent object-center"
              />
            </div>
          </div>
          <div className=" col-span-10 truncate text-left">
            <span className="truncate block font-bold">
              {session.userProfile.username} team blog
            </span>
          </div>
        </div>
      </div>
      <button
        type="button"
        className={styles.btn_sidebar}
        onClick={onClickClose}
      >
        <div className="hidden w-5 h-5 sm:block">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_4792_34456"
              maskUnits="userSpaceOnUse"
              x="1"
              y="1"
              width="18"
              height="18"
              style={{ maskType: "alpha" }}
            >
              <rect
                x="1.875"
                y="1.875"
                width="16.25"
                height="16.25"
                rx="3.12"
                fill="#D9D9D9"
              ></rect>
            </mask>
            <g mask="url(#mask0_4792_34456)">
              <path
                d="M2.5 15V5C2.5 3.61929 3.61929 2.5 5 2.5H7.91667H15C16.3807 2.5 17.5 3.61929 17.5 5V15C17.5 16.3807 16.3807 17.5 15 17.5H5C3.61929 17.5 2.5 16.3807 2.5 15Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M14.9974 9.9974H10.4141M10.4141 9.9974L12.4974 12.0807M10.4141 9.9974L12.4974 7.91406"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M7.91406 2.5V17.5"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </div>
        <div className="sm:hidden">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_4792_34456"
              maskUnits="userSpaceOnUse"
              x="1"
              y="1"
              width="18"
              height="18"
              style={{ maskType: "alpha" }}
            >
              <rect
                x="1.875"
                y="1.875"
                width="16.25"
                height="16.25"
                rx="3.12"
                fill="#D9D9D9"
              ></rect>
            </mask>
            <g mask="url(#mask0_4792_34456)">
              <path
                d="M2.5 15V5C2.5 3.61929 3.61929 2.5 5 2.5H7.91667H15C16.3807 2.5 17.5 3.61929 17.5 5V15C17.5 16.3807 16.3807 17.5 15 17.5H5C3.61929 17.5 2.5 16.3807 2.5 15Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M14.9974 9.9974H10.4141M10.4141 9.9974L12.4974 12.0807M10.4141 9.9974L12.4974 7.91406"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M7.91406 2.5V17.5"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </div>
      </button>
    </div>
  );
};

WriteLeftSide.Search = function Item() {
  const { leftSideKeyword, changeLeftSideKeyword } = useWriteContext();

  const isSearching = leftSideKeyword && leftSideKeyword.length > 0;

  const onChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      changeLeftSideKeyword(e.target.value);
    },
    [changeLeftSideKeyword]
  );

  return (
    <div className="relative z-30 px-4 pb-4 flex items-center">
      <input
        placeholder="Search drafts…"
        type="text"
        value={leftSideKeyword}
        className={styles.input_search}
        onChange={onChangeKeyword}
      />
      <span className={styles.input_search_icon}>
        <svg fill="none" viewBox="0 0 16 16">
          <path
            d="m14.75 14.75-3.893-3.893M12.5 6.875a5.625 5.625 0 1 1-11.25 0 5.625 5.625 0 0 1 11.25 0Z"
            stroke="stroke-current"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </span>
      {isSearching ? (
        <button
          type="button"
          className={styles.btn_search_close}
          onClick={() => changeLeftSideKeyword("")}
        >
          <svg viewBox="0 0 320 512">
            <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path>
          </svg>
        </button>
      ) : null}
    </div>
  );
};

WriteLeftSide.NewDraft = function Item() {
  const submit = useSubmit();
  const { leftSideKeyword } = useWriteContext();

  const isSearching = leftSideKeyword && leftSideKeyword.length > 0;

  const onClick = useCallback(() => {
    const isConfirm = confirm("Are you sure you want to create a new draft?");
    if (!isConfirm) return;
    submit(
      {},
      {
        action: "/write",
        method: "POST",
        navigate: false,
        encType: "application/x-www-form-urlencoded",
      }
    );
  }, [submit]);

  if (isSearching) return null;

  return (
    <div className="px-4 pb-4">
      <button type="button" className={styles.btn_new_draft} onClick={onClick}>
        <div className="col-span-1">
          <div className="block">
            <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
              <path
                fill="currentColor"
                d="M14.792 9.583a.625.625 0 1 0 1.25 0h-1.25Zm-3.959 8.542a.625.625 0 1 0 0-1.25v1.25Zm2.084-11.667a.625.625 0 0 0 0-1.25v1.25ZM6.25 5.208a.625.625 0 0 0 0 1.25v-1.25Zm5 4.584a.625.625 0 1 0 0-1.25v1.25Zm-5-1.25a.625.625 0 1 0 0 1.25v-1.25Zm8.542 8.958a.625.625 0 1 0 1.25 0h-1.25Zm1.25-5a.625.625 0 0 0-1.25 0h1.25Zm-3.125 1.875a.625.625 0 1 0 0 1.25v-1.25Zm5 1.25a.625.625 0 0 0 0-1.25v1.25ZM6.25 3.125h6.667v-1.25H6.25v1.25ZM14.792 5v4.583h1.25V5h-1.25Zm-3.959 11.875H6.25v1.25h4.583v-1.25ZM4.375 15V5h-1.25v10h1.25Zm1.875 1.875A1.875 1.875 0 0 1 4.375 15h-1.25c0 1.726 1.4 3.125 3.125 3.125v-1.25Zm6.667-13.75c1.035 0 1.875.84 1.875 1.875h1.25c0-1.726-1.4-3.125-3.125-3.125v1.25ZM6.25 1.875A3.125 3.125 0 0 0 3.125 5h1.25c0-1.036.84-1.875 1.875-1.875v-1.25Zm6.667 3.333H6.25v1.25h6.667v-1.25ZM11.25 8.542h-5v1.25h5v-1.25Zm4.792 8.958V15h-1.25v2.5h1.25Zm0-2.5v-2.5h-1.25V15h1.25Zm-3.125.625h2.5v-1.25h-2.5v1.25Zm2.5 0h2.5v-1.25h-2.5v1.25Z"
              ></path>
            </svg>
          </div>
        </div>
        <div className={styles.btn_new_draft_text}>New draft</div>
      </button>
    </div>
  );
};

WriteLeftSide.List = function Item() {
  return (
    <ScrollArea.Root className={styles.list}>
      <ScrollArea.Viewport className="h-full">
        <MyDraftList />
        <PublishedList />
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex select-none touch-none p-0.5 bg-transparent transition-colors ease-out data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="flex select-none touch-none p-0.5 bg-transparent transition-colors ease-out data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="bg-blackA8" />
    </ScrollArea.Root>
  );
};

WriteLeftSide.Footer = function Item() {
  return (
    <div className={styles.footer}>
      <Link to={PAGE_ENDPOINTS.ROOT} className={styles.btn_back}>
        <div className="flex mx-auto items-center gap-2">
          <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
            <path
              stroke="currentColor"
              d="M16.667 10H3.333m0 0 5 5m-5-5 5-5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
            ></path>
          </svg>
          <span className="text-sm"> Back to Hashnode</span>
        </div>
      </Link>
    </div>
  );
};
