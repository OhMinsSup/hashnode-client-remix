import { useCallback, useTransition } from 'react';

import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area';
import { useWriteContext } from '~/components/write/context/useWriteContext';
import { useWriteFormContext } from '~/components/write/context/useWriteFormContext';
import { ImagePopover } from '~/components/write/future/ImagePopover';
import { cn } from '~/services/libs';
import styles from './styles.module.css';

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

  const { register, setValue } = useWriteFormContext();

  const [, startTransition] = useTransition();

  const onOpenChange = useCallback(
    (value: boolean) => {
      if (value) {
        setCoverOpen();
      } else {
        setCoverClose();
      }
    },
    [setCoverClose, setCoverOpen],
  );

  const onRemoveSubtitle = useCallback(() => {
    setSubtitleClose();

    startTransition(() => {
      setValue('subTitle', undefined, {
        shouldDirty: true,
        shouldValidate: true,
      });
    });
  }, [setSubtitleClose, setValue]);

  const onAddSubtitle = useCallback(() => {
    setSubtitleOpen();
  }, [setSubtitleOpen]);

  return (
    <div>
      <ScrollArea>
        <div className=" mb-10 flex flex-row whitespace-nowrap px-4 font-semibold">
          <Popover open={isCoverOpen} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>
              <Button size="sm" variant="ghost" className="space-x-2">
                {uploadState === 'pending' ? (
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
          {isSubtitleOpen ? null : (
            <Button
              size="sm"
              variant="ghost"
              className="space-x-2"
              onClick={onAddSubtitle}
            >
              <Icons.subtitle className="size-5" />
              <span>Add Subtitle</span>
            </Button>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="group relative">
        <textarea
          {...register('title', {
            maxLength: 200,
          })}
          placeholder="Article Title..."
          className={cn(styles.title)}
          style={{ height: '50px' }}
        />
      </div>
      {isSubtitleOpen && (
        <div className="group relative mt-3">
          <textarea
            {...register('subTitle', {
              maxLength: 120,
            })}
            placeholder="Article Subtitle..."
            id="subtitle-input"
            className={cn(styles.subtitle)}
            style={{ height: '33px' }}
          />
          <Button
            size="sm"
            variant="ghost"
            onClick={onRemoveSubtitle}
            className=" absolute right-0 top-0 inline-flex"
          >
            <Icons.close />
          </Button>
        </div>
      )}
    </div>
  );
}
