import React from "react";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import styles from "./styles.module.css";
import { cn } from "~/utils/util";
import { useWriteContext } from "~/context/useWriteContext";

export default function WritePublishDrawer() {
  const { isOpen } = useWriteContext();

  if (!isOpen) return null;

  return (
    <div className={styles.root}>
      <form className={styles.form}>
        <WritePublishDrawer.Header />
        <ScrollArea.Root className={styles.scroll_area}>
          <ScrollArea.Viewport className="h-full w-full">
            <WritePublishDrawer.Tags />
            <WritePublishDrawer.TableContentCheckbox />
            <WritePublishDrawer.SeoImage />
            <WritePublishDrawer.SeoTitle />
            <WritePublishDrawer.SeoDescription />
            <WritePublishDrawer.SchduleDate />
            <WritePublishDrawer.DisabledCommentCheckbox />
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
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
}

WritePublishDrawer.FormItem = function FormItem({
  children,
  title,
  description,
}: FormItemProps) {
  return (
    <div className={styles.form_item}>
      <h3 className={styles.form_item_title}>{title}</h3>
      {description && <p className={styles.form_item_desc}>{description}</p>}
      {children}
    </div>
  );
};

WritePublishDrawer.Tags = function Tags() {
  return (
    <WritePublishDrawer.FormItem title={<span>Select tags</span>}>
      <div className="relative">
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

WritePublishDrawer.TableContentCheckbox = function TableContentCheckbox() {
  return (
    <WritePublishDrawer.FormItem title={"Generate table of contents?"}>
      <div>
        <div>
          <label htmlFor="toc" className={styles.ipt_label}>
            <input
              name="tableOfContents"
              type="checkbox"
              id="toc"
              className={styles.ipt_checkbox}
              data-gtm-form-interact-field-id="0"
            />
            <span>Yes</span>
          </label>
        </div>
      </div>
    </WritePublishDrawer.FormItem>
  );
};

WritePublishDrawer.SeoImage = function SeoImage() {
  return (
    <WritePublishDrawer.FormItem
      title={"Custom OG Image"}
      description={`Upload an image to display when your article is embedded online or on social network feeds. Recommended dimensions: 1200px X 630px. If you don't have one, your cover image will be used instead.`}
    >
      <div>
        <div>
          <AspectRatio.Root ratio={16 / 9}>
            <label className={styles.seo_image}>
              <svg viewBox="0 0 512 512">
                <path d="M122.6 155.1 240 51.63V368c0 8.844 7.156 16 16 16s16-7.156 16-16V51.63l117.4 104.3c3 2.77 6.8 4.07 10.6 4.07 4.406 0 8.812-1.812 11.97-5.375 5.875-6.594 5.25-16.72-1.344-22.58l-144-128a15.949 15.949 0 0 0-21.25 0l-144 128C94.78 137.9 94.16 148 100 154.6s16.1 7.2 22.6.5zM448 320H336c-8.836 0-16 7.162-16 16 0 8.836 7.164 16 16 16h112c17.67 0 32 14.33 32 32v64c0 17.67-14.33 32-32 32H64c-17.67 0-32-14.33-32-32v-64c0-17.67 14.33-32 32-32h112c8.8 0 16-7.2 16-16s-7.2-16-16-16H64c-35.35 0-64 28.65-64 64v64c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64v-64c0-35.3-28.7-64-64-64zm-8 96c0-13.25-10.75-24-24-24s-24 10.75-24 24 10.75 24 24 24 24-10.7 24-24z"></path>
              </svg>
              <span>Upload Image</span>
              <input
                name="ogImage"
                type="file"
                id="inputUpload"
                accept="image/avif, image/gif, image/jpeg, image/png, image/webp, image/bmp, image/x, image/tiff, image/vnd, image/xbm"
                className={styles.ipt_upload}
              />
            </label>
          </AspectRatio.Root>
        </div>
      </div>
    </WritePublishDrawer.FormItem>
  );
};

WritePublishDrawer.SeoTitle = function SeoTitle() {
  return (
    <WritePublishDrawer.FormItem
      title={"SEO Title (Optional)"}
      description={`The "SEO Title" will be shown in place of your Title on search engine results pages, such as a Google search. SEO titles between 40 and 50 characters with commonly searched words have the best click-through-rates.`}
    >
      <textarea
        name="seoTitle"
        maxLength={70}
        placeholder="Enter meta title"
        className={styles.textarea}
        style={{ height: "58px !important" }}
      ></textarea>
    </WritePublishDrawer.FormItem>
  );
};

WritePublishDrawer.SeoDescription = function SeoDescription() {
  return (
    <WritePublishDrawer.FormItem
      title={"SEO Description (Optional)"}
      description={`The SEO Description will be used in place of your Subtitle on search engine results pages. Good SEO descriptions utilize keywords, summarize the article and are between 140-156 characters long.`}
    >
      <textarea
        name="seoDescription"
        maxLength={156}
        placeholder="Enter meta description…"
        className={cn(styles.textarea, {
          "min-h-[16vh]": true,
        })}
        style={{ height: "58px !important" }}
      ></textarea>
    </WritePublishDrawer.FormItem>
  );
};

WritePublishDrawer.SchduleDate = function SchduleDate() {
  return (
    <WritePublishDrawer.FormItem
      title={"Schedule your article"}
      description={`Select a publishing date/time (Based on your local time zone). You can use natural language to pick your date/time, or enter a standard date format instead.`}
    >
      <div className="relative mb-2">
        <input
          name="scheduleDate"
          placeholder="Type a date and hit enter..."
          type="text"
          autoComplete="off"
          className={styles.ipt_date}
        />
        <button
          type="button"
          aria-label="Toggle scheduling calendar open"
          data-state="closed"
          className={styles.btn_date}
        >
          <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
            <path
              stroke="currentColor"
              d="M7 3.25h-.5c-1.4 0-2.1 0-2.635.272a2.5 2.5 0 0 0-1.093 1.093C2.5 5.15 2.5 5.85 2.5 7.25v7c0 1.4 0 2.1.272 2.635a2.5 2.5 0 0 0 1.093 1.092c.535.273 1.235.273 2.635.273h7c1.4 0 2.1 0 2.635-.273a2.5 2.5 0 0 0 1.092-1.092c.273-.535.273-1.235.273-2.635v-7c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 0 0-1.092-1.093C15.6 3.25 14.9 3.25 13.5 3.25H13m-6 0h6m-6 0V2.5m0 .75v1.5m6-1.5V2.5m0 .75v1.5m1.125 3h-8.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
            ></path>
          </svg>
        </button>
      </div>
      <button type="button" className={styles.btn_date_cancel}>
        Cancel Scheduling
      </button>
    </WritePublishDrawer.FormItem>
  );
};

WritePublishDrawer.DisabledCommentCheckbox =
  function DisabledCommentCheckbox() {
    return (
      <WritePublishDrawer.FormItem
        title={"Disable comments?"}
        description={"This will hide the comments section below your article."}
      >
        <div>
          <div>
            <label htmlFor="toc" className={styles.ipt_label}>
              <input
                name="disabledComment"
                type="checkbox"
                id="comment"
                className={styles.ipt_checkbox}
                data-gtm-form-interact-field-id="0"
              />
              <span>Yes</span>
            </label>
          </div>
        </div>
      </WritePublishDrawer.FormItem>
    );
  };
