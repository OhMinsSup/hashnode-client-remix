import React, { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "@remix-run/react";
import TabPostSetting from "~/components/ui/main/TabPostSetting";
import ListSearchFilter from "~/components/ui/main/ListSearchFilter";
import {
  FeaturedOutline as FeaturedOutlineIcon,
  PersonalizedIcon,
  RecentIcon,
} from "~/components/ui/Icon";

interface TabPostListProps {
  children: React.ReactNode;
}

const TabPostList: React.FC<TabPostListProps> = ({ children }) => {
  const location = useLocation();

  const navigate = useNavigate();

  const match = useMemo(() => {
    const isIndex = location.pathname === "/";
    const isFeatured = location.pathname === "/featured";

    return {
      isIndex,
      isFeatured,
    };
  }, [location]);

  const matchId = useMemo(() => {
    if (match.isIndex) return "tab-recent";
    if (match.isFeatured) return "tab-featured";
  }, [match]);

  const onMoveToClick = useCallback(
    (dataKey: string) => {
      switch (dataKey) {
        case "Featured":
          navigate("/featured");
          break;
        case "Recent":
          navigate("/");
          break;
        default: {
          throw new Error("Invalid dataKey");
        }
      }
    },
    [navigate]
  );

  return (
    <>
      <div className="tab-content">
        <div className="tabs">
          <div
            id="tablist-post"
            aria-label="Remix Tab Contents List"
            role="tablist"
            aria-orientation="horizontal"
            className="tab-wrapper"
          >
            <TabItemButton
              tabIndex={match.isIndex ? 0 : -1}
              dataKey="Recent"
              name="Recent"
              id="tab-recent"
              aria-selected={match.isIndex ? "true" : "false"}
              onClick={onMoveToClick}
            />

            <TabItemButton
              tabIndex={match.isFeatured ? 0 : -1}
              name="Featured"
              dataKey="Featured"
              id="tab-featured"
              aria-selected={match.isFeatured ? "true" : "false"}
              onClick={onMoveToClick}
            />
          </div>
        </div>
        <TabPostSetting />
      </div>
      <ListSearchFilter />
      <div id="tabpanel-post" aria-labelledby={matchId} role="tabpanel">
        {children}
      </div>
    </>
  );
};

export default TabPostList;

const icon = {
  Personalized: PersonalizedIcon,
  Featured: FeaturedOutlineIcon,
  Recent: RecentIcon,
} as const;

interface TabItemProps extends Pick<React.AriaAttributes, "aria-selected"> {
  id: string;
  name: string;
  tabIndex: number;
  dataKey: keyof typeof icon;
  onClick: (datakey: string) => void;
}

const TabItemButton: React.FC<TabItemProps> = ({
  dataKey,
  name,
  onClick,
  ...props
}) => {
  const Icon = useMemo(() => icon[dataKey], [dataKey]);

  const onTabClick = useCallback(() => {
    onClick(dataKey);
  }, [onClick, dataKey]);

  return (
    <div
      data-key={dataKey}
      role="tab"
      className="tab-item"
      onClick={onTabClick}
      {...props}
    >
      <Icon className="icon mr-2" />
      <span className="whitespace-nowrap">{name}</span>
    </div>
  );
};
