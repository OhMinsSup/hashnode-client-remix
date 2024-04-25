import React from "react";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";

interface SidebarDraftItemProps {}

export default function SidebarDraftItem({}: SidebarDraftItemProps) {
  return (
    <div className="group grid relative grid-cols-12 sm:block">
      <Button
        type="button"
        variant="ghost"
        className="grid grid-cols-10 justify-start space-x-2 col-span-8 md:col-auto"
      >
        <div className="col-span-1">
          <div className="block">
            <Icons.filetext className="size-5" />
          </div>
        </div>
        <div className="col-span-9 truncate text-left">@radix-ui/colors</div>
      </Button>
      <div className="h-full overflow-hidden col-span-4 sm:invisible sm:absolute sm:top-0 sm:bottom-0 sm:right-0 sm:col-auto">
        <div className="relative z-20 flex h-full w-full flex-row justify-end">
          <Button variant="outline" size="sm">
            <Icons.moreHorizontal />
          </Button>
        </div>
      </div>
    </div>
  );
}
