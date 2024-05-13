import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { ASSET_URL } from '~/constants/constant';

export default function BlogEmpty() {
  return (
    <div>
      <div className="min-h-30 my-10 flex w-full flex-col items-center px-6 dark:border-slate-800">
        <div className="block">
          <img
            src={ASSET_URL.EMPTY_BLOG}
            alt="Empty blog"
            className="size-[500px]"
          />
        </div>
        <h3 className="mb-5 text-center text-2xl font-medium leading-snug tracking-tight text-slate-900 dark:text-slate-400">
          Your blog is empty! Write your first article
        </h3>
        <Button className="space-x-2" variant="secondary">
          <Icons.pen />
          <span>Write New Article</span>
        </Button>
      </div>
    </div>
  );
}
