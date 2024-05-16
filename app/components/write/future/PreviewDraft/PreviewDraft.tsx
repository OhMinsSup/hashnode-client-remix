import { Icons } from '~/components/icons';
import { Button, buttonVariants } from '~/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { useWriteContext } from '~/components/write/context/useWriteContext';
import { cn } from '~/services/libs';
import { DesktopSvg } from './DesktopSvg';
import { MobileSvg } from './MobileSvg';

export default function PreviewDraft() {
  const { setPreviewDraftClose } = useWriteContext();

  return (
    <div
      role="dialog"
      id="preview-draft-dialog"
      aria-labelledby="preview-draft-title"
      className="fixed inset-0 z-50 flex h-screen flex-col items-stretch bg-white dark:bg-slate-900"
    >
      <div className="border-b bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
        <div className="container flex flex-wrap items-center justify-between p-5">
          <h3 id="preview-draft-title">Preview Draft</h3>
          <div
            className="flex w-full justify-center md:w-auto"
            style={{ flexFlow: 'wrap' }}
          >
            <a
              href="https://hashnode.com/preview/66423da8dcf011ea7c240690"
              target="_blank"
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                }),
                'space-x-2',
              )}
              rel="noreferrer"
            >
              <span>Open in new tab</span>
              <Icons.outLink className="size-5 fill-current" />
            </a>
            <Button variant="outline" onClick={() => setPreviewDraftClose()}>
              Close
            </Button>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <Tabs
          defaultValue="account"
          className="max-w-[72rem] 2xl:max-w-[80rem]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Web Desktop</TabsTrigger>
            <TabsTrigger value="password">Web Mobile</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="container pb-10 pt-5">
            <div className="relative flex h-[635px] w-full flex-row items-center justify-center pt-5">
              <DesktopSvg />
              <div className="absolute left-[225px] top-[40px] h-[480px] w-[770px] overflow-hidden bg-slate-400">
                asdasds
              </div>
            </div>
          </TabsContent>
          <TabsContent value="password" className="container pb-10 pt-5">
            <div className="relative flex h-[884px] w-full flex-row items-center justify-center pt-5">
              <MobileSvg />
              <div className="absolute h-[844px] w-[390px] overflow-hidden rounded-[3rem] bg-slate-400">
                asdasds
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
