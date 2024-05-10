import { useCallback } from 'react';

import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { useWriteContext } from '~/components/write/context/useWriteContext';
import { ImageGallery } from '~/components/write/future/ImageGallery';
import { ImageUpload } from '~/components/write/future/ImageUpload';

export default function ImagePopover() {
  const { setCoverClose } = useWriteContext();

  const onClose = useCallback(() => {
    setCoverClose();
  }, [setCoverClose]);

  return (
    <div>
      <Tabs defaultValue="upload">
        <div className="flex flex-row items-center justify-between">
          <TabsList data-test="tabs-list">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="unsplash">Unsplash</TabsTrigger>
          </TabsList>
          <Button
            variant="ghost"
            aria-label="Hide cover image modal"
            onClick={onClose}
          >
            <Icons.close />
          </Button>
        </div>
        <TabsContent value="upload" className="mb-4 mt-6">
          <ImageUpload />
        </TabsContent>
        <TabsContent value="unsplash" className="mb-4 mt-6">
          <ImageGallery />
        </TabsContent>
      </Tabs>
    </div>
  );
}
