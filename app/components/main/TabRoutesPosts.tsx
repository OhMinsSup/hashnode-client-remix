import React, { useCallback, useMemo } from "react";

// remix
import { useLocation, useNavigate } from "@remix-run/react";

// components
import { Icons } from "~/components/shared/Icons";
import { PAGE_ENDPOINTS } from "~/constants/constant";

interface TabPostListProps {
  children: React.ReactNode;
}

const TabRoutesPosts: React.FC<TabPostListProps> = ({ children }) => {
  const location = useLocation();

  const navigate = useNavigate();

  const match = useMemo(() => {
    const isIndex = location.pathname === PAGE_ENDPOINTS.ROOT;
    const isFeatured = location.pathname === PAGE_ENDPOINTS.FEATURED;

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
      console.log(dataKey);
      switch (dataKey) {
        case "Featured":
          navigate(PAGE_ENDPOINTS.FEATURED);
          break;
        case "Recent":
          navigate(PAGE_ENDPOINTS.ROOT);
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
      <div className="tab-routes__tab-container">
        <div className="tab-routes__tab-routes-btn-groups">
          <div
            id="tablist-post"
            aria-label="Remix Tab Contents List"
            role="tablist"
            aria-orientation="horizontal"
            className="tab-routes__tab-routes-tab-list"
          >
            <TabRoutesPostsButton
              tabIndex={match.isIndex ? 0 : -1}
              dataKey="Recent"
              name="Recent"
              id="tab-recent"
              aria-selected={match.isIndex ? "true" : "false"}
              onClick={onMoveToClick}
            />
            <TabRoutesPostsButton
              tabIndex={match.isFeatured ? 0 : -1}
              name="Featured"
              dataKey="Featured"
              id="tab-featured"
              aria-selected={match.isFeatured ? "true" : "false"}
              onClick={onMoveToClick}
            />
          </div>
        </div>
        {/* <TabPostSetting /> */}
      </div>
      {/* <ListSearchFilter /> */}
      <div id="tabpanel-post" aria-labelledby={matchId} role="tabpanel">
        {children}
      </div>
    </>
  );
};

export default TabRoutesPosts;

const icon = {
  Featured: Icons.Featured,
  Recent: Icons.Recent,
} as const;

interface TabRoutesPostsButtonProps
  extends Pick<React.AriaAttributes, "aria-selected"> {
  id: string;
  name: string;
  tabIndex: number;
  dataKey: keyof typeof icon;
  onClick: (datakey: string) => void;
}

const TabRoutesPostsButton: React.FC<TabRoutesPostsButtonProps> = ({
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
      {...props}
      data-key={dataKey}
      role="tab"
      className="tab-routes-button"
      onClick={onTabClick}
    >
      <Icon className="icon__base mr-2 fill-current" />
      <span className="whitespace-nowrap">{name}</span>
    </div>
  );
};
