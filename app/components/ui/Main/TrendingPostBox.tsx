import React, { useCallback, useMemo, useState } from "react";
import classNames from "classnames";
import { useLoaderData } from "@remix-run/react";

// components
import RightContentBox from "~/components/ui/main/RightContentBox";
import Button from "~/components/ui/shared/Button";
import { TrendingSimplePost } from "~/components/common";
import { PAGE_ENDPOINTS } from "~/constants/constant";

import type { PressEvent } from "@react-types/shared";

interface TrendingPostBoxProps {}

const TrendingPostBox: React.FC<TrendingPostBoxProps> = () => {
  const { topPosts } = useLoaderData();

  const KEY_MAP_RECORD: Record<number, string> = useMemo(() => {
    return {
      0: "7",
      1: "30",
      2: "90",
      3: "180",
    };
  }, []);

  const [duration, setDuration] = useState(KEY_MAP_RECORD[0]);

  const onClickTab = useCallback((e: PressEvent) => {
    const duration = e.target?.getAttribute("data-value");
    if (!duration) return;
    setDuration(duration);
  }, []);

  return (
    <RightContentBox title="Trending" to={PAGE_ENDPOINTS.EXPLORE.ROOT}>
      <div className="treding-post-tabs">
        <Button
          type="button"
          data-value="7"
          className={classNames("tab", {
            active: duration === KEY_MAP_RECORD[0],
          })}
          onPress={onClickTab}
        >
          1 week
        </Button>
        <Button
          type="button"
          data-value="30"
          className={classNames("tab", {
            active: duration === KEY_MAP_RECORD[1],
          })}
          onPress={onClickTab}
        >
          1 months
        </Button>
        <Button
          type="button"
          data-value="90"
          className={classNames("tab", {
            active: duration === KEY_MAP_RECORD[2],
          })}
          onPress={onClickTab}
        >
          3 months
        </Button>
        <Button
          type="button"
          data-value="180"
          className={classNames("tab", {
            active: duration === KEY_MAP_RECORD[3],
          })}
          onPress={onClickTab}
        >
          6 months
        </Button>
      </div>
      <div>
        <div>
          <TrendingSimplePost
            enabled
            duration={duration}
            initialData={duration === KEY_MAP_RECORD[0] ? topPosts : undefined}
          />
        </div>
      </div>
    </RightContentBox>
  );
};

export default TrendingPostBox;
