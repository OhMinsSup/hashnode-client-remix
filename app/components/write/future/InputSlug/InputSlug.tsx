import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import styles from "./styles.module.css";
import { cn } from "~/services/libs";

export default function InputSlug() {
  //   const editInputMode = () => (
  //     <div className="flex flex-row space-x-2">
  //       <Input id="slug" placeholder="enter-slug" />
  //       <Button variant="ghost" className="space-x-2">
  //         <Icons.save />
  //         <span>Save</span>
  //       </Button>
  //     </div>
  //   );

  const readInputMode = () => {
    return (
      <div className="border-slate-300 bg-transparent dark:border-slate-700 dark:text-slate-300 outline-none w-full py-3 pr-2 pl-4 items-center flex justify-between border rounded-xl">
        <span
          className={cn(
            "truncate max-w-[250px]",
            styles.input_slug_by_readonly
          )}
        >
          /asdsd
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" aria-label="Edit slug">
                <Icons.pen />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit slug</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="slug" className="text-xl font-semibold">
          Article slug
        </Label>
        {/* {editInputMode()} */}
        {readInputMode()}
      </div>
    </div>
  );
}
