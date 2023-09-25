import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import styles from "./styles.module.css";
import { cn } from "~/utils/util";

export default function WritePublishDrawer() {
  return (
    <div className={styles.root}>
      <form className={styles.form}>
        <WritePublishDrawer.Header />
        <ScrollArea.Root className={styles.scroll_area}>
          <ScrollArea.Viewport className="h-full w-full">
            <WritePublishDrawer.Tags />
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="flex select-none touch-none p-0.5 bg-blackA6 transition-colors ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar
            className="flex select-none touch-none p-0.5 bg-blackA6 transition-colors ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
            orientation="horizontal"
          >
            <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner className="bg-blackA8" />
        </ScrollArea.Root>
      </form>
    </div>
  );
}

WritePublishDrawer.Header = function Header() {
  return (
    <div className={styles.header}>
      <button type="button" className={styles.btn_close}>
        <svg viewBox="0 0 320 512">
          <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path>
        </svg>
        <span>Close</span>
      </button>
      <button type="submit" className={styles.btn_submit}>
        Publish
      </button>
    </div>
  );
};

interface FormItemProps {
  children: React.ReactNode;
}

WritePublishDrawer.FormItem = function FormItem({ children }: FormItemProps) {
  return (
    <div className={styles.form_item}>
      <h3 className={styles.form_item_title}>
        <span>Select tags</span>
      </h3>
      <div className="relative">{children}</div>
    </div>
  );
};

WritePublishDrawer.Tags = function Tags() {
  return (
    <WritePublishDrawer.FormItem>
      <div className="relative mb-2">
        <input
          type="text"
          id="dropdown-input"
          autoComplete="off"
          data-toggle="dropdown"
          placeholder="Start typing to search…"
          className={styles.ipt_tag}
        />
        <div
          className={cn(styles.tags_dropdown, {
            hidden: true,
          })}
        ></div>
      </div>
      <div className={styles.tags_box}>
        <WritePublishDrawer.Tag />
        <WritePublishDrawer.Tag />
        <WritePublishDrawer.Tag />
        <WritePublishDrawer.Tag />
        <WritePublishDrawer.Tag />
      </div>
    </WritePublishDrawer.FormItem>
  );
};

WritePublishDrawer.Tag = function Tag() {
  return (
    <div className={styles.tag}>
      <span title="JavaScript" className={styles.tag_text}>
        JavaScript
      </span>
      <button type="button">
        <svg viewBox="0 0 320 512">
          <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path>
        </svg>
      </button>
    </div>
  );
};
