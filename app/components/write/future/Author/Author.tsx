import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { useSession } from "~/libs/hooks/useSession";

export default function Author() {
  const sesion = useSession();
  return (
    <div className="overflow-hidden border rounded-xl dark:border-slate-700">
      <div className="flex flex-row items-center justify-between py-2 px-4">
        <div className="flex">
          <div className="relative block">
            <Avatar className="cursor-pointer hover:opacity-80 size-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="ml-4 flex flex-col gap-1">
            <div className="flex flex-row items-center">
              <h4
                title={sesion.UserProfile.username}
                className="scroll-m-20 text-lg font-semibold tracking-tight"
              >
                {sesion.UserProfile.username}
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
