import { useCallback } from 'react';
import { useController } from 'react-hook-form';

import type { FormFieldValues } from '~/services/validate/post-create-api.validate';
import { Icons } from '~/components/icons';
import { ClientOnly } from '~/components/shared/future/ClientOnly';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { Separator } from '~/components/ui/separator';
import { Switch } from '~/components/ui/switch';
import { useWriteContext } from '~/components/write/context/useWriteContext';
import { useWriteFormContext } from '~/components/write/context/useWriteFormContext';
import { SettingPublishDrawer } from '~/components/write/future/SettingPublishDrawer';
import { Theme, useTheme } from '~/context/useThemeContext';
import styles from './styles.module.css';

export default function WritePageHeader() {
  const {
    setSideOpen,
    isSideOpen,
    open,
    close,
    isPreviewDraftOpen,
    setPreviewDraftOpen,
  } = useWriteContext();

  const { control } = useWriteFormContext();

  const {
    field: { value, onChange, ...field },
  } = useController<FormFieldValues>({
    control,
    name: 'config.isMarkdown',
  });

  const onToggleSidebar = useCallback(() => {
    setSideOpen();
  }, [setSideOpen]);

  const [theme, setTheme] = useTheme();

  const onCheckedThemeChange = useCallback(
    (checked: boolean) => {
      setTheme(checked ? Theme.DARK : Theme.LIGHT);
    },
    [setTheme],
  );

  const onOpenChange = useCallback(
    (value: boolean) => {
      value ? open() : close();
    },
    [close, open],
  );

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.container_left}>
          {isSideOpen ? null : (
            <Button
              type="button"
              size="sm"
              aria-label="Open left sidebar"
              variant="ghost"
              onClick={onToggleSidebar}
            >
              <Icons.openLeftSidebar />
            </Button>
          )}
        </div>
        <div className={styles.container_right}>
          {/* <div className="mr-1 flex flex-row items-center md:mr-4">
            <div className="flex flex-row items-center text-green-500">
              <Icons.cloudUpload />
              <span className="ml-2 hidden sm:block">Saved</span>
            </div>
          </div> */}
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost">
                  <Icons.chevronDown />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex h-auto w-full flex-col space-y-3 text-sm">
                  <Button
                    variant="ghost"
                    className="flex justify-start space-x-2"
                    size="sm"
                  >
                    <Icons.history className="size-5" />
                    <span>Revision History</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex justify-start space-x-2"
                    size="sm"
                    onClick={() => onOpenChange(true)}
                  >
                    <Icons.settings2 className="size-5" />
                    <span>Draft Settings</span>
                  </Button>
                  <Separator
                    aria-orientation="vertical"
                    orientation="vertical"
                    className="h-px min-h-full w-full"
                    role="separator"
                  />
                  <div className="flex items-center justify-between space-x-2 px-3">
                    <div className="flex items-center justify-center space-x-2">
                      {theme === Theme.DARK ? (
                        <Icons.sun className="size-5" />
                      ) : (
                        <Icons.moon className="size-5" />
                      )}
                      <Label htmlFor="theme-mode" className="text-xs">
                        {theme === Theme.DARK ? 'Light' : 'Dark'} mode
                      </Label>
                    </div>
                    <Switch
                      id="theme-mode"
                      checked={theme === Theme.DARK}
                      onCheckedChange={onCheckedThemeChange}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2 px-3">
                    <div className="flex items-center justify-center space-x-2">
                      <Icons.markdown className="size-5 stroke-current" />
                      <Label htmlFor="markdown-mode" className="text-xs">
                        Raw markdown editor
                      </Label>
                    </div>
                    <Switch
                      id="markdown-mode"
                      {...field}
                      checked={value as unknown as boolean}
                      onCheckedChange={onChange}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Separator
            aria-orientation="vertical"
            orientation="vertical"
            className="mx-4 h-px min-h-full"
            role="separator"
          />
          <div className="flex flex-row space-x-2 md:space-x-3">
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={() => setPreviewDraftOpen()}
              aria-haspopup={isPreviewDraftOpen ? 'dialog' : undefined}
              aria-expanded={isPreviewDraftOpen}
              aria-controls={
                isPreviewDraftOpen ? 'preview-draft-dialog' : undefined
              }
            >
              <Icons.fileSearch className="flex md:hidden" />
              <span className="hidden md:flex">Preview</span>
            </Button>
            <ClientOnly>
              <SettingPublishDrawer />
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  );
}
