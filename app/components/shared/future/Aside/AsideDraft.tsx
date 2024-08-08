import { Link, useLoaderData } from '@remix-run/react';

import type { RoutesLoaderData } from '~/.server/routes/widget/widget.loader';
import { buttonVariants } from '~/components/ui/button';
import { PAGE_ENDPOINTS } from '~/constants/constant';
import { cn } from '~/services/libs';
import Aside from './Aside';
import { DraftCard } from './DraftCard';

export default function AsideDraft() {
  const data = useLoaderData<RoutesLoaderData>();

  const totalCount = data.result?.draft.totalCount ?? 0;
  const items = data.result?.draft.list ?? [];

  if (totalCount === 0) {
    return null;
  }

  return (
    <Aside.Container
      title={`Drafts (${totalCount})`}
      subheading={
        <Link
          to={PAGE_ENDPOINTS.WRITE.ROOT}
          className={cn(
            buttonVariants({
              variant: 'outline',
              size: 'sm',
            }),
          )}
        >
          See all
        </Link>
      }
    >
      <div className="space-y-3">
        {items.map((item) => (
          <DraftCard
            key={`draft-${item.id}`}
            item={item as SerializeSchema.SerializePost<false>}
          />
        ))}
      </div>
    </Aside.Container>
  );
}
