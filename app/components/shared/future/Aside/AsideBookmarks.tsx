import React from 'react';
import { Link, useLoaderData } from '@remix-run/react';

import type { RoutesLoaderData } from '~/.server/routes/widget/widget.loader';
import { buttonVariants } from '~/components/ui/button';
import { PAGE_ENDPOINTS } from '~/constants/constant';
import { cn } from '~/services/libs';
import Aside from './Aside';
import Bookmarks from './Bookmarks';

export default function AsideBookmarks() {
  const data = useLoaderData<RoutesLoaderData>();

  const total = data.result?.bookmark.totalCount ?? 0;
  const items = data.result?.bookmark.list ?? [];

  if (total === 0) {
    return null;
  }

  return (
    <Aside.Container
      title="Bookmarks"
      footer={
        <Link
          unstable_viewTransition
          to={PAGE_ENDPOINTS.BOOKMARKS.ROOT}
          className={cn(
            buttonVariants({
              variant: 'outline',
            }),
          )}
        >
          See More
        </Link>
      }
    >
      <div className="mb-1.5 flex flex-col gap-5">
        <React.Suspense fallback={<>Loading...</>}>
          <Bookmarks
            items={items as unknown as SerializeSchema.SerializePost<false>[]}
            total={total}
          />
        </React.Suspense>
      </div>
    </Aside.Container>
  );
}
