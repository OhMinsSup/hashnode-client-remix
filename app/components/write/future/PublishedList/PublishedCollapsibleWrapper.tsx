import { useMemo } from 'react';

import { useWriteContext } from '~/components/write/context/useWriteContext';
import { CollapsibleWrapper } from '~/components/write/future/CollapsibleWrapper';

interface PublishedCollapsibleWrapperProps {
  children: React.ReactNode;
}

export default function PublishedCollapsibleWrapper({
  children,
}: PublishedCollapsibleWrapperProps) {
  const { leftSideKeyword: searchKeyword, count } = useWriteContext();

  const isSearch = Boolean(searchKeyword);

  const searchTitle = useMemo(() => {
    return isSearch
      ? `Showing results for Published: ${searchKeyword}`
      : undefined;
  }, [isSearch, searchKeyword]);

  return (
    <CollapsibleWrapper
      title="PUBLISHED"
      searchTitle={searchTitle}
      isSearch={isSearch}
      totalCount={count.published}
    >
      {children}
    </CollapsibleWrapper>
  );
}
