import React, { useCallback, useRef } from 'react';

import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { useWriteContext } from '~/components/write/context/useWriteContext';
import { useWriteFormContext } from '~/components/write/context/useWriteFormContext';
import { getTargetElement } from '~/libs/browser-utils/dom';
import { useDrop } from '~/libs/hooks/useDrop';
import { useFileUploadMutation } from '~/services/react-query/mutations/files/useFileUploadMutation';
import styles from './styles.module.css';

export default function ImageUpload() {
  const $ipt = useRef<HTMLInputElement | null>(null);

  const $container = useRef<HTMLDivElement | null>(null);

  const { setUploadState, uploadState, setCoverClose } = useWriteContext();

  const { setValue } = useWriteFormContext();

  const { mutateAsync } = useFileUploadMutation({
    onSuccess: (data) => {
      setCoverClose();
      setUploadState('success');
      setValue('image', data.result.publicUrl, {
        shouldDirty: true,
      });
    },
  });

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

      await mutateAsync({
        file,
        uploadType: 'POST_THUMBNAIL',
        mediaType: 'IMAGE',
      });
    },
    [setUploadState, mutateAsync],
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
