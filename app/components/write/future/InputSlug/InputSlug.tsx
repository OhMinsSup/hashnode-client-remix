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
import { useCallback, useState } from "react";
import { useWriteFormContext } from "~/components/write/context/useWriteFormContext";
import { Input } from "~/components/ui/input";

export default function InputSlug() {
  const { watch, setValue } = useWriteFormContext();

  const urlSlug = watch("urlSlug");

  const [text, setText] = useState(urlSlug);

  const onChangeInputMode = useCallback(() => {
    setInputMode(true);
  }, []);

  const onChangeTextMode = useCallback(() => {
    setInputMode(false);

    setValue("urlSlug", text, {
      shouldDirty: true,
    });
  }, [setValue, text]);

  const [isInputMode, setInputMode] = useState(false);

  const inputMode = () => (
    <div className="flex flex-row space-x-2">
      <Input
        id="slug"
        placeholder="enter-slug"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button variant="ghost" className="space-x-2" onClick={onChangeTextMode}>
        <Icons.save />
        <span>Save</span>
      </Button>
    </div>
  );

  const textMode = () => {
    return (
      <div className="border-slate-300 bg-transparent dark:border-slate-700 dark:text-slate-300 outline-none w-full py-3 pr-2 pl-4 items-center flex justify-between border rounded-xl">
        <span
          className={cn(
            "truncate max-w-[250px]",
            styles.input_slug_by_readonly
          )}
        >
          /{urlSlug}
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                aria-label="Edit slug"
                onClick={onChangeInputMode}
              >
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
        {isInputMode ? inputMode() : textMode()}
      </div>
    </div>
  );
}
