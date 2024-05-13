import { useCallback } from 'react';
import { Link } from '@remix-run/react';

import { Icons } from '~/components/icons';
import { Button, buttonVariants } from '~/components/ui/button';
import { ScrollArea } from '~/components/ui/scroll-area';
import { Separator } from '~/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import { useWriteContext } from '~/components/write/context/useWriteContext';
import { MyDraftProvider } from '~/components/write/future/MyDraftList';
import { PublishedProvider } from '~/components/write/future/PublishedList';
import { SearchInput } from '~/components/write/future/SearchInput';
import { SubmittedDraftProvider } from '~/components/write/future/SubmittedDraftList';
import { PAGE_ENDPOINTS } from '~/constants/constant';
import { useSession } from '~/libs/hooks/useSession';
import { cn } from '~/services/libs';

export default function LeftSidebar() {
  const session = useSession();
  const { setSideClose } = useWriteContext();

  const onToggleSidebar = useCallback(() => {
    setSideClose();
  }, [setSideClose]);

  return (
    <>
      <div data-name="top" className="flex flex-row items-center gap-2 p-4">
        <div className="flex-1">
          <div
            className="grid h-full w-full grid-cols-12 items-center justify-center gap-2 border border-transparent px-0 py-1 text-center text-sm"
            title={`${session.UserProfile.username}'s team blog`}
          >
            <div className="col-span-2">
              <div className="relative h-8 w-full">
                <Icons.hashnodeTypeHeaderMobile className="h-full w-full fill-current text-blue-600" />
              </div>
            </div>
            <div className="col-span-8 truncate text-left">
              <span className="block truncate text-base">{`${session.UserProfile.username}'s team blog`}</span>
            </div>
            <div className="col-span-2 flex flex-row items-center justify-center"></div>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="sm"
                aria-label="Close left sidebar"
                variant="ghost"
                onClick={onToggleSidebar}
              >
                <Icons.closeLeftSidebar />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Close left sidebar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className=" relative z-30 flex items-center px-4 pb-4">
        <SearchInput />
      </div>
      <div className="px-4 pb-4">
        <Link
          to={{
            pathname: PAGE_ENDPOINTS.WRITE.ROOT,
            search: 'isNewDraft=true',
          }}
          unstable_viewTransition
          className={cn(
            buttonVariants({
              variant: 'ghost',
            }),
            'w-full justify-start',
          )}
          aria-label="Go to New Draft page"
        >
          <Icons.filePlus2 className="size-5" />
          <span className="ml-2">New draft</span>
        </Link>
      </div>
      <div className="px-4">
        <Separator
          aria-orientation="vertical"
          orientation="vertical"
          className="h-px w-full"
          role="separator"
        />
      </div>
      <ScrollArea className="flex-1 overflow-auto">
        <div className="pt-4">
          <SubmittedDraftProvider />
          <MyDraftProvider />
          <PublishedProvider />
        </div>
      </ScrollArea>
      <hr className="css-1a5r2w9" />
      <div className="flex flex-col gap-4 px-4 py-5">
        <div className="flex flex-col gap-1">
          <Link
            className={cn(
              buttonVariants({
                variant: 'ghost',
                className: 'flex justify-start space-x-2',
              }),
            )}
            unstable_viewTransition
            to={PAGE_ENDPOINTS.ROOT}
          >
            <div className="col-span-1">
              <div className="block">
                <Icons.files className="size-5" />
              </div>
            </div>
            <div className="col-span-9 truncate">View deleted articles</div>
          </Link>
          <Link
            className={cn(
              buttonVariants({
                variant: 'ghost',
                className: 'flex justify-start space-x-2',
              }),
            )}
            unstable_viewTransition
            to={PAGE_ENDPOINTS.ROOT}
          >
            <div className="col-span-1">
              <div className="block">
                <Icons.arrowLeft className="size-5" />
              </div>
            </div>
            <div className="col-span-9 truncate">Back to Hashnode</div>
          </Link>
        </div>
      </div>
    </>
  );
}
