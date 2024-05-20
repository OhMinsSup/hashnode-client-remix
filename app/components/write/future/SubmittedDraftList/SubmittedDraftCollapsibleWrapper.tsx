import { useMemo } from 'react';

import { useWriteContext } from '~/components/write/context/useWriteContext';
import { CollapsibleWrapper } from '~/components/write/future/CollapsibleWrapper';

interface SubmittedDraftCollapsibleWrapperProps {
  children: React.ReactNode;
}

export default function SubmittedDraftCollapsibleWrapper({
  children,
}: SubmittedDraftCollapsibleWrapperProps) {
  const { leftSideKeyword: searchKeyword, count } = useWriteContext();

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
      totalCount={count.submitted}
    >
      {children}
    </CollapsibleWrapper>
  );
}
