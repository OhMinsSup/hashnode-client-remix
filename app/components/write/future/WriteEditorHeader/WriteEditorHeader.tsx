import { cn } from "~/services/libs";
import styles from "./styles.module.css";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";
import { Icons } from "~/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useWriteContext } from "~/components/write/context/useWriteContext";
import { useCallback } from "react";
import { ImagePopover } from "~/components/write/future/ImagePopover";

export default function WriteEditorHeader() {
  const {
    isSubtitleOpen,
    isCoverOpen,
    setCoverOpen,
    setCoverClose,
    setSubtitleClose,
    setSubtitleOpen,
    uploadState,
  } = useWriteContext();

  const onOpenChange = useCallback(
    (value: boolean) => {
      if (value) {
        setCoverOpen();
      } else {
        setCoverClose();
      }
    },
    [setCoverClose, setCoverOpen]
  );

  const onRemoveSubtitle = useCallback(() => {
    setSubtitleClose();
  }, [setSubtitleClose]);

  const onAddSubtitle = useCallback(() => {
    setSubtitleOpen();
  }, [setSubtitleOpen]);

  return (
    <div>
      <ScrollArea>
        <div className=" flex flex-row px-4 font-semibold whitespace-nowrap mb-10">
          <Popover open={isCoverOpen} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>
              <Button size="sm" variant="ghost" className="space-x-2">
                {uploadState === "pending" ? (
                  <>
                    <Icons.spinner className="size-5 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Icons.media className="size-5" />
                    <span>Add Cover</span>
                  </>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-screen md:w-[725px]" align="start">
              <ImagePopover />
            </PopoverContent>
          </Popover>
          <Button
            size="sm"
            variant="ghost"
            className="space-x-2"
            onClick={onAddSubtitle}
          >
            <Icons.subtitle className="size-5" />
            <span>Add Subtitle</span>
          </Button>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="group relative">
        <textarea
          maxLength={150}
          placeholder="Article Title..."
          id="title-input"
          className={cn(styles.title)}
          style={{ height: "50px" }}
        />
      </div>
      {isSubtitleOpen && (
        <div className="group relative mt-3">
          <textarea
            maxLength={150}
            placeholder="Article Subtitle..."
            id="subtitle-input"
            className={cn(styles.subtitle)}
            style={{ height: "33px" }}
          />
          <Button
            size="sm"
            variant="ghost"
            onClick={onRemoveSubtitle}
            className=" inline-flex absolute top-0 right-0"
          >
            <Icons.close />
          </Button>
        </div>
      )}
    </div>
  );
}
