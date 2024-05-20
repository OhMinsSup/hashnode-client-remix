import React, { useCallback, useEffect, useRef } from 'react';
import { useFetcher } from '@remix-run/react';

import { Icons } from '~/components/icons';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Button } from '~/components/ui/button';
import { useWriteFormContext } from '~/components/write/context/useWriteFormContext';
import { useDrop } from '~/libs/hooks/useDrop';
import { getPath, RoutesActionData } from '~/routes/api.v1.assets.upload';
import { resetFetcher } from '~/routes/api.v1.reset-fetcher';
import { cn } from '~/services/libs';

export default function OgImage() {
  const $container = useRef<HTMLLabelElement | null>(null);

  const fetcher = useFetcher<RoutesActionData>();

  const { setValue } = useWriteFormContext();

  const upload = useCallback(
    async (file: File) => {
      const objectUrl = URL.createObjectURL(file);

      // validation checj file sizes 1600 x 800 px
      const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
        img.src = objectUrl;
      });

      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }

      if (image.width > 1200 || image.height > 630) {
        alert('Image size is too small');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('uploadType', 'SEO');
      formData.append('mediaType', 'IMAGE');

      fetcher.submit(formData, {
        method: 'POST',
        action: getPath(),
        encType: 'multipart/form-data',
      });
    },
    [fetcher],
  );

  const onChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files || (files && files.length === 0)) {
        alert('No file');
        return;
      }

      const file = files.item(0);
      if (!file) {
        alert('No file');
        return;
      }

      await upload(file);
    },
    [upload],
  );

  const onRemove = useCallback(() => {
    setValue('seo.image', undefined, {
      shouldDirty: true,
    });
  }, [setValue]);

  useDrop($container, {
    onFiles: async (files) => {
      if (!files || (files && files.length === 0)) {
        alert('No file');
        return;
      }

      const file = files.at(0);
      if (!file) {
        alert('No file');
        return;
      }
      await upload(file);
    },
  });

  useEffect(() => {
    const fetcherData = fetcher.data;
    if (
      fetcher.state === 'idle' &&
      fetcherData != null &&
      fetcherData.status === 'success'
    ) {
      setValue('seo.image', fetcherData.result?.publicUrl, {
        shouldDirty: true,
      });
      resetFetcher(fetcher);
    }
  }, [fetcher, setValue]);

  return (
    <AspectRatio ratio={16 / 9}>
      <>
        {fetcher.state === 'idle' && fetcher.data == null ? (
          <>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              className="flex size-full cursor-pointer flex-row items-center justify-center rounded-xl border border-dashed border-slate-700 px-[26px] py-[52px] dark:border-slate-300"
              ref={$container}
            >
              <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
                <Icons.cloudUpload />
                <span className="text-sm text-muted-foreground">
                  Click to upload image
                </span>
                <span className="text-sm text-muted-foreground">
                  Recommended dimension: 1200 x 630 px
                </span>
              </div>
              <input
                name="ogImage"
                type="file"
                id="inputUpload"
                accept="image/avif, image/gif, image/jpeg, image/png, image/webp, image/bmp, image/x, image/tiff, image/vnd, image/xbm"
                onChange={onChange}
                className="hidden w-full rounded-[0.375rem] border px-3 py-[0.625rem] text-sm outline-none dark:border-slate-800 dark:text-white md:p-4 md:text-base"
              />
            </label>
          </>
        ) : null}
        {fetcher.state === 'loading' || fetcher.state === 'submitting' ? (
          <div
            className={cn(
              'flex size-full cursor-pointer flex-row items-center justify-center rounded-xl border border-dashed border-slate-700 px-[26px] py-[52px] dark:border-slate-300',
              'absolute inset-0',
            )}
          >
            <Icons.spinner className="animate-spin" />
          </div>
        ) : null}
        {fetcher.state === 'idle' && fetcher.data != null ? (
          <>
            <a
              href={fetcher.data.result?.publicUrl}
              target="_Blank"
              aria-label="cover-image"
              className=" relative block size-full"
              rel="noreferrer"
            >
              <img
                src={fetcher.data.result?.publicUrl}
                alt="homepage illustrations"
                decoding="async"
                className="h-full w-full rounded object-cover"
              />
            </a>
            <Button
              type="button"
              variant="secondary"
              className="absolute right-0 top-0 z-[300px] rounded-full"
              size="icon"
              onClick={onRemove}
            >
              <Icons.close />
            </Button>
          </>
        ) : null}
      </>
    </AspectRatio>
  );
}
