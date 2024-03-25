import React, { useCallback } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useLocation, useNavigate } from "@remix-run/react";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import styles from "./styles.module.css";
import { Icons } from "~/components/shared/Icons";
import { cn } from "~/utils/utils";

interface HashnodeTagTabsProps {
  children: React.ReactNode;
  slug: string;
}

const TABS = [
  {
    id: (tag: string) => PAGE_ENDPOINTS.N.TAG(tag),
    icon: <Icons.V2.TagHot />,
    text: "Hot",
  },
  {
    id: (tag: string) => PAGE_ENDPOINTS.N.TAG_RECENT(tag),
    icon: <Icons.V2.TagNew />,
    text: "New",
  },
];

export default function HashnodeTagTabs({
  children,
  slug,
}: HashnodeTagTabsProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const onNavigation = useCallback(
    (pathname: string) => {
      navigate(pathname);
    },
    [navigate]
  );

  return (
    <Tabs.Root
      defaultValue={PAGE_ENDPOINTS.N.TAG(slug)}
      value={location.pathname}
      onValueChange={onNavigation}
    >
      <div className={styles.root}>
        <Tabs.List
          aria-label="hashnode list tabs"
          className={cn(
            styles.tab_list,
            "radix-orientation-horizontal:flex-row radix-orientation-vertical:flex-col"
          )}
        >
          {TABS.map((tab) => {
            return (
              <Tabs.Trigger
                value={tab.id(slug)}
                key={`tab-item-${tab.id(slug)}`}
                asChild
              >
                <button type="button" className={cn("group", styles.tab_btn)}>
                  <div
                    className={cn(
                      styles.tab_btn_container,
                      location.pathname === tab.id(slug)
                        ? styles.tab_btn_active
                        : undefined
                    )}
                  >
                    <div className={styles.tab_content}>
                      <span className="hidden md:inline">{tab.icon}</span>
                      <span>{tab.text}</span>
                    </div>
                  </div>
                  <span className="inline-block h-0"></span>
                </button>
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
      </div>
      {TABS.map((tab) => {
        return (
          <Tabs.Content key={`tab-content-${tab.id}`} value={tab.id(slug)}>
            {children}
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
}
