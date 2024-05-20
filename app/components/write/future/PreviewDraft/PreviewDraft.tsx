import { useMemo } from 'react';
import { useParams } from '@remix-run/react';

import { Icons } from '~/components/icons';
import { Iframe } from '~/components/shared/future/Iframe';
import { Button, buttonVariants } from '~/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { useWriteContext } from '~/components/write/context/useWriteContext';
import { PAGE_ENDPOINTS } from '~/constants/constant';
import { useMatchesData } from '~/libs/hooks/useMatchesData';
import { cn } from '~/services/libs';
import { DesktopSvg } from './DesktopSvg';
import { MobileSvg } from './MobileSvg';

export default function PreviewDraft() {
  const { id } = useParams();
  const { setPreviewDraftClose } = useWriteContext();
  const data = useMatchesData('root') as Record<string, any>;

  const outNewTabLink = useMemo(() => {
    if (!data || (data && !data.origin)) {
      return '#';
    }

    if (!id) {
      return '#';
    }

    return `${data.origin}${PAGE_ENDPOINTS.PREVIEW.ID(id)}`;
  }, [data, id]);

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
              href={outNewTabLink}
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
          defaultValue="Desktop"
          className="max-w-[72rem] 2xl:max-w-[80rem]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="Desktop">Web Desktop</TabsTrigger>
            <TabsTrigger value="Mobile">Web Mobile</TabsTrigger>
          </TabsList>
          <TabsContent value="Desktop" className="container pb-10 pt-5">
            <div className="relative flex h-[635px] w-[1008px] flex-row items-center justify-center pt-5">
              <DesktopSvg />
              <div className="absolute left-[119px] top-[31px] h-[480px] w-[770px] overflow-hidden">
                <Iframe iframeUrl={outNewTabLink} />
              </div>
            </div>
          </TabsContent>
          <TabsContent
            value="Mobile"
            className="container flex justify-center pb-10 pt-5"
          >
            <div className="relative flex h-[884px] w-[438px] flex-row items-center justify-center pt-5">
              <MobileSvg />
              <div className="absolute h-[844px] w-[390px] overflow-hidden rounded-[3rem]">
                <Iframe iframeUrl={outNewTabLink} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
