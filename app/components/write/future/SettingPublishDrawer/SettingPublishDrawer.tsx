import { useCallback } from 'react';
import { useFormAction, useNavigation } from '@remix-run/react';

import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer';
import { ScrollArea } from '~/components/ui/scroll-area';
import { useWriteContext } from '~/components/write/context/useWriteContext';
import { DraftSettingDrawer } from '~/components/write/future/DraftSettingDrawer';
import { cn } from '~/services/libs';

export default function SettingPublishDrawer() {
  const { isOpen, open, close } = useWriteContext();

  const navigation = useNavigation();

  const action = useFormAction();

  const onOpenChange = useCallback(
    (value: boolean) => {
      value ? open() : close();
    },
    [close, open],
  );

  return (
    <Drawer direction="left" open={isOpen} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="default">Publish</Button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-full rounded-none sm:!w-[504px]">
        <DrawerHeader className="border-b">
          <DrawerTitle>
            <div className="flex flex-row items-center justify-between">
              <h2>Draft settings</h2>
              <DrawerClose asChild>
                <Button variant="ghost">
                  <Icons.close />
                </Button>
              </DrawerClose>
            </div>
          </DrawerTitle>
        </DrawerHeader>
        <div
          className={cn('flex-1 overflow-auto', {
            'opacity-50':
              navigation.formMethod === 'PUT' &&
              navigation.formAction === action,
          })}
        >
          <ScrollArea className="h-full w-full p-6">
            <DraftSettingDrawer />
          </ScrollArea>
        </div>
        <DrawerFooter className="border">
          <div className="flex items-center justify-end space-x-2">
            <Button variant="outline">Submit for review</Button>
            <Button form="hashnode-write-form" className="space-x-2">
              {navigation.formMethod === 'PUT' &&
              navigation.formAction === action ? (
                <Icons.spinner className="size-4 animate-spin" />
              ) : null}
              <span>Publish</span>
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
