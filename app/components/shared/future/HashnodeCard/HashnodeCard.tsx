import React from "react";
import styles from "./styles.module.css";
import { Icons } from "../../Icons";
import classNames from "classnames";
import { cn } from "~/utils/util";

export default function HashnodeCard() {
  return (
    <div className={styles.root}>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start gap-3">
          <a href="/@PuggosTheDuck?source=feed-profile-clicked">
            <div className={styles.thumbnail_container}>
              <div className="w-full h-full">
                <img
                  alt="Benjamin Topolosky"
                  src="https://cdn.hashnode.com/res/hashnode/image/upload/v1650680144672/UAeGAFeB6.jpg?w=124&amp;h=124&amp;fit=crop&amp;crop=faces&amp;auto=compress,format&amp;format=webp"
                  decoding="async"
                  data-nimg="fill"
                  className="css-1vfhcql"
                  loading="lazy"
                />
              </div>
            </div>
          </a>
          <div className="flex flex-col">
            <div className="flex flex-row justify-start items-center text-sm gap-1">
              <div className="css-zjik7">
                <a href="/@PuggosTheDuck?source=feed-profile-clicked">
                  <span className={styles.username}>Benjamin Topolosky</span>
                </a>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start gap-1">
              <div className="flex-row items-center justify-start gap-1 hidden sm:flex">
                <a
                  target="_blank"
                  rel="noopener"
                  href="https://bentopolosky.hashnode.dev"
                >
                  <p className={styles.domain}>bentopolosky.hashnode.dev</p>
                </a>
                <p className={styles.dot}>•</p>
              </div>
              <a
                target="_blank"
                rel="noopener"
                href="https://bentopolosky.hashnode.dev/the-siemingly-amazing-honeypot"
              >
                <p className={styles.date}>Jul 23, 2023</p>
              </a>
            </div>
          </div>
        </div>
        <button type="button" aria-label="Featured on Hashnode">
          <div className={styles.btn_featured} data-state="closed">
            <Icons.V2.CardFeatured className="flex items-center justify-center w-5 h-5" />
            <span className="hidden sm:block">Featured</span>
          </div>
        </button>
      </div>
      <div className="flex flex-col justify-start gap-4 md:gap-5 w-full">
        <div className="w-full flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6 justify-between">
          <div className="flex flex-col gap-1 ">
            <div>
              <a
                target="_blank"
                href="https://bentopolosky.hashnode.dev/the-siemingly-amazing-honeypot"
              >
                <h1 className={styles.title}>
                  The SIEMingly Amazing Honeypot 🐝
                </h1>
              </a>
            </div>
            <div className="hidden md:block">
              <a
                target="_blank"
                href="https://bentopolosky.hashnode.dev/the-siemingly-amazing-honeypot"
              >
                <span className={styles.description}>
                  A Sweet Solution to a Sour Problem At the beginning of 2021, I
                  began my journey into the world of technology, more
                  specifically, cyber security. Whenever I ran into a
                  technology-based issue in my home, I always saw Cyber
                  Security/Computer Science had...
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className="flex flex-row items-center justify-start gap-2">
            <a
              target="_blank"
              rel="noopener"
              href="/authenticate?next=https://fragland.dev/a-guide-to-table-partitioning-with-postgresql-12"
            >
              <button
                className={cn(styles.btn_action, "group")}
                aria-label="Like reaction"
              >
                <span className="group-hover:text-blue-600">
                  <Icons.V2.Like />
                </span>
                21
              </button>
            </a>
            <a
              target="_blank"
              rel="noopener"
              href="/authenticate?next=https://fragland.dev/a-guide-to-table-partitioning-with-postgresql-12#comments-list"
            >
              <button
                className={cn(styles.btn_action, "group")}
                aria-label="Comment"
              >
                <span className="group-hover:text-blue-600">
                  <Icons.V2.Comment />
                </span>
              </button>
            </a>
            <p className={styles.dot_2}>•</p>
            <p>160 reads</p>
          </div>
          <div className="flex-row items-center flex gap-1">
            <div className="hidden sm:flex gap-2 items-center">
              <a href="/n/postgresql?source=tags_feed_article">
                <div className={styles.tag}>
                  <span className="truncate">PostgreSQL</span>
                </div>
              </a>
              <div
                data-orientation="horizontal"
                role="separator"
                className="h-3 w-px bg-slate-200 dark:bg-slate-800"
              ></div>
            </div>
            <button
              className="bookmark-button group"
              aria-label="Bookmark post"
              data-state="closed"
            >
              <span
                className={classNames(
                  styles.btn_bookmark_text,
                  "group-hover:text-blue-600"
                )}
              >
                <Icons.V2.Bookmark />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
