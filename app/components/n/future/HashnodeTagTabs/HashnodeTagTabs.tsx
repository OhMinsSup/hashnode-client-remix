import React, { useCallback } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useLocation, useNavigate } from "@remix-run/react";
import { PAGE_ENDPOINTS } from "~/constants/constant";

import styles from "./styles.module.css";
import { Icons } from "~/components/shared/Icons";
import { cn } from "~/utils/util";

interface HashnodeTagTabsProps {
  children: React.ReactNode;
  slug: string;
}

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
      <div className={styles.tab_list}>
        <Tabs.List
          aria-label="hashnode list tabs"
          className="flex radix-orientation-horizontal:flex-row radix-orientation-vertical:flex-col gap-1"
        >
          <Tabs.Trigger value={PAGE_ENDPOINTS.N.TAG(slug)} asChild>
            <button type="button" className="group flex flex-col">
              <div
                className={cn(
                  "group-radix-state-active:text-blue-600 group-radix-state-active:bg-blue-50/80 group-radix-state-active:dark:text-slate-100 group-radix-state-active:dark:bg-slate-900",
                  styles.tab_btn
                )}
              >
                <div className={styles.tab_btn_inner}>
                  <span>
                    <Icons.V2.TagNew />
                  </span>
                  <span>New</span>
                </div>
              </div>
              <span className="inline-block h-0"></span>
            </button>
          </Tabs.Trigger>
          <Tabs.Trigger value={PAGE_ENDPOINTS.N.TAG_HOT(slug)} asChild>
            <button type="button" className="group flex flex-col">
              <div
                className={cn(
                  "group-radix-state-active:text-blue-600 group-radix-state-active:bg-blue-50/80 group-radix-state-active:dark:text-slate-100 group-radix-state-active:dark:bg-slate-900",
                  styles.tab_btn
                )}
              >
                <div className={styles.tab_btn_inner}>
                  <span>
                    <Icons.V2.TagHot />
                  </span>
                  <span>Hot</span>
                </div>
              </div>
              <span className="inline-block h-0"></span>
            </button>
          </Tabs.Trigger>
        </Tabs.List>
      </div>
      <Tabs.Content value={PAGE_ENDPOINTS.N.TAG(slug)}>{children}</Tabs.Content>
      <Tabs.Content value={PAGE_ENDPOINTS.N.TAG_HOT(slug)}>
        {children}
      </Tabs.Content>
    </Tabs.Root>
  );
}
