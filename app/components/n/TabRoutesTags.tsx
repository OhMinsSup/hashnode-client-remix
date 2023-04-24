import React, { useMemo } from "react";
import classNames from "classnames";
import { NavLink, useParams } from "@remix-run/react";
import { Icons } from "~/components/shared/Icons";
import { PAGE_ENDPOINTS } from "~/constants/constant";

function TabRoutesTags() {
  const { tag } = useParams();

  const recentTo = useMemo(() => {
    if (!tag) return PAGE_ENDPOINTS.ROOT;
    return PAGE_ENDPOINTS.N.TAG(tag);
  }, [tag]);

  const hotTo = useMemo(() => {
    if (!tag) return PAGE_ENDPOINTS.ROOT;
    return PAGE_ENDPOINTS.N.TAG_HOT(tag);
  }, [tag])

  return (
    <div className="tab-routes__tabs">
      <div className="tabs-container">
      <NavLink
          to={recentTo}
          end
          className={({ isActive }) => {
            return classNames("tabs-container__tabs-item", {
              active: isActive,
            });
          }}
        >
          <Icons.Recent className="icon__sm mr-2 fill-current" />
          <span>Recent</span>
        </NavLink>
        <NavLink
          to={hotTo}
          end
          className={({ isActive }) => {
            return classNames("tabs-container__tabs-item", {
              active: isActive,
            });
          }}
        >
          <Icons.Hot className=" icon__sm mr-2 fill-current" />
          <span>Hot</span>
        </NavLink>
      </div>
    </div>
  );
}

export default TabRoutesTags;
