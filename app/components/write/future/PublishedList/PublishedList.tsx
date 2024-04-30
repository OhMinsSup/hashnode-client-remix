import { useState } from "react";
import { CollapsibleWrapper } from "~/components/write/future/CollapsibleWrapper";
import { SidebarDraftItem } from "~/components/write/future/SidebarDraftItem";
import { useWriteContext } from "~/components/write/context/useWriteContext";

interface MyDraftListProps {}

export default function PublishedList(_: MyDraftListProps) {
  const { leftSideKeyword: searchKeyword } = useWriteContext();
  const [totalCount] = useState(0);
  const [items] = useState<SerializeSchema.SerializePost<false>[][]>([]);

  const pages = items.flat();

  return (
    <CollapsibleWrapper
      title="PUBLISHED"
      searchTitle={
        searchKeyword
          ? `Showing results for Published: ${searchKeyword}`
          : undefined
      }
      isSearch={Boolean(searchKeyword)}
      totalCount={totalCount}
    >
      {pages.map((item) => (
        <SidebarDraftItem key={`my-draft-${item.id}`} item={item} />
      ))}
      {items.length === 0 ? (
        <p className="px-4 text-sm text-muted-foreground">
          You have not published anything.
        </p>
      ) : null}
    </CollapsibleWrapper>
  );
}
