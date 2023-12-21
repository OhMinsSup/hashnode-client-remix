import { Suspense } from "react";
import styles from "./styles.module.css";
import { Await, Link, useLoaderData } from "@remix-run/react";
import type { RoutesLoader } from "~/routes/_main";
import { AsideDraftItem } from "../AsideDraftItem";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { isEmpty } from "~/utils/assertion";

export default function AsideDraft() {
  const data = useLoaderData<RoutesLoader>();
  return (
    <Suspense fallback={<></>}>
      <Await resolve={data.getDraftList}>
        {(data) => {
          if (isEmpty(data.list)) return null;
          return (
            <div className={styles.root}>
              <div className="flex justify-between gap-2 items-center">
                <h2 className={styles.title}>Drafts ({data.totalCount})</h2>
                <Link
                  to={PAGE_ENDPOINTS.WRITE.ROOT}
                  className={styles.btn_see_all}
                >
                  See all
                </Link>
              </div>
              <div className="space-y-3">
                {data.list.map((item) => {
                  return (
                    <AsideDraftItem
                      key={`draft-aside-${item.id}`}
                      data={item}
                    />
                  );
                })}
              </div>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
