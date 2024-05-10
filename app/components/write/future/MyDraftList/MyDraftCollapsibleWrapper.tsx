import { useMemo } from 'react';

import { useWriteContext } from '~/components/write/context/useWriteContext';
import { CollapsibleWrapper } from '~/components/write/future/CollapsibleWrapper';

interface MyDraftCollapsibleWrapperProps {
  children: React.ReactNode;
  totalCount: number;
}

export default function MyDraftCollapsibleWrapper({
  children,
  totalCount,
}: MyDraftCollapsibleWrapperProps) {
  const { leftSideKeyword: searchKeyword } = useWriteContext();

  const isSearch = Boolean(searchKeyword);

  const searchTitle = useMemo(() => {
    return isSearch ? `Showing results for Draft: ${searchKeyword}` : undefined;
  }, [isSearch, searchKeyword]);

  return (
    <CollapsibleWrapper
      title="My Drafts"
      searchTitle={searchTitle}
      isSearch={isSearch}
      totalCount={totalCount}
    >
      {children}
    </CollapsibleWrapper>
  );
}
