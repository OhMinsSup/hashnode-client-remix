import React, { useCallback, useEffect, useRef } from 'react';
import { useFetcher } from '@remix-run/react';

import type { RoutesActionData } from '~/routes/api.v1.assets.upload';
import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { useWriteContext } from '~/components/write/context/useWriteContext';
import { useWriteFormContext } from '~/components/write/context/useWriteFormContext';
import { getTargetElement } from '~/libs/browser-utils/dom';
import { useDrop } from '~/libs/hooks/useDrop';
import { getPath } from '~/routes/api.v1.assets.upload';
import styles from './styles.module.css';

export default function ImageUpload() {
  const $ipt = useRef<HTMLInputElement | null>(null);

  const $container = useRef<HTMLDivElement | null>(null);

  const { setUploadState, uploadState, setCoverClose } = useWriteContext();

  const { setValue } = useWriteFormContext();

  const fetcher = useFetcher<RoutesActionData>();

  const upload = useCallback(
    async (file: File) => {
      setUploadState('pending');
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

      if (image.width > 1600 || image.height > 840) {
        alert('Image size is too small');
        setUploadState('idle');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('uploadType', 'POST_THUMBNAIL');
      formData.append('mediaType', 'IMAGE');

      fetcher.submit(formData, {
        method: 'POST',
        action: getPath(),
        encType: 'multipart/form-data',
      });
    },
    [setUploadState, fetcher],
  );

  const onClick = useCallback(() => {
    const $ = getTargetElement($ipt);
    if ($) $.click();
  }, []);

  const onChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files) {
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

  useDrop($container, {
    onFiles: async (files) => {
      if (uploadState === 'pending') {
        return;
      }

      if (!files) {
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
      setCoverClose();
      setUploadState('success');
      setValue('image', fetcherData.result?.publicUrl, {
        shouldDirty: true,
      });
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <div className={styles.tab_content_upload} ref={$container}>
      <Button
        type="button"
        variant="outline"
        className="space-x-2"
        onClick={onClick}
        disabled={uploadState === 'pending'}
      >
        {uploadState === 'pending' ? (
          <Icons.spinner className="animate-spin" />
        ) : (
          <Icons.cloudUpload />
        )}
        <span>Upload Image</span>
      </Button>
      <input
        type="file"
        id="inputUpload"
        data-id="upload-cover"
        accept="image/jpeg, image/png, image/webp, image/gif, image/svg+xml"
        className="hidden"
        ref={$ipt}
        disabled={uploadState === 'pending'}
        onChange={onChange}
      />
      <p className={styles.recommended_text}>
        Recommended dimension is 1600 x 840
      </p>
    </div>
  );
}
