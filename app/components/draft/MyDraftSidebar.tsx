import React, { useCallback, useState } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Collapsible from "@radix-ui/react-collapsible";

// hooks
import { useLiveQuery } from "dexie-react-hooks";
import { useDraftSidebarContext } from "~/context/useDraftSidebarContext";

// components
import MyDraftItem from "~/components/draft/MyDraftItem";
import { Icons } from "~/components/shared/Icons";
import { db } from "~/libs/db/db";

const MyDraftSidebar: React.FC = () => {
  const [open, setOpen] = useState(true);

  const { keyword } = useDraftSidebarContext();

  const data = useLiveQuery(async () => {
    const [_list, _totalCount] = await Promise.all([
      db.drafts.where("title").above(keyword).toArray(),
      db.drafts.where("title").above(keyword).count(),
    ]);
    return { list: _list, totalCount: _totalCount };
  }, [keyword]);

  const onCollapsibleOpenChange = useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  return (
    <ScrollArea.Root className="draft-sidebar-content">
      <Collapsible.Root
        className="draft-sidebar-content__label"
        open={open}
        onOpenChange={onCollapsibleOpenChange}
      >
        <Collapsible.Trigger asChild>
          <button
            className="btn-trigger"
            aria-label="trigger collapsible button"
            aria-expanded={open}
          >
            <span>
              {keyword
                ? `Showing results for: ${data?.totalCount ?? 0}`
                : `My Drafts (${data?.totalCount ?? 0})`}
            </span>
            <div className=" rounded-lg p-1">
              {open ? (
                <Icons.Arrowup className="icon__sm stroke-current" />
              ) : (
                <Icons.ArrowDown className="icon__sm stroke-current" />
              )}
            </div>
          </button>
        </Collapsible.Trigger>

        <Collapsible.Content>
          <ScrollArea.Viewport className="ScrollAreaViewport">
            {data?.list.map((draft, i) => (
              <MyDraftItem key={`my-draft-${draft.id}-${i}`} item={draft} />
            ))}
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="ScrollAreaScrollbar"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="ScrollAreaThumb" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar
            className="ScrollAreaScrollbar"
            orientation="horizontal"
          >
            <ScrollArea.Thumb className="ScrollAreaThumb" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner className="ScrollAreaCorner" />
        </Collapsible.Content>
      </Collapsible.Root>
    </ScrollArea.Root>
  );
};

export default MyDraftSidebar;
