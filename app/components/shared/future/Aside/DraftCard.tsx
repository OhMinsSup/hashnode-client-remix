import { Link } from '@remix-run/react';

import { PAGE_ENDPOINTS } from '~/constants/constant';
import { distanceInWordsToNow } from '~/libs/date';

interface DraftCardProps {
  item: SerializeSchema.SerializePost<false>;
}

export function DraftCard({ item }: DraftCardProps) {
  return (
    <div className="flex flex-col gap-3 text-slate-700 dark:text-slate-300">
      <Link
        unstable_viewTransition
        className="font-heading mr-3 line-clamp-1 text-base font-semibold leading-snug"
        to={PAGE_ENDPOINTS.WRITE.ID(item.id)}
      >
        {item.title}
      </Link>
      <div className="flex flex-row space-x-2 text-sm font-medium text-slate-600 dark:text-slate-400">
        <p className="text-sm font-normal text-slate-600 dark:text-slate-400">
          Edited {distanceInWordsToNow(item.createdAt)}
        </p>
        <span className="mx-2 inline-block font-bold opacity-50 ">·</span>
        <Link
          unstable_viewTransition
          className="flex flex-row gap-2 text-slate-500 hover:underline"
          to={PAGE_ENDPOINTS.WRITE.ID(item.id)}
        >
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Continue editing
          </p>
        </Link>
      </div>
    </div>
  );
}
