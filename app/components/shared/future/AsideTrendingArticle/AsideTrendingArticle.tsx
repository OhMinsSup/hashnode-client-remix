import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import styles from "./styles.module.css";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Icons } from "~/components/shared/Icons";
import take from "lodash-es/take";
import { Link, useFetcher } from "@remix-run/react";
import {
  getPath,
  type RoutesLoaderData,
} from "~/routes/_loader._public.loader.get-top-posts[.]json";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { isEmpty } from "~/utils/assertion";

const MENUS = [
  {
    text: "1 week",
    value: "7",
  },
  {
    text: "1 month",
    value: "30",
  },
  {
    text: "3 months",
    value: "90",
  },
  {
    text: "6 months",
    value: "180",
  },
];

export default function AsideTrendingArticle() {
  const [, startTransition] = useTransition();
  const [duration, setDuration] = useState<string>("7");
  const [seeMore, setSeeMore] = useState(false);
  const fetcher = useFetcher<RoutesLoaderData>();

  const isIdle = fetcher.state === "idle" && fetcher.data == null;
  // const isSuccessful = fetcher.state === "idle" && fetcher.data != null;

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
    const _items = fetcher.data?.result?.posts ?? [];
    return take(_items, seeMore ? _items.length : 5);
  }, [fetcher.data, seeMore]);

  useEffect(() => {
    if (isIdle) {
      fetcher.load(getPath(duration));
    }
  }, []);

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
              {MENUS.map((menu) => {
                return (
                  <DropdownMenu.RadioItem
                    key={menu.value}
                    value={menu.value}
                    className={styles.dropdown_menu_item}
                  >
                    <span>{menu.text}</span>
                    {duration === menu.value && (
                      <span>
                        <DropdownMenu.ItemIndicator>
                          <Icons.V2.DropdownMenuCheck />
                        </DropdownMenu.ItemIndicator>
                      </span>
                    )}
                  </DropdownMenu.RadioItem>
                );
              })}
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
      <div>
        <div className="flex flex-col gap-5 mb-1.5">
          {items.map((item) => {
            const post = item as unknown as SerializeSchema.SerializePost;
            return (
              <AsideTrendingArticle.Item
                key={`trending-articles-${duration}-${post.id}`}
                item={post}
              />
            );
          })}
        </div>
      </div>
      {isEmpty(items) ? null : (
        <>
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
        </>
      )}
    </div>
  );
}

interface AsideTrendingArticleProps {
  item: SerializeSchema.SerializePost;
}

AsideTrendingArticle.Item = function Item({ item }: AsideTrendingArticleProps) {
  return (
    <div className="flex flex-col gap-1">
      <h2
        className={styles.item_title}
        aria-label="Post Title"
        title={item.title}
      >
        {item.title}
      </h2>
      <div className={styles.item_desc}>
        <p>
          <Link
            to={PAGE_ENDPOINTS.USERS.ID(item.user.id)}
            aria-label={`User Profile: ${item.user.userProfile.username}`}
            title={item.user.userProfile.username}
          >
            {item?.user?.userProfile?.username}
          </Link>
        </p>
        <span className="inline-block mx-2 font-bold opacity-50">·</span>
        <p>{item?.readCount ?? 0} reads</p>
      </div>
    </div>
  );
};
