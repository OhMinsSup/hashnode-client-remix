import React, { useCallback } from "react";
import styles from "./styles.module.css";
import { Button } from "~/components/ui/button";
import { Icons } from "~/components/icons";
import { useWriteContext } from "~/components/write/context/useWriteContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Separator } from "~/components/ui/separator";

export default function WritePageHeader() {
  const { setSideOpen, isSideOpen } = useWriteContext();

  const onToggleSidebar = useCallback(() => {
    setSideOpen();
  }, [setSideOpen]);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.container_left}>
          {isSideOpen ? null : (
            <Button
              type="button"
              size="sm"
              aria-label="Open left sidebar"
              variant="ghost"
              onClick={onToggleSidebar}
            >
              <Icons.openLeftSidebar />
            </Button>
          )}
        </div>
        <div className={styles.container_right}>
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost">
                  <Icons.chevronDown />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Dimensions</h4>
                    <p className="text-sm text-muted-foreground">
                      Set the dimensions for the layer.
                    </p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Separator
            aria-orientation="vertical"
            orientation="vertical"
            className="mx-4 min-h-full h-px"
            role="separator"
          />
          <div className="flex flex-row space-x-2 md:space-x-3">
            <Button variant="outline">
              <span className="hidden md:flex">Preview</span>
              <Icons.fileSearch className="flex md:hidden" />
            </Button>
            <Button variant="default">Publish</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
