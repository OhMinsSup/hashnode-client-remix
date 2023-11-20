import React, { useCallback } from "react";
import styles from "./styles.module.css";
import { Link, Form } from "@remix-run/react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { ASSET_URL, PAGE_ENDPOINTS } from "~/constants/constant";
import { useSession } from "~/services/hooks/useSession";
import { useWriteContext } from "~/context/useWriteContext";
import { MyDraftList } from "../MyDraftList";
import { PublishedList } from "../PublishedList";
import { DeletedList } from "../DeletedList";

export default function WriteLeftSide() {
  return (
    <>
      <WriteLeftSide.Title />
      <WriteLeftSide.Search />
      <WriteLeftSide.List />
      <WriteLeftSide.Footer />
    </>
  );
}

WriteLeftSide.Title = function Title() {
  const { setSideClose } = useWriteContext();
  const session = useSession();

  const onClickClose = useCallback(() => {
    setSideClose();
  }, [setSideClose]);

  return (
    <div className={styles.title}>
      <div className="css-0">
        <Link to={PAGE_ENDPOINTS.ROOT} className={styles.btn_back_title}>
          <svg fill="none" viewBox="0 0 8 12">
            <path
              d="m6.667 1-5 5 5 5"
              stroke="stroke-current"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </Link>
      </div>
      <div className="flex-1">
        <div className={styles.title_info_area}>
          <div className="col-span-2">
            <div className="relative h-8 w-full">
              <img
                alt={`${session.username} team blog`}
                src={ASSET_URL.WRITE_TEAM_LOGO}
                decoding="async"
                data-nimg="fill"
                loading="lazy"
                className="w-full h-full object-contain text-transparent object-center"
              />
            </div>
          </div>
          <div className="col-span-8 text-ellipsis overflow-hidden whitespace-nowrap text-left">
            <span className="text-ellipsis overflow-hidden whitespace-nowrap block">
              {session.username} team blog
            </span>
          </div>
        </div>
      </div>
      <div className="ml-2">
        <button
          type="button"
          className={styles.btn_close}
          onClick={onClickClose}
        >
          <svg viewBox="0 0 320 512">
            <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

WriteLeftSide.Search = function Search() {
  const { leftSideKeyword, changeLeftSideKeyword } = useWriteContext();

  const onChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      changeLeftSideKeyword(e.target.value);
    },
    [changeLeftSideKeyword]
  );

  return (
    <div className="relative z-30 p-4">
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
      {leftSideKeyword && leftSideKeyword.length > 0 ? (
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

WriteLeftSide.List = function List() {
  return (
    <ScrollArea.Root className={styles.list}>
      <ScrollArea.Viewport className="h-full">
        <MyDraftList />
        <PublishedList />
        <DeletedList />
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

WriteLeftSide.Footer = function Footer() {
  return (
    <div className={styles.footer}>
      <Form replace method="POST">
        <button type="submit" className={styles.btn_new_draft}>
          <svg fill="none" viewBox="0 0 15 18">
            <path
              d="M13.5 9.375V5.1c0-1.26 0-1.89-.245-2.371a2.25 2.25 0 0 0-.984-.984C11.791 1.5 11.162 1.5 9.9 1.5H5.1c-1.26 0-1.89 0-2.371.245a2.25 2.25 0 0 0-.984.984C1.5 3.209 1.5 3.839 1.5 5.1v7.8c0 1.26 0 1.89.245 2.371.216.424.56.768.984.984.48.245 1.11.245 2.37.245h2.776m4.125 0v-2.25m0 0V12m0 2.25H9.75m2.25 0h2.25m-3.75-9h-6m4.5 3H4.5"
              stroke="stroke-current"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span>New draft</span>
        </button>
      </Form>
    </div>
  );
};
