import { useCallback } from "react";
import styles from "./styles.module.css";
import { Button } from "~/components/ui/button";
import { Icons } from "~/components/icons";
import { useWriteContext } from "~/components/write/context/useWriteContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Separator } from "~/components/ui/separator";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import { Theme, useTheme } from "~/context/useThemeContext";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { ScrollArea } from "~/components/ui/scroll-area";

export default function WritePageHeader() {
  const {
    setSideOpen,
    isSideOpen,
    isMarkdownMode,
    setMarkdownMode,
    isOpen,
    open,
    close,
  } = useWriteContext();

  const onToggleSidebar = useCallback(() => {
    setSideOpen();
  }, [setSideOpen]);

  const [theme, setTheme] = useTheme();

  const onCheckedMarkdownChange = useCallback(
    (checked: boolean) => {
      setMarkdownMode(checked);
    },
    [setMarkdownMode]
  );

  const onCheckedThemeChange = useCallback(
    (checked: boolean) => {
      setTheme(checked ? Theme.DARK : Theme.LIGHT);
    },
    [setTheme]
  );

  const onOpenChange = useCallback(
    (value: boolean) => {
      value ? open() : close();
    },
    [close, open]
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
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost">
                  <Icons.chevronDown />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex flex-col space-y-3 h-auto w-full text-sm">
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
                    className="min-h-full h-px w-full"
                    role="separator"
                  />
                  <div className="flex items-center justify-between space-x-2 px-3">
                    <div className="flex justify-center items-center space-x-2">
                      {theme === Theme.DARK ? (
                        <Icons.sun className="size-5" />
                      ) : (
                        <Icons.moon className="size-5" />
                      )}
                      <Label htmlFor="theme-mode" className="text-xs">
                        {theme === Theme.DARK ? "Light" : "Dark"} mode
                      </Label>
                    </div>
                    <Switch
                      id="theme-mode"
                      checked={theme === Theme.DARK}
                      onCheckedChange={onCheckedThemeChange}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2 px-3">
                    <div className="flex justify-center items-center space-x-2">
                      <Icons.markdown className="size-5 stroke-current" />
                      <Label htmlFor="markdown-mode" className="text-xs">
                        Raw markdown editor
                      </Label>
                    </div>
                    <Switch
                      id="markdown-mode"
                      checked={isMarkdownMode}
                      onCheckedChange={onCheckedMarkdownChange}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Separator
            aria-orientation="vertical"
            orientation="vertical"
            className="mx-4 min-h-full h-px"
            role="separator"
          />
          <div className="flex flex-row space-x-2 md:space-x-3">
            <Button variant="outline">
              <span className="hidden md:flex">Preview</span>
              <Icons.fileSearch className="flex md:hidden" />
            </Button>
            <Drawer direction="left" open={isOpen} onOpenChange={onOpenChange}>
              <DrawerTrigger asChild>
                <Button variant="default">Publish</Button>
              </DrawerTrigger>
              <DrawerContent className="rounded-none h-full w-full sm:w-[504px]">
                <DrawerHeader className="border-b">
                  <DrawerTitle>
                    <div className="flex flex-row justify-between items-center">
                      <h2>Draft settings</h2>
                      <DrawerClose>
                        <Button variant="ghost">
                          <Icons.close />
                        </Button>
                      </DrawerClose>
                    </div>
                  </DrawerTitle>
                </DrawerHeader>
                <div className="flex-1 overflow-auto">
                  <ScrollArea className="w-full h-full p-6">
                    {Array.from({ length: 300 }).map((_, index) => (
                      <div key={index} className="py-2">
                        <div>adasdsa</div>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
                <DrawerFooter className="border">
                  <div className="flex items-center space-x-2 justify-end">
                    <Button variant="outline">Submit for review</Button>
                    <Button>Publish</Button>
                  </div>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
}
