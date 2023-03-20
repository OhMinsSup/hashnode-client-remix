import React from "react";
import { useLoaderData } from "@remix-run/react";
import { Item } from "react-stately";

// components
import RightContentBox from "~/components/__ui/main/RightContentBox";
import TrendingPostTabs from "~/components/__ui/main/TrendingPostTabs";
import { TrendingSimplePost } from "~/components/common";
import { PAGE_ENDPOINTS } from "~/constants/constant";

interface TrendingPostBoxProps {}

const TrendingPostBox: React.FC<TrendingPostBoxProps> = () => {
  const { topPosts } = useLoaderData();

  return (
    <RightContentBox title="Trending" to={PAGE_ENDPOINTS.EXPLORE.ROOT}>
      <TrendingPostTabs aria-label="Trending posts" key={"7"}>
        <Item key="7" title={"1 week"}>
          <TrendingSimplePost enabled duration="7" initialData={topPosts} />
        </Item>
        <Item key="30" title={"1 months"}>
          <TrendingSimplePost enabled duration="30" />
        </Item>
        <Item key="90" title={"3 months"}>
          <TrendingSimplePost enabled duration="90" />
        </Item>
        <Item key="180" title={"6 months"}>
          <TrendingSimplePost enabled duration="180" />
        </Item>
      </TrendingPostTabs>
    </RightContentBox>
  );
};

export default TrendingPostBox;
