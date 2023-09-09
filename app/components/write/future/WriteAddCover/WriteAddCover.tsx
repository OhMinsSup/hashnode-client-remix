import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as Tabs from "@radix-ui/react-tabs";
import styles from "./styles.module.css";
import { cn } from "~/utils/util";
// import { Icons } from "~/components/shared/Icons";

// hooks
// import { useFormContext } from "react-hook-form";
// import { UploadStatus, useDraftContext } from "~/context/useDraftContext";

// types
// import type { FormFieldValues } from "~/routes/_draft";

export default function WriteAddCover() {
  const [open, setOpen] = useState(false);

  // const { watch } = useFormContext<FormFieldValues>();

  // const { upload } = useDraftContext();

  // const watchThumbnail = watch("thumbnail");

  // const onChangeOpenState = useCallback((value: boolean) => {
  //   setOpen(value);
  // }, []);

  // if (watchThumbnail) {
  //   return null;
  // }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button type="button" className={styles.btn_add_cover}>
          <svg fill="none" viewBox="0 0 24 24">
            <path
              d="M17.8828 11.0741L13.8013 16.0424L10.1085 12.0823L5.699 16.504M14.1999 8.08994C14.1999 8.31085 14.0208 8.48994 13.7999 8.48994C13.579 8.48994 13.3999 8.31085 13.3999 8.08994M14.1999 8.08994C14.1999 7.86902 14.0208 7.68994 13.7999 7.68994C13.579 7.68994 13.3999 7.86902 13.3999 8.08994M14.1999 8.08994H13.3999M6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21Z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span>Add Cover</span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={styles.popover__content} align="start">
          <Tabs.Root className={styles.popover__container} defaultValue="tab1">
            <Tabs.List
              className={cn(styles.tab_list, "outline-none")}
              aria-label="Manage your account"
            >
              <Tabs.Trigger className={styles.tab_active} value="tab1">
                <span>Upload</span>
              </Tabs.Trigger>
              <Tabs.Trigger className={styles.tab} value="tab2">
                <span>Library</span>
              </Tabs.Trigger>
              <Popover.Close
                className={styles.popover__close}
                aria-label="Close"
              >
                <svg viewBox="0 0 320 512">
                  <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path>
                </svg>
              </Popover.Close>
            </Tabs.List>
            <Tabs.Content className="p-4" value="tab1">
              sdsds
            </Tabs.Content>
            <Tabs.Content className="overflow-auto p-4" value="tab2">
              asdsd
            </Tabs.Content>
          </Tabs.Root>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
