import React from 'react';
import { Link } from '@remix-run/react';

import { buttonVariants } from '~/components/ui/button';
import { PAGE_ENDPOINTS } from '~/constants/constant';
import { cn } from '~/services/libs';
import Aside from './Aside';
import Bookmarks from './Bookmarks';

interface AsideBookmarksProps {
  total: number;
  items?: SerializeSchema.SerializePost<false>[];
}

export default function AsideBookmarks({ total, items }: AsideBookmarksProps) {
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
          <Bookmarks items={items} total={total} />
        </React.Suspense>
      </div>
    </Aside.Container>
  );
}
