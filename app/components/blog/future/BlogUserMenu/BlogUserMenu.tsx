import { useCallback } from 'react';
import { Link, useSubmit } from '@remix-run/react';

import { Icons } from '~/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { PAGE_ENDPOINTS } from '~/constants/constant';

interface UserMenuProps {
  session: SerializeSchema.SerializeUser | undefined;
}

export default function BlogUserMenu({ session }: UserMenuProps) {
  const submit = useSubmit();

  const onLogout = useCallback(() => {
    const formData = new FormData();
    submit(formData, {
      action: '?/logout',
      method: 'POST',
      navigate: false,
    });
  }, [submit]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer hover:opacity-80">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{session?.UserProfile?.username}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              unstable_viewTransition
              to={PAGE_ENDPOINTS.WRITE.ROOT}
              aria-label="Go to New drafts"
            >
              <Icons.filetext className="mr-2 h-4 w-4" />
              <span>New drafts</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              unstable_viewTransition
              to={PAGE_ENDPOINTS.WRITE.ROOT}
              aria-label="Go to All drafts"
            >
              <Icons.filetext className="mr-2 h-4 w-4" />
              <span>All drafts</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              unstable_viewTransition
              to={PAGE_ENDPOINTS.ROOT}
              aria-label="Go to hashnode"
            >
              <span>Back to hashnode</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              unstable_viewTransition
              to={PAGE_ENDPOINTS.ROOT}
              aria-label="Go to Explore Hashnode"
            >
              <span>Explore Hashnode</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              unstable_viewTransition
              to={PAGE_ENDPOINTS.SETTINGS.ROOT}
              aria-label="Go to Profile settings"
            >
              <Icons.user className="mr-2 h-4 w-4" />
              <span>Profile settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onLogout}>
            <Icons.logout className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
