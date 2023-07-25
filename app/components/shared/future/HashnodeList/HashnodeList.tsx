import React from "react";
import styles from "./styles.module.css";
import * as Tabs from "@radix-ui/react-tabs";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { PAGE_ENDPOINTS } from "~/constants/constant";

interface HashnodeListProps {
  children: React.ReactNode;
}

export default function HashnodeList({ children }: HashnodeListProps) {
  return (
    <Tabs.Root defaultValue={PAGE_ENDPOINTS.ROOT}>
      <div className="mb-5">
        <ScrollArea.Root className="overflow-hidden">
          <ScrollArea.Viewport className="w-full h-full">
            <div className="table min-w-full">
              <Tabs.List
                className="flex gap-1 radix-orientation-horizontal:flex-row radix-orientation-vertical:flex-col"
                aria-label="Manage your account"
              >
                <Tabs.Trigger
                  className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
                  value={PAGE_ENDPOINTS.ROOT}
                  asChild
                >
                  <button type="button">
                    <div className="text-slate-600 dark:text-slate-300 border-transparent flex items-center py-2 px-4 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 group-radix-state-active:text-blue-500 group-radix-state-active:bg-blue-50 hover:group-radix-state-active:bg-blue-50 group-radix-state-active:dark:text-slate-100 group-radix-state-active:dark:bg-slate-900  font-medium text-sm">
                      <div className="feed-best-content css-12ag3gr">
                        <span className="css-1wclmit">
                          <svg
                            fill="none"
                            viewBox="0 0 20 20"
                            width="20"
                            height="20"
                          >
                            <path
                              stroke="currentColor"
                              d="m11.399 5.59 2.5 2.5M5.738 3.333V5m0 0v1.667m0-1.667H4.071m1.667 0h1.667m8.958 5.209v1.666m0 0v1.667m0-1.667h-1.667m1.667 0h1.667M2.577 14.411 13.9 3.089a.833.833 0 0 1 1.178 0L16.4 4.411a.833.833 0 0 1 0 1.178L5.077 16.911a.833.833 0 0 1-1.178 0l-1.322-1.322a.833.833 0 0 1 0-1.178Z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.25"
                            ></path>
                          </svg>
                        </span>
                        <span>Personalized</span>
                      </div>
                    </div>
                  </button>
                </Tabs.Trigger>
                <Tabs.Trigger
                  className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
                  value={PAGE_ENDPOINTS.FEATURED}
                >
                  <button type="button">
                    <div className="text-slate-600 dark:text-slate-300 border-transparent flex items-center py-2 px-4 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 group-radix-state-active:text-blue-500 group-radix-state-active:bg-blue-50 hover:group-radix-state-active:bg-blue-50 group-radix-state-active:dark:text-slate-100 group-radix-state-active:dark:bg-slate-900  font-medium text-sm">
                      <div className="feed-best-content css-12ag3gr">
                        <span className="css-1wclmit">
                          <svg
                            fill="none"
                            viewBox="0 0 20 20"
                            width="20"
                            height="20"
                          >
                            <path
                              stroke="currentColor"
                              d="M5.481 10.156 2.066 13.95l2.973.434.743 2.911 3.415-3.793m1.606 0 3.415 3.793.743-2.912 2.973-.434-3.415-3.793m-2.751 2.71 2.946-2.947a2.5 2.5 0 0 0 0-3.535l-2.946-2.947a2.5 2.5 0 0 0-3.536 0L5.286 6.384a2.5 2.5 0 0 0 0 3.535l2.946 2.946a2.5 2.5 0 0 0 3.536 0Zm.107-4.715a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.25"
                            ></path>
                          </svg>
                        </span>
                        <span>Featured</span>
                      </div>
                    </div>
                  </button>
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content
                className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
                value="tab1"
              >
                {children}
              </Tabs.Content>
              <Tabs.Content
                className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
                value="tab2"
              >
                {children}
              </Tabs.Content>
            </div>
          </ScrollArea.Viewport>
        </ScrollArea.Root>
      </div>
    </Tabs.Root>
  );
}
