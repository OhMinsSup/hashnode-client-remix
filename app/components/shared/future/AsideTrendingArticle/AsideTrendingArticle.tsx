import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import styles from "./styles.module.css";

// components
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Icons } from "~/components/shared/Icons";
import take from "lodash-es/take";

import { getPath } from "~/routes/_loader._public.loader.get-top-posts[.]json";

import { useFetcher } from "@remix-run/react";

import type { Loader } from "~/routes/_loader._public.loader.get-top-posts[.]json";

export default function AsideTrendingArticle() {
  const [, startTransition] = useTransition();
  const [duration, setDuration] = useState<string>("7");
  const [seeMore, setSeeMore] = useState(false);

  const fetcher = useFetcher<Loader>();

  const text = useMemo(() => {
    switch (duration) {
      case "7":
        return "1 week";
      case "30":
        return "1 month";
      case "90":
        return "3 months";
      case "180":
        return "6 months";
      default:
        return "1 week";
    }
  }, [duration]);

  const onDurationChange = useCallback(
    (value: string) => {
      setDuration(value);
      setSeeMore(false);

      startTransition(() => {
        fetcher.load(getPath(value));
      });
    },
    [fetcher]
  );

  const onClickSeeMore = useCallback(() => {
    setSeeMore(true);
  }, []);

  const items = useMemo(() => {
    const _items = fetcher.data?.list ?? [];
    return take(_items, seeMore ? _items.length : 5);
  }, [fetcher.data, seeMore]);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data == null) {
      fetcher.load(getPath(duration));
    }
  }, [fetcher]);

  return (
    <div className={styles.root}>
      <div className="flex justify-between gap-2 items-center">
        <h2 className={styles.title}>Trending Articles</h2>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button type="button" className={styles.btn_select}>
              <span>{text}</span>
              <span>
                <Icons.V2.SelectArrowBottom />
              </span>
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className={styles.dropdown_menu_content}>
            <DropdownMenu.RadioGroup
              value={duration}
              onValueChange={onDurationChange}
            >
              <DropdownMenu.RadioItem
                value="7"
                className={styles.dropdown_menu_item}
              >
                <span>1 week</span>
                {duration === "7" && (
                  <span>
                    <DropdownMenu.ItemIndicator>
                      <Icons.V2.DropdownMenuCheck />
                    </DropdownMenu.ItemIndicator>
                  </span>
                )}
              </DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem
                value="30"
                className={styles.dropdown_menu_item}
              >
                <span>1 month</span>
                {duration === "30" && (
                  <span>
                    <DropdownMenu.ItemIndicator>
                      <Icons.V2.DropdownMenuCheck />
                    </DropdownMenu.ItemIndicator>
                  </span>
                )}
              </DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem
                value="90"
                className={styles.dropdown_menu_item}
              >
                <span>3 months</span>
                {duration === "90" && (
                  <span>
                    <DropdownMenu.ItemIndicator>
                      <Icons.V2.DropdownMenuCheck />
                    </DropdownMenu.ItemIndicator>
                  </span>
                )}
              </DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem
                value="180"
                className={styles.dropdown_menu_item}
              >
                <span>6 months</span>
                {duration === "180" && (
                  <span>
                    <DropdownMenu.ItemIndicator>
                      <Icons.V2.DropdownMenuCheck />
                    </DropdownMenu.ItemIndicator>
                  </span>
                )}
              </DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
      <div>
        <div className="flex flex-col gap-5 mb-1.5">
          {items.map((item) => {
            return (
              <div
                className="flex flex-col gap-1"
                key={`trending-articles-${duration}-${item.id}`}
              >
                <h2
                  className={styles.item_title}
                  aria-label="Post Title"
                  title={item.title}
                >
                  {item.title}
                </h2>
                <div className={styles.item_desc}>
                  <p>
                    {/* TODO: Link */}
                    <a
                      href="/@bytescrum"
                      aria-label="Post Author"
                      title="ByteScrum Technologies"
                    >
                      {item?.user?.userProfile?.username}
                    </a>
                  </p>
                  <span className="inline-block mx-2 font-bold opacity-50">
                    ·
                  </span>
                  <p>{item?.readCount ?? 0} reads</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {seeMore ? null : (
        <div>
          <button
            type="button"
            className={styles.btn_see_more}
            onClick={onClickSeeMore}
          >
            <span className="flex flex-row gap-2 w-full items-center justify-center text-sm font-medium">
              <span>See more</span>
              <Icons.V2.SeeMoreArrowBottom />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
