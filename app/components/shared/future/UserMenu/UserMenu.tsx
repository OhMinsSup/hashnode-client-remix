import { useCallback } from 'react';
import { useSubmit } from '@remix-run/react';

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
import { getPath } from '~/routes/api.v1.auth.logout';

export default function UserMenu() {
  const submit = useSubmit();

  const onLogout = useCallback(() => {
    const formData = new FormData();
    submit(formData, {
      action: getPath(),
      method: 'POST',
      navigate: false,
    });
  }, [submit]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer hover:opacity-80">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icons.filetext className="mr-2 h-4 w-4" />
            <span>My drafts</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icons.bookmark className="mr-2 h-4 w-4" />
            <span>Bookmarks</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icons.user className="mr-2 h-4 w-4" />
            <span>Account settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icons.history className="mr-2 h-4 w-4" />
            <span>My reading history</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>
          <Icons.logout className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
