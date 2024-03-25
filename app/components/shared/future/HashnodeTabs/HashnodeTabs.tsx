import React, { useCallback } from "react";
import styles from "./styles.module.css";
import * as Tabs from "@radix-ui/react-tabs";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { cn } from "~/utils/utils";
import { Icons } from "~/components/shared/Icons";
import { useLocation, useNavigate } from "@remix-run/react";

interface HashnodeTabsProps {
  children: React.ReactNode;
}

const TABS = [
  {
    id: PAGE_ENDPOINTS.ROOT,
    icon: <Icons.V2.Personalized />,
    text: "Personalized",
  },
  {
    id: PAGE_ENDPOINTS.FOLLOWING,
    icon: <Icons.V2.UserGroup />,
    text: "Following",
  },
  {
    id: PAGE_ENDPOINTS.FEATURED,
    icon: <Icons.V2.Featured />,
    text: "Featured",
  },
];

export default function HashnodeTabs({ children }: HashnodeTabsProps) {
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
      defaultValue={PAGE_ENDPOINTS.ROOT}
      value={location.pathname}
      onValueChange={onNavigation}
    >
      <div className="mb-5">
        <ScrollArea.Root className="overflow-hidden">
          <ScrollArea.Viewport className="w-full h-full">
            <div className="table min-w-full">
              <Tabs.List
                className={cn(
                  styles.tab_list,
                  "radix-orientation-horizontal:flex-row radix-orientation-vertical:flex-col"
                )}
                aria-label="hashnode list tabs"
              >
                {TABS.map((tab) => {
                  return (
                    <Tabs.Trigger
                      value={tab.id}
                      asChild
                      key={`tab-item-${tab.id}`}
                    >
                      <button
                        type="button"
                        className={cn("group", styles.tab_btn)}
                      >
                        <div
                          className={cn(
                            styles.tab_btn_container,
                            location.pathname === tab.id
                              ? styles.tab_btn_active
                              : undefined
                          )}
                        >
                          <div className={styles.feed_best_content}>
                            <span className="hidden md:inline">{tab.icon}</span>
                            <span>{tab.text}</span>
                          </div>
                        </div>
                      </button>
                    </Tabs.Trigger>
                  );
                })}
              </Tabs.List>
            </div>
          </ScrollArea.Viewport>
        </ScrollArea.Root>
      </div>
      {TABS.map((tab) => {
        return (
          <Tabs.Content key={`tab-content-${tab.id}`} value={tab.id}>
            {children}
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
}
