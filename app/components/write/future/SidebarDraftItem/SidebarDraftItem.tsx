import { useCallback, useRef, useState } from 'react';
import { Link, useParams, useSubmit } from '@remix-run/react';
import { toast } from 'sonner';

import { Icons } from '~/components/icons';
import { Button, buttonVariants } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { PAGE_ENDPOINTS } from '~/constants/constant';
import { useCopyToClipboard } from '~/libs/hooks/useCopyToClipboard';
import { useEventListener } from '~/libs/hooks/useEventListener';
import { useMediaQuery } from '~/libs/hooks/useMediaQuery';
import { cn } from '~/services/libs';

interface SidebarDraftItemProps {
  item: SerializeSchema.SerializePost<false>;
}

export default function SidebarDraftItem({ item }: SidebarDraftItemProps) {
  const { id } = useParams<{ id: string }>();

  const [visible, setVisible] = useState(false);

  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width: 640px)', false);

  const target = useRef<HTMLDivElement>(null);

  const submit = useSubmit();

  const { copy } = useCopyToClipboard({
    onSuccess: () => {
      toast('Link copied to clipboard', {
        description: 'You can now paste the link anywhere.',
      });
    },
  });

  const onOpenChange = useCallback((nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      setVisible(false);
    }
  }, []);

  const onDeleteDraft = useCallback(() => {
    if (id && item.id === id) {
      alert('You cannot delete the draft you are currently editing.');
      return;
    }

    const isConfirm = confirm('Are you sure you want to delete this draft?');
    if (!isConfirm) {
      return;
    }

    submit(
      {
        type: 'DRAFT_DELETE',
        postId: item.id,
        redirectUrl: location.pathname,
      },
      { method: 'delete', encType: 'application/json' },
    );
  }, [id, item.id, submit]);

  const onCopy = useCallback(() => {
    const url = new URL(PAGE_ENDPOINTS.PREVIEW.ID(item.id), location.origin);
    copy(url.toString());
  }, [copy, item.id]);

  useEventListener(
    'mouseenter',
    () => {
      setVisible(true);
    },
    {
      target,
    },
  );

  useEventListener(
    'mouseleave',
    () => {
      if (open) return;
      setVisible(false);
    },
    {
      target,
    },
  );

  return (
    <div className="group relative grid grid-cols-12 sm:block" ref={target}>
      <Link
        unstable_viewTransition
        to={PAGE_ENDPOINTS.WRITE.ID(item.id)}
        className={cn(
          buttonVariants({
            variant: 'ghost',
          }),
          id === item.id ? 'bg-accent text-accent-foreground' : undefined,
          'col-span-8 grid grid-cols-10 justify-start space-x-2 md:col-auto',
        )}
      >
        <div className="col-span-1">
          <div className="block">
            <Icons.filetext className="size-5" />
          </div>
        </div>
        <div className="col-span-9 truncate text-left">{item.title}</div>
      </Link>
      <div
        className={cn(
          'col-span-4 h-full overflow-hidden sm:absolute sm:bottom-0 sm:right-0 sm:top-0 sm:col-auto',
          isMobile ? 'visible' : visible ? 'visible' : 'invisible',
        )}
      >
        <div className="relative z-20 flex h-full w-full flex-row justify-end">
          <DropdownMenu onOpenChange={onOpenChange} open={open}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-full">
                <Icons.moreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="p-0">
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-2"
                  size="sm"
                  onClick={onCopy}
                >
                  <Icons.link className="size-4" />
                  <span>Copy preview link</span>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-0">
                <Link
                  to={PAGE_ENDPOINTS.PREVIEW.ID(item.id)}
                  unstable_viewTransition
                  className={cn(
                    buttonVariants({
                      variant: 'ghost',
                      size: 'sm',
                    }),
                    'w-full justify-start space-x-2',
                  )}
                >
                  <Icons.fileSearch className="size-4" />
                  <span>Preview draft</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-0">
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-2"
                  size="sm"
                  onClick={onDeleteDraft}
                >
                  <Icons.trash className="size-4" />
                  <span>Delete</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
