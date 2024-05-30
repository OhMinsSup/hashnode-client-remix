import { Link } from '@remix-run/react';

import { buttonVariants } from '~/components/ui/button';
import { PAGE_ENDPOINTS } from '~/constants/constant';
import { cn } from '~/services/libs';
import Aside from './Aside';
import { DraftCard } from './DraftCard';

interface AsideDraftProps {
  draftTotal: number;
  drafts: SerializeSchema.SerializePost<false>[];
}

export default function AsideDraft({ draftTotal, drafts }: AsideDraftProps) {
  return (
    <Aside.Container
      title={`Drafts (${draftTotal})`}
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
        {drafts.map((item) => (
          <DraftCard key={`draft-${item.id}`} item={item} />
        ))}
      </div>
    </Aside.Container>
  );
}
