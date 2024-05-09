import { useNavigate, useParams } from "@remix-run/react";
import { useCallback } from "react";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { cn } from "~/services/libs";

interface SidebarPublishedItemProps {
  item: SerializeSchema.SerializePost<false>;
}

export default function SidebarPublishedItem({
  item,
}: SidebarPublishedItemProps) {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const onClickWritePage = useCallback(() => {
    navigate(PAGE_ENDPOINTS.WRITE.ID(item.id), {
      unstable_viewTransition: true,
    });
  }, [item.id, navigate]);

  return (
    <div className="group grid relative grid-cols-12 sm:block">
      <Button
        type="button"
        variant="ghost"
        role="link"
        data-href={PAGE_ENDPOINTS.WRITE.ID(item.id)}
        onClick={onClickWritePage}
        className={cn(
          id === item.id ? "bg-accent text-accent-foreground" : undefined,
          "grid grid-cols-10 justify-start space-x-2 col-span-8 md:col-auto"
        )}
      >
        <div className="col-span-1">
          <div className="block">
            <Icons.filetext className="size-5" />
          </div>
        </div>
        <div className="col-span-9 truncate text-left">{item.title}</div>
      </Button>
      <div className="h-full overflow-hidden col-span-4 sm:invisible sm:absolute sm:top-0 sm:bottom-0 sm:right-0 sm:col-auto">
        <div className="relative z-20 flex h-full w-full flex-row justify-end">
          <Button variant="outline" size="sm">
            <Icons.moreHorizontal />
          </Button>
        </div>
      </div>
    </div>
  );
}