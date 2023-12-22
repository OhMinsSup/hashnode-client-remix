import { Await, useLoaderData } from "@remix-run/react";
import styles from "./styles.module.css";
import { Link } from "lucide-react";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import type { RoutesLoader } from "~/routes/_main";
import { Suspense } from "react";
import { isEmpty } from "~/utils/assertion";
import { AsideLikeItem } from "~/components/shared/future/AsideLikeItem";

export default function AsideBookmark() {
  const data = useLoaderData<RoutesLoader>();

  return (
    <Suspense fallback={<></>}>
      <Await resolve={data.getLikeList}>
        {(data) => {
          if (isEmpty(data.list)) return null;
          return (
            <div className={styles.root}>
              <div>
                <h2 className={styles.title}>Bookmarks</h2>
              </div>
              <div>
                <div className="flex flex-col gap-5 mb-1.5">
                  {data.list.map((item) => {
                    return (
                      <AsideLikeItem
                        key={`like-aside-${item.id}`}
                        data={item}
                      />
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
        }}
      </Await>
    </Suspense>
  );
}
