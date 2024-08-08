import { usePostBookmarkQuery } from '~/services/react-query/queries/posts/usePostBookmarkQuery';
import BookmarkCard from './BookmarkCard';

interface BookmarksProps {
  total: number;
  items?: SerializeSchema.SerializePost<false>[];
}

function getInitialData(
  list: SerializeSchema.SerializePost<false>[],
  totalCount: number,
) {
  const hasNextPage = list.length < totalCount;
  return {
    resultCode: 0,
    message: null,
    error: null,
    result: {
      totalCount,
      list,
      pageInfo: {
        currentPage: 1,
        hasNextPage,
        nextPage: hasNextPage ? 2 : null,
      },
    },
  };
}

export default function Bookmarks({ items, total }: BookmarksProps) {
  const { data } = usePostBookmarkQuery({
    searchParams: {
      pageNo: '1',
      limit: '6',
    },
    ...(items
      ? {
          initialData: getInitialData(items, total),
        }
      : undefined),
  });

  const list = data.result?.list ?? [];

  return (
    <>
      {list.map((item) => (
        <BookmarkCard key={`bookmark-card-${item.id}`} />
      ))}
    </>
  );
}
