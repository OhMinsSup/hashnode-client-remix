import React, { useCallback } from "react";
import styles from "./styles.module.css";
import * as Tabs from "@radix-ui/react-tabs";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { cn } from "~/utils/util";
import { Icons } from "~/components/shared/Icons";
import { useLocation, useNavigate } from "@remix-run/react";

interface HashnodeTabsProps {
  children: React.ReactNode;
}

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
                <Tabs.Trigger value={PAGE_ENDPOINTS.ROOT} asChild>
                  <button type="button" className={cn("group", styles.tab_btn)}>
                    <div
                      className={cn(
                        styles.tab_btn_container,
                        styles.tab_btn_active,
                        "group-radix-state-active:text-blue-500 group-radix-state-active:bg-blue-50 hover:group-radix-state-active:bg-blue-50 group-radix-state-active:dark:text-slate-100 group-radix-state-active:dark:bg-slate-900"
                      )}
                    >
                      <div className={styles.feed_best_content}>
                        <span className="hidden md:inline">
                          <Icons.V2.Personalized />
                        </span>
                        <span>Personalized</span>
                      </div>
                    </div>
                  </button>
                </Tabs.Trigger>
                <Tabs.Trigger value={PAGE_ENDPOINTS.FOLLOWING} asChild>
                  <button type="button" className={cn("group", styles.tab_btn)}>
                    <div
                      className={cn(
                        styles.tab_btn_container,
                        styles.tab_btn_active,
                        "group-radix-state-active:text-blue-500 group-radix-state-active:bg-blue-50 hover:group-radix-state-active:bg-blue-50 group-radix-state-active:dark:text-slate-100 group-radix-state-active:dark:bg-slate-900"
                      )}
                    >
                      <div className={styles.feed_best_content}>
                        <span className="hidden md:inline">
                          <Icons.V2.UserGroup />
                        </span>
                        <span>Following</span>
                      </div>
                    </div>
                  </button>
                </Tabs.Trigger>
                <Tabs.Trigger value={PAGE_ENDPOINTS.FEATURED} asChild>
                  <button type="button" className={cn("group", styles.tab_btn)}>
                    <div
                      className={cn(
                        styles.tab_btn_container,
                        styles.tab_btn_active,
                        "group-radix-state-active:text-blue-500 group-radix-state-active:bg-blue-50 hover:group-radix-state-active:bg-blue-50 group-radix-state-active:dark:text-slate-100 group-radix-state-active:dark:bg-slate-900"
                      )}
                    >
                      <div className={styles.feed_best_content}>
                        <span className="hidden md:inline">
                          <Icons.V2.Featured />
                        </span>
                        <span>Featured</span>
                      </div>
                    </div>
                  </button>
                </Tabs.Trigger>
              </Tabs.List>
            </div>
          </ScrollArea.Viewport>
        </ScrollArea.Root>
      </div>
      <Tabs.Content value={PAGE_ENDPOINTS.ROOT}>{children}</Tabs.Content>
      <Tabs.Content value={PAGE_ENDPOINTS.FOLLOWING}>{children}</Tabs.Content>
      <Tabs.Content value={PAGE_ENDPOINTS.FEATURED}>{children}</Tabs.Content>
    </Tabs.Root>
  );
}
