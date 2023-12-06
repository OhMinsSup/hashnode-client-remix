import { Suspense, useCallback, useState } from "react";
import groupBy from "lodash-es/groupBy";
import dayjs from "dayjs";
import styles from "./styles.module.css";
import { UserRecentActivityCard } from "~/components/users/future/UserRecentActivityCard";
import { Await, useLoaderData } from "@remix-run/react";

//types
import type { RoutesLoader } from "~/routes/_user.(@).$userId._index";
import type { SerializeFrom } from "@remix-run/cloudflare";

export default function UserRecentActivity() {
  const data = useLoaderData<RoutesLoader>();
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h3 className={styles.title}>Recent Activity</h3>
        <Suspense fallback={<></>}>
          <Await resolve={data.historiesPromise}>
            {(result) => {
              return <UserRecentActivity.List data={result} />;
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

interface ListProps {
  data: SerializeFrom<SerializeSchema.SerializeHistory[]>;
}

UserRecentActivity.List = function List({ data }: ListProps) {
  const [isOpen, setOpen] = useState(false);

  const grouped = groupBy(data, (item) =>
    dayjs(item.createdAt).format("YYYY-MM-DD")
  );

  const onClick = useCallback(() => {
    setOpen(true);
  }, []);

  if (!isOpen) {
    return (
      <div className={styles.list}>
        {Object.entries(grouped).map(([key, value], index) => {
          if (index > 4) return null;
          return (
            <UserRecentActivityCard
              key={`${key}-${index}`}
              date={key}
              data={value}
            />
          );
        })}
        <UserRecentActivityCard.More onClick={onClick} />
      </div>
    );
  }

  return (
    <>
      {Object.entries(grouped).map(([key, value], index) => {
        return (
          <UserRecentActivityCard
            key={`${key}-${index}`}
            date={key}
            data={value}
          />
        );
      })}
    </>
  );
};
