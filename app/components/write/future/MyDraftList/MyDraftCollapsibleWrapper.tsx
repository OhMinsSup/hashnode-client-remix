import { useMemo } from 'react';

import { useWriteContext } from '~/components/write/context/useWriteContext';
import { CollapsibleWrapper } from '~/components/write/future/CollapsibleWrapper';

interface MyDraftCollapsibleWrapperProps {
  children: React.ReactNode;
}

export default function MyDraftCollapsibleWrapper({
  children,
}: MyDraftCollapsibleWrapperProps) {
  const { leftSideKeyword: searchKeyword, count } = useWriteContext();

  const isSearch = Boolean(searchKeyword);

  const searchTitle = useMemo(() => {
    return isSearch ? `Showing results for Draft: ${searchKeyword}` : undefined;
  }, [isSearch, searchKeyword]);

  return (
    <CollapsibleWrapper
      title="My Drafts"
      searchTitle={searchTitle}
      isSearch={isSearch}
      totalCount={count.draft}
    >
      {children}
    </CollapsibleWrapper>
  );
}
