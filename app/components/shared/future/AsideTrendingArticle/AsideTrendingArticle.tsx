import React from "react";
import styles from "./styles.module.css";
import { Icons } from "../../Icons";

export default function AsideTrendingArticle() {
  return (
    <div className={styles.root}>
      <div className="flex justify-between gap-2 items-center">
        <h2 className={styles.title}>Trending Articles</h2>
        <button
          className={styles.btn_select}
          type="button"
          id="radix-:r12:"
          aria-haspopup="menu"
          aria-expanded="false"
          data-state="closed"
        >
          <span>1 week</span>
          <span>
            <Icons.V2.SelectArrowBottom />
          </span>
        </button>
      </div>
      <div>
        <div className="flex flex-col gap-5 mb-1.5">
          <div className="flex flex-col gap-1">
            <h2
              className={styles.item_title}
              aria-label="Post Title"
              title="Implementing 2FA in NestJS: A Step-by-Step Guide for Better Security"
            >
              Implementing 2FA in NestJS: A Step-by-Step Guide for Better
              Security
            </h2>
            <div className={styles.item_desc}>
              <p>
                <a
                  href="/@bytescrum"
                  aria-label="Post Author"
                  title="ByteScrum Technologies"
                >
                  ByteScrum Technolo...
                </a>
              </p>
              <span className="inline-block mx-2 font-bold opacity-50 ml-0">
                ·
              </span>
              <p>54 reads</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h2
              className={styles.item_title}
              aria-label="Post Title"
              title="Unveiling the Single-Threaded Nature of JavaScript and Node.js: The Waiter and the Restaurant Analogy"
            >
              Unveiling the Single-Threaded Nature of JavaScript and Node.js:
              The Waiter and the Restaurant Analogy
            </h2>
            <div className={styles.item_desc}>
              <p>
                <a
                  href="/@godnik"
                  aria-label="Post Author"
                  title="Nikhil Mishra"
                >
                  Nikhil Mishra
                </a>
              </p>
              <span className="inline-block mx-2 font-bold opacity-50 ">·</span>
              <p>177 reads</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h2
              className={styles.item_title}
              aria-label="Post Title"
              title="How to Generate Dynamic Sitemap in Next Js&nbsp;Using&nbsp;Node&nbsp;Js."
            >
              How to Generate Dynamic Sitemap in Next
              Js&nbsp;Using&nbsp;Node&nbsp;Js.
            </h2>
            <div className={styles.item_desc}>
              <p>
                <a
                  href="/@bytescrum"
                  aria-label="Post Author"
                  title="ByteScrum Technologies"
                >
                  ByteScrum Technolo...
                </a>
              </p>
              <span className="inline-block mx-2 font-bold opacity-50 ml-0">
                ·
              </span>
              <p>69 reads</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button className={styles.btn_see_more}>
          <span className="flex flex-row gap-2 w-full items-center justify-center text-sm font-medium">
            <span>See more</span>
            <Icons.V2.SeeMoreArrowBottom />
          </span>
        </button>
      </div>
    </div>
  );
}
