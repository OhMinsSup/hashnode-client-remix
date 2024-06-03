import {
  isRouteErrorResponse,
  Outlet,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';

import type { RoutesLoaderData } from '~/.server/routes/widget/widget.loader';
import { Aside } from '~/components/shared/future/Aside';
import { MainContent } from '~/components/shared/future/MainContent';
import { MainFooter } from '~/components/shared/future/MainFooter';
import { MainHeader } from '~/components/shared/future/MainHeader';
import { MainLayout } from '~/components/shared/future/MainLayout';

export { loader } from '~/.server/routes/widget/widget.loader';

export default function Routes() {
  const data = useLoaderData<RoutesLoaderData>();

  const draftTotal = data.result?.draft.totalCount ?? 0;

  const drafts = (data.result?.draft.list ??
    []) as SerializeSchema.SerializePost<false>[];

  const trendingArticlesTotal = data.result?.trending.totalCount ?? 0;

  const trendingArticles = (data.result?.trending?.list ??
    []) as SerializeSchema.SerializePost<false>[];

  const bookmarkTotal = data.result?.bookmark.totalCount ?? 0;
  const bookmarks = (data.result?.bookmark.list ??
    []) as SerializeSchema.SerializePost<false>[];

  return (
    <MainLayout header={<MainHeader />} footer={<MainFooter />} hasScrollSensor>
      <MainContent
        aside={
          <Aside
            draftTotal={draftTotal}
            drafts={drafts}
            trendingArticlesTotal={trendingArticlesTotal}
            trendingArticles={trendingArticles}
            bookmarkTotal={bookmarkTotal}
            bookmarks={bookmarks}
          />
        }
        hasScrollSensor
      >
        <Outlet />
      </MainContent>
    </MainLayout>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <Routes />;
  } else if (error instanceof Error) {
    return <Routes />;
  } else {
    return <Routes />;
  }
}
