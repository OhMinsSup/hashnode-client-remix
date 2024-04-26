import React, { useState } from "react";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";

interface CollapsibleWrapperProps {
  title: string;
  emptyComponent: React.ReactNode;
  totalCount: number;
  children: React.ReactNode;
}

export default function CollapsibleWrapper({
  emptyComponent,
  totalCount,
  children,
  title,
}: CollapsibleWrapperProps) {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible
      className="relative w-full px-4 pb-5"
      open={open}
      onOpenChange={setOpen}
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="link"
          className="w-full justify-between hover:no-underline"
        >
          <span>
            {title} ({totalCount})
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
