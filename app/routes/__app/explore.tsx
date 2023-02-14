import React, { useState, useCallback } from "react";
import classnames from "classnames";

// components
import { Tab } from "@headlessui/react";
import { ExploreTrendingTags } from "~/components/main";

// styles
import exploreStylesheetUrl from "../../styles/explore.css";

// types
import type { LinksFunction } from "@remix-run/cloudflare";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: exploreStylesheetUrl }];
};

export default function Explore() {
  const [tabIndex, setTabIndex] = useState(0);

  const onChangeTabIndex = useCallback((index: any) => {
    setTabIndex(index);
  }, []);

  return (
    <div className="relative col-span-7 min-w-0 pt-5 pb-5">
      <div className="explore-info-box">
        <h1>Explore Tech Blogs &amp; Tags</h1>
        <p>
          Everything that's… Hashnode. Explore the most popular tech blogs from
          the Hashnode community. A constantly updating list of popular tags and
          the best minds in tech.
        </p>
      </div>
      <Tab.Group
        as="div"
        selectedIndex={tabIndex}
        className="explore"
        onChange={onChangeTabIndex}
      >
        <Tab.List className="explore-tab-area">
          <Tab
            className={({ selected }) =>
              classnames({
                "explore-link-active": selected,
                "explore-link": !selected,
              })
            }
          >
            Trending
          </Tab>
          <Tab
            className={({ selected }) =>
              classnames({
                "explore-link-active": selected,
                "explore-link": !selected,
              })
            }
          >
            Tags
          </Tab>
          <Tab
            className={({ selected }) =>
              classnames({
                "explore-link-active": selected,
                "explore-link": !selected,
              })
            }
          >
            Posts
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="explore-tab-content">
            <ExploreTrendingTags />
          </Tab.Panel>
          <Tab.Panel className="explore-tab-content">content(2)</Tab.Panel>
          <Tab.Panel className="explore-tab-content">content(3)</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
