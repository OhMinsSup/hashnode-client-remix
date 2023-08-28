import React from "react";
import styles from "./styles.module.css";
import { cn } from "~/utils/util";
import { TrendingBlog } from "../TrendingBlog";
import { TrendingTag } from "../TrendingTag";
import { NewTag } from "../NewTag";

interface TrendingBoxProps {
  children: React.ReactNode;
}

export default function TrendingBox({ children }: TrendingBoxProps) {
  return (
    <>
      <div className={styles.root_tags}>
        <div className={styles.title}>
          <h2>Trending Tags</h2>
          <a href="/explore/tags" aria-label="See all tags">
            See all tags
          </a>
        </div>
        <div className={styles.tags_container}>
          <TrendingTag />
          <TrendingTag />
          <TrendingTag />
          <TrendingTag />
        </div>
        <div className={styles.tags_new_title}>
          <h2>Newly Added Tags</h2>
        </div>
        <div className={styles.tags_container}>
          <NewTag />
          <NewTag />
          <NewTag />
          <NewTag />
        </div>
      </div>
      <div className={cn(styles.title, "mt-6 mb-4")}>
        <h2>Trending Tech Blogs</h2>
        <a href="/explore/blogs" aria-label="See all blogs">
          See all blogs
        </a>
      </div>
      <TrendingBlog />
      <TrendingBlog />
      <TrendingBlog />
      <TrendingBlog />
    </>
  );
}
