import { useState } from "react";
import { CollapsibleWrapper } from "~/components/write/future/CollapsibleWrapper";
import { SidebarDraftItem } from "~/components/write/future/SidebarDraftItem";

interface MyDraftListProps {
  searchKeyword: string;
}

export default function PublishedList({ searchKeyword }: MyDraftListProps) {
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
      emptyComponent={
        items.length === 0 ? (
          <p className="px-4 text-sm text-muted-foreground">
            You have not published anything.
          </p>
        ) : null
      }
    >
      {pages.map((item) => (
        <SidebarDraftItem key={`my-draft-${item.id}`} item={item} />
      ))}
    </CollapsibleWrapper>
  );
}
