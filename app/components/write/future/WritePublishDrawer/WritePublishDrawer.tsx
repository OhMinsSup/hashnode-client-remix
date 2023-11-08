import React from "react";

import styles from "./styles.module.css";
import { useWriteContext } from "~/context/useWriteContext";
import { DrawerHeader } from "../DrawerHeader";
import { DrawerScrollArea } from "../DrawerScrollArea";
import { DrawerCheckbox } from "../DrawerCheckbox";
import { DrawerTextarea } from "../DrawerTextarea";
import { DrawerSeoImage } from "../DrawerSeoImage";
import { DrawerDate } from "../DrawerDate";
import { DrawerTags } from "../DrawerTags";

export default function WritePublishDrawer() {
  const { isOpen } = useWriteContext();

  if (!isOpen) return null;

  return (
    <div className={styles.root}>
      <form className={styles.form}>
        <DrawerHeader />
        <DrawerScrollArea>
          <WritePublishDrawer.Tags />
          <WritePublishDrawer.TableContentCheckbox />
          <WritePublishDrawer.SeoImage />
          <WritePublishDrawer.SeoTitle />
          <WritePublishDrawer.SeoDescription />
          <WritePublishDrawer.SchduleDate />
          <WritePublishDrawer.DisabledCommentCheckbox />
        </DrawerScrollArea>
      </form>
    </div>
  );
}

interface FormItemProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
}

WritePublishDrawer.FormItem = function Item({
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

WritePublishDrawer.Tags = function Item() {
  return (
    <WritePublishDrawer.FormItem title={<span>Select tags</span>}>
      <DrawerTags />
    </WritePublishDrawer.FormItem>
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
    <WritePublishDrawer.FormItem title={"Generate table of contents?"}>
      <DrawerCheckbox id="toc" name="tableOfContents" label="Yes" />
    </WritePublishDrawer.FormItem>
  );
};

WritePublishDrawer.SeoImage = function Item() {
  return (
    <WritePublishDrawer.FormItem
      title={"Custom OG Image"}
      description={`Upload an image to display when your article is embedded online or on social network feeds. Recommended dimensions: 1200px X 630px. If you don't have one, your cover image will be used instead.`}
    >
      <DrawerSeoImage />
    </WritePublishDrawer.FormItem>
  );
};

WritePublishDrawer.SeoTitle = function Item() {
  return (
    <WritePublishDrawer.FormItem
      title={"SEO Title (Optional)"}
      description={`The "SEO Title" will be shown in place of your Title on search engine results pages, such as a Google search. SEO titles between 40 and 50 characters with commonly searched words have the best click-through-rates.`}
    >
      <DrawerTextarea
        name="seo.title"
        maxLength={70}
        placeholder="Enter meta title"
        style={{ height: "58px !important" }}
      />
    </WritePublishDrawer.FormItem>
  );
};

WritePublishDrawer.SeoDescription = function Item() {
  return (
    <WritePublishDrawer.FormItem
      title={"SEO Description (Optional)"}
      description={`The SEO Description will be used in place of your Subtitle on search engine results pages. Good SEO descriptions utilize keywords, summarize the article and are between 140-156 characters long.`}
    >
      <DrawerTextarea
        name="seo.desc"
        maxLength={156}
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
      description={`Select a publishing date/time (Based on your local time zone). You can use natural language to pick your date/time, or enter a standard date format instead.`}
    >
      <DrawerDate />
    </WritePublishDrawer.FormItem>
  );
};

WritePublishDrawer.DisabledCommentCheckbox = function Item() {
  return (
    <WritePublishDrawer.FormItem
      title={"Disable comments?"}
      description={"This will hide the comments section below your article."}
    >
      <DrawerCheckbox id="comment" name="disabledComment" label="Yes" />
    </WritePublishDrawer.FormItem>
  );
};
