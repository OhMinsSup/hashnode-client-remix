import take from 'lodash-es/take';

import { usePostTrendingQuery } from '~/services/react-query/queries/posts/usePostTrendingQuery';
import TrendingArticleCard from './TrendingArticleCard';

interface TrendingArticleCardListProps {
  visiblePost: boolean;
  duration: string;
  trendingArticlesTotal: number;
  trendingArticles?: SerializeSchema.SerializePost<false>[];
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

export default function TrendingArticleCardList({
  visiblePost,
  duration,
  trendingArticles,
  trendingArticlesTotal,
}: TrendingArticleCardListProps) {
  const { data } = usePostTrendingQuery({
    searchParams: {
      duration,
      pageNo: '1',
      limit: '6',
    },
    ...(trendingArticles && duration === '7'
      ? {
          initialData: getInitialData(trendingArticles, trendingArticlesTotal),
        }
      : undefined),
  });

  const items = data.result?.list ?? [];

  return (
    <>
      {take(items, visiblePost ? 6 : 3).map((item) => (
        <TrendingArticleCard key={`trending-article-${item.id}`} />
      ))}
    </>
  );
}
