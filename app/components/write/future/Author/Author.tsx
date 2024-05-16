import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Badge } from '~/components/ui/badge';
import { useSession } from '~/libs/hooks/useSession';

export default function Author() {
  const sesion = useSession();
  const owner = sesion.Blog.BlogMembers.find(
    (member) => member.role === 'OWNER',
  );

  return (
    <div className="overflow-hidden rounded-xl border dark:border-slate-700">
      <div className="flex flex-row items-center justify-between px-4 py-2">
        <div className="flex">
          <div className="relative block">
            <Avatar className="size-12 cursor-pointer hover:opacity-80">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                {owner?.User?.UserProfile?.username}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="ml-4 flex flex-col gap-1">
            <div className="flex flex-row items-center">
              <h4
                title={owner?.User?.UserProfile?.username}
                className="scroll-m-20 text-lg font-semibold tracking-tight"
              >
                {owner?.User?.UserProfile?.username}
              </h4>
            </div>
            <Badge variant="outline" color="primary">
              Owner
            </Badge>
          </div>
        </div>
        <div>{/* TODO: Change Author */}</div>
      </div>
    </div>
  );
}
