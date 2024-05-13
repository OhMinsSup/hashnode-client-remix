import { useMemo } from 'react';

import { useWriteContext } from '~/components/write/context/useWriteContext';
import { CollapsibleWrapper } from '~/components/write/future/CollapsibleWrapper';

interface SubmittedDraftCollapsibleWrapperProps {
  children: React.ReactNode;
  totalCount: number;
}

export default function SubmittedDraftCollapsibleWrapper({
  children,
  totalCount,
}: SubmittedDraftCollapsibleWrapperProps) {
  const { leftSideKeyword: searchKeyword } = useWriteContext();

  const isSearch = Boolean(searchKeyword);

  const searchTitle = useMemo(() => {
    return isSearch
      ? `Showing results for Submitted: ${searchKeyword}`
      : undefined;
  }, [isSearch, searchKeyword]);

  return (
    <CollapsibleWrapper
      title="Submitted Drafts"
      searchTitle={searchTitle}
      isSearch={isSearch}
      totalCount={totalCount}
    >
      {children}
    </CollapsibleWrapper>
  );
}
