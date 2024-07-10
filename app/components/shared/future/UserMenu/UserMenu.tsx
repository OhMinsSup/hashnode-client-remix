import { useCallback } from 'react';
import { Link, useSubmit } from '@remix-run/react';

import { Icons } from '~/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { PAGE_ENDPOINTS } from '~/constants/constant';

interface UserMenuProps {
  session: SerializeSchema.SerializeUser;
}

export default function UserMenu({ session }: UserMenuProps) {
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
          <AvatarFallback>{session.UserProfile.username}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              unstable_viewTransition
              className="cursor-pointer"
              to={PAGE_ENDPOINTS.PROFILE.USERNAME(session.UserProfile.username)}
              aria-label="Go to Profile"
            >
              <Icons.user className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              unstable_viewTransition
              className="cursor-pointer"
              to={PAGE_ENDPOINTS.WRITE.ROOT}
              aria-label="Go to Write"
            >
              <Icons.filetext className="mr-2 h-4 w-4" />
              <span>My drafts</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Icons.bookmark className="mr-2 h-4 w-4" />
            <span>Bookmarks</span>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              unstable_viewTransition
              className="cursor-pointer"
              to={PAGE_ENDPOINTS.SETTINGS.ROOT}
              aria-label="Go to Account settings"
            >
              <Icons.user className="mr-2 h-4 w-4" />
              <span>Account settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Icons.history className="mr-2 h-4 w-4" />
            <span>My reading history</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
          <Icons.logout className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

UserMenu.displayName = 'UserMenu';
