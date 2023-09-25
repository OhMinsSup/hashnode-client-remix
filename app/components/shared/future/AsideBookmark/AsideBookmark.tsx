import React, { useEffect, useMemo } from "react";
import styles from "./styles.module.css";
import { useFetcher } from "@remix-run/react";
import { Link } from "lucide-react";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { getPath } from "~/routes/_loader._protected.loader.bookmarks[.]json";

import type { Loader } from "~/routes/_loader._protected.loader.bookmarks[.]json";

export default function AsideBookmark() {
  const fetcher = useFetcher<Loader>();

  const items = useMemo(() => {
    return fetcher.data?.list ?? [];
  }, [fetcher]);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data == null) {
      fetcher.load(getPath({ limit: 2 }));
    }
  }, [fetcher]);

  return (
    <div className={styles.root}>
      <div>
        <h2 className={styles.title}>Bookmarks</h2>
      </div>
      <div>
        <div className="flex flex-col gap-5 mb-1.5">
          {items.map((item) => {
            return (
              <div className="flex flex-col gap-1" key={`bookmarks-${item.id}`}>
                <h2
                  className={styles.item_title}
                  aria-label="Post Title"
                  title={item.title}
                >
                  {item.title}
                </h2>
                <div className={styles.item_desc}>
                  <p>
                    <a
                      href="/@ltemihai"
                      aria-label="Post Author"
                      title={item.user.username}
                    >
                      {item.user.username}
                    </a>
                  </p>
                  <span className="inline-block mx-2 font-bold opacity-50">
                    ·
                  </span>
                  <p>9 min read</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="">
        <Link
          href={PAGE_ENDPOINTS.BOOKMARKS.ROOT}
          className={styles.btn_see_all}
        >
          See all bookmarks
        </Link>
      </div>
    </div>
  );
}
