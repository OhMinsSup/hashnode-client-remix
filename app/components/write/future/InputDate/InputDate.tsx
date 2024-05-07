import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import styles from "./styles.module.css";
import { cn } from "~/services/libs";

export default function InputDate() {
  return (
    <div className="border-slate-300 bg-transparent dark:border-slate-700 dark:text-slate-300 outline-none w-full py-3 pr-2 pl-4 items-center flex justify-between border rounded-xl">
      <span
        className={cn(
          "truncate max-w-[250px] text-muted-foreground",
          styles.input_slug_by_readonly
        )}
      >
        Tomorrow at 6pm, 04/02...
      </span>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" aria-label="Pick a date/time">
              <Icons.calendar />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Pick a date/time</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
