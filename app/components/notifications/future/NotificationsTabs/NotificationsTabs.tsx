import React, { useCallback } from "react";
import styles from "./styles.module.css";
import { useLocation, useNavigate } from "@remix-run/react";
import * as Tabs from "@radix-ui/react-tabs";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { cn } from "~/utils/util";

interface NotificationsTabsProps {
  children: React.ReactNode;
}

export default function NotificationsTabs({
  children,
}: NotificationsTabsProps) {
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
      defaultValue="/notifications"
      value={location.pathname}
      onValueChange={onNavigation}
    >
      <div className={styles.tabs_container}>
        <ScrollArea.Root className="overflow-hidden">
          <ScrollArea.Viewport className="w-full h-full">
            <Tabs.List className="flex radix-orientation-horizontal:flex-row radix-orientation-vertical:flex-col gap-1">
              <Tabs.Trigger value={"/notifications"} asChild>
                <button type="button" className={"group flex flex-col"}>
                  <div
                    className={cn(
                      styles.tabs_btn,
                      "group-radix-state-active:text-blue-600 group-radix-state-active:bg-blue-50/80 group-radix-state-active:dark:text-slate-100 group-radix-state-active:dark:bg-slate-900"
                    )}
                  >
                    All
                  </div>
                  <span className="inline-block h-0"></span>
                </button>
              </Tabs.Trigger>
              <Tabs.Trigger value={PAGE_ENDPOINTS.FOLLOWING} asChild>
                <button type="button" className={"group flex flex-col"}>
                  <div
                    className={cn(
                      styles.tabs_btn,
                      "group-radix-state-active:text-blue-600 group-radix-state-active:bg-blue-50/80 group-radix-state-active:dark:text-slate-100 group-radix-state-active:dark:bg-slate-900"
                    )}
                  >
                    Comments
                  </div>
                  <span className="inline-block h-0"></span>
                </button>
              </Tabs.Trigger>
              <Tabs.Trigger value={PAGE_ENDPOINTS.FEATURED} asChild>
                <button type="button" className={"group flex flex-col"}>
                  <div
                    className={cn(
                      styles.tabs_btn,
                      "group-radix-state-active:text-blue-600 group-radix-state-active:bg-blue-50/80 group-radix-state-active:dark:text-slate-100 group-radix-state-active:dark:bg-slate-900"
                    )}
                  >
                    Likes
                  </div>
                  <span className="inline-block h-0"></span>
                </button>
              </Tabs.Trigger>
              <Tabs.Trigger value={PAGE_ENDPOINTS.FEATURED} asChild>
                <button type="button" className={"group flex flex-col"}>
                  <div
                    className={cn(
                      styles.tabs_btn,
                      "group-radix-state-active:text-blue-600 group-radix-state-active:bg-blue-50/80 group-radix-state-active:dark:text-slate-100 group-radix-state-active:dark:bg-slate-900"
                    )}
                  >
                    Mentions
                  </div>
                  <span className="inline-block h-0"></span>
                </button>
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value={"/notifications"}>{children}</Tabs.Content>
          </ScrollArea.Viewport>
        </ScrollArea.Root>
      </div>
    </Tabs.Root>
  );
}
