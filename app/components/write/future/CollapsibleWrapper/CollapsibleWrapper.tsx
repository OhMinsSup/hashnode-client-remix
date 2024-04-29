import React, { useState } from "react";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { cn } from "~/services/libs";

interface CollapsibleWrapperProps {
  title: string;
  searchTitle?: string;
  isSearch?: boolean;
  emptyComponent: React.ReactNode;
  totalCount: number;
  children: React.ReactNode;
}

export default function CollapsibleWrapper({
  emptyComponent,
  totalCount,
  isSearch,
  searchTitle,
  children,
  title,
}: CollapsibleWrapperProps) {
  const [open, setOpen] = useState(true);
  return (
    <Collapsible
      className="relative w-full px-4 pb-5"
      open={open}
      onOpenChange={setOpen}
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="link"
          className="w-full justify-between hover:no-underline max-w-60"
        >
          <span
            className={cn({
              truncate: isSearch,
            })}
          >
            {isSearch ? searchTitle : `${title} (${totalCount})`}
          </span>
          <div>
            {open ? (
              <Icons.chevronUp className="size-3" />
            ) : (
              <Icons.chevronDown className="size-3" />
            )}
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        {emptyComponent}
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
