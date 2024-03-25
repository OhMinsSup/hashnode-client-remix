import React, { useCallback } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import styles from "./styles.module.css";
import { useLocation, useNavigate } from "@remix-run/react";
import { cn } from "~/utils/utils";

interface SearchTabsProps {
  children: React.ReactNode;
}

export default function SearchTabs({ children }: SearchTabsProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const onNavigation = useCallback(
    (pathname: string) => {
      navigate(pathname);
    },
    [navigate]
  );

  return (
    <section className="mb-8">
      <Tabs.Root
        value={location.pathname}
        defaultValue="/search"
        onValueChange={onNavigation}
      >
        <section className={styles.tabs_container}>
          <Tabs.List
            aria-label="hashnode list tabs"
            className="flex radix-orientation-horizontal:flex-row radix-orientation-vertical:flex-col gap-1"
          >
            <Tabs.Trigger value="/search" asChild>
              <button className="group flex flex-col">
                <div
                  className={cn(
                    "group-radix-state-active:text-blue-600 group-radix-state-active:bg-blue-50/80 group-radix-state-active:dark:text-slate-100 group-radix-state-active:dark:bg-slate-900",
                    styles.tabs_item
                  )}
                >
                  Top
                </div>
                <span className="inline-block h-0"></span>
              </button>
            </Tabs.Trigger>
            <Tabs.Trigger value="/search/latest" asChild>
              <button className="group flex flex-col">
                <div
                  className={cn(
                    "group-radix-state-active:text-blue-600 group-radix-state-active:bg-blue-50/80 group-radix-state-active:dark:text-slate-100 group-radix-state-active:dark:bg-slate-900",
                    styles.tabs_item
                  )}
                >
                  Latest
                </div>
                <span className="inline-block h-0"></span>
              </button>
            </Tabs.Trigger>
            <Tabs.Trigger value="/search/tags" asChild>
              <button className="group flex flex-col">
                <div
                  className={cn(
                    "group-radix-state-active:text-blue-600 group-radix-state-active:bg-blue-50/80 group-radix-state-active:dark:text-slate-100 group-radix-state-active:dark:bg-slate-900",
                    styles.tabs_item
                  )}
                >
                  Tags
                </div>
                <span className="inline-block h-0"></span>
              </button>
            </Tabs.Trigger>
            <Tabs.Trigger value="/search/blogs" asChild>
              <button className="group flex flex-col">
                <div
                  className={cn(
                    "group-radix-state-active:text-blue-600 group-radix-state-active:bg-blue-50/80 group-radix-state-active:dark:text-slate-100 group-radix-state-active:dark:bg-slate-900",
                    styles.tabs_item
                  )}
                >
                  Blogs
                </div>
                <span className="inline-block h-0"></span>
              </button>
            </Tabs.Trigger>
          </Tabs.List>
        </section>
        <Tabs.Content value={"/search"}>{children}</Tabs.Content>
        <Tabs.Content value={"/search/latest"}>{children}</Tabs.Content>
        <Tabs.Content value={"/search/tags"}>{children}</Tabs.Content>
        <Tabs.Content value={"/search/blogs"}>{children}</Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
