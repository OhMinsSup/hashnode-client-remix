import React, { useCallback, useRef, useState } from "react";
import Json from "superjson";
import * as Tooltip from "@radix-ui/react-tooltip";
import styles from "./styles.module.css";
import { useWriteContext } from "~/context/useWriteContext";
import { DrawerHeader } from "../DrawerHeader";
import { DrawerFooter } from "../DrawerFooter";
import { DrawerScrollArea } from "../DrawerScrollArea";
import { DrawerCheckbox } from "../DrawerCheckbox";
import { DrawerTextarea } from "../DrawerTextarea";
import { DrawerSeoImage } from "../DrawerSeoImage";
import { DrawerDate } from "../DrawerDate";
import { DrawerTags } from "../DrawerTags";
import { SettingTagsProvider } from "~/components/setting/context/setting-tag";
import { getTargetElement } from "~/libs/browser-utils";
import { useWriteFormContext } from "~/components/write/context/form";
import { useFetcher } from "@remix-run/react";
import type { FormFieldValues } from "~/services/validate/post-create-api.validate";
import type { RoutesActionData } from "~/routes/_write.write.$postId";

export default function WritePublishDrawer() {
  const { isOpen } = useWriteContext();
  const { handleSubmit } = useWriteFormContext();
  const fetcher = useFetcher<RoutesActionData>();

  const onSubmit = useCallback(
    (input: FormFieldValues) => {
      const stringified = Json.stringify(input);
      const formData = new FormData();
      formData.append("body", stringified);
      fetcher.submit(formData, {
        method: "POST",
        encType: "multipart/form-data",
      });
    },
    [fetcher]
  );

  if (!isOpen) return null;

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <DrawerHeader />
        <DrawerScrollArea>
          <div className="flex flex-col gap-8">
            <WritePublishDrawer.TableContentCheckbox />
            <WritePublishDrawer.Tags />
            <WritePublishDrawer.SeoImage />
            <WritePublishDrawer.SeoTitle />
            <WritePublishDrawer.SeoDescription />
            <WritePublishDrawer.SchduleDate />
            <WritePublishDrawer.DisabledCommentCheckbox />
          </div>
        </DrawerScrollArea>
        <DrawerFooter />
      </form>
    </div>
  );
}

interface FormItemProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  htmlFor?: string;
  children: React.ReactNode;
  isOptional?: boolean;
  type?: "default" | "tooltip";
}

WritePublishDrawer.FormItem = function Item({
  children,
  title,
  htmlFor,
  description,
  type,
  isOptional,
}: FormItemProps) {
  if (type === "tooltip") {
    return (
      <WritePublishDrawer.FormItemTooltip
        title={title}
        htmlFor={htmlFor}
        description={description}
        isOptional={isOptional}
      >
        {children}
      </WritePublishDrawer.FormItemTooltip>
    );
  }

  return (
    <div className={styles.form_item}>
      <label htmlFor={htmlFor} className={styles.form_item_title}>
        {title}
      </label>
      {description && <p className={styles.form_item_desc}>{description}</p>}
      {children}
    </div>
  );
};

WritePublishDrawer.FormItemTooltip = function Item({
  children,
  title,
  htmlFor,
  description,
  isOptional,
}: FormItemProps) {
  const $ele = useRef<HTMLDivElement>(null);
  return (
    <div className="flex flex-col gap-2" ref={$ele}>
      <div className={styles.form_item_custom}>
        <div className="flex gap-[0.375rem]">
          <label htmlFor={htmlFor} className={styles.form_item_title}>
            {title}
          </label>
          {description && (
            <WritePublishDrawer.Tooltip description={description} ref={$ele} />
          )}
        </div>
        {isOptional && (
          <span className={styles.form_item_custom_option_text}>Optional</span>
        )}
      </div>
      {children}
    </div>
  );
};

interface FormItemTooltipProps {
  description: React.ReactNode;
  ref: React.RefObject<HTMLDivElement>;
}

WritePublishDrawer.Tooltip = React.forwardRef<
  HTMLDivElement,
  FormItemTooltipProps
>(function Item({ description }, ref) {
  const [open, setOpen] = useState(false);

  const $ele = getTargetElement<HTMLDivElement>(ref as any);

  return (
    <Tooltip.Provider>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild>
          <button className={styles.form_item_custom_tooltip}>
            <div className={styles.form_item_custom_tooltip_container}>
              <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
                <path
                  stroke="currentColor"
                  d="M7.575 7.5a2.5 2.5 0 0 1 4.858.833c0 1.667-2.5 2.5-2.5 2.5M10 14.166h.008M18.333 10a8.333 8.333 0 1 1-16.666 0 8.333 8.333 0 0 1 16.666 0Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.25"
                ></path>
              </svg>
            </div>
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal container={$ele}>
          <Tooltip.Content
            data-form-item-tooltip
            className="rounded-md	px-3 py-2 text-xs text-white dark:text-slate-900 bg-slate-900 dark:bg-slate-50 z-1000"
            sideOffset={5}
          >
            <div className="w-48">{description}</div>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
});

WritePublishDrawer.Tags = function Item() {
  return (
    <SettingTagsProvider>
      <WritePublishDrawer.FormItem title="Select tags">
        <DrawerTags />
      </WritePublishDrawer.FormItem>
    </SettingTagsProvider>
  );
};

WritePublishDrawer.Tag = function Item() {
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

WritePublishDrawer.TableContentCheckbox = function Item() {
  return (
    <DrawerCheckbox
      id="toc"
      name="tableOfContents"
      label="Yes"
      title="Table of contents"
      description="Generate table of contents for your article"
    />
  );
};

WritePublishDrawer.SeoImage = function Item() {
  return (
    <WritePublishDrawer.FormItem
      title={"Custom OG Image"}
      description={`Upload an image to show when your article appears online or on social media. If there’s no image, the cover image will be used instead.`}
    >
      <DrawerSeoImage />
    </WritePublishDrawer.FormItem>
  );
};

WritePublishDrawer.SeoTitle = function Item() {
  return (
    <WritePublishDrawer.FormItem
      title={"SEO title"}
      type="tooltip"
      isOptional
      description={`The "SEO Title" will be shown in place of your Title on search engine results pages, such as a Google search. SEO titles between 40 and 50 characters with commonly searched words have the best click-through-rates.`}
    >
      <DrawerTextarea
        name="seo.title"
        maxLength={70}
        rows={1}
        placeholder="Enter meta title"
        style={{ height: "58px !important" }}
      />
    </WritePublishDrawer.FormItem>
  );
};

WritePublishDrawer.SeoDescription = function Item() {
  return (
    <WritePublishDrawer.FormItem
      title={"SEO description"}
      type="tooltip"
      isOptional
      description={`The SEO Description will be used in place of your Subtitle on search engine results pages. Good SEO descriptions utilize keywords, summarize the article and are between 140-156 characters long.`}
    >
      <DrawerTextarea
        name="seo.desc"
        maxLength={156}
        rows={2}
        placeholder="Enter meta description…"
        style={{ height: "58px !important", minHeight: "16vh" }}
      />
    </WritePublishDrawer.FormItem>
  );
};

WritePublishDrawer.SchduleDate = function Item() {
  return (
    <WritePublishDrawer.FormItem
      title={"Schedule your article"}
      type="tooltip"
      isOptional
      description={`Select a publishing date/time (Based on your local time zone). You can use natural language to pick your date/time, or enter a standard date format instead.`}
    >
      <DrawerDate />
    </WritePublishDrawer.FormItem>
  );
};

WritePublishDrawer.DisabledCommentCheckbox = function Item() {
  return (
    <DrawerCheckbox
      id="comment"
      name="disabledComment"
      label="Yes"
      title={"Disable comments?"}
      description={"This will hide the comments section below your article"}
    />
  );
};
