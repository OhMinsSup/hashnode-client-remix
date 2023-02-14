import React from "react";
import { Item } from "react-stately";

import Tabs from "~/components/ui/shared/Tabs";
import {
  FeaturedOutline as FeaturedOutlineIcon,
  PersonalizedIcon,
  RecentIcon,
} from "~/components/ui/Icon";
import TabPostSetting from "~/components/ui/main/TabPostSetting";
import ListSearchFilter from "~/components/ui/main/ListSearchFilter";
import { useListContext } from "~/context/useListContext";
import { FeaturedList, PersonalizedList, RecentList } from "~/components/posts";

const TabPostList: React.FC = () => {
  const { isFilter } = useListContext();
  return (
    <Tabs
      aria-label="Remix Tab Contents List"
      itemClassName="tab-item"
      wrapperClassName="tab-content"
      key={"Personalized"}
      afterTab={<TabPostSetting />}
      beforePanel={isFilter ? <ListSearchFilter /> : null}
    >
      <Item
        key="Personalized"
        title={
          <>
            <PersonalizedIcon className="icon mr-2" />
            <span className="whitespace-nowrap">Personalized</span>
          </>
        }
      >
        <PersonalizedList />
      </Item>
      <Item
        key="Featured"
        title={
          <>
            <FeaturedOutlineIcon className="icon mr-2" />
            <span className="whitespace-nowrap">Featured</span>
          </>
        }
      >
        <FeaturedList />
      </Item>
      <Item
        key="Recent"
        title={
          <>
            <RecentIcon className="icon mr-2" />
            <span className="whitespace-nowrap">Recent</span>
          </>
        }
      >
        <RecentList />
      </Item>
    </Tabs>
  );
};

export default TabPostList;
