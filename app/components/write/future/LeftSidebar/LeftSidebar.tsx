import { useCallback, useDeferredValue } from "react";
import { Icons } from "~/components/icons";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useSession } from "~/libs/hooks/useSession";
import { useWriteContext } from "~/components/write/context/useWriteContext";
import { SearchInput } from "~/components/write/future/SearchInput";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { Link, useNavigate } from "@remix-run/react";
import { Separator } from "~/components/ui/separator";
import { ScrollArea } from "~/components/ui/scroll-area";
import { cn } from "~/services/libs";
import { CollapsibleWrapper } from "~/components/write/future/CollapsibleWrapper";
import { MyDraftList } from "~/components/write/future/MyDraftList";
import { SubmittedDraftList } from "~/components/write/future/SubmittedDraftList";

export default function LeftSidebar() {
  const session = useSession();
  const { setSideClose, leftSideKeyword } = useWriteContext();
  const deferredQuery = useDeferredValue(leftSideKeyword);
  const navigate = useNavigate();

  const isStale = leftSideKeyword !== deferredQuery;
  const isSearch = Boolean(deferredQuery) && deferredQuery.length > 0;
  console.log("isSearch", isSearch, isStale);

  const onToggleSidebar = useCallback(() => {
    setSideClose();
  }, [setSideClose]);

  const onClickWritePage = useCallback(() => {
    navigate(`${PAGE_ENDPOINTS.WRITE.ROOT}?isNewDraft=true`);
  }, [navigate]);

  return (
    <>
      <div data-name="top" className="flex flex-row items-center gap-2 p-4">
        <div className="flex-1">
          <div
            className="py-1 px-0 grid-cols-12 h-full gap-2 text-sm w-full border border-transparent grid items-center justify-center text-center"
            title={`${session.UserProfile.username}'s team blog`}
          >
            <div className="col-span-2">
              <div className="relative w-full h-8">
                <Icons.hashnodeTypeHeaderMobile className="w-full h-full fill-current text-blue-600" />
              </div>
            </div>
            <div className="col-span-8 text-left truncate">
              <span className="block truncate text-base">{`${session.UserProfile.username}'s team blog`}</span>
            </div>
            <div className="flex col-span-2 flex-row items-center justify-center"></div>
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
        <SearchInput initialKeyword={leftSideKeyword} isSearch={isSearch} />
      </div>
      <div className="px-4 pb-4">
        <Button
          type="button"
          variant="ghost"
          className="w-full justify-start"
          aria-label="Go to New Draft page"
          role="link"
          data-href={`${PAGE_ENDPOINTS.WRITE.ROOT}?isNewDraft=true`}
          onClick={onClickWritePage}
        >
          <Icons.filePlus2 className="size-5" />
          <span className="ml-2">New draft</span>
        </Button>
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
          <SubmittedDraftList />
          <MyDraftList />
          <PublishedList />
        </div>
      </ScrollArea>
      <hr className="css-1a5r2w9" />
      <div className="flex flex-col py-5 px-4 gap-4">
        <div className="flex flex-col gap-1">
          <Link
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "flex justify-start space-x-2",
              })
            )}
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
                variant: "ghost",
                className: "flex justify-start space-x-2",
              })
            )}
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

function PublishedList() {
  return (
    <CollapsibleWrapper
      title="Published"
      totalCount={0}
      emptyComponent={
        <p className="px-4 text-sm text-muted-foreground">
          You have not published anything.
        </p>
      }
    >
      asdasd
    </CollapsibleWrapper>
  );
}
