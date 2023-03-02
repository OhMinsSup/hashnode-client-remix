import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";

const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const MyDraftSidebar = () => {
  return (
    <ScrollArea.Root className="draft-sidebar-content">
      <ScrollArea.Viewport className="ScrollAreaViewport">
        <div className="draft-sidebar-content__label" data-state="closed"></div>
        <div style={{ padding: "15px 20px" }}>
          <div className="Text">Tags</div>
          {TAGS.map((tag) => (
            <div className="Tag" key={tag}>
              {tag}
            </div>
          ))}
        </div>
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
    </ScrollArea.Root>
  );
};

export default MyDraftSidebar;
