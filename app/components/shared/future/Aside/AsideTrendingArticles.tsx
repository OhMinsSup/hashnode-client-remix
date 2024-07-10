import React, { useCallback, useState } from 'react';
import { useLoaderData } from '@remix-run/react';

import type { RoutesLoaderData } from '~/.server/routes/widget/widget.loader';
import { Button } from '~/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import Aside from './Aside';
import TrendingArticleCardList from './TrendingArticleCardList';

export default function AsideTrendingArticles() {
  const data = useLoaderData<RoutesLoaderData>();

  const totalCount = data.result?.trending.totalCount ?? 0;
  const items = data.result?.trending?.list ?? [];

  const [visiblePost, setVisiblePost] = useState(false);
  const [duration, setDuration] = useState('7');

  const onValueChange = useCallback((value: string) => {
    setDuration(value);
  }, []);

  const onToggleVisiblePost = useCallback(() => {
    setVisiblePost((prev) => !prev);
  }, []);

  return (
    <Aside.Container
      title="Trending Articles"
      subheading={
        <Select value={duration} onValueChange={onValueChange}>
          <SelectTrigger className="w-auto">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">1 week</SelectItem>
            <SelectItem value="30">1 month</SelectItem>
            <SelectItem value="90">3 months</SelectItem>
            <SelectItem value="180">6 months</SelectItem>
          </SelectContent>
        </Select>
      }
      footer={
        visiblePost ? null : (
          <Button variant="outline" onClick={onToggleVisiblePost}>
            See More
          </Button>
        )
      }
    >
      <div className="mb-1.5 flex flex-col gap-5">
        <React.Suspense fallback={<>Loading...</>}>
          <TrendingArticleCardList
            visiblePost={visiblePost}
            duration={duration}
            total={totalCount}
            items={items as unknown as SerializeSchema.SerializePost<false>[]}
          />
        </React.Suspense>
      </div>
    </Aside.Container>
  );
}
