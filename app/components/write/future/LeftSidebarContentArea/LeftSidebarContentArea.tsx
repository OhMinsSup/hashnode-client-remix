import React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import styles from "./styles.module.css";
import { cn } from "~/utils/utils";

interface LeftSidebarContentAreaProps {
  title: string;
  children: React.ReactNode;
}

export default function LeftSidebarContentArea({
  title,
  children,
}: LeftSidebarContentAreaProps) {
  const [open, setOpen] = React.useState(true);
  return (
    <Collapsible.Root
      className="relative w-full px-4 py-2"
      open={open}
      onOpenChange={setOpen}
    >
      <Collapsible.Trigger asChild>
        <button className={cn("group", styles.btn_title_area)}>
          <span>{title}</span>
          <div className="rounded-lg p-1 hover:bg-slate-100">
            {open ? (
              <svg className={styles.icon} fill="none" viewBox="0 0 24 24">
                <path
                  d="m6 15 6-6 6 6"
                  stroke="stroke-current"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            ) : (
              <svg className={styles.icon} fill="none" viewBox="0 0 20 20">
                <path
                  d="m5 7.5 5 5 5-5"
                  stroke="stroke-current"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            )}
          </div>
        </button>
      </Collapsible.Trigger>
      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible.Root>
  );
}
