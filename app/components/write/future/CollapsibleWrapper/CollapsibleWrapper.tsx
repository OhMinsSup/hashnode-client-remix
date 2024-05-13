import React, { useState } from 'react';

import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible';
import { cn } from '~/services/libs';

interface CollapsibleWrapperProps {
  title: string;
  searchTitle?: string;
  isSearch?: boolean;
  totalCount: number;
  children: React.ReactNode;
}

export default function CollapsibleWrapper({
  totalCount,
  isSearch,
  searchTitle,
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
          className="w-full max-w-60 justify-between hover:no-underline"
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
      <CollapsibleContent className="space-y-2">{children}</CollapsibleContent>
    </Collapsible>
  );
}
